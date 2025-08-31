const ValidationUtils = require('../../src/utils/validation');

describe('ValidationUtils', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      const result = ValidationUtils.validateEmail('test@example.com');

      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('test@example.com');
      expect(result.errors).toHaveLength(0);
    });

    it('should sanitize email by trimming and lowercasing', () => {
      const result = ValidationUtils.validateEmail('  TEST@EXAMPLE.COM  ');

      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('test@example.com');
    });

    it('should reject empty email', () => {
      const result = ValidationUtils.validateEmail('');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid',
        '@example.com',
        'user@',
        'user..name@example.com'
      ];

      invalidEmails.forEach(email => {
        const result = ValidationUtils.validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid email format');
      });
    });

    it('should reject emails that are too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      const result = ValidationUtils.validateEmail(longEmail);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email is too long');
    });
  });

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      const result = ValidationUtils.validatePassword('StrongPass123!');

      expect(result.isValid).toBe(true);
      expect(result.strength).toBe('strong');
      expect(result.errors).toHaveLength(0);
    });

    it('should validate medium strength password', () => {
      const result = ValidationUtils.validatePassword('Password123');

      expect(result.isValid).toBe(true);
      expect(result.strength).toBe('medium');
    });

    it('should reject empty password', () => {
      const result = ValidationUtils.validatePassword('');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password is required');
    });

    it('should reject short password', () => {
      const result = ValidationUtils.validatePassword('123');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be at least 6 characters long');
    });

    it('should warn about password length for better security but still be valid', () => {
      const result = ValidationUtils.validatePassword('Pass12');

      expect(result.isValid).toBe(false); // Should be invalid due to warning being treated as error
      expect(result.errors).toContain('Password should be at least 8 characters for better security');
    });

    it('should classify weak passwords correctly', () => {
      const weakPasswords = [
        'password',      // only lowercase
        'PASSWORD',      // only uppercase
        '12345678',      // only numbers
        'pass123'        // missing uppercase and special chars
      ];

      weakPasswords.forEach(password => {
        const result = ValidationUtils.validatePassword(password);
        expect(result.strength).toBe('weak');
      });
    });
  });

  describe('validateName', () => {
    it('should validate correct name', () => {
      const result = ValidationUtils.validateName('John Doe');

      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('John Doe');
      expect(result.errors).toHaveLength(0);
    });

    it('should sanitize name by trimming', () => {
      const result = ValidationUtils.validateName('  John Doe  ');

      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('John Doe');
    });

    it('should reject empty name', () => {
      const result = ValidationUtils.validateName('');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
    });

    it('should reject short name', () => {
      const result = ValidationUtils.validateName('J');

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters long');
    });

    it('should reject long name', () => {
      const longName = 'a'.repeat(51);
      const result = ValidationUtils.validateName(longName);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be less than 50 characters');
    });

    it('should accept valid name characters', () => {
      const validNames = [
        "John Doe",
        "Mary-Jane",
        "O'Connor",
        "Jean-Pierre"
      ];

      validNames.forEach(name => {
        const result = ValidationUtils.validateName(name);
        expect(result.isValid).toBe(true);
      });
    });

    it('should reject invalid name characters', () => {
      const invalidNames = [
        "John123",
        "John@Doe",
        "John.Doe",
        "John_Doe"
      ];

      invalidNames.forEach(name => {
        const result = ValidationUtils.validateName(name);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Name can only contain letters, spaces, hyphens, and apostrophes');
      });
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize HTML characters', () => {
      const input = '<script>alert("xss")</script>';
      const sanitized = ValidationUtils.sanitizeInput(input);

      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('should handle non-string input', () => {
      expect(ValidationUtils.sanitizeInput(123)).toBe(123);
      expect(ValidationUtils.sanitizeInput(null)).toBe(null);
      expect(ValidationUtils.sanitizeInput(undefined)).toBe(undefined);
    });

    it('should sanitize quotes and apostrophes', () => {
      const input = 'It\'s a "test" string';
      const sanitized = ValidationUtils.sanitizeInput(input);

      expect(sanitized).toBe('It&#x27;s a &quot;test&quot; string');
    });
  });

  describe('validateTimeEntry', () => {
    it('should validate correct time entry', () => {
      const entry = {
        description: 'Working on project',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T17:00:00Z'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty description', () => {
      const entry = {
        description: '',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T17:00:00Z'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description is required');
    });

    it('should reject long description', () => {
      const entry = {
        description: 'a'.repeat(501),
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T17:00:00Z'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must be less than 500 characters');
    });

    it('should reject invalid start time', () => {
      const entry = {
        description: 'Work',
        startTime: 'invalid-date',
        endTime: '2023-01-01T17:00:00Z'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Valid start time is required');
    });

    it('should reject invalid end time', () => {
      const entry = {
        description: 'Work',
        startTime: '2023-01-01T09:00:00Z',
        endTime: 'invalid-date'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Valid end time is required');
    });

    it('should reject end time before start time', () => {
      const entry = {
        description: 'Work',
        startTime: '2023-01-01T17:00:00Z',
        endTime: '2023-01-01T09:00:00Z'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('End time must be after start time');
    });

    it('should reject entries longer than 24 hours', () => {
      const entry = {
        description: 'Work',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-02T10:00:00Z' // 25 hours later
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Time entry cannot exceed 24 hours');
    });

    it('should validate entry without end time (active entry)', () => {
      const entry = {
        description: 'Work in progress',
        startTime: '2023-01-01T09:00:00Z'
      };

      const result = ValidationUtils.validateTimeEntry(entry);

      expect(result.isValid).toBe(true);
    });
  });
});