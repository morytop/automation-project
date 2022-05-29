const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.PaymentPage = class PaymentPage extends BasePage {
    constructor(page) {
        super(page);

        this.cardName = '[data-qa="name-on-card"]';
        this.cardNumber = '[data-qa="card-number"]';
        this.cvc = '[data-qa="cvc"]';
        this.expiryMonth = '[data-qa="expiry-month"]';
        this.expiryYear = '[data-qa="expiry-year"]';
        this.payBtn = '[data-qa="pay-button"]';
    }

    async pay() {
        await this.fill(this.cardName, faker.finance.creditCardIssuer());
        await this.fill(this.cardNumber, faker.finance.creditCardNumber());
        await this.fill(this.cvc, faker.finance.creditCardCVV());
        await this.fill(this.expiryMonth, '01');
        await this.fill(this.expiryYear, '2030');
        await this.click(this.payBtn);
    }
}