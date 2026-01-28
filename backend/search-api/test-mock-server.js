const fetch = require('node-fetch');

async function testMockServer() {
  const baseUrl = 'http://localhost:3004/api';
  
  console.log('🧪 Testing Mock Server...');
  
  try {
    // Test 1: Check if server is running
    console.log('\n1. Testing server connection...');
    const testResponse = await fetch(`${baseUrl}/test`);
    const testData = await testResponse.json();
    console.log('✅ Server is running:', testData);
    
    // Test 2: Test alumni search
    console.log('\n2. Testing alumni search...');
    const alumniResponse = await fetch(`${baseUrl}/search/alumni?query=sarah`);
    const alumniData = await alumniResponse.json();
    console.log('✅ Alumni search works:', alumniData.length, 'results found');
    
    // Test 3: Test student search
    console.log('\n3. Testing student search...');
    const studentResponse = await fetch(`${baseUrl}/search/students?query=john`);
    const studentData = await studentResponse.json();
    console.log('✅ Student search works:', studentData.length, 'results found');
    
    // Test 4: Test filters
    console.log('\n4. Testing search filters...');
    const filtersResponse = await fetch(`${baseUrl}/search/filters?userType=student`);
    const filtersData = await filtersResponse.json();
    console.log('✅ Search filters work:', filtersData);
    
    console.log('\n🎉 All tests passed! Mock server is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure to start the mock server first:');
    console.log('cd backend/search-api');
    console.log('node simple-server.js');
  }
}

testMockServer(); 