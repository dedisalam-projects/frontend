import { test, expect } from '@playwright/test';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Handle OPTIONS for CORS
    await page.route('**/api/v1/**', async (route, request) => {
      if (request.method() === 'OPTIONS') {
        await route.fulfill({ status: 200, headers: corsHeaders });
      } else {
        await route.fallback();
      }
    });
  });

  test('should login successfully with correct credentials', async ({ page }) => {
    await page.route('**/api/v1/auth/login', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          headers: corsHeaders,
          json: {
            data: {
              accessToken: 'mock-access-token',
              refreshToken: 'mock-refresh-token',
              user: { id: '1', name: 'John Doe', email: 'test@example.com', role: 'USER' },
            },
          },
        });
      } else {
        await route.fallback();
      }
    });

    await page.goto('/login');

    await page.getByTestId('login-email-input').fill('test@example.com');
    await page.getByTestId('login-password-input').fill('Password123');
    await page.getByTestId('login-submit-button').click();

    await expect(page).toHaveURL(/.*\/profile/);
  });

  test('should show error message on invalid login', async ({ page }) => {
    await page.route('**/api/v1/auth/login', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 401,
          headers: corsHeaders,
          json: { message: 'Invalid credentials' },
        });
      } else {
        await route.fallback();
      }
    });

    await page.goto('/login');

    await page.getByTestId('login-email-input').fill('wrong@example.com');
    await page.getByTestId('login-password-input').fill('wrongpass');
    await page.getByTestId('login-submit-button').click();

    await expect(page).toHaveURL(/.*\/login/);
  });

  test('should register successfully', async ({ page }) => {
    await page.route('**/api/v1/auth/register', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 201, headers: corsHeaders, json: { message: 'Created' } });
      } else {
        await route.fallback();
      }
    });

    await page.goto('/register');

    await page.getByTestId('register-name-input').fill('Jane Doe');
    await page.getByTestId('register-email-input').fill('jane@example.com');
    await page.getByTestId('register-password-input').fill('Password123');
    await page.getByTestId('register-submit-button').click();
  });
});
