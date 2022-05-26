const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.CheckoutPage = class CheckoutPage extends BasePage {
    constructor(page) {
        super(page)

        this.form = 'textarea[class="form-control"]';
        this.orderBtn = 'a[class="btn btn-default check_out"]';
    }

    async addComment() {
        this.fill(this.form, faker.lorem.paragraph());
    }

    async placeOrder() {
        this.click(this.orderBtn);
    }
}