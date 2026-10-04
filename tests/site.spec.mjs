import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdir } from 'node:fs/promises';

const pages = (await readdir(new URL('../dist/', import.meta.url), { recursive: true }))
  .filter((file) => file.endsWith('.html'));

for (const file of pages) {
  test(`${file} : accessibilité et ressources`, async ({ page, request, baseURL }) => {
    const failedResources = [];
    page.on('response', (response) => {
      if (response.status() >= 400) failedResources.push(`${response.status()} ${response.url()}`);
    });
    page.on('requestfailed', (req) => failedResources.push(req.url()));
    const response = await page.goto(`/${file.replaceAll('\\', '/')}`, { waitUntil: 'networkidle' });
    expect(response.status()).toBe(200);
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();
    expect(scan.violations).toEqual([]);
    expect(failedResources).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    const links = await page.locator('a[href]').evaluateAll((elements) => elements.map((el) => el.href));
    for (const href of new Set(links)) {
      const url = new URL(href);
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      const result = await request.get(url.href, { timeout: 15000 });
      expect(result.ok(), `Lien cassé : ${url.href} (${result.status()})`).toBe(true);
      if (url.origin === baseURL && url.hash) {
        await page.goto(url.href);
        expect(await page.evaluate((id) => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1)))).toBe(true);
      }
    }
  });
}

test('la navigation clavier permet de rejoindre le contenu et le statut', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contenu$/);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /Suivre le décollage/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#statut$/);
});
