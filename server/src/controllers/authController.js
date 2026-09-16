import User from '../models/User.js';
import OTP from '../models/OTP.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { sendOTP } from '../services/otpService.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

// @desc    Register a new donor
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, bloodType, state, city } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone',
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      bloodType,
      state,
      city,
      role: 'donor',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodType: user.bloodType,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new hospital
// @route   POST /api/auth/register-hospital
// @access  Public
export const registerHospital = async (req, res, next) => {
  try {
    const {
      hospitalName,
      email,
      phone,
      password,
      state,
      city,
      hospitalType,
      licenseNumber,
      address,
      pincode,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Hospital already exists with this email or phone',
      });
    }

    const user = await User.create({
      name: hospitalName,
      hospitalName,
      email,
      phone,
      password,
      state,
      city,
      hospitalType,
      licenseNumber,
      address,
      pincode,
      role: 'hospital',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Hospital registered successfully. Awaiting admin approval.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        hospitalName: user.hospitalName,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodType: user.bloodType,
        role: user.role,
        hospitalName: user.hospitalName,
        isVerified: user.isVerified,
        location: user.location,
        city: user.city,
        state: user.state,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      bloodType,
      state,
      city,
      hospitalName,
      hospitalType,
      licenseNumber,
      address,
      pincode,
      coordinates,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bloodType) user.bloodType = bloodType;
    if (state) user.state = state;
    if (city) user.city = city;
    if (hospitalName) user.hospitalName = hospitalName;
    if (hospitalType) user.hospitalType = hospitalType;
    if (licenseNumber) user.licenseNumber = licenseNumber;
    if (address) user.address = address;
    if (pincode) user.pincode = pincode;

    if (coordinates && coordinates.length === 2) {
      user.location = {
        type: 'Point',
        coordinates: coordinates,
      };
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bloodType: user.bloodType,
        role: user.role,
        hospitalName: user.hospitalName,
        hospitalType: user.hospitalType,
        licenseNumber: user.licenseNumber,
        address: user.address,
        pincode: user.pincode,
        state: user.state,
        city: user.city,
        isVerified: user.isVerified,
        location: user.location,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate OTP for registration
// @route   POST /api/auth/generate-otp
// @access  Public
export const generateOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.create({
      phone,
      otp,
      purpose: 'registration',
      expiresAt,
    });

    // Send OTP via SMS service
    const result = await sendOTP(phone, otp);

    if (!result.success) {
      console.log(`SMS failed. OTP for ${phone}: ${otp}`);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.',
      });
    }

    res.json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required',
      });
    }

    const otpRecord = await OTP.findOne({
      phone,
      otp,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    otpRecord.isUsed = true;
    await otpRecord.save();

    res.json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password - send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    let user;

    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email or phone',
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.create({
      phone: user.phone,
      otp,
      purpose: 'password-reset',
      expiresAt,
    });

    const result = await sendOTP(user.phone, otp);

    if (!result.success) {
      console.log(`SMS failed. Password reset OTP for ${user.phone}: ${otp}`);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.',
      });
    }

    res.json({
      success: true,
      message: 'OTP sent to your registered phone number',
      phone: user.phone,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password after OTP verification
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    const { phone, otp, newPassword } = req.body;

    if (!phone || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Phone, OTP and new password are required',
      });
    }

    const otpRecord = await OTP.findOne({
      phone,
      otp,
      purpose: 'password-reset',
      isUsed: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    const user = await User.findOne({ phone }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.password = newPassword;
    await user.save();

    otpRecord.isUsed = true;
    await otpRecord.save();

    res.json({
      success: true,
      message: 'Password reset successful. Please login with new password.',
    });
  } catch (error) {
    next(error);
  }
};