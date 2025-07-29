const mongoose = require('mongoose');

// Alumni Schema for St. Joseph's College of Engineering
const AlumniSchema = new mongoose.Schema({
  name: String,
  graduationYear: Number,
  department: String,
  currentCompany: String,
  position: String,
  location: String,
  packageLPA: Number,
  linkedinURL: String,
  email: { type: String, unique: true },
  skillsNotes: String,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alumni', AlumniSchema);
