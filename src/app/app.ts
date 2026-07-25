import http from 'http';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { Server } from 'socket.io';
import cors from 'cors';
import { CORS_OPTIONS } from '../config/dotenv/dotenv.js';
import { httpLogger } from '../middlewares/logger/httpLogger.js';
import { globalLimiter } from '../middlewares/ratelimiter/rateLimiter.js';
import { connectMongoDB } from '../config/mongodb/mongodb.js';
import { startAllWorkers } from '../config/workers/workers.js';
import { errorHandler } from '../middlewares/errorhandler/errorHandler.js';
import { notFoundHandler } from '../middlewares/errorhandler/notFoundHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Express app
const app = express();

// Http server
const server = http.createServer(app);

// Socket.io server
const io = new Server(server, {
  cors: CORS_OPTIONS,
});

// Middlewares

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

// Connect MongoDB
await connectMongoDB();

// Start bullmq workers
startAllWorkers();

// Health Check / Root route
app.get('/', (_req: Request, res: Response) => {
  ApiResponse.success(res, {
    message: 'Backend Service API is running smoothly!',
    data: { status: 'healthy' },
  });
});

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(errorHandler);

export { app, server, io };
