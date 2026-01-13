const {test} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
    {
        chrome - plugin/ coockies
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("www.google.com");   
    }); 


test('Page Playwright test', async ({page})=>
{
    await page.goto("www.google.com");   
}); 