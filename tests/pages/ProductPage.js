/**
 * ProductPage.js - Page object for product details page
 */
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  // Selectors
  get productTitle() {
    return 'h2';
  }

  get productPrice() {
    return 'h3';
  }

  get productDescription() {
    return '.product-info-tabs p';
  }

  get addToCartLink() {
    return "a:has-text('Add to cart')";
  }

  get productImage() {
    return '.product-image img';
  }

  // Methods
  async getProductTitle() {
    return await this.getText(this.productTitle);
  }

  async getProductPrice() {
    return await this.getText(this.productPrice);
  }

  async getProductDescription() {
    return await this.getText(this.productDescription);
  }

  async clickAddToCart() {
    await this.click(this.addToCartLink);
    await this.pause();
  }

  async isAddToCartVisible() {
    return await this.isVisible(this.addToCartLink);
  }

  async getProductInfo() {
    return {
      title: await this.getProductTitle(),
      price: await this.getProductPrice(),
      hasAddToCart: await this.isAddToCartVisible(),
    };
  }

  async visitProduct(productId) {
    await this.navigate(`/prod.html?idp_=${productId}`);
    await this.pause();
  }
}

module.exports = ProductPage;
