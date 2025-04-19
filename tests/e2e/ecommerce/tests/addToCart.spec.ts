import { test } from '../testSetup/customTest';

test('validate add to cart', async ({ loginPage, dashboardPage }) => {
  await loginPage.login('ghostrider1289@gmail.com', 'Ghost@1234');
  await loginPage.verifySuccessfulLogin();
  await dashboardPage.selectRandomProduct();
  await dashboardPage.verifyProductAddedToCart();
});
