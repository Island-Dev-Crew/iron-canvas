# Evidence QA Reference

Iron Canvas IMMERSIVE work must be proven in a browser. Static claims are not enough.

★v6 — *Adjectives direct. Evidence proves.* Sensory words (the lens, the reference vibe, each
act's emotion) are required inputs upstream; here, at the gate, they are banned as unproven
claims. And aliveness is proven too: a recording of the arrival, the heartbeat and the composed
still — at every register, never waived (VERIFY Axis 7).

## Evidence Classes ★v6

Every claim in an evidence report — and every claim about a reference — carries a class:

| Class | Meaning | Example |
|---|---|---|
| **Observed** | seen directly in a recording, a live session, a capture or the source | "frames drawn = 212 at station 3; recorded at 1440×900" |
| **Derived** | inferred from observed frames or numbers | "the arrival settles by about 1.3 s; the easing looks like expo-out" |
| **Unverified** | not seen — a guess, a gallery still, a claim in copy or a self-report | "it runs at 60 fps on phones" |

Only **Observed** evidence clears a gate item. A still never proves motion, scroll, hover or
timing. Easing read from frames is **Derived** at best.

## Minimum Evidence Set

- Desktop screenshot after load sequence settles
- Mobile screenshot at Pixel 5 / 393px-class viewport
- Reduced-motion screenshot or assertion
- Console/page error capture
- No horizontal overflow assertion
- Fallback or kill-switch assertion
- Filled `templates/immersion-scorecard.md`

## The Aliveness Evidence Set ★v6 (VERIFY Axis 7 — never waived)

- **A video of the first 5 seconds** — the arrival: one choreographed first ≤ 1.5 s, never
  everything at once.
- **A 15-second slow scroll** — the Taste Doctrine's "15-second scroll", now a test: the heartbeat,
  the quiet chapters, the signature, the field receding and returning.
- **A reduced-motion recording** — the composed still: every entrance target at its final state,
  nothing blank, no pins, no scrubs, no breath.
- **Automated proxies:**
  - an arrival timeline exists (a `load` act in the score, or a load timeline that finishes by 1.5 s);
  - at least one animation is running in view at rest (3 s after load), and it pauses off-screen
    and on a hidden tab;
  - 100 % of interactive elements change on hover **and** on focus (a state diff per control);
  - exactly one scroll owner per viewport (only the score's scrub acts pin or scrub);
  - reduced motion shows every entrance target (`[data-ic]`) at its final state.
- **A critic's eye** on the recordings: *"Does the motion serve the story, or is it noise?"* ·
  *"What would make someone say 'show me that again'?"* · *"Which section feels leftover?"*

## The Scroll-Stepped Capture ★v6

`templates/scroll-capture.spec.ts` steps the scroll and dwells at every act station (or seeks the
Score Runtime directly — `window.__icScore.seek(actId, p)` at 0.5 and 1), screenshots each station
at **1440×900** and **390×844**, and asserts:

- frames drawn > 0 and a lit-pixel ratio above threshold for every WebGL canvas (a mounted-but-black
  canvas is an automatic failure);
- page progress reaches ≈ 1 at the end of the scroll;
- zero console or page errors; zero horizontal overflow;
- each act's declared `reduced` state under `prefers-reduced-motion`.

Every act's station screenshot is then compared against the emotion the score declared for it.

## Playwright Gate

A passing smoke test should verify:

```ts
await page.goto('/');
await expect(page.locator('canvas, [data-fallback], .hero__fallback').first()).toBeVisible();
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
expect(overflow).toBeLessThanOrEqual(1);
expect(consoleErrors).toEqual([]);

// ★v6 ALIVE AT REST — something is still moving 3 s after load (CSS/WAAPI animation or an active GSAP tween)
await page.waitForTimeout(3000);
const alive = await page.evaluate(() =>
  document.getAnimations().some((a) => a.playState === 'running') ||
  Boolean((window as any).gsap?.globalTimeline.getChildren(true, true, false).some((t: any) => t.isActive())));
expect(alive).toBe(true);

// ★v6 NO ENTRANCE TARGET LEFT HIDDEN — once the runtime has taken over
const hidden = await page.evaluate(() =>
  Array.from(document.querySelectorAll('[data-ic]')).filter((el) => getComputedStyle(el).opacity === '0' &&
    el.getBoundingClientRect().top < window.innerHeight).length);
expect(hidden).toBe(0);
```

**Headless SwiftShader under-reports frame rate — never judge fps there.** Software-rendered
headless Chromium measures the CPU rasterizer, not the visitor's GPU. Record fps on a real GPU
(headed browser or a physical device); use headless runs for screenshots, errors, overflow and the
aliveness proxies only.

## Automatic Failures

Any of these fail the gate regardless of subjective score:

- Unhandled console/page errors
- Main content inaccessible without WebGL
- Horizontal overflow on mobile
- Reduced-motion still animates perpetual motion/parallax
- No static fallback or kill-switch
- No evidence screenshots
- Scorecard missing or average below 4.0
- ★v6 A mounted-but-black canvas (frames drawn = 0, or lit-pixel ratio below threshold)
- ★v6 Nothing alive at rest (Axis 7)
- ★v6 Two scroll owners in one viewport (Anti-Pattern #19 TWO CLOCKS)
- ★v6 An entrance target that can stay hidden (no `ic-js` failsafe)

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
- ★v6 Station captures (every act, 1440×900 + 390×844):
- ★v6 First-5-seconds video / 15-second slow scroll / reduced-motion recording:
- ★v6 Aliveness proxies (arrival · running at rest · hover+focus sweep · one scroll owner · entrance targets final):
- ★v6 Evidence class of each claim (Observed / Derived / Unverified):
- Remaining risks:
```

## Philosophy

A beautiful screenshot with console errors is not done. A green test with ugly visuals is not done. IMMERSIVE requires both: craft and proof.
★v6 — and a green, beautiful, motionless page is not done either. Craft, proof, and life.
