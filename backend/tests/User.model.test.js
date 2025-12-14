const User = require('../src/models/User');


// this tests checks if the user has a username or not ,
// all the req fields are filled or not, if password and email are valid or not
// is password hashed before saving or not

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@gmail.com',
        password: 'Password123'
      };
      
      const user = new User(userData);
      const savedUser = await user.save();
      
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.password).not.toBe(userData.password);
      expect(savedUser.role).toBe('user'); 
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    it('should not create user without required fields', async () => {
      const user = new User({});
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should not create user with invalid email', async () => {
      const userData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'Password123'
      };
      
      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should not create user with short password', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@gmail.com',
        password: '123'
      };
      
      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

   
  });

  describe('User Uniqueness', () => {
    it('should not allow duplicate emails', async () => {
      const userData1 = {
        username: 'testuser1',
        email: 'test@example.com',
        password: 'Password123'
      };
      
      const userData2 = {
        username: 'testuser2',
        email: 'test@example.com',
        password: 'Password123'
      };
      
      const user1 = new User(userData1);
      await user1.save();
      
      const user2 = new User(userData2);
      await expect(user2.save()).rejects.toThrow();
    });

    it('should not allow duplicate usernames', async () => {
      const userData1 = {
        username: 'testuser',
        email: 'test1@example.com',
        password: 'Password123'
      };
      
      const userData2 = {
        username: 'testuser',
        email: 'test2@example.com',
        password: 'Password123'
      };
      
      const user1 = new User(userData1);
      await user1.save();
      
      const user2 = new User(userData2);
      await expect(user2.save()).rejects.toThrow();
    });
  });

  describe('Password Methods', () => {
    it('should hash password before saving', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      };
      
      const user = new User(userData);
      await user.save();
      
      expect(user.password).not.toBe(userData.password);
      expect(user.password.length).toBeGreaterThan(50);
    });

    it('should compare password correctly', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      };
      
      const user = new User(userData);
      await user.save();
      
      const isMatch = await user.comparePassword('Password123');
      expect(isMatch).toBe(true);
      
      const isNotMatch = await user.comparePassword('WrongPassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('JSON Serialization', () => {
    it('should not include password in JSON output', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      };
      
      const user = new User(userData);
      await user.save();
      
      const userJSON = user.toJSON();
      expect(userJSON.password).toBeUndefined();
      expect(userJSON.username).toBe(userData.username);
      expect(userJSON.email).toBe(userData.email);
    });
  });

  describe('User Roles', () => {
    it('should set default role as user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123'
      };
      
      const user = new User(userData);
      await user.save();
      
      expect(user.role).toBe('user');
    });

    it('should allow admin role', async () => {
      const userData = {
        username: 'adminuser',
        email: 'admin@example.com',
        password: 'Password123',
        role: 'admin'
      };
      
      const user = new User(userData);
      await user.save();
      
      expect(user.role).toBe('admin');
    });

    it('should not allow invalid roles', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
        role: 'invalidrole'
      };
      
      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });
});