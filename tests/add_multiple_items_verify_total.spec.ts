// spec: BaseURL Login Flows
// Test: Add Multiple Items and Verify Total Price

import { test, expect } from '@playwright/test';

test.describe('BaseURL Login Flows', () => {
  test('add multiple items to cart and verify total price', async ({ page }) => {
    // 1. Login with standard_user
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 2. Verify the Products page loads
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');

    // 3. Add 5 different products to the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    // 4. Navigate to the cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 5. Verify all 5 items are in the cart
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bike Light")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Bolt T-Shirt")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Fleece Jacket")')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Onesie")')).toBeVisible();

    // 6. Get all item prices and verify the total equals the sum
    const priceElements = page.locator('[data-test="inventory-item-price"]');
    const count = await priceElements.count();
    expect(count).toBe(5);

    let totalPrice = 0;
    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      const price = parseFloat(priceText?.replace('$', '') || '0');
      totalPrice += price;
    }

    // 7. Verify the calculated total matches expected sum
    // Backpack ($29.99) + Bike Light ($9.99) + Bolt T-Shirt ($15.99) + Fleece Jacket ($49.99) + Onesie ($7.99) = $113.95
    expect(totalPrice).toBe(113.95);

    // Verify individual prices
    const prices = await Promise.all(
      Array.from({ length: count }, (_, i) => 
        priceElements.nth(i).textContent().then(text => parseFloat(text?.replace('$', '') || '0'))
      )
    );
    
    // Items appear in cart in order: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie
    expect(prices).toEqual([29.99, 9.99, 15.99, 49.99, 7.99]);
  });
});
