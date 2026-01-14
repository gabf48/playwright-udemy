const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=>
    {

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const userName = page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const password = page.locator('#password');
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await userName.fill("rahulshetty")
        await password.fill("learning")
        await signIn.click()
        // wait until this locator shown up page
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click()
        console.log(await page.locator(".card-body a").first().textContent()); 
        console.log(await page.locator(".card-body a").nth(1).textContent()); 
        }); 


test('Page Playwright test', async ({page})=>
{
    await page.goto("https://www.google.com");
    console.log(await page.title());
    await expect (page).toHaveTitle("Google");
}); 