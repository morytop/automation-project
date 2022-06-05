const { faker } = require('@faker-js/faker');
const { BasePage } = require('./Base');

exports.PaymentPage = class PaymentPage extends BasePage {
    constructor(page) {
        super(page);
        this.cardName = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiryMonth = page.locator('[data-qa="expiry-month"]');
        this.expiryYear = page.locator('[data-qa="expiry-year"]');
        this.payBtn = page.locator('[data-qa="pay-button"]');
        this.registerLogin = page.locator('p >> a[href="/login"]');
        this.successOrderMessage = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('a.check_out');
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