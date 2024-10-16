import test, { expect } from '@playwright/test';

test('Handling javascript alert', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo',
  );

  /** This command needs to be executed before actually clicking on the alert button because it sets up
   * an event listener for handling JavaScript dialogs (such as alerts, confirms, or prompts) that may appear during the execution of your test.
   *
   **/
  page.on('dialog', async alert => {
    alert.accept();
  });
  await page.getByRole('button', { name: 'Click Me' }).nth(0).click();
});

test('Handling javascript confirm box', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo',
  );
  page.on('dialog', async alert => {
    alert.accept();
  });
  await page.getByRole('button', { name: 'Click Me' }).nth(1).click();
  const confirmationMessage = page.locator('#confirm-demo');
  await page.waitForSelector('#confirm-demo');
  await expect(confirmationMessage).toContainText('OK!');
});

test('Handling javascript prompt box', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo',
  );
  page.on('dialog', async alert => {
    alert.accept('Playwright');
  });
  await page.getByRole('button', { name: 'Click Me' }).nth(2).click();
  const confirmationMessage = page.locator('#prompt-demo');
  await page.waitForSelector('#prompt-demo');
  await expect(confirmationMessage).toContainText('Playwright');
});
