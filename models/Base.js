exports.BasePage = class BasePage {
    constructor(page) {
        this.page = page;
        this.viewProductBtn = page.locator('.fa.fa-plus-square');
        this.itemsTiltle = page.locator('.title.text-center');
        this.quantityInput = page.locator('#quantity');
        this.detailAddToCartBtn = page.locator('.btn.btn-default.cart');
        this.addressDetails = page.locator('.address_firstname.address_lastname >> nth=0');
        this.testCasesBtn = page.locator('li >> a[href="/test_cases"]');
        this.signupLoginBtn = page.locator('.fa.fa-lock');
    }
}