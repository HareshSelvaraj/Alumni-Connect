const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('./models/user');
const verifyToken = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(express.json());

// Rate Limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP. Try again later.'
}));

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected")).catch(err => console.error("DB Error:", err));

// Registration Endpoint
app.post('/register', async (req, res) => {
  const { email, password, linkedin_url } = req.body;
  const ip = req.ip;

  // College Email Check (update to your domain)
  const emailRegex = /^[\w.-]+@([\w-]+\.)*sijosephs\.ac\.in$/i;
  if (!emailRegex.test(email)) return res.status(400).send('College email (@sijosephs.ac.in) required.');

  // LinkedIn URL Check
  const linkedinRegex = /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  if (!linkedinRegex.test(linkedin_url)) return res.status(400).send('Valid LinkedIn required.');

  // Save user
  const user = await User.create({
    email,
    password,
    linkedin_url,
    ip_address: ip
  });

  // Email verification token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const verifyLink = `http://localhost:${process.env.PORT}/verify?token=${token}`;

  console.log(`🔗 Email verification link (copy-paste for demo): ${verifyLink}`);

  res.send('Registered. Check email (console log) to verify.');
});

// Email Verification Endpoint
app.get('/verify', async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, is_email_verified: false });

    if (!user) return res.status(400).send('Invalid or already verified.');

    user.is_email_verified = true;
    await user.save();

    res.send('✅ Email verified. Awaiting admin approval.');
  } catch {
    res.status(400).send('Invalid or expired token.');
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); // For demo only (hash passwords for prod)

  if (!user) return res.status(404).send('User not found.');
  if (!user.is_email_verified) return res.status(403).send('Please verify your email.');
  if (!user.is_admin_approved) return res.status(403).send('Waiting for admin approval.');

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
  res.json({ accessToken });
});

// JWT-Protected Example Route
app.get('/protected', verifyToken, (req, res) => {
  res.send(`Hello user ${req.user.id}, you're authorized.`);
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
