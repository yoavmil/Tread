const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['nature', 'historical', 'trail', 'city'],
    default: 'nature'
  },
  description: { type: String, default: '' },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  region: {
    type: String,
    enum: ['north', 'center', 'jerusalem', 'south', 'judea'],
    default: null
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard', null],
    default: null
  },
  aliases: [{ type: String }],
  images: [{ type: String }],
  externalUrl: { type: String, default: '' },
  visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  visitorsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
