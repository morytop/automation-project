const { faker } = require('@faker-js/faker');

exports.PaymentPage = class PaymentPage {
    constructor(page) {
        this.page = page;
        this.cardName = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiryMonth = page.locator('[data-qa="expiry-month"]');
        this.expiryYear = page.locator('[data-qa="expiry-year"]');
        this.payBtn = page.locator('[data-qa="pay-button"]');
    }

    async pay() {
        await this.cardName.fill(faker.finance.creditCardIssuer());
        await this.cardNumber.fill(faker.finance.creditCardNumber());
        await this.cvc.fill(faker.finance.creditCardCVV());
        await this.expiryMonth.fill('01');
        await this.expiryYear.fill('2030');
        await this.payBtn.click();
    }
}