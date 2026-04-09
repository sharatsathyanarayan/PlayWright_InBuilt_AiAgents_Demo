// Authentication Tests
const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/HomePage');
const SignupPage = require('./pages/SignupPage');
const LoginPage = require('./pages/LoginPage');

test.describe('Authentication', () => {
  let homePage;
  let signupPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    loginPage = new LoginPage(page);
    await homePage.goto();
  });

  test('Sign Up with Valid Credentials', async ({ page }) => {
    // Click signup link
    await homePage.clickSignup();
    expect(await signupPage.isSignupModalVisible()).toBeTruthy();

    // Fill signup form
    const username = `testuser_${Date.now()}`;
    const password = 'TestPassword123!';
    await signupPage.enterUsername(username);
    await signupPage.enterPassword(password);

    // Submit form
    await signupPage.clickSignup();
    await signupPage.pause(1000);
  });

  test('Sign Up with Existing Username', async ({ page }) => {
    // Click signup
    await homePage.clickSignup();
    expect(await signupPage.isSignupModalVisible()).toBeTruthy();

    // Try to signup with existing username
    await signupPage.enterUsername('testuser123');
    await signupPage.enterPassword('password123');

    // Should show error
    await signupPage.clickSignup();
    await signupPage.pause(1000);
  });

  test('Log In with Valid Credentials', async ({ page }) => {
    // Click login link
    await homePage.clickLogin();
    expect(await loginPage.isLoginModalVisible()).toBeTruthy();

    // Enter login credentials
    await loginPage.enterUsername('testuser123');
    await loginPage.enterPassword('password123');

    // Submit
    await loginPage.clickLogin();
  });

  test('Log In with Wrong Password', async ({ page }) => {
    // Click login
    await homePage.clickLogin();
    expect(await loginPage.isLoginModalVisible()).toBeTruthy();

    // Enter wrong password
    await loginPage.enterUsername('testuser123');
    await loginPage.enterPassword('wrongpassword');

    // Should show error
    await loginPage.clickLogin();
    await loginPage.pause(1000);
  });

  test('Close Sign Up Modal', async ({ page }) => {
    // Open signup
    await homePage.clickSignup();
    expect(await signupPage.isSignupModalVisible()).toBeTruthy();

    // Close modal
    await signupPage.closeModal();
    await signupPage.pause();
  });

  test('Close Login Modal', async ({ page }) => {
    // Open login
    await homePage.clickLogin();
    expect(await loginPage.isLoginModalVisible()).toBeTruthy();

    // Close modal
    await loginPage.closeModal();
    await loginPage.pause();
  });
});
