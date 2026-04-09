/**
 * LoginPage.js - Page object for the login modal
 */
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  // Selectors
  get usernameInput() {
    return "input[id='loginusername']";
  }

  get passwordInput() {
    return "input[id='loginpassword']";
  }

  get loginButton() {
    return "button:has-text('Log in')";
  }

  get closeButton() {
    return "[id='logInModal'] button.close";
  }

  get loginModal() {
    return "[id='logInModal']";
  }

  // Methods
  async isLoginModalVisible() {
    return await this.isVisible(this.loginModal);
  }

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.click(this.loginButton);
    await this.pause();
  }

  async closeModal() {
    await this.click(this.closeButton);
    await this.pause();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async clearFields() {
    await this.fill(this.usernameInput, '');
    await this.fill(this.passwordInput, '');
  }
}

module.exports = LoginPage;
