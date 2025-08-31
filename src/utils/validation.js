/**
 * Input validation utilities
 */
class ValidationUtils {
  /**
   * Sanitize and validate email
   * @param {string} email - Email to validate
   * @returns {Object} - {isValid: boolean, sanitized: string, errors: string[]}
   */
  static validateEmail(email) {
    const errors = [];
    
    if (!email) {
      errors.push('Email is required');
      return { isValid: false, sanitized: '', errors };
    }

    const sanitized = email.trim().toLowerCase();
    
    // More strict email validation - requires at least one dot in domain
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    // Additional checks for invalid patterns
    const hasInvalidPatterns = sanitized.includes('..') || sanitized.startsWith('.') || sanitized.endsWith('.');
    
    if (!emailRegex.test(sanitized) || hasInvalidPatterns) {
      errors.push('Invalid email format');
    }

    if (sanitized.length > 254) {
      errors.push('Email is too long');
    }

    return {
      isValid: errors.length === 0,
      sanitized,
      errors
    };
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} - {isValid: boolean, strength: string, errors: string[]}
   */
  static validatePassword(password) {
    const errors = [];
    let strength = 'weak';

    if (!password) {
      errors.push('Password is required');
      return { isValid: false, strength, errors };
    }

    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    // Only warn about length if password meets minimum requirement
    if (password.length >= 6 && password.length < 8) {
      errors.push('Password should be at least 8 characters for better security');
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthChecks = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar];
    const strengthCount = strengthChecks.filter(Boolean).length;

    if (strengthCount >= 4 && password.length >= 8) {
      strength = 'strong';
    } else if (strengthCount >= 3 && password.length >= 6) {
      strength = 'medium';
    }

    return {
      isValid: errors.length === 0,
      strength,
      errors
    };
  }

  /**
   * Validate name field
   * @param {string} name - Name to validate
   * @returns {Object} - {isValid: boolean, sanitized: string, errors: string[]}
   */
  static validateName(name) {
    const errors = [];
    
    if (!name) {
      errors.push('Name is required');
      return { isValid: false, sanitized: '', errors };
    }

    const sanitized = name.trim();
    
    if (sanitized.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (sanitized.length > 50) {
      errors.push('Name must be less than 50 characters');
    }

    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(sanitized)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }

    return {
      isValid: errors.length === 0,
      sanitized,
      errors
    };
  }

  /**
   * Sanitize input to prevent XSS
   * @param {string} input - Input to sanitize
   * @returns {string} - Sanitized input
   */
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validate time tracking entry
   * @param {Object} entry - Time entry object
   * @returns {Object} - {isValid: boolean, errors: string[]}
   */
  static validateTimeEntry(entry) {
    const errors = [];

    if (!entry.description || entry.description.trim().length === 0) {
      errors.push('Description is required');
    }

    if (entry.description && entry.description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }

    if (!entry.startTime || !Date.parse(entry.startTime)) {
      errors.push('Valid start time is required');
    }

    if (entry.endTime && !Date.parse(entry.endTime)) {
      errors.push('Valid end time is required');
    }

    if (entry.startTime && entry.endTime) {
      const start = new Date(entry.startTime);
      const end = new Date(entry.endTime);
      
      if (end <= start) {
        errors.push('End time must be after start time');
      }

      const duration = end - start;
      const maxDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (duration > maxDuration) {
        errors.push('Time entry cannot exceed 24 hours');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = ValidationUtils;