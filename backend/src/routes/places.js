const express = require('express');
const Place = require('../models/Place');

const router = express.Router();

// GET /api/places — all places with optional filters
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.region) filter.region = req.query.region;

    const places = await Place.find(filter).select('-__v').lean();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// GET /api/places/:id — single place
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).select('-__v').lean();
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

module.exports = router;
