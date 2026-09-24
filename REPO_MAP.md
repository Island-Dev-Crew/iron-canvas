# IRON CANVAS — v6 REPO FILE MAP
## *Repository map — Iron Canvas v6.0 · The Living Canvas*

> v6: the voice restored inline (SKILL.md §0.1) and made executable — the Score Runtime
> (`runtime/`), the Power Engines (`engines/`), Iron Canvas Studio (`studio/`), the checks
> (`scripts/`), the film surface (`surfaces/film/`), four new references, and the restored
> v4.2.0 motion arsenal. See "v6 ADDITIONS" at the end of this file.
>
> v5.0: Surface packs + Depth Language (v5.0-alpha) reconciled with IMMERSIVE mode,
> Agent F, Phase 4.5 IMMERSE, and the evidence gate (v4.3). SKILL.md remains
> self-contained (2500+ lines — §20 Depth Language, §21 Surface Packs, §22 Immersive
> Mode inline). surfaces/*/PACK.md are each self-contained for their surface.
> External files supplement depth, not replace core content — the reconciliation law holds.

---

```
iron-canvas/
│
├── SKILL.md                              ← MASTER SKILL (v6 — self-contained; §0.1 the voice, §23–25 new)
├── ROUTING.md                            ← Master bridge (v6 — navigation system)
├── README.md                             ← Human-readable overview (v6)
├── REPO_MAP.md                           ← This file (v6)
├── CHANGELOG.md                          ← Version history (v1 → v6, with the v6 loss ledger)
├── QUICK_REFERENCE.md                    ← Agent cheat sheet (v6)
├── FEEL.md                               ← Iron Canvas's own Feel Brief (a worked example — never a client palette)
├── IMMERSIVE_MODE.md                     ← v4.3 Agent F + IMMERSE evidence gate
│
├── runtime/                              ← ★v6 the Score Runtime
│   ├── canvas-score.js                   ← performs a score: acts → shots → verbs · full / reduced / static · kill switch
│   ├── score.schema.json                 ← the score + motion-contract schema (stage, job, role, emotion, reduced)
│   ├── camera-rail.js                    ← plays a Blender-baked ic-camera-rail/2 by progress
│   ├── verbs.html                        ← the verb gallery — 17 verbs × 7 personalities, performed
│   └── README.md
├── engines/                              ← ★v6 Power Engines (optional, detected, never provisioned)
│   ├── detect.mjs · lib.mjs · ledger.mjs ← scan · shared helpers · select → verify → encode → promote
│   ├── blender/ (blender.mjs · blender_forge.py)  ← clay rails (baked, sheet gate) · hero GLBs · turntables · matcaps
│   ├── video/video.mjs                   ← Seedance 2.5 via the fal queue, or ingest
│   ├── audio/audio.mjs                   ← ElevenLabs sound generation
│   ├── canvas.config.example.json · canvas.config.schema.json · examples/ · README.md
├── studio/                               ← ★v6 Iron Canvas Studio — compile.mjs (the bible compiler) + index.html
├── scripts/                              ← ★v6 ic-preflight.mjs · ic-contract.mjs · lint-skill.mjs
├── showcase/
│   ├── origin.html + origin.contract.json ← ★v6 the first Iron Canvas page, restored (zero libraries)
│   ├── living-canvas/ (index.html · world.js) ← ★v6 the five-act WebGL scroll film
│   ├── depth.html                        ← v5.0 Depth Language demo
│   └── index.html · iron-canvas-showcase.jsx · build-standalone.cjs  ← v4.2 about-page
│
├── phases/
│   ├── 00-orient.md                      ← Project type + mode + Discovery Interview + Autonomy Tier
│   ├── 01-study.md                       ← DNA extraction + screen recording input
│   ├── 02-feel.md                        ← Emotional target + BPM + 4 system outputs
│   ├── 03-scout.md                       ← North Star + Whisk/Flow engine registry
│   ├── 03.5-validate.md                  ← Cross-LLM technical validation
│   ├── 03.9-package.md                   ← Design PRD + Asset Manifest + Framework Config
│   ├── 04-forge.md                       ← Structural enhancement
│   ├── 04.5-immerse.md                   ← IMMERSIVE WebGL/3D signature layer
│   ├── 05-generate.md                    ← Artifact Assessment Gate + keyframe interpolation
│   ├── 06-compose.md                     ← Scroll engine + 15fps frame extraction
│   ├── 07-refine.md                      ← 6-axis audit + Enhancement Discovery
│   └── 08-handoff.md                     ← Client handoff documentation
│
├── agent-prompts/
│   ├── orchestrator.md                   ← Mission Controller + Discovery Interview + Phase 8
│   ├── agent-a-foundation.md             ← Tokens + HTML + dark mode trigger
│   ├── agent-b-motion.md                 ← GSAP + motion tier gating
│   ├── agent-c-ui.md                     ← Two-Sweep Pattern (core + polish)
│   ├── agent-d-artifacts.md              ← Asset Classification + Whisk/Flow
│   ├── agent-e-qa.md                     ← Enhancement Discovery + MCP QA
│   └── agent-f-immersion.md              ← WebGL/3D + evidence harness
│
├── references/
│   ├── agent-autonomy.md                 ← Self-provisioning (3 tiers + persistence + Dead End)
│   ├── anti-patterns.md                  ← 11 anti-patterns + craft wisdom
│   ├── scroll-engine.md                  ← Canvas + GSAP ScrollTrigger architecture
│   ├── model-selection.md                ← AI engine routing (Whisk + Flow + full registry)
│   ├── prompt-engineering.md             ← Context-aware artifact prompting
│   ├── expertise-injection.md            ← Domain injection (GSAP, Three.js, Whisk, Flow, etc.)
│   ├── leonardo-blueprints.md            ← Leonardo AI blueprint workflows
│   ├── typography-system.md              ← Type personality + pairing + motion
│   ├── color-system.md                   ← oklch palette + gradient mesh + shadow protocol
│   ├── motion-budget.md                  ← 4 motion tiers + zones + timing
│   ├── grid-rhythm.md                    ← Spacing scales + section rhythm + bento
│   ├── performance-budget.md             ← Core Web Vitals + image format + bundle strategy
│   ├── interaction-library.md            ← All interactive state patterns
│   ├── seo-conversion.md                 ← SEO + conversion architecture
│   ├── structural-policy.md              ← Dynamic layout confidence scoring
│   ├── tool-acquisition-protocol.md      ← Supplementary provisioning patterns
│   ├── video-integration-protocol.md     ← 7 hooks from Samir's Applied AI Engineering
│   ├── webgl-immersion.md                ← IMMERSIVE implementation/degradation guide
│   ├── claude-design-3.md                ← ★v5.1 CD3 Treatment Doctrine (the conscience) — Register R0–R4
│   ├── gauntlet-loop.md                  ← ★v5.2 premium build method — fan-out + blind critic + falsifiable bar (R2–R4)
│   ├── motion-language.md                ← ★v6 the one motion vocabulary — aliveness floor, personalities, tempos, sound
│   ├── cinematic-score.md                ← ★v6 the score as motion contract — motion sentence, one signature, one clock
│   ├── power-engines.md                  ← ★v6 Blender · Seedance 2.5 · sound — gates, twin camera, ledger
│   ├── direction-fusion.md               ← ★v6 Voice · World · Instrument — authored direction + evidence classes
│   └── evidence-qa.md                    ← Browser evidence gate
│
├── templates/
│   ├── site-dna-profile.md               ← Phase 1 output template
│   ├── feel-profile.md                   ← Phase 2 output template
│   ├── technical-validation-report.md    ← Phase 3.5 output template
│   ├── design-prd.md                     ← Phase 3.9 PRD master template
│   ├── immersion-scorecard.md            ← IMMERSIVE scorecard gate
│   ├── playwright.config.ts              ← Evidence harness config template
│   ├── smoke.spec.ts                     ← Evidence smoke spec template
│   ├── scroll-capture.spec.ts            ← ★v6 Axis 7 evidence — arrival video, act stations, liveness, hand-feel, reduced walk
│   ├── design-contract.json              ← ★v6 the design plan, machine-readable (scripts/ic-contract.mjs)
│   └── invocation-templates.md           ← Copy-paste invocations
│
├── surfaces/                             ← web · app-dashboard · immersive-3d · game-realtime (exp) · ★v6 film (exp)
│
└── sub-skills/                           ← Archival v1 protocols — superseded by SKILL.md §7b (kept for history)
    ├── 01-PERCEPTION.md
    ├── 02-MOTION-ARCHITECTURE.md
    ├── 03-FORGE.md
    └── 04-VERIFY.md
```

---

## File Count

```
Root files:          13
Phases:              12
Agent prompts:        7
References:          19
Templates:            8
Sub-skills:           4
─────────────────────────
TOTAL:               63 files across 6 folders + root
```

---

## SKILL.md Architecture (v4.2)

SKILL.md is **self-contained** — 88K, 2,100+ lines. An agent reading ONLY this file
gets the complete Iron Canvas system. External files provide deeper reference but
are not load-bearing. This was a deliberate fix from v4.0, which had replaced
inline content with routing pointers and caused agents to fall back to v3 behavior.

**What's inline in SKILL.md v4.2:**
- All 5 Build Agent system prompts with code examples
- Full Phase 3.5 validation checklist
- Full Design PRD template
- Full 6-axis Awwwards audit (Axis 6 = CD3 Treatment & Soul) with scoring criteria
- Full Dashboard Addendum (bento, glass, data animation)
- Full expertise injection blocks (GSAP, Three.js, Lenis, Barba, Whisk, Flow)
- Discovery Interview protocol
- Agent Autonomy with persistence policy
- Asset classification taxonomy
- Keyframe interpolation + 15fps extraction
- All 11 anti-patterns
- Reference File Routing table
- Complete output artifacts map

---

## Reference File Routing

Every reference file has a specific phase where it's consumed:

```
PHASE 0:  performance-budget.md, agent-autonomy.md
PHASE 1:  seo-conversion.md
PHASE 2:  typography-system.md, color-system.md, motion-budget.md
PHASE 3:  model-selection.md
PHASE 4:  grid-rhythm.md, interaction-library.md
PHASE 4.5: webgl-immersion.md, evidence-qa.md
PHASE 5:  prompt-engineering.md, leonardo-blueprints.md, scroll-engine.md,
          video-integration-protocol.md
PHASE 6:  scroll-engine.md, expertise-injection.md
PHASE 7:  anti-patterns.md, seo-conversion.md
PHASE 8:  phases/08-handoff.md
ALWAYS:   anti-patterns.md, structural-policy.md, agent-autonomy.md
```

---

*Iron Canvas v6.0 — The Living Canvas — Island Development Crew*
*"Where there is no vision, the people perish." — Proverbs 29:18 (KJV)*


## v4.2 ADDITIONS

```
references/
  claude-design-3.md          ★v5.1  CD3 Treatment Doctrine (soul) — Register R0–R4, caps + governs the DIS
  gauntlet-loop.md            ★v5.2  premium build method — fan-out + blind cross-family critic + falsifiable bar (North Star diff + scorecard ≥ 4.0); fires R2–R4, OFF at R0/R1
  design-intensity-scale.md   ★v4.2  DIS — 9 systems scaled by Register + mode + BPM
  code-driven-assets.md       ★v4.2  SVG / Remotion / Hyperframes (4th asset class)
  algorithmic-art.md          ★v4.2  generative systems (flow/particle/noise/tiling/attractor)
showcase/
  index.html                  ★v4.2  STANDALONE no-build about-page (React via CDN — GitHub Pages ready)
  iron-canvas-showcase.jsx    ★v4.2  source of truth — live-animated about-page (Vite/Next/bundler)
  build-standalone.cjs        ★v4.2  regenerates index.html from the .jsx (node showcase/build-standalone.cjs)
```

SKILL.md gained §17 (Design Intensity Scale), §18 (Code-Driven Assets), §19 (Algorithmic Art),
all inline. Anti-patterns 11→14. Asset classes 3→4. Engine registry +6 code-driven engines.

---

## v5.0-alpha ADDITIONS

```
surfaces/
  SURFACE-PACK-CONTRACT.md    ★v5.0  pack interface — 7 required blocks, registry, dispatch rule
  web/PACK.md                 ★v5.0  flagship pack (Types A/B/D/E/F — body = SKILL.md itself)
  app-dashboard/PACK.md       ★v5.0  Type C first-class — density scale, app shell grammar,
                                     data-motion grammar, state choreography, app verify profile
references/
  depth-language.md           ★v5.0  DIS System 9 — z-axis grammar, 3 altitudes (composed/staged/
                                     inhabited), camera choreography, engine registry, perf gates
```

SKILL.md gained §20 (Depth Language) + §21 (Surface Packs), both inline. DIS 8→9 systems.
Anti-patterns 14→15 (#15 Depth Theater). `three_js_eligible` retired — depth is a dial.
Phase 0 orient gains surface_pack + depth_intensity_hint. §13 Dashboard Addendum superseded
as primary Type C authority by surfaces/app-dashboard/PACK.md (principles upheld + incorporated).

---

## v5.0 FINAL ADDITIONS

```
surfaces/
  immersive-3d/PACK.md        ★v5.0  Type A-world — world grammar (one material), camera rail,
                                     loader protocol, Agent F as world agent, §22 gate at full strength
  game-realtime/PACK.md       ★v5.0  Type G (EXPERIMENTAL) — diegetic decision, HUD grammar,
                                     game-feel timing, photosensitivity + colorblind gates
  game-realtime/UNREAL-ADAPTER.md ★v5.0  engine delivery SPEC — PRD → MPC/UMG/Niagara/Sequencer
                                     mapping table + MCP command flow; consumer, never a bypass
showcase/
  depth.html                  ★v5.0  LIVE Depth Language demo — scroll IS the dial: composed
                                     bento → staged seeded emblem → inhabited camera-rail world.
                                     Standalone no-build (Three.js via CDN import map), seeded 5417.
```

v4.3 IMMERSIVE mode reconciled into v5.0: SKILL.md §22 (inline) wires Agent F + Phase 4.5
+ the evidence gate to Depth Language — the lane auto-selects at depth ≥ 0.4, and the
scorecard gate (≥ 4.0, zero auto-fails) is mandatory for Tier II/III on every surface.
All four registry packs shipped: web · app-dashboard · immersive-3d · game-realtime (exp).

---

## v6 ADDITIONS — The Living Canvas

```
runtime/        ★v6  canvas-score.js · score.schema.json (+ contract fields) · camera-rail.js · verbs.html · README.md
engines/        ★v6  detect · ledger · blender (clay rails baked per frame, vertical fov, roll, handheld,
                     21-still sheet gate, frame-count proof) · video (Seedance 2.5) · audio · examples
studio/         ★v6  compile.mjs (treatment · score · engine jobs · config · mission; the aliveness floor per register)
scripts/        ★v6  ic-preflight.mjs (feel brief · score · config) · ic-contract.mjs (design contract lint)
                     · lint-skill.mjs (paths · fences · voice · version · loss guard)
showcase/       ★v6  origin.html + origin.contract.json · living-canvas/ (index.html · world.js)
surfaces/film/  ★v6  PACK.md — Type H (exp): one film score → code · video · Blender lanes
references/     ★v6  motion-language.md · cinematic-score.md · power-engines.md · direction-fusion.md
templates/      ★v6  scroll-capture.spec.ts · design-contract.json
```

SKILL.md gained §0.1 THE VOICE (CD3 becomes §0.2, the conscience), the Feel Brief with a required
kinetic signature, §7b CHOREOGRAPHY inline in Agent-B, the design contract (3.9d), VERIFY Axis 7
(Aliveness — never waived), PREMIERE in §11, §23 THE SCORE, §24 POWER ENGINES and §25 STUDIO.
Anti-patterns 17 → 22 (#18 Lifeless · #19 Two Clocks · #20 Flagged but Shipped · #21 Defaults as
Decisions · #22 Unreviewed Interpolation). The v4.2.0 material erased by the 2026-06 overlay is
restored: the Creative Arsenal, high-end component patterns, React / Next.js motion rules,
anti-patterns Section II, responsive hardening, the tactile hand-feel rules, the five Bento
archetypes. Merge splices that had swallowed Phase 2 into Phase 3 code fences are repaired.
