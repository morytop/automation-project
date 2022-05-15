const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../models/Products');

test.describe('Products:', () => {
    test.beforeEach(async ({ page }) => {
        const productsPage = new ProductsPage(page);
        productsPage.goToProducts();
        await page.waitForURL('/products');
    })
    
    test('verify all products and detail page', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await page.locator('i[class="fa fa-plus-square"]').first().click();
        
        const elements = [
            '.product-information',
            '//*[contains(text(),"Category:")]',
            'div[class="product-information"] span span',
            '//*[contains(text(),"Availability:")]',
            '//*[contains(text(),"Condition:")]',
            '//*[contains(text(),"Brand:")]'
        ];
        for (const element of elements) {
            await test.step(`Visibility of: ${element}`, async () => {
                let el = page.locator(element);
                await expect(el).toBeVisible();
            })
        }
    })

    test('search jeans', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        productsPage.search();
        await page.waitForSelector('h2[class="title text-center"]');

        const product = page.locator('.single-products');
        const count = await product.count();
        for (let i = 0; i < count; i++) {
            await product.nth(i).toBeVisible;
        }
    })
})