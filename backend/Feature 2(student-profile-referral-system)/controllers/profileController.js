// src/controllers/profileController.js
const Student = require('../models/Student');

exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-passwordHash');
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const updates = (({ skills, projects }) => ({ skills, projects }))(req.body);
  try {
    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select('-passwordHash');
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-passwordHash');
    if (!student) return res.status(404).send('Not found');
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
