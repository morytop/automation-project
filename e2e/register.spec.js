const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { LoginPage } = require('../models/Login');
const { SignupPage } = require('../models/Signup');

test.describe('Register user:', () => {
    test.beforeEach(async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(homepage.slider).toBeVisible();
    })

    test('with valid data', async ({ page }) => {
        const login = new LoginPage(page);
        await login.signupLoginBtn.click();
        const signup = new SignupPage(page)
        await expect(signup.signupForm).toBeVisible();
	await expect(signup.sigupHeaderText).toBeVisible();   
        await login.signupUser();
        await expect(page).toHaveURL('/signup');
        await expect(login.loginForm).toBeVisible();
        await signup.createAccount();
        await expect(page).toHaveURL('/account_created');
        await expect(signup.accountCreatedInfo).toBeVisible();
        await signup.continueBtn.click()
        await page.waitForResponse(response => response.status() === 200);
    })

    test('with existing email', async ({ page }) => {
        const login = new LoginPage(page);
        const signup = new SignupPage(page);
        await login.signupLoginBtn.click();
        await expect(signup.signupForm).toBeVisible();
	await expect(signup.sigupHeaderText).toBeVisible();
        await login.signupUser(this.name, process.env.USER_EMAIL);
        await expect(signup.errorEmailExist).toBeVisible();
    })
})    
