const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');

test('Client App login', async ({page})=>
    {
        const username = "anunturi.user@gmail.com";
        const password = "Parola1993!";
        const productName = 'ZARA COAT 3';
        const products = page.locator(".card-body");

        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(username, password);
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = page.locator("h3:has-text('Zara Coat 4')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        await page.locator("[placeholder*='Country']").pressSequentially('rom');
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for(let i=0; i< optionsCount; i++){
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text === " Romania"){
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");
        
        for (let i =0; i< await rows.count(); i++)
        {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
        }); 
