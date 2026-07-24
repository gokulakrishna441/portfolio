import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, default: '' },
    about: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    socials: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    availability: { type: String, default: 'Open to opportunities' },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
