/**
 * HomePage.js - Page object for the home page
 */
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  // Selectors
  get signupLink() {
    return "a[href='#'][class*='nav-link']:has-text('Sign up')";
  }

  get loginLink() {
    return "a[href='#'][class*='nav-link']:has-text('Log in')";
  }

  get contactLink() {
    return "a[href='#'][class*='nav-link']:has-text('Contact')";
  }

  get cartLink() {
    return "a[href='cart.html']";
  }

  get aboutLink() {
    return "a[href='#'][class*='nav-link']:has-text('About us')";
  }

  get homeLink() {
    return "a[href='index.html']:has-text('Home')";
  }

  get phonesCategory() {
    return "a[href='#']:has-text('Phones')";
  }

  get laptopsCategory() {
    return "a[href='#']:has-text('Laptops')";
  }

  get monitorsCategory() {
    return "a[href='#']:has-text('Monitors')";
  }

  get productCarousel() {
    return "[id*='Carousel']";
  }

  get nextButton() {
    return "button:has-text('Next')";
  }

  get prevButton() {
    return "button:has-text('Previous')";
  }

  // Methods
  async goto() {
    await this.navigate('/index.html');
  }

  async clickSignup() {
    await this.click(this.signupLink);
    await this.pause();
  }

  async clickLogin() {
    await this.click(this.loginLink);
    await this.pause();
  }

  async clickContact() {
    await this.click(this.contactLink);
    await this.pause();
  }

  async clickCart() {
    await this.click(this.cartLink);
    await this.waitForVisible('table');
  }

  async clickAbout() {
    await this.click(this.aboutLink);
    await this.pause();
  }

  async filterByPhones() {
    await this.click(this.phonesCategory);
    await this.pause();
  }

  async filterByLaptops() {
    await this.click(this.laptopsCategory);
    await this.pause();
  }

  async filterByMonitors() {
    await this.click(this.monitorsCategory);
    await this.pause();
  }

  async clickProductByName(productName) {
    const productLink = `a:has-text('${productName}')`;
    await this.click(productLink);
    await this.pause();
  }

  async clickNextCarousel() {
    await this.click(this.nextButton);
    await this.pause();
  }

  async clickPrevCarousel() {
    await this.click(this.prevButton);
    await this.pause();
  }

  async isHomePageLoaded() {
    return await this.isVisible(this.signupLink);
  }
}

module.exports = HomePage;
