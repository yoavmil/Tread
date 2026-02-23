const express = require('express');
const { requireAuth } = require('../middleware/auth');
const Place = require('../models/Place');

const router = express.Router();

// GET /api/users/me — current user profile
router.get('/me', requireAuth, (req, res) => {
  const { _id, email, displayName, photo, visitedPlaces, role, createdAt } = req.user;
  res.json({ _id, email, displayName, photo, visitedPlaces, role, createdAt });
});

// PATCH /api/users/me — update display name
router.patch('/me', requireAuth, async (req, res) => {
  const { displayName } = req.body;
  if (!displayName || typeof displayName !== 'string' || !displayName.trim()) {
    return res.status(400).json({ error: 'displayName is required' });
  }
  if (displayName.trim().length > 50) {
    return res.status(400).json({ error: 'displayName must be 50 characters or fewer' });
  }

  const user = req.user;
  user.displayName = displayName.trim();
  await user.save();

  const { _id, email, photo, visitedPlaces, role, createdAt } = user;
  res.json({ _id, email, displayName: user.displayName, photo, visitedPlaces, role, createdAt });
});

// POST /api/users/me/visits — mark a place as visited
router.post('/me/visits', requireAuth, async (req, res) => {
  const { placeId } = req.body;
  if (!placeId) return res.status(400).json({ error: 'placeId is required' });

  const user = req.user;
  if (!user.visitedPlaces.map(id => id.toString()).includes(placeId)) {
    user.visitedPlaces.push(placeId);
    await user.save();
  }

  const updated = await Place.findOneAndUpdate(
    { _id: placeId },
    { $addToSet: { visitors: user._id }, $inc: { visitorsCount: 1 } },
    { new: true, select: 'visitorsCount' }
  ).lean();

  res.json({ visitedPlaces: user.visitedPlaces, visitorsCount: updated?.visitorsCount ?? 0 });
});

// DELETE /api/users/me/visits/:placeId — unmark a visited place
router.delete('/me/visits/:placeId', requireAuth, async (req, res) => {
  const { placeId } = req.params;
  const user = req.user;

  user.visitedPlaces = user.visitedPlaces.filter(id => id.toString() !== placeId);
  await user.save();

  const updated = await Place.findOneAndUpdate(
    { _id: placeId },
    { $pull: { visitors: user._id }, $inc: { visitorsCount: -1 } },
    { new: true, select: 'visitorsCount' }
  ).lean();

  res.json({ visitedPlaces: user.visitedPlaces, visitorsCount: updated?.visitorsCount ?? 0 });
});

module.exports = router;
