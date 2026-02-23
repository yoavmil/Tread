const express = require('express');
const { requireAuth, requireApprover } = require('../middleware/auth');
const NewSubmission = require('../models/NewSubmission');
const Place = require('../models/Place');

const router = express.Router();

// All routes require authentication and approver role
router.use(requireAuth, requireApprover);

// GET /api/submissions/new — list pending new location submissions
router.get('/new', async (req, res) => {
  const submissions = await NewSubmission.find({ status: 'pending' })
    .populate('submittedBy', 'displayName email')
    .sort({ createdAt: -1 })
    .lean();
  res.json(submissions);
});

// GET /api/submissions/new/:id — single submission
router.get('/new/:id', async (req, res) => {
  const submission = await NewSubmission.findById(req.params.id)
    .populate('submittedBy', 'displayName email')
    .lean();
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  res.json(submission);
});

// PATCH /api/submissions/new/:id — update placeData before approval
router.patch('/new/:id', async (req, res) => {
  const { placeData } = req.body;
  if (!placeData || !placeData.name) {
    return res.status(400).json({ error: 'placeData with name is required' });
  }

  const submission = await NewSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission has already been reviewed' });
  }

  submission.placeData = placeData;
  await submission.save();
  res.json({ ok: true });
});

// POST /api/submissions/new/:id/approve — create Place and mark accepted
router.post('/new/:id/approve', async (req, res) => {
  const submission = await NewSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission has already been reviewed' });
  }

  const place = await Place.create(submission.placeData);
  submission.status = 'accepted';
  await submission.save();

  res.json({ ok: true, placeId: place._id });
});

// POST /api/submissions/new/:id/decline — mark declined
router.post('/new/:id/decline', async (req, res) => {
  const submission = await NewSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission has already been reviewed' });
  }

  submission.status = 'declined';
  await submission.save();
  res.json({ ok: true });
});

module.exports = router;
