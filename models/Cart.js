const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.removeBtn = '.cart_quantity_delete';
        this.checkoutBtn = 'btn.btn-default.check_out';
        this.subscribeInput = '#susbscribe_email';
        this.subscribeBtn = '#subscribe';
    }

    async open() {
        await this.page.click('.fa.fa-shopping-cart >> nth=0');
    }

    async addRandomItem() {
        const randomProductIndex = Math.floor(Math.random() * 8) + 1
        await this.page.locator(`a[data-product-id="${randomProductIndex}"] >> nth=0`).click();
        await this.click('//*[contains(text(),"Continue Shopping")]');
    }

    async remove() {
        await this.click(this.removeBtn);
    }

    async proceedToCheckout() {
        await this.click(this.checkoutBtn);
    }

    async subscribe() {
        await this.fill(this.subscribeInput, faker.internet.email());
        await this.click(this.subscribeBtn);
    }
}