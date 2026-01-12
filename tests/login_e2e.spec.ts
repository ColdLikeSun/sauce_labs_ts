import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('BaseURL Login Flows', () => {
  test.beforeEach(async ({ page }) => {
    // no-op; pages instantiated per test
  });

  test('happy path — standard_user logs in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventory.assertOnPage();
  });

  test('invalid credentials show error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.assertLoginError();
  });

  test('locked_out_user shows locked error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertLoginError();
  });

  test('empty fields validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.assertLoginError();
  });

  test('whitespace in inputs — trimmed or consistent error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(' standard_user ', ' secret_sauce ');

    const title = page.locator('.title');
    if (await title.count() > 0) {
      await expect(title).toHaveText('Products');
    } else {
      await loginPage.assertLoginError();
    }
  });

  test('add product to cart after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventory.assertOnPage();

    await inventory.addProductToCart();
    const removeBtn = page.locator('button[data-test="remove-sauce-labs-backpack"]');
    await expect(removeBtn).toBeVisible();
  });

  test('keyboard accessibility — login via keyboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.usernameInput.focus();
    await page.keyboard.type('standard_user');
    await page.keyboard.press('Tab');
    await page.keyboard.type('secret_sauce');
    await page.keyboard.press('Enter');

    await inventory.assertOnPage();
  });

  test('performance_glitch_user (longer timeout)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    await page.locator('.title').waitFor({ timeout: 20000 });
    await inventory.assertOnPage();
  });

});
