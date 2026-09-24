# Surface Pack: IMMERSIVE 3D — Iron Canvas v5.0
## *The scene is the site. One world, one material, proven in a browser.*

```yaml
pack: immersive-3d
surface: "Inhabited-world experiences — campaign worlds, brand universes, portfolio worlds, launch experiences where Tier III depth IS the product"
project_types: [A-world]  # Type A where depth_language resolves ≥ 0.75 sustained (not one hero moment)
status: stable
version: 5.0
```

> **Position in pipeline:** Dispatched at Phase 0 when the project is Type A AND the depth
> hint is Tier III sustained (the world is the experience, not a section of it).
> **What it replaces:** Nothing — before v5.0 this work squeezed through the web pack with
> `bold ≥ 8` unlocks. Now it has its own physics.
> **What it preserves:** Every §20 hard rule, every §22 evidence requirement, the whole
> DNA-first core. igloo.inc-tier output with Iron Canvas discipline.

---

## DISPATCH TEST — this pack vs. web pack with a Tier III hero

```
ONE section dollies through a world, rest is DOM page  → web pack (§20 governs the moment)
The ENTIRE experience is camera + world, DOM overlays  → THIS PACK
Ask: "if WebGL died, is what remains a website or a transcript?"
  website → web pack · transcript → immersive-3d (and the fallback must become a website)
```

---

## 2. PHASE OVERRIDES

| Phase | Override |
|-------|----------|
| 1 STUDY | DNA extraction adds *material cues*: what physical substance is this brand? (stone, glass, liquid, light, fabric, voxel-toy). The world material derives from brand substance, never from what's trendy on Shadertoy. |
| 2 FEEL | BPM as standard + world-material selection (below) + fog/palette derivation: fog color comes FROM the oklch ramp — palette-locked atmosphere, never gray. |
| 3 SCOUT | Tier III North Star set (depth-language.md §searches) + a **world-material board**: 4-6 references of the chosen material language ONLY. |
| 3.5 VALIDATE | Device/feature matrix is a GATE: WebGL2 baseline, WebGPU optional enhancement, mobile GPU targets named explicitly. A world that only runs on the designer's laptop is BLOCKED. |
| 4 FORGE | Agent-A ships the DOM shell FIRST (nav, copy, CTAs — the fallback website). Agent-B's scroll work becomes the camera-rail spec (stations, spline, focus pulls). ★v6 Agent-B performs the score; the rail is its scrub act — the world subscribes to `show.on('progress')` and never reads scroll (one clock). ASSET FORGE (5a) runs in parallel: at R4 with Blender + video on, the **twin camera** is expected — Blender's clay rail writes `camera-rail.json`, the WebGL rail reads the same stations, Seedance 2.5 films along them. |
| **4.5 IMMERSE** | **THE CORE PHASE of this pack — run as a GAUNTLET LOOP ★v5.2.** Agent F fans out **N world candidates** (scene graph, world material, atmosphere, camera rail, loader, config surface, degradation ladder, evidence harness), each `worktree-fleet`-isolated; a **blind cross-family critic** scores each against the scorecard ≥ 4.0 + the North Star reference-peg screenshot diff; loop until one clears, ship the winner. phases/04.5-immerse.md governs; §20 grammar constrains; references/gauntlet-loop.md is the loop protocol (R4 = mandatory gauntlet). |
| 5 GENERATE | Assets are world assets: HDRIs/matcaps, texture sets, §19 seeded generative systems promoted into the world (particles, flow fields in 3D). OG image = a rendered world still (seeded camera position). ★v6 The media tournament judges ASSET FORGE's candidates — Blender hero objects and world pieces (budgeted GLBs: Tier III ≤ 600k tris / 8 MB / 300 draw calls), matcaps, Seedance film — each selected with a written reason and promoted with provenance (`engines/ledger.mjs`). |
| 6 COMPOSE | Integration = DOM overlay choreography over the world + loader sequence + camera-rail/scroll binding. No Barba (the world IS the transition system). |
| 7 VERIFY | This pack's verify profile (§5) — the §22 evidence gate is MANDATORY, not sampled. |

---

## THE WORLD GRAMMAR

### One material (§20 Hard Rule 5, operationalized)
```
CHOOSE EXACTLY ONE — at Phase 2, from brand substance:
  SDF / RAYMARCH    seamless organic-infinite (igloo lineage)   technical build, GLSL-heavy
  VOXEL             playful-constructed, toy-precision           instanced meshes, cheap
  POINT-CLOUD       ethereal, data-brand, particle-native        §19 systems promote directly
  PBR GEOMETRY      product-real, luxury-material                asset pipeline, HDRI-lit
Mixing materials = Anti-Pattern #15 red flag. The board from Phase 3 locks it.
```

### World tokens (Agent-A emits, Agent F consumes)
```css
--world-fog-color      /* FROM the oklch ramp — the atmosphere IS the palette */
--world-fog-near / --world-fog-far
--world-key-light      /* one light direction — matches Tier I shadow angle (§20) */
--world-scale-unit     /* 1 section of scroll = N world units on the rail */
```

### Camera rail (Agent-B specs, Agent F implements)
```
STATIONS   one per content section, each a (position, target, fov) keyframe
           ★v6 with the twin camera, the stations come from Blender's camera-rail.json
SPLINE     Catmull-Rom through stations; scroll progress = rail parameter (Hard Rule 3)
           ★v6 read through the score's progress (show.on('progress')) — one clock, never scrollY
LISTEN     ★v6 the world recedes behind quiet chapters (dims, slows ≤ 30 %) and returns for the signature
BPM        contemplative → 8–12s section glides · fast → station snaps ·
           organic → curved paths + micro-roll · serious ≥ 8 → zero roll
FOCUS PULL max one per section transition (the Tier III signature — spend it wisely)
```

### Loader protocol
```
The loader is a brand moment, not an apology:
1. DOM shell paints instantly (fallback website IS the loading state's skeleton)
2. Designed veil: progress = real bytes streamed, palette-locked, typography-set
3. World ready → camera-settle intro (one move, 1.5–3s, ends at station 0)
BUDGET: interactive DOM < 2s · world first-frame < 5s on target mobile GPU · stream the rest
```

---

## 3. DIS PROFILE (all 9 systems)

```
System 1 GRADIENT MESH    → RETIRED here — fog + world atmosphere IS system 1 (map its BPM drivers to fog density)
System 2 GLASS DEPTH      → DOM overlays only: floor 0.3 (text panels glass against the world)
System 3 KINETIC TYPE     → floor 0.5 — DOM type must hold its own against a world
System 4 PARTICLE FIELD   → in-world only (§19 promoted); DOM particles = double-atmosphere, cap 0
System 5 BORDER LUMINANCE → cap 0.4, DOM overlays only
System 6 SCROLL SEQUENCES → cap 0.1 — the camera IS the scroll story; frame sequences compete
System 7 MAGNETIC CURSOR  → cap 0.6; cursor may influence camera ±2° (§20 Hard Rule 3 margin)
System 8 MICRO POLISH     → floor 0.5 — loader, station transitions, sound hooks
System 9 DEPTH LANGUAGE   → FLOOR 0.75. This pack exists above the Tier III line.
```

## 4. DEPTH PROFILE

Floor 0.75, ceiling 1.0. There is no Tier I/II mode of this pack — if the DNA resolves
below 0.75, Phase 0 mis-dispatched: re-route to web. The fallback ladder (§20 Hard Rule 2)
still REACHES Tier I — the DOM shell with composed depth is the mandated floor when
WebGL is unavailable. Built first (Phase 4), proven always (§5).

---

## 5. VERIFY PROFILE — the §22 evidence gate, at full strength

```
MANDATORY (all §22 auto-fails apply, plus):
  Frame time: 60fps desktop / ≥ 40fps target mobile GPU, measured over full rail scrub
  Draw calls ≤ 300 · texture memory ≤ 256MB · world stream ≤ 8MB critical path
  FALLBACK LADDER PROVEN: run harness with WebGL disabled → DOM shell must present all
    content, all CTAs, composed Tier I depth. "It's in the canvas" = automatic fail.
  Reduced-motion: static rendered still at station 0, zero RAF
  Rail integrity: scrub 0→1→0, no camera pops, no station overshoot
  DOM overlay a11y: full keyboard traversal + screen-reader pass WITHOUT the world
  Scorecard ≥ 4.0, zero auto-fails (templates/immersion-scorecard.md — ★v6 six axes, incl. Aliveness)
  Evidence report per references/evidence-qa.md — screenshots at every station
  ★v6 Station captures (templates/scroll-capture.spec.ts): frames drawn > 0 + lit pixels at every
    station — a mounted-but-black canvas is an automatic fail
  ★v6 One clock: exactly one scroll owner — the camera subscribes to the score's progress
  ★v6 Twin camera (R4, Blender + video on): the WebGL rail and the film share camera-rail.json —
    station screenshots and film frames at the same stations match

★v6 THE ALIVENESS FLOOR HOLDS HERE TOO (Axis 7, need 6/6 — never waived):
  ARRIVAL        the loader as brand moment + one camera-settle move (1.5–3 s) ending at station 0
  HEARTBEAT      the world breathes at rest — fog drift, particle flow, light — never frozen
  HAND-FEEL      every DOM overlay control answers hover, press and focus
  BREATH         the world recedes behind quiet chapters; the DOM overlays keep their air
  COMPOSED STILL the Tier I still at station 0 + the kill switch — never blank
  evidence       the first-5-seconds video · a 15-second slow scroll · a reduced-motion recording

7-AXIS AUDIT (adapted): craft → material coherence · identity → brand substance in the
world · motion → rail discipline · depth → grammar bands hold in-world · states → loader/
fallback/reduced-motion all designed · treatment&soul (Axis 6, CD3) → register R4: the
world IS the soul (brand substance, never spectacle-for-its-own-sake); no depth-theater slop ·
★v6 aliveness (Axis 7) → the world listens: one clock, recede-and-return, alive at rest
```

---

## 6. NORTH STAR SEARCH SETS

The Tier III set from `references/depth-language.md`, plus material-specific:
```
SDF:        "raymarching website immersive awwwards" · "SDF morph webgl experience"
VOXEL:      "igloo inc voxel website" · "voxel world web experience three.js"
POINT:      "particle world webgl site" · "point cloud immersive scroll"
PBR:        "webgl product world luxury site" · "3d configurator immersive award"
```
Study the restraint: ONE material, palette-locked fog, DOM-overlaid type. Coherence is the wow.

---

## 7. OUTPUT ARTIFACTS DELTA

```
agent-outputs/
├── agent-a/  + world-tokens.css, dom-shell/ (the fallback website — built FIRST)
├── agent-b/  − scroll-engine.js, transitions.js  + camera-rail-spec.json
├── agent-f/  ★ immersive-config.ts, world/ (scene, material, atmosphere, loader),
│               camera-rail.js (★v6 reads camera-rail.json with the twin camera), fallback/,
│               evidence/ (screenshots, report, ★v6 station captures + aliveness recordings), immersion-scorecard.md
└── agent-e/  + rail-integrity-report.md, fallback-ladder-proof.md
```

---

*Surface Pack: IMMERSIVE 3D — Iron Canvas v5.0*
*"The scene is the site. The fallback is still a website."*
*"One material. One light. One unforgettable world."*
