const { faker } = require('@faker-js/faker');
const { BasePage } = require('./Base');

exports.CartPage = class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.removeBtn = page.locator('.cart_quantity_delete');
        this.checkoutBtn = page.locator('a[class="btn btn-default check_out"]');
        this.subscribeInput = page.locator('#susbscribe_email');
        this.subscribeBtn = page.locator('#subscribe');
        this.mainCartBtn = page.locator('.fa.fa-shopping-cart >> nth=0');
        this.continueShoppingBtn = page.locator('button[class="btn btn-success close-modal btn-block"]');
        this.addToCartBtn = page.locator('.add-to-cart >> nth=0');
        this.viewCartBtn = page.locator('p >> a[href="/view_cart"]');
        this.emptyCart = page.locator('#empty_cart');
        this.cartQuantity = page.locator('.cart_quantity >> button');
        this.itemInCart = page.locator('tr[id*=product]');
        this.deliveryAddress = page.locator('#address_delivery');
        this.billingAddress = page.locator('#address_invoice');
    }

    async open() {
        await this.mainCartBtn.click();
    }

    async addRandomItem() {
        const randomProductIndex = Math.floor(Math.random() * 8) + 1
        await this.page.click(`a[data-product-id="${randomProductIndex}"] >> nth=0`);
        await this.continueShoppingBtn.click();
    }

    async addItem() {
        await this.addToCartBtn.click();
        await this.viewCartBtn.click();
    }

    async remove() {
        await this.removeBtn.click();
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click();
    }
}