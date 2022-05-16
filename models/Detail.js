const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.DetailPage = class DetailPage extends BasePage {
    constructor(page) {
        super(page);

        this.nameReviewInput = '#name';
        this.emailReviewInput = '#email';
        this.textareaReview = '#review';
        this.reviewBtn = '#button-review';
    }

    async addReview() {
        await this.fill(this.nameReviewInput, faker.name.findName());
        await this.fill(this.emailReviewInput, faker.internet.email());
        await this.fill(this.textareaReview, faker.lorem.lines());
        await this.click(this.reviewBtn);
    }
}