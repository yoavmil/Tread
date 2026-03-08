const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const { createTestUser, bearerHeader } = require('../helpers/auth');
const app = require('../../src/app');
const NewSubmission = require('../../src/models/NewSubmission');
const EditSubmission = require('../../src/models/EditSubmission');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);

// ── POST /api/suggest-edit ────────────────────────────────────────────────────

describe('POST /api/suggest-edit', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .post('/api/suggest-edit')
      .send({ before: { _id: '507f1f77bcf86cd799439011', name: 'עין גדי' }, after: { name: 'עין גדי 2' } });
    expect(res.status).toBe(401);
  });

  test('returns 400 when before/after are missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .post('/api/suggest-edit')
      .set('Authorization', bearerHeader(user._id))
      .send({});
    expect(res.status).toBe(400);
  });

  test('returns 400 when before._id is missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .post('/api/suggest-edit')
      .set('Authorization', bearerHeader(user._id))
      .send({ before: { name: 'עין גדי' }, after: { description: 'Updated' } });
    expect(res.status).toBe(400);
  });

  test('saves an EditSubmission to the DB and returns { ok, id }', async () => {
    const user = await createTestUser();
    const placeId = '507f1f77bcf86cd799439011';
    const before = { _id: placeId, name: 'עין גדי', category: 'nature' };
    const after = { description: 'תיאור מעודכן' };

    const res = await request(app)
      .post('/api/suggest-edit')
      .set('Authorization', bearerHeader(user._id))
      .send({ before, after });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.id).toBeDefined();

    const doc = await EditSubmission.findById(res.body.id);
    expect(doc).not.toBeNull();
    expect(doc.placeId.toString()).toBe(placeId);
    expect(doc.before.name).toBe('עין גדי');
    expect(doc.after.description).toBe('תיאור מעודכן');
    expect(doc.submittedBy.toString()).toBe(user._id.toString());
  });
});

// ── POST /api/suggest-new ─────────────────────────────────────────────────────

describe('POST /api/suggest-new', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .post('/api/suggest-new')
      .send({ place: { name: 'מקום חדש' } });
    expect(res.status).toBe(401);
  });

  test('returns 400 when place payload is missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .post('/api/suggest-new')
      .set('Authorization', bearerHeader(user._id))
      .send({});
    expect(res.status).toBe(400);
  });

  test('returns 400 when place name is missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .post('/api/suggest-new')
      .set('Authorization', bearerHeader(user._id))
      .send({ place: { category: 'nature' } });
    expect(res.status).toBe(400);
  });

  test('saves a NewSubmission and returns { ok, id }', async () => {
    const user = await createTestUser();
    const place = {
      name: 'מקום חדש',
      category: 'nature',
      region: 'north',
      coordinates: { lat: 33.0, lng: 35.5 },
    };

    const res = await request(app)
      .post('/api/suggest-new')
      .set('Authorization', bearerHeader(user._id))
      .send({ place });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.id).toBeDefined();

    const doc = await NewSubmission.findById(res.body.id);
    expect(doc).not.toBeNull();
    expect(doc.placeData.name).toBe('מקום חדש');
    expect(doc.submittedBy.toString()).toBe(user._id.toString());
  });
});
