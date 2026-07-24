import { Router } from 'express';
import {
  getActiveResume,
  downloadResume,
  uploadResumeFile,
  listResumes,
  submitContact,
  listMessages,
  markMessageRead,
} from '../controllers/resumeContactController.js';
import { protect } from '../middleware/auth.js';
import { uploadResume } from '../middleware/upload.js';

const router = Router();

router.get('/resume', getActiveResume);
router.get('/resume/download', downloadResume);
router.get('/resume/admin', protect, listResumes);
router.post('/resume/upload', protect, uploadResume.single('resume'), uploadResumeFile);

router.post('/contact', submitContact);
router.get('/messages', protect, listMessages);
router.patch('/messages/:id/read', protect, markMessageRead);

export default router;
