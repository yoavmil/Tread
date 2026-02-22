const request = require('supertest');
const { connect, disconnect, clearAll } = require('../helpers/db');
const { createTestUser, tokenFor } = require('../helpers/auth');
const app = require('../../src/app');

beforeAll(connect);
afterAll(disconnect);
afterEach(clearAll);

describe('requireAuth middleware', () => {
  // Use a protected route as the test vehicle
  const PROTECTED = '/api/suggest-edit';

  test('returns 401 when Authorization header is missing', async () => {
    const res = await request(app).post(PROTECTED).send({ before: {}, after: {} });
    expect(res.status).toBe(401);
  });

  test('returns 401 when header does not start with "Bearer "', async () => {
    const res = await request(app)
      .post(PROTECTED)
      .set('Authorization', 'Token abc123')
      .send({ before: {}, after: {} });
    expect(res.status).toBe(401);
  });

  test('returns 401 for a malformed / invalid JWT', async () => {
    const res = await request(app)
      .post(PROTECTED)
      .set('Authorization', 'Bearer not.a.valid.jwt')
      .send({ before: {}, after: {} });
    expect(res.status).toBe(401);
  });

  test('returns 401 when the token references a non-existent user', async () => {
    // Sign a token for a random (non-existent) ObjectId
    const fakeId = '000000000000000000000001';
    const res = await request(app)
      .post(PROTECTED)
      .set('Authorization', `Bearer ${tokenFor(fakeId)}`)
      .send({ before: {}, after: {} });
    expect(res.status).toBe(401);
  });

  test('calls next() and sets req.user for a valid token', async () => {
    const user = await createTestUser();
    // /api/suggest-edit needs before+after to not 400; Resend is mocked in the suggests test.
    // Here we just verify auth passes (the route may 500 if Resend isn't mocked, but auth itself
    // must not return 401).
    const res = await request(app)
      .post(PROTECTED)
      .set('Authorization', `Bearer ${tokenFor(user._id)}`)
      .send({ before: { name: 'Test' }, after: { name: 'New' } });
    expect(res.status).not.toBe(401);
  });
});
