import test, { expect } from '@playwright/test';

test('download file', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/download-file-demo',
  );
  //   await page.locator('button[type="button"]').click();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('button[type="button"]').click(), //Downloaded files are deleted when the browser context that produced them is closed.
  ]);

  const fileName = download.suggestedFilename();
  await download.saveAs(fileName);
});

test('upload file', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/upload-file-demo',
  );
  //first approach
  await page.setInputFiles('#file', 'LambdaTest.pdf');
  const success = page.locator('#error');
  await expect(success).toContainText('File Successfully Uploaded');

  await page.reload();
  //second approach using the event

  const [upload] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.click('#file'),
  ]);
  // we can also check if that upload accept multiple or not
  await upload.setFiles(['LambdaTest.pdf']);
});
