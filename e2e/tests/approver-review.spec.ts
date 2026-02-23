import { test, expect } from '@playwright/test';
import { loginAs, getTestToken } from '../helpers/auth';

const EDITOR = {
  email: 'test-editor@e2e.local',
  displayName: 'Test Editor',
  role: 'editor' as const,
};

const APPROVER = {
  email: 'test-approver@e2e.local',
  displayName: 'Test Approver',
  role: 'approver' as const,
};

const BACKEND_URL = 'http://localhost:3000';
// Unique name per run so old test data doesn't interfere
const PLACE_NAME = `E2E Approval Test ${Date.now()}`;

test.describe('Approver — review and approve a pending submission', () => {
  test('approver can approve a submission and it appears in the regular places list', async ({
    page,
    request,
  }) => {
    // ── 1. Create a pending submission as an editor via the API ─────────────
    const editorToken = await getTestToken(request, EDITOR);

    const submitRes = await request.post(`${BACKEND_URL}/api/suggest-new`, {
      headers: { Authorization: `Bearer ${editorToken}` },
      data: {
        place: {
          name: PLACE_NAME,
          category: 'nature',
          region: 'north',
          coordinates: { lat: 33.0, lng: 35.5 },
          aliases: [],
          description: 'Created by e2e approver test',
          difficulty: null,
          externalUrl: '',
        },
      },
    });
    expect(submitRes.ok()).toBeTruthy();
    const { id: submissionId } = await submitRes.json();
    expect(submissionId).toBeTruthy();

    // ── 2. Log in as approver ───────────────────────────────────────────────
    await loginAs(page, request, APPROVER);
    await expect(page).toHaveURL(/\/map/);

    // ── 3. Open the filter menu ─────────────────────────────────────────────
    await page.locator('button.menu-btn').click();

    // ── 4. "מקומות חדשים" checkbox is visible only for approvers ───────────
    const submissionsCheckbox = page.locator('mat-checkbox', {
      hasText: 'מקומות חדשים',
    });
    await expect(submissionsCheckbox).toBeVisible();

    // ── 5. Enable the filter — verify the submissions API is called ─────────
    const submissionsReqPromise = page.waitForRequest(
      (req) =>
        req.url().includes('/api/submissions/new') && req.method() === 'GET',
    );
    await submissionsCheckbox.click();
    await submissionsReqPromise;

    // ── 6. Approve the submission via API ────────────────────────────────────
    // (Clicking a purple marker on the Mapbox canvas is not reliably testable;
    //  the approve API call is what actually matters here.)
    const approverToken = await getTestToken(request, APPROVER);

    const approveRes = await request.post(
      `${BACKEND_URL}/api/submissions/new/${submissionId}/approve`,
      { headers: { Authorization: `Bearer ${approverToken}` } },
    );
    expect(approveRes.ok()).toBeTruthy();
    const approveBody = await approveRes.json();
    expect(approveBody.ok).toBe(true);
    expect(approveBody.placeId).toBeTruthy();

    // ── 7. Verify the place now appears in the regular places list ───────────
    const placesRes = await request.get(`${BACKEND_URL}/api/places`, {
      headers: { Authorization: `Bearer ${approverToken}` },
    });
    expect(placesRes.ok()).toBeTruthy();
    const places: Array<{ _id: string; name: string; category: string; region: string }> =
      await placesRes.json();

    const approvedPlace = places.find((p) => p.name === PLACE_NAME);
    expect(approvedPlace).toBeDefined();
    expect(approvedPlace!.category).toBe('nature');
    expect(approvedPlace!.region).toBe('north');
  });
});
