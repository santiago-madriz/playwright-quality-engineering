import { expect, test } from '@playwright/test';

test('home document meets the public HTTP contract @smoke', async ({ request }) => {
  const response = await request.get('/');

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('text/html');

  const body = await response.text();
  expect(body).toContain('<main>');
  expect(body).toContain('id="contactForm"');
  expect(body).toContain('Content-Security-Policy');
  expect(body).not.toMatch(/(api[_-]?key|private[_-]?key|client[_-]?secret)\s*[:=]/i);
});

test('representative media assets are reachable', async ({ page, request }) => {
  await page.goto('/');
  const assetUrls = await page.locator('img[src]').evaluateAll((images) =>
    images
      .slice(0, 5)
      .map((image) => image.getAttribute('src'))
      .filter((source): source is string => Boolean(source))
      .map((source) => new URL(source, document.baseURI).href),
  );

  expect(assetUrls.length).toBeGreaterThan(0);
  for (const url of assetUrls) {
    const response = await request.get(url);
    expect(response.ok(), `${url} should be reachable`).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/^image\//);
  }
});
