const express = require('express');
const NotificationPreference = require('../models/NotificationPreference');
const auth = require('../middleware/auth');

const router = express.Router();

// Get my notification preferences
router.get('/prefs', auth, async (req, res) => {
  try {
    let prefs = await NotificationPreference.findOne({ student: req.user.id });
    if (!prefs) prefs = await NotificationPreference.create({ student: req.user.id });
    res.json(prefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update preferences
router.put('/prefs', auth, async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: new Date() };
    const prefs = await NotificationPreference.findOneAndUpdate(
      { student: req.user.id },
      update,
      { new: true, upsert: true }
    );
    res.json(prefs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;



