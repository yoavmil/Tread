const express = require('express');
const { requireAuth } = require('../middleware/auth');
const EraseSubmission = require('../models/EraseSubmission');
const router = express.Router();

// POST /api/suggest-erase  (auth required)
// Body: { placeId: string, reason?: string }
router.post('/', requireAuth, async (req, res) => {
  const { placeId, reason } = req.body;
  if (!placeId) {
    return res.status(400).json({ error: 'placeId is required' });
  }

  try {
    const submission = await EraseSubmission.create({
      placeId,
      reason: reason || '',
      submittedBy: req.user._id,
    });
    res.json({ ok: true, id: submission._id });
  } catch (err) {
    console.error('Erase submission save error:', err.message);
    res.status(500).json({ error: 'Failed to save erase submission' });
  }
});

module.exports = router;
