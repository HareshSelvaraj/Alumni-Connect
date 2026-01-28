// src/controllers/referralController.js
const Referral = require('../models/Referral');
const Student = require('../models/Student');
const { sendReferralRequest } = require('../utils/email');

exports.sendRequest = async (req, res) => {
  const { toEmail, message } = req.body;
  try {
    const fromStudent = await Student.findById(req.user.id);
    const referral = await Referral.create({
      from: fromStudent._id,
      toEmail,
      message,
    });
    await sendReferralRequest({
      to: toEmail,
      fromName: fromStudent.name,
      msg: message,
    });
    res.status(201).json(referral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listSent = async (req, res) => {
  try {
    const list = await Referral.find({ from: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respond = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // "accepted" or "rejected"
  if (!['accepted', 'rejected'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action' });
  }
  try {
    const ref = await Referral.findByIdAndUpdate(
      id,
      { status: action },
      { new: true }
    );
    res.json(ref);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
