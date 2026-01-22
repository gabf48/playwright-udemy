const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/APiUtils');
const loginPayLoad = {userEmail: "anunturi.user@gmail.com", userPassword: "Parola1993!"}
const orderPayLoad = {orders:[{country:"Romania", productOrderedId:"6960eac0c941646b7a8b3e68"}]}

let token;
let orderId;

test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    apiUtils.createOrder(orderPayLoad);
});

test('Place the order', async ({page})=>
    {

        const apiUtils = new ApiUtils(apiContext, loginPayLoad);
        const orederId = createOrder(orderPayLoad);
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, token );

        await page.goto("https://rahulshettyacademy.com/client/");
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
        await page.pause();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
        }); 

        //Verify if order created is showing in history page
        // Precondition - create order - 
