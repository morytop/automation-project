const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../models/Login');
const { CartPage } = require('../models/Cart');

test.describe('Checkout:', () => {
    test('verify address details in checkout page', async ({page}) => {
        const login = new LoginPage(page);
        await login.goTo();
        await login.validLogin();
        const cart = new CartPage(page);
        await cart.addRandomItem();
        await cart.open();
        await expect(page).toHaveURL('/view_cart');
        await cart.proceedToCheckout();
        await expect(page).toHaveURL('/checkout');
        await expect(cart.deliveryAddress).toBeVisible();
        await expect(cart.billingAddress).toBeVisible();
        await expect(cart.addressDetails).toHaveText('Mr. tester ipsum');
    });
})