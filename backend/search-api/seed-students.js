const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://testuser:testpass@cluster0.mongodb.net/alumni-platform?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  yearOfStudy: String,
  gpa: Number,
  atsScore: Number,
  points: Number,
  connections: Number,
  resumeUrl: String,
  skills: [String],
  interests: [String],
  location: String,
  linkedinUrl: String,
  githubUrl: String,
  createdAt: Date,
  lastActive: Date,
  isVerified: Boolean,
  phone: String,
  achievements: [String]
});

const Student = mongoose.model('Student', studentSchema);

// Comprehensive student data
const studentData = [
  {
    name: "John Smith",
    email: "john.smith@university.edu",
    department: "Computer Science",
    yearOfStudy: "Final Year",
    gpa: 3.8,
    atsScore: 92,
    points: 850,
    connections: 45,
    skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB"],
    interests: ["Web Development", "AI/ML", "Open Source"],
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com/in/johnsmith",
    githubUrl: "https://github.com/johnsmith",
    isVerified: true,
    phone: "+1 (555) 123-4567",
    achievements: ["Dean's List 2023", "Hackathon Winner", "Research Assistant"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Sarah Chen",
    email: "sarah.chen@university.edu",
    department: "Data Science",
    yearOfStudy: "3rd Year",
    gpa: 3.9,
    atsScore: 95,
    points: 920,
    connections: 38,
    skills: ["Python", "R", "SQL", "Machine Learning", "TensorFlow"],
    interests: ["Data Analysis", "Statistics", "Research"],
    location: "New York, NY",
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    githubUrl: "https://github.com/sarahchen",
    isVerified: true,
    phone: "+1 (555) 234-5678",
    achievements: ["Research Grant Recipient", "Data Science Competition Winner"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    department: "Computer Science",
    yearOfStudy: "2nd Year",
    gpa: 3.7,
    atsScore: 88,
    points: 720,
    connections: 32,
    skills: ["Java", "Spring Boot", "MySQL", "Docker", "AWS"],
    interests: ["Backend Development", "Cloud Computing", "DevOps"],
    location: "Austin, TX",
    linkedinUrl: "https://linkedin.com/in/alexjohnson",
    githubUrl: "https://github.com/alexjohnson",
    isVerified: true,
    phone: "+1 (555) 345-6789",
    achievements: ["AWS Certified", "Backend Excellence Award"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@university.edu",
    department: "Computer Science",
    yearOfStudy: "Final Year",
    gpa: 3.9,
    atsScore: 94,
    points: 890,
    connections: 52,
    skills: ["C++", "Python", "Computer Vision", "OpenCV", "PyTorch"],
    interests: ["Computer Vision", "AI/ML", "Robotics"],
    location: "Boston, MA",
    linkedinUrl: "https://linkedin.com/in/emmawilson",
    githubUrl: "https://github.com/emmawilson",
    isVerified: true,
    phone: "+1 (555) 456-7890",
    achievements: ["Computer Vision Research", "AI Innovation Award"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "David Kim",
    email: "david.kim@university.edu",
    department: "Data Science",
    yearOfStudy: "3rd Year",
    gpa: 3.8,
    atsScore: 91,
    points: 810,
    connections: 41,
    skills: ["Python", "Pandas", "Scikit-learn", "Jupyter", "Tableau"],
    interests: ["Data Visualization", "Business Intelligence", "Analytics"],
    location: "Seattle, WA",
    linkedinUrl: "https://linkedin.com/in/davidkim",
    githubUrl: "https://github.com/davidkim",
    isVerified: true,
    phone: "+1 (555) 567-8901",
    achievements: ["Data Visualization Expert", "Analytics Competition Winner"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Lisa Wang",
    email: "lisa.wang@university.edu",
    department: "Computer Science",
    yearOfStudy: "1st Year",
    gpa: 3.6,
    atsScore: 85,
    points: 580,
    connections: 25,
    skills: ["HTML", "CSS", "JavaScript", "React", "Git"],
    interests: ["Frontend Development", "UI/UX", "Web Design"],
    location: "Los Angeles, CA",
    linkedinUrl: "https://linkedin.com/in/lisawang",
    githubUrl: "https://github.com/lisawang",
    isVerified: true,
    phone: "+1 (555) 678-9012",
    achievements: ["Web Design Award", "Freshman Excellence"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Michael Brown",
    email: "michael.brown@university.edu",
    department: "Computer Science",
    yearOfStudy: "Final Year",
    gpa: 3.7,
    atsScore: 89,
    points: 780,
    connections: 48,
    skills: ["Go", "Kubernetes", "Microservices", "Docker", "Linux"],
    interests: ["System Architecture", "DevOps", "Cloud Native"],
    location: "Chicago, IL",
    linkedinUrl: "https://linkedin.com/in/michaelbrown",
    githubUrl: "https://github.com/michaelbrown",
    isVerified: true,
    phone: "+1 (555) 789-0123",
    achievements: ["System Architecture Award", "DevOps Excellence"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@university.edu",
    department: "Data Science",
    yearOfStudy: "2nd Year",
    gpa: 3.8,
    atsScore: 90,
    points: 750,
    connections: 35,
    skills: ["R", "Python", "Statistics", "SQL", "Power BI"],
    interests: ["Statistical Analysis", "Business Analytics", "Research"],
    location: "Miami, FL",
    linkedinUrl: "https://linkedin.com/in/sophiarodriguez",
    githubUrl: "https://github.com/sophiarodriguez",
    isVerified: true,
    phone: "+1 (555) 890-1234",
    achievements: ["Statistical Analysis Award", "Research Grant"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "James Lee",
    email: "james.lee@university.edu",
    department: "Computer Science",
    yearOfStudy: "3rd Year",
    gpa: 3.9,
    atsScore: 93,
    points: 860,
    connections: 44,
    skills: ["Swift", "iOS Development", "Xcode", "Firebase", "UI/UX"],
    interests: ["Mobile Development", "iOS", "App Design"],
    location: "San Diego, CA",
    linkedinUrl: "https://linkedin.com/in/jameslee",
    githubUrl: "https://github.com/jameslee",
    isVerified: true,
    phone: "+1 (555) 901-2345",
    achievements: ["iOS Development Award", "App Store Success"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  },
  {
    name: "Olivia Taylor",
    email: "olivia.taylor@university.edu",
    department: "Data Science",
    yearOfStudy: "Final Year",
    gpa: 3.8,
    atsScore: 92,
    points: 830,
    connections: 39,
    skills: ["Python", "Deep Learning", "TensorFlow", "NLP", "BERT"],
    interests: ["Natural Language Processing", "Deep Learning", "AI Research"],
    location: "Denver, CO",
    linkedinUrl: "https://linkedin.com/in/oliviataylor",
    githubUrl: "https://github.com/oliviataylor",
    isVerified: true,
    phone: "+1 (555) 012-3456",
    achievements: ["NLP Research Award", "Deep Learning Excellence"],
    createdAt: new Date("2023-09-01"),
    lastActive: new Date()
  }
];

async function seedStudents() {
  try {
    // Clear existing student data
    await Student.deleteMany({});
    console.log('Cleared existing student data');

    // Insert new student data
    const result = await Student.insertMany(studentData);
    console.log(`Successfully seeded ${result.length} student records`);

    // Display some sample data
    console.log('\nSample student data:');
    const sampleStudents = await Student.find().limit(3);
    sampleStudents.forEach(student => {
      console.log(`- ${student.name} (${student.yearOfStudy} ${student.department})`);
    });

    console.log('\nStudent data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding student data:', error);
    process.exit(1);
  }
}

// Export student data for use in other scripts
module.exports = { studentData };

// Run the seeding function if this file is executed directly
if (require.main === module) {
  seedStudents();
} 