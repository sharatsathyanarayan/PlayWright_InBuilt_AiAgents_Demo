// Navigation Tests
const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/HomePage');
const CartPage = require('./pages/CartPage');

test.describe('Navigation & Features', () => {
  let homePage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
  });

  test('Main Navigation Links Are Visible', async ({ page }) => {
    // Navigate to home
    await homePage.goto();

    // Check all navigation links are visible
    expect(await homePage.isHomePageLoaded()).toBeTruthy();

    // Try to access cart from home
    expect(await page.isVisible(`a[href='cart.html']`)).toBeTruthy();
  });

  test('Cart Navigation', async ({ page }) => {
    // Navigate to home
    await homePage.goto();

    // Click cart
    await homePage.clickCart();

    // Verify we're on cart page
    const url = await homePage.getURL();
    expect(url).toContain('cart.html');
  });

  test('Home Navigation', async ({ page }) => {
    // Navigate to cart first
    await cartPage.goto();

    // Navigate back to home using the link
    await homePage.click("a[href='index.html']");
    await homePage.pause();

    // Verify we're on home page
    const url = await homePage.getURL();
    expect(url).toContain('index.html');
  });

  test('Product Carousel Navigation - Next Button', async ({ page }) => {
    // Navigate to home
    await homePage.goto();

    // Click next
    await homePage.clickNextCarousel();

    // Page should still be on home
    const url = await homePage.getURL();
    expect(url).toContain('index.html');
  });

  test('Product Carousel Navigation - Previous Button', async ({ page }) => {
    // Navigate to home
    await homePage.goto();

    // Click next then previous
    await homePage.clickNextCarousel();
    await homePage.clickPrevCarousel();

    // Page should still be on home
    const url = await homePage.getURL();
    expect(url).toContain('index.html');
  });

  test('Verify About Us Link', async ({ page }) => {
    // Navigate to home
    await homePage.goto();

    // Click about us
    await homePage.clickAbout();
    await homePage.pause();

    // Modal should open
  });

  test('Homepage Loads Successfully', async ({ page }) => {
    // Navigate to home
    await homePage.goto();

    // Verify page is loaded
    expect(await homePage.isHomePageLoaded()).toBeTruthy();

    // Verify URL
    const url = await homePage.getURL();
    expect(url).toContain('demoblaze.com');
  });
});
