import express from 'express';
import {
  getAllUsers,
  getAllHospitals,
  approveHospital,
  getAllRequests,
  getStats,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.get('/hospitals', getAllHospitals);
router.put('/hospitals/:id/approve', approveHospital);
router.get('/requests', getAllRequests);
router.get('/stats', getStats);

export default router;