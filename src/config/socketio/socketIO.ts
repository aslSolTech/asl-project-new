import { Server as SocketIOServer } from 'socket.io';
import type { Server as HTTPServer } from 'node:http';
import { CORS_OPTIONS } from '../dotenv/dotenv.js';
import { logger } from '../logger/logger.js';

let io: SocketIOServer;

export const initSocketIO = (httpServer: HTTPServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: CORS_OPTIONS,
  });

  io.on('connection', (socket) => {
    logger.info({ socketId: socket.id, activeConnections: io.engine.clientsCount }, 'Socket client connected!');

    socket.on('disconnect', (reason) => {
      logger.info({ socketId: socket.id, reason, activeConnections: io.engine.clientsCount }, 'Socket client disconnected!');
    });
  });

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.io has not been initialized! Call initSocketIO(httpServer) first.');
  }
  return io;
};