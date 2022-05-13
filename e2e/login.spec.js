const { test, expect } = require('@playwright/test');
const { BasePage } = require('../models/Base');
const { LoginPage } = require('../models/Login');


test.describe('Login user:', () => {
    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.visitHomePage();
        await expect(page.locator('#slider-carousel')).toBeVisible();
    })

    test('with correct credentials and logout', async ({page}) => {
        await page.click('i[class="fa fa-lock"]');
        await expect(page.locator('.login-form')).toBeVisible();
		await expect(page.locator('//*[contains(text(),"Login to your account")]')).toBeVisible();

        const loginPage = new LoginPage(page);
        await loginPage.validLogin();

        await page.waitForResponse(response => response.status() === 200);
        expect(page.locator('a >> i[class="fa fa-user"]')).toBeVisible();

        await page.click('li >> a[href="/logout"]');
        await expect(page).toHaveURL('/login');
    })

    test('with incorrect credentials', async ({ page }) => {
        await page.click('i[class="fa fa-lock"]');
        await expect(page.locator('.login-form')).toBeVisible();
		await expect(page.locator('//*[contains(text(),"Login to your account")]')).toBeVisible();

        const loginPage = new LoginPage(page);
        await loginPage.invalidLogin();

        await expect(page.locator('//*[contains(text(),"Your email or password is incorrect!")]'),).toBeVisible();
    })
})