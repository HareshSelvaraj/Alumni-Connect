// 1. Connect to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

console.log('ENV MONGO_URI:', process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✔ MongoDB connected'))
  .catch(err => {
    console.error('✖ MongoDB connection error:', err);
    process.exit(1);
  });

// 2. Register models
require('./models/Student');
require('./models/Referral');

// 3. Create Express app
const app = express();
app.use(express.json());

// 4. Health check
app.get('/health', (req, res) => res.send('OK'));

// 5. Mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/ats', require('./routes/atsRoutes'));

// 6. Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
