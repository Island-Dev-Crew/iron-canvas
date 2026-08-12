# Invocation Templates — Iron Canvas v4.2

> Copy-paste these to invoke Iron Canvas in Antigravity, Claude Code,
> or any agentic AI environment. Every template references the correct phases,
> agents, and gates.

---

## SOLO MODE — Full Sequential Pipeline

```
Apply Iron Canvas v4.2 SOLO to [URL/project].

Read SKILL.md first, then execute phases sequentially:
Phase 0 (ORIENT): Classify project type and mode.
Phase 1 (STUDY): DNA profile — do NOT change anything before this is complete.
Phase 2 (FEEL): Emotional target + Brand Personality Matrix.
Phase 3 (SCOUT): Find 3-5 references + generate North Star image with Nano Banana Pro.
Phase 3.5 (VALIDATE): Verify all planned features for technical feasibility.
Phase 3.9 (PACKAGE): Write the Design PRD using templates/design-prd.md.
Phases 4-6 (FORGE→GENERATE→COMPOSE): Build it.
Phase 7 (VERIFY): 6-axis audit. Do not deliver until all axes pass.

Output all JSON/MD files to project root. Final deliverable only after verification.
```

---

## SWARM MODE — Parallel Build Agents

```
Apply Iron Canvas v4.2 SWARM to [URL/project].

Orchestrator: Run Phases 0-3.9 sequentially. Produce design-prd.md.

Then dispatch to parallel Build Agents simultaneously:
  Agent-A (Foundation): Section 3 of PRD → tokens.css, index.html, base.css
  Agent-B (Motion): Section 4 of PRD → scroll.js, load-sequence.js, [scroll-engine.js]
  Agent-C (UI/UX): Section 5 of PRD → components.css, interactions.js
  Agent-D (Artifacts): Section 6 of PRD → generated images, frames/
  Agent-E (QA): Review all agent outputs → qa-fixes.md

Orchestrator: Merge agents (A→B→C→D→E) then run Phase 7 verification.
Target: Awwwards Site of the Day quality (7.5+ on all axes).
```

---

## MISSION MODE — Full Team

```
Iron Canvas v4.2 MISSION MODE for [project].

Full agent team:
  Research Agent → Phases 1-3 (DNA + feel + North Star)
  Validation Agent → Phase 3.5 (cross-LLM technical check)
  Orchestrator → Phase 3.9 (Design PRD packaging and dispatch)

  Parallel Build Agents (simultaneous after PRD dispatch):
    Agent-A: Foundation (tokens, HTML, semantic structure)
    Agent-B: Motion (GSAP, scroll engine, page transitions, WebGL)
    Agent-C: UI/UX (components, cursor, micro-interactions)
    Agent-D: Artifacts (AI image generation, scroll sequences)
    Agent-E: QA (accessibility, performance, cross-browser)

  Orchestrator: Merge, compose, run 6-axis verification audit.

Target: Awwwards Site of the Day. Taste Test 7/7. Performance ≥ 10/12.
Deliver only after all 5 verification axes pass.
```

---

## Dashboard Build — Mission Control Route

```
Iron Canvas v4.2 MISSION MODE — DASHBOARD ROUTE for [name].

Project type: C (Dashboard/Mission Control).
Activate § DASHBOARD ADDENDUM in SKILL.md.

Phase 3 SCOUT: Search specifically for:
  "mission control UI dark dashboard premium 2024"
  "dark analytics bento grid glassmorphism premium"
  SpaceX Dragon UI, NASA mission control, Bloomberg Terminal concepts.
Generate North Star: OLED black (#0a0e14), gold accent (#c9a84c),
glassmorphism bento cards, 3D center chart, radial gradient glow.

Phase 4 FORGE: Bento grid system, glass card tokens, data animation patterns.
Agent-B: Counter animations, chart entry animations, live pulse effects.
No scroll engine. No WebGL background. No cursor trail.
Data: [describe what metrics/data are being displayed].
```

---

## Existing Site Enhancement

```
Iron Canvas v4.2 SOLO — Enhancement of [URL].

Project type: E. Phase 1 STUDY is NON-NEGOTIABLE and must complete before any changes.

Phase 1: Screenshot every section desktop + mobile. Extract all CSS hex codes.
         Map every font. List every image. Document strengths AND weaknesses.
         Complete site-dna-profile.json BEFORE proceeding.

Phase 2: Discover feel from the site itself — do not impose.
Phase 3: Scout references that MATCH this site's feel (not generically premium).
Phase 4: Enhance within the existing DNA — never impose a template.
         Universal upgrades: reveals, 3-state interactions, tinted shadows, tokens.
Phase 7: "Is this recognizably the SAME site but better?" If no, pull back.

Anti-Pattern priority for this project: #5 Identity Erasure is highest risk.
```

---

## E-commerce Scroll Sequence

```
Iron Canvas v4.2 SWARM for [site] with scroll-driven product reveal.

Product: [description].
Scroll section: [section name, current dimensions].

Phase 3 SCOUT: Reference Apple.com, DJI product pages, Codrops product scroll sequences.
Phase 5 GENERATE (Agent-D):
  - Pre-generation checklist mandatory before any prompt.
  - Define 10 keyframe moments: sealed → glow → lid lift → open → reveal → hero.
  - Base prompt: [product] + [material/palette hex] + [studio lighting] + [bg] + [style]
  - VARY ONLY the action descriptor per frame.
  - Generate 4 variants per keyframe. Select best.
  - TEST 10 frames with scroll engine first → then generate full 60-frame set.
  - Frame specs: WebP, 1920×1080 desktop, 960×540 mobile, ≤ 80KB each.

Phase 6 COMPOSE (Agent-B):
  - Canvas + GSAP ScrollTrigger scroll engine (NEVER <video>).
  - Section height: 500vh.
  - Content overlays at scroll progress: [list text + percentages].
  - Fallback: static hero if frames fail to load.
```

---

## Narrated Scroll Experience (Voice AI)

```
Iron Canvas v4.2 SWARM for [site] with scroll-triggered narrated experience.

Phase 3.5 VALIDATION AGENT — verify before building:
  1. WebSocket TTS streaming feasible in browser (HTTPS required)?
  2. AudioContext user-gesture requirement — how to handle?
  3. Scroll-sync latency budget: [TTS latency] vs scroll trigger lead time.
  4. Web Speech API as fallback if TTS API unavailable?

If FEASIBLE, dispatch to build agents:

Agent-B: Implement useFalcon.ts (or equivalent) hook:
  - WebSocket connection on page load
  - speak(text) function triggering at scroll positions from PRD
  - scheduleAudioChunk() using AudioContext nextPlayTime for gapless playback
  - Pre-trigger: send TTS request 300ms before scroll visual fires
  - AudioContext resume() inside prior user click event

Agent-C: Floating barista/narrator UI component:
  - Fixed position bottom-right
  - States: idle (collapsed) → listening → thinking → speaking
  - Luxury theme matching site DNA (colors from tokens.css)
  - Waveform animation during speaking state (CSS or Lottie)

Voice engine: Murf Falcon / ElevenLabs / Web Speech API
Narration moments (from scroll positions):
  - [text] at [scroll % or section name]
```

---

## Artifacts Only (Phase 5 Focused)

```
Iron Canvas v4.2 Phase 5 — Context-aware artifact generation for [site/project].

Prerequisite: site-dna-profile.json and feel-profile.json must exist before starting.

For EACH artifact needed:
  1. Screenshot the exact section where it will live.
  2. Document container: dimensions, background, overlay gradient, blend mode, opacity.
  3. Write prompt using formula:
     [Subject] + [Material] + [Palette hex] + [Lighting] + [Angle] + [Background] + [Context] + [Negative]
  4. Generate 4 variants with Nano Banana Pro.
  5. Test best variant in situ — composite into page screenshot.
  6. Evaluate: blend / lighting match / feels native.
  7. If doesn't blend → adjust prompt → regenerate.

Anti-Pattern #2 (Blind Generation): Complete checklist BEFORE every prompt, no exceptions.
Anti-Pattern #6 (Trinket Dropping): Test in situ BEFORE finalizing, no exceptions.
```

---

## Quick Enhancement (No Scroll Engine, No Artifacts)

```
Iron Canvas v4.2 SOLO — Quick structural upgrade for [URL].

Phases 1-4 only. No image generation. No scroll engine.

Deliverables:
  1. tokens.css — complete token system from DNA extraction
  2. Scroll reveal animations on all below-fold sections (.reveal + IntersectionObserver)
  3. 3-state micro-interactions on every interactive element (hover + active + focus)
  4. Spring easing on all transitions (var(--spring))
  5. Tinted shadows using site's own accent color
  6. Grain overlay (if creative/luxury project)
  7. Mobile responsive check at 375px

Estimated time: 2-4 hours.
Identity preservation rule: enhanced site must be recognizably the same brand.
```

---

## North Star Only (Inspiration Generation)

```
Iron Canvas Phase 3 SCOUT — Generate North Star reference image only.

Project: [description]
Project type: [A/B/C/D]
Feel profile: [Primary: ___] [Anti-feelings: ___] [Vibe: ___]
Palette: Dominant [#hex] Accent [#hex]
Brand personality: Bold [score] Avant-garde [score]

1. Search: [relevant queries based on project type and industry]
2. Find 3 reference sites matching the feel profile.
3. Generate North Star with Nano Banana Pro using the Type [X] prompt template.
4. Validate against 5-point checklist.
5. Output: north-star-reference.png + scout-report.json
```

---
*Iron Canvas v4.2 — Island Development Crew*
