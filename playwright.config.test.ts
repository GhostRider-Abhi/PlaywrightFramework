import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/research',
  use: {
    browserName: 'chromium',
    headless: false, // Change to false if needed
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});
