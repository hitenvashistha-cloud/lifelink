import EmergencyRequest from '../models/EmergencyRequest.js';
import User from '../models/User.js';
import { createBulkNotifications } from '../services/notificationService.js';
import { sendToUser, sendToRole, sendToUsers } from '../socket/index.js';

// @desc    Create emergency blood request
// @route   POST /api/requests
// @access  Private (Hospital only)
export const createRequest = async (req, res, next) => {
  try {
    const {
      patientName,
      bloodType,
      unitsNeeded,
      urgency,
      hospitalAddress,
      state,
      city,
      contactPhone,
      notes,
      coordinates,
    } = req.body;

    const requestData = {
      hospital: req.user._id,
      hospitalName: req.user.hospitalName || req.user.name,
      patientName,
      bloodType,
      unitsNeeded,
      urgency,
      hospitalAddress: hospitalAddress || req.user.address,
      state: state || req.user.state,
      city: city || req.user.city,
      contactPhone: contactPhone || req.user.phone,
      notes,
    };

    if (req.user.location && req.user.location.coordinates[0] !== 0) {
      requestData.location = {
        type: 'Point',
        coordinates: req.user.location.coordinates,
      };
    } else if (coordinates && coordinates.length === 2) {
      requestData.location = {
        type: 'Point',
        coordinates: coordinates,
      };
    }

    const request = await EmergencyRequest.create(requestData);

    // Real-time: Broadcast new request to all donors
    sendToRole('donor', 'request:new', request);

    // Notify matching donors
    try {
      let donors = [];

      if (request.location && request.location.coordinates[0] !== 0) {
        donors = await User.find({
          role: 'donor',
          bloodType,
          isActive: true,
          _id: { $ne: req.user._id },
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: request.location.coordinates,
              },
              $maxDistance: 50000,
            },
          },
        }).select('_id');
      } else {
        donors = await User.find({
          role: 'donor',
          bloodType,
          isActive: true,
          city: request.city,
        }).select('_id');
      }

      const donorIds = donors.map((d) => d._id);

      if (donorIds.length > 0) {
        await createBulkNotifications(donorIds, {
          title: 'Urgent Blood Needed',
          message: `${request.hospitalName} needs ${unitsNeeded} unit(s) of ${bloodType} blood in ${city}. ${urgency} priority.`,
          type: 'request',
          link: '/nearby-requests',
        });
      }
    } catch (notifError) {
      console.error('Notification error:', notifError);
    }

    res.status(201).json({
      success: true,
      message: 'Emergency request created successfully',
      request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all emergency requests
// @route   GET /api/requests
// @access  Private
export const getRequests = async (req, res, next) => {
  try {
    let requests;

    if (req.user.role === 'hospital') {
      requests = await EmergencyRequest.find({ hospital: req.user._id }).sort({ createdAt: -1 });
    } else {
      requests = await EmergencyRequest.find({ status: 'Open' }).sort({ createdAt: -1 });
    }

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearby requests
// @route   GET /api/requests/nearby
// @access  Private (Donor only)
export const getNearbyRequests = async (req, res, next) => {
  try {
    const { lat, lng, radius = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusInMeters = parseFloat(radius) * 1000;

    const requests = await EmergencyRequest.find({
      status: 'Open',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusInMeters,
        },
      },
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearby donors
// @route   GET /api/requests/:id/nearby-donors
// @access  Private (Hospital only)
export const getNearbyDonors = async (req, res, next) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    const { radius = 10 } = req.query;
    const radiusInMeters = parseFloat(radius) * 1000;

    let donors;

    if (request.location && request.location.coordinates[0] !== 0) {
      donors = await User.find({
        role: 'donor',
        bloodType: request.bloodType,
        isActive: true,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: request.location.coordinates,
            },
            $maxDistance: radiusInMeters,
          },
        },
      }).select('-password');
    } else {
      donors = await User.find({
        role: 'donor',
        bloodType: request.bloodType,
        isActive: true,
        city: request.city,
      }).select('-password');
    }

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Private
export const getRequestById = async (req, res, next) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept request
// @route   PUT /api/requests/:id/accept
// @access  Private (Donor only)
export const acceptRequest = async (req, res, next) => {
  try {
    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    const alreadyAccepted = request.acceptedDonors.find(
      (d) => d.donor.toString() === req.user._id.toString()
    );

    if (alreadyAccepted) {
      return res.status(400).json({
        success: false,
        message: 'You have already accepted this request',
      });
    }

    request.acceptedDonors.push({
      donor: req.user._id,
      donorName: req.user.name,
      donorPhone: req.user.phone,
    });

    if (request.acceptedDonors.length >= request.unitsNeeded) {
      request.status = 'In Progress';
    }

    await request.save();

    // Real-time: Notify hospital that a donor accepted
    sendToUser(request.hospital.toString(), 'request:accepted', {
      requestId: request._id,
      donorName: req.user.name,
      donorPhone: req.user.phone,
      patientName: request.patientName,
    });

    // Notify hospital via notification
    try {
      await createBulkNotifications([request.hospital], {
        title: 'Donor Accepted Your Request',
        message: `${req.user.name} (${req.user.phone}) has accepted your request for ${request.patientName}.`,
        type: 'donation',
        link: '/hospital-requests',
      });
    } catch (notifError) {
      console.error('Notification error:', notifError);
    }

    res.json({
      success: true,
      message: 'Request accepted successfully',
      request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private (Hospital only)
export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const request = await EmergencyRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    if (request.hospital.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this request',
      });
    }

    request.status = status;
    await request.save();

    // Real-time: Notify all accepted donors of status change
    const donorIds = request.acceptedDonors.map((d) => d.donor.toString());

    sendToUsers(donorIds, 'request:status-changed', {
      requestId: request._id,
      status,
      patientName: request.patientName,
    });

    // Also broadcast to all donors for real-time list updates
    sendToRole('donor', 'request:updated', request);

    // Notify accepted donors via notification
    try {
      if (donorIds.length > 0) {
        await createBulkNotifications(donorIds, {
          title: 'Request Status Updated',
          message: `Your accepted request for ${request.patientName} is now ${status}.`,
          type: 'request',
          link: '/my-donations',
        });
      }
    } catch (notifError) {
      console.error('Notification error:', notifError);
    }

    res.json({
      success: true,
      message: 'Request status updated',
      request,
    });
  } catch (error) {
    next(error);
  }
};