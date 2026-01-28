const mongoose = require('mongoose');
const ErrorLogSchema = new mongoose.Schema({
  type: String,
  detail: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
