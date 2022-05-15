const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.ProductsPage = class ProductsPage extends BasePage {
    constructor(page) {
        super(page);

        this.productBtn = 'li >> a[href="/products"]'
        this.searchInput = '#search_product';
        this.searchBtn = '#submit_search';
        this.viewBtn = 'i[class="fa fa-plus-square"]';
        this.nameReviewInput = '#name';
        this.emailReviewInput = '#email';
        this.textareaReview = '#review';
        this.reviewBtn = '#button-review';
    }

    async goToProducts() {
        await this.visitHomePage();
        await this.click(this.productBtn);
    }
    
    async search() {
        await this.fill(this.searchInput, 'jeans');
        await this.click(this.searchBtn);
    }

    async addReview() {
        await this.fill(this.nameReviewInput, faker.name.findName());
        await this.fill(this.emailReviewInput, faker.internet.email());
        await this.fill(this.textareaReview, faker.lorem.lines());
        await this.click(this.reviewBtn);
    }
}