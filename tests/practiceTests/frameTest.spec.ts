import test, { expect } from '@playwright/test';

test('frame handling - 1st approach', async ({ page }) => {
  await page.goto('https://letcode.in/frame');

  // using the frame method, and after getting the frame we need to the frame object to interact with the frame elements
  const frame = page.frame('firstFr');
  await frame?.fill("input[name='fname']", 'Abhishek');
  await frame?.fill("input[name='lname']", 'Bhatt');

  /**
   * The frame?.fill() method calls are using optional chaining (?.). This means that if the frame object is null or undefined
   *  (i.e., if the frame with selector #firstFr is not found on the page), the fill() method will not be called, and the code will not throw an error.
   * Instead, it will gracefully handle the situation and proceed without attempting to interact with the frame elements.
   */
});

test('frame Handling- 2nd approach with nested frame', async ({ page }) => {
  await page.goto('https://letcode.in/frame');
  const frame = page.frameLocator('#firstFr');
  const firstName = frame.locator("input[name='fname']");
  const lastName = frame.locator("input[name='lname']");
  const message = frame.locator('p.title.has-text-info');
  await firstName.fill('Playwright');
  await lastName.fill('Automation');

  await expect(message).toContainText('You have entered');

  // To access the inner frame , we need to use the frame object and use framelocator to locate

  const innerFrame = frame.frameLocator('[src="innerFrame"]');
  const email = innerFrame.locator('input[name="email"]');
  await email.fill('abhishek@gmail.com');

  /**
   * NOTE: Instead of utilizing DefaultContent in Selenium, in Playwright, we can leverage the frame object to interact with elements without the need for explicit switching.
   */
  await firstName.fill('Web');
});
