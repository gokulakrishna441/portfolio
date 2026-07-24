import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    university: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
