import { test } from '../testSetup/customTest';
import { LoginPage } from '../pageObjects/loginPage';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  //   await page.goto('https://rahulshettyacademy.com/client'); this first reload is handled in customTest.ts
  await loginPage.login('ghostrider1289@gmail.com', 'Ghost@1234');
  await loginPage.verifySuccessfulLogin();
});

test('invalid user login', async ({ loginPage }) => {
  await loginPage.login('ghostrider1289@gmail.com', 'Ghost@14');
  await loginPage.verifyLoginError();
});
