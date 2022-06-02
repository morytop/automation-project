const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { faker } = require('@faker-js/faker');

test.describe('Contact us:', () => {
    test('send form with upoaded file', async ({page}) => {
        const filePath = '../automation-project/data/test.txt';
        const homepage = new HomePage(page);
        homepage.visit();
        await page.click('//*[contains(text()," Contact us")]');
		await page.type('[data-qa="name"]', faker.name.findName());
		await page.type('[data-qa="email"]', faker.internet.email());
		await page.type('[data-qa="subject"]', faker.lorem.sentence());
		await page.type('[data-qa="message"]', faker.lorem.paragraph());
        await page.setInputFiles('input[name="upload_file"]', filePath);
        page.on('dialog', (dialog) => dialog.accept());
        await page.click('[data-qa="submit-button"]');
        await expect(page.locator('.status.alert.alert-success')).toBeVisible();
        await page.click('.btn.btn-success');
        await expect(page).toHaveURL('/');
    })
})