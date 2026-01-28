const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Alumni Connect Backend is running',
    timestamp: new Date().toISOString(),
    services: {
      searchApi: 'Available at /api/search',
      feature1: 'Alumni Directory Search',
      feature2: 'Student Profile & Referral System',
      feature3: 'Trust Verification Layer',
      feature4: 'Secure Messaging Chat',
      feature5: 'Admin Dashboard Oversight'
    }
  });
});

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Alumni Connect Backend API',
    version: '1.0.0',
    description: 'Multi-service backend for Alumni Connect Platform',
    endpoints: {
      health: 'GET /health',
      search: {
        students: 'GET /api/search/students',
        alumni: 'GET /api/search/alumni',
        filters: 'GET /api/search/filters'
      },
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      features: {
        feature1: 'Alumni Directory Search - Port 5000',
        feature2: 'Student Profile & Referral System - Port 3001',
        feature3: 'Trust Verification Layer - Port 3003',
        feature4: 'Secure Messaging Chat - Port 3004',
        feature5: 'Admin Dashboard Oversight - Port 3005',
        searchApi: 'Search API - Port 3002'
      }
    },
    documentation: 'See README.md for detailed API documentation'
  });
});

// Redirect to search API for main functionality
app.get('/api/search/*', (req, res) => {
  res.redirect(`http://localhost:3002${req.originalUrl}`);
});

// Redirect to auth endpoints
app.use('/api/auth', (req, res) => {
  res.redirect(`http://localhost:3002${req.originalUrl}`);
});

// Serve static files if any
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: 'Please check the API documentation at /api',
    availableEndpoints: [
      'GET /health',
      'GET /api',
      'GET /api/search/students',
      'GET /api/search/alumni',
      'POST /api/auth/register',
      'POST /api/auth/login'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Alumni Connect Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
  console.log(`\n🔧 Available Services:`);
  console.log(`   • Main API: http://localhost:${PORT}`);
  console.log(`   • Search API: http://localhost:3002`);
  console.log(`   • Feature 1 (Alumni Directory): http://localhost:5000`);
  console.log(`   • Feature 2 (Student Profile): http://localhost:3001`);
  console.log(`   • Feature 3 (Trust Verification): http://localhost:3003`);
  console.log(`   • Feature 4 (Secure Messaging): http://localhost:3004`);
  console.log(`   • Feature 5 (Admin Dashboard): http://localhost:3005`);
});
