import { expect } from '@playwright/test';
import { test } from '../testSetup/customTest';
const productName = 'ZARA COAT 3';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.login('ghostrider1289@gmail.com', 'Ghost@1234');
});
test('validate product in cartspage', async ({ dashboardPage, cartPage }) => {
  await dashboardPage.selectProductByName(productName);
  await dashboardPage.clickOnCartButton();
  const numOfItem = await cartPage.getSelectedProductCount();
  expect(numOfItem).toBeGreaterThanOrEqual(1);
  const listOfProducts = await cartPage.getAllCartItems();
  expect(listOfProducts).toContain(productName);
});
