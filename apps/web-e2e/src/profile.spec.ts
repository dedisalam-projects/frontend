import { test, expect } from '@playwright/test';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

test.describe('Profile Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('access_token', 'mock-token');
      localStorage.setItem(
        'user',
        JSON.stringify({ id: '1', name: 'John Doe', email: 'test@example.com', role: 'USER' }),
      );
    });

    // Mock SVG icons to prevent NG-ZORRO from throwing uncaught errors on 404
    await page.route('**/*.svg', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"></svg>',
      });
    });

    await page.route('**/api/v1/**', async (route, request) => {
      if (request.method() === 'OPTIONS') {
        await route.fulfill({ status: 200, headers: corsHeaders });
      } else {
        await route.fallback();
      }
    });

    await page.route('**/api/v1/users/me', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          headers: corsHeaders,
          json: { data: { id: '1', name: 'John Doe', email: 'test@example.com', role: 'USER' } },
        });
      } else if (route.request().method() === 'PATCH') {
        await route.fulfill({
          headers: corsHeaders,
          json: { data: { id: '1', name: 'Jane Doe', email: 'test@example.com', role: 'USER' } },
        });
      } else {
        await route.fallback();
      }
    });
  });

  test('should view profile successfully', async ({ page }) => {
    await page.goto('/profile');

    await expect(page.locator('.ant-spin-spinning')).toHaveCount(0, { timeout: 10000 });

    await expect(page.getByTestId('profile-name-text')).toContainText('John Doe');
  });

  test('should update profile successfully', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('.ant-spin-spinning')).toHaveCount(0, { timeout: 10000 });

    await page.getByTestId('profile-edit-button').click();
    await page.getByTestId('profile-name-input').fill('Jane Doe');
    await page.getByTestId('profile-save-button').click();

    await expect(page.getByTestId('profile-name-text')).toContainText('Jane Doe');
  });
});
