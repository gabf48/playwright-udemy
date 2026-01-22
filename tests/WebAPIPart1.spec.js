const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "anunturi.user@gmail.com", userPassword: "Parola1993!"}
const orderPayLoad = {orders:[{country:"Romania", productOrderedId:"6960eac0c941646b7a8b3e68"}]}

let token;
let orderId;

test.beforeAll( async()=>
{

    // Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayLoad
    })//200, 201, 2
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    // 
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
        data : orderPayLoad,
        headers: {
            'Authorization' : token, 
            'Content-Type' : 'application/json'
        },
        })
    
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];


});


test.beforeEach( ()=>
{})




test('Place the order', async ({page})=>
    {


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
