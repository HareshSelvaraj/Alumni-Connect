const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const adminRoutes = require('./routes/admin');
const adminAuth = require('./middleware/adminAuth');

const app = express();

// --- Rate Limit Middleware (Optional for admin API, adjust as needed) ---
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});

// --- Middleware Setup ---
app.use(cors());
app.use(express.json());

// --- Logging Middleware ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} Query:`, req.query);
  next();
});

// --- Admin API Routes (Protected, Rate-limited) ---
app.use('/api/admin', limiter, adminAuth, adminRoutes);

// --- MongoDB Connection ---
mongoose.connect('mongodb://localhost:27017/alumni-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

// --- Start Server ---
const PORT = process.env.PORT || 5005; // Different port to avoid conflict
app.listen(PORT, () => console.log(`Feature 5 Admin Dashboard running on port ${PORT}`));
