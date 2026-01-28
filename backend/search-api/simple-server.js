const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
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

// Helper function to filter data
function filterData(data, query, filters) {
  return data.filter(item => {
    // Text search
    if (query) {
      const searchText = query.toLowerCase();
      const matchesQuery = 
        item.name.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        (item.company && item.company.toLowerCase().includes(searchText)) ||
        (item.position && item.position.toLowerCase().includes(searchText)) ||
        item.skills.some(skill => skill.toLowerCase().includes(searchText));
      
      if (!matchesQuery) return false;
    }

    // Department filter
    if (filters.department && item.department !== filters.department) {
      return false;
    }

    // Company filter
    if (filters.company && item.company !== filters.company) {
      return false;
    }

    // Graduation year filter
    if (filters.graduationYear && item.graduationYear !== parseInt(filters.graduationYear)) {
      return false;
    }

    // Skills filter
    if (filters.skills && !item.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase()))) {
      return false;
    }

    // Location filter
    if (filters.location && item.location !== filters.location) {
      return false;
    }

    return true;
  });
}

// API Routes
app.get('/api/search/students', (req, res) => {
  try {
    const { query, department, graduationYear, location } = req.query;
    const filters = { department, graduationYear, location };
    
    const results = filterData(studentData, query, filters);
    res.json(results);
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/search/alumni', (req, res) => {
  try {
    const { query, department, company, graduationYear, skills } = req.query;
    const filters = { department, company, graduationYear, skills };
    
    const results = filterData(alumniData, query, filters);
    res.json(results);
  } catch (error) {
    console.error('Error searching alumni:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/search/filters', (req, res) => {
  try {
    const departments = [...new Set([...studentData.map(s => s.department), ...alumniData.map(a => a.department)])];
    const companies = [...new Set(alumniData.map(a => a.company))];
    const graduationYears = [...new Set([...studentData.map(s => s.graduationYear), ...alumniData.map(a => a.graduationYear)])];
    const skills = [...new Set([...studentData.flatMap(s => s.skills), ...alumniData.flatMap(a => a.skills)])];
    
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

app.get('/api/students/:id', (req, res) => {
  try {
    const student = studentData.find(s => s.id === req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/alumni/:id', (req, res) => {
  try {
    const alumni = alumniData.find(a => a.id === req.params.id);
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' });
    }
    res.json(alumni);
  } catch (error) {
    console.error('Error getting alumni:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Search endpoints:`);
  console.log(`   - Students: http://localhost:${PORT}/api/search/students`);
  console.log(`   - Alumni: http://localhost:${PORT}/api/search/alumni`);
  console.log(`   - Filters: http://localhost:${PORT}/api/search/filters`);
}); 