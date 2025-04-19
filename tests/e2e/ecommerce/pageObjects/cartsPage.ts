import { Locator, Page } from '@playwright/test';
import { ElementUtils } from '../utility/elementUtil';

export class CartsPage {
  page: Page;
  readonly cartItems: Locator;
  elementUtil: ElementUtils;
  readonly cartItemsNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.items');
    this.cartItemsNames = this.cartItems.locator('h3');
    this.elementUtil = new ElementUtils(page);
  }

  async getSelectedProductCount(): Promise<number> {
    return this.elementUtil.getElementCount(this.cartItems);
  }
  async getAllCartItems(): Promise<string[]> {
    return this.elementUtil.getElementTexts(this.cartItemsNames);
  }
}
