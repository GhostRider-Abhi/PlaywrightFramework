// In HomePage.ts
import { Page } from '@playwright/test';

export class TopMenuComponent {
  // readonly page: Page;
  private readonly menu = (menuName: string) =>
    this.page.getByRole('link', { name: menuName });
  private readonly submenu = (SubMenuName: string) =>
    this.page.getByRole('link', { name: SubMenuName }).first();
  private readonly product = (productName: string) =>
    this.page.getByRole('link', { name: productName }).first();
  // readonly getMyAccountLink: Locator;

  constructor(private readonly page: Page) {
    // this.getLoginBtn = page.getByText("Log in");
    // this.getMyAccountLink = page.locator(".ico-account");
  }
  async selectItem(productName: string): Promise<void> {
    await this.product(productName).click();
  }
  async selectMainMenu(mainMenu: string): Promise<void> {
    await this.menu(mainMenu).click();
  }
  async selectSubMenu(SubMenuName: string): Promise<void> {
    await this.submenu(SubMenuName).waitFor({ state: 'visible' });
    await this.submenu(SubMenuName).click();
  }

  async selectProduct(
    mainMenuName: string,
    subMenuName: string,
    productName: string
  ) {
    await this.selectMainMenu(mainMenuName);
    await this.selectSubMenu(subMenuName);
    await this.selectItem(productName);
  }
}
