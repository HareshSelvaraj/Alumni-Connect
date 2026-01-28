// Simple token-based admin access for hackathon/demo
module.exports = (req, res, next) => {
  if (req.headers['x-admin-token'] !== 'supersecrettoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
