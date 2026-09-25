# IRON CANVAS v6 — Agent Quick Reference

## THE VOICE (read first — SKILL.md §0.1)

*"We don't vibe-code. We engineer beauty."* · *"A feel brief is not a mood board. It's a lens."* ·
*"Kinetic Energy — Everything feels alive, intentional, moving."* · *"The still elements make the
moving elements land harder."* · *"Whitespace is not empty space. It is the breath between notes."*

**The Living Rules:** (1) the ALIVENESS FLOOR — arrival · heartbeat · hand-feel · breath · composed
still, at every register; (2) WRITE THE SCORE — one motion sentence, one signature, one clock;
(3) ADJECTIVES DIRECT, EVIDENCE PROVES; (4) one craft, every altitude.

## THE PIPELINE

```
ORIENT(0) → INTERVIEW (+Q8 mechanism) → STUDY(1) → FEEL(2) Feel Brief → SCOUT(3) Direction Fusion
                          ↑ GATE 1           ↑ GATE 2 (kinetic signature required)
→ VALIDATE(3.5) → PACKAGE(3.9) PRD + SCORE + design contract + engine jobs + preflight
→ [PARALLEL AGENTS: A+B+C+D (+F if IMMERSIVE)] ‖ ASSET FORGE(5a) → GENERATE(5) tournament
→ COMPOSE(6) → VERIFY(7) 7 axes → HANDOFF(8) + PREMIERE
                  ↑ GATE 3     ↑ GATE 4
```

## THE MOTION VOCABULARY (references/motion-language.md)

```
PERSONALITIES  silk expo.out 1.4s · tide sine.inOut 2.4s · gravity power4.out 1.1s · spark back.out(1.7) 0.6s
               snap power3.inOut 0.5s · bloom expo.inOut 1.8s (the signature, once) · drift linear (scrub)
CURVE ROLES    --ease-arrive (0.16,1,0.3,1) every entrance · --ease-tick (0.34,1.56,0.64,1) ≤ 0.25 s only
               --ease-breathe ambient · --ease-depart exits      (--spring / --spring-slow are retired)
TEMPOS         hands 0.15–0.5 s · entrances 0.8–1.4 s (100–150 ms steps) · ambience 4–36 s, co-prime periods
VERBS          fade rise unveil bloom focus tilt wipe iris · sink lift defocus dolly · drift · draw count scramble sweep
SENTENCE       establish → accelerate → pause → reveal → recover → climax → resolve (length by register)
```

## THE CHECKS

```
node scripts/ic-preflight.mjs <dir>                       feel brief + score + engine config (blocks 3.9 hand-off)
node scripts/ic-contract.mjs --contract <json> <build>    the build keeps its design contract
node scripts/lint-skill.mjs [--against <rev>]             doctrine: paths · fences · voice · version · loss
templates/scroll-capture.spec.ts                          Axis 7 evidence (Playwright)
```

## PROJECT TYPE ROUTING (Phase 0) — dispatches ONE surface pack ★v5.0

| Type | Pack | Emphasis | Scroll Engine | Depth Ceiling | Key Stack |
|------|------|----------|---------------|---------------|-----------|
| A: Animated site | `web` | SCOUT + COMPOSE | YES | 1.0 (Tier III moment) | GSAP + Three.js + Lenis + Barba |
| A-world: sustained Tier III | `immersive-3d` | IMMERSE + COMPOSE | Camera rail | 1.0 floor 0.75 | R3F/Three + Agent F + §22 gate |
| B: Marketing/SaaS | `web` | FEEL + FORGE | Optional | 0.35 | GSAP + ScrollTrigger + Lenis |
| C: Dashboard/App | `app-dashboard` | STUDY + SCOUT | NO | 0.5 (one centerpiece) | App shell + data-motion + ⌘K |
| D: E-commerce | `web` | GENERATE + COMPOSE | YES | 0.7 (product orbit) | GSAP + Canvas + Leonardo |
| E: Enhancement | Per original | STUDY first | Per type | Per type | Match existing |
| F: New scratch | Per type | Start at FEEL | Per type | Per type | Determine in Phase 4 |
| G: Game frontend ★v5.0 | `game-realtime` (EXP) | FEEL + FORGE HUD | NO | 0.8 title only | HUD grammar + game-feel + UNREAL-ADAPTER |
| H: Film / motion piece ★v6 | `film` (EXP) | FEEL (style board) + PACKAGE (film score) | — | all tiers | HyperFrames + Seedance 2.5 / MiniMax + Blender clay rails |

**Depth is a dial (DIS System 9), never a binary.** depth ≥ 0.4 → IMMERSIVE lane auto-selects
(Agent F + Phase 4.5 + evidence gate). Live demo: `showcase/depth.html`.

## DISCOVERY INTERVIEW (Phase 0 — v4.2)

```
Q1: DATA ORIGIN — Where does content come from?
Q2: PRIORITY HIERARCHY — Top 3 things a visitor must see/do?
Q3: INTERACTION LEVEL — Passive vs. active engagement?
Q4: RESPONSIVENESS — Mobile-first? Desktop-dominant? Parity?
Q5: COMPETITIVE POSITIONING — What should this feel better than?
Q6: ASSET INVENTORY — What exists? What must be generated?
Q7: PERFORMANCE TIER — Speed-critical? Motion-heavy? Balanced?
Q8: THE MECHANISM ★v6 — the product's one true mechanism, in one sentence (or stop and ask)
```

## POWER ENGINES ★v6 (SKILL.md §24 · references/power-engines.md)

```
node engines/detect.mjs → enabled · available · missing (exit 2 + plan → fallback) · disabled
GATES     R0/R1 off · R2 the signature only · R3 on · R4 on + twin camera (Blender clay rail → Seedance @Video1)
BLENDER   plan · sheet (21 stills — approve first) · run   → clay.mp4 + camera-rail.json (baked, vertical fov)
SEEDANCE  plan (cost ≈ $0.47/s at 720p, printed first) · run (fal) · ingest
LEDGER    select (a written reason) → verify (re-hash) → encode → promote (+ provenance sidecar)
```

## AGENT AUTONOMY TIERS (Phase 0 — v4.2)

```
TIER 1 — SUPERVISED: Ask before any install, signup, or payment
TIER 2 — GUIDED:     Self-provision free tools. Ask before paid.
TIER 3 — AUTONOMOUS: Use judgment. Log everything. Dead End protocol for impossible deps.
```

## PHASE OUTPUTS & GATE SCORES

| Phase | Output | Gate | Pass Threshold |
|-------|--------|------|----------------|
| 0 ORIENT | orient-decision.json | — | Interview + tier set |
| 1 STUDY | site-dna-profile.json | Gate 1 | 7/7 criteria |
| 2 FEEL | feel-profile.json — the Feel Brief (lens, feel line, kinetic signature ★v6) | GATE 2 ★v6 | kinetic signature complete |
| 3 SCOUT | north-star-reference.png + scout-report.json | Gate 2 | 4/5 |
| 3.5 VALIDATE | technical-validation-report.md | — | No BLOCKED features |
| 3.9 PACKAGE | design-prd.md (+ Asset Manifest) + score.json + design-contract.json ★v6 | Assessment Gate ★v6 + preflight | All 11 sections · preflight PASS |
| 5 GENERATE | artifact set + OG image (always) — the tournament ★v6 | ledger verify | selected with reasons · re-hashed |
| 6 COMPOSE | implementation/ | Gate 3 | ≥ 48/60 |
| 7 VERIFY | verification-report.json | Gate 4 | All 7 axes pass (Axis 7 never waived) |
| 8 HANDOFF | HANDOFF.md | — | If client_handoff: true |

## AI ENGINE QUICK SELECT (v4.2)

| Task | Primary | Alternative |
|------|---------|-------------|
| Product stills / UI mockups | Nano Banana Pro | GPT Image 1.5 |
| North Star (expressive) | Grok Imagine | Nano Banana Pro |
| Reference cleanup | **Google Whisk** ★ | Nano Banana Pro |
| Cinematic background loops | **Google Whisk** (animate) ★ | Kling 3 |
| Scroll sequence (preferred) | **Google Flow** (interpolation) ★ | Frame-by-frame prompting |
| Video/motion | Kling 3 | Veo 3 |
| Product 360° | Leonardo Product Spin | — |
| Style matching | Leonardo Style Transfer | — |
| OG image (social) | Nano Banana Pro | GPT Image 1.5 |

## ASSET CLASSIFICATION (v4.2 — mandatory before integration)

```
SCROLL-TIED:        → 15fps JPEG frames → Canvas + ScrollTrigger
LOOPING BACKGROUND: → MP4 autoplay+loop+muted → z-index behind content
STATIC:             → WebP/AVIF optimized → loading="lazy" below fold
```

## BRAND PERSONALITY MATRIX (Phase 2)

```
minimal ←──────────→ maximal          → animation intensity
serious ←──────────→ playful          → interaction playfulness
classic ←──────────→ avant-garde      → technique selection + 3D threshold
digital ←──────────→ organic          → texture/grain decisions
quiet   ←──────────→ bold             → cursor + WebGL threshold
fast    ←──────────→ contemplative    → animation timing
```

**Bold axis thresholds:**
- 1-4: No custom cursor | subtle CSS animations
- 5-7: Trailing cursor | GSAP standard stack
- 8-10: Magnetic cursor + WebGL | full GSAP + Three.js

**BPM-to-Asset Mapping (v4.2):**
```
Bold 8-10 + Avant-garde 8-10 → Whisk cinematic, WebGL, custom 3D
Bold 5-7 + Refined 6-10      → Flow interpolation, subtle parallax
Bold 1-4 + Classic 7-10      → Static hero images, minimal motion
Playful 7-10                  → Animated illustrations, GIF loops
Serious 8-10 + Technical 7-10 → Data viz, clean transitions
```

## 22 ANTI-PATTERNS

1. Cookie-Cutter — skip Phase 1 = uniform output
2. Blind Generation — artifacts without CSS context
3. Template Imposition — forcing a palette/style
4. Batch-and-Pray — all images at once
5. Identity Erasure — unrecognizable from original brand
6. Trinket Dropping — images not integrated with CSS
7. Video-as-Animation — MP4 instead of Canvas frames
8. Frame Inconsistency — different prompts per frame
9. One-Shot Prompting — no Discovery Interview or PRD
10. Skipping Asset Pipeline — raw video on scroll engine
11. Context Drift — no persistent context injection
12. Intensity Mismatch — DIS reading ignored (over/under-designed)
13. Code-vs-AI Misrouting — wrong asset class for the job
14. Generative-for-its-own-sake — algorithmic art with no brand reason
15. Depth Theater ★v5.0 — 3D bolted on for flash, not meaning
16. Slop Tells ★v5.1 — the anti-slop canon (the generic-AI look)
17. Register Mismatch ★v5.1 — wrong treatment for the task's ambition
18. Lifeless ★v6 — correct and dead; the counterweight to #17
19. Two Clocks ★v6 — two things own the scroll
20. Flagged but Shipped ★v6 — a risk note or red test treated as FYI
21. Defaults as Decisions ★v6 — template pre-fills shipped as choices
22. Unreviewed Interpolation ★v6 — generated in-betweens shipped unseen

Full detail: references/anti-patterns.md

## TASTE DOCTRINE (10 RULES)

1. 3 wow animations > 30 mediocre ones
2. Fix type before adding effects
3. Palette = emotional direction system
4. Animation reveals quality, doesn't create it
5. Design for ONE unforgettable moment
6. Copy technique, not style
7. Best moments visible in the 15-second scroll
8. Preserve ONE signature animation on mobile
9. Nothing ships lifeless ★v6 — restraint decides how much moves, never whether anything breathes
10. One clock, one signature ★v6 — write the score before the code

## FINAL SIGN-OFF — 7 AXES

```
Axis 1: Awwwards Design     ≥ 7.5/10
Axis 2: Animation quality   ≥ 7/10 checks
Axis 3: Taste Test          7/7 (all must pass)
Axis 4: Performance         ≥ 10/12 checks
Axis 5: Brand DNA match     ≥ 5/7
Axis 6: Treatment & Soul    ≥ 5/6 (CD3 — register match, soul, anti-slop; hard-fails block ship)
Axis 7: Aliveness ★v6       6/6 — arrival · heartbeat · hand-feel · breath · composed still · the score held
                            (recordings: first 5 s, 15-s slow scroll, reduced motion) — never waived
+ Enhancement Discovery:    3-5 suggestions (Orchestrator decides)
```

## IMMERSIVE MODE (v4.3)

Use when Bold/Avant-garde ≥ 8, flagship quality is required, and the project needs one WebGL/3D/signature-motion moment. Route through `IMMERSIVE_MODE.md`, `phases/04.5-immerse.md`, `agent-prompts/agent-f-immersion.md`, `references/webgl-immersion.md`, and `references/evidence-qa.md`. Gate: `templates/immersion-scorecard.md` average ≥ 4.0 with zero automatic failures.

## PERFORMANCE TIERS (Phase 0)

```
TIER 1 — MARKETING:  LCP < 2.5s, max 150KB JS, no Three.js
TIER 2 — ANIMATED:   LCP < 3.5s, max 300KB JS, Three.js if avant-garde ≥ 8
TIER 3 — IMMERSIVE:  LCP < 4.0s, progressive enhancement, WebGL scenes
```

---
*Iron Canvas v6.0 — The Living Canvas — Island Development Crew*
