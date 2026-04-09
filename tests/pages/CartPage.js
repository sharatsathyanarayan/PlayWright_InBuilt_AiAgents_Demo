/**
 * CartPage.js - Page object for shopping cart page
 */
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  // Selectors
  get cartTable() {
    return 'table';
  }

  get cartRows() {
    return 'table tbody tr';
  }

  get placeOrderButton() {
    return "button:has-text('Place Order')";
  }

  get deleteButtons() {
    return 'a[onclick*="deleteItem"]';
  }

  get totalPrice() {
    return '.total-price';
  }

  get emptyCartMessage() {
    return 'text=Your cart is empty';
  }

  // Methods
  async goto() {
    await this.navigate('/cart.html');
    await this.pause();
  }

  async isCartTableVisible() {
    return await this.isVisible(this.cartTable);
  }

  async getCartItemCount() {
    const rows = await this.page.$$(this.cartRows);
    return rows.length;
  }

  async getFirstProductName() {
    return await this.getText('table tbody tr:first-child td:nth-child(2)');
  }

  async getFirstProductPrice() {
    return await this.getText('table tbody tr:first-child td:nth-child(3)');
  }

  async clickPlaceOrder() {
    await this.click(this.placeOrderButton);
    await this.pause();
  }

  async deleteFirstItem() {
    const deleteBtn = `${this.cartRows} a:first-child`;
    await this.click(deleteBtn);
    await this.pause();
  }

  async getCartTotal() {
    return await this.getText('.total-price');
  }

  async isPlaceOrderVisible() {
    return await this.isVisible(this.placeOrderButton);
  }
}

module.exports = CartPage;
