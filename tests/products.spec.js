// Product Browsing Tests
const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/HomePage');
const ProductPage = require('./pages/ProductPage');

test.describe('Product Browsing & Categories', () => {
  let homePage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.goto();
  });

  test('View All Products on Home Page', async ({ page }) => {
    // Verify homepage is loaded
    expect(await homePage.isHomePageLoaded()).toBeTruthy();

    // Verify product carousel navigation buttons are visible
    expect(await homePage.page.isVisible('button:has-text("Next")')).toBeTruthy();
    expect(await homePage.page.isVisible('button:has-text("Previous")')).toBeTruthy();
  });

  test('Filter Products by Phones Category', async ({ page }) => {
    // Click Phones category
    await homePage.filterByPhones();

    // Products should be filtered
    await page.waitForTimeout(500);
    const pageUrl = await homePage.getURL();
    expect(pageUrl).toContain('index.html');
  });

  test('Filter Products by Laptops Category', async ({ page }) => {
    // Click Laptops category
    await homePage.filterByLaptops();

    // Products should be filtered
    await page.waitForTimeout(500);
    const pageUrl = await homePage.getURL();
    expect(pageUrl).toContain('index.html');
  });

  test('Filter Products by Monitors Category', async ({ page }) => {
    // Click Monitors category
    await homePage.filterByMonitors();

    // Products should be filtered
    await page.waitForTimeout(500);
  });

  test('View Product Details', async ({ page }) => {
    // Click on a specific product (Samsung galaxy s6)
    await productPage.visitProduct(1);

    // Verify product information is displayed
    const productInfo = await productPage.getProductInfo();
    expect(productInfo.title).toBeTruthy();
    expect(productInfo.price).toBeTruthy();
    expect(productInfo.hasAddToCart).toBeTruthy();
  });

  test('Product Carousel Navigation', async ({ page }) => {
    // Click next button
    await homePage.clickNextCarousel();
    await homePage.page.waitForTimeout(500);

    // Click previous button
    await homePage.clickPrevCarousel();
    await homePage.page.waitForTimeout(500);
  });
});
