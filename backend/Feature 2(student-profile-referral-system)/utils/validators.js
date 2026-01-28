// src/utils/validators.js
const { body, validationResult } = require('express-validator');

const validate = (checks) => async (req, res, next) => {
  await Promise.all(checks.map(check => check.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateRegister = validate([
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 chars'),
]);

exports.validateLogin = validate([
  body('email').isEmail(),
  body('password').exists(),
]);

exports.validateProfileUpdate = validate([
  body('skills').optional().isArray(),
  body('projects').optional().isArray(),
]);

exports.validateReferral = validate([
  body('toEmail').isEmail().withMessage('Valid recipient email'),
  body('message').notEmpty().withMessage('Message cannot be blank'),
]);
