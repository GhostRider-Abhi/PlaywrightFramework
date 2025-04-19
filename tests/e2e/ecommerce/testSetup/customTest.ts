import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { DashboardPage } from '../pageObjects/dashboard';
import { CartsPage } from '../pageObjects/cartsPage';

// 1. Fixed type definition using interface and correct syntax
interface MyFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  cartPage: CartsPage;
}

// 2. Export the extended test fixture
export const test = base.extend<MyFixtures>({
  // // Context fixture for authentication
  // context: async ({ browser }, use) => {
  //   const context = await browser.newContext();
  //   await use(context);
  // },

  // Page fixture with automatic navigation
  page: async ({ page }, use) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await use(page);
    // await page.close();
  },

  // LoginPage fixture
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartsPage(page));
  },
});
