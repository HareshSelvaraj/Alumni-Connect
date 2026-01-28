const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy','Medium','Hard'], required: true },
  timeline: { type: String },
  skills: [{ type: String }],
  deadline: { type: Date },
  alumni: {
    name: String,
    email: String,
    company: String,
    avatar: String,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);



