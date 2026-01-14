const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=>
    {

        const context = await browser.newContext();
        const page = await context.newPage();
        
        const userName = page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const password = page.locator('#password');
        const cardTitles = page.locator('.card-body a');
        
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
        // console.log(await cardTitles.first().textContent()); 
        // console.log(await cardTitles.nth(1).textContent());
        
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);
        }); 


test('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const singIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    
    // assertion
    await page.pause();
}); 