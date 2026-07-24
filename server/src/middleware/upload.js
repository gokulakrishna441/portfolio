import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/resumes'));
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, unique);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only PDF/DOC/DOCX files allowed'), false);
};

export const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
