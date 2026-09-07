import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { PortfolioPage } from '../../src/pages/PortfolioPage.js';

test('home page has no automatically detectable serious accessibility violations @smoke', async ({ page }) => {
  const portfolio = new PortfolioPage(page);
  await portfolio.open();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const blockingViolations = results.violations.filter(({ impact }) =>
    impact === 'critical' || impact === 'serious',
  );
  expect(blockingViolations).toEqual([]);
});

test('keyboard users can reach primary controls in a logical order', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Browser focus preferences differ for links');
  const portfolio = new PortfolioPage(page);
  await portfolio.open();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Back to top', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Work', exact: true })).toBeFocused();
});
