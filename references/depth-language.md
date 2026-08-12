# Depth Language — Iron Canvas v5.0
## *The z-axis grammar. One language, three altitudes, dialed 0–1.*

> **Position in pipeline:** Phase 2 (FEEL) output → `design_intensity.systems.depth_language` → Phase 4 (FORGE) + Phase 6 (COMPOSE) input
> **What it replaces:** The `three_js_eligible: YES/NO` binary from Phase 0 — depth is no longer a project *type*, it is a *dial*
> **What it preserves:** DIS philosophy — the ceiling is the same for every project; the DNA decides how high to climb

---

## CORE PRINCIPLE

igloo.inc is not a different product category. It is **1.0 on a dial** that every Iron Canvas
project already sits somewhere on. A dashboard at 0.2 and a campaign world at 0.95 speak the
same z-axis grammar at different altitudes — the same way a minimal SaaS page and a maximal
fashion site speak the same design language at different intensities (see HDR section of
`references/design-intensity-scale.md`).

```
THE OLD QUESTION (v4.x):  "Is this a 3D project?"          → binary, brittle, Type-A-only
THE NEW QUESTION (v5.0):  "What altitude does the DNA demand?" → scaled, universal, DIS-gated
```

**The floor is never flat.** Even a Type C dashboard has near/mid/far. Composed depth
(shadow, blur, glass strata, parallax) is baseline craft, not a feature.

---

## SYSTEM 9: DEPTH LANGUAGE

**What it controls:** z-axis composition — layering, parallax, focus, atmosphere, WebGL scenes, camera
**Agent owner:** Agent-A (Foundation, Tier I tokens) + Agent-B (Motion, Tier II/III scenes) + Agent-C (UI, depth-aware components)
**Output:** depth tokens (`--elev-*`, `--fog-*`, `--parallax-*`), scene.js (Tier II+), camera-rail.js (Tier III)

| Intensity | Altitude | Behavior |
|-----------|----------|----------|
| 0.0 | — | Forbidden. Every project has ≥ 0.1. Flat is a bug, not a style. |
| 0.1–0.35 | **TIER I — COMPOSED** | CSS-only depth: elevation ramp, focus blur, glass strata, scroll parallax |
| 0.4–0.7 | **TIER II — STAGED** | One WebGL scene as a *window* in the DOM: hero moment, product orbit, data centerpiece |
| 0.75–1.0 | **TIER III — INHABITED** | The scene IS the site. Scroll = camera dolly. igloo.inc territory. |

*The 0.36–0.39 and 0.71–0.74 gaps are deliberate dead zones — a project commits to an
altitude; it does not hover between them. Round toward the DNA.*

---

## THE THREE ALTITUDES

### TIER I — COMPOSED DEPTH (0.1–0.35) — *CSS only, every surface, always*

Depth through composition. Zero WebGL. Nearly zero JS (IntersectionObserver only).

```
FOUR INSTRUMENTS:
1. ELEVATION RAMP     — tokenized shadow scale (--elev-0 … --elev-5), one light source,
                        consistent angle. Shadow choreography on hover/focus = depth motion.
2. FOCUS BLUR         — backdrop-filter as depth-of-field: background strata blur as
                        foreground content takes focus (modal, drawer, command palette).
3. GLASS STRATA       — fore/mid/back transparency bands (System 2 glass, organized by z).
                        Foreground rgba+blur strongest; background flattest.
4. SCROLL PARALLAX    — 2–3 velocity bands max (see Z-AXIS GRAMMAR ratios).
                        CSS transform only. No canvas, no scroll-jacking.
```

At 0.1–0.2: elevation ramp + focus blur only. At 0.3–0.35: all four instruments, including
one parallax moment. **This tier is the mandatory fallback target for everything above it.**

### TIER II — STAGED DEPTH (0.4–0.7) — *WebGL as a window, not a world*

One Three.js scene, maximum. The DOM remains the page; the canvas is a framed moment in it.

```
STAGED PATTERNS:
- HERO SCENE          — shader-material object/scene behind or beside the headline
- PRODUCT ORBIT       — Type D product as lit 3D model, scroll-scrubbed rotation
- DATA CENTERPIECE    — Type C mission-control globe / particle map / live 3D viz
- GENERATIVE PROMOTION — §19 algorithmic art (flow field, particles) lifted into 3D space
```

Rules of the stage: scene initializes lazily (IntersectionObserver), renders only on-screen,
never owns page scroll, and shares the token palette (scene fog/material colors from
feel-profile oklch ramp — never Three.js example-scene defaults).

### TIER III — INHABITED DEPTH (0.75–1.0) — *the scene is the site*

igloo.inc territory. The world loads, the camera moves through it, DOM content overlays it.

```
INHABITED REQUIREMENTS:
- CAMERA RAIL         — scroll maps to a spline dolly path (scroll owns the camera; see HARD RULE 3)
- WORLD MATERIAL      — one coherent material language: SDF/raymarch, voxel, point-cloud,
                        or PBR-lit geometry. ONE. Mixed metaphors read as template collage.
- ATMOSPHERE          — fog curve + DoF as brand identity (fog color from palette, not gray)
- DOM OVERLAY         — all text/nav/CTA lives in DOM layers above canvas (HARD RULE 1)
- LOADING PROTOCOL    — designed loader (progress = world streaming), then camera-settle intro.
                        The loader is part of the brand moment, not an apology.
```

---

## Z-AXIS GRAMMAR — shared vocabulary, all tiers

Four depth bands with fixed relationships. Tier I implements them in CSS; Tier III in world
units. Because the ratios hold, a brand's Tier I dashboard and Tier III campaign feel related.

```
┌────────────┬──────────────────┬───────────────┬────────────┬──────────────┐
│ Band       │ Contains         │ Parallax vel. │ Blur       │ Scale drift  │
├────────────┼──────────────────┼───────────────┼────────────┼──────────────┤
│ NEAR       │ primary content, │ 1.0 (locked   │ none       │ none         │
│            │ CTAs, key data   │ to scroll)    │            │              │
│ MID        │ cards, imagery,  │ 0.85–0.92     │ 0–4px      │ 0.98–1.0     │
│            │ secondary panels │               │            │              │
│ FAR        │ ambient shapes,  │ 0.6–0.75      │ 8–24px     │ 0.9–0.95     │
│            │ generative art   │               │            │              │
│ ATMOSPHERE │ mesh orbs, fog,  │ 0.3–0.5       │ 40px+      │ free         │
│            │ world backdrop   │               │            │              │
└────────────┴──────────────────┴───────────────┴────────────┴──────────────┘
```

**Depth serves hierarchy (HARD RULE 4):** NEAR = important. An element's band is assigned by
its information priority, never by what "looks cool floating."

**Light is singular:** one implied light source across all bands and all tiers. Tier I shadow
angle = Tier II scene key light = Tier III sun/void direction.

---

## CAMERA CHOREOGRAPHY (Tier II–III)

Camera motion is BPM-conditioned the same way kinetic typography timing is:

```
contemplative ≥ 7  → slow dolly (8–12s per section), long ease curves, generous settle
fast ≥ 7           → snap rails, hard cuts between camera stations, 0.6–1.2s moves
organic ≥ 7        → curved spline paths, gentle roll, handheld micro-drift (±0.5°)
technical ≥ 7      → orthographic moments, axis-locked moves, zero roll
serious ≥ 8        → no roll ever, minimal FOV change, dignity in restraint
playful ≥ 7        → FOV breathing, overshoot easing, camera reacts to cursor (±2°)
```

Focus pulls (DoF rack between bands) are the Tier III signature move — use at section
transitions, maximum once per section.

---

## BPM ACTIVATION DRIVERS

```
ALL projects                      → minimum 0.1  (composed depth is baseline craft)
refined ≥ 6                       → minimum 0.2  (elevation + focus blur discipline)
bold ≥ 6                          → minimum 0.4  (Tier II unlock — one staged scene)
bold ≥ 8 AND avant_garde ≥ 8      → minimum 0.75 (Tier III unlock — inhabited world)
maximal ≥ 7                       → +0.1 to computed intensity (denser atmosphere)

SUPPRESSION CAPS:
minimal ≥ 8                       → cap 0.35 (depth via space + shadow only, no WebGL)
classic ≥ 8                       → cap 0.5  (staged allowed, worlds read as gimmick)
serious ≥ 9                       → cap 0.4
```

**Mode ceilings (consistent with DIS):** SOLO caps at 0.35 · SWARM at 0.7 · MISSION at 1.0.
Surface packs apply their own ceilings on top (see `surfaces/SURFACE-PACK-CONTRACT.md`) —
e.g. app-dashboard caps depth at 0.5: a mission-control centerpiece is welcome; a voxel
world behind a data grid is Anti-Pattern #15.

**Resolution order:** Performance Tier → surface pack cap → BPM suppression → mode ceiling → BPM floors → **Treatment Register cap ★v5.1** (CD3, the outermost clamp: `min(result, register depth ceiling)` — R0 0.2 · R1 0.5 · R2 0.7 · R3 0.9 · R4 1.0). The register clamp is applied LAST so a `bold≥6` / `avant_garde` BPM depth floor can never open a Tier-II scene on an R0/R1 task — a WebGL backdrop behind a data grid is Anti-Pattern #15, and CD3 stops it in the math, not just at VERIFY.

---

## ENGINE REGISTRY — lightest that hits the look

```
┌──────────────────────────┬──────┬─────────┬────────────────────────────────────┐
│ Engine                   │ Tier │ Weight  │ When                               │
├──────────────────────────┼──────┼─────────┼────────────────────────────────────┤
│ CSS 3D transforms        │ I    │ 0 KB    │ Always — the composed-depth base   │
│ GSAP ScrollTrigger       │ I    │ ~28 KB  │ Parallax bands, already in stack   │
│ Three.js (vanilla)       │ II   │ ~150 KB │ Single staged scene, no React      │
│ React Three Fiber + drei │ II–III│ ~180 KB │ React project OR Tier III world    │
│ GLSL raymarching / SDF   │ III  │ +shader │ igloo-tier world material          │
│ WebGPU + TSL             │ III  │ ~160 KB │ bold ≥ 9 frontier; WebGL2 fallback │
│                          │      │         │ MANDATORY (Safari/older devices)   │
│ Unreal Engine (via MCP)  │ —    │ native  │ ADAPTER SPEC ONLY — see surfaces/  │
│                          │      │         │ game-realtime/UNREAL-ADAPTER.md    │
└──────────────────────────┴──────┴─────────┴────────────────────────────────────┘
```

Selection rule mirrors §19: climb the registry only when the look demands it. A Tier II
product orbit does not need R3F because "we might scale it."

---

## PERFORMANCE GATES

```
FRAME BUDGET (all WebGL tiers):
  60fps target / 16.6ms frame — measured, not assumed
  Tier II:  ≤ 100 draw calls, ≤ 64MB texture memory, scene ≤ 1.5MB gzipped
  Tier III: ≤ 300 draw calls, ≤ 256MB texture memory, world streams progressively

PERFORMANCE TIER INTERACTION (hard caps, same order as DIS):
  T1 MARKETING (LCP < 2.5s):  depth capped 0.35 — Tier I only
  T2 ANIMATED  (LCP < 3.5s):  depth capped 0.7  — staged scenes, lazy-loaded
  T3 IMMERSIVE (LCP < 4.0s):  full range — DOM shell paints first, world streams behind loader

FALLBACK LADDER (HARD RULE 2 — mandatory, built not bolted):
  Tier III → Tier II:  camera rail becomes scroll-scrubbed hero scene
  Tier II  → Tier I:   scene becomes seeded static render (§19 static-fallback discipline)
  Tier I   → floor:    parallax off, elevation ramp stays. NEVER to flat.

TRIGGERS: prefers-reduced-motion · no WebGL2 · <30fps sustained 3s (auto-demote live)
          · save-data header · battery < 20% where readable
```

---

## HARD RULES

1. **DOM-FIRST CONTENT** — every word of copy, every nav item, every CTA exists in the DOM.
   Canvas renders atmosphere and objects, never text content. (a11y, SEO, i18n non-negotiable.)
2. **FALLBACK LADDER** — each tier degrades to the tier below, never to flat. Built during
   FORGE, not patched during VERIFY.
3. **SCROLL OWNS THE CAMERA** — camera position is a pure function of scroll position.
   No autonomous drift that fights the user. (Cursor-reactive ±2° micro-response allowed.)
4. **DEPTH SERVES HIERARCHY** — z-band assignment follows information priority. If the
   primary CTA is in FAR, the grammar is broken.
5. **ONE WORLD** — a single scene/material metaphor per project. Voxel hero + particle
   section + PBR product = template collage, not identity.

---

## ANTI-PATTERN #15: DEPTH THEATER ★v5.0

**What it looks like:** A spinning torus knot behind a pricing table. A voxel world on a
Tier 1 marketing page. Three different 3D metaphors on one site. Text baked into canvas.
"We added Three.js" as the design story.

**Why it happens:** Depth treated as a feature to bolt on instead of an altitude the DNA
sets. The v4.x binary (`three_js_eligible: YES`) invited this — YES became "add 3D somewhere."

**How to prevent:** Depth intensity comes out of the DIS calculation like every other system.
If the BPM doesn't unlock Tier II, there is no scene. If it unlocks Tier III, the world IS
the design — not a garnish on a normal page.

**Red flags:** WebGL scene with default Three.js lighting/colors · depth intensity > 0.4 on
a project where `minimal ≥ 8` · canvas element containing rendered text · more than one
`<canvas>` world per page · torus knots, anywhere, ever.

---

## NORTH STAR SCOUT SEARCHES (Tier III calibration)

```
"igloo inc website awwwards site of the year voxel"
"lusion labs webgl immersive site"
"active theory webgl experience portfolio"
"unseen studio award winning webgl"
"raymarching SDF website hero immersive"
"webgl scroll camera dolly site fog depth"
```

Study the *restraint*: igloo-tier sites have ONE material language, palette-locked fog,
and DOM-overlaid type. The wow is coherence, not effect count.

---

## VISUAL REFERENCE

**`showcase/depth.html`** ★v5.0 — the live proof. A standalone, no-build page where scroll
IS the dial: composed bento (Tier I instruments + grammar-ratio parallax) → staged seeded
point-emblem in a window (Tier II) → inhabited camera-rail world with palette-locked fog
(Tier III). Seeded 5417, DPR-capped, IO-paused, reduced-motion static, no-WebGL fallback
ladder — the page obeys every rule it demonstrates. (The main showcase's flow-field
background remains a Tier I/II boundary example: §19 art in the ATMOSPHERE band.)

---

*Depth Language — Iron Canvas v5.0*
*"The floor is never flat. The ceiling is a world."*
*"igloo is not a category. It is 1.0 on the dial."*
