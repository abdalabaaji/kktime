/**
 * User model and utilities
 */
class User {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password; // Should be hashed
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Convert user to safe object (without password)
   */
  toSafeObject() {
    const { password, ...safeUser } = this;
    return safeUser;
  }

  /**
   * Validate user data
   */
  static validateUserData(userData) {
    const errors = [];

    if (!userData.name || userData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push('Valid email is required');
    }

    if (!userData.password || userData.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if email format is valid
   */
  static isValidEmail(email) {
    // More strict email validation - requires at least one dot in domain
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    // Additional checks for invalid patterns
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
      return false;
    }
    
    return emailRegex.test(email);
  }

  /**
   * Check if password meets strength requirements
   */
  static isStrongPassword(password) {
    if (password.length < 8) return false;
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  }
}

module.exports = User;