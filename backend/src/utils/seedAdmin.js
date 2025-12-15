const User = require('../models/User');
const connectDB = require('../config/database');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sweetshop.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@sweetshop.com',
      password: 'Admin123',
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@sweetshop.com');
    console.log('Password: Admin123');
    
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    process.exit(0);
  }
};

// Run if called directly
if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin;