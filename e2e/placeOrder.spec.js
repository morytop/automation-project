const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { LoginPage } = require('../models/Login');
const { SignupPage } = require('../models/Signup');
const { CartPage } = require('../models/Cart');
const { CheckoutPage } = require('../models/Checkout');
const { PaymentPage } = require('../models/Payment');

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
    })

    test('place order: register while checkout', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.visit();
        await expect(page.locator('#slider-carousel')).toBeVisible();

        const cartPage = new CartPage(page);
        await cartPage.addRandomItem();
        await cartPage.open();
        await expect(page).toHaveURL('/view_cart');
        await cartPage.proceedToCheckout();

        await page.click('p >> a[href="/login"]');
        const loginPage = new LoginPage(page);
        await loginPage.signupUser();
        const signupPage = new SignupPage(page)
        await signupPage.signupForm();
        await expect(page.locator('[data-qa="account-created"]')).toBeVisible();
        await page.click('[data-qa="continue-button"]')
        await page.waitForResponse(response => response.status() === 200);
        await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

        await cartPage.open();
        await cartPage.proceedToCheckout();

        const deliveryAdress = page.locator('#address_delivery');
        const billingAdress = page.locator('#address_invoice');
        await expect(deliveryAdress).toBeVisible();
        await expect(billingAdress).toBeVisible();

        const checkout = new CheckoutPage(page);
        await checkout.addComment();
        await checkout.placeOrder();

        const payment = new PaymentPage(page);
        await payment.pay();
        await page.waitForURL('/payment_done/**');
        await expect(page.locator('[data-qa="order-placed"]')).toBeVisible()
    })

    test('place order: login before checkout', async ({page}) => {
        const homePage = new HomePage(page);
        await homePage.visit();
        await expect(page.locator('#slider-carousel')).toBeVisible();

        await page.click('i[class="fa fa-lock"]');
        const loginPage = new LoginPage(page);
        await loginPage.validLogin();
        await page.waitForResponse(response => response.status() === 200);
        await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

        const cartPage = new CartPage(page);
        await cartPage.addRandomItem();
        await cartPage.open();
        await expect(page).toHaveURL('/view_cart');
        await cartPage.proceedToCheckout();

        const deliveryAdress = page.locator('#address_delivery');
        const billingAdress = page.locator('#address_invoice');
        await expect(deliveryAdress).toBeVisible();
        await expect(billingAdress).toBeVisible();

        const checkout = new CheckoutPage(page);
        await checkout.addComment();
        await checkout.placeOrder();

        const payment = new PaymentPage(page);
        await payment.pay();
        await page.waitForURL('/payment_done/**');
        await expect(page.locator('[data-qa="order-placed"]')).toBeVisible()
    })
})