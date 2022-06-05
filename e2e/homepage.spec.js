const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');

test.describe('Homepage:', () => {
    test.beforeEach(async ({page}) => {
        const homepage = new HomePage(page);
        await homepage.visit();
        await expect(homepage.slider).toBeVisible();
    })

    test('verify subscription', async ({ page }) => {
        const homepage = new HomePage(page);
        await expect(homepage.subscriptionTitle).toHaveText('Subscription');
        await homepage.subscribe();
        await expect(homepage.successSubcribeAlert).toBeVisible();
    })

    test('view category products', async ({ page }) => {
        const homepage = new HomePage(page);
        await expect(homepage.leftSidebar).toBeVisible();
        await homepage.viewWomenCategory();
        await expect(homepage.itemsTiltle).toContainText('Women - Dress Products');
        await homepage.viewMenCategory();
        await expect(homepage.itemsTiltle).toContainText('Men - Tshirts Products');
    })

    test('verify scroll up using arrow', async ({page}) => {
        const homepage = new HomePage(page);
        await homepage.clickUnvisibleScroll();
        await expect(homepage.slider).toBeVisible();
    })
})