import Donation from '../models/Donation.js';
import EmergencyRequest from '../models/EmergencyRequest.js';
import User from '../models/User.js';

// @desc    Create donation record
// @route   POST /api/donations
// @access  Private (Hospital only)
export const createDonation = async (req, res, next) => {
  try {
    const { donorId, requestId, units, notes } = req.body;

    const donor = await User.findById(donorId);
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found',
      });
    }

    let request = null;
    if (requestId) {
      request = await EmergencyRequest.findById(requestId);
    }

    const donation = await Donation.create({
      donor: donorId,
      hospital: req.user._id,
      request: requestId,
      donorName: donor.name,
      hospitalName: req.user.hospitalName || req.user.name,
      bloodType: donor.bloodType,
      units,
      donationDate: new Date(),
      notes,
    });

    // Update donor's last donation date
    donor.lastDonationDate = new Date();
    await donor.save();

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      donation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donations for current user
// @route   GET /api/donations
// @access  Private
export const getDonations = async (req, res, next) => {
  try {
    let donations;

    if (req.user.role === 'hospital') {
      donations = await Donation.find({ hospital: req.user._id }).sort({ donationDate: -1 });
    } else if (req.user.role === 'donor') {
      donations = await Donation.find({ donor: req.user._id }).sort({ donationDate: -1 });
    } else {
      donations = await Donation.find({}).sort({ donationDate: -1 });
    }

    res.json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donation stats for donor
// @route   GET /api/donations/stats
// @access  Private (Donor only)
export const getDonationStats = async (req, res, next) => {
  try {
    const totalDonations = await Donation.countDocuments({ donor: req.user._id });
    const totalUnits = await Donation.aggregate([
      { $match: { donor: req.user._id } },
      { $group: { _id: null, total: { $sum: '$units' } } },
    ]);

    const lastDonation = await Donation.findOne({ donor: req.user._id }).sort({ donationDate: -1 });

    res.json({
      success: true,
      stats: {
        totalDonations,
        totalUnits: totalUnits.length > 0 ? totalUnits[0].total : 0,
        lastDonationDate: lastDonation ? lastDonation.donationDate : null,
      },
    });
  } catch (error) {
    next(error);
  }
};