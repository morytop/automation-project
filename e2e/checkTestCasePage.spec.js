const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');

test.describe('Test Cases', () => {
    test('Verify Test Cases Page', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await homepage.testCasesBtn.click();
        await expect(page).toHaveURL('/test_cases');
    })
})