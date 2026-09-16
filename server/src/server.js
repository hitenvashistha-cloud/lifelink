import http from 'http';
import app from './app.js';
import { config } from './config/env.js';
import connectDB from './config/database.js';
import { initSocket } from './socket/index.js';

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Start server
server.listen(config.port, () => {
  console.log(`Server running in ${config.nodeMode || config.nodeEnv} mode on port ${config.port}`);
  console.log(`Socket.io ready for connections`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});