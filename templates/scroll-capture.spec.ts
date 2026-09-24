import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

/*
 * Iron Canvas v6 · scroll-capture — the evidence for VERIFY Axis 7 (Aliveness) and the §22 gate.
 *
 * Copy to tests/e2e/ next to smoke.spec.ts. It:
 *   1. records the ARRIVAL (the first 5 s) as video;
 *   2. visits every act of the score — show.seek(act, 0.5) and (act, 1) when window.__icScore exists,
 *      otherwise IC_STEPS evenly spaced scroll stations — and screenshots each station;
 *   3. asserts: zero console/page errors · no horizontal overflow · the page reaches the end ·
 *      a canvas that mounted actually drew (lit-pixel ratio) · something is alive at rest ·
 *      every interactive element answers hover AND focus · reduced motion rests every entrance
 *      target at its final state with nothing pinned;
 *   4. writes scroll-capture-receipt.json: metrics, SHA-256 of every capture, and the claim limits.
 *
 * Run WebGL pages with ?qa (their canvases keep the drawing buffer so pixels can be read).
 * Headless GPUs (SwiftShader) under-report frame rate — this spec never judges fps; do that in a
 * headed session on real hardware.
 *
 * Env: IC_PATH (default "/?qa") · IC_STEPS (12) · IC_DWELL_MS (450) · IC_HANDFEEL_MIN (1.0) · IC_LIT_MIN (0.02)
 */

const PATH = process.env.IC_PATH || '/?qa';
const STEPS = Number(process.env.IC_STEPS || 12);
const DWELL = Number(process.env.IC_DWELL_MS || 450);
const HANDFEEL_MIN = Number(process.env.IC_HANDFEEL_MIN || 1);
const LIT_MIN = Number(process.env.IC_LIT_MIN || 0.02);
const IGNORE = /favicon|webpack-hmr|ERR_CONNECTION_REFUSED/i;

// ── in-page probes (plain functions: page.evaluate serialises them) ──────────────────────────────
export function probeCanvas() {
  const out = [];
  for (const c of Array.from(document.querySelectorAll('canvas'))) {
    const r = c.getBoundingClientRect();
    if (r.width < 32 || r.height < 32) continue;
    const probe = document.createElement('canvas');
    probe.width = 64; probe.height = 36;
    const ctx = probe.getContext('2d');
    let lit = -1;
    let sig = 0;
    try {
      ctx.drawImage(c, 0, 0, 64, 36);
      const d = ctx.getImageData(0, 0, 64, 36).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4) {
        const y = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        if (y > 10) n++;
        sig = (sig + Math.round(y) * ((i >> 2) % 97 + 1)) % 1000003;   // moves when pixels move, not just when they dim
      }
      lit = n / (64 * 36);
    } catch (e) { lit = -1; }   // tainted or no drawing buffer: unknown, reported as such
    out.push({ id: c.id || c.className || 'canvas', w: Math.round(r.width), h: Math.round(r.height), lit, sig });
  }
  return out;
}

export function probeAlive() {
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0 && r.height > 0; };
  const css = document.getAnimations().filter((a) => a.playState === 'running' && (!a.effect?.target || inView(a.effect.target))).length;
  const g = window.gsap;
  const tweens = g ? g.globalTimeline.getChildren(true, true, false).filter((t) => t.isActive()).length : 0;
  return { css, tweens };
}

export function probeSettled(onlyInView = false) {
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  const targets = Array.from(document.querySelectorAll('[data-ic]')).filter((el) => !onlyInView || inView(el));
  const hidden = targets.filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length;
  const pinned = document.querySelectorAll('.pin-spacer').length;
  return { targets: targets.length, hidden, pinned };
}

const STYLE_KEYS = ['color', 'backgroundColor', 'borderColor', 'boxShadow', 'transform', 'outlineStyle', 'outlineColor', 'textDecorationLine', 'opacity', 'filter'];
async function styleOf(page: Page, handle) {
  return handle.evaluate((el, keys) => {
    const s = getComputedStyle(el);
    const a = getComputedStyle(el, '::after');
    const b = getComputedStyle(el, '::before');
    return JSON.stringify([...keys.map((k) => s[k]), a.transform, a.opacity, b.transform, b.opacity, b.width]);
  }, STYLE_KEYS);
}

async function errorsOf(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error' && !IGNORE.test(m.text())) errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

const sha = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

test('Axis 7 · arrival, stations, liveness, hand-feel', async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    viewport: testInfo.project.use.viewport || { width: 1440, height: 900 },
    recordVideo: { dir: testInfo.outputPath('video'), size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();
  const errors = await errorsOf(page);
  const captures: Record<string, string> = {};
  const shot = async (name: string) => { const p = testInfo.outputPath(`${name}.png`); await page.screenshot({ path: p }); captures[name] = sha(p); };

  // 1 · ARRIVAL — five seconds of the first impression, on video
  await page.goto(PATH);
  await page.waitForTimeout(5000);
  await shot('arrival-5s');

  // 2 · ALIVE AT REST — after the arrival settles, something must still be moving in view
  const before = await page.evaluate(probeCanvas);
  const alive = await page.evaluate(probeAlive);
  await page.waitForTimeout(600);
  const after = await page.evaluate(probeCanvas);
  const canvasMoving = before.some((c, i) => after[i] && c.lit >= 0 && c.sig !== after[i].sig);
  const aliveAtRest = alive.css > 0 || alive.tweens > 0 || canvasMoving;

  // 3 · STATIONS — every act of the score (or even scroll steps without one)
  const acts: string[] = await page.evaluate(() => {
    const s = window.__icScore;
    const a = s?.acts;
    return Array.isArray(a) ? a.map((x) => x.id) : a ? Object.keys(a) : [];
  });
  const canvases: Array<Record<string, unknown>> = [];
  if (acts.length) {
    for (const id of acts) for (const p of [0.5, 1]) {
      await page.evaluate(([act, prog]) => window.__icScore.seek(act, prog), [id, p]);
      await page.waitForTimeout(DWELL);
      await shot(`act-${id}-${p}`);
      canvases.push({ station: `${id}@${p}`, canvases: await page.evaluate(probeCanvas) });
    }
  } else {
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    for (let i = 0; i <= STEPS; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.round((max * i) / STEPS));
      await page.waitForTimeout(DWELL);
      await shot(`station-${String(i).padStart(2, '0')}`);
      canvases.push({ station: i, canvases: await page.evaluate(probeCanvas) });
    }
  }
  const reachedEnd = await page.evaluate(() => Math.abs(scrollY + innerHeight - document.documentElement.scrollHeight) < 4 || scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) > 0.97);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const litMax = Math.max(-1, ...canvases.flatMap((s) => (s.canvases as Array<{ lit: number }>).map((c) => c.lit)));
  const hasCanvas = canvases.some((s) => (s.canvases as unknown[]).length > 0);

  // 4 · HAND-FEEL — every visible interactive element changes on hover AND on focus
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(DWELL);
  const controls = await page.$$('a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, summary');
  let tested = 0; const dead: string[] = [];
  for (const el of controls.slice(0, 40)) {
    if (!(await el.isVisible())) continue;
    tested++;
    const label = ((await el.textContent()) || (await el.getAttribute('aria-label')) || '').trim().slice(0, 40);
    await page.mouse.move(1, 1);
    const rest = await styleOf(page, el);
    await el.hover({ force: true }).catch(() => {});
    await page.waitForTimeout(260);
    const hovered = await styleOf(page, el);
    await page.mouse.move(1, 1);
    await page.keyboard.press('Shift');                     // keyboard modality, so :focus-visible applies
    await el.focus();
    await page.waitForTimeout(120);
    const focused = await styleOf(page, el);
    await el.evaluate((n) => n.blur());
    if (hovered === rest || focused === rest) dead.push(`${label || '(unlabelled)'}${hovered === rest ? ' · no hover' : ''}${focused === rest ? ' · no focus' : ''}`);
  }
  const handFeel = tested ? (tested - dead.length) / tested : 1;
  await context.close();

  // 5 · COMPOSED STILL — reduced motion: the first view is complete at once; walking the page like a
  //     reader leaves every entrance target visible (short opacity fades are allowed), nothing pinned
  const rctx = await browser.newContext({ reducedMotion: 'reduce', viewport: testInfo.project.use.viewport || { width: 1440, height: 900 } });
  const rpage = await rctx.newPage();
  const rerrors = await errorsOf(rpage);
  await rpage.goto(PATH);
  await rpage.waitForTimeout(1500);
  const firstView = await rpage.evaluate(probeSettled, true);
  const rmax = await rpage.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let i = 1; i <= STEPS; i++) {
    await rpage.evaluate((y) => window.scrollTo(0, y), Math.round((rmax * i) / STEPS));
    await rpage.waitForTimeout(DWELL);
  }
  const still = { ...(await rpage.evaluate(probeSettled, false)), firstViewHidden: firstView.hidden };
  const rp = testInfo.outputPath('reduced-motion.png');
  await rpage.screenshot({ path: rp, fullPage: true });
  captures['reduced-motion'] = sha(rp);
  await rctx.close();

  const receipt = {
    tool: 'iron-canvas/scroll-capture', version: 1, path: PATH, project: testInfo.project.name,
    metrics: { aliveAtRest, alive, canvasMoving, reachedEnd, overflow, hasCanvas, litMax, handFeel, tested, dead, still, errors: [...errors, ...rerrors] },
    stations: canvases, captures,
    limits: ['no frame-rate claims — headless GPUs under-report fps', 'lit ratio −1 = canvas unreadable (run with ?qa)', 'hover/focus change is necessary, not sufficient — a critic still judges feel'],
  };
  writeFileSync(testInfo.outputPath('scroll-capture-receipt.json'), JSON.stringify(receipt, null, 2));

  expect.soft([...errors, ...rerrors], 'console / page errors').toEqual([]);
  expect.soft(overflow, 'horizontal overflow (px)').toBeLessThanOrEqual(1);
  expect.soft(reachedEnd, 'the scroll reaches the end of the page').toBe(true);
  if (hasCanvas) expect.soft(litMax, 'a mounted canvas actually drew (lit-pixel ratio)').toBeGreaterThanOrEqual(LIT_MIN);
  expect.soft(aliveAtRest, 'something alive at rest — the heartbeat (Axis 7)').toBe(true);
  expect.soft(handFeel, `hand-feel: every control answers hover and focus — dead: ${dead.join(' | ')}`).toBeGreaterThanOrEqual(HANDFEEL_MIN);
  expect.soft(still.firstViewHidden, 'reduced motion: the first view is complete within 1.5 s').toBe(0);
  expect.soft(still.hidden, 'reduced motion: entrance targets left hidden after a full walk').toBe(0);
  expect.soft(still.pinned, 'reduced motion: pinned sections').toBe(0);
});
