const { connect, disconnect, clearAll } = require('../helpers/db');
const Place = require('../../src/models/Place');

const VALID = {
  name: 'עין גדי',
  category: 'nature',
  region: 'south',
  coordinates: { lat: 31.46, lng: 35.38 },
};

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);

describe('Place model — valid data', () => {
  test('saves a complete valid place', async () => {
    const place = await Place.create(VALID);
    expect(place._id).toBeDefined();
    expect(place.name).toBe('עין גדי');
  });

  test('defaults description to empty string', async () => {
    const place = await Place.create(VALID);
    expect(place.description).toBe('');
  });

  test('defaults difficulty to null', async () => {
    const place = await Place.create(VALID);
    expect(place.difficulty).toBeNull();
  });

  test('defaults externalUrl to empty string', async () => {
    const place = await Place.create(VALID);
    expect(place.externalUrl).toBe('');
  });

  test('saves aliases array', async () => {
    const place = await Place.create({ ...VALID, aliases: ['אין גדי', 'EG'] });
    expect(place.aliases).toEqual(['אין גדי', 'EG']);
  });

  test('accepts judea as region', async () => {
    const place = await Place.create({ ...VALID, region: 'judea' });
    expect(place.region).toBe('judea');
  });
});

describe('Place model — validation failures', () => {
  test('rejects missing name', async () => {
    const { name, ...without } = VALID;
    await expect(Place.create(without)).rejects.toThrow(/name/i);
  });

  test('rejects missing coordinates', async () => {
    const { coordinates, ...without } = VALID;
    await expect(Place.create(without)).rejects.toThrow();
  });

  test('rejects invalid category', async () => {
    await expect(Place.create({ ...VALID, category: 'zoo' })).rejects.toThrow();
  });

  test('rejects invalid region', async () => {
    await expect(Place.create({ ...VALID, region: 'overseas' })).rejects.toThrow();
  });

  test('rejects invalid difficulty', async () => {
    await expect(Place.create({ ...VALID, difficulty: 'brutal' })).rejects.toThrow();
  });
});
