import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect title to be 'web'
  expect(await page.title()).toBe('web');
});
