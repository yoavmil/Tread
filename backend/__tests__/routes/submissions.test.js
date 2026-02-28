const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const { createTestUser, bearerHeader } = require('../helpers/auth');
const app = require('../../src/app');
const Place = require('../../src/models/Place');
const EditSubmission = require('../../src/models/EditSubmission');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);

// ── Helpers ───────────────────────────────────────────────────────────────────

async function createTestPlace(overrides = {}) {
  return Place.create({
    name: 'עין גדי',
    category: 'nature',
    region: 'south',
    coordinates: { lat: 31.46, lng: 35.39 },
    ...overrides,
  });
}

async function createEditSubmission(user, place, overrides = {}) {
  return EditSubmission.create({
    placeId: place._id,
    before: { _id: place._id, name: place.name, category: place.category },
    after: { description: 'תיאור מעודכן' },
    submittedBy: user._id,
    ...overrides,
  });
}

// ── GET /api/submissions/edit ─────────────────────────────────────────────────

describe('GET /api/submissions/edit', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).get('/api/submissions/edit');
    expect(res.status).toBe(401);
  });

  test('returns 403 for a non-approver user', async () => {
    const editor = await createTestUser({ role: 'editor' });
    const res = await request(app)
      .get('/api/submissions/edit')
      .set('Authorization', bearerHeader(editor._id));
    expect(res.status).toBe(403);
  });

  test('returns an empty array when there are no pending submissions', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .get('/api/submissions/edit')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns summary fields only (no before/after)', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    await createEditSubmission(approver, place);

    const res = await request(app)
      .get('/api/submissions/edit')
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    const item = res.body[0];
    expect(item._id).toBeDefined();
    expect(item.placeId.name).toBe('עין גדי');
    expect(item.submittedBy.displayName).toBeDefined();
    expect(item.createdAt).toBeDefined();
    expect(item.before).toBeUndefined();
    expect(item.after).toBeUndefined();
  });

});

// ── GET /api/submissions/edit/:id ─────────────────────────────────────────────

describe('GET /api/submissions/edit/:id', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).get('/api/submissions/edit/507f1f77bcf86cd799439011');
    expect(res.status).toBe(401);
  });

  test('returns 403 for a non-approver user', async () => {
    const editor = await createTestUser({ role: 'editor' });
    const res = await request(app)
      .get('/api/submissions/edit/507f1f77bcf86cd799439011')
      .set('Authorization', bearerHeader(editor._id));
    expect(res.status).toBe(403);
  });

  test('returns 404 for a non-existent id', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .get('/api/submissions/edit/507f1f77bcf86cd799439011')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(404);
  });

  test('returns the full submission including before/after', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await createEditSubmission(approver, place);

    const res = await request(app)
      .get(`/api/submissions/edit/${submission._id}`)
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(submission._id.toString());
    expect(res.body.before).toBeDefined();
    expect(res.body.after).toBeDefined();
    expect(res.body.placeId.name).toBe('עין גדי');
    expect(res.body.submittedBy.displayName).toBeDefined();
  });
});

// ── PATCH /api/submissions/edit/:id ──────────────────────────────────────────

describe('PATCH /api/submissions/edit/:id', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .patch('/api/submissions/edit/507f1f77bcf86cd799439011')
      .send({ after: { description: 'New' } });
    expect(res.status).toBe(401);
  });

  test('returns 400 when after is missing', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await createEditSubmission(approver, place);

    const res = await request(app)
      .patch(`/api/submissions/edit/${submission._id}`)
      .set('Authorization', bearerHeader(approver._id))
      .send({});
    expect(res.status).toBe(400);
  });

  test('updates the after field', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await createEditSubmission(approver, place);

    const res = await request(app)
      .patch(`/api/submissions/edit/${submission._id}`)
      .set('Authorization', bearerHeader(approver._id))
      .send({ after: { description: 'תיאור חדש' } });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);

    const updated = await EditSubmission.findById(submission._id);
    expect(updated.after.description).toBe('תיאור חדש');
  });
});

// ── POST /api/submissions/edit/:id/approve ────────────────────────────────────

describe('POST /api/submissions/edit/:id/approve', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).post('/api/submissions/edit/507f1f77bcf86cd799439011/approve');
    expect(res.status).toBe(401);
  });

  test('returns 404 for a non-existent id', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .post('/api/submissions/edit/507f1f77bcf86cd799439011/approve')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(404);
  });

  test('applies after fields to the Place and deletes the submission', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await createEditSubmission(approver, place, {
      after: { description: 'תיאור שאושר', externalUrl: 'https://example.com' },
    });

    const res = await request(app)
      .post(`/api/submissions/edit/${submission._id}/approve`)
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.placeId.toString()).toBe(place._id.toString());

    const updatedPlace = await Place.findById(place._id);
    expect(updatedPlace.description).toBe('תיאור שאושר');
    expect(updatedPlace.externalUrl).toBe('https://example.com');

    const deletedSubmission = await EditSubmission.findById(submission._id);
    expect(deletedSubmission).toBeNull();
  });
});

// ── POST /api/submissions/edit/:id/decline ────────────────────────────────────

describe('POST /api/submissions/edit/:id/decline', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).post('/api/submissions/edit/507f1f77bcf86cd799439011/decline');
    expect(res.status).toBe(401);
  });

  test('deletes the submission when declined', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await createEditSubmission(approver, place);

    const res = await request(app)
      .post(`/api/submissions/edit/${submission._id}/decline`)
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);

    const deleted = await EditSubmission.findById(submission._id);
    expect(deleted).toBeNull();
  });

  test('does not modify the Place when declining', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace({ description: 'תיאור מקורי' });
    const submission = await createEditSubmission(approver, place, {
      after: { description: 'תיאור חלופי' },
    });

    await request(app)
      .post(`/api/submissions/edit/${submission._id}/decline`)
      .set('Authorization', bearerHeader(approver._id));

    const unchanged = await Place.findById(place._id);
    expect(unchanged.description).toBe('תיאור מקורי');
  });
});
