import { test, expect } from '@playwright/test';

test('Hello World E2E flow (Mock API)', async ({ page }) => {
  // Mock API response to avoid dependency on backend for this frontend-only test
  await page.route('**/api/v1/hello', async (route) => {
    const json = { message: 'Hello from mock API!' };
    await route.fulfill({ json });
  });

  await page.goto('/');

  // Verify Dashboard text
  await expect(page.locator('text=Dashboard Hello World E2E')).toBeVisible();

  // Find the button and click
  const button = page.locator('button', { hasText: 'Kirim Sapaan' });
  await expect(button).toBeVisible();

  await button.click();

  // Verify REST API success toast
  await expect(page.locator('text=REST API Berhasil: Hello from mock API!')).toBeVisible();
});
