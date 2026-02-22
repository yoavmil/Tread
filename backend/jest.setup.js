// Environment variables for tests — set before any module is imported
process.env.JWT_SECRET = 'test-jwt-secret-do-not-use-in-production';
process.env.RESEND_API_KEY = 'test-resend-key';
process.env.NOTIFY_EMAIL = 'test@example.com';
process.env.FRONTEND_URL = 'http://localhost:4200';
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
