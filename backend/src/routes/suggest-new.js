const express = require('express');
const { requireAuth } = require('../middleware/auth');
const NewSubmission = require('../models/NewSubmission');
const router = express.Router();

// POST /api/suggest-new
// Body: { place: <new place fields> }
router.post('/', requireAuth, async (req, res) => {
  const { place } = req.body;
  if (!place || !place.name) {
    return res.status(400).json({ error: 'Missing place payload' });
  }

  try {
    const submission = await NewSubmission.create({
      placeData: place,
      submittedBy: req.user._id,
    });
    res.json({ ok: true, id: submission._id });
  } catch (err) {
    console.error('Submission save error:', err.message);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

module.exports = router;
