import test, { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

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
  console.log('File name:', fileName);
  const filePath = path.join(__dirname, 'downloads', fileName);
  console.log('File path:', filePath);
  await download.saveAs(filePath);

  expect(fs.existsSync(filePath)).toBeTruthy(); // File exists
  expect(fs.statSync(filePath).size).toBeGreaterThan(0); // Not empty
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
