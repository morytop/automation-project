const { faker } = require('@faker-js/faker');
const { expect } = require('@playwright/test');
const { BasePage } = require('./Base');

exports.ProductsPage = class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.productBtn = page.locator('i[class="material-icons card_travel"]');
        this.searchInput = page.locator('#search_product');
        this.searchBtn = page.locator('#submit_search');
        this.allProducts = page.locator('.features_items');   
        this.productDetails = '.product-details';
        this.productInformation = '.product-information';
        this.productName = '.product-information >> h2';
        this.productImg = '.view-product';
        this.productCategory = '.product-information >> p >> nth=0';
        this.productPrice = '.product-information >> span >> span';
        this.productAvailability = '.product-information >> p >> nth=1';
        this.productCondition = '.product-information >> p >> nth=2';
        this.productBrand = '.product-information >> p >> nth=3';
        this.singleProduct= page.locator('.single-products');
        this.sidebarBrands = page.locator('.brands_products');
        this.poloBrand = page.locator('a[href="/brand_products/Polo"]');
    }

    async goToProducts() {
        await this.page.goto('/');
        await this.productBtn.click();
    }
    
    async search() {
        await this.searchInput.waitFor();
        await this.searchInput.fill('jeans');
        await this.searchBtn.click();
    }

    async checkVisibility() {
        const elements = [
            this.productDetails,
            this.productInformation,
            this.productName,
            this.productImg,
            this.productCategory,
            this.productPrice,
            this.productAvailability,
            this.productCondition,
            this.productBrand,
        ];
        for (const element of elements) {
            let el = this.page.locator(element)
            await expect(el).toBeVisible(); 
        }
    }
}