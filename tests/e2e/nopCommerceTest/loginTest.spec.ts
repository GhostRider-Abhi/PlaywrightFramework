import test, { expect } from '@playwright/test';
import { HomePage } from '../pageRepository/homePage';
import { LoginPage } from '../pageRepository/loginPage';

test('verify login for nopCommerce', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginpage = new LoginPage(page);
  await page.goto('https://demo.nopcommerce.com/');
  await homePage.clickLoginBtn();
  await loginpage.loginIn('bhattabhi1289@gmail.com', 'Abhi@12345');
  await expect(homePage.unsuccessfulLoginMessage).toBeEnabled();
});
