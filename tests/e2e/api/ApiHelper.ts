import { APIRequestContext } from '@playwright/test';
class ApiHelper {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext; // No 'let' keyword, just use 'this'
  }

  async getToken(loginPayload: object) {
    const response = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      { data: loginPayload },
    );
    const loginResponse = await (await response).json();
    return loginResponse.token;
  }

  async createOrder(token: string, orderPayload: object) {
    console.log('otken', token);
    console.log('order payla', orderPayload);
    const response = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: { Authorization: token, 'Content-type': 'application/json' },
      },
    );
    const orderResponse = await response.json();
    return orderResponse;
  }
}

export default ApiHelper;
