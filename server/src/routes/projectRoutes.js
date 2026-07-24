import { Router } from 'express';
import {
  getProjects,
  getProject,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getProjects);
router.get('/admin/all', protect, getAllProjectsAdmin);
router.get('/:id', getProject);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
