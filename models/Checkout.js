const { faker } = require('@faker-js/faker');

exports.CheckoutPage = class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.form = page.locator('textarea[class="form-control"]');
        this.orderBtn = page.locator('a[class="btn btn-default check_out"]');
    }

    async addComment() {
        await this.form.fill(faker.lorem.paragraph());
    }

    async placeOrder() {
        await this.orderBtn.click();
    }
}