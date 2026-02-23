import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests assume both servers are already running:
 *   frontend: http://localhost:4200  (ng serve)
 *   backend:  http://localhost:3000  (npm run backend)
 *
 * Run with: npm run test:e2e
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
