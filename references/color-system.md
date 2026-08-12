# COLOR SYSTEM
## *Iron Canvas — Phase 2 Integration*

> Color is not decoration. It is the emotional frequency of the brand.
> Every Iron Canvas build extracts, extends, and deploys color with intention.
> This file governs palette construction, gradient specification, and shadow protocol.

---

## STEP 1: PALETTE EXTRACTION

Before generating any CSS, extract the brand's existing color identity.

```
EXTRACTION SOURCES (in priority order):
1. Logo / wordmark (most authoritative)
2. Existing hero imagery (ambient palette)
3. Brand guidelines (if available in prompt)
4. Industry color conventions (fallback)

EXTRACT THESE VALUES:
→ Primary brand color (the "signature" hue)
→ Secondary brand color (if exists)
→ Background preference (pure black / off-black / paper / cream / pure white)
→ Text color (pure black tends to be harsh — 95% black is better)
→ Accent (can be derived if not explicit)
```

---

## STEP 2: OKLCH PALETTE EXTENSION

Modern color systems use oklch (perceptually uniform) not hex → hex guesswork.
oklch(L C H) — Lightness 0-1, Chroma 0-0.4, Hue 0-360°

```css
/* EXAMPLE: Brand primary = oklch(0.55 0.18 260) — a deep indigo */

/* Derive full palette via chroma/lightness shifts, NOT hue rotation */
:root {
  /* Primary family */
  --color-primary-950: oklch(0.15 0.18 260); /* darkest */
  --color-primary-900: oklch(0.22 0.20 260);
  --color-primary-800: oklch(0.30 0.22 260);
  --color-primary-700: oklch(0.40 0.22 260);
  --color-primary-600: oklch(0.50 0.20 260);
  --color-primary-500: oklch(0.55 0.18 260); /* brand anchor */
  --color-primary-400: oklch(0.65 0.16 260);
  --color-primary-300: oklch(0.75 0.12 260);
  --color-primary-200: oklch(0.85 0.08 260);
  --color-primary-100: oklch(0.93 0.04 260);
  --color-primary-50:  oklch(0.97 0.02 260);

  /* Semantic tokens derived from primary */
  --color-accent:      var(--color-primary-500);
  --color-accent-glow: oklch(0.55 0.22 260 / 0.4); /* for glow effects */
  --color-surface:     oklch(0.08 0.02 260);        /* dark bg */
  --color-surface-alt: oklch(0.12 0.03 260);        /* card bg */
  --color-text:        oklch(0.96 0.01 260);        /* near-white body */
  --color-text-muted:  oklch(0.65 0.04 260);        /* secondary text */
  --color-border:      oklch(0.22 0.05 260 / 0.6);  /* subtle borders */
}
```

**Harmony options (choose one per project):**
```
ANALOGOUS:       Shift hue ±30° for secondary (safe, cohesive)
COMPLEMENTARY:   Shift hue +180° for accent contrast (high impact)
SPLIT-COMP:      Hue ±150° for triadic tension (avant-garde/editorial)
MONOCHROMATIC:   Same hue, vary L and C only (refined, luxury)
```

---

## STEP 3: GRADIENT MESH SPECIFICATION

Gradient mesh is the signature texture of premium 2024-2026 design.
Not flat gradients — organic, multi-point mesh that breathes.

**When to use:**
```
Brand Personality bold ≥ 6 → gradient mesh on hero background
Brand Personality avant-garde ≥ 7 → full-page gradient mesh system
Luxury/cinematic feel profile → deep mesh with low opacity noise overlay
Corporate/functional feel profile → subtle gradient, near-flat
```

**Implementation:**
```css
/* Conic gradient mesh (organic feel) */
.mesh-bg {
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%,
      oklch(0.40 0.20 260 / 0.6) 0%, transparent 70%),
    radial-gradient(ellipse 60% 80% at 80% 70%,
      oklch(0.35 0.18 200 / 0.5) 0%, transparent 70%),
    radial-gradient(ellipse 100% 40% at 50% 0%,
      oklch(0.55 0.22 290 / 0.3) 0%, transparent 60%),
    oklch(0.08 0.02 260); /* base */
}

/* Noise overlay (grain texture — premium feel) */
.mesh-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise filter */
  opacity: 0.035; /* subtle — should be felt not seen */
  mix-blend-mode: overlay;
}
```

**Mesh configuration by feel profile:**
```
DEEP/LUXURY:     3-4 radial gradients, dark base, low opacity (0.3-0.5)
                 Grain opacity: 0.04-0.06
VIBRANT/BOLD:    2-3 gradients, saturated colors, higher opacity (0.5-0.7)
                 Grain opacity: 0.02-0.04
LIGHT/CLEAN:     1-2 gradients, pastel chroma, very low opacity (0.1-0.3)
                 Grain opacity: 0.015-0.025
CORPORATE/FLAT:  No mesh. Maximum 1 subtle directional gradient.
```

---

## STEP 4: SHADOW PROTOCOL

Flat gray shadows are a dead giveaway of generic design.
Branded shadows match the ambient light of the design's color palette.

```css
/* RULE: Shadows should be tinted to the brand's primary hue */

/* ❌ Generic: */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

/* ✅ Branded: */
box-shadow:
  0 4px 20px oklch(0.10 0.15 260 / 0.4),  /* ambient — brand tinted */
  0 1px 4px oklch(0.05 0.10 260 / 0.6);   /* sharp contact shadow */

/* ELEVATED (cards, modals) */
box-shadow:
  0 20px 60px oklch(0.08 0.18 260 / 0.5),
  0 4px 16px oklch(0.08 0.15 260 / 0.3),
  inset 0 1px 0 oklch(0.40 0.10 260 / 0.2); /* top edge highlight */

/* GLOW (CTA buttons, active states, featured items) */
box-shadow:
  0 0 0 1px var(--color-accent / 0.3),
  0 0 20px var(--color-accent-glow),
  0 4px 12px oklch(0.08 0.18 260 / 0.4);
```

---

## STEP 5: DARK MODE PROTOCOL

When Brand Personality bold ≥ 6 OR feel includes dark/night/deep energy:

```css
/* tokens.css already establishes light tokens */
/* tokens-dark.css overrides them */

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface:     oklch(0.08 0.02 260);
    --color-surface-alt: oklch(0.12 0.03 260);
    --color-text:        oklch(0.96 0.01 260);
    --color-text-muted:  oklch(0.65 0.04 260);
    --color-border:      oklch(0.22 0.05 260 / 0.5);
    /* Primary/accent stay the same — only surfaces and text flip */
  }
}

/* Manual toggle support (data-theme attribute) */
[data-theme="dark"] {
  /* same as above */
}
```

**Agent-A generates dark mode tokens when:**
```
feel-profile.json → dark_mode: true
OR Brand Personality bold ≥ 6
OR feel_profile.emotion includes: "night", "deep", "cinematic", "dark", "moody"
```

---

## INTEGRATION POINT: feel-profile.json

Phase 2 output must include:

```json
{
  "color": {
    "primary_oklch": "oklch(0.55 0.18 260)",
    "secondary_oklch": "oklch(0.50 0.20 200)",
    "background_type": "near-black | off-white | pure-white | paper",
    "harmony": "analogous | complementary | monochromatic",
    "gradient_mesh": true,
    "mesh_intensity": "deep | vibrant | light | none",
    "grain_overlay": true,
    "grain_opacity": 0.04,
    "shadow_tint": true,
    "dark_mode": false
  }
}
```

---

*Iron Canvas v4.2 — references/color-system.md*

---

## PALETTE DERIVATION PROTOCOL ★v4.2
### *How the palette is DERIVED from DNA — never imposed. The warm-adaptation mechanism.*

STEP 1 extracts the brand's existing colors. This protocol turns that extraction + the Brand
Personality Matrix into a complete oklch palette. It is the mechanism that produced the warm
espresso-and-gold treatment in the v4.2 smoke test from a brand whose only color cue was a
brownish-gold button — and it is why Iron Canvas never defaults to a house purple/blue.

> **Hard rule:** Iron Canvas has NO default palette. Every palette is derived. If a build ships
> in a generic violet/indigo it didn't earn, that is Anti-Pattern #5 (could-be-anyone) — reject it.

### Derivation inputs
```
1. Extracted brand hue + temperature  (Phase 1 STUDY — from logo, imagery, existing CSS)
2. Brand Personality Matrix scores     (Phase 2 FEEL — 6 axes 1-10)
3. Industry convention                 (tiebreaker only, never primary)
```

### Mapping table — BPM → palette characteristics

| BPM signal | Drives | Effect on palette |
|------------|--------|-------------------|
| `organic ≥ 6` | Hue family | Warm earth band (oklch hue 40–95): espresso, cocoa, amber, gold, terracotta |
| `organic ≤ 3` + `digital ≥ 6` | Hue family | Cool/technical band (oklch hue 220–280): slate, electric blue, violet |
| `refined ≥ 7` | Chroma | Low-chroma base (≤0.03) + ONE selective high-chroma accent — sophistication |
| `bold ≥ 7` | Contrast + base | Permits a saturated signature accent; pushes toward a dramatic DARK base |
| `minimal ≥ 7` | Palette size | 2–3 colors max, wide neutral range, restraint |
| `contemplative ≥ 6` | Lightness | Deeper, calmer base; lower overall luminance |
| `classic ≥ 7` + `refined ≥ 6` | Heritage branch | **Distinct from organic-warm.** Crisp near-neutral *paper* base + deep COOL jewel ink (emerald hue ~150 or oxblood hue ~25) + near-black text, high contrast — editorial/timeless. Never the warm-clay spa palette. |
| `organic ≥ 6` + `contemplative ≥ 7` + `minimal ≥ 7` | Spa branch | Soft WARM light base (cream/clay hue ~70), low chroma, low contrast, near-monochrome — calm wellness. The deliberate opposite of the heritage branch. |
| `avant_garde ≥ 7` | Permission | Unexpected pairings, gradient mesh, unconventional accent |

### Base selection (dark vs light)
```
DARK base when:  bold ≥ 7  OR  contemplative ≥ 6  OR  extracted imagery is dark
                 OR feel includes luxury/night/deep/dramatic
LIGHT base when: minimal ≥ 7 + airy/clean/fresh  OR  extracted brand is paper/cream/white
ALWAYS: text is 93–95% of base contrast, never pure #000/#fff (harsh)
```

> **Two light palettes, two worlds.** Wellness/spa (warm, soft, low-contrast clay) and editorial/classic
> (cool emerald-or-oxblood ink on crisp paper, high-contrast) are BOTH light and BOTH elegant — but must
> never converge. If a derived classic palette comes out warm/soft, it is mis-derived: re-run with the
> heritage branch.

### Worked example — the smoke test (Crown Collection)
```
INPUT:
  Extracted color: #8a6d3b (warm brownish-gold button) → temperature = WARM, hue ≈ 75
  BPM: refined 9, organic 8, bold 7, avant_garde 6, minimal 4, contemplative 7

DERIVATION:
  organic 8        → warm earth hue band (oklch hue 45–82)        → espresso/amber/gold
  bold 7 + contemplative 7 → DARK base                            → oklch(0.18 0.02 50) espresso
  refined 9        → low-chroma surfaces + ONE high-chroma accent → muted cocoa surfaces,
                                                                     gold the single bright note
  avant_garde 6    → gradient mesh permitted                      → 3 warm orbs

OUTPUT oklch ramp:
  --bg        oklch(0.18 0.02 50)    espresso
  --surface   oklch(0.24 0.025 55)   warm cocoa
  --gold      oklch(0.78 0.12 78)    signature accent
  --gold-bright oklch(0.86 0.13 82)  highlight
  --amber     oklch(0.7 0.14 55)     secondary warm
  --cream     oklch(0.93 0.03 80)    text (95% contrast, not pure white)

RESULT: warm-luxury identity, derived — NOT the showcase's purple. This is the adaptation.
```

### Derivation algorithm (Phase 2, writes into feel-profile.json → color)
```
1. temperature   = sign(extracted hue) → warm | cool | neutral
2. hue_band      = map(organic/digital + temperature) → oklch hue range
3. base_mode     = dark|light (rules above)
4. chroma_policy = map(refined/classic/minimal) → base chroma + accent chroma
5. accent_count  = minimal ≥ 7 ? 1 : (bold ≥ 7 ? 2 : 1–2)
6. build oklch ramp: bg, bg-deep, surface, primary accent, bright, secondary, cream/ink, line, glass
7. write color block + feed gradient-mesh hues into design_intensity (System 1)
8. SELF-CHECK: would this palette pass "same brand, unmistakably theirs"? If generic → re-derive.
```

The derived `color` block is consumed by Agent-A (tokens.css), Agent-D (asset palette
conditioning — algorithmic art, SVG gradients), and the Design Intensity Scale (mesh hues).

---

*Color System — Iron Canvas v4.2*
*"No default palette. The brand's DNA decides its colors — warm or cool, the system adapts."*
