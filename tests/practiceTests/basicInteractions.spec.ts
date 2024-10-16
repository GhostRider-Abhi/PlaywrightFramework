import test, { expect } from '@playwright/test';

test('for Input Box', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/simple-form-demo',
  );
  const inputBox = page.locator('input#user-message');
  const placeHolder = await inputBox.getAttribute('placeholder');
  expect(placeHolder).toEqual('Please enter your Message');
  await inputBox.fill('Automation');
  const submitBtn = page.locator('#showInput');
  await submitBtn.click();
  const message = page.locator('#message');
  await expect(message).toHaveText('Automation');
});

test('for checkbox', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/checkbox-demo',
  );
  const firstCheckbox = page.locator('#isAgeSelected');
  await expect(firstCheckbox).not.toBeChecked();
  await firstCheckbox.check();
  await expect(firstCheckbox).toBeChecked();
});
