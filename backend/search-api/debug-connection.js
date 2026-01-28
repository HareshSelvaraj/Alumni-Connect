const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Debugging MongoDB Connection...');
console.log('');

// Check environment variables
console.log('Environment Variables:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI || 'NOT SET');
console.log('- PORT:', process.env.PORT || 'NOT SET');
console.log('');

// Default URI
const defaultURI = 'mongodb://localhost:27017/alumni-platform';
const atlasURI = process.env.MONGODB_URI || defaultURI;

console.log('Connection Details:');
console.log('- Using URI:', atlasURI);
console.log('- Is Atlas:', atlasURI.includes('mongodb+srv://'));
console.log('- Is Local:', atlasURI.includes('localhost'));
console.log('');

// Try to connect
mongoose.connect(atlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connection successful!');
  console.log('- Database:', mongoose.connection.db.databaseName);
  console.log('- Host:', mongoose.connection.host);
  console.log('- Port:', mongoose.connection.port);
  console.log('');

  // List all collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('📊 Collections found:');
  if (collections.length === 0) {
    console.log('- No collections found');
  } else {
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
  }
  console.log('');

  // Try to create a test document
  console.log('🧪 Testing document creation...');
  const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
  
  try {
    const testDoc = new TestModel({ name: 'Test Document' });
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    // Count documents
    const count = await TestModel.countDocuments();
    console.log(`- Total test documents: ${count}`);
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('✅ Test documents cleaned up');
  } catch (error) {
    console.log('❌ Error creating test document:', error.message);
  }

  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection failed:', err.message);
  console.log('');
  console.log('💡 Solutions:');
  console.log('1. Create a .env file with your MongoDB Atlas connection string');
  console.log('2. Make sure MongoDB is running locally if using localhost');
  console.log('3. Check your network connection if using Atlas');
  process.exit(1);
}); 