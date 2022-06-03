const { test, expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');
const { ProductsPage } = require('../models/Products');
const { DetailPage } = require('../models/Detail');

test.describe('Products:', () => {
    test.beforeEach(async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.goToProducts();
        await expect(page).toHaveURL(/.*products/);
    })
    
    test('verify all products and detail page', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await expect(page.locator('.title.text-center')).toHaveText("All Products");
        await expect(page.locator('.features_items')).toBeVisible();
        await page.locator('i[class="fa fa-plus-square"]').first().click();
        
        const elements = [
            '.product-details',
            '.product-information',
            '.product-information >> h2:has-text("Blue Top")',
            '//*[contains(text(),"Category:")]',
            '.product-information >> span >> span',
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

    test('search product', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.search();
        await page.waitForSelector('.title.text-center');
        const product = page.locator('.single-products');
        const count = await product.count();
        for (let i = 0; i < count; i++) {
            await product.nth(i).toBeVisible;
        }
    })

    test('add review on product', async ({ page }) => {
        const detailPage = new DetailPage(page);
        await page.waitForSelector('.features_items');
        await page.locator('.fa.fa-plus-square').first().click();
        await detailPage.addReview();
        await expect(page.locator('.alert-success.alert >> span')).toBeVisible();
    })

    test('view & cart brand products', async ({page}) => {
        await expect(page.locator('.brands_products')).toBeVisible();
        await page.click('a[href="/brand_products/Polo"]');
        await page.waitForURL('brand_products/Polo');
        await expect(page.locator('.title.text-center')).toContainText('Brand - Polo Products');
        await expect(page.locator('.features_items')).toBeVisible();
    })
})