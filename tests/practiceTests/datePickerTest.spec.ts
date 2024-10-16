import test from '@playwright/test';
import moment from 'moment';

test('Handling date using fill method', async ({ page }) => {
  await page.goto(
    'https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo',
  );

  const date = '01/01/2024';
  await page.fill('#from', date);
});

test('Handling date using moment', async ({ page }) => {
  await page.goto('https://demoqa.com/date-picker');
  await page.waitForLoadState();
  await selectDateFromCalendar(1, 'January 2024');
  await page.reload();
  await selectDateFromCalendar(12, 'December 2024');

  async function selectDateFromCalendar(day: number, dateToSelect: string) {
    await page.click('#datePickerMonthYearInput');
    const mmYY = page.locator('.react-datepicker__current-month');
    const prev = page.locator('[aria-label="Previous Month"]');
    const next = page.locator('[aria-label="Next Month"]');
    const thisMonth = moment(dateToSelect, 'MMMM YYYY').isBefore();
    while ((await mmYY.textContent()) != dateToSelect) {
      if (thisMonth) {
        await prev.click();
      } else {
        await next.click();
      }
    }
    const dayToSelect = page.locator(
      `//div[contains(@class,'react-datepicker__day')][text()=${day}][not(contains(@class,'outside-month'))]`,
    );
    await dayToSelect.click();
  }
});
