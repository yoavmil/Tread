/**
 * Test-only auth route — issues a JWT for a synthetic user without Google OAuth.
 * Returns 404 in production.
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /auth/test-login
router.post('/test-login', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }

  const { email, displayName, role = 'editor' } = req.body;
  if (!email || !displayName) {
    return res.status(400).json({ error: 'email and displayName are required' });
  }

  const googleId = `test-${email}`;

  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.create({ googleId, email, displayName, role, photo: '' });
  } else {
    user.role = role;
    user.displayName = displayName;
    await user.save();
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
