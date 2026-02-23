import { APIRequestContext, Page } from '@playwright/test';

const BACKEND_URL = 'http://localhost:3000';

export interface TestUser {
  email: string;
  displayName: string;
  role: 'editor' | 'approver';
}

/**
 * Calls the test-only backend endpoint to create/find a user and get a JWT.
 */
export async function getTestToken(
  request: APIRequestContext,
  user: TestUser,
): Promise<string> {
  const res = await request.post(`${BACKEND_URL}/auth/test-login`, {
    data: user,
  });
  if (!res.ok()) {
    throw new Error(`test-login failed: ${res.status()} ${await res.text()}`);
  }
  const body = await res.json();
  return body.token;
}

/**
 * Logs in a test user by navigating to /callback?token=… — mirrors the real
 * Google OAuth callback flow so the Angular AuthService sets up the session.
 */
export async function loginAs(
  page: Page,
  request: APIRequestContext,
  user: TestUser,
): Promise<void> {
  const token = await getTestToken(request, user);
  await page.goto(`/callback?token=${token}`);
  await page.waitForURL(/\/map/, { timeout: 10_000 });
}
