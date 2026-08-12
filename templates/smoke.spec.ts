import { expect, test } from '@playwright/test';

async function captureErrors(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test('IMMERSIVE desktop evidence gate', async ({ page }, testInfo) => {
  const errors = await captureErrors(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: testInfo.outputPath('immersive-desktop.png'), fullPage: true });
  const significant = errors.filter((e) => !/favicon|webpack-hmr|ERR_CONNECTION_REFUSED/i.test(e));
  expect(significant).toEqual([]);
});

test('IMMERSIVE mobile has no horizontal overflow', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({ path: testInfo.outputPath('immersive-mobile.png'), fullPage: true });
  expect(overflow).toBeLessThanOrEqual(1);
});

test('IMMERSIVE reduced-motion path loads cleanly', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('body')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('immersive-reduced-motion.png'), fullPage: true });
});
