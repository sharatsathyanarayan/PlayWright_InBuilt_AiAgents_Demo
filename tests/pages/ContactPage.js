/**
 * ContactPage.js - Page object for contact modal
 */
const BasePage = require('./BasePage');

class ContactPage extends BasePage {
  // Selectors
  get contactModal() {
    return "[id='exampleModal']";
  }

  get emailInput() {
    return "input[id='recipient-email']";
  }

  get nameInput() {
    return "input[id='recipient-name']";
  }

  get messageTextarea() {
    return "textarea[id='message-text']";
  }

  get sendMessageButton() {
    return "button:has-text('Send message')";
  }

  get closeButton() {
    return "button:has-text('Close')";
  }

  // Methods
  async isContactModalVisible() {
    return await this.isVisible(this.contactModal);
  }

  async fillEmail(email) {
    await this.fill(this.emailInput, email);
  }

  async fillName(name) {
    await this.fill(this.nameInput, name);
  }

  async fillMessage(message) {
    await this.fill(this.messageTextarea, message);
  }

  async fillAllFields(email, name, message) {
    await this.fillEmail(email);
    await this.fillName(name);
    await this.fillMessage(message);
  }

  async clickSendMessage() {
    await this.click(this.sendMessageButton);
    await this.pause();
  }

  async closeModal() {
    await this.click(this.closeButton);
    await this.pause();
  }

  async sendMessage(email, name, message) {
    await this.fillAllFields(email, name, message);
    await this.clickSendMessage();
  }

  async clearAllFields() {
    await this.fill(this.emailInput, '');
    await this.fill(this.nameInput, '');
    await this.fill(this.messageTextarea, '');
  }
}

module.exports = ContactPage;
