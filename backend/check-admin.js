require('dotenv').config();
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const checkAdmin = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Checking for admin user...');
    
    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@sksweets.com' });
    
    if (adminUser) {
      console.log('✅ Admin user found!');
      console.log('📧 Email:', adminUser.email);
      console.log('👤 Username:', adminUser.username);
      console.log('🔐 Role:', adminUser.role);
      console.log('🗓️ Created:', adminUser.createdAt);
      
      // Test password comparison
      const isPasswordCorrect = await adminUser.comparePassword('Admin@123');
      console.log('🔐 Password check:', isPasswordCorrect ? '✅ Correct' : '❌ Incorrect');
    } else {
      console.log('❌ Admin user not found with email: admin@sksweets.com');
      
      // Check if there are any users at all
      const allUsers = await User.find({});
      console.log(`📊 Total users in database: ${allUsers.length}`);
      
      if (allUsers.length > 0) {
        console.log('👥 Existing users:');
        allUsers.forEach((user, index) => {
          console.log(`  ${index + 1}. Email: ${user.email}, Role: ${user.role}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking admin:', error);
  } finally {
    process.exit(0);
  }
};

checkAdmin();