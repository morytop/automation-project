const { BasePage } = require('../models/Base');

exports.ProductsPage = class ProductsPage extends BasePage {
    constructor(page) {
        super(page);

        this.productBtn = 'li >> a[href="/products"]'
        this.searchInput = '#search_product';
        this.searchBtn = '#submit_search';
    }

    async goToProducts() {
        await this.visitHomePage();
        await this.click(this.productBtn);
    }
    
    async search() {
        await this.fill(this.searchInput, 'jeans');
        await this.click(this.searchBtn);
    }
}