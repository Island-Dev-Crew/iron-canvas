# Technical Validation Report
## Iron Canvas v4.2 — Phase 3.5 Output

*Produced by: Validation Agent*
*Fill in every section. BLOCKED features halt the pipeline until Orchestrator decides.*

---

**Project:** ___
**Date:** YYYY-MM-DD
**Tech Stack:** ___
**Framework:** React / Next.js / Vanilla JS / Vue / Other

---

## Executive Summary

*1-2 sentences: overall feasibility verdict and any critical notes.*

___

---

## Feature Validation Results

| Feature | Status | Performance Risk | Key Constraint |
|---------|--------|-----------------|----------------|
| Scroll engine (Canvas) | FEASIBLE / CONDITIONAL / BLOCKED | LOW / MED / HIGH | ___ |
| GSAP + ScrollTrigger | FEASIBLE | LOW | ___ |
| Lenis smooth scroll | FEASIBLE | LOW | ___ |
| SplitText (GSAP) | FEASIBLE | LOW | Free since GSAP 3.13 — use aria: 'auto' + autoSplit |
| WebGL / Three.js | FEASIBLE / CONDITIONAL / BLOCKED | HIGH | Mobile fallback required |
| Custom cursor | FEASIBLE | LOW | Touch detection required |
| Page transitions (Barba) | FEASIBLE / CONDITIONAL / BLOCKED | LOW | Multi-page only |
| Audio TTS / WebSocket | FEASIBLE / CONDITIONAL / BLOCKED | MEDIUM | HTTPS + user gesture |
| Grain overlay | FEASIBLE | LOW | — |

---

## Scroll Engine Verification

```
Frame count:          ___
Avg frame size:       ___ KB
Total frame size:     ___ MB  ← must be ≤ 5MB
Resolution desktop:   1920×1080
Resolution mobile:    960×540

Budget check:
  [PASS] Total ≤ 5MB? ___ MB
  [PASS / FAIL] LCP impact acceptable? ___
  [PASS / FAIL] 30fps minimum on low-end mobile? ___

Framework compatibility:
  React: dynamic import required (import('gsap/ScrollTrigger'))
  Next.js: 'use client' directive + useEffect for canvas init
  Vanilla: direct script tags, no issues
```

---

## WebGL / Three.js (if planned)

```
Eligible: Avant-garde score ___ (need ≥ 8) | Bold score ___ (need ≥ 8)
Status: ELIGIBLE / NOT ELIGIBLE

If eligible:
  Mobile fallback designed: YES / NO → [description]
  GPU budget: LOW (simple geometry) / MEDIUM (particles) / HIGH (custom shaders)
  renderer.dispose() planned: YES / NO
  devicePixelRatio cap at 2: YES / NO (required)
```

---

## Page Transitions

```
Site type: Multi-page / SPA
Barba.js eligible: YES / NO (SPA = no)
If SPA: Framer Motion AnimatePresence or GSAP route hooks
Routing system: ___
Compatibility issues found: ___
```

---

## Audio / TTS (if planned)

```
API: Murf Falcon / ElevenLabs / Web Speech API
Protocol: WebSocket / REST polling / native browser
HTTPS requirement: Confirmed for production? YES / NO
AudioContext user-gesture: Handled? YES / NO → [how]
Latency budget: [TTS avg latency ___ms] vs [scroll lead time ___ms]
  Verdict: FEASIBLE / TOO SLOW (need pre-trigger or alternative)
Mobile fallback: ___
```

---

## Licensing Verification (★v6)

```
GSAP plugins planned: ScrollTrigger / SplitText / Flip / MorphSVG / DrawSVG
  → the entire GSAP toolset is free, including commercial use, since 3.13 — no licence gate
Fonts: every display + text face has a FontRecord with licence certainty 10/10? YES / NO
  (references/typography-system.md Step 0 — trials are specimen-only)
Media: every generated or sourced asset carries rights in its provenance sidecar? YES / NO
Paid engines (Seedance / audio / imagery): budget.credit_cap_usd set in canvas.config.json? YES / NO
Film renderer: HyperFrames (Apache-2.0) / Remotion (company licence above 3 employees) → ___
```

---

## CONDITIONAL Feature Modifications

*List exact changes required to make CONDITIONAL features proceed.*

| Feature | Required Modification |
|---------|----------------------|
| ___ | ___ |

---

## BLOCKED Features

*STOP — Report these to Orchestrator before Design PRD is packaged.*

| Feature | Block Reason | Recommended Alternative |
|---------|-------------|------------------------|
| ___ | ___ | ___ |

---

## Performance Budget Verification

```
LCP target: < ___s
  Primary LCP candidate: ___
  Optimized: YES / NO / CONDITIONAL

CLS target: < 0.1
  Risk elements: images without dimensions, late-loading fonts
  Addressed: YES / NO

JS budget: ___ KB
  GSAP core: ~30KB gzip
  Three.js: ~160KB gzip (if applicable)
  Lenis: ~4KB gzip
  Barba.js: ~7KB gzip (if applicable)
  Estimated total: ___ KB
  Within budget: YES / NO → [if no: which to defer/lazy-load]
```

---

## Sign-Off

```
Overall status:
  [ ] ALL CLEAR — Proceed to Phase 3.9 (Design PRD)
  [ ] CONDITIONAL — Proceed with documented modifications above
  [ ] HOLD — Orchestrator decision required on BLOCKED features

Validation Agent: ___
Date: ___
```

---
*← [Phase 3.5 Guide](../phases/03.5-validate.md) | [SKILL.md](../SKILL.md)*
