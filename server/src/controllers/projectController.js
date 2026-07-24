import Project from '../models/Project.js';

export const getProjects = async (req, res, next) => {
  try {
    const { q, category, featured } = req.query;
    const filter = { isPublished: true };

    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (q) filter.$text = { $search: q };

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { isPublished: true };
    const isObjectId = /^[a-f\d]{24}$/i.test(id);
    filter.$or = isObjectId ? [{ slug: id }, { _id: id }] : [{ slug: id }];

    const project = await Project.findOne(filter);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const getAllProjectsAdmin = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

export const createProject = async (req, res, next) => {
  try {
    if (!req.body.slug && req.body.title) {
      req.body.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
