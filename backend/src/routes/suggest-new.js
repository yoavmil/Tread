const express = require('express');
const { Resend } = require('resend');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// POST /api/suggest-new
// Body: { place: <new place fields> }
router.post('/', requireAuth, async (req, res) => {
  const { place } = req.body;
  if (!place || !place.name) {
    return res.status(400).json({ error: 'Missing place payload' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const editorName = req.user.displayName || '';
  const editorEmail = req.user.email || '';

  try {
    await resend.emails.send({
      from: 'Tread <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `Tread: New location suggestion — "${place.name}"`,
      text: [
        `New location suggestion from: ${editorName} <${editorEmail}>`,
        '',
        '=== SUGGESTED PLACE ===',
        JSON.stringify(place, null, 2),
      ].join('\n'),
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err.message);
    console.dir({ place });
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
