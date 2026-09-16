import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/User.js';

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: config.clientUrl,
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error: No token'));
      }

      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      socket.userId = user._id.toString();
      socket.userRole = user.role;
      socket.userName = user.name;

      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.userName} (${socket.userRole})`);

    // Join room based on user id
    socket.join(`user:${socket.userId}`);

    // Join room based on role
    socket.join(`role:${socket.userRole}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.userName}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Send notification to a specific user
export const sendToUser = (userId, event, data) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
};

// Send to all users of a role
export const sendToRole = (role, event, data) => {
  if (io) {
    io.to(`role:${role}`).emit(event, data);
  }
};

// Send to multiple users
export const sendToUsers = (userIds, event, data) => {
  if (io) {
    userIds.forEach((userId) => {
      io.to(`user:${userId}`).emit(event, data);
    });
  }
};

// Broadcast to all
export const broadcast = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};