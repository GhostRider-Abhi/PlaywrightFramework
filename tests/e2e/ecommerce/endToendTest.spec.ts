import test, { expect } from '@playwright/test';

test('add item to cart and complete payment', async ({ page }) => {
  //Variables or data set
  const productName = 'ADIDAS ORIGINAL';
  const countryName = 'India';

  //Login into the application
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('ghostrider1289@gmail.com');
  await page.locator('#userPassword').fill('Ghost@1234');
  await page.locator("[value='Login']").click();

  await page.waitForLoadState('domcontentloaded');

  //Select the product
  const allProductsLocator = page.locator('.card-body');
  await allProductsLocator.first().waitFor({ state: 'visible' });

  const productCount = await allProductsLocator.count();
  console.log('product count', productCount);
  for (let i = 0; i < productCount; i++) {
    const product = await allProductsLocator.nth(i).locator('b').textContent(); //getting the name of the product
    console.log('product data', product, productName);
    if (product === productName) {
      await allProductsLocator
        .nth(i)
        .getByRole('button', { name: ' Add To Cart' })
        .click();
      break;
    }
  }
  //Navigate to cart and validate that product is added
  await page.locator("[routerlink*='cart']").click();
  await page.locator('.cart').first().waitFor(); //waiting for cart to load

  const cartProduct = page.locator(`h3:has-text('${productName}')`);
  await cartProduct.waitFor({ state: 'visible' });
  // await expect(cartProduct).toBeVisible();

  //Navigate to checkout
  await page.getByRole('button', { name: 'Checkout' }).click();

  // fill cvv, name and country , then make payment
  await page.locator("(//input[@class='input txt'])[1]").fill('123'); //CVV
  await page.locator("(//input[@class='input txt'])[2]").fill('Abhishek');

  const countrySelector = page.getByPlaceholder('Select Country');
  await countrySelector.pressSequentially('ind'); //To send fine-grained keyboard event use this instead of fill
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor(); // wait for dropdown

  const countyOptions = dropdown.locator('button').count();

  for (let i = 0; i < (await countyOptions); i++) {
    const focusedCountry = await dropdown
      .locator('button')
      .nth(i)
      .textContent();
    console.log('name', focusedCountry);
    if (focusedCountry?.trim() === countryName) {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }
  await page.locator('.actions a').click();

  //Get order id after successfull payment
  const orderIdLocator = page.locator('label.ng-star-inserted');
  await orderIdLocator.waitFor();
  const orderIdValue = await orderIdLocator.textContent();
  const orderIdText = await orderIdValue?.replace(/\|/g, '').trim();
  console.log('orderid', orderIdText);

  //Navigate to my orders and validate the order id from the list of orders
  page.locator("button[routerlink*='myorders']").click();
  const myOrders = page.locator("table [scope='row']");
  await myOrders.first().waitFor();
  const myOrderList = await myOrders.allTextContents();
  console.log('allIDs', myOrderList);
  expect(myOrderList).toContain(orderIdText);
});
