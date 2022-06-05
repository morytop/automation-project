const { faker } = require('@faker-js/faker');
const { BasePage } = require('./Base');

exports.HomePage = class HomePage extends BasePage{
    constructor(page) {
        super(page);
        this.subscribeInput = page.locator('#susbscribe_email');
        this.subscribeBtn = page.locator('#subscribe');
        this.womenCategory = page.locator('a[href="#Women"]');
        this.dressSubcategory = page.locator('a[href="/category_products/1"]');
        this.menCategory = page.locator('a[href="#Men"]');
        this.tshirtsSubcategory = page.locator('a[href="/category_products/3"]');
        this.slider = page.locator('#slider-carousel');
        this.recommendedItemsTitle = page.locator('.recommended_items >> .title.text-center');
        this.subscriptionTitle = page.locator('.single-widget >> h2');
        this.successSubcribeAlert = page.locator('.alert-success.alert');
        this.leftSidebar = page.locator('.left-sidebar');
        this.scrollBtn = '#scrollUp';
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

    async clickUnvisibleScroll() {
        const unvisibleButton = await this.page.$(this.scrollBtn); 
        unvisibleButton.evaluate((node) => {node.click()})
    }
}