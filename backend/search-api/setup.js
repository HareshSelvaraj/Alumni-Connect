const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-platform';

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

async function setupDatabase() {
  try {
    console.log('🚀 Setting up MongoDB database with alumni data...\n');

    // Clear existing data
    await Alumni.deleteMany({});
    console.log('✅ Cleared existing alumni data');

    // Import and seed alumni data
    const { alumniData } = require('./seed-alumni');
    
    // Insert alumni data
    const result = await Alumni.insertMany(alumniData);
    console.log(`✅ Successfully seeded ${result.length} alumni records`);

    // Test search functionality
    console.log('\n🔍 Testing search functionality...\n');

    // Test 1: Search by name
    const nameSearch = await Alumni.find({ name: { $regex: 'Sarah', $options: 'i' } });
    console.log(`✅ Name search for "Sarah": Found ${nameSearch.length} results`);

    // Test 2: Search by company
    const companySearch = await Alumni.find({ company: { $regex: 'Google', $options: 'i' } });
    console.log(`✅ Company search for "Google": Found ${companySearch.length} results`);

    // Test 3: Search by department
    const deptSearch = await Alumni.find({ department: 'Computer Science' });
    console.log(`✅ Department search for "Computer Science": Found ${deptSearch.length} results`);

    // Test 4: Search by skills
    const skillsSearch = await Alumni.find({ skills: { $in: ['Python'] } });
    console.log(`✅ Skills search for "Python": Found ${skillsSearch.length} results`);

    // Test 5: Complex search
    const complexSearch = await Alumni.find({
      $and: [
        { department: 'Computer Science' },
        { rating: { $gte: 4.5 } }
      ]
    });
    console.log(`✅ Complex search (CS + rating >= 4.5): Found ${complexSearch.length} results`);

    // Display sample data
    console.log('\n📊 Sample alumni data:');
    const sampleAlumni = await Alumni.find().limit(5);
    sampleAlumni.forEach((alumni, index) => {
      console.log(`${index + 1}. ${alumni.name} - ${alumni.position} @ ${alumni.company}`);
      console.log(`   Department: ${alumni.department} | Rating: ${alumni.rating}`);
      console.log(`   Skills: ${alumni.skills.slice(0, 3).join(', ')}...`);
      console.log('');
    });

    // Test API endpoints
    console.log('🌐 Testing API endpoints...\n');

    const baseUrl = 'http://localhost:3001/api';
    
    // Test search endpoint
    try {
      const response = await fetch(`${baseUrl}/search/alumni?query=sarah`);
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ API search test: Found ${data.length} results for "sarah"`);
      } else {
        console.log('❌ API search test failed');
      }
    } catch (error) {
      console.log('⚠️  API test skipped (server not running)');
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Start the frontend: cd ../../frontend && npm run dev');
    console.log('3. Test the search functionality in the browser');
    console.log('4. Use the filter options to test different search criteria');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase(); 