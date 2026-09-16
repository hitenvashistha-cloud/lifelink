import User from '../models/User.js';
import EmergencyRequest from '../models/EmergencyRequest.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all hospitals
// @route   GET /api/admin/hospitals
// @access  Private (Admin only)
export const getAllHospitals = async (req, res, next) => {
  try {
    const hospitals = await User.find({ role: 'hospital' }).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve hospital
// @route   PUT /api/admin/hospitals/:id/approve
// @access  Private (Admin only)
export const approveHospital = async (req, res, next) => {
  try {
    const hospital = await User.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found',
      });
    }

    if (hospital.role !== 'hospital') {
      return res.status(400).json({
        success: false,
        message: 'User is not a hospital',
      });
    }

    hospital.isVerified = true;
    await hospital.save();

    // Notify the hospital
    try {
      await createNotification({
        userId: hospital._id,
        title: 'Hospital Verified',
        message: 'Your hospital has been verified by the admin. You can now create blood requests.',
        type: 'hospital',
        link: '/hospital-dashboard',
      });
    } catch (notifError) {
      console.error('Notification error:', notifError);
    }

    res.json({
      success: true,
      message: 'Hospital approved successfully',
      hospital,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all requests
// @route   GET /api/admin/requests
// @access  Private (Admin only)
export const getAllRequests = async (req, res, next) => {
  try {
    const requests = await EmergencyRequest.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getStats = async (req, res, next) => {
  try {
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const totalHospitals = await User.countDocuments({ role: 'hospital' });
    const pendingHospitals = await User.countDocuments({ role: 'hospital', isVerified: false });
    const totalRequests = await EmergencyRequest.countDocuments();
    const openRequests = await EmergencyRequest.countDocuments({ status: 'Open' });
    const fulfilledRequests = await EmergencyRequest.countDocuments({ status: 'Fulfilled' });

    res.json({
      success: true,
      stats: {
        totalDonors,
        totalHospitals,
        pendingHospitals,
        totalRequests,
        openRequests,
        fulfilledRequests,
      },
    });
  } catch (error) {
    next(error);
  }
};