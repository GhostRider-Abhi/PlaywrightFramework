import { PlaywrightTestConfig } from '@playwright/test';
import defineConfig from './playwright.config';

const devconfig: PlaywrightTestConfig = {
  ...defineConfig,
  testDir: './tests/practiceTests',
};

export default devconfig;
