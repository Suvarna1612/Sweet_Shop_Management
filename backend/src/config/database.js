const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Skip connection if already connected (for tests)
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (process.env.NODE_ENV !== 'test') {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      if (process.env.NODE_ENV !== 'test') {
        console.log('MongoDB disconnected');
      }
    });

    return conn;
  } catch (error) {
    console.error('Database connection error:', error.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;