/**
 * SignupPage.js - Page object for the signup modal
 */
const BasePage = require('./BasePage');

class SignupPage extends BasePage {
  // Selectors
  get usernameInput() {
    return "input[id='sign-username']";
  }

  get passwordInput() {
    return "input[id='sign-password']";
  }

  get signupButton() {
    return "button:has-text('Sign up')";
  }

  get closeButton() {
    return "[id='signInModal'] button.close";
  }

  get signupModal() {
    return "[id='signInModal']";
  }

  // Methods
  async isSignupModalVisible() {
    return await this.isVisible(this.signupModal);
  }

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickSignup() {
    await this.click(this.signupButton);
    await this.pause();
  }

  async closeModal() {
    await this.click(this.closeButton);
    await this.pause();
  }

  async signup(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignup();
  }

  async clearFields() {
    await this.fill(this.usernameInput, '');
    await this.fill(this.passwordInput, '');
  }
}

module.exports = SignupPage;
