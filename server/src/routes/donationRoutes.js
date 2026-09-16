import express from 'express';
import {
  createDonation,
  getDonations,
  getDonationStats,
} from '../controllers/donationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('hospital'), createDonation)
  .get(protect, getDonations);

router.get('/stats', protect, authorize('donor'), getDonationStats);

export default router;