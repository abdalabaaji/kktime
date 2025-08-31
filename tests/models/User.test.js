const User = require('../../src/models/User');

describe('User Model', () => {
  describe('Constructor', () => {
    it('should create a user with provided data', () => {
      const userData = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword'
      };

      const user = new User(userData);

      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.password).toBe('hashedpassword');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should set default values for missing fields', () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123'
      };

      const user = new User(userData);

      expect(user.id).toBeNull();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('toSafeObject', () => {
    it('should return user object without password', () => {
      const userData = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secret'
      };

      const user = new User(userData);
      const safeUser = user.toSafeObject();

      expect(safeUser).not.toHaveProperty('password');
      expect(safeUser.id).toBe(1);
      expect(safeUser.name).toBe('John Doe');
      expect(safeUser.email).toBe('john@example.com');
    });
  });

  describe('validateUserData', () => {
    it('should validate correct user data', () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const result = User.validateUserData(userData);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty name', () => {
      const userData = {
        name: '',
        email: 'john@example.com',
        password: 'password123'
      };

      const result = User.validateUserData(userData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters long');
    });

    it('should reject short name', () => {
      const userData = {
        name: 'J',
        email: 'john@example.com',
        password: 'password123'
      };

      const result = User.validateUserData(userData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters long');
    });

    it('should reject invalid email', () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };

      const result = User.validateUserData(userData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Valid email is required');
    });

    it('should reject short password', () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123'
      };

      const result = User.validateUserData(userData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be at least 6 characters long');
    });

    it('should handle multiple validation errors', () => {
      const userData = {
        name: '',
        email: 'invalid',
        password: '123'
      };

      const result = User.validateUserData(userData);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com'
      ];

      validEmails.forEach(email => {
        expect(User.isValidEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        'user@domain',
        'user name@example.com'
      ];

      invalidEmails.forEach(email => {
        expect(User.isValidEmail(email)).toBe(false);
      });
    });
  });

  describe('isStrongPassword', () => {
    it('should validate strong passwords', () => {
      const strongPasswords = [
        'StrongPass123!',
        'MyP@ssw0rd',
        'Secure#Pass1',
        'Complex$123ABC'
      ];

      strongPasswords.forEach(password => {
        expect(User.isStrongPassword(password)).toBe(true);
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'short',
        'nouppercase123!',
        'NOLOWERCASE123!',
        'NoNumbers!',
        'NoSpecialChars123',
        'OnlyText',
        '12345678'
      ];

      weakPasswords.forEach(password => {
        expect(User.isStrongPassword(password)).toBe(false);
      });
    });

    it('should reject passwords shorter than 8 characters', () => {
      expect(User.isStrongPassword('Abc123!')).toBe(false);
    });
  });
});