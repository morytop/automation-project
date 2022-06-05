const { test, expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');
const { ProductsPage } = require('../models/Products');
const { DetailPage } = require('../models/Detail');

test.describe('Products:', () => {
    test.beforeEach(async ({ page }) => {
        const products = new ProductsPage(page);
        await products.goToProducts();
        await expect(page).toHaveURL(/.*products/);
    })
    
    test('verify all products and detail page', async ({ page }) => {
        const products = new ProductsPage(page);
        await expect(products.itemsTiltle).toHaveText("All Products");
        await expect(products.allProducts).toBeVisible();
        await products.viewProductBtn.first().click();
        await products.checkVisibility();
    })

    test('search product', async ({ page }) => {
        const products = new ProductsPage(page);
        await products.search();
        await expect(products.singleProduct).toHaveCount(3);
    })

    test('add review on product', async ({ page }) => {
        const detail = new DetailPage(page);
        await detail.viewProductBtn.first().click();
        await detail.addReview();
        await expect(detail.successReviewMessage).toBeVisible();
    })

    test('view & cart brand products', async ({page}) => {
        const products = new ProductsPage(page);
        await expect(products.sidebarBrands).toBeVisible();
        await products.poloBrand.click();
        await page.waitForURL('brand_products/Polo');
        await expect(products.itemsTiltle).toContainText('Brand - Polo Products');
        await expect(products.allProducts).toBeVisible();
    })
})