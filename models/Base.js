
exports.BasePage = class BasePage {
    constructor(page) {
        this.page = page;
    }

    async visitHomePage() {
        await this.page.goto('/');
    }

    async click(el) {
        await this.page.locator(el).click();
    }

    async fill(el, text) {
        await this.page.locator(el).fill(text);
    }
}