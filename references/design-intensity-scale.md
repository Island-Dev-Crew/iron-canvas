# Design Intensity Scale (DIS) — Iron Canvas v6
## *One design language. Nine systems. Zero compromise on craft.*

> **Position in pipeline:** Phase 2 (FEEL) output → DIS calculation → Phase 4 (FORGE) input
> **What it replaces:** Ad-hoc per-agent decisions about "how much" animation/glass/effects
> **What it preserves:** DNA-first philosophy — the site's personality drives intensity, not templates
> **★v6:** the Treatment Register caps the whole scale (task ambition); Mode sets the ceiling
> (horsepower); Brand DNA sets the floor; **the aliveness floor sits under everything, and no cap
> removes it** (SKILL.md §0.1, §17).

---

## CORE PRINCIPLE

Iron Canvas has a design language ceiling — the most visually impressive output the system can produce. Every project inherits from this ceiling at a scaled intensity determined by two inputs:

```
DESIGN INTENSITY = f(Treatment Register cap, Execution Mode ceiling, Brand Personality Matrix scores)

Treatment Register (CD3 §0.2) sets the OUTERMOST CAP (task ambition, R0–R4) — applied last  ★v5.1
Mode sets the CEILING (maximum available intensity, by team horsepower)
BPM scores set the FLOOR and OVERRIDES (DNA-driven activation)
★v6 The ALIVENESS FLOOR (arrival · heartbeat · hand-feel · breath · composed still) sits UNDER all
    three — every cap shapes its amplitude; none removes it
```

The mode never forces features ON — it only limits how many can activate.
The BPM scores never force features OFF — they can unlock systems even in lower modes when the DNA demands it —
**except** the Treatment Register cap (CD3, the outermost clamp below), which can bound even a BPM unlock down to
the task's register (an R0 task clamps a bold=9 unlock to ≤ 0.2). See "THE TREATMENT REGISTER" section next.

---

## THE TREATMENT REGISTER — the CD3 ceiling above the ceiling *(v5.1)*

Before Mode and BPM are read, Claude Design 3 places the project on the **Treatment
Register** (set at ORIENT from the *task's ambition*, recorded as `treatment_register`).
The register is the outermost cap on the whole DIS — it is Iron Canvas's high-dynamic-
range axis, and it is what makes a restrained output *crafted* rather than *stripped*.

```
DESIGN INTENSITY = f(Treatment Register cap, Execution Mode ceiling, BPM scores)
   Register  →  caps the WHOLE scale (the task's ambition — R0…R4)
   Mode      →  caps how many systems can activate (SOLO/SWARM/MISSION)
   BPM       →  sets floors + overrides within the cap (the brand's DNA)
```

| Register | System-intensity envelope | The craft at this register |
|----------|---------------------------|-----------------------------|
| **R0 · Utilitarian** | all systems 0.0–0.2 | Information design. Hierarchy, tabular rhythm, state-as-form (pill/chip/severity), one accent. Restraint IS the deliverable — not fewer effects, a *different* discipline. |
| **R1 · Functional** | ≤ 0.5 | A thesis hero + one memorable moment; motion that clarifies flow. |
| **R2 · Editorial** | ≤ 0.7 | An opinionated POV; typography with character; an orchestrated reveal. |
| **R3 · Maximalist** | ≤ 0.9 | Layered depth, grid-breaking composition, atmosphere, a signature technique. |
| **R4 · Immersive** | ≤ 1.0 | Inhabited depth + Depth Language System 9 + Agent F + §22 evidence gate. |

**The law:** the register caps every system in the table below. At **R0** the nine
systems sit near 0.0 *on purpose* — Agent-A/C then deliver polish through information
design, not through a diluted maximalism. A DIS reading that exceeds its register cap
is an over-produced output and **fails VERIFY Axis 6**. Register is orthogonal to BPM:
a *serious/classic* brand can take an R0 dashboard or an R2 editorial page. Full
doctrine: [claude-design-3.md](claude-design-3.md).

**★v6 — the register caps the ceiling, never the floor.** Near 0.0 at R0 still means a designed
arrival (600–900 ms), one heartbeat (a breathing status dot, a live-data tick), hand-feel on every
control, air plus one ambient layer, and a composed still. "When unsure, drop a register — never
below the aliveness floor. Restraint is not stillness." An R0 output that is correct and dead
fails **VERIFY Axis 7** exactly as an over-produced one fails Axis 6.

---

## THE NINE DESIGN SYSTEMS

Every Iron Canvas output is composed of nine independently scalable design systems. Each system has an intensity value from 0.0 (off) to 1.0 (maximum). *(Systems 1–8 established v4.2; System 9 added v5.0.)*

### ★v6 — What each dial FEELS like

A number without a feeling is how the doctrine went mechanical; every dial gets its felt
description back:

| # | Low (0.1–0.3) | Mid (0.4–0.6) | High (0.8–1.0) |
|---|---|---|---|
| 1 Mesh atmosphere | a ground that is not quite flat — light pooling in one corner | a mesh that breathes on 20–40 s loops | weather — colour moving like light through smoke |
| 2 Glass depth | one frosted surface where it earns it | glass strata — layers you can almost touch | a glass world; every surface refracts the one below |
| 3 Kinetic type | words arrive on the house curve, once | lines unveil out of masks; one scramble for a signal | type is the performance — characters, sweeps, morphs |
| 4 Particle field | dust in a sunbeam — you notice it on the second look | a slow current behind the hero | a living field that answers the cursor |
| 5 Border luminance | hairlines that warm to the accent on hover | edges that catch light as you pass | light running along every seam |
| 6 Scroll sequences | one short scrub that clarifies | a product turning under your thumb | "a digital flipbook controlled by your thumb" — the whole story |
| 7 Magnetic cursor | the native cursor, respected | a trailing ring with weight (lerp 0.12) | a field that leans every control toward you |
| 8 Micro-polish | every state answers — hover, press, focus | toasts, loaders and empties that are composed | sound as haptic depth, delight in the details |
| 9 Depth language | composed: elevation, focus blur, parallax bands | staged: one scene as a window | inhabited: the scene is the site |

**A dial at 0.0 means "this system is off", not "this page is dead."** The aliveness floor is not
one of the nine systems — it sits under all of them (see MODE CEILINGS and step 0 of the
calculation).

### System 1: GRADIENT MESH ATMOSPHERE
**What it controls:** Background gradient orbs, oklch color diffusion, ambient depth
**Agent owner:** Agent-A (Foundation)
**CSS output:** Radial gradient layers, blur filters, z-indexed background elements

| Intensity | Behavior |
|-----------|----------|
| 0.0 | Solid background color from tokens.css |
| 0.1–0.3 | Single subtle radial gradient, low opacity |
| 0.4–0.6 | 2-3 gradient orbs, moderate blur (40-80px), gentle animation |
| 0.7–0.8 | 3-4 orbs, high blur (80-120px), animated float, oklch color space |
| 0.9–1.0 | 5+ orbs, full mesh with animation, color-shifting, deep blur (120px+) |

**BPM activation drivers:**
- `bold ≥ 5` OR `maximal ≥ 6` → minimum 0.3 intensity
- `bold ≥ 7` AND `maximal ≥ 7` → minimum 0.6 intensity
- `organic ≥ 7` → warm-toned orbs, earthy palette
- `digital ≥ 7` → cool-toned orbs, electric palette

### System 2: GLASS MORPHISM DEPTH
**What it controls:** Card transparency, backdrop-filter blur, border treatments, inner glow
**Agent owner:** Agent-A (Foundation) + Agent-C (UI)
**CSS output:** backdrop-filter, background rgba, border with alpha, box-shadow inset

| Intensity | Behavior |
|-----------|----------|
| 0.0 | Opaque cards with solid backgrounds |
| 0.1–0.3 | Subtle transparency (rgba 0.03-0.05), no blur |
| 0.4–0.6 | Glass effect (rgba 0.06-0.08), blur 10-20px, thin borders |
| 0.7–0.8 | Deep glass (rgba 0.08-0.12), blur 20-40px, glowing borders |
| 0.9–1.0 | Full glass depth (rgba 0.10-0.15), blur 40px+, inner glow, tinted borders |

**BPM activation drivers:**
- `refined ≥ 6` → minimum 0.4 intensity (glass = sophistication)
- `bold ≥ 7` AND `maximal ≥ 6` → minimum 0.6 intensity
- `classic ≥ 8` → cap at 0.3 (classic brands don't need glass depth)

### System 3: KINETIC TYPOGRAPHY
**What it controls:** Display font entry animation, text scramble, character stagger, heading scale
**Agent owner:** Agent-C (UI) — Sweep 1
**JS output:** SplitText instances, GSAP text animations, CSS letter-spacing transitions

| Intensity | Behavior |
|-----------|----------|
| 0.0 | Static typography, no animation |
| 0.1–0.3 | Simple fade-in on headings, standard letter-spacing |
| 0.4–0.6 | Word-level fade with stagger, display font scale emphasis |
| 0.7–0.8 | Character-level stagger, scramble on reveal, large display ratios |
| 0.9–1.0 | Full choreography — character stagger + scramble + counter + scale shift |

**BPM activation drivers:**
- `bold ≥ 6` → minimum 0.4 intensity
- `avant_garde ≥ 7` → minimum 0.6 intensity (experimental type = identity)
- `contemplative ≥ 7` → slow timing curves (2-3s reveals)
- `fast ≥ 7` → snappy timing (0.3-0.6s reveals)

**Typography personality mapping (from references/typography-system.md):**
```
EXPRESSIVE (bold ≥ 8):        → 0.8-1.0 intensity, character stagger, scale contrast
EDITORIAL (refined ≥ 7):     → 0.5-0.7 intensity, word-fade, elegant timing
COMMANDING (serious ≥ 8):    → 0.6-0.8 intensity, block reveal, no scramble
REFINED (classic ≥ 7):       → 0.3-0.5 intensity, subtle fade, restrained scale
FUNCTIONAL (minimal ≥ 8):    → 0.0-0.2 intensity, near-static, content-first
```

### System 4: PARTICLE FIELD
**What it controls:** Ambient floating particles, density, opacity, animation
**Agent owner:** Agent-B (Motion)
**JS output:** CSS-animated particles OR canvas-rendered particle system

| Intensity | Behavior |
|-----------|----------|
| 0.0 | No particles |
| 0.1–0.3 | 5-15 particles, very subtle, slow drift |
| 0.4–0.6 | 20-35 particles, moderate opacity, gentle float |
| 0.7–0.8 | 40-50 particles, visible depth layers, varied sizes |
| 0.9–1.0 | 60+ particles, full depth field, scroll-responsive, color-matched |

**BPM activation drivers:**
- `bold ≥ 7` AND `avant_garde ≥ 6` → minimum 0.4 intensity
- `organic ≥ 7` → warm-colored particles, pollen/dust aesthetic
- `digital ≥ 7` → cool-colored particles, data-point aesthetic
- `minimal ≥ 8` → cap at 0.1 (particles conflict with minimalism)
- `serious ≥ 9` → cap at 0.2 (restrained contexts)

### System 5: BORDER LUMINANCE
**What it controls:** Glowing edge treatments on cards, sections, interactive elements
**Agent owner:** Agent-C (UI)
**CSS output:** box-shadow with brand color, border-color with alpha, animation pulse

| Intensity | Behavior |
|-----------|----------|
| 0.0 | Standard borders or no borders |
| 0.1–0.3 | Subtle tinted borders (brand color at 10-15% alpha) |
| 0.4–0.6 | Visible tinted borders + subtle box-shadow glow on hover |
| 0.7–0.8 | Active glow on key cards, pulsing on primary CTA |
| 0.9–1.0 | Full luminance — edge glow on sections, pulse animation, hover amplification |

**BPM activation drivers:**
- `bold ≥ 6` → minimum 0.3 intensity
- `maximal ≥ 7` → minimum 0.5 intensity
- `playful ≥ 7` → colorful multi-hue borders
- `classic ≥ 8` → cap at 0.2 (luminance reads as futuristic, not classic)

### System 6: SCROLL-TIED SEQUENCES
**What it controls:** Canvas frame sequences driven by scroll position
**Agent owner:** Agent-B (Motion) + Agent-D (Artifacts)
**JS output:** GSAP ScrollTrigger → canvas frame binding

| Intensity | Behavior |
|-----------|----------|
| 0.0 | No scroll sequences — static images only |
| 0.1–0.3 | 1 simple parallax section (CSS transform, not canvas) |
| 0.4–0.6 | 1 canvas scroll sequence (30-45 frames), hero section |
| 0.7–0.8 | 2 scroll sequences, 60 frames each, Keyframe Interpolation method |
| 0.9–1.0 | 3+ sequences, full page scroll narrative, product 360° + transitions |

**BPM activation drivers:**
- `bold ≥ 7` AND `maximal ≥ 6` → minimum 0.4 intensity
- `contemplative ≥ 7` → slow scrub ratio (more scroll per frame)
- Product showcase projects (Type D) → minimum 0.6 intensity
- Performance Tier 1 (Marketing) → cap at 0.3 (LCP constraint)

### System 7: MAGNETIC CURSOR
**What it controls:** Custom cursor system, attraction fields, WebGL effects
**Agent owner:** Agent-C (UI) — Sweep 2 (Polish)
**JS output:** Custom cursor element, mousemove listener, magnetic proximity detection

| Intensity | Behavior |
|-----------|----------|
| 0.0–0.29 | The native system cursor, respected (★v6 — matches the Agent-C tiers: below 0.3 native) |
| 0.3–0.6 | Trailing ring with weight (lerp 0.12), smooth follow, scale on hover |
| 0.61–0.89 | Magnetic attraction on interactive elements, blend-mode invert |
| 0.9–1.0 | Full WebGL cursor with shader effects, strong magnetic fields, trail — R3+ only |

Cursor effects run only under `(hover: hover) and (pointer: fine)` and only when motion is allowed.

**BPM activation drivers** (★v6 reconciled to the Brand Personality Matrix thresholds — Bold 5-7
trailing, Bold 8-10 magnetic — and the tier boundaries above):
- `bold ≥ 5` → minimum 0.3 intensity (trailing ring)
- `bold ≥ 8` → minimum 0.7 intensity (magnetic)
- `bold ≥ 9` AND `avant_garde ≥ 8` → minimum 0.9 (WebGL cursor, R3+ only)
- Touch device detected → force 0.0 (ALWAYS check touch before init)
- `classic ≥ 8` → cap at 0.3 (custom cursors read as experimental)

### System 8: MICRO-INTERACTION POLISH
**What it controls:** Sound design hooks, toast patterns, loading states, hover refinements
**Agent owner:** Agent-C (UI) — Sweep 2 (Polish) + Agent-E (Enhancement Discovery)
**JS output:** polish.css + polish.js (additive, never overrides core)

| Intensity | Behavior |
|-----------|----------|
| 0.0 | Functional states only (no polish pass) |
| 0.1–0.3 | Loading skeleton screens, basic empty states |
| 0.4–0.6 | Refined hover timing, toast notifications, transition polish |
| 0.7–0.8 | Sound design hooks, advanced loading, interaction feedback |
| 0.9–1.0 | Full polish — sound, haptics awareness, easter eggs, ambient audio |

**BPM activation drivers:**
- All modes → minimum 0.2 (loading/empty states are baseline quality)
- `playful ≥ 7` → minimum 0.6 (playful brands need micro-delight)
- `bold ≥ 7` → minimum 0.5 (bold brands benefit from feedback richness)
- `serious ≥ 9` → cap at 0.4 (professional contexts = restraint)

**★v6 Sound (inside System 8)** — invited, never imposed: off by default behind a visible toggle;
one timbre per brand; cues at the signature and the commit only; ambient beds only at 0.9–1.0 and
R3+; spatial (HRTF) in R4 worlds; synthesized WebAudio before any file. With no sound, ship no
sound UI. → references/motion-language.md §13

### System 9: DEPTH LANGUAGE ★v5.0
**What it controls:** z-axis composition — elevation, focus blur, glass strata, parallax bands, WebGL scenes, camera choreography
**Agent owner:** Agent-A (Tier I tokens) + Agent-B (Tier II/III scenes) + Agent-C (depth-aware components)
**Output:** `--elev-*` / `--fog-*` / `--parallax-*` tokens, scene.js (Tier II+), camera-rail.js (Tier III)

| Intensity | Behavior |
|-----------|----------|
| 0.1–0.35 | **TIER I — COMPOSED**: CSS-only depth — elevation ramp, focus blur, glass strata, scroll parallax |
| 0.4–0.7 | **TIER II — STAGED**: one Three.js scene as a window in the DOM — hero scene, product orbit, data centerpiece |
| 0.75–1.0 | **TIER III — INHABITED**: the scene IS the site — camera rail, one world material, fog as brand |

**BPM activation drivers:**
- ALL projects → minimum 0.1 (composed depth is baseline craft — the floor is never flat)
- `refined ≥ 6` → minimum 0.2
- `bold ≥ 6` → minimum 0.4 (Tier II unlock)
- `bold ≥ 8` AND `avant_garde ≥ 8` → minimum 0.75 (Tier III unlock)
- `minimal ≥ 8` → cap at 0.35 · `classic ≥ 8` → cap at 0.5 · `serious ≥ 9` → cap at 0.4
- Surface pack ceilings apply on top (e.g. app-dashboard caps at 0.5)

→ FULL SPEC: references/depth-language.md (grammar, camera, engines, gates, Anti-Pattern #15)

---

## MODE CEILINGS

The execution mode sets the maximum number of systems that can activate and caps their intensity.
★v6 — reconciled to SKILL.md §17: nine systems, not eight (System 9 Depth Language is never OFF).

```
┌─────────┬───────────┬─────────────┬──────────────────────────────────┐
│ Mode    │ Max       │ Intensity   │ Default Active Systems           │
│         │ Systems   │ Ceiling     │                                  │
├─────────┼───────────┼─────────────┼──────────────────────────────────┤
│ MISSION │ 9/9       │ 1.0         │ ALL — mesh, glass, type, parti-  │
│         │           │             │ cles, borders, scroll, cursor,   │
│         │           │             │ polish, depth                    │
├─────────┼───────────┼─────────────┼──────────────────────────────────┤
│ SWARM   │ 7/9       │ 0.7         │ mesh, glass, type, borders,      │
│         │           │             │ scroll, polish, depth            │
│         │           │             │ (particles + cursor OFF by       │
│         │           │             │ default — BPM can override)      │
├─────────┼───────────┼─────────────┼──────────────────────────────────┤
│ SOLO    │ 4/9       │ 0.4         │ mesh (subtle), type, polish,     │
│         │           │             │ composed depth                   │
│         │           │             │ (glass, particles, borders,      │
│         │           │             │ scroll, cursor OFF by default —  │
│         │           │             │ BPM can override)                │
└─────────┴───────────┴─────────────┴──────────────────────────────────┘
```

```
Depth (System 9) is never OFF — every project carries ≥ 0.1 composed depth. The mode ceiling
caps its ALTITUDE: SOLO ≤ 0.35 (Tier I) · SWARM ≤ 0.7 (Tier II) · MISSION ≤ 1.0 (Tier III).
★v6 The ALIVENESS FLOOR (SKILL.md §0.1) is never OFF either. Mode ceilings, register caps and BPM
suppression shape its AMPLITUDE — a 600 ms arrival and one breathing dot at SOLO/R0 — and never
remove it. A dial at 0.0 means "this system is off", not "this page is dead".
```

**★v6 — SOLO caps systems, never the aliveness floor.** SOLO is the most common real-world mode
(a single Claude Code session running Iron Canvas is SOLO). It limits how many systems activate
and how loud they are; it never ships a page without an arrival, a heartbeat, hand-feel, breath
and a composed still. That was the v5.x drift this table used to cause (Anti-Pattern #18 LIFELESS).

### BPM Override Rules

The mode ceiling is a DEFAULT, not a hard cap. BPM scores can unlock systems beyond the mode default when the site's DNA demands it:

```
OVERRIDE CONDITION: Any BPM axis ≥ 8 that maps to a disabled system
                    → UNLOCK that system at the BPM-driven intensity
                    → But cap at mode ceiling (e.g., SOLO caps at 0.4)

EXAMPLES:
  SOLO mode + bold=9, avant_garde=8:
    → Cursor system UNLOCKED at 0.4 (capped by SOLO ceiling)
    → Particle field UNLOCKED at 0.4 (capped by SOLO ceiling)
    → This is correct — the DNA says "bold experimental" even for enhancement

  SWARM mode + playful=9:
    → Micro-interaction polish bumped to 0.7 (SWARM ceiling)
    → Easter egg interactions enabled
    → This is correct — playful DNA demands delight

  MISSION mode + minimal=9, serious=9:
    → Particles capped at 0.2
    → Cursor capped at 0.3
    → Border luminance capped at 0.2
    → Mesh gradient capped at 0.3
    → This is correct — even at MISSION, a minimal/serious brand stays restrained
```

**The design language scales DOWN as much as it scales UP.**
A MISSION mode run for a law firm should look as considered as a MISSION mode run for a fashion brand — but with completely different system activations.

---

## FEEL PROFILE OUTPUT — design_intensity FIELD

Phase 2 (FEEL) output now includes a `design_intensity` object calculated from BPM scores + mode:

```json
{
  "design_intensity": {
    "mode_ceiling": 1.0,
    "systems": {
      "gradient_mesh":      { "intensity": 0.8, "active": true },
      "glass_depth":        { "intensity": 0.7, "active": true },
      "kinetic_typography": { "intensity": 0.9, "active": true },
      "particle_field":     { "intensity": 0.5, "active": true },
      "border_luminance":   { "intensity": 0.6, "active": true },
      "scroll_sequences":   { "intensity": 0.7, "active": true },
      "magnetic_cursor":    { "intensity": 0.8, "active": true },
      "micro_polish":       { "intensity": 0.7, "active": true },
      "depth_language":     { "intensity": 0.8, "active": true, "tier": "III" }
    },
    "aggregate_intensity": 0.72,
    "override_log": ["bold=9 → cursor unlocked", "avant_garde=8 → scroll min 0.6"]
  }
}
```

### Calculation Algorithm

```
0. ★v6 RESERVE THE ALIVENESS FLOOR first — arrival, heartbeat, hand-feel, breath, composed
   still. Every step below shapes their amplitude; no step removes them.
FOR each of the 9 systems (Systems 1–8 + System 9 Depth Language — the register clamps all nine):
  1. Check mode default → is this system active by default for this mode?
  2. Calculate BPM-driven intensity:
     → Find all BPM axes that map to this system (see activation drivers above)
     → Take the highest resulting intensity from any matching axis
  3. Apply BPM override check:
     → If system is OFF by mode default BUT any activation driver ≥ 8 → UNLOCK
  4. Apply mode ceiling cap:
     → Final intensity = min(BPM intensity, mode_ceiling)
  5. Apply BPM ceiling cap:
     → If any suppressing BPM axis applies (e.g., classic ≥ 8 caps cursor) → apply cap
  6. Apply the surface pack cap ★v5.0:
     → the dispatched pack's DIS profile (surfaces/*/PACK.md §3) — floors and caps per system
  7. Apply Treatment Register cap ★v5.1 (CD3 — OUTERMOST, applied last):
      → Final intensity = min(step-6 result, register_cap[treatment_register])
      → register_cap: R0 0.2 · R1 0.5 · R2 0.7 · R3 0.9 · R4 1.0
      → This is what resolves an R0 utilitarian task near 0 even under a bold BPM floor
  8. Log any overrides for transparency
```

---

## AGENT INTEGRATION

### Agent-A (Foundation)
Reads `design_intensity.systems.gradient_mesh` and `glass_depth`:
- Generates gradient orb CSS layers at specified intensity
- Sets card transparency levels in tokens.css
- Creates `--glass-blur`, `--glass-alpha`, `--mesh-opacity` tokens

### Agent-B (Motion)
Reads `design_intensity.systems.particle_field` and `scroll_sequences`:
- Decides particle system implementation (CSS vs canvas)
- Sets scroll sequence count and frame density
- Adjusts GSAP timeline complexity

### Agent-C (UI)
Reads `design_intensity.systems.kinetic_typography`, `border_luminance`, `magnetic_cursor`, `micro_polish`:
- Sweep 1: Typography animation level, border treatments
- Sweep 2: Cursor system, polish features, sound hooks

### Agent-D (Artifacts)
Reads `design_intensity.systems.scroll_sequences` and `gradient_mesh`:
- Determines number of scroll sequences to generate
- Decides section-specific background asset density
- Adjusts Keyframe Interpolation frame count

### Agent-E (QA)
Reads `design_intensity.aggregate_intensity`:
- Adjusts performance budget expectations (higher intensity = more lenient LCP)
- Enhancement Discovery suggestions filtered by remaining intensity headroom
- Flags any system that's active but underperforming its target intensity

---

## PERFORMANCE TIER INTERACTION

The Performance Tier (from Phase 0) acts as a HARD constraint that overrides DIS:

```
TIER 1 — MARKETING (LCP < 2.5s):
  → scroll_sequences capped at 0.3
  → particle_field capped at 0.2
  → gradient_mesh capped at 0.5
  → Total JS budget: 150KB (scroll engine + particles can't both be heavy)

TIER 2 — ANIMATED (LCP < 3.5s):
  → All systems allowed up to mode ceiling
  → Three.js only if avant_garde ≥ 8
  → Total JS budget: 300KB

TIER 3 — IMMERSIVE (LCP < 4.0s):
  → No system caps from performance tier
  → Progressive enhancement required (base experience loads fast, effects layer)
  → Total JS budget: 500KB with code splitting
```

**Resolution order when constraints conflict** (★v6 reconciled to SKILL.md §17 — surface pack caps added):
```
1. Performance Tier (hard cap — user experience)
2. Surface pack caps (the terrain says "not here") ★v5.0
3. BPM suppression caps (DNA says "not this")
4. Mode ceiling (structural limit)
5. BPM activation floors (DNA says "at least this much")
6. Treatment Register cap ★v5.1 (CD3 — the OUTERMOST clamp, applied LAST):
     final_intensity = min(result_of_1-5, register_cap)
   A BPM activation floor can never push a system above the task's register.
   e.g. bold≥6's 0.4 depth floor is clamped to 0.2 on an R0 task — no staged
   scene on a utilitarian tool (Anti-Patterns #15 / #17). The register is thus a
   GENERATIVE constraint here, not only a reactive VERIFY-Axis-6 check.
★v6 None of the six touches the aliveness floor (step 0 above): they resolve the nine
   systems' intensities; the floor's five elements ship at whatever amplitude remains.
```

---

## ANTI-PATTERN: INTENSITY MISMATCH

**Anti-Pattern #12: INTENSITY MISMATCH (v4.2)**

What it looks like: A law firm site with particles, magnetic cursor, and gradient mesh at full blast. Or a fashion brand site with static type and flat backgrounds in MISSION mode.

Why it happens: Applying mode defaults without reading BPM scores. Or reading BPM scores without applying mode caps.

How to prevent: The DIS calculation runs BOTH inputs. Mode sets ceiling, BPM sets floor and overrides. Neither alone determines the output. If the result looks wrong, one of the inputs is wrong — recheck the BPM scores before adjusting the DIS.

**Red flag:** If `aggregate_intensity > 0.7` and `serious ≥ 8`, something is miscalibrated.
**Red flag:** If `aggregate_intensity < 0.3` and `bold ≥ 8`, something is miscalibrated.
**★v6 counterweight:** low intensity is never an excuse for a dead page. Whatever the aggregate,
the aliveness floor ships — a page with nothing moving at rest is Anti-Pattern #18 LIFELESS, the
opposite failure to #12 and #17, and it fails VERIFY Axis 7 at every register.

---

## VISUAL REFERENCE

The Iron Canvas design language at peak intensity is demonstrated in:
`/showcase/iron-canvas-showcase.jsx`

This React component renders the full design language with live mode switching.
Toggle between MISSION / SWARM / SOLO to see all 8 systems scale in real time.
Use as a North Star reference when calibrating the DIS for any project.

---

*Design Intensity Scale — Iron Canvas v6 (Systems 1–8 v4.2 · System 9 v5.0 · Treatment Register cap v5.1 · aliveness floor + felt dials v6)*
*"The ceiling is the same for every project. The site's DNA decides how high to climb."*
*"The floor is never flat — and never still."*

---

## HIGH DYNAMIC RANGE — THE FULL SPAN

Iron Canvas's high-dynamic-range axis is the **Treatment Register (CD3 §0.2 — R0 Utilitarian → R4
Immersive, set by TASK AMBITION)**. The register caps the DIS; the DIS then resolves the *same*
design language to a point within it, alongside the three BPM-driven axes below. Each end is
first-class. (Execution Mode is a *horsepower* input, not the HDR axis — restraint at R0 is
**executed craft**, a different discipline, never a starved SOLO run or "fewer effects.")

| Axis | Low end (floor) | High end (ceiling) |
|------|-----------------|--------------------|
| **Register / Intensity** | R0/R1 — restraint executed as *information design* (hierarchy, tabular rhythm, state-as-form, one accent); systems near 0.0–0.5 by the register cap | R3/R4 — maximal: mesh + particles + WebGL cursor + code-driven motion, the 9 systems resolving toward 1.0 (register R3/R4 + `bold`/`avant_garde` high) |
| **Temperature** | Cool / technical (`digital` high) — slate, electric blue, violet | Warm / earthy (`organic` high) — espresso, gold, terracotta |
| **Energy** | Calm (`contemplative`/`minimal` high) — slow 2–3s reveals, near-static, quiet generative texture | Dynamic (`bold`/`fast` high) — character stagger, fast loops, dense flow-fields |
| **Palette base** | Light (paper/cream, or crisp heritage) | Dark (dramatic, luxury, night) |

**The rule:** a project may sit at the calm/cool/light/minimal corner OR the dynamic/warm/dark/neon
corner OR anywhere between — and it should look *intentional* at every point, never like a dialed-down
or dialed-up version of a single hardcoded look. Both extremes are first-class. A minimal SaaS landing
page at SOLO is not a "lesser" output than a maximal fashion site at MISSION; it is the same craft
resolved to a different point in the range.

**Code-driven assets scale with the range too.** At the neon top end, Remotion motion graphics,
self-drawing SVG, Hyperframe sequences, and seeded algorithmic-art backgrounds run hot and dense. At
the calm floor, the same engines emit a single quiet vector mark or a sparse, slow generative texture —
or nothing at all. See `references/code-driven-assets.md` and `references/algorithmic-art.md`.
