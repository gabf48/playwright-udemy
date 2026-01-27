const {POManager} = require('../pageobjects/POManager');

test(`testing with ${data.email}`, async ({page, person}) =>
{
    const poManager = new POManager(page);
    const username = "anunturi.user@gmail.com";
    const password = "Parola1993!";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.email, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

})