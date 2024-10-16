import test from '@playwright/test';

test('Handling select dropdown', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/select-dropdown-demo',
  );
  await page.selectOption('#select-demo', 'Monday');
  await page.waitForTimeout(2000);
  await page.selectOption('#select-demo', {
    // label: 'Tuesday',
    // value: 'Wednesday',
    index: 6,
  });
});

test('Handling multiselect dropdown', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/select-dropdown-demo',
  );
  await page.selectOption('#multi-select', [
    {
      label: 'Florida',
    },
    {
      value: 'Ohio',
    },
    {
      index: 7,
    },
  ]);
});

test('Bootstrap dropdown', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo',
  );
  async function selectCountry(countryName: string) {
    await page.locator('#country+span').click(); // First to click on the dropdown as this doesnt have the select tags
    await page
      .locator('ul#select2-country-results')
      .locator('li', {
        hasText: countryName,
      })
      .click();
  }

  await selectCountry('India');
  await selectCountry('Australia');
});
