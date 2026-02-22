const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');

let _counter = 0;

async function createTestUser(overrides = {}) {
  _counter++;
  return User.create({
    googleId: `test-google-id-${_counter}`,
    email: `user${_counter}@test.com`,
    displayName: `Test User ${_counter}`,
    photo: '',
    ...overrides,
  });
}

function tokenFor(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
}

function bearerHeader(userId) {
  return `Bearer ${tokenFor(userId)}`;
}

module.exports = { createTestUser, tokenFor, bearerHeader };
