const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.cart = '.fa.fa-shopping-cart';
        this.removeBtn = '.cart_quantity_delete';
        this.checkoutBtn = 'btn.btn-default.check_out';
        this.subscribeInput = '#susbscribe_email';
        this.subscribeBtn = '#subscribe';
    }

    async open() {
        await this.click(this.cart);
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