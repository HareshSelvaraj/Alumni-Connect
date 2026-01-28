// routes/alumni.js
const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

// GET /api/alumni/search?company=Amazon&graduationYear=2019&minPackage=10
router.get('/search', async (req, res) => {
  try {
    const { company, graduationYear, minPackage } = req.query;
    if (graduationYear && isNaN(Number(graduationYear))) {
      return res.status(400).json({ error: 'graduationYear must be a number' });
    }
    if (minPackage && isNaN(Number(minPackage))) {
      return res.status(400).json({ error: 'minPackage must be a number' });
    }

    let filter = { isVerified: true };
    if (company) filter.currentCompany = { $regex: company, $options: 'i' };
    if (graduationYear) filter.graduationYear = Number(graduationYear);
    if (minPackage) filter.packageLPA = { $gte: Number(minPackage) };

    const alumni = await Alumni.find(filter);
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ error: 'Server error occurred: ' + err.message });
  }
});

module.exports = router;
