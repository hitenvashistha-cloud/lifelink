import Notification from '../models/Notification.js';
import { sendToUser, sendToUsers } from '../socket/index.js';

// Create a single notification
export const createNotification = async ({ userId, title, message, type = 'system', link = null }) => {
  try {
    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      link,
    });

    // Emit real-time event
    sendToUser(userId.toString(), 'notification:new', notification);

    return notification;
  } catch (error) {
    console.error('Failed to create notification:', error);
    return null;
  }
};

// Create notifications for multiple users
export const createBulkNotifications = async (userIds, notificationData) => {
  try {
    const notifications = userIds.map((userId) => ({
      user: userId,
      ...notificationData,
    }));
    const result = await Notification.insertMany(notifications);

    // Emit real-time events
    userIds.forEach((userId, index) => {
      sendToUser(userId.toString(), 'notification:new', result[index]);
    });

    return result;
  } catch (error) {
    console.error('Failed to create bulk notifications:', error);
    return null;
  }
};

// Get notifications for a user
export const getUserNotifications = async (userId, limit = 20) => {
  try {
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit);
    return notifications;
  } catch (error) {
    console.error('Failed to get notifications:', error);
    return [];
  }
};

// Get unread count
export const getUnreadCount = async (userId) => {
  try {
    const count = await Notification.countDocuments({ user: userId, isRead: false });
    return count;
  } catch (error) {
    return 0;
  }
};

// Mark as read
export const markAsRead = async (notificationId, userId) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { isRead: true },
      { new: true }
    );
    return notification;
  } catch (error) {
    return null;
  }
};

// Mark all as read
export const markAllAsRead = async (userId) => {
  try {
    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );
    return true;
  } catch (error) {
    return false;
  }
};