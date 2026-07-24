import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Certification', certificationSchema);
