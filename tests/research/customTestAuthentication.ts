import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  // Authenticated context will be used for all tests
  context: async ({ browser }, use) => {
    // Create .auth directory if it doesn't exist
    const authDir = path.join(__dirname, 'storageState', '.auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }
    const storageStatePath = path.join(authDir, 'user.json');

    // Create a new context with saved state if it exists
    if (fs.existsSync(storageStatePath)) {
      const context = await browser.newContext({
        storageState: storageStatePath,
      });
      await use(context);
      return;
    }

    // Perform login and save state
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.naukri.com/nlogin/login');
    await page.fill('#usernameField', 'bhattabhishek11@gmail.com');
    await page.locator('#passwordField').fill('Naukri@1289');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForLoadState('load');

    // Add proper wait for successful login
    await page.waitForTimeout(3000); // Adjust this as needed

    // Save storage state
    await context.storageState({ path: storageStatePath });
    console.log('Storage state saved to:', storageStatePath);

    // Close the initial context
    await context.close();

    // Create new context with the saved state
    const newContext = await browser.newContext({
      storageState: storageStatePath,
    });
    await use(newContext);
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto('https://www.naukri.com/nlogin/login');
    await use(page);
  },
});
