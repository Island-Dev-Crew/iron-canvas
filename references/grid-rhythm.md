# GRID + SPATIAL RHYTHM
## *Iron Canvas — Phase 4 Integration*

> Whitespace is not empty space. It is the breath between notes.
> Every Iron Canvas build runs on a spatial system — a mathematical rhythm
> that governs all sizing, spacing, and layout decisions.

---

## STEP 1: ASSIGN A SPACING SCALE

Choose ONE scale per project. All spacing tokens derive from it.

```
8PT GRID (Default — works for all project types)
  Base unit: 8px
  Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192
  Use for: SaaS, dashboards, landing pages, product sites
  Why: Aligns with device pixel ratios. Consistent rhythm. Easy to maintain.

MODULAR SCALE (Editorial — for type-driven, content-rich sites)
  Base: 1rem (16px) × 1.333 (perfect fourth ratio)
  Scale: 0.75, 1, 1.33, 1.78, 2.37, 3.16, 4.21, 5.61rem
  Use for: Blogs, editorial sites, news, content platforms
  Why: Proportions mirror type scale. Creates natural visual harmony.

GOLDEN RATIO (Luxury/Portfolio — for maximum elegance)
  Base: 1rem × 1.618
  Scale: 0.618, 1, 1.618, 2.618, 4.236, 6.854rem
  Use for: Luxury brands, creative portfolios, artistic projects
  Why: Organic feel. Feels designed without feeling rigid.

CUSTOM FREE-FORM (Avant-garde ≥ 8 only)
  Set deliberate breaks in rhythm for intentional disruption.
  Rule: Break the grid with PURPOSE, not by accident.
  Signature: One element extends beyond the container by exactly one unit.
```

---

## STEP 2: TOKEN SYSTEM

Agent-A generates these tokens from the chosen scale:

```css
:root {
  /* SPACING — 8pt grid example */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
  --space-48: 192px;

  /* CONTAINER */
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:   1024px;
  --container-xl:   1280px;
  --container-2xl:  1440px;
  --container-full: 100%;

  /* SECTION RHYTHM — how sections breathe */
  --section-padding-sm:  var(--space-16);  /* mobile */
  --section-padding-md:  var(--space-24);  /* tablet */
  --section-padding-lg:  var(--space-32);  /* desktop */
  --section-gap:         var(--space-24);  /* between sections */
}
```

---

## STEP 3: GRID COLUMN SYSTEM

```
PROJECT TYPE → COLUMN SYSTEM

Marketing/Landing:
  → 12-column grid
  → Hero: full width or 10/12 centered
  → Features: 3×4 or 4×3 cards
  → Body content: 8/12 centered (generous margins = premium feel)

Portfolio/Creative:
  → Asymmetric: e.g., [3fr 5fr] or [7fr 5fr]
  → Avoids mechanical regularity
  → Deliberate tension between columns

Dashboard/App:
  → Fixed sidebar + fluid main: [240px 1fr] or [280px 1fr]
  → Content area: 12-column sub-grid
  → Card density: 3-4 across on desktop, 1-2 on mobile

E-Commerce:
  → Product grid: 4×N desktop, 2×N tablet, 1×N mobile
  → Product page: [5fr 4fr] (image : info)
  → Sticky product info panel on scroll
```

---

## STEP 4: SECTION RHYTHM RULES

The rhythm between sections is as important as within them.

```
RULE 1: ALTERNATING WEIGHT
  Don't stack two heavy sections. Pattern: heavy → light → heavy → light.
  Heavy = full-bleed imagery, rich gradient, dense content.
  Light = generous whitespace, sparse content, breathing room.

RULE 2: THE CONTRAST SECTION
  Every site needs at least one "contrast moment" — a section with dramatically
  different visual weight from everything around it.
  Examples: Full-bleed dark section in a light site. Full-width testimonial.
  This is the memory anchor — users remember the contrast moment.

RULE 3: HORIZONTAL BLEED MOMENTS
  In Tier 2-3 builds: at least one element per page intentionally extends
  beyond the container to break the grid.
  Maximum: 2 bleeds per page. More = chaos.
  Use for: Large imagery, horizontal scroll sections, decorative text.

RULE 4: NEGATIVE SPACE AS DESIGN
  Intentional emptiness. On premium sites, "nothing" is used as a design element.
  After a dense section → pause with a spacious transition section.
  Minimum breathing room before the next section = var(--space-24).
  Max content density per viewport height: 80% (20% should breathe).

RULE 5: MOBILE RHYTHM PRESERVATION
  Stack gracefully. Don't just collapse — redesign for portrait.
  On mobile: increase section-padding proportionally.
  Keep contrast moments alive — they must translate to mobile.
```

---

## STEP 5: BENTO GRID PROTOCOL

For dashboard, app, and feature-showcase layouts:

```css
/* Bento grid — asymmetric card layout */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: var(--space-4);
}

/* Featured card (takes 2×2) */
.bento-card--featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Wide card (takes 2×1) */
.bento-card--wide {
  grid-column: span 2;
}
```

**Bento trigger conditions:**
- Project type C (Dashboard/App) → always consider bento
- Feature section with 5-8 items → bento over standard grid
- Brand Personality avant-garde ≥ 6 → bento over uniform card grid

---

## STEP 6: ASYMMETRIC LAYOUT TRIGGERS

When to break the grid intentionally:

```
Brand Personality avant-garde ≥ 7 → one asymmetric hero layout
Project type A (Animated/Portfolio) → asymmetric section layouts allowed
Feel profile includes: "editorial / bold / unexpected / tension" → asymmetric

ASYMMETRIC PATTERNS:
→ Off-center hero text: [empty 2fr] [content 5fr] [image 5fr]
→ Oversized number/stat that bleeds: absolute positioned, -20% left offset
→ Diagonal section divider (clip-path instead of horizontal rule)
→ Text overlapping image (z-index layering, not just side-by-side)
→ One column taller than the other in a 2-col layout (vertical misalignment)
```

---

## INTEGRATION POINT: feel-profile.json

```json
{
  "layout": {
    "spacing_scale": "8pt | modular | golden | freeform",
    "column_system": "12-col | asymmetric | sidebar | bento",
    "container_max": "1280px",
    "section_rhythm": "standard | contrast-heavy | editorial",
    "grid_breaks": 1,
    "bento_sections": false,
    "asymmetric_hero": false
  }
}
```

---

*Iron Canvas v4.2 — references/grid-rhythm.md*
