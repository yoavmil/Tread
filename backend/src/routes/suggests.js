const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

// POST /api/suggest-edit
// Body: { before: <place object>, after: <edited fields object> }
router.post('/', async (req, res) => {
  const { before, after } = req.body;
  if (!before || !after) {
    return res.status(400).json({ error: 'Missing before/after payload' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const placeName = before.name || 'Unknown';

  try {
    await resend.emails.send({
      from: 'Tread <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `Tread: Edit suggestion for "${placeName}"`,
      text: [
        `Edit suggestion received for: ${placeName}`,
        '',
        '=== BEFORE ===',
        JSON.stringify(before, null, 2),
        '',
        '=== AFTER ===',
        JSON.stringify(after, null, 2),
      ].join('\n'),
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err.message);
    console.dir({ before, after });
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
