// src/routes/profileRoutes.js
const express = require('express');
const {
  getMyProfile,
  updateProfile,
  getProfileById,
} = require('../controllers/profileController');
const auth = require('../middleware/auth');
const { validateProfileUpdate } = require('../utils/validators');

const router = express.Router();

router.get('/me', auth, getMyProfile);
router.put('/', auth, validateProfileUpdate, updateProfile);
router.get('/:id', auth, getProfileById);

module.exports = router;
