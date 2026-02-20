const nature      = require('./nature');
const beaches     = require('./beaches');
const historical  = require('./historical');
const trails      = require('./trails');
const israelTrail = require('./israel-trail');
const cities      = require('./cities');

module.exports = [
  ...nature,
  ...beaches,
  ...historical,
  ...trails,
  ...israelTrail,
  ...cities,
];
