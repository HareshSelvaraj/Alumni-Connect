const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alumniRoutes = require('./routes/alumni');

const app = express();
const rateLimit = require('express-rate-limit');

// Limit each IP to 30 requests per 10 minutes for ALL routes (adjust as needed)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/alumni', limiter, alumniRoutes);
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} Query:`, req.query);
  next();
});


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/alumni-db',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"))
 .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
