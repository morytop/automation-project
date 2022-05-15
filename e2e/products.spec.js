const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../models/Products');

test.describe('Products:', () => {
    test('search jeans', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        productsPage.goToProducts();
        await page.waitForURL('/products');

        const elements = [
            '#sale_image',
            '#search_product',
            '#submit_search',
            '.left-sidebar',
            '.features_items'
        ];
        for (const element of elements) {
            await test.step(`Visibility of: ${element}`, async () => {
                let el = page.locator(element);
                await expect(el).toBeVisible();
            })
        }
        
        productsPage.search();
        await page.waitForSelector('h2[class="title text-center"]');

        const product = page.locator('.single-products');
        const count = await product.count();
        for (let i = 0; i < count; i++) {
            await product.nth(i).toBeVisible;
        }
    })
})