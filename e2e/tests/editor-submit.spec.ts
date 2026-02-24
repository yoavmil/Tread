import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

const EDITOR = {
  email: 'test-editor@e2e.local',
  displayName: 'Test Editor',
  role: 'editor' as const,
};

// The + button is only visible on mobile (display:none on desktop via CSS).
// Use a mobile viewport so the button is actually rendered and clickable.
test.use({ viewport: { width: 390, height: 844 } });

test.describe('Editor — submit new location', () => {
  test('editor can log in and submit a new location via the form', async ({ page, request }) => {
    // ── 1. Login ────────────────────────────────────────────────────────────
    await loginAs(page, request, EDITOR);
    await expect(page).toHaveURL(/\/map/);

    // ── 2. Open the new-place form via the + button (mobile-visible) ─────────
    await page.locator('button[title="הוסף מיקום חדש"]').click();
    await page.waitForURL(/\/new-place/, { timeout: 5_000 });

    // ── 3. Fill in the form ─────────────────────────────────────────────────
    // Name
    const nameInput = page
      .locator('mat-form-field')
      .filter({ has: page.locator('mat-label', { hasText: /^שם$/ }) })
      .locator('input')
      .fill('E2E Test Place');
    
    // Category
    await page.locator('mat-select').nth(0).click({ force: true });
    await page.waitForSelector('mat-option', { state: 'visible' });
    await page.getByRole('option', { name: 'טבע' }).click();

    // Wait for panel to fully close before opening next
    await page.waitForSelector('mat-option', { state: 'detached' });

    // Region
    await page.locator('mat-select').nth(1).click();
    await page.waitForSelector('mat-option', { state: 'visible' });
    await page.getByRole('option', { name: 'מרכז' }).click();

    // Coordinates
    await page
      .locator('mat-form-field')
      .filter({ has: page.locator('mat-label', { hasText: 'קו רוחב' }) })
      .locator('input')
      .fill('32.0');

    await page
      .locator('mat-form-field')
      .filter({ has: page.locator('mat-label', { hasText: 'קו אורך' }) })
      .locator('input')
      .fill('35.0');

    // ── 4. Submit ───────────────────────────────────────────────────────────
    await page.locator('button[type="submit"]').click();

    // ── 5. Assert success ────────────────────────────────────────────────────
    // Success snackbar appears
    await expect(page.locator('mat-snack-bar-container')).toContainText('תודה', {
      timeout: 8_000,
    });

    // Navigates back to map
    await page.waitForURL(/\/map/, { timeout: 5_000 });
  });
});
