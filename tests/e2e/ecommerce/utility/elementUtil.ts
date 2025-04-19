import { Locator, Page } from '@playwright/test';

export class ElementUtils {
  constructor(private page: Page) {}

  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  async getElementText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async hoverAndClick(locator: Locator): Promise<void> {
    await locator.hover();
    await locator.click();
  }

  async isElementVisible(locator: Locator, timeout = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
  async getElementTexts(locator: Locator): Promise<string[]> {
    return locator.allTextContents();
  }
}
