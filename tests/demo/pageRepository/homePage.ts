// In HomePage.ts
import { Locator, Page } from '@playwright/test';
import { TopMenuComponent } from '../components/topMenuComponent';

export class HomePage {
  // readonly page: Page;
  private readonly getLoginBtn: Locator = this.page.getByText('Log in');
  private readonly getMyAccountLink: Locator =
    this.page.locator('.ico-account');
  readonly unsuccessfulLoginMessage = this.page.locator('.message-error');
  private readonly topMenuComponent: TopMenuComponent;

  constructor(private readonly page: Page) {
    this.topMenuComponent = new TopMenuComponent(page);
  }
  getTopMenuComponent() {
    return this.topMenuComponent;
  }
  async clickLoginBtn(): Promise<void> {
    await this.getLoginBtn.click();
  }
}
