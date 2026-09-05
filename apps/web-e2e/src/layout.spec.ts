import { test, expect } from '@playwright/test';

test('has NG-ALAIN layout', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => {
    errors.push(err.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('/');
  await page.waitForTimeout(2000);

  if (errors.length > 0) {
    console.log('BROWSER_ERRORS:', errors);
  }

  const html = await page.content();
  console.log('PAGE_HTML:', html);

  const layout = page.locator('app-layout-default');
  await expect(layout).toBeVisible();
});
