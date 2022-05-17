
exports.BasePage = class BasePage {
    constructor(page) {
        this.page = page;
    }
    async click(el) {
        await this.page.locator(el).click();
    }

    async fill(el, text) {
        await this.page.locator(el).fill(text);
    }

    async check(el) {
        await this.page.locator(el).check;
    }

    async select(el, text) {
        await this.page.locator(el).selectOption(text);
    }
}