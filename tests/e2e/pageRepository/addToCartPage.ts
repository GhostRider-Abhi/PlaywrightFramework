// In HomePage.ts
import { BrowserContext, Locator, Page, expect } from "@playwright/test";

export class AddToCartPage {
  // readonly page: Page;
  private readonly addToCartBtn: Locator = this.page
    .getByRole("button", {
      name: "Add to cart",
    })
    .first();
  private readonly successMessage: Locator = this.page.locator(
    ".bar-notification p"
  );

  constructor(private readonly page: Page) {}

  async clickAddToButton(): Promise<void> {
    await this.addToCartBtn.waitFor({ state: "visible" });
    await this.addToCartBtn.click();
  }
  async verifyProductAdded() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText(
      "The product has been added to your shopping cart"
    );
  }
}