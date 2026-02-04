import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intellitextile';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@intellitextile.com' });
    if (existingAdmin) {
      console.log('🗑️  Deleting existing admin user...');
      await User.deleteOne({ email: 'admin@intellitextile.com' });
    }

    // Create new admin with correct password
    const password = await bcryptjs.hash('admin123', 10);
    console.log('🔐 Password hash created:', password);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@intellitextile.com',
      password: password,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Role:', admin.role);

    // Verify the password works
    const isValid = await bcryptjs.compare('admin123', admin.password);
    console.log('✅ Password verification:', isValid ? 'PASSED' : 'FAILED');

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
