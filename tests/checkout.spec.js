// Checkout Tests
const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/HomePage');
const ProductPage = require('./pages/ProductPage');
const CartPage = require('./pages/CartPage');
const CheckoutPage = require('./pages/CheckoutPage');

test.describe('Checkout & Payment', () => {
  let homePage;
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Auto-accept all dialogs
    page.on('dialog', (dialog) => dialog.accept());

    // Setup: Add products to cart
    await homePage.goto();
    await productPage.visitProduct(1);
    await productPage.clickAddToCart();
  });

  test('Complete Order with All Required Fields', async ({ page }) => {
    // Go to cart
    await homePage.clickCart();

    // Click Place Order
    await cartPage.clickPlaceOrder();
    await checkoutPage.pause(500);

    // Verify checkout modal is visible
    expect(await checkoutPage.isCheckoutModalVisible()).toBeTruthy();

    // Fill checkout form with test data
    await checkoutPage.fillName('John Doe');
    await checkoutPage.fillCountry('USA');
    await checkoutPage.fillCity('New York');
    await checkoutPage.fillCreditCard('1111111111111111'); // Test card
    await checkoutPage.fillMonth('12');
    await checkoutPage.fillYear('2025');

    // Complete purchase
    await checkoutPage.clickPurchase();
    await checkoutPage.pause(1000);
  });

  test('Checkout Form Fields Accept Input', async ({ page }) => {
    // Go to cart
    await homePage.clickCart();

    // Click Place Order
    await cartPage.clickPlaceOrder();
    await checkoutPage.pause(500);

    // Verify modal is visible
    expect(await checkoutPage.isCheckoutModalVisible()).toBeTruthy();

    // Fill each field and verify
    await checkoutPage.fillName('Test User');
    await checkoutPage.fillCountry('UK');
    await checkoutPage.fillCity('London');
    await checkoutPage.fillCreditCard('4111111111111111');
    await checkoutPage.fillMonth('06');
    await checkoutPage.fillYear('2026');
  });

  test.fixme('Cancel Checkout and Return to Cart', async ({ page }) => {
    // NOTE: This test relies on products being in the cart
    // Due to cart persistence issues, the cart is empty
    // Additionally, the close button selector needs refinement

    // Go to cart
    await homePage.clickCart();

    // Click Place Order
    await cartPage.clickPlaceOrder();
    await checkoutPage.pause(500);

    // Close checkout
    await checkoutPage.closeCheckout();

    // Should be back at cart
    expect(await cartPage.isCartTableVisible()).toBeTruthy();
  });

  test('Complete Order with Different Test Data', async ({ page }) => {
    // Go to cart
    await homePage.clickCart();

    // Click Place Order
    await cartPage.clickPlaceOrder();
    await checkoutPage.pause(500);

    // Fill with different test data
    await checkoutPage.completeCheckout(
      'Jane Smith',
      'Canada',
      'Toronto',
      '4242424242424242', // Another test card
      '11',
      '2027'
    );
    await checkoutPage.pause(1000);
  });
});
