const {When, Then, Given } = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager');
const {test, expect, playwright} = require('@playwright/test');


Given('a login to Ecommerce application with {username} and {password}', async function (username, password) {
    const browser = playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    return 'pending';
  });


  When('Add {string} to Cart', async function (string) {
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    return 'pending';
  });

  Then('Verify {string} is display in the Cart', async function (string) {
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
    return 'pending';
  });

  When('Enter valid details and Place the Order', async function () {
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("romania", "Romania");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    return 'pending';
  });

  Then('Verify order in present in the OrderHistory', async function () {
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    return 'pending';
  });