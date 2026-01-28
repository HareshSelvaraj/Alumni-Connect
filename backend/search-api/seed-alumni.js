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

const Alumni = mongoose.model('Alumni', alumniSchema);

// Comprehensive alumni data
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
  },
  {
    name: "James Wilson",
    email: "james.wilson@stripe.com",
    graduationYear: "2017",
    department: "Computer Science",
    company: "Stripe",
    position: "VP Engineering",
    location: "San Francisco, CA",
    rating: 4.9,
    studentsMentored: 25,
    successfulReferrals: 18,
    pendingRequests: 7,
    skills: ["Leadership", "Strategic Planning", "System Architecture", "Go", "JavaScript"],
    interests: ["Diversity", "Inclusion", "Team Building", "Strategic Planning"],
    linkedinUrl: "https://linkedin.com/in/jameswilson",
    githubUrl: "https://github.com/jameswilson",
    isVerified: true,
    phone: "+1 (555) 678-9012",
    achievements: ["VP Engineering", "Diversity Champion", "Strategic Leader"],
    createdAt: new Date("2017-08-25"),
    lastActive: new Date()
  },
  {
    name: "Lisa Wang",
    email: "lisa.wang@airbnb.com",
    graduationYear: "2016",
    department: "Computer Science",
    company: "Airbnb",
    position: "Staff Engineer",
    location: "San Francisco, CA",
    rating: 4.8,
    studentsMentored: 18,
    successfulReferrals: 10,
    pendingRequests: 4,
    skills: ["Code Review", "Engineering Best Practices", "Ruby", "JavaScript", "Architecture"],
    interests: ["Code Quality", "Engineering Excellence", "Knowledge Sharing"],
    linkedinUrl: "https://linkedin.com/in/lisawang",
    githubUrl: "https://github.com/lisawang",
    isVerified: true,
    phone: "+1 (555) 789-0123",
    achievements: ["Staff Engineer", "Code Review Expert", "Engineering Excellence"],
    createdAt: new Date("2016-09-15"),
    lastActive: new Date()
  },
  {
    name: "Alex Thompson",
    email: "alex.thompson@startupxyz.com",
    graduationYear: "2015",
    department: "Computer Science",
    company: "StartupXYZ",
    position: "CTO",
    location: "Austin, TX",
    rating: 4.5,
    studentsMentored: 30,
    successfulReferrals: 22,
    pendingRequests: 8,
    skills: ["Scaling", "Leadership", "Engineering", "Startup Experience", "Python"],
    interests: ["Scaling", "Leadership", "Engineering", "Startup Growth"],
    linkedinUrl: "https://linkedin.com/in/lexthompson",
    githubUrl: "https://github.com/lexthompson",
    isVerified: true,
    phone: "+1 (555) 890-1234",
    achievements: ["CTO", "Scaling Expert", "Startup Success"],
    createdAt: new Date("2015-10-05"),
    lastActive: new Date()
  },
  {
    name: "David Kim",
    email: "david.kim@netflix.com",
    graduationYear: "2014",
    department: "Computer Science",
    company: "Netflix",
    position: "Principal Engineer",
    location: "Los Gatos, CA",
    rating: 4.7,
    studentsMentored: 16,
    successfulReferrals: 9,
    pendingRequests: 3,
    skills: ["Frontend Architecture", "JavaScript", "React", "Scalability", "Performance"],
    interests: ["Frontend", "Architecture", "Scalability", "Performance"],
    linkedinUrl: "https://linkedin.com/in/davidkim",
    githubUrl: "https://github.com/davidkim",
    isVerified: true,
    phone: "+1 (555) 901-2345",
    achievements: ["Principal Engineer", "Frontend Expert", "Performance Champion"],
    createdAt: new Date("2014-11-20"),
    lastActive: new Date()
  },
  {
    name: "Robert Chen",
    email: "robert.chen@uber.com",
    graduationYear: "2013",
    department: "Computer Science",
    company: "Uber",
    position: "Senior Staff Engineer",
    location: "San Francisco, CA",
    rating: 4.6,
    studentsMentored: 22,
    successfulReferrals: 15,
    pendingRequests: 6,
    skills: ["Career Growth", "System Design", "Java", "Microservices", "Leadership"],
    interests: ["Career Growth", "Mid-level Development", "Technical Leadership"],
    linkedinUrl: "https://linkedin.com/in/robertchen",
    githubUrl: "https://github.com/robertchen",
    isVerified: true,
    phone: "+1 (555) 012-3456",
    achievements: ["Senior Staff Engineer", "Career Mentor", "Technical Leader"],
    createdAt: new Date("2013-12-10"),
    lastActive: new Date()
  },
  {
    name: "Jessica Lee",
    email: "jessica.lee@amazon.com",
    graduationYear: "2012",
    department: "Computer Science",
    company: "Amazon",
    position: "Senior Software Engineer",
    location: "Seattle, WA",
    rating: 4.4,
    studentsMentored: 14,
    successfulReferrals: 7,
    pendingRequests: 2,
    skills: ["Java", "AWS", "System Design", "Backend Development", "Cloud Computing"],
    interests: ["Backend Development", "Cloud Computing", "System Design"],
    linkedinUrl: "https://linkedin.com/in/jessicalee",
    githubUrl: "https://github.com/jessicalee",
    isVerified: true,
    phone: "+1 (555) 123-4567",
    achievements: ["Senior Engineer", "AWS Expert", "Backend Specialist"],
    createdAt: new Date("2012-06-15"),
    lastActive: new Date()
  },
  {
    name: "Daniel Park",
    email: "daniel.park@apple.com",
    graduationYear: "2011",
    department: "Computer Science",
    company: "Apple",
    position: "Software Engineer",
    location: "Cupertino, CA",
    rating: 4.3,
    studentsMentored: 10,
    successfulReferrals: 5,
    pendingRequests: 1,
    skills: ["iOS Development", "Swift", "Objective-C", "Mobile Development", "UI/UX"],
    interests: ["Mobile Development", "iOS", "User Experience"],
    linkedinUrl: "https://linkedin.com/in/danielpark",
    githubUrl: "https://github.com/danielpark",
    isVerified: true,
    phone: "+1 (555) 234-5678",
    achievements: ["iOS Developer", "Mobile Expert", "UI/UX Specialist"],
    createdAt: new Date("2011-08-20"),
    lastActive: new Date()
  }
];

async function seedAlumni() {
  try {
    // Clear existing alumni data
    await Alumni.deleteMany({});
    console.log('Cleared existing alumni data');

    // Insert new alumni data
    const result = await Alumni.insertMany(alumniData);
    console.log(`Successfully seeded ${result.length} alumni records`);

    // Display some sample data
    console.log('\nSample alumni data:');
    const sampleAlumni = await Alumni.find().limit(3);
    sampleAlumni.forEach(alumni => {
      console.log(`- ${alumni.name} (${alumni.position} @ ${alumni.company})`);
    });

    console.log('\nAlumni data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding alumni data:', error);
    process.exit(1);
  }
}

// Export alumni data for use in other scripts
module.exports = { alumniData };

// Run the seeding function if this file is executed directly
if (require.main === module) {
  seedAlumni();
} 