const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.HomePage = class HomePage extends BasePage {
    constructor(page) {
        super(page);

        this.subscribeInput = '#susbscribe_email';
        this.subscribeBtn = '#subscribe';
        this.womenCategory = 'a[href="#Women"]';
        this.dressSubcategory = 'a[href="/category_products/1"]';
        this.menCategory = 'a[href="#Men"]';
        this.tshirtsSubcategory = 'a[href="/category_products/3"]'
    }

    async visit() {
        await this.page.goto('/');
    }

    async subscribe() {
        await this.fill(this.subscribeInput, faker.internet.email());
        await this.click(this.subscribeBtn);
    }

    async viewWomenCategory() {
        await this.click(this.womenCategory);
        await this.click(this.dressSubcategory);
    }

    async viewMenCategory() {
        await this.click(this.menCategory);
        await this.click(this.tshirtsSubcategory);
    }
}