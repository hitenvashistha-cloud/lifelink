import express from 'express';
import {
  getInventory,
  updateInventory,
  deleteInventory,
} from '../controllers/inventoryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('hospital'), getInventory)
  .post(protect, authorize('hospital'), updateInventory);

router.delete('/:id', protect, authorize('hospital'), deleteInventory);

export default router;