const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({page})=>
    {
        const email = "anunturi.user@gmail.com";
        const productName = 'ZARA COAT 3';
        const products = page.locator(".card-body");
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("Parola1993!");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
        const count = await products.count();
        for(let i=0; i<=count; i++)
        {
            if(await products.nth(i).locator("b").textContent() === productName){
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = page.locator("h3:has-text('Zara Coat 4')").isVisible();
        expect(bool).toBeTruthy();
        }); 
