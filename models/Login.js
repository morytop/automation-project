const { BasePage } = require('../models/Base');
const { faker } = require('@faker-js/faker');

exports.LoginPage = class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.loginEmail = '[data-qa="login-email"]';
        this.loginPassword = '[data-qa="login-password"]';
        this.loginBtn = '[data-qa="login-button"]';
        this.signupName = '[data-qa="signup-name"]';
        this.signupEmail = '[data-qa="signup-email"]';
        this.signupBtn = '[data-qa="signup-button"]';    
    }

    async goTo() {
        await this.page.goto('/');
        await this.page.click('i[class="fa fa-lock"]');
    }

    async validLogin() {
        await this.fill(this.loginEmail, process.env.USER_EMAIL);
        await this.fill(this.loginPassword, process.env.USER_PASSWORD);
        await this.click(this.loginBtn);
    }

    async invalidLogin() {
        await this.fill(this.loginEmail, faker.internet.email());
        await this.fill(this.loginPassword, faker.internet.password());
        await this.click(this.loginBtn);
    }

    async signupUser(name = faker.internet.userName(), email = faker.internet.email()) {
        await this.fill(this.signupName, name);
        await this.fill(this.signupEmail, email);
        await this.click(this.signupBtn);
    }
}    