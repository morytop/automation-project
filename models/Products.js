const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.ProductsPage = class ProductsPage extends BasePage {
    constructor(page) {
        super(page);

        this.productBtn = 'li >> a[href="/products"]'
        this.searchInput = '#search_product';
        this.searchBtn = '#submit_search';
        this.viewBtn = 'i[class="fa fa-plus-square"]';   
    }

    async goToProducts() {
        await this.page.goto('/');
        await this.click(this.productBtn);
    }
    
    async search() {
        await this.fill(this.searchInput, 'jeans');
        await this.click(this.searchBtn);
    }
}