// spec: BaseURL Login Flows
// Test: Add Item to Cart and Verify Price

import { test, expect } from '@playwright/test';

test.describe('BaseURL Login Flows', () => {
  test('add item to cart and verify price matches product page', async ({ page }) => {
    // 1. Login with standard_user
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Verify the Products page loads
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');

    // 3. Get the price of the first product on the inventory page
    const productPrice = await page.locator('[data-test="inventory-item-price"]').first().textContent();
    expect(productPrice).toBe('$29.99');

    // 4. Click "Add to cart" button for the first product
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 5. Navigate to the cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 6. Verify the product is in the cart
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();

    // 7. Verify the price in the cart matches the product price from the inventory page
    const cartItemPrice = await page.locator('[data-test="inventory-item-price"]').textContent();
    expect(cartItemPrice).toBe(productPrice);
  });
});
