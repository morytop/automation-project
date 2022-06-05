const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { CartPage } = require('../models/Cart');

test.describe('Cart:', () => {
    test.beforeEach(async ({page}) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(homepage.slider).toBeVisible();
    })

    test('add random item to cart and verify if is not empty', async ({page}) => {
        const cart = new CartPage(page);
        await cart.addRandomItem();
        await cart.open();
        await expect(page).toHaveURL('/view_cart');
        await expect(cart.emptyCart).not.toBeVisible();
    })

    test('verify product quantity', async ({page}) => {
        const cart = new CartPage(page);
        await cart.viewProductBtn.first().click();
		await expect(page).toHaveURL('/product_details/1');
		await cart.quantityInput.fill('4');
		await cart.detailAddToCartBtn.click();;
        await cart.viewCartBtn.click();
        await expect(page).toHaveURL('/view_cart');
        await expect(cart.cartQuantity).toHaveText('4');
    })

    test('remove product', async ({page}) => {
        const cart = new CartPage(page);
        await cart.addRandomItem();
        await cart.open();
        await expect(page).toHaveURL('/view_cart');
        await cart.remove();
        await expect(cart.emptyCart).toBeVisible();
    })

    test('add to cart from recommended items', async ({page}) => {
        const homepage = new HomePage(page);
        await expect(homepage.recommendedItemsTitle).toBeVisible();
        const cart = new CartPage(page);
        await cart.addItem();
        await expect(cart.itemInCart).toBeVisible();
    })
})