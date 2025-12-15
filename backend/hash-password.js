const bcrypt = require('bcryptjs');

const hashPassword = async () => {
  const password = 'Admin@123';
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  console.log('Original password:', password);
  console.log('Hashed password:', hashedPassword);
  console.log('\nCopy this hashed password to use in MongoDB:');
  console.log(hashedPassword);
};

hashPassword();