import { API_PORT, IP_BINDING } from './config/dotenv/dotenv.js';
import { server, io } from './app/app.js';
import { logger } from './config/logger/logger.js';
import { connectMongoDB } from './config/mongodb/mongodb.js';

io.on('connection', (socket) => {
  logger.info({ socketId: socket.id }, 'Socket user connected');
  socket.on('disconnect', () => {
    logger.info({ socketId: socket.id }, 'Socket user disconnected');
  });
});

// Connect Database & Start server
await connectMongoDB();
server.listen(API_PORT, () => {
  logger.info(`Server is running on http://localhost:${API_PORT}`);
});

// Graceful shutdown helper
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} signal received. Closing HTTP server...`);
  server.close(() => {
    logger.info('HTTP server closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error({ err, stack: err.stack }, 'Uncaught exception detected!');
  server.close(() => {
    process.exit(1);
  });
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.error({ reason }, 'Unhandled Promise rejection detected!');
  server.close(() => {
    process.exit(1);
  });
});
