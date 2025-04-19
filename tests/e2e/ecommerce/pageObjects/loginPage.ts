import { expect, Locator, Page } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  passwordField: Locator;
  loginButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly loginSuccessfulMessage: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#userEmail');
    this.passwordField = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
    this.loginErrorMessage = page.locator('#toast-container .toast-message');
    this.loginSuccessfulMessage = page.locator('#toast-container .toast-title');
    this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
  async getLoginMessage(): Promise<string | null> {
    return await this.loginErrorMessage.textContent();
  }
  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.loginSuccessfulMessage).toHaveText('Login Successfully');
  }
  async verifyLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toHaveText(
      'Incorrect email or password.',
    );
  }
}
