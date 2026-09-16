import mongoose from 'mongoose';

const campSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Camp name is required'],
      trim: true,
    },
    organizer: {
      type: String,
      required: [true, 'Organizer name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    state: {
      type: String,
      required: [true, 'State is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode'],
    },
    date: {
      type: Date,
      required: [true, 'Camp date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Camp = mongoose.model('Camp', campSchema);

export default Camp;