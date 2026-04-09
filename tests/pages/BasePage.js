/**
 * BasePage.js - Base class for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://www.demoblaze.com';
  }

  async navigate(path = '') {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForVisible(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { visible: true, timeout });
  }

  async acceptAlert() {
    this.page.once('dialog', (dialog) => dialog.accept());
  }

  async getURL() {
    return this.page.url();
  }

  async pause(ms = 500) {
    await new Promise((r) => setTimeout(r, ms));
  }
}

module.exports = BasePage;
