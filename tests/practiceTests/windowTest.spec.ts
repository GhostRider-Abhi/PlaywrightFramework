import test, { expect } from '@playwright/test';

test('Interacting with new window', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/window-popup-modal-demo',
  );

  const [tab] = await Promise.all([
    page.waitForEvent('popup'),
    await page.locator("a[title='Follow @Lambdatesting on Twitter']").click(),
  ]);

  expect(tab.url()).toContain('twitter');
});

test('Interacting with multiple windows', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/window-popup-modal-demo',
  );

  const [multiTab] = await Promise.all([
    page.waitForEvent('popup'),
    await page.locator('#followboth').click(),
  ]);
  await multiTab.waitForLoadState(); // to load for pages till there state gets completed
  // get all pages using the context method:
  const pages = multiTab.context().pages();

  let facebook;

  for (let index = 0; index < pages.length; index++) {
    const element = pages[index];
    if (element.url() == 'https://www.facebook.com/lambdatest/') {
      facebook = element;
    }
  }
  await facebook?.fill('#email', 'abhishek@gmail.com');
});
