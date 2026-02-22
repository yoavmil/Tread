const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const { createTestUser, bearerHeader } = require('../helpers/auth');
const app = require('../../src/app');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);

// ── GET /api/users/me ────────────────────────────────────────────────────────

describe('GET /api/users/me', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.status).toBe(401);
  });

  test('returns the current user profile', async () => {
    const user = await createTestUser({ displayName: 'ישראל ישראלי' });
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', bearerHeader(user._id));

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(user._id.toString());
    expect(res.body.displayName).toBe('ישראל ישראלי');
    expect(res.body.email).toBe(user.email);
    expect(Array.isArray(res.body.visitedPlaces)).toBe(true);
  });
});

// ── PATCH /api/users/me ──────────────────────────────────────────────────────

describe('PATCH /api/users/me', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .patch('/api/users/me')
      .send({ displayName: 'New Name' });
    expect(res.status).toBe(401);
  });

  test('returns 400 when displayName is missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', bearerHeader(user._id))
      .send({});
    expect(res.status).toBe(400);
  });

  test('returns 400 when displayName is an empty string', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', bearerHeader(user._id))
      .send({ displayName: '   ' });
    expect(res.status).toBe(400);
  });

  test('returns 400 when displayName exceeds 50 characters', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', bearerHeader(user._id))
      .send({ displayName: 'a'.repeat(51) });
    expect(res.status).toBe(400);
  });

  test('updates the display name and returns updated user', async () => {
    const user = await createTestUser({ displayName: 'Old Name' });
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', bearerHeader(user._id))
      .send({ displayName: 'New Name' });

    expect(res.status).toBe(200);
    expect(res.body.displayName).toBe('New Name');
    expect(res.body._id).toBe(user._id.toString());
    expect(res.body.email).toBe(user.email);
  });

  test('trims whitespace from the display name', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', bearerHeader(user._id))
      .send({ displayName: '  Trimmed  ' });

    expect(res.status).toBe(200);
    expect(res.body.displayName).toBe('Trimmed');
  });

  test('persists the updated name (visible via GET /api/users/me)', async () => {
    const user = await createTestUser({ displayName: 'Old Name' });
    const auth = bearerHeader(user._id);

    await request(app)
      .patch('/api/users/me')
      .set('Authorization', auth)
      .send({ displayName: 'Persisted Name' });

    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', auth);

    expect(res.body.displayName).toBe('Persisted Name');
  });
});

// ── POST /api/users/me/visits ────────────────────────────────────────────────

describe('POST /api/users/me/visits', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .post('/api/users/me/visits')
      .send({ placeId: '507f1f77bcf86cd799439011' });
    expect(res.status).toBe(401);
  });

  test('returns 400 when placeId is missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .post('/api/users/me/visits')
      .set('Authorization', bearerHeader(user._id))
      .send({});
    expect(res.status).toBe(400);
  });

  test('adds a placeId to visitedPlaces', async () => {
    const user = await createTestUser();
    const placeId = '507f1f77bcf86cd799439011';
    const res = await request(app)
      .post('/api/users/me/visits')
      .set('Authorization', bearerHeader(user._id))
      .send({ placeId });

    expect(res.status).toBe(200);
    expect(res.body.visitedPlaces.map(String)).toContain(placeId);
  });

  test('does not duplicate an already-visited place', async () => {
    const user = await createTestUser();
    const placeId = '507f1f77bcf86cd799439011';
    const auth = bearerHeader(user._id);

    await request(app).post('/api/users/me/visits').set('Authorization', auth).send({ placeId });
    const res = await request(app).post('/api/users/me/visits').set('Authorization', auth).send({ placeId });

    const count = res.body.visitedPlaces.filter(id => id.toString() === placeId).length;
    expect(count).toBe(1);
  });
});

// ── DELETE /api/users/me/visits/:placeId ─────────────────────────────────────

describe('DELETE /api/users/me/visits/:placeId', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).delete('/api/users/me/visits/507f1f77bcf86cd799439011');
    expect(res.status).toBe(401);
  });

  test('removes the placeId from visitedPlaces', async () => {
    const user = await createTestUser();
    const placeId = '507f1f77bcf86cd799439011';
    const auth = bearerHeader(user._id);

    await request(app).post('/api/users/me/visits').set('Authorization', auth).send({ placeId });
    const res = await request(app).delete(`/api/users/me/visits/${placeId}`).set('Authorization', auth);

    expect(res.status).toBe(200);
    expect(res.body.visitedPlaces.map(String)).not.toContain(placeId);
  });
});
