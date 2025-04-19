import { PlaywrightTestConfig } from '@playwright/test';
import defineConfig from './playwright.config';

const devconfig: PlaywrightTestConfig = {
  ...defineConfig,
  testDir: './tests/e2e/ecommerce/tests',
  workers: 5,
  fullyParallel: true,
};

export default devconfig;
