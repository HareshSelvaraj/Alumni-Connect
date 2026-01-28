const mongoose = require('mongoose');

const ResumeAnalysisSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  originalFilename: String,
  fileUrl: String,
  score: Number,
  breakdown: {
    formatting: Number,
    keywords: Number,
    structure: Number,
    presentation: Number,
  },
  verificationCode: { type: String, index: true },
  analyzedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ResumeAnalysis', ResumeAnalysisSchema);



