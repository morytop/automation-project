const { test, expect } = require('@playwright/test');
const { BasePage } = require('../models/Base');

test.describe('Test Cases', () => {
    test('Verify Test Cases Page', async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.visitHomePage();
        await basePage.click('li >> a[href="/test_cases"]');
        await expect(page).toHaveURL('/test_cases');
    })
})