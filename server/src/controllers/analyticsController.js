import EmergencyRequest from '../models/EmergencyRequest.js';
import Donation from '../models/Donation.js';
import Inventory from '../models/Inventory.js';
import User from '../models/User.js';

// @desc    Get hospital analytics
// @route   GET /api/analytics/hospital
// @access  Private (Hospital only)
export const getHospitalAnalytics = async (req, res, next) => {
  try {
    const hospitalId = req.user._id;

    // Total requests
    const totalRequests = await EmergencyRequest.countDocuments({ hospital: hospitalId });

    // Requests by status
    const requestsByStatus = await EmergencyRequest.aggregate([
      { $match: { hospital: hospitalId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Requests by urgency
    const requestsByUrgency = await EmergencyRequest.aggregate([
      { $match: { hospital: hospitalId } },
      { $group: { _id: '$urgency', count: { $sum: 1 } } },
    ]);

    // Requests by blood type
    const requestsByBloodType = await EmergencyRequest.aggregate([
      { $match: { hospital: hospitalId } },
      { $group: { _id: '$bloodType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Monthly requests (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRequests = await EmergencyRequest.aggregate([
      {
        $match: {
          hospital: hospitalId,
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Inventory by blood type
    const inventory = await Inventory.find({ hospital: hospitalId });

    // Total donations received
    const totalDonations = await Donation.countDocuments({ hospital: hospitalId });

    // Total accepted donors
    const acceptedDonorsAgg = await EmergencyRequest.aggregate([
      { $match: { hospital: hospitalId } },
      { $group: { _id: null, total: { $sum: { $size: '$acceptedDonors' } } } },
    ]);
    const totalAcceptedDonors = acceptedDonorsAgg[0]?.total || 0;

    // Fulfillment rate
    const fulfilledCount = requestsByStatus.find((r) => r._id === 'Fulfilled')?.count || 0;
    const fulfillmentRate = totalRequests > 0 ? Math.round((fulfilledCount / totalRequests) * 100) : 0;

    res.json({
      success: true,
      analytics: {
        totalRequests,
        totalDonations,
        totalAcceptedDonors,
        fulfillmentRate,
        requestsByStatus,
        requestsByUrgency,
        requestsByBloodType,
        monthlyRequests,
        inventory,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin analytics
// @route   GET /api/analytics/admin
// @access  Private (Admin only)
export const getAdminAnalytics = async (req, res, next) => {
  try {
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const totalHospitals = await User.countDocuments({ role: 'hospital' });
    const totalRequests = await EmergencyRequest.countDocuments();
    const totalDonations = await Donation.countDocuments();

    // Blood type distribution
    const bloodTypeDistribution = await User.aggregate([
      { $match: { role: 'donor', bloodType: { $exists: true } } },
      { $group: { _id: '$bloodType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // City distribution (top 10)
    const cityDistribution = await User.aggregate([
      { $match: { role: 'donor', city: { $exists: true } } },
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Monthly growth (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthlyRequests = await EmergencyRequest.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const requestsByStatus = await EmergencyRequest.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      analytics: {
        totalDonors,
        totalHospitals,
        totalRequests,
        totalDonations,
        bloodTypeDistribution,
        cityDistribution,
        monthlyUsers,
        monthlyRequests,
        requestsByStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donor analytics
// @route   GET /api/analytics/donor
// @access  Private (Donor only)
export const getDonorAnalytics = async (req, res, next) => {
  try {
    const donorId = req.user._id;

    const totalDonations = await Donation.countDocuments({ donor: donorId });

    const totalUnitsAgg = await Donation.aggregate([
      { $match: { donor: donorId } },
      { $group: { _id: null, total: { $sum: '$units' } } },
    ]);
    const totalUnits = totalUnitsAgg[0]?.total || 0;

    const acceptedRequests = await EmergencyRequest.countDocuments({
      'acceptedDonors.donor': donorId,
    });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyDonations = await Donation.aggregate([
      {
        $match: {
          donor: donorId,
          donationDate: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$donationDate' },
            month: { $month: '$donationDate' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({
      success: true,
      analytics: {
        totalDonations,
        totalUnits,
        acceptedRequests,
        monthlyDonations,
      },
    });
  } catch (error) {
    next(error);
  }
};