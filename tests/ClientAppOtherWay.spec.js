const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({page})=>
    {
        const email = "anunturi.user@gmail.com";
        const productName = 'ZARA COAT 3';
        const products = page.locator(".card-body");
        await page.goto("https://rahulshettyacademy.com/client");
        await page.getByPlaceholder("email@example.com").fill(email);
        await page.getByPlaceholder("enter your passsword").fill("Parola1993!");
        await page.getByRole('button', {name:"Login"}).click();
        await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();

        // Intercept network requests to verify cart update
        await page.route('**/cart', route => {
            route.continue();
            console.log('Cart network request intercepted.');
        });

        const productLocator = page.locator(".card-body").filter({hasText: productName});
        const addToCartButton = productLocator.getByRole('button', {name: "Add To Cart"});
        const isButtonVisible = await addToCartButton.isVisible();
        console.log(`Is 'Add To Cart' button visible for '${productName}': ${isButtonVisible}`);
        if (isButtonVisible) {
            await addToCartButton.click();
            console.log(`Clicked 'Add To Cart' for '${productName}'.`);
        } else {
            throw new Error(`'Add To Cart' button not visible for '${productName}'.`);
        }

        // Wait for the cart to update after adding the product
        await page.waitForResponse(response => response.url().includes('/cart') && response.status() === 200);
        console.log('Cart update confirmed via network response.');

        await page.waitForTimeout(2000); // Adding a short delay to ensure cart updates
        console.log('Waiting for cart to update...');

        await page.getByRole('listitem').getByRole('button', {name:"Cart"}).click();
        console.log('Navigated to Cart page');

        const cartItems = await page.locator("div li");
        const cartItemsCount = await cartItems.count();
        console.log(`Number of items in cart: ${cartItemsCount}`);
        for (let i = 0; i < cartItemsCount; i++) {
            const itemText = await cartItems.nth(i).textContent();
            console.log(`Cart item ${i + 1}: ${itemText}`);
        }
        if (cartItemsCount > 0) {
            await cartItems.first().waitFor();
            await expect(page.getByText("ZARA COAT 3")).toBeVisible();
        } else {
            throw new Error('Cart is empty, no items to display.');
        }

        await page.getByRole("button", {name:"Checkout"}).click();
        await page.getByPlaceholder("Select Country").pressSequentially("rom");
        await page.getByRole("button", {name:"Romania"}).click();
        await page.getByText("PLACE ORDER").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
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
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
        });
