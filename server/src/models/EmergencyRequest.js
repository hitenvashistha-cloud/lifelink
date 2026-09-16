import mongoose from 'mongoose';

const emergencyRequestSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
    },
    bloodType: {
      type: String,
      required: [true, 'Blood type is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    unitsNeeded: {
      type: Number,
      required: [true, 'Units needed is required'],
      min: [1, 'At least 1 unit is required'],
    },
    urgency: {
      type: String,
      enum: ['Critical', 'High', 'Medium'],
      default: 'Medium',
    },
    hospitalAddress: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    contactPhone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Fulfilled', 'Closed'],
      default: 'Open',
    },
    acceptedDonors: [
      {
        donor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        donorName: String,
        donorPhone: String,
        acceptedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

emergencyRequestSchema.index({ location: '2dsphere' });

const EmergencyRequest = mongoose.model('EmergencyRequest', emergencyRequestSchema);

export default EmergencyRequest;