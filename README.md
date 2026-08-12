# ⚡ Iron Canvas

> **v5.2 — Surfaces, Soul & Gauntlet.** Iron Canvas is no longer website-only. One design-quality core now
> dispatches across **four surface packs**: `web` (the flagship), `app-dashboard` (Type C
> first-class — density scale, app shell grammar, data-motion grammar, state choreography),
> `immersive-3d` (Type A-world — one material, camera rail, Agent F as world agent), and
> `game-realtime` (Type G, experimental — HUD grammar, game-feel timing, **Unreal MCP
> adapter spec**). The DIS grows to **9 systems** with the **Depth Language** — a z-axis
> grammar dialed 0–1 from composed CSS depth through staged WebGL scenes to inhabited
> igloo.inc-tier worlds, evidence-gated by v4.3's Agent F scorecard (§22). Depth is a dial,
> never a binary. The floor is never flat. **See it live: [`showcase/depth.html`](showcase/depth.html)
> — scroll IS the dial.**

> **v4.2 — Design Language Foundation.** Design Intensity Scale (systems each dialed 0–1),
> code-driven assets — animated SVG, Remotion motion graphics, Hyperframe sequences, and seeded
> algorithmic art — alongside AI imagery. See the live about-page at `showcase/index.html` —
> a **standalone, no-build** page (React via CDN) that runs as-is on GitHub Pages, `file://`,
> or any static host. Source of truth: `showcase/iron-canvas-showcase.jsx`; regenerate with
> `node showcase/build-standalone.cjs`.

> **v4.3 — IMMERSIVE Evidence Mode.** An evidence-gated quality lane for flagship WebGL/3D/
> signature-motion work: Agent F (Immersion), Phase 4.5 IMMERSE, the immersion scorecard
> (≥ 4.0 average, zero auto-fails), and a portable Playwright evidence harness. Premium is
> a score, not a vibe claim.

**The Multi-Agent Design Orchestration System**
*Adaptive Design Enhancement & Creation Across Surfaces — v5.0*

> "Enhancement means amplifying what's already good, not replacing it with a uniform style."
> "Your coding agents are only as good as the instructions and the assets you feed them."
> "Where there is no vision, the people perish." — Proverbs 29:18 (KJV)

Iron Canvas is NOT a template. It is a **methodology and multi-agent orchestration system** for making any digital product the best version of ITSELF.

Three sites enhanced by Iron Canvas look like three DIFFERENT premium sites — not three copies of the same dark template.

---

## Three Execution Modes

| Mode | Agents | Speed | Best For |
|------|--------|-------|----------|
| **SOLO** | 1 agent, sequential | Baseline | Quick enhancements, small sites |
| **SWARM** | Orchestrator + 4 parallel Build Agents | 2-3× faster | Standard production |
| **MISSION** | Full 8-agent team | Maximum quality | Complex sites, dashboards, flagship work |
| **IMMERSIVE** | SWARM/MISSION + Agent F | Evidence-gated quality | WebGL/3D/signature motion requiring browser proof |

---

## Repository Structure

```
iron-canvas/
├── SKILL.md                          ← MASTER SKILL — read this first, every time (v5.0 — self-contained)
├── ROUTING.md                        ← Master bridge file — read second
│
├── surfaces/                         ← ★v5.0 Surface packs (Phase 0 dispatches exactly ONE)
│   ├── SURFACE-PACK-CONTRACT.md      ← Pack interface: 7 required blocks + registry
│   ├── web/PACK.md                   ← Flagship (Types A/B/D/E/F — body = SKILL.md itself)
│   ├── app-dashboard/PACK.md         ← Type C first-class: density, app shell, data-motion, states
│   ├── immersive-3d/PACK.md          ← Type A-world: world grammar, camera rail, Agent F core
│   └── game-realtime/                ← Type G (EXPERIMENTAL): HUD grammar + game-feel
│       ├── PACK.md                   ←   diegetic decision, photosensitivity + colorblind gates
│       └── UNREAL-ADAPTER.md         ←   engine delivery spec (PRD → MPC/UMG/Niagara/Sequencer)
├── README.md                         ← You are here
├── REPO_MAP.md                       ← Visual file map with version status
├── CHANGELOG.md                      ← Version history
├── QUICK_REFERENCE.md                ← Agent cheat sheet
├── FEEL.md                           ← Iron Canvas brand feel profile
│
├── phases/                           ← Phase-by-phase execution guides
│   ├── 00-orient.md                  ← Project classification + mode + Discovery Interview
│   ├── 01-study.md                   ← Read the site's DNA + screen recording input
│   ├── 02-feel.md                    ← Emotional target + Brand Personality Matrix
│   ├── 03-scout.md                   ← AI Reference Intelligence + North Star image
│   ├── 03.5-validate.md              ← Cross-LLM technical validation
│   ├── 03.9-package.md               ← Design PRD packaging + Asset Manifest
│   ├── 04-forge.md                   ← Structural enhancement + motion architecture
│   ├── 04.5-immerse.md               ← IMMERSIVE Agent F + WebGL/evidence gate
│   ├── 05-generate.md                ← Artifact Assessment Gate + generation
│   ├── 06-compose.md                 ← Integration + scroll engine + 15fps extraction
│   ├── 07-refine.md                  ← 6-axis quality audit + Enhancement Discovery
│   └── 08-handoff.md                 ← Client handoff documentation
│
├── agent-prompts/                    ← Specialized agent system prompts
│   ├── orchestrator.md               ← Mission Controller — governs, never builds
│   ├── agent-a-foundation.md         ← Tokens + HTML + semantic structure
│   ├── agent-b-motion.md             ← GSAP + scroll + transitions + WebGL
│   ├── agent-c-ui.md                 ← Components + cursor + Two-Sweep Pattern
│   ├── agent-d-artifacts.md          ← AI generation + Whisk/Flow + asset classification
│   ├── agent-e-qa.md                 ← Accessibility + performance + Enhancement Discovery
│   └── agent-f-immersion.md          ← WebGL/3D signature scene + evidence harness
│
├── references/                       ← Technical deep-dives
│   ├── agent-autonomy.md             ← Self-provisioning protocol (3 tiers + persistence)
│   ├── anti-patterns.md              ← 11 anti-patterns (v4.2)
│   ├── scroll-engine.md              ← Canvas + GSAP ScrollTrigger architecture
│   ├── model-selection.md            ← AI engine routing (Whisk + Flow + Leonardo + Nano Banana)
│   ├── prompt-engineering.md         ← Context-aware artifact prompting
│   ├── expertise-injection.md        ← Domain injection templates (GSAP, Three.js, Whisk, Flow)
│   ├── leonardo-blueprints.md        ← Leonardo AI integration guide
│   ├── typography-system.md          ← Type classification, pairing, variable fonts
│   ├── color-system.md               ← oklch palette, gradient mesh, shadow protocol
│   ├── motion-budget.md              ← 4 motion tiers + zones + timing budget
│   ├── grid-rhythm.md                ← Spacing scales, section rhythm, bento protocol
│   ├── performance-budget.md         ← Core Web Vitals, image format, bundle strategy
│   ├── interaction-library.md        ← All interactive state patterns
│   ├── seo-conversion.md             ← SEO + conversion architecture
│   ├── structural-policy.md          ← Dynamic layout confidence scoring
│   ├── video-integration-protocol.md ← 7 hooks from Samir's Applied AI Engineering
│   ├── webgl-immersion.md            ← IMMERSIVE WebGL/R3F patterns + degradation ladder
│   ├── evidence-qa.md                ← Playwright screenshot/console/mobile evidence gate
│   └── tool-acquisition-protocol.md  ← Supplementary provisioning patterns
│
├── templates/                        ← Fill-in-the-blank output templates
│   ├── site-dna-profile.md           ← Phase 1 DNA extraction template
│   ├── feel-profile.md               ← Phase 2 emotional target template
│   ├── technical-validation-report.md ← Phase 3.5 validation template
│   ├── design-prd.md                 ← Phase 3.9 PRD master template
│   ├── immersion-scorecard.md        ← Agent F scoring gate (≥4.0, zero auto-fails)
│   ├── playwright.config.ts          ← Evidence harness template
│   ├── smoke.spec.ts                 ← IMMERSIVE smoke/evidence spec
│   └── invocation-templates.md       ← Copy-paste invocations for any AI environment
│
└── sub-skills/                       ← Legacy v1 protocols (still valid as focused tools)
    ├── 01-PERCEPTION.md
    ├── 02-MOTION-ARCHITECTURE.md
    ├── 03-FORGE.md
    └── 04-VERIFY.md
```

---

## Quick Start

**Read SKILL.md first.** Always. It is the single source of truth — self-contained at 2,100+ lines.

```
# MISSION MODE — Full team
Iron Canvas v5.2 MISSION MODE for [project].
Full team. Discovery Interview first. Phases 0-8.
Target: Awwwards Site of the Day quality.

# SWARM MODE — Standard production
Iron Canvas v5.2 SWARM MODE for [URL/project].
Phases 0-3.9 sequential. Then parallel agents. Merge and verify.

# SOLO MODE — Quick enhancement
Iron Canvas v5.2 SOLO for [URL].
Phase 1 FIRST — no changes before DNA profile.
```

---

## The Pipeline

```
ORIENT(0) → INTERVIEW → STUDY(1) → FEEL(2) → SCOUT(3) → VALIDATE(3.5) → PACKAGE(3.9)
→ [PARALLEL BUILD AGENTS: A(Foundation) B(Motion) C(UI) D(Artifacts) + F(Immersion when selected)] → E(QA)
→ COMPOSE(6) → VERIFY(7) → HANDOFF(8)
```

---

## Highlights

- **Gauntlet-forged premium (v5.2)** — at registers R2–R4, FORGE / IMMERSE / GENERATE build via a fan-out + blind cross-family critic loop against a falsifiable bar (immersion scorecard ≥ 4.0 + North Star reference-peg diff + 6-axis); ship the survivor (`references/gauntlet-loop.md`)
- **Claude Design 3 — the Treatment Doctrine (v5.1)** — calibrate the *treatment*, not whether to design: one craft across five registers (R0 Utilitarian → R4 Immersive), grounded in the subject's own world (soul), enforced by VERIFY Axis 6 (`references/claude-design-3.md`)
- **Surface Packs** — one core, four surfaces: `web` · `app-dashboard` · `immersive-3d` · `game-realtime` (exp). Phase 0 dispatches exactly ONE (`surfaces/SURFACE-PACK-CONTRACT.md`)
- **Depth Language (DIS System 9)** — composed (CSS) → staged (one Three.js scene) → inhabited (igloo.inc-tier world). BPM-gated, mode-ceilinged, fallback ladder mandatory (`references/depth-language.md`)
- **Live depth demo** — [`showcase/depth.html`](showcase/depth.html): scroll IS the dial; the page obeys every rule it demonstrates (seeded 5417, DOM-first, ladder-proven)
- **v4.3 IMMERSIVE reconciled** — Agent F + Phase 4.5 + evidence gate now auto-select at depth ≥ 0.4 (SKILL.md §22). Premium is a score, not a vibe claim.
- **App/Dashboard surface** — Type C rebuilt: density scale, app shell grammar (⌘K palette non-negotiable), data-motion grammar, state choreography, app-native verify profile (INP, not LCP)
- **Game/Realtime surface + Unreal MCP adapter spec** — diegetic decision, HUD grammar, game-feel timing, photosensitivity + colorblind gates; PRD → engine mapping table
- **Anti-Pattern #15: Depth Theater** — no more bolted-on 3D; depth comes out of the DIS or not at all
- **`three_js_eligible` retired** — depth is a dial (0–1), never a binary

## v4.3 Highlights

- **IMMERSIVE mode** — Agent F, Phase 4.5 IMMERSE, WebGL/3D reference, Playwright evidence templates, and scorecard gate.

## v4.2 Highlights

- **Self-contained SKILL.md** — all agent prompts, validation checklists, PRD template, 6-axis audit, and dashboard addendum inline (88K, 2100+ lines). No routing pointers as primary content.
- **Google Whisk + Google Flow** — new asset generation engines for cinematic loops and keyframe interpolation
- **Discovery Interview** — 7 structured questions before any code
- **Asset Classification Taxonomy** — scroll-tied / looping background / static
- **Agent Autonomy Protocol** — 3-tier self-provisioning with persistence policy
- **Two-Sweep UI Pattern** — core pass + polish pass prevents scope creep
- **Enhancement Discovery** — QA agent suggests additive features beyond bug fixes
- **Phase 8 Handoff** — client documentation generation
- **11 Anti-Patterns** — 3 new from Samir's Applied AI Engineering series

---

## Built By
**Island Development Crew** — Iron Canvas Design Studio

Production-tested on real client projects, the Crown Collection build, the Iron Canvas Studio site, and 21+ design video analyses.

---
*Iron Canvas v5.2 — Island Development Crew*
