import test from '@playwright/test';
import { HomePage } from '../pageRepository/homePage';
import { AddToCartPage } from '../pageRepository/addToCartPage';

test('verify Add to Cart using topmenu', async ({ page }) => {
  const homePage = new HomePage(page);
  const addToCartPage = new AddToCartPage(page);
  await page.goto('https://demo.nopcommerce.com/');
  await homePage
    .getTopMenuComponent()
    .selectProduct('Computers', 'Notebooks', 'Apple MacBook Pro 13-inch');
  await addToCartPage.clickAddToButton();
  await addToCartPage.verifyProductAdded();
});
