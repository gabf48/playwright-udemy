const {test, expect} = require('@playwright/test')


test("Popup validations", async({page})=>
{
    // page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.dismiss());

    await page.locator("#mousehover").hover();

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

})

test.only("Screenshot & Visual comparision", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "partialScreenshot.png"})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
}
)