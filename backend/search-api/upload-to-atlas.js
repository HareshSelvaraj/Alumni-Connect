const mongoose = require('mongoose');
require('dotenv').config();

// Replace this with your actual MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://hareshswork:VlKXP7DZ3uMF8waD@vms.oqbam.mongodb.net/alumni-platform?retryWrites=true&w=majority&appName=VMS';

console.log('🚀 Uploading data to MongoDB Atlas...');
console.log('Please replace the MONGODB_URI in this file with your actual connection string');
console.log('');

// Alumni Schema
const alumniSchema = new mongoose.Schema({
  name: String,
  email: String,
  graduationYear: String,
  department: String,
  company: String,
  position: String,
  location: String,
  rating: Number,
  studentsMentored: Number,
  successfulReferrals: Number,
  pendingRequests: Number,
  skills: [String],
  interests: [String],
  linkedinUrl: String,
  githubUrl: String,
  isVerified: Boolean,
  createdAt: Date,
  lastActive: Date,
  phone: String,
  achievements: [String]
});

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

const Alumni = mongoose.model('Alumni', alumniSchema);
const Student = mongoose.model('Student', studentSchema);

// Alumni data
const alumniData = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@google.com",
    graduationYear: "2020",
    department: "Computer Science",
    company: "Google",
    position: "Senior Software Engineer",
    location: "Mountain View, CA",
    rating: 4.8,
    studentsMentored: 15,
    successfulReferrals: 8,
    pendingRequests: 3,
    skills: ["Java", "Python", "System Design", "Leadership", "Cloud Computing"],
    interests: ["Mentoring", "Technical Leadership", "Open Source"],
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    githubUrl: "https://github.com/sarahjohnson",
    isVerified: true,
    phone: "+1 (555) 345-6789",
    achievements: ["Senior Engineer", "Mentor of the Year", "Technical Lead"],
    createdAt: new Date("2020-06-15"),
    lastActive: new Date()
  },
  {
    name: "Michael Chen",
    email: "michael.chen@microsoft.com",
    graduationYear: "2019",
    department: "Computer Science",
    company: "Microsoft",
    position: "Product Manager",
    location: "Seattle, WA",
    rating: 4.6,
    studentsMentored: 12,
    successfulReferrals: 6,
    pendingRequests: 2,
    skills: ["Product Management", "User Research", "Agile", "Data Analysis", "Strategy"],
    interests: ["Product Strategy", "User Experience", "Innovation"],
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    githubUrl: "https://github.com/michaelchen",
    isVerified: true,
    phone: "+1 (555) 456-7890",
    achievements: ["Product Manager", "Innovation Award", "Leadership Excellence"],
    createdAt: new Date("2019-05-20"),
    lastActive: new Date()
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@meta.com",
    graduationYear: "2018",
    department: "Computer Science",
    company: "Meta",
    position: "Engineering Manager",
    location: "Menlo Park, CA",
    rating: 4.7,
    studentsMentored: 20,
    successfulReferrals: 12,
    pendingRequests: 5,
    skills: ["Leadership", "System Design", "Python", "React", "Team Management"],
    interests: ["Engineering Management", "Team Building", "Technical Architecture"],
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
    githubUrl: "https://github.com/emilyrodriguez",
    isVerified: true,
    phone: "+1 (555) 567-8901",
    achievements: ["Engineering Manager", "Best Team Lead", "Architecture Excellence"],
    createdAt: new Date("2018-07-10"),
    lastActive: new Date()
  }
];

// Student data
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
  }
];

async function uploadToAtlas() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Alumni.deleteMany({});
    await Student.deleteMany({});
    console.log('✅ Cleared existing data');

    // Upload alumni data
    const alumniResult = await Alumni.insertMany(alumniData);
    console.log(`✅ Uploaded ${alumniResult.length} alumni records`);

    // Upload student data
    const studentResult = await Student.insertMany(studentData);
    console.log(`✅ Uploaded ${studentResult.length} student records`);

    console.log('');
    console.log('🎉 Data uploaded successfully to MongoDB Atlas!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`- Alumni: ${alumniResult.length} records`);
    console.log(`- Students: ${studentResult.length} records`);
    console.log('');
    console.log('🔍 You can now check your MongoDB Atlas dashboard to see the data');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading data:', error.message);
    console.log('');
    console.log('💡 Make sure to:');
    console.log('1. Replace the MONGODB_URI with your actual connection string');
    console.log('2. Check your internet connection');
    console.log('3. Verify your MongoDB Atlas credentials');
    process.exit(1);
  }
}

// Run the upload
uploadToAtlas(); 