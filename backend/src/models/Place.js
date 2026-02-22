const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['nature', 'historical', 'trail', 'city'],
    required: true
  },
  description: { type: String, default: '' },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  region: {
    type: String,
    enum: ['north', 'center', 'jerusalem', 'south', 'judea'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard', null],
    default: null
  },
  aliases: [{ type: String }],
  images: [{ type: String }],
  externalUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
