// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email in use' });
    const hash = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, passwordHash: hash });
    res.status(201).json({ id: student._id, email: student.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, student.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ accessToken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
