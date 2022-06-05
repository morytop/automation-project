const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { LoginPage } = require('../models/Login');


test.describe('Login user:', () => {
    test.beforeEach(async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(homepage.slider).toBeVisible();
    })

    test('with correct credentials and logout', async ({page}) => {
        const login = new LoginPage(page);
        await login.signupLoginBtn.click();
        await expect(login.loginForm).toBeVisible();
		await expect(login.loginHeaderText).toBeVisible();
        await login.validLogin();
        await page.waitForResponse(response => response.status() === 200);
        expect(login.loggedAs).toBeVisible();
        await login.logoutBtn.click();
        await expect(page).toHaveURL('/login');
    })

    test('with incorrect credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.signupLoginBtn.click();
        await login.invalidLogin();
        await expect(login.error).toBeVisible();
    })
})