import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import validator from 'validator';
import Resume from '../models/Resume.js';
import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getActiveResume = async (_req, res, next) => {
  try {
    const resume = await Resume.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!resume) return res.status(404).json({ success: false, message: 'No resume uploaded' });
    res.json({ success: true, data: resume });
  } catch (err) {
    next(err);
  }
};

const resolveResumePath = (storedPath) => {
  const normalized = String(storedPath || '').replace(/\\/g, '/');
  if (path.isAbsolute(normalized)) return normalized;
  return path.join(__dirname, '../../', normalized);
};

const DEFAULT_RESUME_RELATIVE = 'uploads/resumes/Gokula_Krishna_Resume.pdf';
const DEFAULT_RESUME_NAME = 'Gokula_Krishna_Resume.pdf';

export const downloadResume = async (_req, res, next) => {
  try {
    const resume = await Resume.findOne({ isActive: true }).sort({ createdAt: -1 });
    const candidates = [];

    if (resume?.path) {
      candidates.push({
        filePath: resolveResumePath(resume.path),
        downloadName: resume.originalName || DEFAULT_RESUME_NAME,
      });
    }

    // Fallback: bundled resume committed in the repo (survives Render redeploys)
    candidates.push({
      filePath: resolveResumePath(DEFAULT_RESUME_RELATIVE),
      downloadName: DEFAULT_RESUME_NAME,
    });

    const match = candidates.find((item) => fs.existsSync(item.filePath));
    if (!match) {
      return res.status(404).json({ success: false, message: 'Resume file missing' });
    }

    res.download(match.filePath, match.downloadName);
  } catch (err) {
    next(err);
  }
};

export const uploadResumeFile = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    await Resume.updateMany({}, { isActive: false });

    const resume = await Resume.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      // Always store posix-style paths so Linux (Render) can resolve them
      path: `uploads/resumes/${req.file.filename}`,
      mimeType: req.file.mimetype,
      isActive: true,
    });

    res.status(201).json({ success: true, data: resume });
  } catch (err) {
    next(err);
  }
};

export const listResumes = async (_req, res, next) => {
  try {
    const data = await Resume.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }
    if (message.length < 5) {
      return res.status(400).json({ success: false, message: 'Message is too short (min 5 characters)' });
    }

    const saved = await Message.create({ name, email, subject, message });

    let emailSent = false;
    let emailError = null;
    let thankYouSent = false;
    try {
      const result = await sendContactEmail({ name, email, subject, message });
      if (result?.skipped) {
        emailError = result.reason || 'Email skipped';
      } else {
        emailSent = true;
        thankYouSent = Boolean(result?.thankYouSent);
        if (result?.thankYouError) {
          emailError = `Admin email sent. Thank-you email failed: ${result.thankYouError}`;
        }
      }
    } catch (emailErr) {
      emailError = emailErr.message || 'Email send failed';
      console.error('[Contact email failed]', emailError);
    }

    res.status(201).json({
      success: true,
      message: emailSent
        ? thankYouSent
          ? 'Message sent successfully. A thank-you email was also sent.'
          : 'Message sent successfully'
        : 'Message saved successfully. Email notification may be delayed.',
      data: { id: saved._id, emailSent, thankYouSent, emailError },
    });
  } catch (err) {
    next(err);
  }
};

export const listMessages = async (_req, res, next) => {
  try {
    const data = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const data = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!data) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
