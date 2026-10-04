import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4322', browserName: 'chromium' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 360, height: 800 } } },
  ],
  webServer: {
    command: 'node scripts/serve.mjs dist',
    url: 'http://127.0.0.1:4322',
    env: { PORT: '4322' },
    reuseExistingServer: false,
  },
});
