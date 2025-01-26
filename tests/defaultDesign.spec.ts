import { test, expect } from '@playwright/test';

test('default userqualification design', async ({ page }) => {
  await page.goto('http://localhost:4200/users');
  await page.getByText('👤Name: JohnAge: 30Profession').click();
  await page.getByRole('link', { name: 'Qualifications' }).click();
  await page.getByRole('textbox', { name: 'Wyszukaj po nazwie' }).click();
  await page.getByRole('textbox', { name: 'Wyszukaj po nazwie' }).fill('Java');
  await page.getByRole('button', { name: 'Wyszukaj', exact: true }).click();
  await page.getByRole('button', { name: 'Add' }).first().click();
  await page.getByText('Wybierz poziom znajomości').click();
  await page.getByRole('button', { name: 'star_border' }).first().click();
  await page.getByRole('combobox').selectOption('intermediate');
  await page.getByRole('button', { name: 'Add' }).first().click();
  await page.getByText('Kwalifikacja Java została').click();
  await page.getByText('UsersQualificationsRecommendationsAboutMy AccountLog In').click();
  await page.getByRole('button', { name: 'Create Professional' }).click();
  await page.getByRole('button', { name: 'Sprawdź co musisz poprawić' }).click();
  await page.getByRole('heading', { name: 'Your Qualifications' }).click();
  await page.getByRole('heading', { name: 'Job Qualifications for Cloud' }).click();
  await page.getByText('Vue.jsBeginner').click();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByText('User Management').click();
  await page.getByText('Recommendation System').click();
  await page.getByText('UsersQualificationsRecommendationsAboutMy AccountLog In').click();
  await page.getByRole('link', { name: 'My Account' }).click();
});