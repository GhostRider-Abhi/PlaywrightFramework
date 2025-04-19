import { Page, Locator } from '@playwright/test';

export class PageUtils {
  constructor(private page: Page) {}

  async waitAndClick(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }

  async waitAndFill(
    locator: Locator,
    text: string,
    timeout = 5000,
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(text);
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(fullPage = false): Promise<Buffer> {
    return await this.page.screenshot({ fullPage });
  }
}
