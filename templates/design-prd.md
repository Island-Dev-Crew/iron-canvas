# Design PRD Template
## Iron Canvas v6 — Phase 3.9 Output

*Instructions: Orchestrator fills this completely before dispatching to Build Agents.*
*Delete all instruction lines (in italics) before saving final PRD.*
*Save as: design-prd.md in project root*
*★v6: write the score (`score.json`) before Section 4 — Section 4 is the score, summarized. Run `node scripts/ic-preflight.mjs iron_canvas_output/` before dispatch; errors block it. Write `design-contract.json` (from `templates/design-contract.json`) from Section 1's design plan; `node scripts/ic-contract.mjs --contract design-contract.json <build>` checks every build.*

---

# IRON CANVAS DESIGN PRD

**Project:** ___
**Type:** A / B / C / D / E / F / G
**Mode:** SOLO / SWARM / MISSION
**Register:** R0 / R1 / R2 / R3 / R4 ★v6 | **Surface:** web / app-dashboard / immersive-3d / game-realtime
**Date:** YYYY-MM-DD
**North Star:** `north-star-reference.png`
**Score:** `iron_canvas_output/score.json` — preflight: PASS / [errors] ★v6
**Validation Status:** All FEASIBLE / [n] CONDITIONAL — *see Section 8*

---

## SECTION 1: DESIGN DNA SUMMARY
*Source: site-dna-profile.json — Agent-A token system reference*

```
Dominant bg:    #______
Secondary bg:   #______
Text primary:   #______
Text muted:     #______
Accent:         #______
Accent-2:       #______
Border:         rgb(var(--text-rgb) / 0.12)
Accent RGB:     __ __ __  ← ★v6 space-separated triplet: rgb(var(--accent-rgb) / α) — three.js reads the same
Text RGB:       __ __ __
Ground RGB:     __ __ __  ← scrims, fog, the WebGL ground

Display font:   _______, weights _____
Body font:      _______, weights _____
Mono font:      _______ or null

Base unit:      ___px
Max width:      ___px
Grid columns:   ___

Brand Personality Matrix (1-10):
  Minimal   [__] ←——→ [__] Maximal
  Serious   [__] ←——→ [__] Playful
  Classic   [__] ←——→ [__] Avant-garde
  Digital   [__] ←——→ [__] Organic
  Quiet     [__] ←——→ [__] Bold      → Cursor: native / trailing / magnetic (from the DIS dial)
  Fast      [__] ←——→ [__] Contemplative → Pacing: fast / medium / slow

Design plan ★v6 (CD3 Law 3 — written before code, reviewed for genericness before the first component):
  Colours (4–6, named, with roles): ___ · ___ · ___ · ___
  Type families (1–2):              ___ / ___
  Scale:                            ___
  Machine-readable as:              design-contract.json (3.9d) — every slot a decision, never a pre-fill
```

---

## 2. EMOTIONAL TARGET — THE FEEL BRIEF
*Hard constraint — ALL agents honor this. Anti-feelings are vetoed at any decision point.*

```
Lens: [one sentence — how the audience should feel when they arrive]
Primary (first 3 s): [emotion] | After: [the transformation]
Anti-feelings: [list — HARD VETO; always includes "lifeless / mechanical"]
Reference vibe: "[walking into ___ — light, temperature, tempo]" | Feel line: [3 adjectives · material · tempo]
Mechanism: [one sentence] → Signature moment: [how the page acts it out]
Kinetic signature: personality [silk/tide/gravity/spark/snap] · accent [bloom/none]
  arrival [≤1.5 s, one sentence] · heartbeat [element, co-prime periods] · hand-feel [lift/press/lean]
  breath [air + ambient layer] · still path [what reduced motion shows]
```

*Secondary emotions: ___, ___ (from feel-profile.json).*

---

## SECTION 3: CSS DESIGN TOKEN SYSTEM
*Agent-A executes. Agent-B and Agent-C reference every variable from here.*

```css
:root {
  /* COLORS */
  --color-bg:           #______;
  --color-bg-2:         #______;
  --color-text:         #______;
  --color-text-muted:   #______;
  --color-accent:       #______;
  --color-accent-2:     #______;
  --accent-rgb:         __ __ __;   /* ★v6 mirror of --color-accent: space-separated triplet */
  --text-rgb:           __ __ __;   /* mirror of --color-text */
  --bg-rgb:             __ __ __;   /* mirror of --color-bg */
  --color-border:       rgb(var(--text-rgb) / 0.12);

  /* TYPOGRAPHY */
  --font-display: '___', serif;
  --font-body:    '___', sans-serif;

  /* FLUID TYPE SCALE */
  --text-hero:  clamp(3.5rem, 9vw, 8rem);
  --text-3xl:   clamp(2rem, 5vw, 3rem);
  --text-2xl:   clamp(1.5rem, 4vw, 2rem);
  --text-xl:    clamp(1.25rem, 3.5vw, 1.5rem);
  --text-lg:    clamp(1.125rem, 3vw, 1.25rem);
  --text-base:  clamp(1rem, 2.5vw, 1.125rem);
  --text-sm:    clamp(0.875rem, 2vw, 1rem);

  /* SPACING */
  --space-section: clamp(5rem, 12vw, 10rem);
  --space-32: 8rem; --space-16: 4rem;
  --space-8:  2rem; --space-4:  1rem;
  --space-2:  0.5rem;

  /* MOTION — by ROLE, never by value ★v6 (references/motion-language.md §3)
     The v1–v5 names --spring / --spring-slow were inverted relative to the original page and are
     retired: arrivals never overshoot; overshoot lives only in the tick. */
  --ease-arrive:  cubic-bezier(0.16, 1, 0.3, 1);    /* every entrance + state change — the calm exhale */
  --ease-tick:    cubic-bezier(0.34, 1.56, 0.64, 1); /* micro-moves ≤ 0.25 s only — "the Iron Spring" */
  --ease-breathe: cubic-bezier(0.37, 0, 0.63, 1);   /* ambient loops */
  --ease-depart:  cubic-bezier(0.55, 0, 1, 0.45);   /* exits — accelerate away */
  --dur-hand:   180ms; --dur-state: 320ms;
  --dur-arrive: 850ms; --dur-hero: 1400ms;
  --stagger-arrive: 120ms;
  --breath: 6s;        /* heartbeat base — co-prime partners 4s · 7s · 11s · 13s */

  /* DEPTH — tinted to accent color */
  --shadow-sm: 0 2px 8px rgb(var(--accent-rgb) / 0.08);
  --shadow-md: 0 8px 32px rgb(var(--accent-rgb) / 0.12);
  --shadow-lg: 0 20px 60px rgb(var(--accent-rgb) / 0.18);
  --shadow-xl: 0 40px 100px rgb(var(--accent-rgb) / 0.24);

  /* RADIUS */
  --radius-sm: 4px; --radius-md: 8px;
  --radius-lg: 16px; --radius-full: 9999px;

  /* LAYERS */
  --z-raised: 10; --z-sticky: 200;
  --z-modal: 300; --z-cursor: 9999;
}
```

---

## 4. MOTION ARCHITECTURE — THE SCORE (motion contract) ★v6
*Agent-B performs.*

```
Motion sentence: [establish → … → resolve — the register's arc]
Signature act: [id] | Clock owner: [the scrub acts; WebGL subscribes to progress]
Act table (one row per section — the score.json acts):
  | act | stage | job | role | emotion in → out | trigger | personality | reduced (settled meaning) |
Load choreography: Phase 0→5 [ms values, ≤ 1500 total] — see references/motion-language.md §5
Heartbeat: [element, periods, amplitude] | Breath: [air + ambient layer]
Cursor: [native / trailing / magnetic / WebGL] from DIS magnetic_cursor [value]
Page transitions: [fade-through-black = cinematic / curtain = theatrical / morph = seamless /
                   colour flood = brand-forward / zoom = magazine] — [the feeling it serves]
score.json path: [iron_canvas_output/score.json] — preflight: [PASS / errors]
[AGENT-B performs this — via runtime/canvas-score.js or a faithful port]
```

*Motion sentence by register: R0 establish → resolve · R1 establish → reveal → resolve · R2 establish → accelerate → pause → reveal → resolve · R3 establish → accelerate → pause → reveal → recover → climax → resolve · R4 the full sentence as a camera rail. Two loud beats never touch.*

**Act table:**

| act | stage | job | role | emotion in → out | trigger | personality | reduced (settled meaning) |
|-----|-------|-----|------|------------------|---------|-------------|---------------------------|
| ___ | establish | orient | support | ___ → ___ | load | ___ | ___ |
| ___ | ___ | ___ | signature | ___ → ___ | scrub | bloom | ___ |
| ___ | resolve | commit | support | ___ → ___ | enter | ___ | ___ |

*Exactly one `signature`. Roles: signature · support · stillness. Verbs only from the seventeen (fade · rise · unveil · bloom · focus · tilt · wipe · iris · sink · lift · defocus · dolly · drift · draw · count · scramble · sweep); personalities only from the seven (silk · tide · gravity · spark · snap · bloom · drift).*

**Load choreography (ms from page ready — ≤ 1500 total, steps 50–150 ms, never all at once):**
```
Phase 0 (0-200ms):     ___   (ground, atmosphere, canvas init — the heartbeat is already turning)
Phase 1 (200-600ms):   ___   (primary visual / 3D element)
Phase 2 (400-800ms):   ___   (headline — line, word or character)
Phase 3 (600-1000ms):  ___   (supporting text)
Phase 4 (800-1200ms):  ___   (CTA)
Phase 5 (1000-1400ms): ___   (navigation + secondary UI)
```

**Scene map — one entry per section, no blanks:**
```
[SECTION / act id]  Stage: [motion-sentence beat]   Job: [orient / explain_system / … / commit]
  Load: ___   Scroll: ___   Cursor: ___   Exit: ___   Duration: ___   Technique / verbs: ___
  Emotion: [what the visitor should feel here — in → out]   Role: [signature / support / stillness]
  Still: [what the settled frame means under reduced motion]
```
*Technique options: pin+scrub / reveal / parallax / counter / horizontal — written as the score's verbs (a pinned scrub act with `drift`, an `unveil`, a `count`, …).*
*★v6 — **Emotion can never be blank.** Every section names what the visitor should feel, in words a person would use ("curious → drawn in"), never "TODO", "—" or "Static". A blank Emotion fails the PRD lint and `scripts/ic-preflight.mjs` (every act has a feeling), and VERIFY compares each section's station screenshot against it.*

**Page transitions** (choose by the feeling it serves):
```
fade-through-black → Cinematic     curtain (Iron Curtain) → Theatrical     shared-element morph → Seamless
colour flood → Brand-forward        WebGL distortion → Psychedelic (R3+)    zoom in/out → Magazine
```
Framework: Barba.js / AnimatePresence / same-document View Transitions | Chosen: ___ — because it feels ___

**Smooth scroll:** Lenis (the `lenis` package) smoothing native scroll / native — one clock; no second scroll owner
**Scroll engine:** YES / NO — a frame sequence is the scrub act of its section
  If YES: Section: ___ | Height: ___vh | Frames: ___ | Path: /frames/
          Overlays: [___ at __% scroll] [___ at __% scroll]

---

## SECTION 5: COMPONENT SYSTEM
*Agent-C executes.*

**Interactive elements requiring 3-state implementation:**
| Element | Hover State | Active State | Focus State |
|---------|------------|-------------|------------|
| Primary button | translateY(-2px) + shadow-md | scale(0.98) | accent outline |
| ___ | ___ | ___ | ___ |

*★v6 Hand-feel (the aliveness floor): every row answers hover AND focus; press is a physical push (scale 0.98 or 1 px down); micro-moves ride `var(--ease-tick)` ≤ 0.25 s, state changes `var(--ease-arrive)`.*

**Navigation:**
Type: fixed / sticky | Scroll trigger: at ___px → scrolled class
Mobile: hamburger / overlay / drawer

**Typography treatments:**
| Element | Treatment |
|---------|----------|
| .hero__title | unveil lines / words / chars · straight reveal |
| ___ | ___ |

**Grain overlay:** YES (creative/luxury) / NO — *★v6 with NO grain, name the ambient layer that breathes instead: light ladder / breathing mesh*
**Glassmorphism panels:** YES / NO

---

## SECTION 6: ARTIFACT REQUIREMENTS
*Agent-D executes (Agent-F with Agent-D for meshes and the clay rail). Complete PRE-GENERATION CHECKLIST for each.*

---
**Artifact: ___**
Section: ___ | Position: ___ | Act: ___
Container: ___×___ px | CSS: ___
Overlay gradient: ___ | Blend mode: ___ | Opacity: ___
Palette: [#___ hex name] [#___ hex name]
Subject: ___
Material/style: ___
Lighting: ___
Angle: ___
Background: ___
Negative: ___
Engine: code / Nano Banana Pro / Leonardo / Grok / GPT Image / Blender / Seedance 2.5 / audio
Engine status: enabled / missing → fallback: ___  *(from power_engines)*
Class: scroll-tied / looping / static / code-driven / mesh / film / cue
---

**Scroll sequence:** YES / NO
  If YES:
  Section height: ___vh
  Total frames: ___
  Keyframes: [1: ___] [2: ___] [3: ___] [4: ___] [5: ___]
             [6: ___] [7: ___] [8: ___] [9: ___] [10: ___]
  *(more keyframes at the critical moment, fewer in the settle)*
  Content overlays: [___ at __% progress] [___ at __% progress]

**Engine jobs ★v6:** [clay rail · hero object · shot jobs · cues — written at 3.9b, run in ASSET FORGE 5a]

---

## SECTION 7: PERFORMANCE + ACCESSIBILITY
*Agent-E audits against these targets.*

LCP target:        < ___s
JS bundle budget:  ___KB   *(★v6 web pack R3/R4: first-load ≤ 180 kB gzipped, three.js lazy)*
Frame total:       ___MB (must be ≤ 5MB)
WCAG level:        AA / AAA
Reduced-motion:    ★v6 the composed still — every entrance target at its final state; opacity-only reveals, no pins, no breath, native scroll; never blank
Mobile animations to preserve: [list minimum 1 — one signature animation, never zero]
Fonts to preload:  [list font filenames]
Aliveness evidence (Axis 7): first-5-seconds video · 15-second slow scroll · reduced-motion recording

---

## SECTION 8: TECHNICAL VALIDATION SUMMARY
*From Phase 3.5 technical-validation-report.md*

| Feature | Status | Modification Required |
|---------|--------|-----------------------|
| ___ | FEASIBLE | none |
| ___ | CONDITIONAL | ___ |

---

## SECTION 9: AGENT ASSIGNMENTS

| Agent | Domain | Primary Outputs |
|-------|--------|----------------|
| Agent-A | Foundation | tokens.css, index.html, base.css — ★v6 act ids, data-ic / data-breath hooks, ic-js failsafe |
| Agent-B | Motion — performs the score | motion.js + canvas-score.js, heartbeat, [load-sequence.js], scroll.js, [scroll-engine.js], [transitions.js] |
| Agent-C | UI/UX | components.css, interactions.js, typography.js — hand-feel on every control |
| Agent-D | Artifacts | artifact-prompts.md, generated images, frames/ — ★v6 ASSET FORGE engines + ledger |
| Agent-E | QA | accessibility-audit.md, performance-checklist.md, qa-fixes.md — ★v6 + the aliveness evidence |
| Agent-F | Immersion (depth ≥ 0.4) | ★v6 the staged scene / world, subscribed to the score's clock |

**Merge sequence:** A → B → C → D → E

---

## SECTION 10: INTEGRATION CONTRACTS

File naming: camelCase / kebab-case / PascalCase
CSS approach: global tokens + component scoped / CSS Modules / BEM
Asset paths: /public/images/ or /assets/ or / — ★v6 promoted encodes only, each with a `.provenance.json`
Data attributes: `data-magnetic` on CTAs | `.reveal` on below-fold elements (CSS-only Tier 1 path) | `data-scroll-section` on sections
★v6: `id="act-<id>"` on every section (the score's act ids) | `data-ic` on every entrance target | `data-breath` on the heartbeat's WRAPPER (never an element a shot also transforms) | `ic-js` marked in `<head>` before first paint with the 3 s failsafe
Component prefix: ___

---

## SECTION 11: ACTIVE ANTI-PATTERN VETO LIST

**Universal Iron Canvas anti-patterns (always enforced):**
1. Cookie-Cutter: identical output for different sites
2. Blind Generation: artifacts without CSS context
3. Template Imposition: palette not from site DNA
4. Batch-and-Pray: all images at once
5. Identity Erasure: unrecognizable from original brand
6. Trinket Dropping: images without CSS integration
7. Video-as-Animation: MP4 for scroll sequence
8. Frame Inconsistency: different base prompts per frame
9. One-Shot Prompting: no Discovery Interview, no PRD as source of truth
10. Skipping Asset Pipeline: raw video handed to a scroll engine
11. Context Drift: agents guessing stack, tokens and intent
12. Intensity Mismatch: flash that ignores the DNA (or static where the DNA is bold)
13. Code-vs-AI Misrouting: AI-generated logo/chart, or SVG faking photoreal
14. Generative-for-its-own-sake: effects bolted on for flash
15. Depth Theater: 3D bolted on — incl. a double atmosphere (aurora + iridescence + frosted glass)
16. Slop Tells: the CD3 anti-slop canon + the growing registry of named model defaults
17. Register Mismatch: wrong treatment for the task's ambition (over-produced)
18. ★v6 LIFELESS: correct and dead — no arrival, heartbeat, hand-feel, breath or composed still
19. ★v6 TWO CLOCKS: two scroll owners in one viewport
20. ★v6 FLAGGED BUT SHIPPED: a risk note or a red P0 test treated as FYI — every flag resolved or waived by the operator before HANDOFF
21. ★v6 DEFAULTS AS DECISIONS: template pre-fills shipped as if chosen — the design contract + scripts/ic-contract.mjs in CI
22. ★v6 UNREVIEWED INTERPOLATION: generated in-betweens no keyframe contained, shipped unseen — sample, match to keyframes, approve or reject in the ledger

**Named model defaults seen in the first render ★v6** (the growing registry — CD3 Law 4; each needs a reason from the DNA or it goes): *cream / off-white grounds · an italic accent word in every headline · "01 / 02 / 03" section labels · monospace eyebrows · pill buttons · "→" on every link · ___*
- ___

**Project-specific veto list:**
- ___
- ___
- ___
