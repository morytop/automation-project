const { BasePage } = require("./Base");
const { faker } = require('@faker-js/faker');

exports.ContactPage = class ContactPage extends BasePage {
    constructor(page){
        super(page);
        this.conatctBtn = page.locator('.fa.fa-envelope');
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        this.uploadInput = page.locator('input[name="upload_file"]');
        this.submitContactFormBtn = page.locator('[data-qa="submit-button"]');
        this.successAlert = page.locator('.status.alert.alert-success');
        this.homeBtn = page.locator('.btn.btn-success');
    }
    
    async sendForm() {
        const filePath = '../automation-project/data/test.txt';
        await this.conatctBtn.click();
		await this.nameInput.type(faker.name.findName());
		await this.emailInput.type(faker.internet.email());
		await this.subjectInput.type(faker.lorem.sentence());
		await this.messageInput.type(faker.lorem.paragraph());
        await this.uploadInput.setInputFiles(filePath);
        this.page.on('dialog', (dialog) => dialog.accept());
        await this.submitContactFormBtn.click();
    }
}