import { PlaywrightTestConfig } from '@playwright/test';
import defineConfig from './playwright.config';

const devconfig: PlaywrightTestConfig = {
  ...defineConfig,
  testDir: './tests/e2e/ecommerce/tests',
  timeout: 30000,
  workers: process.env.BROWSERSTACK ? 3 : undefined,
  maxFailures: 0, // Don't stop on failures
  retries: 1,
  fullyParallel: true,
};

export default devconfig;
