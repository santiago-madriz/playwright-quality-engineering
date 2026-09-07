import { expect, test } from '@playwright/test';
import { PortfolioPage } from '../../src/pages/PortfolioPage.js';

test.describe('portfolio critical path', () => {
  test('visitor can discover the work, profile, and contact sections @smoke', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    await portfolio.open();
    await expect(page).toHaveTitle(/Santiago Madriz.*Costa Rica/i);
    await expect(portfolio.heroHeading).toContainText('Photo and Film');

    for (const section of ['work', 'about', 'contact'] as const) {
      await portfolio.navigateTo(section);
    }
  });

  test('visitor can switch the experience to Spanish @smoke', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    await portfolio.open();
    await portfolio.switchToSpanish();

    await expect(portfolio.heroHeading).toContainText('Foto y Producción');
    await expect(page.getByRole('link', { name: 'Contacto', exact: true }).first()).toBeVisible();
  });

  test('contact form exposes client-side validation without submitting', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    await portfolio.open();
    await portfolio.navigateTo('contact');

    await expect(portfolio.contactForm.getByLabel('Name')).toHaveAttribute('required', '');
    await expect(portfolio.contactForm.getByLabel('Email')).toHaveAttribute('type', 'email');
    await expect(portfolio.contactForm.getByLabel('Tell me what you have in mind')).toHaveAttribute('required', '');
  });
});

