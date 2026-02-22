const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const { createTestUser, bearerHeader } = require('../helpers/auth');
const app = require('../../src/app');
const NewSubmission = require('../../src/models/NewSubmission');

// ── Mock Resend (still used by suggest-edit) ──────────────────────────────────

const mockSend = jest.fn().mockResolvedValue({ id: 'test-email-id' });

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);
afterEach(() => mockSend.mockClear());

// ── POST /api/suggest-edit ────────────────────────────────────────────────────

describe('POST /api/suggest-edit', () => {
  test('returns 401 without a token', async () => {
    const res = await request(app)
      .post('/api/suggest-edit')
      .send({ before: { name: 'עין גדי' }, after: { name: 'עין גדי 2' } });
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

  test('returns 200 and sends an email with valid token and payload', async () => {
    const user = await createTestUser();
    const before = { name: 'עין גדי', category: 'nature' };
    const after  = { name: 'עין גדי', description: 'Updated description' };

    const res = await request(app)
      .post('/api/suggest-edit')
      .set('Authorization', bearerHeader(user._id))
      .send({ before, after });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);

    const emailArg = mockSend.mock.calls[0][0];
    expect(emailArg.subject).toContain('עין גדי');
    expect(emailArg.text).toContain(user.email);
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

    // No email sent
    expect(mockSend).not.toHaveBeenCalled();

    // Document persisted correctly
    const doc = await NewSubmission.findById(res.body.id);
    expect(doc).not.toBeNull();
    expect(doc.placeData.name).toBe('מקום חדש');
    expect(doc.submittedBy.toString()).toBe(user._id.toString());
    expect(doc.status).toBe('pending');
  });
});
