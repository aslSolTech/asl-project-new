import { API_PORT, IP_BINDING } from './config/dotenv/dotenv.js';
import { httpServer } from './app/app.js';
import { logger } from './config/logger/logger.js';
import { closeAllWorkers } from './config/workers/workers.js';

// Server Start
httpServer.listen(API_PORT, IP_BINDING, () => {
  logger.info(`Server running on http://localhost:${API_PORT}`);
});

// Graceful Shutdown Helper
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} signal received. Closing HTTP server and BullMQ workers...`);
  await closeAllWorkers();
  httpServer.close(() => {
    logger.info('HTTP server closed. Exiting process.');
    process.exit(0);
  });
};

// Handle Process Signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle Uncaught Exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error({ err, stack: err.stack }, 'Uncaught exception detected!');
  httpServer.close(() => {
    process.exit(1);
  });
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (reason: unknown) => {
  logger.error({ reason }, 'Unhandled Promise rejection detected!');
  httpServer.close(() => {
    process.exit(1);
  });
});
