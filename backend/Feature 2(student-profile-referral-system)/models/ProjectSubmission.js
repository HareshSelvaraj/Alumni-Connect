const mongoose = require('mongoose');

const ProjectSubmissionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  description: String,
  technologies: [String],
  files: [
    {
      filename: String,
      url: String,
      size: Number,
      mimetype: String,
    }
  ],
  status: { type: String, enum: ['Not Started','In Progress','Submitted','Reviewed'], default: 'Submitted' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProjectSubmission', ProjectSubmissionSchema);



