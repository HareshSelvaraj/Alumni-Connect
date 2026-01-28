// src/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// 1. Connect to MongoDB before anything else
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log('✔ MongoDB connected'))
  .catch(err => {
    console.error('✖ MongoDB connection error:', err);
    process.exit(1);
  });

// 2. Import your Mongoose models so they register on the default connection
require('./models/Student');
require('./models/Referral');

// 3. Create Express app
const app = express();
app.use(express.json());

// 4. Health check
app.get('/health', (req, res) => res.send('OK'));

// 5. Mount your routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));

// 6. Start the HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
