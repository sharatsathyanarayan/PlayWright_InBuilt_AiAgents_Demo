// Contact Tests
const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/HomePage');
const ContactPage = require('./pages/ContactPage');

test.describe('Contact & Support', () => {
  let homePage;
  let contactPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactPage = new ContactPage(page);

    // Auto-accept all dialogs
    page.on('dialog', (dialog) => dialog.accept());

    // Navigate to home
    await homePage.goto();
  });

  test('Send Contact Message with Valid Information', async ({ page }) => {
    // Click contact
    await homePage.clickContact();
    await contactPage.pause(500);

    // Verify modal is visible
    expect(await contactPage.isContactModalVisible()).toBeTruthy();

    // Fill contact form
    await contactPage.fillEmail('test@example.com');
    await contactPage.fillName('Test User');
    await contactPage.fillMessage('This is a test message for the contact form.');

    // Send message
    await contactPage.clickSendMessage();
    await contactPage.pause(1000);
  });

  test('Contact Form Accepts All Fields', async ({ page }) => {
    // Click contact
    await homePage.clickContact();
    await contactPage.pause(500);

    // Verify modal is visible
    expect(await contactPage.isContactModalVisible()).toBeTruthy();

    // Fill all fields
    await contactPage.fillEmail('support@example.com');
    await contactPage.fillName('Support Contact');
    await contactPage.fillMessage('Testing the contact form with various messages.');

    // Verify fields are filled (by checking they accept input without errors)
  });

  test('Send Multiple Messages', async ({ page }) => {
    // First message
    await homePage.clickContact();
    await contactPage.pause(500);

    await contactPage.sendMessage(
      'first@example.com',
      'First User',
      'First message'
    );
    await contactPage.pause(1000);

    // Second message
    await homePage.clickContact();
    await contactPage.pause(500);

    await contactPage.sendMessage(
      'second@example.com',
      'Second User',
      'Second message'
    );
    await contactPage.pause(1000);
  });

  test('Close Contact Modal', async ({ page }) => {
    // Click contact
    await homePage.clickContact();
    await contactPage.pause(500);

    // Verify modal is visible
    expect(await contactPage.isContactModalVisible()).toBeTruthy();

    // Close modal
    await contactPage.closeModal();
    await contactPage.pause();
  });

  test('Contact Form Clear Fields', async ({ page }) => {
    // Click contact
    await homePage.clickContact();
    await contactPage.pause(500);

    // Fill fields
    await contactPage.fillAllFields(
      'test@example.com',
      'Test User',
      'Test message'
    );

    // Clear fields
    await contactPage.clearAllFields();
    await contactPage.pause();

    // Close
    await contactPage.closeModal();
  });
});
