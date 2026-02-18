require('dotenv').config();
const mongoose = require('mongoose');
const Place = require('../models/Place');
const places = require('./places');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tread');
  console.log('Connected to MongoDB');

  await Place.deleteMany({});
  console.log('Cleared existing places');

  const inserted = await Place.insertMany(places);
  console.log(`Seeded ${inserted.length} places`);

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
