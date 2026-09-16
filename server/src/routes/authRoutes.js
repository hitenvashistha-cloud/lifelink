import express from 'express';
import { register, registerHospital, login, getMe, forgotPassword, resetPassword, updateProfile, generateOTP, verifyOTP } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/register-hospital', registerHospital);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);

export default router;