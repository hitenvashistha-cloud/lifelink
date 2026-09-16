import express from 'express';
import {
  createCamp,
  getCamps,
  getUpcomingCamps,
  updateCampStatus,
  deleteCamp,
} from '../controllers/campController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin'), createCamp)
  .get(protect, getCamps);

router.get('/upcoming', protect, getUpcomingCamps);
router.put('/:id/status', protect, authorize('admin'), updateCampStatus);
router.delete('/:id', protect, authorize('admin'), deleteCamp);

export default router;