# Design PRD Template
## Iron Canvas v5.2 — Phase 3.9 Output

*Instructions: Orchestrator fills this completely before dispatching to Build Agents.*
*Delete all instruction lines (in italics) before saving final PRD.*
*Save as: design-prd.md in project root*

---

# IRON CANVAS DESIGN PRD

**Project:** ___
**Type:** A / B / C / D / E / F
**Mode:** SOLO / SWARM / MISSION
**Date:** YYYY-MM-DD
**North Star:** `north-star-reference.png`
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
Border:         rgba(__, __, __, 0.12)
Accent RGB:     __, __, __  ← for CSS calc in shadows

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
  Quiet     [__] ←——→ [__] Bold      → Cursor: none / trailing / magnetic
  Fast      [__] ←——→ [__] Contemplative → Pacing: fast / medium / slow
```

---

## SECTION 2: EMOTIONAL TARGET
*Hard constraint — ALL agents honor this. Anti-feelings are vetoed at any decision point.*

Primary emotion: ___
Secondary emotions: ___, ___

**ANTI-FEELINGS (HARD VETO — any design evoking these is rejected regardless of quality):**
- ___
- ___
- ___

Reference vibe: "Walking into ___"

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
  --color-border:       rgba(__, __, __, 0.12);
  --accent-rgb:         __, __, __;

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

  /* MOTION */
  --spring:       cubic-bezier(0.34, 1.56, 0.64, 1);
  --spring-slow:  cubic-bezier(0.16, 1, 0.3, 1);
  --smooth:       cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast:     150ms; --dur-normal: 300ms;
  --dur-slow:     600ms; --dur-hero:   1000ms;

  /* DEPTH — tinted to accent color */
  --shadow-sm: 0 2px 8px rgba(var(--accent-rgb), 0.08);
  --shadow-md: 0 8px 32px rgba(var(--accent-rgb), 0.12);
  --shadow-lg: 0 20px 60px rgba(var(--accent-rgb), 0.18);
  --shadow-xl: 0 40px 100px rgba(var(--accent-rgb), 0.24);

  /* RADIUS */
  --radius-sm: 4px; --radius-md: 8px;
  --radius-lg: 16px; --radius-full: 9999px;

  /* LAYERS */
  --z-raised: 10; --z-sticky: 200;
  --z-modal: 300; --z-cursor: 9999;
}
```

---

## SECTION 4: MOTION ARCHITECTURE
*Agent-B executes.*

**Easing vocabulary:**
```javascript
const EASE = {
  heroIn:    'power4.out',
  textIn:    'power3.out',
  elementIn: 'power2.out',
  spring:    'elastic.out(1, 0.3)',
  brand:     'cubic-bezier(__, __, __, __)'
};
```

**Load sequence timing:**
```
Phase 0 (0-200ms):     ___
Phase 1 (200-600ms):   ___
Phase 2 (400-800ms):   ___
Phase 3 (600-1000ms):  ___
Phase 4 (800-1200ms):  ___
Phase 5 (1000-1400ms): ___
```

**Section choreography:**
```
[Section name]:
  Entry:     ___
  Scroll:    ___
  Exit:      ___
  Technique: pin+scrub / reveal / parallax / counter / horizontal
  Emotion:   ___
```

**Cursor:** none / trailing / magnetic
**Page transitions:** none / iron-curtain / fade / shared-element | Framework: Barba.js / AnimatePresence
**Scroll library:** Lenis / Locomotive / native
**Scroll engine:** YES / NO
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

**Navigation:**
Type: fixed / sticky | Scroll trigger: at ___px → scrolled class
Mobile: hamburger / overlay / drawer

**Typography treatments:**
| Element | Treatment |
|---------|----------|
| .hero__title | SplitText chars / straight reveal |
| ___ | ___ |

**Grain overlay:** YES (creative/luxury) / NO
**Glassmorphism panels:** YES / NO

---

## SECTION 6: ARTIFACT REQUIREMENTS
*Agent-D executes. Complete PRE-GENERATION CHECKLIST for each.*

---
**Artifact: ___**
Section: ___ | Position: ___
Container: ___×___ px | CSS: ___
Overlay gradient: ___ | Blend mode: ___ | Opacity: ___
Palette: [#___ hex name] [#___ hex name]
Subject: ___
Material/style: ___
Lighting: ___
Angle: ___
Background: ___
Negative: ___
Engine: Nano Banana Pro / Leonardo / Grok / GPT Image
---

**Scroll sequence:** YES / NO
  If YES:
  Section height: ___vh
  Total frames: ___
  Keyframes: [1: ___] [2: ___] [3: ___] [4: ___] [5: ___]
             [6: ___] [7: ___] [8: ___] [9: ___] [10: ___]
  Content overlays: [___ at __% progress] [___ at __% progress]

---

## SECTION 7: PERFORMANCE + ACCESSIBILITY
*Agent-E audits against these targets.*

LCP target:        < ___s
JS bundle budget:  ___KB
Frame total:       ___MB (must be ≤ 5MB)
WCAG level:        AA / AAA
Reduced-motion:    animations disabled / simplified fade only
Mobile animations to preserve: [list minimum 1]
Fonts to preload:  [list font filenames]

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
| Agent-A | Foundation | tokens.css, index.html, base.css |
| Agent-B | Motion | load-sequence.js, scroll.js, [scroll-engine.js], [transitions.js] |
| Agent-C | UI/UX | components.css, interactions.js, typography.js |
| Agent-D | Artifacts | artifact-prompts.md, generated images, frames/ |
| Agent-E | QA | accessibility-audit.md, performance-checklist.md, qa-fixes.md |

**Merge sequence:** A → B → C → D → E

---

## SECTION 10: INTEGRATION CONTRACTS

File naming: camelCase / kebab-case / PascalCase
CSS approach: global tokens + component scoped / CSS Modules / BEM
Asset paths: /public/images/ or /assets/ or /
Data attributes: `data-magnetic` on CTAs | `.reveal` on below-fold elements | `data-scroll-section` on sections
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

**Project-specific veto list:**
- ___
- ___
- ___
