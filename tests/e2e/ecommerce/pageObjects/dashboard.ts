import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  page: Page;
  readonly AddToCartButton: Locator;
  readonly toolTip: Locator;
  readonly cartButton: Locator;
  readonly products: Locator;
  readonly cartButtonLabel: Locator;
  constructor(page: Page) {
    this.page = page;
    this.AddToCartButton = page.getByRole('button', { name: ' Add to Cart' });
    this.toolTip = page.locator('#toast-container .toast-message');
    this.cartButtonLabel = page.locator("[routerlink='/dashboard/cart'] label");
    this.products = page.locator('.card-body');
    this.cartButton = page.locator("[routerlink='/dashboard/cart']");
  }

  async selectRandomProduct(): Promise<void> {
    await this.AddToCartButton.first().waitFor({ state: 'visible' });
    const numOfProducts = await this.AddToCartButton.count();
    const randomNum = Math.floor(Math.random() * numOfProducts);
    await this.AddToCartButton.nth(randomNum).click();
  }
  async getToolTipText(): Promise<string | null> {
    return await this.toolTip.textContent();
  }
  async verifyProductAddedToCart(): Promise<void> {
    await this.cartButtonLabel.waitFor({ state: 'visible' });
    const numOfItem = await this.cartButtonLabel.textContent();
    expect(parseInt(numOfItem || '0')).toBeGreaterThanOrEqual(1); // Check if the cart has at least one item
  }

  async clickOnCartButton(): Promise<void> {
    await this.cartButton.click();
  }

  async selectProductByName(productName: string) {
    await this.page.waitForSelector('.card-body b', { state: 'visible' });
    const count = await this.products.count();
    await expect(count, 'No product found in the page').toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const productText = await this.products.nth(i).locator('b').textContent();
      if (productText && productText.includes(productName)) {
        await this.products
          .nth(i)
          .getByRole('button', { name: ' Add to Cart' })
          .click();
        break;
      }
    }
  }
}
