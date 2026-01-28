const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const ResumeAnalysis = require('../models/ResumeAnalysis');

const router = express.Router();

// Simple disk storage (for production use S3 or similar)
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e6)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.mimetype)) cb(null, true); else cb(new Error('Invalid file type'));
  }
});

// Upload and analyze resume
router.post('/analyze', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Mock analysis scoring
    const score = Math.floor(70 + Math.random() * 30);
    const breakdown = {
      formatting: Math.floor(15 + Math.random() * 10),
      keywords: Math.floor(15 + Math.random() * 10),
      structure: Math.floor(15 + Math.random() * 10),
      presentation: Math.floor(15 + Math.random() * 10),
    };
    const verificationCode = `ATS-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const record = await ResumeAnalysis.create({
      student: req.user.id,
      originalFilename: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      score,
      breakdown,
      verificationCode,
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get my latest analysis
router.get('/me/latest', auth, async (req, res) => {
  try {
    const latest = await ResumeAnalysis.findOne({ student: req.user.id }).sort({ analyzedAt: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



