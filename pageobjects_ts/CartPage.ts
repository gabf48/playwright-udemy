import { test, expect, Locator, Page } from "@playwright/test";


export class CartPage {

  page: Page;
  cartProducts : Locator;
  productsText : Locator;
  cart : Locator;
  orders: Locator;
  checkout: Locator;
  constructor(page:Page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
  }

  async VerifyProductIsDisplayed(productName: string) {
    try {
        await this.page.waitForLoadState('domcontentloaded'); // Ensure the page is loaded
        await this.cartProducts.waitFor({ timeout: 10000 }); // Wait with a timeout
        const productLocator = this.getProductLocator(productName);
        await productLocator.waitFor({ timeout: 10000 }); // Wait for the specific product
        const isVisible = await productLocator.isVisible();
        expect(isVisible).toBeTruthy();
    } catch (error) {
        throw new Error(`Product '${productName}' not found or took too long to appear: ${error.message}`);
    }
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}