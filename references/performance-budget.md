# PERFORMANCE BUDGET
## *Iron Canvas — Phase 0 Integration*

> Performance is not a QA afterthought.
> It is a design constraint set at the start of every project.
> Every upstream decision — Three.js or not, images or video, font strategy —
> must be made against a budget, not retrofitted.

---

## STEP 1: ASSIGN A PERFORMANCE TIER IN PHASE 0

```
TIER 1 — MARKETING / LANDING (fastest)
  Target:  LCP < 2.5s, CLS < 0.1, INP < 200ms
  Constraints:
    → No Three.js / WebGL
    → Max 3 web fonts, self-hosted preferred
    → Images: WebP with AVIF fallback, lazy loading on all below-fold
    → No video autoplay above fold
    → Max JS bundle: 150KB gzipped
    → Scroll animations: CSS-first (Intersection Observer), GSAP only for key moments

TIER 2 — ANIMATED / PORTFOLIO (balanced)
  Target:  LCP < 3.5s, CLS < 0.1, INP < 300ms
  Constraints:
    → Three.js allowed ONLY if avant-garde ≥ 8, single scene only
    → Max 4 web fonts (use variable fonts to reduce requests)
    → Images: AVIF → WebP → JPEG decision tree
    → GSAP ScrollTrigger: full usage, but must lazy-init below fold
    → Max JS bundle: 300KB gzipped (GSAP + Lenis included)
    → Scroll sequences: WebP frames, progressive load ±10 from position

TIER 3 — IMMERSIVE / WEBGL (performance via progressive enhancement)
  Target:  LCP < 4.0s for initial shell, enhanced content loads progressively
  Constraints:
    → Three.js scenes must be in a separate chunk (dynamic import)
    → Core content visible without JS (progressive enhancement)
    → Video: compressed WebM, poster image always provided
    → Canvas scroll sequences: offscreen canvas where supported
    → Max initial JS: 200KB — defer everything else
    → Skeleton loading screens for WebGL content
```

### ★v6 — The score's budgets (web pack, R3/R4 defaults)

The score written at PACKAGE (3.9) must fit these; where a tier above is looser, the tighter number
wins:

```
FIRST-LOAD JS     ≤ 180 kB gzipped — three.js (and any WebGL scene) lazy-loaded in its own chunk
ABOVE-THE-FOLD    media ≤ 6 MB (hero film / poster / first frames — everything before the first scroll)
TYPE              one display face + one text face (families — every weight file still counts
                  against the tier's font-request cap)
DPR               1.5 desktop / 1 mobile by default (2 is the ceiling, never the default)
PARTICLES         counts set by viewport, never one number for every screen
```

The aliveness floor costs almost nothing and is never cut for budget: a CSS heartbeat, a still
grain film, hover/focus states and a composed reduced-motion path fit inside Tier 1.

---

## STEP 2: IMAGE FORMAT DECISION TREE

```
Is the image a photograph?
  ├─ Yes → Is the browser support context modern (2023+)?
  │   ├─ Yes → AVIF first, WebP fallback, JPEG last resort
  │   └─ No  → WebP first, JPEG fallback
  └─ No  → Is it an illustration/graphic with transparency?
      ├─ Yes → SVG (if vector) or PNG-8 (if raster)
      └─ No  → SVG preferred for all icons and UI elements

Image sizing rule:
  → NEVER serve an image larger than its display size × 2 (for retina)
  → Use srcset for responsive images
  → Blur-up technique: load 20px placeholder → swap to full on load

Lazy loading:
  → ALL images below fold: loading="lazy"
  → Hero image: loading="eager" with fetchpriority="high"
  → Scroll sequence frames: load on demand (not in DOM until needed)
```

---

## STEP 3: FONT LOADING STRATEGY

```
OPTION A — Self-hosted (preferred for performance)
  → Download fonts, host in /fonts/
  → Preload critical fonts in <head>
  → font-display: swap for all @font-face rules
  → WOFF2 only (90%+ browser support, smallest format)

OPTION B — Variable fonts (fewer requests, more flexibility)
  → One font file covers all weights
  → Enables GSAP font-weight animation (editorial effect)
  → font-variation-settings: 'wght' 400 → animate to 700 on scroll

OPTION C — Google Fonts (convenience, slight perf cost)
  → Always use &display=swap parameter
  → Preconnect: <link rel="preconnect" href="https://fonts.googleapis.com">
  → Never load more than 3 font families this way

NEVER:
  → Adobe Fonts (Typekit) in performance-sensitive contexts (slow FOUT)
  → Font imports inside CSS files (blocks rendering)
  → More than 4 font file requests on page load
```

---

## STEP 4: JAVASCRIPT BUNDLE STRATEGY

```
ALWAYS:
  → GSAP: import only what's used
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    — NOT: import * from 'gsap'

  → Three.js: dynamic import (code split)
    const { THREE } = await import('./three-scene.js');

  → Lenis: import only after DOM ready (defer scroll smooth init) — ★v6 the `lenis` package;
    decide reduced motion first and never construct it for reduced-motion visitors

  → Barba.js: load only on Tier 3-4 builds, dynamic import

SPLIT POINTS (where to create separate chunks):
  → Three.js scenes → own chunk
  → Page-specific GSAP timelines → lazy load per page
  → Scroll sequence controller → own chunk, lazy init
  → Analytics → load after all user-facing content

NEVER:
  → Import all of lodash (import only specific functions)
  → Blocking <script> tags in <head> (always defer or async)
  → Loading unused GSAP plugins (each plugin adds ~20-40KB)
```

---

## STEP 5: CORE WEB VITALS CHECKLIST

Agent-E runs this at Phase 7 (VERIFY):

```
LCP (Largest Contentful Paint):
  □ Hero image has loading="eager" fetchpriority="high"
  □ Hero image is preloaded in <head>
  □ No render-blocking resources above fold
  □ Font preloaded for hero text (if text is LCP element)

CLS (Cumulative Layout Shift):
  □ All images have explicit width and height attributes
  □ Fonts: font-display: swap (not block)
  □ No dynamically injected content above existing content
  □ Ad slots / embeds have reserved space

INP (Interaction to Next Paint):
  □ Event listeners use passive: true where possible
  □ No long tasks blocking main thread (check Chrome DevTools)
  □ GSAP animations run on compositor thread (transform + opacity only)
  □ Scroll event handlers debounced or replaced with IntersectionObserver

QUICK LIGHTHOUSE TARGETS:
  Performance:    90+  (Tier 1), 80+  (Tier 2), 70+  (Tier 3)
  Accessibility:  95+  (all tiers — non-negotiable)
  Best Practices: 95+  (all tiers)
  SEO:            90+  (all tiers)
```

---

## STEP 6: SCROLL SEQUENCE OPTIMIZATION

For 60-frame scroll sequences (Phase 5/6):

```
FRAME FORMAT:
  → WebP at quality 75-82 (best compression/quality for photographic sequences)
  → Target: 30-60KB per frame
  → 60 frames × 50KB average = 3MB total (acceptable with lazy loading)

LOADING STRATEGY:
  → Initial load: frames 0-10 only
  → Buffer: always keep ±8 frames loaded around current position
  → Preload next: when user reaches frame N, preload N+8
  → Unload past: frames beyond N-10 removed from memory

FALLBACK (★v6 — reconciled with Anti-Pattern #7 and SKILL.md §9):
  → Mobile: fewer frames (frames-mobile/ at half resolution, every other frame — FRAME_STEP 2)
    or a static poster. Scroll-tied motion is NEVER a <video>: video cannot scrub backwards,
    cannot sync overlays per frame, and hits mobile autoplay limits.
  → A LOOPING background (not scroll-tied) may be a muted video: autoplay + loop + muted +
    playsinline, preload="metadata", poster= attribute always set
  → Reduced motion: the section rests on its designed still — no pin, no scrub

CANVAS vs. IMG SEQUENCE:
  → Canvas preferred: paint frames directly, no DOM thrashing
  → IMG sequence fallback: works but slower for many frames
```

---

## INTEGRATION POINT: Phase 0 ORIENT output

```json
{
  "performance": {
    "tier": "1 | 2 | 3",
    "lcp_target": "2.5s",
    "font_strategy": "self-hosted | variable | google",
    "three_js_allowed": false,
    "scroll_sequence_format": "webp-frames | video | none",
    "lazy_load_below_fold": true,
    "bundle_budget_kb": 150
  }
}
```

This JSON gates all Agent decisions downstream.
Agent-B checks three_js_allowed before writing any WebGL.
Agent-D checks scroll_sequence_format before generating frames.
Agent-E runs the Core Web Vitals checklist at Phase 7.

---

*Iron Canvas v4.2 — references/performance-budget.md*
