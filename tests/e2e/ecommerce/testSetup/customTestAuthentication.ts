import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export const test = base.extend({
  // Authenticated context will be used for all tests
  context: async ({ browser }, use) => {
    // Create .auth directory if it doesn't exist
    const authDir = path.join(process.cwd(), 'playwright', '.auth');
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

    await page.goto('https://rahulshettyacademy.com/client');

    // Fill login form - ensure these selectors are correct
    await page.locator('#userEmail').fill('ghostrider1289@gmail.com');
    await page.locator('#userPassword').fill('Ghost@1234');
    await page.locator('#login').click();

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
    await page.goto('https://rahulshettyacademy.com/client');
    await use(page);
  },
});
