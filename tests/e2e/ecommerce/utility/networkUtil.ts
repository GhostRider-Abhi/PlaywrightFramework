import { Page } from '@playwright/test';

export class NetworkUtils {
  constructor(private page: Page) {}

  async mockResponse(urlPattern: string, response: any): Promise<void> {
    await this.page.route(urlPattern, route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      }),
    );
  }

  async waitForRequest(urlPattern: string): Promise<any> {
    const response = await this.page.waitForResponse(urlPattern);
    return response.json();
  }

  async blockResources(resourceTypes: string[]): Promise<void> {
    await this.page.route('**/*', route => {
      return resourceTypes.includes(route.request().resourceType())
        ? route.abort()
        : route.continue();
    });
  }
}
