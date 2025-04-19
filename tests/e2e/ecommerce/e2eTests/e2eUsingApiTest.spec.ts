import test, { expect, request } from '@playwright/test';
import ApiHelper from '../../api/ApiHelper';

test('validate the orders page using the ui and api', async ({ page }) => {
  const loginPayload = {
    userEmail: 'ghostrider1289@gmail.com',
    userPassword: 'Ghost@1234',
  };
  const orderPayload = {
    orders: [
      { country: 'India', productOrderedId: '67a8dde5c0d3e6622a297cc8' },
    ],
  };

  // set Api context and pass that context to api helper
  const apiContext = await request.newContext();
  const apiHelper = new ApiHelper(apiContext);

  //get the token from the getToken method
  const token = await apiHelper.getToken(loginPayload);

  //The addInitScript() method in Playwright is used to inject a script into the context of a page before any of the page's scripts are executed.
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, token);
  await page.goto('https://rahulshettyacademy.com/client/');

  // create order using the createOrder, for now I am providing the hardcode payload but that can be dynamic too
  const orderDetails = await apiHelper.createOrder(token, orderPayload);
  const orderId = orderDetails.orders[0];
  console.log('order id ', orderId);

  //once the login and order is created directly click on my orders to validate the page
  page.locator("button[routerlink*='myorders']").click();

  const myOrders = page.locator("table [scope='row']");
  await myOrders.first().waitFor();
  const myOrderList = await myOrders.allTextContents();
  console.log('allIDs', myOrderList);
  expect(myOrderList).toContain(orderId);
});
