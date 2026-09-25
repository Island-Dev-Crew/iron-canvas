# Phase 4: FORGE — Structural Enhancement

> Upgrade the site's skeleton. Design engineering rules apply but must be ADAPTED to the existing design.

## The Rule

Respect the existing design. You're a surgeon adding capability, not an architect rebuilding from scratch. Every enhancement must feel like it was ALWAYS there.

> **★v5.2 — at R2–R4, FORGE runs as a GAUNTLET LOOP.** Where the register earns it, the
> structural build is not one-shot-and-refine: **fan out N candidate directions** for the
> signature surfaces (hero, key sections, the component/motion grammar), each `worktree-fleet`-
> isolated, shadowed by a **blind cross-family critic** scoring against the falsifiable bar
> (the pack's §5 VERIFY + the 7-axis audit read at the register + a North Star reference-peg
> diff). Loop until one clears, ship the winner. Fleet width R2 = 2 · R3 = 3 · R4 = 3–4, round
> cap 3, never start cold (needs the Design PRD + North Star from Phases 0–3.9). **OFF at
> R0/R1** — a utilitarian skeleton is built once, well (looping it is Anti-Pattern #17). Full
> protocol: [`../references/gauntlet-loop.md`](../references/gauntlet-loop.md).
> ★v6: the candidate directions are SCOUT's 2–3 **Direction Fusion variants** (which source leads
> the hero, the instrument, the commit) — never N random restyles — and the critic gains a fourth
> lens (a creative director) and scores **Axis 7 Aliveness** from the recordings.

## ★v6 — FORGE Performs the Score, and the Floor Ships at Every Register

**The agent writes the score; the runtime performs it.** Agent-B performs `score.json` (PRD §4)
with `runtime/canvas-score.js` — or, in React / Next, a faithful port with the same verbs and
personalities. Wiring, in four steps:

1. Mark `ic-js` on `<html>` before first paint (an inline `<script>` in `<head>`).
2. Hide the `[data-ic]` entrance targets behind a 3 s CSS failsafe, so nothing can stay hidden:
   `.ic-js [data-ic]{opacity:0} .ic-js:not(.ic-ready) [data-ic]{animation:ic-failsafe .5s 3s forwards}`
   `@keyframes ic-failsafe{to{opacity:1}}`.
3. Load GSAP + ScrollTrigger + Lenis (the `lenis` package). Reduced motion is decided before
   anything starts — the runtime never constructs Lenis in `reduced` or `static` mode.
4. `const show = performScore(score, { hooks })`; a WebGL scene subscribes with
   `show.on('progress', (actId, p) => world.setAct(actId, p))` — **one clock**, never a second
   scroll listener. `show.kill()` is the kill switch; `?motion=off` leaves the page fully readable.

**The aliveness floor ships at every register** — the register shapes the amplitude, nothing
removes it (Anti-Pattern #18 LIFELESS; VERIFY Axis 7):

| Floor | What FORGE builds | Quietest form (R0) |
|---|---|---|
| ARRIVAL | the score's `load` act — one choreography, ≤ 1.5 s, never everything at once | title → content → actions, 600–900 ms, three steps |
| HEARTBEAT | one perpetual element on a `data-breath` **wrapper** (never an element a shot also transforms), co-prime periods, paused off-screen and on hidden tabs | one breathing status dot, 2 s |
| HAND-FEEL | hover + press + focus on every control (below) | the same — no register waives it |
| BREATH | air (≥ 20 % of every viewport) + one ambient layer: grain felt not seen (.03–.04), a light ladder, or a mesh that breathes | air + a light ladder |
| COMPOSED STILL | reduced motion rests on the designed final frame; every entrance target visible | the same page, at rest |

## ★v6 — ASSET FORGE (5a) Runs in Parallel

While the build agents forge the page, the engine jobs written at PACKAGE 3.9b run beside them —
not after them:

```bash
node engines/blender/blender.mjs plan|run --job <job>.json          # clay rail, hero object, turntable, matcap
node engines/video/video.mjs     plan|run|ingest --job <shot>.json  # Seedance 2.5 shots and loops
node engines/audio/audio.mjs     plan|run --job <cue>.json          # cues and beds
```

Agent-D owns video + audio; Agent-F with Agent-D owns the meshes and the clay rail. `plan` prints
the cost before anything is spent. Every output lands in the run ledger (`.ic/runs/<ts>-<name>/`)
as a **candidate** — selection happens at Phase 5 GENERATE (the media tournament), never here. A
`missing` engine exits 2 with its plan and the build takes the named fallback; nothing blocks.

## Universal Upgrades (Always Add)

These improve any site regardless of style:

### Scroll-Triggered Reveals
The CSS-only (Tier 1) path — with the Score Runtime, mark entrance targets `data-ic` instead.
★v6: every reveal **arrives** on `--ease-arrive` (the calm expo-out exhale) — an overshoot on a
0.8 s reveal reads as a bounce, which is cheap. The hidden state applies only once JS is known to
run (`ic-js`) and never for more than 3 s, so no entrance target can stay hidden.
```css
.ic-js .reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s var(--ease-arrive),
              transform 0.8s var(--ease-arrive);
}
.ic-js .reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.ic-js:not(.ic-ready) .reveal:not(.visible) { animation: ic-failsafe 0.5s 3s forwards; }
@keyframes ic-failsafe { to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .ic-js .reveal { opacity: 1; transform: none; transition: none; }   /* the composed still */
}
/* Put .reveal on an INNER wrapper when the element has its own transition (hover lifts, borders):
   a later `transition:` of equal specificity silently replaces the reveal's. */
```
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
document.documentElement.classList.add('ic-ready');   // the observer owns the reveals now
```

### Hover/Active/Focus States
Every interactive element needs all three:
- **Hover**: Visual feedback on desktop (scale, glow, color shift)
- **Active**: Press feedback (slight scale-down, darken) — ★v6 a physical push: `scale(0.98)` or 1 px down
- **Focus**: Keyboard navigation (outline using site's accent color) — designed, never removed

★v6 Hand-feel is part of the aliveness floor: micro-moves (lifts, nudges, arrow ticks) ride
`--ease-tick` and stay ≤ 0.25 s; state changes (colour, border, shadow) ride `--ease-arrive`.

### Easing by Role ★v6 (was "Spring Curves")
Replace `ease` and `ease-in-out` with the role tokens — curves by ROLE, never by value
(`references/motion-language.md` §3):
```css
--ease-arrive:  cubic-bezier(0.16, 1, 0.3, 1);    /* every entrance + state change — the calm exhale */
--ease-tick:    cubic-bezier(0.34, 1.56, 0.64, 1); /* micro-moves ≤ 0.25 s ONLY — "the Iron Spring" */
--ease-breathe: cubic-bezier(0.37, 0, 0.63, 1);   /* ambient loops */
--ease-depart:  cubic-bezier(0.55, 0, 1, 0.45);   /* exits — accelerate away */
/* linear: rotation, marquees, scrub */
```
The v1–v5 tokens `--spring` (the overshoot, used for reveals), `--smooth` and `--snap` (a
back-in-out overshoot that collided with the `snap` personality) are retired. GSAP ease names
(`power2.out`, `expo.out`) live in JavaScript only — inside a CSS `transition` they are invalid
and the browser drops the whole declaration.

### Mobile Responsive
- `min-h-[100dvh]` (not `100vh` — accounts for mobile browser chrome)
- Touch targets minimum 44×44px
- No horizontal scroll on any viewport

### Grain/Noise Texture (When Appropriate)
```css
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* noise pattern */
  pointer-events: none;
  z-index: 9999;
}
```
Use on: luxury, editorial, artistic, vintage sites.
Skip on: corporate, medical, educational, clean/minimal sites.
★v6 Skipping grain never skips breath: the floor still needs air plus one ambient layer — a light
ladder (one hue at many alphas) or a mesh that breathes.

### Glassmorphism (When It Fits)
```css
.glass {
  background: rgb(var(--bg-rgb) / 0.1);   /* ★v6 RGB mirror token: a space-separated triplet */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```
Use on: modern, luxury, tech sites.
Skip on: traditional, heritage, community sites.

## Adaptive Enhancements (Respect the DNA)

### Typography
- **Keep** the existing font stack. Improve hierarchy:
  - Display: tighter letter-spacing (-0.02em to -0.04em)
  - Body: increase line-height (1.6-1.8)
  - Headings: adjust font-weight for more contrast
- **Only swap** if the fonts are genuinely bad (system defaults, Comic Sans, etc.)

### Colors
- **Keep** the existing palette. Enhance depth:
  - Add tinted shadows using the site's own hues
  - Create gradient variants of existing colors
  - Improve contrast ratios (WCAG AA minimum)
- **Never** replace colors with a "safer" or "more standard" palette

### Layout
- **Keep** the existing section order and structure
- **Enhance** with asymmetry, broken grids, overlapping elements
- **Add** whitespace where things feel cramped
- **Never** reorganize sections based on your preference

### Tinted Shadows
```css
/* Gold palette site */
box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);

/* Maroon palette site */
box-shadow: 0 20px 60px rgba(143, 42, 50, 0.15);

/* Navy palette site */
box-shadow: 0 20px 60px rgba(26, 54, 93, 0.15);

/* ★v6 — in tokens, through the RGB mirror */
box-shadow: 0 20px 60px rgb(var(--accent-rgb) / 0.15);
```
Always tint shadows to the site's dominant hue. Gray shadows are generic.

## Phase 4 Completion Criteria

- [ ] Scroll reveal animations added to all below-fold sections
- [ ] Hover/active/focus states on every interactive element
- [ ] Transitions use the role tokens — ★v6 arrivals on `--ease-arrive`; overshoot only in `--ease-tick`, ≤ 0.25 s
- [ ] ★v6 The score performed (`performScore` or a faithful port); one clock; the `ic-js` failsafe in place
- [ ] ★v6 The aliveness floor present: arrival · heartbeat · hand-feel · breath · composed still
- [ ] ★v6 ASSET FORGE (5a) ran the engine jobs in parallel (or recorded each fallback)
- [ ] ★v6 The design contract holds from the first build: `node scripts/ic-contract.mjs --contract design-contract.json <build>` reports zero violations (no colour, face, curve or duration outside the plan — Anti-Pattern #21 DEFAULTS AS DECISIONS)
- [ ] Mobile responsive verified on 375px viewport
- [ ] Grain texture added (if appropriate for this site's personality)
- [ ] Typography hierarchy improved without changing fonts
- [ ] Shadows tinted to site's palette
- [ ] All enhancements feel native to the existing design

---

*← [Phase 3: SCOUT](03-scout.md) | Back to [README](../README.md) | Next: [Phase 5: GENERATE →](05-generate.md)*
