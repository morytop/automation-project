const { faker } = require('@faker-js/faker');

exports.ProductsPage = class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productBtn = page.locator('i[class="material-icons card_travel"]');
        this.searchInput = page.locator('.container >> input[id="search_product"]');
        this.searchBtn = page.locator('input#submit_search');
        this.viewBtn = page.locator('i[class="fa fa-plus-square"]');   
    }

    async goToProducts() {
        await this.page.goto('/');
        await this.productBtn.click();
    }
    
    async search() {
        await this.searchInput.fill('jeans');
        await this.searchBtn.click();
    }
}