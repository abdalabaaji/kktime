// Jest setup file for backend tests

// Set test timeout
jest.setTimeout(10000);

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key';
process.env.JWT_EXPIRY = '1h';

// Global test helpers
global.mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashedpassword123',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z')
};

global.mockTimeEntry = {
  id: 1,
  userId: 1,
  description: 'Test task',
  startTime: '2023-01-01T09:00:00Z',
  endTime: '2023-01-01T17:00:00Z',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z')
};

// Suppress console warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (!args[0].includes('jest')) {
      originalWarn(...args);
    }
  };
});

afterAll(() => {
  console.warn = originalWarn;
});