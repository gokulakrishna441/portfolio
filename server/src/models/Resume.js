import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    path: { type: String, required: true },
    mimeType: { type: String, default: 'application/pdf' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
