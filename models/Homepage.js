const { faker } = require('@faker-js/faker');

exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;
        this.subscribeInput = page.locator('#susbscribe_email');
        this.subscribeBtn = page.locator('#subscribe');
        this.womenCategory = page.locator('a[href="#Women"]');
        this.dressSubcategory = page.locator('a[href="/category_products/1"]');
        this.menCategory = page.locator('a[href="#Men"]');
        this.tshirtsSubcategory = page.locator('a[href="/category_products/3"]');
    }

    async visit() {
        await this.page.goto('/');
    }

    async subscribe() {
        await this.subscribeInput.fill(faker.internet.email());
        await this.subscribeBtn.click();
    }

    async viewWomenCategory() {
        await this.womenCategory.click();
        await this.dressSubcategory.click();
    }

    async viewMenCategory() {
        await this.menCategory.click();
        await this.tshirtsSubcategory.click();
    }
}