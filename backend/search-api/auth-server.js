const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage (in-memory for now)
let students = [
  {
    _id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: "password"
    department: 'Computer Science',
    yearOfStudy: 'Final Year',
    gpa: 3.8,
    atsScore: 92,
    points: 150,
    connections: 5,
    isVerified: true
  }
];

let alumni = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: "password"
    company: 'Google',
    position: 'Senior Software Engineer',
    batchStart: 2018,
    batchEnd: 2022,
    isVerified: true
  }
];

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Health check
app.get('/health', (req, res) => res.send('OK'));


// Alumni registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, companyName, batchStart, batchEnd, userType } = req.body;
    
    // Determine if this is student or alumni registration
    if (userType === 'alumni') {
      // Check if alumni already exists
      const existing = alumni.find(a => a.email === email);
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create new alumni
      const alumnus = {
        _id: (alumni.length + 1).toString(),
        name,
        email,
        passwordHash,
        company: companyName || 'Unknown Company',
        position: 'Alumni',
        batchStart: batchStart || new Date().getFullYear() - 4,
        batchEnd: batchEnd || new Date().getFullYear(),
        isVerified: false
      };
      
      alumni.push(alumnus);
      
      res.status(201).json({ 
        id: alumnus._id, 
        email: alumnus.email,
        message: 'Alumni registered successfully'
      });
    } else {
      // Student registration (existing code)
      const { yearOfStudy, department } = req.body;
      
      // Check if student already exists
      const existing = students.find(s => s.email === email);
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create new student
      const student = {
        _id: (students.length + 1).toString(),
        name,
        email,
        passwordHash,
        department: department || 'Computer Science',
        yearOfStudy: yearOfStudy || 'Final Year',
        gpa: 0,
        atsScore: 0,
        points: 0,
        connections: 0,
        isVerified: false
      };
      
      students.push(student);
      
      res.status(201).json({ 
        id: student._id, 
        email: student.email,
        message: 'Student registered successfully'
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Alumni login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    
    if (userType === 'alumni') {
      const alumnus = alumni.find(a => a.email === email);
      if (!alumnus) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const valid = await bcrypt.compare(password, alumnus.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: alumnus._id, email: alumnus.email, type: 'alumni' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.json({ accessToken: token });
    } else {
      // Student login (existing code)
      const student = students.find(s => s.email === email);
      if (!student) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const valid = await bcrypt.compare(password, student.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: student._id, email: student.email, type: 'student' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.json({ accessToken: token });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get alumni profile
app.get('/api/auth/profile', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type === 'alumni') {
      const alumnus = alumni.find(a => a._id === decoded.id);
      if (!alumnus) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      
      // Return alumni data without password
      const { passwordHash, ...alumniData } = alumnus;
      res.json(alumniData);
    } else {
      // Student profile (existing code)
      const student = students.find(s => s._id === decoded.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      // Return student data without password
      const { passwordHash, ...studentData } = student;
      res.json(studentData);
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Authentication server is running!', 
    studentCount: students.length,
    alumniCount: alumni.length,
    endpoints: [
      'POST /api/auth/register (student)',
      'POST /api/auth/login (student)', 
      'GET /api/auth/profile (student)',
      'POST /api/auth/register (alumni)',
      'POST /api/auth/login (alumni)',
      'GET /api/auth/profile (alumni)'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ Authentication server running on port ${PORT}`);
  console.log(`🌐 Test URL: http://localhost:${PORT}/api/test`);
  console.log(`📝 Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`👤 Profile: GET http://localhost:${PORT}/api/auth/profile`);
});
