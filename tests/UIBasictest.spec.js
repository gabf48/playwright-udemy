const {test, expect} = require('@playwright/test');

test('@Web Browser Context-Validating Error login', async ({browser})=>
    {

        const context = await browser.newContext();
        const page = await context.newPage();
        // page.route('**/*.{jpg,png,jpeg}', route => route.abort());
        const userName = page.locator('#username');
        const signIn = page.locator('#signInBtn');
        const password = page.locator('#password');
        const cardTitles = page.locator('.card-body a');
        page.on('request',request=> console.log(request.url()));
        page.on('response', response=> console.log(response.url(), response.status()));
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


test('@Web UI Controls', async ({page})=>
{
    // page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const singIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']")
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText')

    // assertion
}); 


test('@Child windows hadl', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page pending, rejected,fulfilled
        documentLink.click(),
    ]) 
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});