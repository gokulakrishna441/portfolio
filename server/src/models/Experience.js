import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: [{ type: String }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
