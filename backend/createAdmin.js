import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('❌ Admin account already exists!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('   Use this email to login at the admin dashboard.');
      process.exit(0);
    }

    // Create admin account - UPDATE THESE VALUES
    const admin = await Admin.create({
      username: 'anuj',
      email: 'anuj@admin.com',
      password: 'admin123'  // Change this to a secure password!
    });

    console.log('✅ Admin account created successfully!');
    console.log('');
    console.log('   Login credentials:');
    console.log(`   Email: ${admin.email}`);
    console.log('   Password: admin123');
    console.log('');
    console.log('   ⚠️  Change your password after first login!');
    console.log('');
    console.log('   Admin Dashboard: http://localhost:5174');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();
