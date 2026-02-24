const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const { createTestUser, bearerHeader } = require('../helpers/auth');
const app = require('../../src/app');
const Place = require('../../src/models/Place');
const User = require('../../src/models/User');
const EraseSubmission = require('../../src/models/EraseSubmission');

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

// ── POST /api/suggest-erase ───────────────────────────────────────────────────

describe('POST /api/suggest-erase', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .post('/api/suggest-erase')
      .send({ placeId: '507f1f77bcf86cd799439011' });
    expect(res.status).toBe(401);
  });

  test('returns 400 when placeId is missing', async () => {
    const user = await createTestUser();
    const res = await request(app)
      .post('/api/suggest-erase')
      .set('Authorization', bearerHeader(user._id))
      .send({});
    expect(res.status).toBe(400);
  });

  test('saves an EraseSubmission and returns { ok, id }', async () => {
    const user = await createTestUser();
    const place = await createTestPlace();

    const res = await request(app)
      .post('/api/suggest-erase')
      .set('Authorization', bearerHeader(user._id))
      .send({ placeId: place._id, reason: 'מקום זה כבר לא קיים' });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.id).toBeDefined();

    const doc = await EraseSubmission.findById(res.body.id);
    expect(doc).not.toBeNull();
    expect(doc.placeId.toString()).toBe(place._id.toString());
    expect(doc.reason).toBe('מקום זה כבר לא קיים');
    expect(doc.submittedBy.toString()).toBe(user._id.toString());
  });
});

// ── GET /api/submissions/erase ────────────────────────────────────────────────

describe('GET /api/submissions/erase', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).get('/api/submissions/erase');
    expect(res.status).toBe(401);
  });

  test('returns 403 for a non-approver user', async () => {
    const editor = await createTestUser({ role: 'editor' });
    const res = await request(app)
      .get('/api/submissions/erase')
      .set('Authorization', bearerHeader(editor._id));
    expect(res.status).toBe(403);
  });

  test('returns an empty array when there are no submissions', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .get('/api/submissions/erase')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('returns submissions with summary fields', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    await EraseSubmission.create({ placeId: place._id, submittedBy: approver._id });

    const res = await request(app)
      .get('/api/submissions/erase')
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].placeId.name).toBe('עין גדי');
    expect(res.body[0].submittedBy.displayName).toBeDefined();
    expect(res.body[0].createdAt).toBeDefined();
  });
});

// ── GET /api/submissions/erase/:id ────────────────────────────────────────────

describe('GET /api/submissions/erase/:id', () => {
  test('returns 404 for a non-existent id', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .get('/api/submissions/erase/507f1f77bcf86cd799439011')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(404);
  });

  test('returns full submission including reason', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await EraseSubmission.create({
      placeId: place._id,
      reason: 'מקום שגוי',
      submittedBy: approver._id,
    });

    const res = await request(app)
      .get(`/api/submissions/erase/${submission._id}`)
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(submission._id.toString());
    expect(res.body.reason).toBe('מקום שגוי');
    expect(res.body.placeId.name).toBe('עין גדי');
  });
});

// ── POST /api/submissions/erase/:id/approve ───────────────────────────────────

describe('POST /api/submissions/erase/:id/approve', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).post('/api/submissions/erase/507f1f77bcf86cd799439011/approve');
    expect(res.status).toBe(401);
  });

  test('returns 404 for a non-existent submission', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .post('/api/submissions/erase/507f1f77bcf86cd799439011/approve')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(404);
  });

  test('deletes the place, removes the submission, and cleans up visitor references', async () => {
    // Location A visited by User B — they point to each other
    const place = await createTestPlace();
    const userB = await createTestUser({
      visitedPlaces: [place._id],
    });
    await Place.findByIdAndUpdate(place._id, {
      $push: { visitors: userB._id },
      $inc: { visitorsCount: 1 },
    });

    // User C proposes the erase
    const userC = await createTestUser();
    const submission = await EraseSubmission.create({
      placeId: place._id,
      submittedBy: userC._id,
    });

    // User D (approver) accepts
    const userD = await createTestUser({ role: 'approver' });
    const res = await request(app)
      .post(`/api/submissions/erase/${submission._id}/approve`)
      .set('Authorization', bearerHeader(userD._id));

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);

    // Submission is gone
    const deletedSubmission = await EraseSubmission.findById(submission._id);
    expect(deletedSubmission).toBeNull();

    // Place is gone
    const deletedPlace = await Place.findById(place._id);
    expect(deletedPlace).toBeNull();

    // User B no longer has the place in visitedPlaces
    const updatedUserB = await User.findById(userB._id);
    expect(updatedUserB.visitedPlaces.map(id => id.toString())).not.toContain(place._id.toString());
  });
});

// ── POST /api/submissions/erase/:id/decline ───────────────────────────────────

describe('POST /api/submissions/erase/:id/decline', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app).post('/api/submissions/erase/507f1f77bcf86cd799439011/decline');
    expect(res.status).toBe(401);
  });

  test('returns 404 for a non-existent submission', async () => {
    const approver = await createTestUser();
    const res = await request(app)
      .post('/api/submissions/erase/507f1f77bcf86cd799439011/decline')
      .set('Authorization', bearerHeader(approver._id));
    expect(res.status).toBe(404);
  });

  test('deletes the submission but leaves the place intact', async () => {
    const approver = await createTestUser();
    const place = await createTestPlace();
    const submission = await EraseSubmission.create({
      placeId: place._id,
      submittedBy: approver._id,
    });

    const res = await request(app)
      .post(`/api/submissions/erase/${submission._id}/decline`)
      .set('Authorization', bearerHeader(approver._id));

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);

    // Submission is gone
    const deletedSubmission = await EraseSubmission.findById(submission._id);
    expect(deletedSubmission).toBeNull();

    // Place is still there
    const stillExists = await Place.findById(place._id);
    expect(stillExists).not.toBeNull();
  });
});
