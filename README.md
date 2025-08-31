# KKTime Backend

A Node.js backend API for the KKTime time tracking application.

## Features

- **User Management**: User model with validation and authentication utilities
- **Authentication**: JWT token generation, password hashing with bcrypt
- **Input Validation**: Comprehensive validation for emails, passwords, names, and time entries
- **Time Tracking**: Utilities for calculating durations, formatting timestamps, and managing time entries
- **Security**: Input sanitization, password strength validation, and secure token handling

## Project Structure

```
src/
├── models/
│   └── User.js           # User model with validation
├── utils/
│   ├── auth.js           # Authentication utilities (JWT, bcrypt)
│   ├── validation.js     # Input validation and sanitization
│   └── time.js           # Time tracking utilities
tests/
├── models/
│   └── User.test.js      # User model tests
├── utils/
│   ├── auth.test.js      # Authentication tests
│   ├── validation.test.js # Validation tests
│   └── time.test.js      # Time utilities tests
└── setup.js              # Test configuration
```

## Installation

```bash
npm install
```

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage report:
```bash
npm run test:coverage
```

## Test Coverage

The test suite achieves excellent coverage:
- **100% Statement Coverage**
- **100% Function Coverage** 
- **99.25% Branch Coverage**
- **90 test cases** covering all backend logic

## Core Backend Logic Tested

### User Model (`src/models/User.js`)
- User object construction and safe serialization
- Email format validation with strict RFC compliance
- Password strength validation with multiple criteria
- Comprehensive input validation with detailed error messages

### Authentication Utilities (`src/utils/auth.js`)
- Password hashing with bcrypt (salt rounds: 12)
- Password comparison for login verification
- JWT token generation and verification
- Token extraction from Authorization headers
- Secure secret generation

### Validation Utilities (`src/utils/validation.js`)
- Email validation with sanitization and length checks
- Password strength analysis (weak/medium/strong)
- Name validation with character restrictions
- Time entry validation for time tracking
- XSS prevention through input sanitization

### Time Utilities (`src/utils/time.js`)
- Duration calculation between timestamps
- Time formatting (HH:MM:SS) and parsing
- Timestamp formatting for different display needs
- Active time entry detection
- Total time calculation across multiple entries

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRY=24h
```

## Security Features

- Password hashing with bcrypt and high salt rounds
- JWT token-based authentication
- Input sanitization to prevent XSS attacks
- Email validation with strict formatting rules
- Password strength enforcement
- Secure token generation and verification

## Usage Examples

### User Validation
```javascript
const User = require('./src/models/User');

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'SecurePass123!'
};

const validation = User.validateUserData(userData);
if (validation.isValid) {
  const user = new User(userData);
  console.log(user.toSafeObject()); // Excludes password
}
```

### Authentication
```javascript
const AuthUtils = require('./src/utils/auth');

// Hash password
const hashedPassword = await AuthUtils.hashPassword('mypassword');

// Generate JWT token
const token = AuthUtils.generateToken(
  { userId: 1, email: 'user@example.com' },
  process.env.JWT_SECRET
);

// Verify token
const decoded = AuthUtils.verifyToken(token, process.env.JWT_SECRET);
```

### Time Tracking
```javascript
const TimeUtils = require('./src/utils/time');

// Calculate duration
const duration = TimeUtils.calculateDuration(
  '2023-01-01T09:00:00Z',
  '2023-01-01T17:30:00Z'
);
console.log(duration.formatted); // "08:30:00"

// Calculate total time from entries
const entries = [/* time entries */];
const total = TimeUtils.calculateTotalTime(entries);
```

## Contributing

1. Write tests for any new functionality
2. Ensure all tests pass: `npm test`
3. Maintain high test coverage
4. Follow existing code style and patterns