# Evidence QA Reference

Iron Canvas IMMERSIVE work must be proven in a browser. Static claims are not enough.

## Minimum Evidence Set

- Desktop screenshot after load sequence settles
- Mobile screenshot at Pixel 5 / 393px-class viewport
- Reduced-motion screenshot or assertion
- Console/page error capture
- No horizontal overflow assertion
- Fallback or kill-switch assertion
- Filled `templates/immersion-scorecard.md`

## Playwright Gate

A passing smoke test should verify:

```ts
await page.goto('/');
await expect(page.locator('canvas, [data-fallback], .hero__fallback').first()).toBeVisible();
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
expect(overflow).toBeLessThanOrEqual(1);
expect(consoleErrors).toEqual([]);
```

## Automatic Failures

Any of these fail the gate regardless of subjective score:

- Unhandled console/page errors
- Main content inaccessible without WebGL
- Horizontal overflow on mobile
- Reduced-motion still animates perpetual motion/parallax
- No static fallback or kill-switch
- No evidence screenshots
- Scorecard missing or average below 4.0

## Evidence Report Format

```md
# IMMERSION Evidence Report

- URL/path tested:
- Browser/runtime:
- Commands:
- Screenshots:
- Console errors:
- Mobile overflow:
- Reduced motion:
- Fallback/kill-switch:
- Scorecard average:
- Remaining risks:
```

## Philosophy

A beautiful screenshot with console errors is not done. A green test with ugly visuals is not done. IMMERSIVE requires both: craft and proof.
