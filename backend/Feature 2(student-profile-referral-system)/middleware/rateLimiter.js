// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
module.exports = rateLimit({
  windowMs: 24*60*60*1000,
  max: 3, // max 3 requests per student per day
  keyGenerator: req => req.user.id
});
