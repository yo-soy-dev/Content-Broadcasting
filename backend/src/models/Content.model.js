import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    filePublicId: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['jpg', 'jpeg', 'png', 'gif'],
      required: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    rotationDuration: {
      type: Number,
      default: 30,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    screen: {
      type: String,
      required: [true, 'Screen is required'],
      enum: ['Screen 1', 'Screen 2', 'Screen 3', 'Main Hall', 'Classroom A', 'Classroom B'],
      trim: true,
    },
  },
  { timestamps: true }
);

contentSchema.index({ uploadedBy: 1, status: 1 });
contentSchema.index({ status: 1, startTime: 1, endTime: 1 });

export default mongoose.model('Content', contentSchema);
