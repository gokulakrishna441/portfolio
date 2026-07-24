import { Router } from 'express';
import {
  skills,
  experiences,
  education,
  certifications,
  getProfile,
  updateProfile,
} from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/skills', skills.listPublic);
router.get('/skills/admin', protect, skills.listAdmin);
router.post('/skills', protect, skills.create);
router.put('/skills/:id', protect, skills.update);
router.delete('/skills/:id', protect, skills.remove);

router.get('/experience', experiences.listPublic);
router.get('/experience/admin', protect, experiences.listAdmin);
router.post('/experience', protect, experiences.create);
router.put('/experience/:id', protect, experiences.update);
router.delete('/experience/:id', protect, experiences.remove);

router.get('/education', education.listPublic);
router.get('/education/admin', protect, education.listAdmin);
router.post('/education', protect, education.create);
router.put('/education/:id', protect, education.update);
router.delete('/education/:id', protect, education.remove);

router.get('/certifications', certifications.listPublic);
router.get('/certifications/admin', protect, certifications.listAdmin);
router.post('/certifications', protect, certifications.create);
router.put('/certifications/:id', protect, certifications.update);
router.delete('/certifications/:id', protect, certifications.remove);

router.get('/profile', getProfile);
router.put('/profile', protect, updateProfile);

export default router;
