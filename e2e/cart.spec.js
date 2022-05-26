const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { CartPage } = require('../models/Cart');

test.describe('Cart:', () => {
    test.beforeEach(async ({page}) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(page.locator('#slider-carousel')).toBeVisible();
    })

    test('add random item to cart and verify if is not empty', async ({page}) => {
        const cartPage = new CartPage(page);
        await cartPage.addRandomItem();
        await cartPage.open();
        await expect(page).toHaveURL('/view_cart');
        await expect(page.locator('#empty_cart')).not.toBeVisible();
    })

    test('verify product quantity', async ({page}) => {
        await page.locator('i[class="fa fa-plus-square"]').first().click();
		await expect(page).toHaveURL('/product_details/1');
		await page.fill('#quantity', '4');
		await page.click('.btn.btn-default.cart');

        await page.click('p >> a[href="/view_cart"]');
        await expect(page).toHaveURL('/view_cart');

        await expect(page.locator('#product-1 >> .cart_quantity >> button')).toHaveText('4');
    })

    test('remove product', async ({page}) => {
        const cartPage = new CartPage(page);
        await cartPage.addRandomItem();
        await cartPage.open();
        await expect(page).toHaveURL('/view_cart');
        await cartPage.remove();
        await expect(page.locator('#empty_cart')).toBeVisible();
    })

    test('add to cart from recommended items', async ({page}) => {
        await expect(page.locator('.recommended_items >> .title.text-center')).toBeVisible();
        const cartPage = new CartPage(page);
        await cartPage.addItem();
        await expect(page.locator('tr[id*=product]')).toBeVisible();
    })
})