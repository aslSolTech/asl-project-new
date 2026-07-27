import http from 'http';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { CORS_OPTIONS } from '../config/dotenv/dotenv.js';
import { httpLogger } from '../middlewares/logger/httpLogger.js';
import { globalLimiter } from '../middlewares/ratelimiter/rateLimiter.js';
import { connectMongoDB } from '../config/mongodb/mongodb.js';
import { redis } from '../config/redis/redis.js';
import { connectMySQL, prisma } from '../config/prisma/prisma.js';
import mongoose from 'mongoose';
import { startAllWorkers, getWorkersHealth } from '../config/workers/workers.js';
import { errorHandler } from '../middlewares/errorhandler/errorHandler.js';
import { notFoundHandler } from '../middlewares/errorhandler/notFoundHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { getStatusMonitorMiddleware } from '../monitoring/monitor_expressapi.js';
import { initSocketIO } from '../config/socketio/socketio.js';

// Express app
const app = express();

// Http server
const httpServer = http.createServer(app);

// Socket.io server
const io = initSocketIO(httpServer);

// Middlewares

// Express Status Monitor (connected with Socket.io server)
app.use(getStatusMonitorMiddleware(io));

// Enable trust proxy for rate limiting & IP tracking
app.set('trust proxy', 1);

// Secure HTTP Headers (XSS, Clickjacking, Hide X-Powered-By)
app.use(helmet()); 

// Rate Limiting Protection against DDoS / Brute-force
app.use(globalLimiter); 

// Structured Request Logger
app.use(httpLogger); 

// HTTP Request Logging (Dev mode - detailed)
app.use(morgan('dev'));

// CORS Configuration
app.use(cors(CORS_OPTIONS));

// Body Parsing Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Connect MongoDB/MySQL
await connectMySQL();
await connectMongoDB();

// Start bullmq workers
startAllWorkers();

// Health Check / Root route with MySQL, Redis, MongoDB, and BullMQ Workers Status
app.get('/', async (_req: Request, res: Response) => {
  let redisStatus = 'DISCONNECTED';
  let mysqlStatus = 'DISCONNECTED';
  let mongodbStatus = mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED';
  let bullmqStatus: { status: string; workers: Record<string, string> } = { status: 'DISCONNECTED', workers: {} };

  try {
    const pong = await redis.ping();
    if (pong === 'PONG') redisStatus = 'CONNECTED';
  } catch (err: unknown) {
    redisStatus = `ERROR: ${err instanceof Error ? err.message : String(err)}`;
  }

  try {
    await prisma.$connect();
    mysqlStatus = 'CONNECTED';
  } catch (err: unknown) {
    mysqlStatus = `ERROR: ${err instanceof Error ? err.message : String(err)}`;
  }

  try {
    bullmqStatus = getWorkersHealth();
  } catch (err: unknown) {
    bullmqStatus = {
      status: `ERROR: ${err instanceof Error ? err.message : String(err)}`,
      workers: {},
    };
  }

  const socketStatus = io.sockets ? 'CONNECTED' : 'DISCONNECTED';
  const activeSocketConnections = io.engine ? io.engine.clientsCount : 0;

  const isHealthy =
    redisStatus === 'CONNECTED' &&
    mysqlStatus === 'CONNECTED' &&
    mongodbStatus === 'CONNECTED' &&
    bullmqStatus.status === 'RUNNING' &&
    socketStatus === 'CONNECTED';

  ApiResponse.success(res, {
    message: 'Backend Services Health Check',
    data: {
      status: isHealthy ? 'healthy' : 'degraded',
      redis: redisStatus,
      mysql: mysqlStatus,
      mongodb: mongodbStatus,
      bullmq: bullmqStatus,
      socketio: {
        status: socketStatus,
        activeConnections: activeSocketConnections,
      },
      statusMonitor: '/status',
    },
  });
});

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(errorHandler);

export { app, httpServer };
