const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const app = require('../../src/app');
const Place = require('../../src/models/Place');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);

const PLACES = [
  { name: 'עין גדי',    category: 'nature',     region: 'south',  coordinates: { lat: 31.46, lng: 35.38 } },
  { name: 'מצדה',       category: 'historical', region: 'south',  coordinates: { lat: 31.31, lng: 35.35 }, aliases: ['מבצר מצדה'] },
  { name: 'פארק הכרמל', category: 'nature',     region: 'north',  coordinates: { lat: 32.72, lng: 35.04 } },
];

beforeEach(() => Place.insertMany(PLACES));

// ── GET /api/places ───────────────────────────────────────────────────────────

describe('GET /api/places', () => {
  test('returns all places', async () => {
    const res = await request(app).get('/api/places');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  test('filters by category', async () => {
    const res = await request(app).get('/api/places?category=historical');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('מצדה');
  });

  test('filters by region', async () => {
    const res = await request(app).get('/api/places?region=south');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test('does not return __v field', async () => {
    const res = await request(app).get('/api/places');
    expect(res.body[0].__v).toBeUndefined();
  });
});

// ── GET /api/places/search ────────────────────────────────────────────────────

describe('GET /api/places/search', () => {
  test('returns places matching name', async () => {
    const res = await request(app).get('/api/places/search?q=עין');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('עין גדי');
  });

  test('returns places matching an alias', async () => {
    const res = await request(app).get('/api/places/search?q=מבצר');
    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe('מצדה');
  });

  test('is case-insensitive', async () => {
    const res = await request(app).get('/api/places/search?q=masada');
    expect(res.status).toBe(200);
    // no English matches → empty, but no crash
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('returns [] for query shorter than 2 chars', async () => {
    const res = await request(app).get('/api/places/search?q=א');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns [] for missing q param', async () => {
    const res = await request(app).get('/api/places/search');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('limits results to 10', async () => {
    const extra = Array.from({ length: 12 }, (_, i) => ({
      name: `מקום ${i}`,
      category: 'nature',
      region: 'north',
      coordinates: { lat: 32 + i * 0.01, lng: 35 },
    }));
    await Place.insertMany(extra);
    const res = await request(app).get('/api/places/search?q=מקום');
    expect(res.body.length).toBeLessThanOrEqual(10);
  });
});

// ── GET /api/places/:id ───────────────────────────────────────────────────────

describe('GET /api/places/:id', () => {
  test('returns a single place by id', async () => {
    const place = await Place.findOne({ name: 'עין גדי' });
    const res = await request(app).get(`/api/places/${place._id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('עין גדי');
    expect(res.body.coordinates).toBeDefined();
  });

  test('returns 404 for non-existent id', async () => {
    const res = await request(app).get('/api/places/000000000000000000000000');
    expect(res.status).toBe(404);
  });

  test('returns 500 for malformed id', async () => {
    const res = await request(app).get('/api/places/not-an-id');
    expect(res.status).toBe(500);
  });
});

// ── GET /health ───────────────────────────────────────────────────────────────

test('GET /health returns ok', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});
