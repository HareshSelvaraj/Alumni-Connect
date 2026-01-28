// src/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  skills: [String],
  projects: [{ title: String, description: String, link: String }],
  reputation: {
    up:    { type: Number, default: 0 },
    down:  { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Student', StudentSchema);
