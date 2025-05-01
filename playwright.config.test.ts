import { PlaywrightTestConfig } from '@playwright/test';
import defineConfig from './playwright.config';

const devconfig: PlaywrightTestConfig = {
  ...defineConfig,
  testDir: './tests/research/',
  testMatch: /.*\.spec\.ts/,
  timeout: 30000,
  workers: process.env.BROWSERSTACK ? 5 : undefined,
  maxFailures: 0, // Don't stop on failures
  retries: 1,
  fullyParallel: true,
};

export default devconfig;
