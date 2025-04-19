import test, { expect, request } from '@playwright/test';
import ApiHelper from '../../api/ApiHelper';

// We are sending an empty response to convey the message 'No Orders.' This serves as an example of how to intercept network requests and provide a simulated response.
test('fullfiling with fake response', async ({ page }) => {
  const loginPayload = {
    userEmail: 'ghostrider1289@gmail.com',
    userPassword: 'Ghost@1234',
  };
  const orderPayload = {
    orders: [
      { country: 'India', productOrderedId: '67a8dde5c0d3e6622a297cc8' },
    ],
  };
  const fakePayLoadOrders = { data: [], message: 'No Orders' };
  const apiContext = await request.newContext();
  const apiHelper = new ApiHelper(apiContext);

  //get the token from the getToken method
  const token = await apiHelper.getToken(loginPayload);

  //The addInitScript() method in Playwright is used to inject a script into the context of a page before any of the page's scripts are executed.
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, token);
  await page.goto('https://rahulshettyacademy.com/client/');

  const orderDetails = await apiHelper.createOrder(token, orderPayload);
  const orderId = orderDetails.orders[0];
  console.log('object', orderDetails.orders);
  console.log('order id ', orderId);

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route => {
      const response = await page.request.fetch(route.request());
      const body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
    },
  );
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
  );
  await page.waitForSelector('.mt-4');
  const message = await page.locator('.mt-4').textContent();
  expect(message).toContain(
    'You have No Orders to show at this time. Please Visit Back Us',
  );
});

//Security Test: In this test, we will continue the request and provide a different URL to validate that,
// although we are logged in, we do not have authorization to view other users' orders.
test('continue the request', async ({ page }) => {
  const loginPayload = {
    userEmail: 'ghostrider1289@gmail.com',
    userPassword: 'Ghost@1234',
  };
  const apiContext = await request.newContext();
  const apiHelper = new ApiHelper(apiContext);

  //get the token from the getToken method
  const token = await apiHelper.getToken(loginPayload);

  //The addInitScript() method in Playwright is used to inject a script into the context of a page before any of the page's scripts are executed.
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, token);
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    route =>
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
      }),
  );
  await page.locator('.btn-primary').first().click();
  const noAuthorization = await page.locator('.blink_me').textContent();
  expect(noAuthorization).toContain('You are not authorize to view this order');
});

//In this we will abort the request for fetching the orders and vlaidate the loading message
test('Abort the request for fetching the orders', async ({ page }) => {
  const loginPayload = {
    userEmail: 'ghostrider1289@gmail.com',
    userPassword: 'Ghost@1234',
  };
  const apiContext = await request.newContext();
  const apiHelper = new ApiHelper(apiContext);

  //get the token from the getToken method
  const token = await apiHelper.getToken(loginPayload);

  //The addInitScript() method in Playwright is used to inject a script into the context of a page before any of the page's scripts are executed.
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, token);
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    route => route.abort(),
  );
  await page.locator("button[routerlink*='myorders']").click();
  const loadingMsg = await page.locator('.mt-4').textContent();
  expect(loadingMsg).toContain('Loading...');
});
