import express from 'express';
import {
  createRequest,
  getRequests,
  getNearbyRequests,
  getNearbyDonors,
  getRequestById,
  acceptRequest,
  updateRequestStatus,
} from '../controllers/requestController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('hospital'), createRequest)
  .get(protect, getRequests);

router.get('/nearby', protect, authorize('donor'), getNearbyRequests);
router.get('/:id/nearby-donors', protect, authorize('hospital'), getNearbyDonors);
router.get('/:id', protect, getRequestById);
router.put('/:id/accept', protect, authorize('donor'), acceptRequest);
router.put('/:id/status', protect, authorize('hospital'), updateRequestStatus);

export default router;