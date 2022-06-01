const { faker } = require('@faker-js/faker');

exports.SignupPage = class SignupPage {
    constructor(page) {
        this.page = page;
        this.radioBtn = page.locator('#id_gender1');
        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.password = page.locator('[data-qa="password"]');
        this.selectDay = page.locator('[data-qa="days"]');
        this.selectMonth = page.locator('[data-qa="months"]');
        this.selectYear = page.locator('[data-qa="years"]');
        this.checkboxNewsletter = page.locator('#newsletter');
        this.checkboxOffers = page.locator('#optin');
        this.firstName = page.locator('[data-qa="first_name"]');
        this.lastName = page.locator('[data-qa="last_name"]');
        this.company = page.locator('[data-qa="company"]');
        this.address = page.locator('[data-qa="address"]');
        this.address2 = page.locator('[data-qa="address2"]');
        this.country = page.locator('[data-qa="country"]');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zipcode = page.locator('[data-qa="zipcode"]');
        this.mobileNumber = page.locator('[data-qa="mobile_number"]');
        this.createBtn = page.locator('[data-qa="create-account"]');
    }

    async signupForm() {
        await this.radioBtn.click();
        await this.password.fill(faker.internet.password());
        await this.selectDay.selectOption('2');
        await this.selectMonth.selectOption('4');
        await this.selectYear.selectOption('1990');
        await this.checkboxNewsletter.click();
        await this.checkboxOffers.click();
        await this.firstName.fill(faker.name.firstName());
        await this.lastName.fill(faker.name.lastName());
        await this.company.fill(faker.company.companyName());
        await this.address.fill(faker.address.streetAddress());
        await this.address2.fill(faker.address.streetName());
        await this.country.selectOption('United States');
        await this.state.fill(faker.address.state());
        await this.city.fill(faker.address.city());
        await this.zipcode.fill(faker.address.zipCode());
        await this.mobileNumber.fill(faker.phone.phoneNumber());
        await this.createBtn.click();
    }
}