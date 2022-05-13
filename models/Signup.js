const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.SignupPage = class SignupPage extends BasePage {
    constructor(page) {
        super(page);

        this.radioBtn = '#id_gender1';
        this.name = '[data-qa="name"]';
        this.email = '[data-qa="email"]';
        this.password = '[data-qa="password"]';
        this.selectDay ='[data-qa="days"]';
        this.selectMonth = '[data-qa="months"]';
        this.selectYear = '[data-qa="years"]';
        this.checkboxNewsletter = '#newsletter';
        this.checkboxOffers = '#optin';
        this.firstName = '[data-qa="first_name"]';
        this.lastName = '[data-qa="last_name"]';
        this.company = '[data-qa="company"]';
        this.address = '[data-qa="address"]';
        this.address2 = '[data-qa="address2"]';
        this.country = '[data-qa="country"]';
        this.state = '[data-qa="state"]';
        this.city = '[data-qa="city"]';
        this.zipcode = '[data-qa="zipcode"]';
        this.mobileNumber = '[data-qa="mobile_number"]';
        this.createBtn = '[data-qa="create-account"]';
    }

    async signupForm() {
        await this.click(this.radioBtn);
        await this.fill(this.password, faker.internet.password());
        await this.select(this.selectDay, '2');
        await this.select(this.selectMonth, '4');
        await this.select(this.selectYear, '1990');
        await this.click(this.checkboxNewsletter);
        await this.click(this.checkboxOffers);
        await this.fill(this.firstName, faker.name.firstName());
        await this.fill(this.lastName, faker.name.lastName());
        await this.fill(this.company, faker.company.companyName());
        await this.fill(this.address, faker.address.streetAddress());
        await this.fill(this.address2, faker.address.streetName());
        await this.select(this.country, 'United States');
        await this.fill(this.state, faker.address.state());
        await this.fill(this.city, faker.address.city());
        await this.fill(this.zipcode, faker.address.zipCode());
        await this.fill(this.mobileNumber, faker.phone.phoneNumber());
        await this.click(this.createBtn);
    }
}