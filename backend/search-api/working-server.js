const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage (in-memory for now)
let alumniData = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    position: 'Senior Software Engineer',
    department: 'Computer Science',
    company: 'Google',
    graduationYear: '2020',
    location: 'Mountain View, CA',
    rating: 4.8,
    email: 'sarah.johnson@google.com',
    phone: '+1 (555) 345-6789',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    achievements: ['Senior Engineer', 'Mentor of the Year'],
    studentsMentored: 15,
    successfulReferrals: 8,
    pendingRequests: 3
  },
  {
    _id: '2',
    name: 'Michael Chen',
    position: 'Product Manager',
    department: 'Computer Science',
    company: 'Microsoft',
    graduationYear: '2019',
    location: 'Seattle, WA',
    rating: 4.6,
    email: 'michael.chen@microsoft.com',
    phone: '+1 (555) 456-7890',
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
    achievements: ['Product Manager', 'Innovation Award'],
    studentsMentored: 12,
    successfulReferrals: 6,
    pendingRequests: 2
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    position: 'Engineering Manager',
    department: 'Computer Science',
    company: 'Meta',
    graduationYear: '2018',
    location: 'Menlo Park, CA',
    rating: 4.7,
    email: 'emily.rodriguez@meta.com',
    phone: '+1 (555) 567-8901',
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
    achievements: ['Engineering Manager', 'Best Team Lead'],
    studentsMentored: 20,
    successfulReferrals: 12,
    pendingRequests: 5
  }
];

let studentData = [
  {
    _id: '1',
    name: 'John Smith',
    yearOfStudy: 'Final Year',
    department: 'Computer Science',
    gpa: 3.8,
    atsScore: 92,
    email: 'john.smith@university.edu',
    phone: '+1 (555) 123-4567',
    linkedinUrl: 'https://linkedin.com/in/johnsmith',
    achievements: ["Dean's List 2023", "Hackathon Winner"],
    skills: ['JavaScript', 'React', 'Node.js', 'Python']
  },
  {
    _id: '2',
    name: 'Sarah Chen',
    yearOfStudy: '3rd Year',
    department: 'Data Science',
    gpa: 3.9,
    atsScore: 95,
    email: 'sarah.chen@university.edu',
    phone: '+1 (555) 234-5678',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    achievements: ['Research Grant Recipient', 'Data Science Competition Winner'],
    skills: ['Python', 'R', 'SQL', 'Machine Learning']
  }
];

// Search Alumni API
app.get('/api/search/alumni', (req, res) => {
  const { query, department, company } = req.query;
  
  let results = [...alumniData];
  
  if (query) {
    results = results.filter(alumni => 
      alumni.name.toLowerCase().includes(query.toLowerCase()) ||
      alumni.company.toLowerCase().includes(query.toLowerCase()) ||
      alumni.position.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (department) {
    results = results.filter(alumni => 
      alumni.department.toLowerCase().includes(department.toLowerCase())
    );
  }
  
  if (company) {
    results = results.filter(alumni => 
      alumni.company.toLowerCase().includes(company.toLowerCase())
    );
  }
  
  res.json(results);
});

// Search Students API
app.get('/api/search/students', (req, res) => {
  const { query, department, batch } = req.query;
  
  let results = [...studentData];
  
  if (query) {
    results = results.filter(student => 
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.department.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (department) {
    results = results.filter(student => 
      student.department.toLowerCase().includes(department.toLowerCase())
    );
  }
  
  if (batch) {
    results = results.filter(student => 
      student.yearOfStudy.toLowerCase().includes(batch.toLowerCase())
    );
  }
  
  res.json(results);
});

// Search Filters API
app.get('/api/search/filters', (req, res) => {
  const { userType } = req.query;
  
  if (userType === 'student') {
    res.json({
      departments: ['Computer Science', 'Data Science', 'Engineering'],
      companies: ['Google', 'Microsoft', 'Meta', 'Amazon', 'Apple'],
      batches: ['2020', '2019', '2018', '2017', '2016'],
      positions: ['Senior Software Engineer', 'Product Manager', 'Engineering Manager']
    });
  } else {
    res.json({
      departments: ['Computer Science', 'Data Science', 'Engineering'],
      batches: ['Final Year', '3rd Year', '2nd Year', '1st Year'],
      positions: ['Student', 'Research Assistant', 'Intern']
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Working server is running!', 
    alumniCount: alumniData.length,
    studentCount: studentData.length
  });
});

app.listen(PORT, () => {
  console.log(`✅ Working server running on port ${PORT}`);
  console.log(`🌐 Test URL: http://localhost:${PORT}/api/test`);
  console.log(`🔍 Search filters: http://localhost:${PORT}/api/search/filters?userType=student`);
  console.log(`👥 Alumni search: http://localhost:${PORT}/api/search/alumni?query=sarah`);
  console.log(`🎓 Student search: http://localhost:${PORT}/api/search/students?query=john`);
}); 