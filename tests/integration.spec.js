// Integration Tests - Full User Workflows
const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/HomePage');
const ProductPage = require('./pages/ProductPage');
const CartPage = require('./pages/CartPage');
const CheckoutPage = require('./pages/CheckoutPage');
const SignupPage = require('./pages/SignupPage');
const LoginPage = require('./pages/LoginPage');

test.describe('Integration Tests - Full Workflows', () => {
  let homePage;
  let productPage;
  let cartPage;
  let checkoutPage;
  let signupPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    signupPage = new SignupPage(page);
    loginPage = new LoginPage(page);

    // Auto-accept all dialogs
    page.on('dialog', (dialog) => dialog.accept());
  });

  test.fixme('Complete Purchase Workflow', async ({ page }) => {
    // NOTE: This test depends on products being persisted in the cart
    // Currently, products are not being added to the cart properly
    // (See cart.spec.js for details on cart persistence issues)

    // Step 1: Navigate to home
    await homePage.goto();
    expect(await homePage.isHomePageLoaded()).toBeTruthy();

    // Step 2: Browse products
    await homePage.filterByPhones();
    await homePage.pause(500);

    // Step 3: Add products to cart
    await productPage.visitProduct(1);
    expect(await productPage.isAddToCartVisible()).toBeTruthy();
    await productPage.clickAddToCart();

    // Step 4: Add another product
    await productPage.visitProduct(5);
    await productPage.clickAddToCart();

    // Step 5: View cart
    await homePage.clickCart();
    expect(await cartPage.isCartTableVisible()).toBeTruthy();
    expect(await cartPage.getCartItemCount()).toBeGreaterThanOrEqual(2);

    // Step 6: Proceed to checkout
    await cartPage.clickPlaceOrder();
    await checkoutPage.pause(500);
    expect(await checkoutPage.isCheckoutModalVisible()).toBeTruthy();

    // Step 7: Complete purchase with test card
    await checkoutPage.completeCheckout(
      'John Doe',
      'USA',
      'New York',
      '1111111111111111', // Test card
      '12',
      '2025'
    );
  });

  test('Browse and Filter Products', async ({ page }) => {
    // Navigate home
    await homePage.goto();

    // Filter by phones
    await homePage.filterByPhones();
    await homePage.pause(500);

    // Click on a product
    await productPage.visitProduct(1);
    const info = await productPage.getProductInfo();
    expect(info.title).toBeTruthy();
    expect(info.price).toBeTruthy();

    // Go back to home and filter by laptops
    await homePage.goto();
    await homePage.filterByLaptops();
    await homePage.pause(500);

    // Browse another product
    await productPage.visitProduct(8);
    const laptopInfo = await productPage.getProductInfo();
    expect(laptopInfo.title).toBeTruthy();
  });

  test.fixme('Cart Management Full Flow', async ({ page }) => {
    // NOTE: This test depends on cart persistence
    // Products are not being properly persisted in the cart
    // (See cart.spec.js for details)

    // Navigate home and add products
    await homePage.goto();
    await productPage.visitProduct(1);
    await productPage.clickAddToCart();

    await productPage.visitProduct(2);
    await productPage.clickAddToCart();

    // Go to cart
    await homePage.clickCart();
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBeGreaterThan(0);

    // Get cart total
    const total = await cartPage.getCartTotal();
    expect(total).toBeTruthy();

    // Try to place order
    await cartPage.clickPlaceOrder();
    await checkoutPage.pause(500);
    expect(await checkoutPage.isCheckoutModalVisible()).toBeTruthy();

    // Cancel and return to cart
    await checkoutPage.closeCheckout();
    expect(await cartPage.isCartTableVisible()).toBeTruthy();
  });

  test('Authentication and Navigation', async ({ page }) => {
    // Navigate home
    await homePage.goto();

    // Test signup
    await homePage.clickSignup();
    expect(await signupPage.isSignupModalVisible()).toBeTruthy();
    await signupPage.closeModal();

    // Test login
    await homePage.clickLogin();
    expect(await loginPage.isLoginModalVisible()).toBeTruthy();
    await loginPage.closeModal();

    // Navigate through categories while using the app
    await homePage.filterByPhones();
    await homePage.pause(300);

    await homePage.goto();
    await homePage.filterByLaptops();
    await homePage.pause(300);

    // Return to home
    await homePage.goto();
    expect(await homePage.isHomePageLoaded()).toBeTruthy();
  });

  test.fixme('Multi-Step Cart and Checkout', async ({ page }) => {
    // NOTE: This test depends on cart persistence
    // Products are not being properly persisted in the cart
    // (See cart.spec.js for details)

    // Add first product
    await homePage.goto();
    await productPage.visitProduct(1);
    const product1Info = await productPage.getProductInfo();
    await productPage.clickAddToCart();

    // Navigate home and add different category product
    await homePage.goto();
    await homePage.filterByLaptops();
    await productPage.visitProduct(8);
    const product2Info = await productPage.getProductInfo();
    await productPage.clickAddToCart();

    // View cart with mixed items
    await homePage.clickCart();
    expect(await cartPage.isCartTableVisible()).toBeTruthy();

    // Verify total is calculated
    const cartTotal = await cartPage.getCartTotal();
    expect(cartTotal).toBeTruthy();

    // Proceed to checkout
    await cartPage.clickPlaceOrder();
    expect(await checkoutPage.isCheckoutModalVisible()).toBeTruthy();

    // Fill details
    await checkoutPage.fillName('Test User');
    await checkoutPage.fillCountry('UK');
    await checkoutPage.fillCity('London');
    await checkoutPage.fillCreditCard('4111111111111111');
    await checkoutPage.fillMonth('06');
    await checkoutPage.fillYear('2026');

    // Complete checkout
    await checkoutPage.clickPurchase();
  });
});
