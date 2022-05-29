const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../models/Login');
const { CartPage } = require('../models/Cart');

test.describe('Checkout & Payment:', () => {
    test('verify address details in checkout page', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin();
        const cartPage = new CartPage(page);
        await cartPage.addRandomItem();
        await cartPage.open();
        await expect(page).toHaveURL('/view_cart');
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('/checkout');
        
        const deliveryAdress = page.locator('#address_delivery');
        const billingAdress = page.locator('#address_invoice');
        await expect(deliveryAdress).toBeVisible();
        await expect(billingAdress).toBeVisible();
        await expect(page.locator('li[class="address_firstname address_lastname"] >> nth=0')).toHaveText('Mr. tester ipsum');
    });
})