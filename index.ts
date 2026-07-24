import { API_PORT, IP_BINDING } from './src/shared/constant/app/dotenv';
import { server, io } from './src/app/app.js';

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// Start server
server.listen(API_PORT, IP_BINDING, () => {
  console.log(`Server is running on http://localhost:${API_PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle SIGINT signal
process.on('SIGINT', () => {
  console.log('SIGINT signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception', err);
  server.close(() => {
    console.log('Server closed');
    process.exit(1);
  });
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection', err);
  server.close(() => {
    console.log('Server closed');
    process.exit(1);
  });
});
