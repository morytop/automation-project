const { faker } = require('@faker-js/faker');

exports.DetailPage = class DetailPage {
    constructor(page) {
        this.page = page;
        this.nameReviewInput = page.locator('#name');
        this.emailReviewInput = page.locator('#email');
        this.textareaReview = page.locator('#review');
        this.reviewBtn = page.locator('#button-review');
    }

    async addReview() {
        await this.nameReviewInput.fill(faker.name.findName());
        await this.emailReviewInput.fill(faker.internet.email());
        await this.textareaReview.fill(faker.lorem.lines());
        await this.reviewBtn.click();
    }
}