const AuthUtils = require('../../src/utils/auth');
const jwt = require('jsonwebtoken');

describe('AuthUtils', () => {
  const testSecret = 'test-secret-key';
  const testPayload = { userId: 1, email: 'test@example.com' };

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'mypassword';
      const hashedPassword = await AuthUtils.hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(50); // bcrypt hashes are typically 60 chars
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'mypassword';
      const hash1 = await AuthUtils.hashPassword(password);
      const hash2 = await AuthUtils.hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'mypassword';
      const hashedPassword = await AuthUtils.hashPassword(password);
      const isMatch = await AuthUtils.comparePassword(password, hashedPassword);

      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'mypassword';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await AuthUtils.hashPassword(password);
      const isMatch = await AuthUtils.comparePassword(wrongPassword, hashedPassword);

      expect(isMatch).toBe(false);
    });

    it('should handle empty passwords correctly', async () => {
      const hashedPassword = await AuthUtils.hashPassword('test');
      const isMatch = await AuthUtils.comparePassword('', hashedPassword);

      expect(isMatch).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const token = AuthUtils.generateToken(testPayload, testSecret);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should generate different tokens for different payloads', () => {
      const payload1 = { userId: 1 };
      const payload2 = { userId: 2 };
      
      const token1 = AuthUtils.generateToken(payload1, testSecret);
      const token2 = AuthUtils.generateToken(payload2, testSecret);

      expect(token1).not.toBe(token2);
    });

    it('should use custom expiration time', () => {
      const token = AuthUtils.generateToken(testPayload, testSecret, '1h');
      const decoded = jwt.decode(token);

      expect(decoded.exp).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('should verify and decode a valid token', () => {
      const token = AuthUtils.generateToken(testPayload, testSecret);
      const decoded = AuthUtils.verifyToken(token, testSecret);

      expect(decoded.userId).toBe(testPayload.userId);
      expect(decoded.email).toBe(testPayload.email);
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => {
        AuthUtils.verifyToken(invalidToken, testSecret);
      }).toThrow();
    });

    it('should throw error for wrong secret', () => {
      const token = AuthUtils.generateToken(testPayload, testSecret);

      expect(() => {
        AuthUtils.verifyToken(token, 'wrong-secret');
      }).toThrow();
    });

    it('should throw error for expired token', () => {
      // Create a token that expires immediately
      const expiredToken = jwt.sign(testPayload, testSecret, { expiresIn: '0s' });

      // Wait a moment to ensure expiration
      setTimeout(() => {
        expect(() => {
          AuthUtils.verifyToken(expiredToken, testSecret);
        }).toThrow();
      }, 100);
    });
  });

  describe('generateSecret', () => {
    it('should generate a random secret', () => {
      const secret = AuthUtils.generateSecret();

      expect(secret).toBeDefined();
      expect(typeof secret).toBe('string');
      expect(secret.length).toBe(128); // 64 bytes in hex = 128 chars
    });

    it('should generate different secrets each time', () => {
      const secret1 = AuthUtils.generateSecret();
      const secret2 = AuthUtils.generateSecret();

      expect(secret1).not.toBe(secret2);
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should extract token from valid Bearer header', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      const authHeader = `Bearer ${token}`;

      const extractedToken = AuthUtils.extractTokenFromHeader(authHeader);

      expect(extractedToken).toBe(token);
    });

    it('should return null for missing header', () => {
      const result = AuthUtils.extractTokenFromHeader(null);
      expect(result).toBeNull();

      const result2 = AuthUtils.extractTokenFromHeader(undefined);
      expect(result2).toBeNull();
    });

    it('should return null for invalid header format', () => {
      const invalidHeaders = [
        'InvalidHeader',
        'Bearer',
        'Basic token',
        'token',
        'Bearer  ', // Empty token
      ];

      invalidHeaders.forEach(header => {
        const result = AuthUtils.extractTokenFromHeader(header);
        expect(result).toBeNull();
      });
    });

    it('should handle headers with extra spaces', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      const authHeader = `Bearer ${token}extra`;

      const extractedToken = AuthUtils.extractTokenFromHeader(authHeader);

      expect(extractedToken).toBe(`${token}extra`); // Should preserve the content after Bearer
    });
  });
});