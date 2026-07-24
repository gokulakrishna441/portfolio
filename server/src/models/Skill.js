import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Languages', 'Frontend', 'Backend', 'Databases', 'API & Technologies', 'Tools & Platforms'],
      required: true,
    },
    level: { type: Number, min: 1, max: 100, default: 80 },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
