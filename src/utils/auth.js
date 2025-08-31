const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Authentication utilities
 */
class AuthUtils {
  /**
   * Hash a password using bcrypt
   * @param {string} password - Plain text password
   * @returns {Promise<string>} - Hashed password
   */
  static async hashPassword(password) {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a plain text password with a hashed password
   * @param {string} plainPassword - Plain text password
   * @param {string} hashedPassword - Hashed password
   * @returns {Promise<boolean>} - True if passwords match
   */
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Generate a JWT token
   * @param {Object} payload - Data to encode in the token
   * @param {string} secret - JWT secret key
   * @param {string} expiresIn - Token expiration time
   * @returns {string} - JWT token
   */
  static generateToken(payload, secret, expiresIn = '24h') {
    return jwt.sign(payload, secret, { expiresIn });
  }

  /**
   * Verify and decode a JWT token
   * @param {string} token - JWT token
   * @param {string} secret - JWT secret key
   * @returns {Object} - Decoded token payload
   */
  static verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }

  /**
   * Generate a random JWT secret
   * @returns {string} - Random secret string
   */
  static generateSecret() {
    const crypto = require('crypto');
    return crypto.randomBytes(64).toString('hex');
  }

  /**
   * Extract token from Authorization header
   * @param {string} authHeader - Authorization header value
   * @returns {string|null} - Token or null if not found
   */
  static extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    
    // Return null if token is empty or just whitespace
    if (!token || token.trim() === '') {
      return null;
    }
    
    return token;
  }
}

module.exports = AuthUtils;