const { faker } = require('@faker-js/faker');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginBtn = page.locator('[data-qa="login-button"]');
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupBtn = page.locator('[data-qa="signup-button"]');
        this.menuLoginBtn = page.locator('i[class="fa fa-lock"]');    
    }

    async goTo() {
        await this.page.goto('/');
        await this.menuLoginBtn.click();
    }

    async validLogin() {
        await this.loginEmail.fill(process.env.USER_EMAIL);
        await this.loginPassword.fill(process.env.USER_PASSWORD);
        await this.loginBtn.click();
    }

    async invalidLogin() {
        await this.loginEmail.fill(faker.internet.email());
        await this.loginPassword.fill(faker.internet.password());
        await this.loginBtn.click();
    }

    async signupUser(name = faker.internet.userName(), email = faker.internet.email()) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupBtn.click();
    }
}    