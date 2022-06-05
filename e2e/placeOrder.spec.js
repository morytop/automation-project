const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { LoginPage } = require('../models/Login');
const { SignupPage } = require('../models/Signup');
const { CartPage } = require('../models/Cart');
const { CheckoutPage } = require('../models/Checkout');
const { PaymentPage } = require('../models/Payment');

test.describe('Payment:', () => {
    test.beforeEach(async ({page}) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(homepage.slider).toBeVisible();       
    })

    test('place order: register while checkout', async ({page}) => {
        const cart = new CartPage(page);
        const payment = new PaymentPage(page);
        await cart.addRandomItem();
        await cart.open();
        await expect(page).toHaveURL('/view_cart');
        await cart.proceedToCheckout();
        await payment.registerLogin.click();
        const login = new LoginPage(page);
        await login.signupUser();
        const signup = new SignupPage(page)
        await signup.createAccount();
        await expect(signup.accountCreatedInfo).toBeVisible();
        await signup.continueBtn.click();
        await page.waitForResponse(response => response.status() === 200);
        await expect(login.loggedAs).toBeVisible();
        await cart.open();
        await cart.proceedToCheckout();
        await expect(cart.deliveryAddress).toBeVisible();
        await expect(cart.billingAddress).toBeVisible();
        const checkout = new CheckoutPage(page);
        await checkout.addComment();
        await checkout.placeOrder();
        await payment.pay();
        await expect(page).toHaveURL(/.payment_done/);
        await expect(payment.successOrderMessage).toBeVisible()
    })

    test('place order: login before checkout and download invoice', async ({page}) => {
        const login = new LoginPage(page);
        await login.signupLoginBtn.click();   
        await login.validLogin();
        await page.waitForResponse(response => response.status() === 200);
        await expect(login.loggedAs).toBeVisible();
        const cart = new CartPage(page);
        await cart.addRandomItem();
        await cart.open();
        await expect(page).toHaveURL('/view_cart');
        await cart.proceedToCheckout();
        await expect(cart.deliveryAddress).toBeVisible();
        await expect(cart.billingAddress).toBeVisible();
        const checkout = new CheckoutPage(page);
        await checkout.addComment();
        await checkout.placeOrder();
        const payment = new PaymentPage(page);
        await payment.pay();
        await expect(page).toHaveURL(/.payment_done/);
        await expect(payment.successOrderMessage).toBeVisible()
        const [ download ] = await Promise.all([
            page.waitForEvent('download'),
            payment.downloadInvoiceBtn.click(),
        ]);
        const path = await download.path();
        console.log(path);
    })
})