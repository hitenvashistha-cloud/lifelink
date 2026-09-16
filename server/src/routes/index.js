import express from 'express';
import authRoutes from './authRoutes.js';
import requestRoutes from './requestRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';
import adminRoutes from './adminRoutes.js';
import donationRoutes from './donationRoutes.js';
import campRoutes from './campRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/requests', requestRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/admin', adminRoutes);
router.use('/donations', donationRoutes);
router.use('/camps', campRoutes);
router.use('/notifications', notificationRoutes);
router.use('/analytics', analyticsRoutes);

export default router;