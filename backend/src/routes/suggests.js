const express = require('express');
const { requireAuth } = require('../middleware/auth');
const EditSubmission = require('../models/EditSubmission');
const router = express.Router();

// POST /api/suggest-edit  (auth required — we read editor identity from req.user)
// Body: { before: <place object>, after: <edited fields object> }
router.post('/', requireAuth, async (req, res) => {
  const { before, after } = req.body;
  if (!before || !after || !before._id) {
    return res.status(400).json({ error: 'Missing before/after payload' });
  }

  try {
    const submission = await EditSubmission.create({
      placeId: before._id,
      before,
      after,
      submittedBy: req.user._id,
    });
    res.json({ ok: true, id: submission._id });
  } catch (err) {
    console.error('Edit submission save error:', err.message);
    res.status(500).json({ error: 'Failed to save edit submission' });
  }
});

module.exports = router;
