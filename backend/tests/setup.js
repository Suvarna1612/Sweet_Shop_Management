const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongoServer;

beforeAll(async () => {
  // Set test environment variables first
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing_purposes_only';
  process.env.JWT_EXPIRES_IN = '1h';
  
  // Close any existing connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Set the test database URI
  process.env.MONGODB_URI = mongoUri;

  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});