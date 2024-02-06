// In HomePage.ts
import { Locator, Page } from '@playwright/test';

export class LoginPage {
  // readonly page: Page;
  readonly emailTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginSubmitBtn: Locator;

  constructor(page: Page) {
    this.emailTextBox = page.locator('#Email');
    this.passwordTextBox = page.locator('#Password');
    this.loginSubmitBtn = page.getByRole('button', { name: 'Log in' });
  }

  async loginIn(email: string, password: string) {
    await this.emailTextBox.fill(email);
    await this.passwordTextBox.fill(password);
    await this.loginSubmitBtn.click();
  }
}
