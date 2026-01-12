import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryTitle;
  readonly addToCartButton;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.locator('.title');
    this.addToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async assertOnPage() {
    await expect(this.inventoryTitle).toHaveText('Products');
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }
}