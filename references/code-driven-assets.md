# Code-Driven Assets — Iron Canvas v4.2
## *Deterministic generation. No AI cost. No frame drift. Infinite resolution.*

> **The fourth asset class.** v4 classified assets as scroll-tied / looping / static — all AI-generated.
> v4.2 adds CODE-DRIVEN: assets defined in code, rendered deterministically. SVG, Remotion, Hyperframes.
> **Position in pipeline:** Phase 5 GENERATE (alongside AI engines) + Phase 6 COMPOSE (integration)
> **Primary agents:** Agent-D (Artifacts) owns generation, Agent-B (Motion) + Agent-C (UI) own integration

---

## WHY CODE-DRIVEN ASSETS

AI image generation (Nano Banana Pro, Whisk, Flow) is unmatched for photorealism, texture, and organic imagery. But it has three structural weaknesses that code-driven generation solves:

| Problem with AI assets | Code-driven solution |
|------------------------|----------------------|
| Frame drift (each frame slightly different) | Deterministic — frame N is always identical |
| Fixed resolution (regenerate for retina/4K) | Vector / parametric — renders crisp at any size |
| Per-generation cost + latency | Free, instant, runs in CI/build |
| Hard to make data-accurate (charts, exact brand shapes) | Pixel-exact from data + design tokens |
| Can't edit one element without regenerating | Every element is addressable code |

**The decision rule:** If the asset is photographic/organic/textural → AI engine. If the asset is geometric, data-driven, logo/brand, animated UI, or must be exact → code-driven.

Iron Canvas uses BOTH. A hero might pair an AI-generated atmospheric background (Nano Banana Pro) with a code-driven animated SVG logo mark and a Remotion-rendered stat ticker. The Asset Classification step now routes to four destinations, not three.

---

## CAPABILITY 1 — SVG GRAPHICS

**What it is:** Vector graphics defined in markup, animated with CSS, SMIL, or GSAP. Resolution-independent, tiny payload, fully inspectable and editable.

**Agent owner:** Agent-C (inline UI graphics) + Agent-D (standalone generated graphics)

### When Iron Canvas uses SVG
- **Logo marks** that draw themselves on load (stroke-dashoffset animation)
- **Path morphing** — one shape fluidly becoming another (blobs, icon transitions, hero shapes)
- **Generative patterns** — backgrounds, dot grids, line fields, noise displacement
- **Animated data viz** — charts, gauges, progress rings driven by real data
- **Icon systems** — a cohesive set with consistent stroke weight and animation
- **SVG filters** — feTurbulence (organic noise), feGaussianBlur, feDisplacementMap (liquid distortion), feColorMatrix (duotone/brand tinting)

### SVG animation techniques (by intensity)

```
INTENSITY 0.1–0.3 (SOLO baseline):
  → Static SVG icons + logo
  → Simple hover color transitions
  → One self-drawing logo on load

INTENSITY 0.4–0.6 (SWARM standard):
  → Self-drawing logo + section dividers
  → Path morphing on key shapes
  → Animated progress/data rings (real values)
  → Generative dot-grid or line-field background

INTENSITY 0.7–1.0 (MISSION ceiling):
  → Full GSAP DrawSVG choreography
  → feTurbulence + feDisplacementMap liquid effects
  → Morphing hero illustrations
  → Scroll-tied SVG path animation (stroke reveals on scroll)
  → Generative animated patterns reacting to cursor
```

### Implementation libraries
- **GSAP DrawSVGPlugin** — stroke draw-on (premium, requires GSAP license; CSS stroke-dashoffset is the free equivalent)
- **GSAP MorphSVGPlugin** — true path morphing with point-matching (or `flubber` as free alternative)
- **CSS `@keyframes` + `stroke-dashoffset`** — free self-drawing effect, works everywhere
- **SMIL `<animate>`** — declarative, no JS, great for looping morphs (used in the showcase)
- **`feTurbulence` / `feDisplacementMap`** — native SVG filters for organic motion, zero dependencies

### BPM activation drivers
- `digital ≥ 6` → SVG line-art and technical diagrams favored
- `minimal ≥ 7` → SVG over raster (clean, precise, lightweight)
- `avant_garde ≥ 7` → generative + filter-based SVG effects
- `playful ≥ 7` → morphing shapes, bouncy icon animation

### Agent-D SVG generation protocol
```
1. Read brand color tokens from feel-profile.json → color.primary_oklch
2. Read design_intensity.systems for SVG-relevant intensity
3. Generate SVG with:
   → Gradients referencing exact brand hex/oklch
   → viewBox sized to container (from design-prd asset manifest)
   → Animation timing from motion-budget tier
4. Output to /agent-outputs/agent-d/svg/{name}.svg
5. Provide BOTH standalone .svg AND inline-JSX/HTML version
6. Classify: CODE-DRIVEN → no optimization step needed (already optimal)
```

---

## CAPABILITY 2 — REMOTION

**What it is:** A React framework for making real video programmatically. You write components; Remotion renders them frame-by-frame to MP4/WebM/GIF via headless Chromium. Every frame is deterministic and driven by `useCurrentFrame()`.

**Access:** `npm i remotion @remotion/cli` — runs locally or in CI, renders with `npx remotion render`
**Agent owner:** Agent-D (composition authoring) + Agent-B (integration of rendered output)

### When Iron Canvas uses Remotion
- **Data-driven motion graphics** — animated stat counters, chart reveals, timelines with REAL numbers
- **OG video** — the v4 OG image, but animated (1200×630 looping MP4 for social/hero)
- **Deterministic scroll sequences** — the v4 Keyframe Interpolation problem solved perfectly: instead of 2 AI stills → Flow → drift-prone frames, author the motion in React → render exact frames at 15fps
- **Product explainer loops** — feature callouts, UI walkthroughs, branded transitions
- **Logo stings** — branded intro animation rendered to video for embeds

### Remotion vs Google Flow (v4) — when to use which

```
GOOGLE FLOW (v4 — AI interpolation):
  ✓ Organic/photographic transitions (product melting, liquid, smoke)
  ✓ When you have 2 AI stills and want natural in-between motion
  ✗ Not pixel-exact, not data-accurate, costs per generation

REMOTION (v4.2 — code interpolation):
  ✓ Geometric, typographic, data-driven motion
  ✓ Exact brand shapes, precise timing, real numbers
  ✓ Free, deterministic, re-renderable at any resolution/fps
  ✗ Not for photorealistic organic imagery (use AI for that)

RULE: Organic motion → Flow. Designed/data motion → Remotion.
```

### Remotion → scroll sequence pipeline (replaces v4 default for designed sequences)
```
1. Author <ScrollSequence/> React component (parametric — driven by frame)
2. Use interpolate() to map frame → animation values
3. Render to frames directly:
   npx remotion render ScrollSequence out/frame --sequence --image-format=jpeg
   (or render MP4 then ffmpeg extract at 15fps — same as v4 frame protocol)
4. Output: /public/sequences/{name}/frame-001.jpg ... (zero-padded)
5. Agent-B binds frames to GSAP ScrollTrigger (unchanged from v4)
6. Classify: was CODE-DRIVEN source → becomes SCROLL-TIED on integration
```

### Remotion → OG video pipeline (extends v4 mandatory OG image)
```
1. Author <OGCard/> — brand logo + tagline + animated accent (uses design tokens)
2. Render: npx remotion render OGCard public/og-video.mp4 --codec=h264
   Also render still frame 0 as fallback og-image.jpg (v4 requirement preserved)
3. Output: /public/og-video.mp4 (<2MB) + /public/og-image.jpg (poster fallback)
4. HTML: <meta property="og:video"> + <meta property="og:image"> (fallback)
```

### Performance discipline
- Remotion output is REAL video → same rules as v4 looping backgrounds (autoplay+loop+muted+playsinline)
- For scroll sequences, extract to frames — never hand the MP4 to a scroll engine (Anti-Pattern #7 still applies)
- Tier 1 (Marketing): Remotion OG video capped, prefer animated SVG for in-page motion (lighter)
- Tier 2–3: Remotion freely used for hero + section motion graphics

### BPM activation drivers
- `bold ≥ 6` AND data-heavy content → Remotion stat/chart motion graphics
- Product showcase (Type D) → Remotion product explainer loop
- Dashboard (Type C) → Remotion for animated metric reveals in marketing shots
- `serious ≥ 8` + `technical ≥ 7` → Remotion data visualization (precise, credible)

---

## CAPABILITY 3 — HYPERFRAMES

**What it is:** Iron Canvas's named technique for **code-defined, high-fidelity frame sequences** — the deterministic evolution of v4's Keyframe Interpolation. Instead of generating 2 AI stills and letting Flow guess the in-betweens (drift-prone), a Hyperframe sequence is defined parametrically in code and rendered to exact frames.

**Agent owner:** Agent-B (parametric definition) + Agent-D (render + extraction)

### The lineage
```
v3:    Generate 60 individual AI frames (slow, inconsistent — Anti-Pattern #8)
v4:    Keyframe Interpolation — 2 AI stills → Google Flow → extract frames (better, but drifts)
v4.2:  HYPERFRAMES — parametric definition → deterministic render → exact frames (no drift)
```

### What makes a Hyperframe sequence
A Hyperframe is a frame sequence where every frame is a pure function of its index:
```
frame(i) = render(parametricScene, progress = i / totalFrames)
```
Because it's deterministic:
- Frame 30 is byte-identical every render
- Re-render at 960px (mobile) or 3840px (4K) from the same definition
- Edit one parameter → entire sequence updates coherently
- Zero AI cost, runs in the build

### Three Hyperframe authoring methods (pick by content)

```
METHOD A — SVG Hyperframes (lightest):
  → Parametric SVG scene, frame drives path/transform values
  → Render each frame via headless render OR animate live (no extraction needed)
  → Best for: line art reveals, geometric morphs, logo builds, diagrams
  → Often stays as LIVE animated SVG (no frame extraction at all)

METHOD B — Remotion Hyperframes (richest):
  → React scene with interpolate(), rendered to exact JPEG frames
  → Best for: typographic motion, data sequences, layered compositions
  → See Remotion → scroll sequence pipeline above

METHOD C — Canvas/WebGL Hyperframes (most performant for 3D):
  → Three.js/OGL scene, frame = camera/object state at progress
  → Render offline to frames OR run live for Tier 3 immersive
  → Best for: product 360° (parametric, not AI), particle systems, 3D reveals
```

### Hyperframe decision gate (Phase 5)
```
Scroll sequence needed →
  Is the subject photographic/organic? (real product, person, texture)
    YES → AI path: Nano Banana Pro frames OR Flow interpolation (v4)
    NO  → Is it geometric/typographic/data/brand-shape?
      YES → HYPERFRAMES (v4.2) — pick Method A/B/C by richness needed
```

### BPM activation drivers
- `avant_garde ≥ 7` → Hyperframe generative sequences
- `digital ≥ 7` → SVG/Canvas Hyperframes (technical precision aesthetic)
- `minimal ≥ 7` → SVG Hyperframes (clean, lightweight, exact)
- Product showcase with non-photographic hero → Canvas Hyperframe 360°

---

## ASSET CLASSIFICATION TAXONOMY — v4.2 EXPANDED

The v4 taxonomy gains a fourth class. Agent-D classifies EVERY asset before integration:

```
┌──────────────────┬─────────────────────────────────────────────────────┐
│ Class            │ Pipeline                                              │
├──────────────────┼─────────────────────────────────────────────────────┤
│ SCROLL-TIED      │ 15fps JPEG frames → Canvas + ScrollTrigger            │
│ LOOPING BG       │ MP4 autoplay+loop+muted → z-index behind content      │
│ STATIC           │ WebP/AVIF optimized → loading="lazy" below fold       │
│ CODE-DRIVEN ★v4.2│ SVG inline / Remotion render / Hyperframe definition  │
│                  │ → may stay live (SVG) OR render to one of the above   │
└──────────────────┴─────────────────────────────────────────────────────┘
```

**Key insight:** CODE-DRIVEN is both a source class and can resolve INTO the other three:
- A Hyperframe sequence (code-driven) renders → SCROLL-TIED frames
- A Remotion OG card (code-driven) renders → LOOPING BG video
- An animated SVG logo (code-driven) → stays live inline (no render needed — best case)

When an asset can stay live (SVG), it should — zero payload beyond the markup, infinite resolution, fully editable.

---

## ENGINE REGISTRY — v4.2 ADDITIONS

Added to the Phase 3/5 engine registry (references/model-selection.md):

| Engine | Type | Best For | Phase | Cost |
|--------|------|----------|-------|------|
| **Inline SVG + CSS/SMIL** ★v4.2 | Code → vector | Logos, morphs, patterns, icons | 3,5,6 | Free |
| **GSAP DrawSVG/MorphSVG** ★v4.2 | Code → vector motion | Premium SVG choreography | 6 | License |
| **Remotion** ★v4.2 | Code → video | Data motion graphics, OG video, designed sequences | 5 | Free |
| **Hyperframes (A/B/C)** ★v4.2 | Code → frames | Deterministic scroll sequences (non-photographic) | 5 | Free |

These sit ALONGSIDE the AI engines (Nano Banana Pro, Whisk, Flow, Leonardo) — not replacing them. The Asset Classification gate routes each asset to AI or code-driven based on whether it's organic or designed.

---

## AGENT INTEGRATION SUMMARY

### Agent-D (Artifacts) — expanded mandate
```
v4.2 additions to Agent-D:
  ✅ Generate inline SVG (logos, patterns, icons, data viz) from brand tokens
  ✅ Author Remotion compositions for data motion + OG video
  ✅ Define Hyperframe sequences (pick Method A/B/C)
  ✅ Run the Asset Classification gate including CODE-DRIVEN routing
  ✅ Prefer live SVG when an asset can stay vector (zero payload)
```

### Agent-B (Motion) — expanded mandate
```
v4.2 additions to Agent-B:
  ✅ Bind Remotion/Hyperframe-rendered frames to ScrollTrigger (same as v4)
  ✅ Drive SVG path animation on scroll (stroke-dashoffset tied to progress)
  ✅ Integrate live SVG Hyperframes (Method A) without frame extraction
```

### Agent-C (UI) — expanded mandate
```
v4.2 additions to Agent-C:
  ✅ Inline animated SVG logos + icon systems (Sweep 1)
  ✅ SVG hover/interaction micro-animations (Sweep 2)
  ✅ SVG filter effects (duotone, displacement) on brand imagery
```

---

## ANTI-PATTERN: CODE-VS-AI MISROUTING

**Anti-Pattern #13: CODE-VS-AI MISROUTING (v4.2)**

What it looks like: Using AI image generation for a logo, icon, or data chart (gets fuzzy, inexact, wrong numbers, fixed resolution). OR using code/SVG to fake photorealistic organic imagery (looks flat and synthetic).

Why it happens: Reaching for one tool habitually instead of classifying the asset.

How to prevent: The Asset Classification gate asks ONE question first — "is this photographic/organic or designed/exact?" Organic → AI engine. Designed → code-driven. A product photo is AI. A logo is SVG. A chart is Remotion/SVG. A smoke transition is Flow. A geometric scroll morph is a Hyperframe.

**Red flag:** Generating a logo or chart with Nano Banana Pro.
**Red flag:** Trying to make a photorealistic human face with SVG.

---

## SHOWCASE REFERENCE

The four code-driven techniques are demonstrated LIVE in `/showcase/iron-canvas-showcase.jsx`:
- Self-drawing anvil mark (SVG stroke animation)
- Path morph (SMIL `<animate>`)
- Motion-graphics bars (represents Remotion data motion)
- Generative dot grid (represents Hyperframe Method A)

All four run with zero AI cost, scale to any resolution, and dial their speed with the Design Intensity Scale. Use the showcase as the North Star reference when deciding whether an asset should be code-driven.

---

*Code-Driven Assets — Iron Canvas v4.2*
*"Organic motion is generated. Designed motion is computed. Know which is which."*

---

## RELATED: ALGORITHMIC ART (generative sub-class)

Algorithmic art is the **generative sub-class** of this asset family — flow fields, particle systems,
noise/domain-warp gradients, geometric tiling, attractors. It belongs to the same decision gate
(geometric / data / exact → code-driven, not the AI image engine) and the same four-class taxonomy as
SVG, Remotion, and Hyperframes here. Two distinctions:

- **SVG / Remotion / Hyperframes** are *authored* — a designer specifies the exact paths, keyframes, or
  frames. Output is deterministic by construction.
- **Algorithmic art** is *grown* from a seeded function — the designer specifies rules + a seed, and the
  system produces the form. Determinism comes from the seed (mulberry32), so renders are reproducible.

Both are mode-reactive (intensity/speed scale with the DIS) and both are demonstrated live and
mode-driven in `/showcase/iron-canvas-showcase.jsx`. Full spec: `references/algorithmic-art.md`.
