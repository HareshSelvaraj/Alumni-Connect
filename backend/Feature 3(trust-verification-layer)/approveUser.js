const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const res = await User.updateOne(
      { email: 'student@sijosephs.ac.in' }, // UPDATE to the target email
      { $set: { is_admin_approved: true } }
    );
    console.log('✅ Admin approval updated:', res);
    process.exit();
  } catch (err) {
    console.error('❌ Error updating user:', err);
    process.exit(1);
  }
})();
