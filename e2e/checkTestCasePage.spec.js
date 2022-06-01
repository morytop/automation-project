const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');

test.describe('Test Cases', () => {
    test('Verify Test Cases Page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visit();
        await page.click('li >> a[href="/test_cases"]');
        await expect(page).toHaveURL('/test_cases');
    })
})