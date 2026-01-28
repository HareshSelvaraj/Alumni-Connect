const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');
const ErrorLog = require('../models/ErrorLog');

// Helper for error/event logging
async function logError(type, detail) {
  try {
    await ErrorLog.create({ type, detail, createdAt: new Date() });
  } catch (err) {
    console.error('Failed to log admin event:', err);
  }
}

// ============= Analytics Overview =============
router.get('/overview', async (req, res) => {
  try {
    const alumniCount = await Alumni.countDocuments();
    const pendingProfiles = await Alumni.countDocuments({ isVerified: false });
    const requestsToday = 0; // Placeholder. Replace if request model is added.
    res.json({ alumniCount, pendingProfiles, requestsToday });
  } catch (err) {
    await logError('admin-overview-fail', { err: err.message });
    res.status(500).json({ error: 'Failed to fetch overview data' });
  }
});

// ============= Pending Profiles List =============
router.get('/pending-profiles', async (req, res) => {
  try {
    const pending = await Alumni.find({ isVerified: false });
    res.json(pending);
  } catch (err) {
    await logError('admin-pending-fail', { err: err.message });
    res.status(500).json({ error: 'Failed to fetch pending profiles' });
  }
});

// ============= Approve/Reject Profile =============
router.post('/profile/:id/verify', async (req, res) => {
  const { approve } = req.body;
  try {
    await Alumni.findByIdAndUpdate(req.params.id, { isVerified: !!approve });
    res.json({ success: true });
  } catch (err) {
    await logError('admin-verify-fail', { alumniId: req.params.id, err: err.message });
    res.status(500).json({ error: 'Failed to update alumni profile status' });
  }
});

// ============= Error Logs List =============
router.get('/error-logs', async (req, res) => {
  try {
    const logs = await ErrorLog.find().sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch error logs' });
  }
});

module.exports = router;
