const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { LoginPage } = require('../models/Login');
const { SignupPage } = require('../models/Signup');

test.describe('Register user:', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visit();
        await expect(page.locator('#slider-carousel')).toBeVisible();
    })

    test('with valid data', async ({ page }) => {
        await page.click('.fa.fa-lock');
        await expect(page.locator('.signup-form')).toBeVisible();
		await expect(page.locator('//*[contains(text(),"New User Signup!")]')).toBeVisible();
        const loginPage = new LoginPage(page);
        await loginPage.signupUser();
        await expect(page).toHaveURL('/signup');
        await expect(page.locator('.login-form')).toBeVisible();
        const signupPage = new SignupPage(page)
        await signupPage.signupForm();
        await expect(page).toHaveURL('/account_created');
        await expect(page.locator('[data-qa="account-created"]')).toBeVisible();
        await page.click('[data-qa="continue-button"]')
        await page.waitForResponse(response => response.status() === 200);
    })

    test('with existing email', async ({ page }) => {
        await page.click('.fa.fa-lock');
        await expect(page.locator('.signup-form')).toBeVisible();
		await expect(page.locator('//*[contains(text(),"New User Signup!")]')).toBeVisible();
        const loginPage = new LoginPage(page);
        await loginPage.signupUser(this.name, process.env.USER_EMAIL);
        await expect(page.locator('form[action="/signup"] >> p')).toBeVisible();
    })
})    