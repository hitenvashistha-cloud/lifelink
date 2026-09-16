import Camp from '../models/Camp.js';
import User from '../models/User.js';
import { createBulkNotifications } from '../services/notificationService.js';

// @desc    Create blood camp
// @route   POST /api/camps
// @access  Private (Admin only)
export const createCamp = async (req, res, next) => {
  try {
    const {
      name,
      organizer,
      address,
      state,
      city,
      pincode,
      date,
      startTime,
      endTime,
      contactPhone,
      description,
    } = req.body;

    const camp = await Camp.create({
      name,
      organizer,
      address,
      state,
      city,
      pincode,
      date,
      startTime,
      endTime,
      contactPhone,
      description,
      createdBy: req.user._id,
    });

    // Notify all donors
    try {
      const donors = await User.find({ role: 'donor', isActive: true }).select('_id');
      const donorIds = donors.map((d) => d._id);

      if (donorIds.length > 0) {
        await createBulkNotifications(donorIds, {
          title: 'New Blood Donation Camp',
          message: `${name} is being organized at ${city} on ${new Date(date).toLocaleDateString('en-IN')}. Join us!`,
          type: 'camp',
          link: '/view-camps',
        });
      }
    } catch (notifError) {
      console.error('Notification error:', notifError);
    }

    res.status(201).json({
      success: true,
      message: 'Blood camp created successfully',
      camp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all camps
// @route   GET /api/camps
// @access  Private
export const getCamps = async (req, res, next) => {
  try {
    const camps = await Camp.find({}).sort({ date: 1 });

    res.json({
      success: true,
      count: camps.length,
      camps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming camps
// @route   GET /api/camps/upcoming
// @access  Private
export const getUpcomingCamps = async (req, res, next) => {
  try {
    const camps = await Camp.find({
      date: { $gte: new Date() },
      status: { $in: ['Upcoming', 'Ongoing'] },
    }).sort({ date: 1 });

    res.json({
      success: true,
      count: camps.length,
      camps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update camp status
// @route   PUT /api/camps/:id/status
// @access  Private (Admin only)
export const updateCampStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        success: false,
        message: 'Camp not found',
      });
    }

    camp.status = status;
    await camp.save();

    res.json({
      success: true,
      message: 'Camp status updated',
      camp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete camp
// @route   DELETE /api/camps/:id
// @access  Private (Admin only)
export const deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({
        success: false,
        message: 'Camp not found',
      });
    }

    await camp.deleteOne();

    res.json({
      success: true,
      message: 'Camp deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};