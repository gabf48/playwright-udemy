const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
    {
        // chrome - plugin/ coockies
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }); 


test.only('Page Playwright test', async ({page})=>
{
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect (page).toHaveTitle("Google");
}); 