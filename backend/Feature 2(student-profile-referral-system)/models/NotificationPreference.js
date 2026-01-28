const mongoose = require('mongoose');

const NotificationPreferenceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', unique: true },
  events: { type: Boolean, default: true },
  jobs: { type: Boolean, default: true },
  referrals: { type: Boolean, default: true },
  projects: { type: Boolean, default: true },
  achievements: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NotificationPreference', NotificationPreferenceSchema);



