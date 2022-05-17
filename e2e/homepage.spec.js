const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');

test.describe('Homepage:', () => {
    test.beforeEach(async ({page}) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(page.locator('#slider-carousel')).toBeVisible();
    })

    test('verify subscription', async ({ page }) => {
        const homepage = new HomePage(page);
        await expect(page.locator('.single-widget >> h2')).toHaveText('Subscription');
        await homepage.subscribe();
        await expect(page.locator('//*[contains(text(),"You have been successfully subscribed!")]')).toBeVisible();
    })

    test('view category products', async ({ page }) => {
        const homepage = new HomePage(page);
        await expect(page.locator('.left-sidebar')).toBeVisible();

        await homepage.viewWomenCategory();
        await expect(page.locator('h2[class="title text-center"]')).toContainText('Women - Dress Products');

        await homepage.viewMenCategory();
        await expect(page.locator('h2[class="title text-center"]')).toContainText('Men - Tshirts Products');
    })
})