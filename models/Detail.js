const { faker } = require('@faker-js/faker');
const { BasePage } = require('./Base');

exports.DetailPage = class DetailPage extends BasePage {
    constructor(page) {
        super(page);
        this.nameReviewInput = page.locator('#name');
        this.emailReviewInput = page.locator('#email');
        this.textareaReview = page.locator('#review');
        this.reviewBtn = page.locator('#button-review');
        this.successReviewMessage = page.locator('.alert-success.alert >> span')
    }

    async addReview() {
        await this.nameReviewInput.fill(faker.name.findName());
        await this.emailReviewInput.fill(faker.internet.email());
        await this.textareaReview.fill(faker.lorem.lines());
        await this.reviewBtn.click();
    }
}