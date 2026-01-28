const mongoose = require('mongoose');

// Test MongoDB connection
const MONGODB_URI = 'mongodb+srv://hareshswork:hareshswork@cluster0.mongodb.net/alumni-network?retryWrites=true&w=majority';

console.log('Testing MongoDB connection...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully!');
  
  // Test the connection
  return mongoose.connection.db.admin().ping();
})
.then(() => {
  console.log('✅ Database ping successful!');
  
  // Test seeding data
  const Alumni = mongoose.model('Alumni', new mongoose.Schema({
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
  }));

  const testAlumni = {
    id: 'test-1',
    name: 'Test User',
    email: 'test@example.com',
    department: 'Computer Science',
    company: 'Test Company',
    position: 'Software Engineer',
    graduationYear: 2020,
    skills: ['JavaScript', 'React'],
    location: 'Test City',
    linkedin: 'linkedin.com/in/test',
    avatar: '/placeholder-user.jpg'
  };

  return Alumni.create(testAlumni);
})
.then(() => {
  console.log('✅ Test data created successfully!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
}); 