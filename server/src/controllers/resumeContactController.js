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

export const downloadResume = async (_req, res, next) => {
  try {
    const resume = await Resume.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!resume) return res.status(404).json({ success: false, message: 'No resume uploaded' });

    const filePath = path.isAbsolute(resume.path)
      ? resume.path
      : path.join(__dirname, '../../', resume.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Resume file missing' });
    }

    res.download(filePath, resume.originalName || 'Gokula_Krishna_Resume.pdf');
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
      path: path.join('uploads/resumes', req.file.filename),
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
    try {
      const result = await sendContactEmail({ name, email, subject, message });
      emailSent = !result?.skipped;
    } catch (emailErr) {
      // Never fail the contact form if SMTP times out / misconfigured.
      console.error('[Contact email failed]', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: emailSent
        ? 'Message sent successfully'
        : 'Message saved successfully. Email notification may be delayed.',
      data: { id: saved._id, emailSent },
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
