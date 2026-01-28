const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Prefer environment variable; fall back to local MongoDB if not provided
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/impactathon';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Alumni Schema
const alumniSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  department: String,
  company: String,
  position: String,
  graduationYear: Number,
  skills: [String],
  location: String,
  linkedin: String,
  avatar: String
});

// Student Schema
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  passwordHash: String,
  department: String,
  graduationYear: Number,
  yearOfStudy: String,
  skills: [String],
  location: String,
  avatar: String,
  gpa: Number,
  atsScore: Number,
  points: Number,
  connections: Number,
  isVerified: Boolean
});

// Authentication Schema for Students
const studentAuthSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  department: String,
  yearOfStudy: String,
  gpa: { type: Number, default: 0 },
  atsScore: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  connections: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false }
});

// Authentication Schema for Alumni
const alumniAuthSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  company: String,
  position: String,
  batchStart: Number,
  batchEnd: Number,
  isVerified: { type: Boolean, default: false }
});

const Alumni = mongoose.model('Alumni', alumniSchema);
const Student = mongoose.model('Student', studentSchema);
const StudentAuth = mongoose.model('StudentAuth', studentAuthSchema);
const AlumniAuth = mongoose.model('AlumniAuth', alumniAuthSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Seed data
const alumniData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@google.com',
    department: 'Computer Science',
    company: 'Google',
    position: 'Senior Software Engineer',
    graduationYear: 2018,
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@microsoft.com',
    department: 'Computer Science',
    company: 'Microsoft',
    position: 'Software Engineer',
    graduationYear: 2019,
    skills: ['C#', '.NET', 'Azure', 'SQL'],
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/michaelchen',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@amazon.com',
    department: 'Computer Science',
    company: 'Amazon',
    position: 'Backend Developer',
    graduationYear: 2020,
    skills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/emilyrodriguez',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@apple.com',
    department: 'Computer Science',
    company: 'Apple',
    position: 'iOS Developer',
    graduationYear: 2017,
    skills: ['Swift', 'iOS', 'Xcode', 'Objective-C'],
    location: 'Cupertino, CA',
    linkedin: 'linkedin.com/in/davidkim',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@netflix.com',
    department: 'Computer Science',
    company: 'Netflix',
    position: 'Data Scientist',
    graduationYear: 2019,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    location: 'Los Gatos, CA',
    linkedin: 'linkedin.com/in/lisawang',
    avatar: '/placeholder-user.jpg'
  }
];

const studentData = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.thompson@student.edu',
    department: 'Computer Science',
    graduationYear: 2024,
    skills: ['JavaScript', 'React', 'Node.js'],
    location: 'New York, NY',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@student.edu',
    department: 'Computer Science',
    graduationYear: 2024,
    skills: ['Python', 'Django', 'PostgreSQL'],
    location: 'Los Angeles, CA',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '3',
    name: 'James Wilson',
    email: 'james.wilson@student.edu',
    department: 'Computer Science',
    graduationYear: 2025,
    skills: ['Java', 'Spring Boot', 'MySQL'],
    location: 'Chicago, IL',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '4',
    name: 'Sophie Brown',
    email: 'sophie.brown@student.edu',
    department: 'Computer Science',
    graduationYear: 2025,
    skills: ['C++', 'Data Structures', 'Algorithms'],
    location: 'Boston, MA',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '5',
    name: 'Ryan Davis',
    email: 'ryan.davis@student.edu',
    department: 'Computer Science',
    graduationYear: 2024,
    skills: ['TypeScript', 'Angular', 'Firebase'],
    location: 'Austin, TX',
    avatar: '/placeholder-user.jpg'
  }
];

// Authentication Routes

// Student registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, yearOfStudy, department, companyName, batchStart, batchEnd, userType } = req.body;
    
    if (userType === 'alumni') {
      // Alumni registration
      const existing = await AlumniAuth.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      const passwordHash = await bcrypt.hash(password, 10);
      const alumnus = new AlumniAuth({
        name,
        email,
        passwordHash,
        company: companyName || 'Unknown Company',
        position: 'Alumni',
        batchStart: batchStart || new Date().getFullYear() - 4,
        batchEnd: batchEnd || new Date().getFullYear(),
        isVerified: false
      });
      
      await alumnus.save();
      res.status(201).json({ 
        id: alumnus._id, 
        email: alumnus.email,
        message: 'Alumni registered successfully'
      });
    } else {
      // Student registration
      const existing = await StudentAuth.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      const passwordHash = await bcrypt.hash(password, 10);
      const student = new StudentAuth({
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
      });
      
      await student.save();
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

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    
    if (userType === 'alumni') {
      const alumnus = await AlumniAuth.findOne({ email });
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
      const student = await StudentAuth.findOne({ email });
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

// Get profile
app.get('/api/auth/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type === 'alumni') {
      const alumnus = await AlumniAuth.findById(decoded.id);
      if (!alumnus) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      
      const { passwordHash, ...alumniData } = alumnus.toObject();
      res.json(alumniData);
    } else {
      const student = await StudentAuth.findById(decoded.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      
      const { passwordHash, ...studentData } = student.toObject();
      res.json(studentData);
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// API Routes
app.get('/api/search/students', async (req, res) => {
  try {
    const { query, department, graduationYear } = req.query;
    let filter = {};
    
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { skills: { $in: [new RegExp(query, 'i')] } }
      ];
    }
    
    if (department) {
      filter.department = department;
    }
    
    if (graduationYear) {
      filter.graduationYear = parseInt(graduationYear);
    }
    
    const students = await Student.find(filter);
    res.json(students);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/search/alumni', async (req, res) => {
  try {
    const { query, department, company, graduationYear, skills } = req.query;
    let filter = {};
    
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
        { position: { $regex: query, $options: 'i' } },
        { skills: { $in: [new RegExp(query, 'i')] } }
      ];
    }
    
    if (department) {
      filter.department = department;
    }
    
    if (company) {
      filter.company = company;
    }
    
    if (graduationYear) {
      filter.graduationYear = parseInt(graduationYear);
    }
    
    if (skills) {
      filter.skills = { $in: [new RegExp(skills, 'i')] };
    }
    
    const alumni = await Alumni.find(filter);
    res.json(alumni);
  } catch (error) {
    console.error('Error searching alumni:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/search/filters', async (req, res) => {
  try {
    const departments = await Student.distinct('department');
    const companies = await Alumni.distinct('company');
    const graduationYears = await Student.distinct('graduationYear');
    const skills = await Student.distinct('skills');
    
    res.json({
      departments,
      companies,
      graduationYears: graduationYears.sort((a, b) => b - a),
      skills
    });
  } catch (error) {
    console.error('Error getting filters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/alumni/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ id: req.params.id });
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' });
    }
    res.json(alumni);
  } catch (error) {
    console.error('Error getting alumni:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Seed endpoint
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Student.deleteMany({});
    await Alumni.deleteMany({});
    
    // Insert new data
    await Student.insertMany(studentData);
    await Alumni.insertMany(alumniData);
    
    console.log('Database seeded successfully');
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Error seeding database' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Seed endpoint: POST http://localhost:${PORT}/api/seed`);
}); 