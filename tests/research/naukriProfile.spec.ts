import { expect, test } from '@playwright/test';

const testData = [
  {
    name: 'Abhishek',
    email: 'bhattabhishek11@gmail.com',
    password: 'Naukri@1289',
  },
];

// testData.forEach(data => {
//   test(`naukri profile ${data.name}`, async ({ page }) => {
//     await page.goto('https://www.naukri.com/nlogin/login');
//     await page.fill('#usernameField', data.email);
//     await page.locator('#passwordField').fill(data.password);
//     await page.getByRole('button', { name: 'Login', exact: true }).click();
//     await page.waitForLoadState('load');
//     const profile = page.getByText('View profile');
//     await page.waitForURL('**/homepage');
//     await profile.click();
//     await page.waitForLoadState('load');
//     const chatBot = page.locator('div.chatBot-ic-cross');
//     if (await chatBot.isVisible()) {
//       console.log('Chatbot is visible, clicking to close it');
//       await chatBot.click();
//     }
//     await page.locator('span.edit.icon').nth(0).click();
//     await page.getByRole('button', { name: 'Save' }).click();

//     const successMsg = page.locator('.success .head');
//     await expect(successMsg).toHaveText('Success');
//   });
// });

testData.forEach(data => {
  test(`naukri profile ${data.name}`, async ({ browser }) => {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    await page.goto('https://www.naukri.com/nlogin/login');

    await page
      .locator('#usernameField')
      .pressSequentially(data.email, { delay: 100 });
    await page.waitForTimeout(2000);
    await page.locator('#passwordField').fill(data.password);

    await page.waitForTimeout(Math.floor(Math.random() * 3000) + 1000);
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForLoadState('load');

    // Detect if CAPTCHA exists
    const captcha = page.locator('iframe[src*="captcha"]');
    if (await captcha.isVisible()) {
      console.log('⚠️ CAPTCHA detected! You may need manual intervention.');
    }

    await page.waitForSelector('text=View profile', { timeout: 10000 });
    await page.getByText('View profile').click();

    // Close chatbot if visible
    const chatBot = page.locator('div.chatBot-ic-cross');
    if (await chatBot.isVisible()) {
      console.log('Chatbot is visible, clicking to close it');
      await chatBot.click();
    }

    await page.locator('span.edit.icon').nth(0).click();
    await page.getByRole('button', { name: 'Save' }).click();

    const successMsg = page.locator('.success .head');
    await expect(successMsg).toHaveText('Success');
  });
});
