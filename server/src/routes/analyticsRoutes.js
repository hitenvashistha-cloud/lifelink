import express from 'express';
import {
  getHospitalAnalytics,
  getAdminAnalytics,
  getDonorAnalytics,
} from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/hospital', protect, authorize('hospital'), getHospitalAnalytics);
router.get('/admin', protect, authorize('admin'), getAdminAnalytics);
router.get('/donor', protect, authorize('donor'), getDonorAnalytics);

export default router;