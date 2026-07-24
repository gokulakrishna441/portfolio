import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Profile from '../models/Profile.js';

const crud = (Model, label) => ({
  listPublic: async (_req, res, next) => {
    try {
      const data = await Model.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  listAdmin: async (_req, res, next) => {
    try {
      const data = await Model.find().sort({ order: 1, createdAt: -1 });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const data = await Model.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!data) return res.status(404).json({ success: false, message: `${label} not found` });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const data = await Model.findByIdAndDelete(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: `${label} not found` });
      res.json({ success: true, message: `${label} deleted` });
    } catch (err) {
      next(err);
    }
  },
});

export const skills = crud(Skill, 'Skill');
export const experiences = crud(Experience, 'Experience');
export const education = crud(Education, 'Education');
export const certifications = crud(Certification, 'Certification');

export const getProfile = async (_req, res, next) => {
  try {
    const data = await Profile.findOne();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let data = await Profile.findOne();
    if (!data) data = await Profile.create(req.body);
    else {
      Object.assign(data, req.body);
      await data.save();
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
