const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Kick off Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// Google OAuth callback — issue JWT and redirect to frontend
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed` }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.redirect(`${process.env.FRONTEND_URL}/callback?token=${token}`);
  }
);

module.exports = router;
