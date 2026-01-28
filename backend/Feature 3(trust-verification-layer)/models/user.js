const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String, // In production, hash passwords
  linkedin_url: String,
  is_email_verified: { type: Boolean, default: false },
  is_admin_approved: { type: Boolean, default: false },
  ip_address: String
});

module.exports = mongoose.model('User', UserSchema);
