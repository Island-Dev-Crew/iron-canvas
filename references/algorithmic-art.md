# Algorithmic Art — Iron Canvas v4.2
## *Generative systems as signature design. Seeded, reproducible, infinitely tunable.*

> **Sub-class of CODE-DRIVEN assets** (see references/code-driven-assets.md).
> Where SVG is precise vector and Remotion is composed video, algorithmic art is EMERGENT —
> visuals produced by rules, randomness, and math rather than hand-placement.
> **Primary agents:** Agent-D (generation) + Agent-B (live/animated integration)
> **Engines:** p5.js, HTML Canvas 2D, WebGL/GLSL shaders, SVG generative

---

## WHAT ALGORITHMIC ART ADDS TO IRON CANVAS

The "one unforgettable thing" (Taste Doctrine #5) is often a generative moment: a flow field that
responds to the cursor, a particle system that forms the logo, a noise-driven gradient that's never
the same twice. These can't be bought from a template and can't be AI-image-generated — they're
computed live. They are Iron Canvas's highest-ceiling signature capability.

Critically: algorithmic art is **seeded and reproducible**. A given seed always produces the same
output, so a hero can be locked once approved, while still being re-tunable by changing parameters.

---

## THE FIVE GENERATIVE SYSTEMS

### System A — FLOW FIELDS
Particles follow a vector field derived from Perlin/simplex noise. Produces organic, flowing,
topographic motion. The signature "generative art" look.
```
Use when: avant_garde ≥ 7, organic ≥ 6, hero backgrounds, contemplative pacing
Palette: pulled from brand tokens (oklch ramp), never rainbow-default
Density: scales with Design Intensity (see mapping below)
Interaction: cursor can bend the field (MISSION only)
```

### System B — PARTICLE SYSTEMS
Thousands of points with physics (attraction, repulsion, flocking/boids). Can form shapes,
disperse on scroll, or assemble into the logo.
```
Use when: bold ≥ 7, digital ≥ 6, hero moments, loading transitions
Signature move: particles assemble into brand mark on load, disperse on scroll
Performance: cap particle count by tier (T1: skip, T2: ≤2k, T3: ≤8k GPU)
```

### System C — NOISE / DOMAIN-WARP GRADIENTS
GLSL or canvas noise that warps a brand-color gradient into living, slowly-shifting fields.
The premium alternative to a static gradient mesh.
```
Use when: refined ≥ 6, any mesh-gradient context wanting motion
Implementation: GLSL fragment shader (Tier 3) or canvas simplex (Tier 2)
This is the animated upgrade to System 1 (Gradient Mesh) of the Design Intensity Scale
```

### System D — GEOMETRIC / TILING SYSTEMS
Rule-based pattern generation: Truchet tiles, recursive subdivision, Voronoi, circle packing,
L-systems. Structured, architectural, precise.
```
Use when: classic + avant_garde mix, technical ≥ 7, editorial layouts, section dividers
Renders crisp as SVG (preferred) — stays vector, zero payload
Great for: backgrounds that feel designed, not decorative
```

### System E — STRANGE ATTRACTORS / MATHEMATICAL CURVES
Lorenz, Clifford, de Jong attractors; parametric curves; harmonographs. Mathematically beautiful,
unmistakably computed, deeply on-brand for technical/scientific clients.
```
Use when: technical ≥ 8, serious ≥ 7, data/science/engineering brands
Renders as: dense point clouds (canvas) or single continuous SVG path
Reproducible: same equation + seed = identical art every time
```

---

## DESIGN INTENSITY MAPPING

Algorithmic art is gated by the Design Intensity Scale like every other system:

```
INTENSITY 0.0–0.2 (SOLO floor):
  → No generative art. Static gradient/pattern only.

INTENSITY 0.3–0.5 (SOLO override / SWARM standard):
  → ONE generative element, non-interactive
  → System C (noise gradient) or System D (SVG tiling) — lightest, no perf risk
  → Renders once, sits behind content

INTENSITY 0.6–0.8 (SWARM ceiling / MISSION standard):
  → Generative hero background (flow field or particle system)
  → Subtle scroll response
  → System A/B/C live on canvas, seeded + locked

INTENSITY 0.9–1.0 (MISSION ceiling):
  → Interactive generative hero (cursor-reactive flow field / particle assembly)
  → GLSL shader-driven (System C/E)
  → The screenshot moment — particles form the logo, field bends to cursor
```

**BPM activation drivers (which system the DNA selects):**
| BPM signal | Generative system |
|------------|-------------------|
| `avant_garde ≥ 8` + `organic ≥ 6` | A — Flow fields |
| `bold ≥ 8` + `digital ≥ 7` | B — Particle assembly |
| `refined ≥ 7` wanting motion | C — Noise/domain-warp gradient |
| `technical ≥ 7` + `classic ≥ 6` | D — Geometric tiling |
| `technical ≥ 8` + `serious ≥ 7` | E — Attractors / math curves |
| `minimal ≥ 8` | NONE — generative art conflicts with minimalism |

---

## HARD RULES (non-negotiable)

### RULE 1: SEEDED + REPRODUCIBLE
Every generative piece uses a fixed seed (e.g., a seeded PRNG, not raw `Math.random()`).
The approved output must be reproducible. Store the seed in the asset manifest.
```js
// Correct — seeded
const rng = mulberry32(0xC0FFEE);
// Wrong — non-reproducible, can't lock an approved hero
Math.random();
```

### RULE 2: ORIGINAL, NEVER COPIED
Generate ORIGINAL algorithmic art. NEVER reproduce a known artist's signature system or a
copyrighted generative work. The math is universal; the specific parameterization + palette
must be Iron Canvas's own, derived from the brand's tokens.

### RULE 3: BRAND-CONDITIONED PALETTE
Colors come from `feel-profile.json → color` (oklch ramp). Never the p5.js rainbow default,
never random hues. The generative system is a vehicle for the brand palette.

### RULE 4: PERFORMANCE-GATED
```
TIER 1 (Marketing, LCP < 2.5s):  Generative art OFF, or pre-rendered to a static image
TIER 2 (Animated, LCP < 3.5s):   Canvas 2D, ≤2k particles, throttle to 30fps, pause off-screen
TIER 3 (Immersive):              WebGL/GLSL allowed, ≤8k particles, requestAnimationFrame
ALWAYS: prefers-reduced-motion → freeze on a seeded static frame
ALWAYS: pause render loop when canvas scrolled out of viewport (IntersectionObserver)
```

### RULE 5: STATIC FALLBACK
A seeded static frame (PNG/SVG) is always produced as the fallback for reduced-motion,
slow devices, and the OG image. Live generative = enhancement, never the only path.

---

## ENGINE SELECTION

| Engine | Best for | Tier | Output |
|--------|----------|------|--------|
| **HTML Canvas 2D** | Flow fields, particles ≤2k, attractors | 2 | Live + static frame |
| **p5.js** | Rapid generative prototyping, sketching systems | 2 | Live + static frame |
| **WebGL / GLSL** | Noise gradients, shaders, particles ≤8k | 3 | Live + static frame |
| **SVG generative** | Tiling, geometric, Voronoi, circle packing | 1–2 | Vector (stays live, zero payload) |

**Preference order for the SAME visual:** SVG generative (if geometric) → Canvas 2D → WebGL.
Always pick the lightest engine that achieves the look at the required intensity.

---

## AGENT-D GENERATION PROTOCOL

```
1. Read feel-profile.json → BPM scores + color ramp + design_intensity
2. Select generative system (A–E) from BPM activation table
3. Select engine (lightest that hits target intensity + tier)
4. Set seed (record in design-prd asset manifest for reproducibility)
5. Wire palette from brand oklch tokens — NO defaults
6. Generate:
   → Live module: /agent-outputs/agent-d/generative/{name}.js (+ canvas mount)
   → Seeded static fallback: /agent-outputs/agent-d/generative/{name}-still.png
7. Add prefers-reduced-motion + IntersectionObserver pause hooks
8. Classify: CODE-DRIVEN (generative sub-class)
9. Hand live module to Agent-B for scroll/cursor integration
```

---

## ASSET CLASSIFICATION

Algorithmic art is the generative sub-class of CODE-DRIVEN:
```
CODE-DRIVEN
 ├── SVG (logos, morphs, icons, data viz)
 ├── Remotion (data motion graphics, OG video)
 ├── Hyperframes (deterministic frame sequences)
 └── ALGORITHMIC ART ★v4.2 (flow fields, particles, noise, tiling, attractors)
       → may stay LIVE (canvas/WebGL) or render to STATIC (seeded frame)
```

---

## ANTI-PATTERN: GENERATIVE-FOR-ITS-OWN-SAKE

**Anti-Pattern #14: GENERATIVE-FOR-ITS-OWN-SAKE (v4.2)**

What it looks like: A rainbow particle explosion on a law firm site. A flow field on a brand that
scored `minimal 9`. Generative art bolted on because it's flashy, not because the DNA called for it.

Why it happens: Treating algorithmic art as decoration rather than a DNA-driven choice.

How to prevent: Generative art only activates when the BPM activation table fires AND the Design
Intensity is ≥ 0.3. The palette is always brand-conditioned. If it doesn't pass the "same site but
better?" test (Anti-Pattern #5), it's noise — cut it.

**Red flag:** p5.js rainbow defaults shipping to production.
**Red flag:** Generative hero on a Tier 1 marketing page (kills LCP).
**Red flag:** A generative system with `minimal ≥ 8` in the matrix.

---

## SHOWCASE REFERENCE

The Hyperframe dot-grid in `/showcase/iron-canvas-showcase.jsx` is a minimal generative tiling
(System D) running as live SVG. Scale it up mentally to a cursor-reactive flow field for the
MISSION-mode ceiling. Use the showcase as the North Star for how generative motion should feel —
on-brand, seeded, and purposeful, never decorative chaos.

---

*Algorithmic Art — Iron Canvas v4.2*
*"The most unforgettable thing on the page is often the thing that computes itself."*
