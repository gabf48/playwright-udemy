const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=>
    {
        // chrome - plugin/ coockies
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await page.locator('#username').fill("rahulshetty")
            await page.locator('#password').fill("learning")
            await page.locator('#signInBtn').click()
            // wait until this locator shown up page
            console.log(await page.locator("[style*='block']").textContent());
            await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
        }); 


test('Page Playwright test', async ({page})=>
{
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect (page).toHaveTitle("Google");
}); 