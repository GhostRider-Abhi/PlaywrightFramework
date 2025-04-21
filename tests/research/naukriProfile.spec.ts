import { expect } from '@playwright/test';
import { test } from './customTestAuthentication';

const testData = [
  {
    name: 'Abhishek',
    email: 'bhattabhishek11@gmail.com',
    password: 'Naukri@1289',
  },
];

testData.forEach(data => {
  test(`naukri profile ${data.name}`, async ({ page }) => {
    await page.goto('https://www.naukri.com/nlogin/login');
    // await page.fill('#usernameField', data.email);
    // await page.locator('#passwordField').fill(data.password);
    // await page.getByRole('button', { name: 'Login', exact: true }).click();
    // await page.waitForLoadState('load');
    const profile = page.getByText('View profile');
    await page.waitForURL('**/homepage');
    await profile.click();
    await page.waitForLoadState('load');
    const chatBot = page.locator('.chatBot-ic-cross');
    if (await chatBot.isVisible()) {
      await chatBot.click();
    }
    await page.locator('span.edit.icon').nth(0).click();
    await page.getByRole('button', { name: 'Save' }).click();

    const successMsg = page.locator('.success .head');
    await expect(successMsg).toHaveText('Success');
  });
});
