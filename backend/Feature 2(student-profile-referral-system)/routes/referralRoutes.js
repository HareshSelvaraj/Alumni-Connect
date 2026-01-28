// src/routes/referralRoutes.js
const express = require('express');
const {
  sendRequest,
  listSent,
  respond,
} = require('../controllers/referralController');
const auth = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');
const { validateReferral } = require('../utils/validators');

const router = express.Router();

router.post('/', auth, rateLimiter, validateReferral, sendRequest);
router.get('/sent', auth, listSent);
router.put('/:id/respond', auth, respond);

module.exports = router;
