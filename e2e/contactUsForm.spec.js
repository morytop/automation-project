const { test, expect } = require('@playwright/test');
const { HomePage } = require('../models/Homepage');
const { ContactPage } = require('../models/ContactUs')

test.describe('Contact us:', () => {
    test('send form with upoaded file', async ({page}) => {
        const homepage = new HomePage(page);
        homepage.visit();
        const contact = new ContactPage(page);
        await contact.sendForm();
        await expect(contact.successAlert).toBeVisible();
        await contact.homeBtn.click();
        await expect(page).toHaveURL('/');
    })
})