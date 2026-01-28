const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const users = [
    {
      email: 'kanishk@sijosephs.ac.in',
      password: 'hackathon123',
      linkedin_url: 'https://www.linkedin.com/in/kanishk',
      is_email_verified: true,
      is_admin_approved: true,
      ip_address: '127.0.0.1'
    },
    {
      email: 'haresh@sijosephs.ac.in',
      password: 'alumni123',
      linkedin_url: 'https://www.linkedin.com/in/haresh',
      is_email_verified: true,
      is_admin_approved: true,
      ip_address: '127.0.0.1'
    },
    {
      email: 'kevin@sijosephs.ac.in',
      password: 'pending123',
      linkedin_url: 'https://www.linkedin.com/in/kevin',
      is_email_verified: false,
      is_admin_approved: false,
      ip_address: '127.0.0.1'
    }
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log('✅ Sample users inserted');
  mongoose.disconnect();
};

seedUsers().catch(err => console.error(err));
