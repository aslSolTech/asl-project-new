import statusMonitor from 'express-status-monitor';
import { Server as SocketIOServer } from 'socket.io';
import { API_BASE_URL } from '../config/dotenv/dotenv.js';

export const getStatusMonitorMiddleware = (io?: SocketIOServer) => {
  return statusMonitor({
    title: 'Backend API Status Monitor',
    path: `${API_BASE_URL}/status`,
    socketPath: '/socket.io',
    websocket: io ?? null,
    spans: [
      {
        interval: 1, // 1 second
        retention: 60, // 1 minute
      },
      {
        interval: 5, // 5 seconds
        retention: 60, // 5 minutes
      },
      {
        interval: 15, // 15 seconds
        retention: 60, // 15 minutes
      },
    ],
    chartVisibility: {
      cpu: true,
      mem: true,
      load: true,
      heap: true,
      responseTime: true,
      rps: true,
      statusCodes: true,
    },
    // healthChecks: [],
    // ignoreStartsWith: '/admin',
  });
};
