import test, { expect } from '@playwright/test';

test('validate the react application', async ({ page }) => {
  await page.goto('https://interview-exercise-blush.vercel.app/');
  const unitsButton = page.getByRole('button', { name: 'Units Sold' });
  await unitsButton.click();
  await unitsButton.click();

  const rowData = await page.locator('//tr[@role="checkbox"]').all();
  const tableData = [];

  console.log('length ---', rowData.length);
  for (let i = 0; i < rowData.length; i++) {
    const units = await rowData[i].locator('td').nth(2).innerText();
    // console.log(brandName);
    // console.log(units);

    // table[brandName] = units;
    tableData.push(units);
  }
  console.log('tableData ---', tableData);

  //   for (let i = 0; i < tableData.length - 1; i++) {
  //     expect(+tableData[i + 1]).toBeLessThanOrEqual(+tableData[i]);
  //   }

  const newTable = [...tableData].sort((a, b) => +b - +a);
  console.log('tableData ---', tableData);
  console.log('newTable ---', newTable);
  expect(tableData).toStrictEqual(newTable);
});
