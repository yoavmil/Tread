const express = require('express');
const { requireAuth, requireApprover } = require('../middleware/auth');
const NewSubmission = require('../models/NewSubmission');
const EditSubmission = require('../models/EditSubmission');
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

// ── Edit submissions ─────────────────────────────────────────────────────────

// GET /api/submissions/edit — list pending edit submissions (id + summary only)
router.get('/edit', async (req, res) => {
  const submissions = await EditSubmission.find({ status: 'pending' })
    .select('_id placeId submittedBy createdAt')
    .populate('submittedBy', 'displayName email')
    .populate('placeId', 'name')
    .sort({ createdAt: -1 })
    .lean();
  res.json(submissions);
});

// GET /api/submissions/edit/:id — single edit submission
router.get('/edit/:id', async (req, res) => {
  const submission = await EditSubmission.findById(req.params.id)
    .populate('submittedBy', 'displayName email')
    .populate('placeId', 'name')
    .lean();
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  res.json(submission);
});

// PATCH /api/submissions/edit/:id — update the proposed `after` fields before approval
router.patch('/edit/:id', async (req, res) => {
  const { after } = req.body;
  if (!after) return res.status(400).json({ error: 'after is required' });

  const submission = await EditSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission has already been reviewed' });
  }

  submission.after = after;
  await submission.save();
  res.json({ ok: true });
});

// POST /api/submissions/edit/:id/approve — apply `after` to the Place and mark accepted
router.post('/edit/:id/approve', async (req, res) => {
  const submission = await EditSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission has already been reviewed' });
  }

  await Place.findByIdAndUpdate(submission.placeId, { $set: submission.after });
  submission.status = 'accepted';
  await submission.save();

  res.json({ ok: true, placeId: submission.placeId });
});

// POST /api/submissions/edit/:id/decline — mark declined
router.post('/edit/:id/decline', async (req, res) => {
  const submission = await EditSubmission.findById(req.params.id);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });
  if (submission.status !== 'pending') {
    return res.status(400).json({ error: 'Submission has already been reviewed' });
  }

  submission.status = 'declined';
  await submission.save();
  res.json({ ok: true });
});

module.exports = router;
