import { expect, test } from '@playwright/test';

test('home page stays within the navigation timing budget @extended', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'One stable browser owns the timing signal');
  await page.goto('/');

  const timing = await page.evaluate(() => {
    const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    return {
      domContentLoaded: entry.domContentLoadedEventEnd,
      loadComplete: entry.loadEventEnd,
    };
  });

  expect(timing.domContentLoaded).toBeLessThan(3_500);
  expect(timing.loadComplete).toBeLessThan(15_000);
});
