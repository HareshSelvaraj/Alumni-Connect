const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-platform';

console.log('🔍 Checking MongoDB Connection...');
console.log('Connection String:', MONGODB_URI);
console.log('Environment Variables:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI || 'NOT SET (using default)');
console.log('- PORT:', process.env.PORT || 'NOT SET (using default)');
console.log('');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  console.log('Database Name:', mongoose.connection.db.databaseName);
  console.log('Host:', mongoose.connection.host);
  console.log('Port:', mongoose.connection.port);
  console.log('');

  // Check if collections exist
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('📊 Collections in database:');
  collections.forEach(collection => {
    console.log(`- ${collection.name}`);
  });
  console.log('');

  // Check Alumni collection
  const Alumni = mongoose.model('Alumni', new mongoose.Schema({}));
  const alumniCount = await Alumni.countDocuments();
  console.log(`👥 Alumni records: ${alumniCount}`);

  if (alumniCount > 0) {
    const sampleAlumni = await Alumni.find().limit(3);
    console.log('Sample alumni:');
    sampleAlumni.forEach(alumni => {
      console.log(`- ${alumni.name} (${alumni.position} @ ${alumni.company})`);
    });
  }
  console.log('');

  // Check Student collection
  const Student = mongoose.model('Student', new mongoose.Schema({}));
  const studentCount = await Student.countDocuments();
  console.log(`🎓 Student records: ${studentCount}`);

  if (studentCount > 0) {
    const sampleStudents = await Student.find().limit(3);
    console.log('Sample students:');
    sampleStudents.forEach(student => {
      console.log(`- ${student.name} (${student.yearOfStudy} ${student.department})`);
    });
  }
  console.log('');

  // Check if this is Atlas or local
  if (MONGODB_URI.includes('mongodb+srv://')) {
    console.log('🌐 This is MongoDB Atlas (cloud)');
  } else {
    console.log('💻 This is local MongoDB');
  }

  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
}); 