/**
 * CheckoutPage.js - Page object for checkout modal
 */
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  // Selectors
  get checkoutModal() {
    return "[id='orderModal']";
  }

  get nameInput() {
    return "input[id='name']";
  }

  get countryInput() {
    return "input[id='country']";
  }

  get cityInput() {
    return "input[id='city']";
  }

  get creditCardInput() {
    return "input[id='card']";
  }

  get monthInput() {
    return "input[id='month']";
  }

  get yearInput() {
    return "input[id='year']";
  }

  get purchaseButton() {
    return "button:has-text('Purchase')";
  }

  get closeButton() {
    return "[id='orderModal'] button:has-text('Close')";
  }

  // Methods
  async isCheckoutModalVisible() {
    return await this.isVisible(this.checkoutModal);
  }

  async fillName(name) {
    await this.fill(this.nameInput, name);
  }

  async fillCountry(country) {
    await this.fill(this.countryInput, country);
  }

  async fillCity(city) {
    await this.fill(this.cityInput, city);
  }

  async fillCreditCard(cardNumber) {
    await this.fill(this.creditCardInput, cardNumber);
  }

  async fillMonth(month) {
    await this.fill(this.monthInput, month);
  }

  async fillYear(year) {
    await this.fill(this.yearInput, year);
  }

  async fillAllFields(name, country, city, cardNumber, month, year) {
    await this.fillName(name);
    await this.fillCountry(country);
    await this.fillCity(city);
    await this.fillCreditCard(cardNumber);
    await this.fillMonth(month);
    await this.fillYear(year);
  }

  async clickPurchase() {
    await this.click(this.purchaseButton);
    await this.pause();
  }

  async closeCheckout() {
    await this.click(this.closeButton);
    await this.pause();
  }

  async completeCheckout(name, country, city, cardNumber, month, year) {
    await this.fillAllFields(name, country, city, cardNumber, month, year);
    await this.clickPurchase();
  }
}

module.exports = CheckoutPage;
