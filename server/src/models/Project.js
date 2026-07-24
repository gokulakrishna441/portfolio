import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    category: {
      type: String,
      enum: ['Full Stack', 'Frontend', 'Backend', 'ERP', 'Other'],
      default: 'Full Stack',
    },
    features: [{ type: String }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', shortDescription: 'text', techStack: 'text' });

export default mongoose.model('Project', projectSchema);
