import { test, expect } from '@playwright/test';

test('Sprawdzenie widoczności przycisków Logowanie z GitHub i Google', async ({ page }) => {
  // Przejdź na stronę użytkowników
  await page.goto('http://localhost:4200/users');
  
  // Kliknij w "Log In"
  await page.getByText('Log In').click();
  
  // Sprawdź, czy nagłówek "Login with OAuth" jest widoczny
  const heading = await page.getByRole('heading', { name: 'Login with OAuth' });
  await expect(heading).toBeVisible();
  
  // Sprawdź, czy przyciski GitHub i Google są widoczne
  const githubButton = await page.getByRole('cell', { name: 'GitHub' });
  const googleButton = await page.getByRole('cell', { name: 'Google' });
  
  // Asercja na widoczność
  await expect(githubButton).toBeVisible();
  await expect(googleButton).toBeVisible();
});
