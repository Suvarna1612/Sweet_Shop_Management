const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
} = require("../src/utils/auth");


// this test checks if the password is hashed or not, ie not equal to the actual password and length greater thab 50

describe('Auth Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testpassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(50);
    });
  });


// password and hashed password should be same, used to check for authorisation purposes

  describe('comparePassword', () => {
    it('should return true for correct password', async () => {
      const password = 'testpassword123';
      const hashedPassword = await hashPassword(password);
      
      const isMatch = await comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });
  });


// generating and verifying a jwt token

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const payload = { userId: '123456789' };
      const token = generateToken(payload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const payload = { userId: '123456789' };
      const token = generateToken(payload);
      
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(payload.userId);
    });
  });
});