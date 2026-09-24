# IRON CANVAS — MASTER ROUTING BRIDGE
## *The complete map from every phase to every resource*

> **AGENT INSTRUCTION:** Read this file immediately after SKILL.md.
> This is the navigation system for the entire Iron Canvas repo.
> Every phase, every decision gate, every sub-system has an explicit
> route to the exact file that governs it. Never skip a phase.
> Never skip Phase 5 or Phase 6.

---

## THE COMPLETE WIRED PIPELINE

```
ENTRY POINT
  └─→ SKILL.md                          ← Read first, every time
       └─→ ROUTING.md (this file)        ← Read second, every time
       └─→ references/claude-design-3.md ← Read third — the Treatment Doctrine (soul) ★v5.1
              Sets treatment_register (R0–R4) that caps the whole DIS; governs every phase.

PHASE 0: ORIENT
  └─→ phases/00-orient.md               ← Project type + execution mode + surface pack ★v5.0
       Outputs: orient-decision.json (+ surface_pack + treatment_register ★v5.1 + depth_intensity_hint)
       ★v5.0 SURFACE DISPATCH:
         Types A/B/D/E/F → surfaces/web/PACK.md            (body = SKILL.md itself)
         Type C          → surfaces/app-dashboard/PACK.md  (primary Type C authority)
         Contract: surfaces/SURFACE-PACK-CONTRACT.md
         Rule: SKILL.md + ROUTING.md + exactly ONE pack. Never two. Never a pack alone.

PHASE 1: STUDY
  └─→ phases/01-study.md                ← DNA extraction
       Template: templates/site-dna-profile.md
       Outputs: site-dna-profile.json
       GATE 1: 7/7 → proceed

PHASE 2: FEEL
  └─→ phases/02-feel.md                 ← Emotional target discovery
       Template: templates/feel-profile.md
       Outputs: feel-profile.json

PHASE 3: SCOUT
  └─→ phases/03-scout.md                ← AI reference + North Star image
       Tools: Nano Banana Pro, Grok, GPT Image, Leonardo Kino XL
       Outputs: north-star-reference.png, scout-report.json
       GATE 2: 4/5 → proceed

PHASE 3.5: VALIDATE
  └─→ phases/03.5-validate.md           ← Cross-LLM technical validation
       Template: templates/technical-validation-report.md
       Outputs: technical-validation-report.md
       GATE 3.5: No BLOCKED features → proceed

PHASE 3.9: PACKAGE
  └─→ phases/03.9-package.md            ← Design PRD packaging
       Template: templates/design-prd.md
       Outputs: design-prd.md

PHASE 4: FORGE (PARALLEL AGENTS DISPATCHED HERE)
  └─→ Agent-A: agent-prompts/agent-a-foundation.md
  └─→ Agent-B: agent-prompts/agent-b-motion.md
  └─→ Agent-C: agent-prompts/agent-c-ui.md
       Motion ref: references/expertise-injection.md (GSAP / Lenis / Barba sections)
       Outputs: tokens.css, index.html, base.css, scroll.js, components.css

PHASE 4.5: IMMERSE (ONLY WHEN IMMERSIVE SELECTED)
  └─→ phases/04.5-immerse.md
       Agent-F: agent-prompts/agent-f-immersion.md
       Ref: references/webgl-immersion.md + references/evidence-qa.md
       Template: templates/immersion-scorecard.md
       Harness: templates/playwright.config.ts + templates/smoke.spec.ts
       Gate: average ≥ 4.0 and zero automatic failures

╔══════════════════════════════════════════════════════════════════╗
║  PHASE 5: ARTIFACT ASSESSMENT + GENERATE  ← MANDATORY GATE      ║
║  └─→ phases/05-generate.md                                       ║
║       └─→ ARTIFACT ASSESSMENT (see § below)                      ║
║       └─→ If YES: run full Phase 5 pipeline                      ║
║       └─→ Agent-D: agent-prompts/agent-d-artifacts.md            ║
║            ├─→ Still images: references/model-selection.md       ║
║            ├─→ Prompt craft: references/prompt-engineering.md    ║
║            ├─→ Leonardo work: references/leonardo-blueprints.md  ║
║            └─→ Scroll frames: references/scroll-engine.md        ║
║       └─→ If NO: document rationale + skip to Phase 6            ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║  PHASE 6: COMPOSE (INTEGRATION + SCROLL ENGINE) ← MANDATORY     ║
║  └─→ phases/06-compose.md                                        ║
║       └─→ Scroll engine: references/scroll-engine.md             ║
║       └─→ Page transitions: references/expertise-injection.md    ║
║            (Barba.js section)                                     ║
║       └─→ Image integration CSS (from artifact-css.css)          ║
╚══════════════════════════════════════════════════════════════════╝

PHASE 7: VERIFY
  └─→ phases/07-refine.md                ← Iterative REFINE loop + 6-axis audit (Axis 6 = CD3 Treatment & Soul ★v5.1)
       Agent-E: agent-prompts/agent-e-qa.md
       Outputs: verification-report.json

PRODUCTION DEPLOY
  └─→ SKILL.md § PRODUCTION BRANCHING PROTOCOL
       → staging → visual diff → main → vercel --prod
```

---

## § ARTIFACT ASSESSMENT GATE
### *★v6: run at the end of PACKAGE (3.9b) — before FORGE, so the engine jobs are known and ASSET FORGE (5a) runs in parallel. Score to decide.*

This gate is what was missing. It was the reason Phase 5 kept getting skipped.
Every run of Iron Canvas must pause here and explicitly decide. (Through v5.2 it ran at the
start of Phase 5; v6 moves it forward so generated assets are forged beside the build instead
of after it — Phase 5 is now the tournament that judges them.)

### ASSESSMENT CRITERIA (score each 1-5)

```
CRITERION 1: IMAGE ABSENCE
  Does the site have ZERO product/hero/atmospheric images?
  Score 5: No images at all (like Crown Collection — pure CSS)
  Score 3: Some images but weak/generic/missing context
  Score 1: Rich, high-quality existing imagery throughout

CRITERION 2: VISUAL STORYTELLING OPPORTUNITY
  Is there a product, ingredient, process, or concept that NEEDS
  to be shown to be understood/desired?
  Score 5: Physical product (Crown Collection body butter), clear visual sell
  Score 3: Service/concept (partially visual)
  Score 1: Pure information/text service (no visual anchor needed)

CRITERION 3: SCROLL SEQUENCE VIABILITY
  Is there a natural reveal/story that 120+ frames would tell?
  Score 5: YES — product has opening, transformation, reveal, texture
  Score 3: MAYBE — a process or journey could be scrolled through
  Score 1: NO — the content is best delivered statically

CRITERION 4: COMPETITIVE PREMIUM GAP
  Are competitors using cinematic imagery/animation you're not matching?
  Score 5: YES — you look cheap next to them without it
  Score 3: SOME — would help but not critical
  Score 1: NO — industry standard is text-forward

CRITERION 5: BRAND PERSONALITY ALIGNMENT
  Does the Brand Personality Matrix support generated artifacts?
  Score 5: Bold ≥ 7, Avant-garde ≥ 6, Maximal ≥ 6 → strongly yes
  Score 3: Mixed scores → conditional
  Score 1: Serious + Corporate + Minimal → artifacts would feel wrong
```

### CONFIDENCE SCORE + DECISION

```
TOTAL POSSIBLE: 25

Score 20-25: ✅ GENERATE — mandatory. Site needs artifacts urgently.
             → Run full Phase 5 pipeline. Scroll engine likely needed.
             → Open Chrome. Access app.leonardo.ai. Execute Blueprint workflow.

Score 13-19: ✅ GENERATE — recommended. At least hero/product images.
             → Run Phase 5 for high-priority artifacts.
             → Assess scroll engine in Phase 6.

Score 8-12:  ⚠️ CONDITIONAL — one or two targeted artifacts.
             → Generate only the specific artifacts that would most elevate.
             → No scroll engine unless Criterion 3 scored ≥ 3.

Score 1-7:   ❌ SKIP — document rationale and proceed to Phase 6.
             → Record: artifact-assessment.json with rationale.
             → Phase 6 still runs (scroll engine may not be needed either).
```

### OUTPUT: artifact-assessment.json

```json
{
  "criteria_scores": {
    "image_absence": 0,
    "visual_storytelling": 0,
    "scroll_sequence_viability": 0,
    "competitive_premium_gap": 0,
    "brand_personality_alignment": 0
  },
  "total_score": 0,
  "decision": "GENERATE / CONDITIONAL / SKIP",
  "confidence": "HIGH / MEDIUM / LOW",
  "artifacts_needed": [
    {
      "name": "hero product shot",
      "section": "hero",
      "priority": "CRITICAL",
      "engine": "Nano Banana Pro",
      "scroll_sequence": false
    }
  ],
  "scroll_engine_needed": true,
  "rationale": "Site has zero product photography. Score 22/25. Crown Collection body butter requires visual presentation to compete in luxury skincare market.",
  "skip_rationale": null
}
```

---

## § FILE → PURPOSE MAP
### *Every file in the repo and exactly what it does*

```
ROOT FILES
──────────────────────────────────────────────────────────────
SKILL.md                 Master orchestration document. Read first always.
ROUTING.md               THIS FILE. Navigation bridge to all resources.
README.md                Human-readable overview. Not for agents.
CHANGELOG.md             Version history. Reference for what changed.
FEEL.md                  Iron Canvas's own Feel Brief — a worked example of a finished one
                         (lens, reference vibe, kinetic signature). Quoted in SKILL.md §0.1.
                         The studio's feel, never a client palette.
QUICK_REFERENCE.md       Agent cheat sheet — the voice, the vocabulary, the checks.
REPO_MAP.md              File map with versions.
IMMERSIVE_MODE.md        v4.3 Agent F + IMMERSE evidence gate (doctrine reframed in v6).

RUNTIME/ · ENGINES/ · STUDIO/ · SCRIPTS/ — ★v6 executable parts
──────────────────────────────────────────────────────────────
runtime/canvas-score.js      Performs a score (acts → shots → verbs); full / reduced / static; kill switch.
runtime/score.schema.json    The score + motion-contract schema. runtime/README.md wires a page in 4 steps.
runtime/camera-rail.js       Plays a Blender-baked camera rail (ic-camera-rail/2) by the score's progress.
runtime/verbs.html           The verb gallery — every verb and personality, performed.
engines/                     Power Engines: detect · blender · video (Seedance 2.5) · audio · ledger (README.md).
studio/                      Iron Canvas Studio — idea in, production bible out (compile.mjs + index.html).
scripts/ic-preflight.mjs     Feel brief + score + engine config, one pass — blocks PACKAGE hand-off on errors.
scripts/ic-contract.mjs      The build against its design contract — taste enforced.
scripts/lint-skill.mjs       Doctrine lint: paths · fences · voice · version · the loss guard (--against).
showcase/origin.html         The first Iron Canvas page, restored — the soul with zero libraries.
showcase/living-canvas/      The five-act WebGL scroll film — the pipeline, performed.
surfaces/film/PACK.md        ★v6 Type H (experimental) — launch films + motion graphics from one film score.

PHASES/ — Sequential execution guides
──────────────────────────────────────────────────────────────
phases/00-orient.md      Project type A-F + execution mode SOLO/SWARM/MISSION
phases/01-study.md       CSS extraction, font ID, imagery census, DNA profile
phases/02-feel.md        Copy/imagery analysis, Brand Personality Matrix
phases/03-scout.md       Reference sources by type, North Star generation
phases/03.5-validate.md  Technical feasibility: GSAP/Canvas/WebGL/TTS/etc.
phases/03.9-package.md   Design PRD template + Orchestrator dispatch prompt
phases/04-forge.md       CSS tokens, universal upgrades, spring curves
phases/05-generate.md    ★ ARTIFACT ASSESSMENT GATE + full generation pipeline
phases/06-compose.md     ★ Image integration + scroll engine assembly
phases/07-refine.md      REFINE loop + Phase 7 is the 7-axis audit (Axis 6 = CD3 Treatment & Soul, Axis 7 = Aliveness)

AGENT-PROMPTS/ — Copy-paste system prompts for each specialized agent
──────────────────────────────────────────────────────────────
agent-prompts/orchestrator.md         Governs, never codes. Dispatches all agents.
agent-prompts/agent-a-foundation.md   tokens.css + HTML scaffold + base.css
agent-prompts/agent-b-motion.md       GSAP + Lenis + scroll engine + transitions
agent-prompts/agent-c-ui.md           Components + cursor + micro-interactions
agent-prompts/agent-d-artifacts.md    AI image generation + scroll frames
agent-prompts/agent-e-qa.md           Accessibility + performance + cross-browser

REFERENCES/ — Technical deep dives (loaded when specifically needed)
──────────────────────────────────────────────────────────────
references/anti-patterns.md           22 anti-patterns (incl. CD3 #16 Slop Tells / #17 Register Mismatch; v6 #18 Lifeless · #19 Two Clocks · #20 Flagged but Shipped · #21 Defaults as Decisions · #22 Unreviewed Interpolation) + Section II design slop. Loaded at start of every run.
references/claude-design-3.md         ★v5.1 CD3 Treatment Doctrine (the conscience) — Register R0–R4, governs every phase. Read third, at ORIENT + VERIFY.
references/motion-language.md         ★v6 The one motion vocabulary — the aliveness floor, the seven personalities, curve roles, tempos, arrival, heartbeat, hand-feel, breath, transitions, type in motion, sound. Read at FEEL, PACKAGE, FORGE (Agent-B/C) and VERIFY (Axis 7).
references/cinematic-score.md         ★v6 The score as motion contract — motion sentence, acts and shots, one signature, one clock, portfolio rules, one score → site · film · shot list. Read at PACKAGE.
references/power-engines.md           ★v6 Blender · Seedance 2.5 · sound — available × appropriate gates, the twin camera, the ledger, fallbacks. Read at ORIENT (scan) and ASSET FORGE.
references/direction-fusion.md        ★v6 Voice · World · Instrument — authored direction from three sources, evidence classes. Read at FEEL (feel line) and SCOUT.
references/gauntlet-loop.md           ★v5.2 The premium build method — fan-out + blind critic + falsifiable bar for the generative phases FORGE/IMMERSE/GENERATE at R2–R4 (OFF at R0/R1; COMPOSE is integration, not gauntlet). Read at ORIENT when register ≥ R2, and before Phase 4/4.5/5.
references/scroll-engine.md           ★ Canvas + GSAP ScrollTrigger architecture
                                       LOAD THIS when scroll engine is planned.
references/model-selection.md         ★ AI engine routing guide (Nano Banana, Leonardo,
                                       Grok, GPT Image, Kling, ffmpeg)
                                       LOAD THIS at start of Phase 5.
references/prompt-engineering.md      ★ Context-aware prompt formula + examples
                                       LOAD THIS before writing any artifact prompt.
references/leonardo-blueprints.md     ★ Leonardo AI blueprint workflows
                                       LOAD THIS when Leonardo browser work is planned.
references/expertise-injection.md     ★ Domain expertise injections (GSAP, Three.js,
                                       Nano Banana, Lenis, Barba.js, AudioContext)
                                       LOAD THIS before each Build Agent executes.

TEMPLATES/ — Fill-in-the-blank output templates
──────────────────────────────────────────────────────────────
templates/site-dna-profile.md         Phase 1 output template
templates/feel-profile.md             Phase 2 output template
templates/technical-validation-report.md  Phase 3.5 output template
templates/design-prd.md               Phase 3.9 PRD master template
templates/design-contract.json        ★v6 Phase 3.9d the design plan, machine-readable (scripts/ic-contract.mjs)
templates/scroll-capture.spec.ts      ★v6 Phase 7 Axis 7 evidence — arrival video, act stations, liveness, hand-feel
templates/invocation-templates.md     Copy-paste Antigravity/Claude Code invocations

SUB-SKILLS/ (ARCHIVAL — superseded by SKILL.md v6 §7b and references/motion-language.md;
             kept for history, not executed)
──────────────────────────────────────────────────────────────
sub-skills/01-PERCEPTION.md          Historic focused DNA extraction (live doctrine: phases/01)
sub-skills/02-MOTION-ARCHITECTURE.md Historic animation planning (live doctrine: SKILL.md §7b)
sub-skills/03-FORGE.md               Historic code generation (live doctrine: the full pipeline)
sub-skills/04-VERIFY.md              Historic verification (live doctrine: phases/07)
```

---

## § PHASE 5 ROUTING DECISION TREE
### *Load these specific files based on what was decided*

```
Phase 5 entry → READ phases/05-generate.md

Run ARTIFACT ASSESSMENT GATE → produces artifact-assessment.json

IF decision = GENERATE or CONDITIONAL:

  FOR STILL IMAGES (product shots, hero images, atmosphere):
    1. READ references/model-selection.md     ← which engine to use
    2. READ references/prompt-engineering.md  ← how to craft the prompt
    3. INJECT into Agent-D:
       references/expertise-injection.md      ← Nano Banana section
    4. Run Agent-D: agent-prompts/agent-d-artifacts.md

  FOR LEONARDO AI WORK (Product Spin, Relight, Style Transfer):
    1. READ references/leonardo-blueprints.md
    2. OPEN CHROME → navigate to app.leonardo.ai
       (See § LEONARDO BROWSER PROTOCOL below)
    3. Run Blueprint workflow → download output
    4. Hand off to ffmpeg frame extraction if scroll sequence

  FOR SCROLL SEQUENCE (120+ frames, Apple-style):
    1. READ references/scroll-engine.md       ← full architecture
    2. READ references/prompt-engineering.md  ← frame consistency protocol
    3. INJECT Nano Banana Pro expertise into Agent-D
    4. Generate 10-frame prototype FIRST
    5. Validate scroll scrub → then generate full set
    6. Pass frames to Agent-B for scroll engine implementation

IF decision = SKIP:
  Document in artifact-assessment.json
  PROCEED directly to Phase 6
```

---

## § PHASE 6 ROUTING DECISION TREE

```
Phase 6 entry → READ phases/06-compose.md

FOR IMAGE INTEGRATION:
  1. Place artifact in page
  2. Screenshot in context
  3. Evaluate blend (3 questions from phases/06-compose.md)
  4. Apply CSS from artifact-css.css (Agent-D output)
  5. If doesn't blend → back to Agent-D → regenerate

FOR SCROLL ENGINE ASSEMBLY:
  1. READ references/scroll-engine.md         ← LOAD THIS FULLY
  2. INJECT into Agent-B:
     references/expertise-injection.md        ← GSAP section
  3. Agent-B implements scroll-engine.js
  4. Test 10-frame scrub before full deploy
  5. Add content overlays from PRD timing

FOR PAGE TRANSITIONS:
  1. INJECT into Agent-B:
     references/expertise-injection.md        ← Barba.js section
  2. Agent-B implements transitions.js

FOR WEBGL (if justified):
  1. INJECT into Agent-B:
     references/expertise-injection.md        ← Three.js section
  2. Agent-B implements webgl.js
```

---

## § LEONARDO BROWSER PROTOCOL
### *Mandatory for Crown Collection-type sites with physical products*

> The agent can drive a Chrome browser to run the Leonardo workflow.
> Navigate to app.leonardo.ai and execute the Blueprint workflow.

### BROWSER AUTOMATION STEPS

```
STEP 1: Open Chrome
  Open a new Chrome window or tab

STEP 2: Navigate to Leonardo AI
  URL: https://app.leonardo.ai/

STEP 3: Log in (if not already logged in)
  Prompt the user to log in

STEP 4: Navigate to Blueprints
  Click "Blueprints" in the left sidebar or
  Navigate to: https://app.leonardo.ai/blueprints

STEP 5: Select the appropriate Blueprint
  For product stills:        "Product Studio Photoshoot"
  For lifestyle shots:       "Product In Scene"
  For scroll sequence:       "Product Spin Video"
  For palette matching:      "Style Transfer"
  For frame consistency:     "Custom Relight"
  For background context:    "Background Change"
  For container expansion:   "Instant Outpaint"

STEP 6: Upload reference image or provide prompt
  Upload: existing product photo if available
  OR: provide base image from Nano Banana Pro generation

STEP 7: Configure and run
  Adjust settings per references/leonardo-blueprints.md
  Click Run / Generate

STEP 8: Download outputs
  Download all generated images to project's /public/images/iron-canvas/ folder
  OR directly to /frames/ for scroll sequences

STEP 9: Frame extraction (if Product Spin Video)
  ffmpeg -i spin.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%04d.webp
  ffmpeg -i spin.mp4 -vf "fps=15,scale=960:540" frames-mobile/frame_%04d.webp
```

### CHROME AUTOMATION FALLBACK (if browser automation unavailable)

If Chrome automation is blocked or unavailable:
1. Use Leonardo AI API directly (see references/leonardo-blueprints.md § API Access)
2. Or use Nano Banana Pro exclusively for all artifact generation
3. Document which Leonardo workflows were skipped and why

```bash
# Leonardo API (programmatic)
curl -X POST https://cloud.leonardo.ai/api/rest/v1/blueprints/{id}/run \
  -H "Authorization: Bearer $LEONARDO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"nodeInputs": {"imageUrl": "...", "prompt": "..."}}'
```

---

## § REFERENCE LOADING RULES
### *When to load which reference file*

| Condition | Load This Reference |
|-----------|-------------------|
| Before ORIENT (very first read) ★v6 | SKILL.md §0 — the voice (§0.1) and the conscience (§0.2); `FEEL.md` as the worked Feel Brief |
| Before ORIENT (very first read) ★v5.1 | `references/claude-design-3.md` — the Treatment Doctrine; sets `treatment_register` (R0–R4), caps the DIS |
| At ORIENT ★v6 | `references/power-engines.md` + `node engines/detect.mjs` (the power-engine scan) |
| At FEEL ★v6 | `references/motion-language.md` (the kinetic signature) · `references/direction-fusion.md` §1 (the feel line) |
| At SCOUT ★v6 | `references/direction-fusion.md` (Voice · World · Instrument, evidence classes) |
| At PACKAGE ★v6 | `references/cinematic-score.md` + `runtime/score.schema.json` (the score) · `templates/design-contract.json` · then `scripts/ic-preflight.mjs` |
| Before Agent-B runs ★v6 | `references/motion-language.md` + `runtime/README.md` (performing the score) |
| At VERIFY ★v6 | `references/motion-language.md` §17 + `templates/scroll-capture.spec.ts` (Axis 7) · `scripts/ic-contract.mjs` |
| Film surface ★v6 | `surfaces/film/PACK.md` (one film score → code · video · Blender lanes) |
| Before VERIFY / Agent-E ★v5.1 | `references/claude-design-3.md` (Axis 6 — Treatment & Soul battery) |
| At ORIENT when `treatment_register` ≥ R2, then before Phase 4/4.5/5 ★v5.2 | `references/gauntlet-loop.md` — the fan-out + blind-critic build method for the premium tier (skip at R0/R1) |
| Phase 5 starts (any path) | `references/model-selection.md` |
| Writing ANY image prompt | `references/prompt-engineering.md` |
| Planning scroll sequence | `references/scroll-engine.md` |
| Using Leonardo at all | `references/leonardo-blueprints.md` |
| Before Agent-B runs | `references/expertise-injection.md` (GSAP + Lenis + Barba sections) |
| Before Agent-D runs | `references/expertise-injection.md` (Nano Banana + Leonardo sections) |
| Before Agent-E runs | `references/anti-patterns.md` |
| Every phase start | `references/anti-patterns.md` (anti-pattern check) |
| Three.js planned | `references/expertise-injection.md` (Three.js section) |
| TTS/audio planned | `references/expertise-injection.md` (AudioContext section) |

---

## § OUTPUT FILE MAP
### *Every output file and where it lives*

```
PROJECT ROOT (iron-canvas-output/ or project root)
├── orient-decision.json          ← Phase 0
├── site-dna-profile.json         ← Phase 1
├── feel-profile.json             ← Phase 2
├── north-star-reference.png      ← Phase 3
├── scout-report.json             ← Phase 3
├── technical-validation-report.md ← Phase 3.5
├── design-prd.md                 ← Phase 3.9
├── artifact-assessment.json      ← Phase 5 GATE ★ NEW
│
├── agent-outputs/
│   ├── agent-a/
│   │   ├── tokens.css
│   │   ├── index.html
│   │   └── base.css
│   ├── agent-b/
│   │   ├── load-sequence.js
│   │   ├── scroll.js
│   │   ├── scroll-engine.js      ← if scroll sequence planned
│   │   ├── transitions.js        ← if page transitions planned
│   │   └── webgl.js              ← if Three.js planned
│   ├── agent-c/
│   │   ├── components.css
│   │   ├── interactions.js
│   │   └── typography.js
│   ├── agent-d/
│   │   ├── artifact-prompts.md   ← prompts written before generation
│   │   ├── artifact-css.css      ← integration CSS for each artifact
│   │   ├── artifact-assessment.json  ← confidence score + decision
│   │   ├── [generated images]    ← actual output from AI engines
│   │   ├── frames/               ← scroll sequence frames (desktop)
│   │   └── frames-mobile/        ← scroll sequence frames (mobile)
│   └── agent-e/
│       ├── accessibility-audit.md
│       ├── performance-checklist.md
│       ├── cross-browser-report.md
│       └── qa-fixes.md
│
├── implementation/               ← Phase 6 merged output
│   ├── tokens.css
│   ├── index.html
│   ├── styles/
│   │   ├── base.css
│   │   ├── components.css
│   │   └── animations.css
│   ├── scripts/
│   │   ├── main.js
│   │   ├── scroll.js
│   │   ├── cursor.js
│   │   ├── transitions.js
│   │   └── webgl.js
│   └── public/
│       ├── images/iron-canvas/   ← generated artifacts
│       └── frames/               ← scroll sequence frames
│
└── verification-report.json      ← Phase 7 final sign-off
```

---

## § QUICK DECISION ROUTING
### *Which phases to emphasize based on what's missing*

```
"Site has no images at all"
  → Artifact Assessment will score 18-25
  → Phase 5 is MANDATORY
  → Check: does the product warrant scroll sequence?
  → Crown Collection = YES (body butter reveal is cinematic)

"Site has images but they're stock/generic"
  → Artifact Assessment will score 13-17
  → Phase 5: replace hero + product shots with AI-generated
  → Leonardo Style Transfer against existing brand palette
  → Scroll sequence: assess per Criterion 3

"Site needs interactivity but has images"
  → Artifact Assessment may score 8-12
  → Phase 5: skip or minimal (one targeted artifact)
  → Phase 6: focus on scroll engine + page transitions

"Site is text-forward (law firm, news, docs)"
  → Artifact Assessment will score 1-7
  → Phase 5: SKIP with documented rationale
  → Phase 6: no scroll engine needed
  → Focus: tokens + micro-interactions + typography

"Product configurator / automotive style"
  → Type D project (e-commerce / luxury product)
  → Research: Porsche, Lamborghini, Ferrari, Koenigsegg websites
  → Phase 3 SCOUT: scrape those sites for code patterns
  → Phase 5: 3D product renders + color variant shots
  → Phase 6: scroll sequence + THREE.JS product configurator
  → References: scroll-engine.md + model-selection.md + leonardo-blueprints.md
```

---

## § AUTOMOTIVE / LUXURY CONFIGURATOR ROUTE
### *Research standard for Crown Collection-type premium product builds*

When the brief calls for Porsche/Lamborghini/Ferrari-level product experience:

**Phase 3 SCOUT — Research these specific sites:**
```
Primary references (inspect their code):
  porsche.com          - Scroll-driven hero, product configurator, GSAP
  lamborghini.com      - Canvas animations, cinematic sections
  ferrari.com          - Editorial grid, video backgrounds, luxury type
  koenigsegg.com       - Immersive scroll, 3D elements, dark luxury
  rimac-automobiles.com - Award-winning dark tech luxury

Technique catalog to extract:
  - How does the product configurator work? (color selector → 3D update)
  - What scroll technique drives the hero reveal?
  - How are product variants displayed? (carousel vs. overlay vs. scroll)
  - What is the color/material selector interaction?
  - How does the page transition between models/configurations?
```

**Phase 5 GENERATE — Artifacts needed:**
```
For product configurator:
  1. Product hero shot (angle 1 — front, closed, sealed)
  2. Product hero shot (angle 2 — 3/4 view)
  3. Product close-up (texture, material, lid detail)
  4. Color/variant shots (one per SKU)
  5. Lifestyle context shot (in use, environment-placed)
  6. Ingredient/component explosion (for scroll sequence)

All generated with:
  - Consistent lighting (Leonardo Custom Relight)
  - Consistent background (deep brand-palette color)
  - Consistent angle (Leonardo Product Studio Photoshoot)
  - Style matched to North Star (Leonardo Style Transfer)
```

**Phase 6 COMPOSE — Build:**
```
  - Product selector: CSS Grid + GSAP Flip for variant switching
  - Canvas scroll sequence: product reveal (Apple/Koenigsegg pattern)
  - 3D product view: Three.js (only if bold ≥ 8 + avant-garde ≥ 8)
  - Configurator logic: color/size/scent selector → product image swap + GSAP Flip
```

---

*Iron Canvas ROUTING.md v5.0 — Island Development Crew*
*"Where there is no vision, the people perish." — Proverbs 29:18 (KJV)*

---

## ═══════════════════════════════════════════════════
## § REFERENCE FILES — GAP CLOSURE (originally v3.1, now wired in v4.2)
## ═══════════════════════════════════════════════════

The following files were added in v3.1 (now fully wired in SKILL.md v4.2) to close 10 gaps identified
after competitive analysis and full repo audit. Each file has specific
integration points in the pipeline — read this routing to know when
each file should be consulted.

---

### WHEN TO READ EACH NEW FILE

```
references/typography-system.md
  → READ: Phase 2 (FEEL) — during feel profile construction
  → BY: Orchestrator (before issuing Design PRD)
  → CONSUMES: Brand Personality Matrix scores
  → OUTPUTS TO: feel-profile.json typography field → Agent-A tokens.css → Agent-B SplitText

references/color-system.md
  → READ: Phase 2 (FEEL) — alongside typography-system.md
  → BY: Orchestrator
  → CONSUMES: Brand primary color, feel profile energy
  → OUTPUTS TO: feel-profile.json color field → Agent-A tokens.css → Agent-A mesh bg

references/motion-budget.md
  → READ: Phase 2 (FEEL) — final step before feel profile is sealed
  → BY: Orchestrator (to set motion tier) + Agent-B (to execute within budget)
  → CONSUMES: Brand Personality Matrix (bold + avant-garde scores) + project type
  → OUTPUTS TO: feel-profile.json motion field → Agent-B full session

references/grid-rhythm.md
  → READ: Phase 4 (FORGE) — before Agent-A writes any layout CSS
  → BY: Agent-A (Foundation)
  → CONSUMES: Project type + feel profile layout field
  → OUTPUTS TO: tokens.css spacing scale + layout structure choices

references/performance-budget.md
  → READ: Phase 0 (ORIENT) — very first thing, before any decisions
  → BY: Orchestrator
  → CONSUMES: Project type
  → OUTPUTS TO: orient-decision.json performance field → gates Agent-B (Three.js) + Agent-D (scroll format)

references/interaction-library.md
  → READ: Phase 4 (FORGE) / Phase 6 (COMPOSE)
  → BY: Agent-C (UI/UX)
  → CONSUMES: Motion tier from feel-profile.json
  → OUTPUTS TO: All interactive component implementations

references/seo-conversion.md
  → READ: Phase 1 (STUDY) + Phase 5 (GENERATE) + Phase 7 (VERIFY)
  → BY: Orchestrator (Phase 1 questions), Agent-D (OG image), Agent-E (Phase 7 checklist)
  → OUTPUTS TO: site-dna-profile.json conversion fields + OG image artifact + Phase 7 audit

phases/08-handoff.md
  → READ: After Phase 7 (VERIFY) when client_handoff: true
  → BY: Orchestrator (final phase for client builds)
  → OUTPUTS TO: /HANDOFF.md in project root

references/video-integration-protocol.md
  → READ: When video transcript content is delivered by the operator
  → BY: Claude (in the design session — not an agent task)
  → STATUS: Framework built, content pending transcript paste
  → WILL OUTPUT TO: Multiple files per Hook 1-7 in the protocol
```

---

### FEEL PROFILE STRUCTURE (v4.2)

The feel-profile.json now includes four new top-level objects.
Agent-A and Agent-B must read all four before executing:

```json
{
  "feel": { ... },
  "brand_personality": { ... },
  "typography": {
    "personality": "EXPRESSIVE | EDITORIAL | COMMANDING | REFINED | FUNCTIONAL",
    "display_font": "string",
    "body_font": "string",
    "accent_font": "string",
    "display_entry_animation": "char-stagger | word-fade | block-fade | none",
    "heading_tracking": "-0.03em",
    "body_line_height": "1.7",
    "font_source": "self-hosted | variable | google"
  },
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
  },
  "motion": {
    "tier": "1 | 2 | 3 | 4",
    "hero_animation": "fade | type-reveal | full-choreography | immersive",
    "scroll_sequences": false,
    "magnetic_cursor": false,
    "three_js": false,
    "page_transitions": false,
    "prefers_reduced_motion_fallback": true
  },
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

### PHASE 0 ORIENT OUTPUT (v4.2)

orient-decision.json now includes performance tier:

```json
{
  "project_type": "A | B | C | D | E | F",
  "execution_mode": "SOLO | SWARM | MISSION",
  "client_handoff": true,
  "performance": {
    "tier": "1 | 2 | 3",
    "lcp_target": "2.5s",
    "font_strategy": "self-hosted | variable | google",
    "three_js_allowed": false,
    "scroll_sequence_format": "webp-frames | video | none",
    "bundle_budget_kb": 150
  }
}
```

---

*Iron Canvas ROUTING.md — Updated v5.0*
*Gap closure: 10 missing systems now have reference files and routing bridges.*


---

## v4.2 ROUTING ADDITIONS

```
PHASE 2 (FEEL):    references/design-intensity-scale.md  → compute design_intensity block
PHASE 5 (GENERATE):references/code-driven-assets.md      → SVG/Remotion/Hyperframe routing
                   references/algorithmic-art.md         → generative system selection
SHOWCASE (live):   showcase/index.html                   → STANDALONE no-build about-page (GitHub Pages ready)
SHOWCASE (source): showcase/iron-canvas-showcase.jsx     → living design-language reference (bundler build)
SHOWCASE (build):  showcase/build-standalone.cjs         → regenerates index.html from the .jsx
```
Asset Classification now routes 4 classes: scroll-tied · looping · static · code-driven.

---

## v5.0 ROUTING ADDITIONS

```
PHASE 0 (ORIENT):  surfaces/SURFACE-PACK-CONTRACT.md     → pack registry + dispatch rule
                   surfaces/web/PACK.md                  → Types A/B/D/E/F (flagship; body = SKILL.md)
                   surfaces/app-dashboard/PACK.md        → Type C (density scale, app shell grammar,
                                                           data-motion grammar, state choreography,
                                                           app verify profile)
                   surfaces/immersive-3d/PACK.md         → Type A-world (sustained Tier III — world
                                                           grammar, camera rail, loader, Agent F core)
                   surfaces/game-realtime/PACK.md        → Type G (diegetic decision, HUD grammar,
                                                           game-feel timing) — EXPERIMENTAL
                   surfaces/game-realtime/UNREAL-ADAPTER.md → engine delivery spec (PRD → MPC/UMG/
                                                           Niagara/Sequencer; consumer, never bypass)
PHASE 2 (FEEL):    references/depth-language.md          → System 9 altitude assignment
                                                           (DIS now computes NINE systems — SKILL.md §20)
PHASE 4 (FORGE):   references/depth-language.md          → Tier I depth tokens (Agent-A),
                                                           Tier II/III scene + camera rail (Agent-B)
PHASE 4.5 (IMMERSE): AUTO when depth_language ≥ 0.4      → Agent F + §22 evidence gate
                   (agent-prompts/agent-f-immersion.md, references/webgl-immersion.md,
                    references/evidence-qa.md, templates/immersion-scorecard.md)
PHASE 7 (VERIFY):  dispatched pack §5 VERIFY PROFILE     → replaces the web battery on non-web surfaces
                                                           (app-dashboard: INP < 200ms, 60fps panels,
                                                           density audit — NOT Lighthouse-first)
SHOWCASE (depth):  showcase/depth.html                   → LIVE Depth Language demo — scroll IS the
                                                           dial (composed → staged → inhabited),
                                                           standalone no-build, seeded 5417
```
`three_js_eligible` is RETIRED — depth is a dial (0–1), never a binary. Anti-Pattern #15
(DEPTH THEATER) guards it. The `motion.three_js` boolean in feel-profile.json is superseded
by `design_intensity.systems.depth_language` — kept for backward compatibility, derived as
`depth_language.intensity ≥ 0.4`.

---

## v6 ROUTING ADDITIONS — The Living Canvas

```
FRONT DOOR:        studio/index.html                     → one-line idea → production bible (treatment ·
                                                           score · engine jobs · config · mission)
PHASE 0 (ORIENT):  Q8 the mechanism · node engines/detect.mjs → power_engines
                   surfaces/film/PACK.md                 → Type H (EXPERIMENTAL): films + motion graphics
PHASE 2 (FEEL):    references/motion-language.md         → the kinetic signature (GATE 2 fails without it)
                   references/direction-fusion.md §1     → the feel line when no direction was given
PHASE 3 (SCOUT):   references/direction-fusion.md        → Voice · World · Instrument; evidence classes
PHASE 3.9:         references/cinematic-score.md         → score.json (the motion contract)
                   ROUTING § ARTIFACT ASSESSMENT GATE     → now runs here (3.9b) + engine jobs
                   templates/design-contract.json         → 3.9d the design contract
                   scripts/ic-preflight.mjs               → must PASS before dispatch (3.9c)
PHASE 4 (FORGE):   runtime/canvas-score.js (+ README)    → Agent-B performs the score
                   references/interaction-library.md      → restored high-end patterns + Creative Arsenal
PHASE 5a:          references/power-engines.md + engines/ → ASSET FORGE in parallel with FORGE
PHASE 5:           engines/ledger.mjs                     → the tournament: select · verify · encode · promote
PHASE 7 (VERIFY):  Axis 7 (Aliveness, never waived)       → templates/scroll-capture.spec.ts
                   scripts/ic-contract.mjs                → the build keeps its contract
PHASE 8:           PREMIERE                               → references/cinematic-score.md §7 · surfaces/film/PACK.md
ALWAYS:            scripts/lint-skill.mjs --against <base> → before any doctrine release (the loss guard)
```
