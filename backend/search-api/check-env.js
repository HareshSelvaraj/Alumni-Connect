require('dotenv').config();

console.log('🔍 Environment Check');
console.log('===================');
console.log('');

console.log('Environment Variables:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI || 'NOT SET');
console.log('- PORT:', process.env.PORT || 'NOT SET');
console.log('');

const defaultURI = 'mongodb://localhost:27017/alumni-platform';
const atlasURI = process.env.MONGODB_URI || defaultURI;

console.log('Connection Details:');
console.log('- Using URI:', atlasURI);
console.log('- Is Atlas:', atlasURI.includes('mongodb+srv://'));
console.log('- Is Local:', atlasURI.includes('localhost'));
console.log('');

if (!process.env.MONGODB_URI) {
  console.log('❌ No MONGODB_URI found in .env file');
  console.log('💡 Create a .env file with your MongoDB Atlas connection string');
  console.log('');
  console.log('Example .env file:');
  console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni-platform?retryWrites=true&w=majority');
  console.log('PORT=3002');
  console.log('NODE_ENV=development');
} else {
  console.log('✅ MONGODB_URI is set');
  console.log('🌐 This should connect to MongoDB Atlas');
} 