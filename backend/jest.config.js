module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  setupFiles: ['./jest.setup.js'],
  testTimeout: 30000, // mongodb-memory-server can be slow on first run
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/seed/**',
    '!src/server.js',
  ],
};
