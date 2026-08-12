# VIDEO INTEGRATION PROTOCOL — Iron Canvas v4.2
## *Insights extracted from Samir's Applied AI Engineering series*

> **Source videos:**
> - Video 1: Retro Sci-Fi 8-Bit Website Build (https://youtu.be/j74kjYvzzLk)
> - Video 2: Universal AI Architect / Context Engineering (https://youtu.be/N_X9Zt8nXwk)
> - Video 3: Jesko Jets Awwwards Clone (https://youtu.be/DUOvVST7fCw)
>
> **Prompts & assets:** linked in the source video descriptions
>
> **Classification key:** `[P]` Philosophy | `[T]` Technique | `[W]` Workflow | `[C]` Craft Detail

---

## HOOK 1 — ASSET-FIRST GENERATION (Phase 3 SCOUT + Phase 5 GENERATE)

**Principle:** Generate all visual/motion assets BEFORE writing a single line of code. The coding agent receives finished assets, not generation instructions.

### Insight: Google Whisk as North Star + Motion Engine `[T]`
Google Whisk accepts a subject image + text prompt and outputs cleaned reference images.
The "animate" button converts any Whisk still into a cinematic looping video.
- **Phase 3 SCOUT integration:** Whisk becomes an additional North Star generation engine alongside Nano Banana Pro, Grok Imagine, GPT Image 1.5, and Leonardo Kino XL.
- **Phase 5 GENERATE integration:** Whisk animate produces scroll-sequence source videos and background loops directly.

### Insight: Google Flow for Keyframe Interpolation `[T]`
Google Flow accepts a start frame + end frame and interpolates a smooth video transition between them.
- **Application:** Generate two stills (before/after states of a scroll transition), feed to Flow, receive interpolated motion. This is the most efficient path to scroll-tied sequences.
- **Phase 5 integration:** Add "Keyframe Interpolation" as a generation method alongside frame-by-frame and video extraction.

### Insight: Three Asset Categories `[C]`
Every generated asset falls into one of three optimization classes:
1. **Scroll-tied** → Convert to individual JPEG frames at 15fps (the sweet spot — smooth without bloat)
2. **Looping background** → Keep as MP4, autoplay + loop + muted in browser
3. **Static hero/reference** → Optimized image (WebP/AVIF)

**Agent-D (Artifacts) must classify every asset into one of these three categories before integration.**

### Engine Registry Update
| Engine | Type | Best For | Phase |
|--------|------|----------|-------|
| Nano Banana Pro | Image | Product shots, brand imagery | 3, 5 |
| Leonardo Kino XL | Image + Video | Blueprint workflows, product spins | 5 |
| Grok Imagine | Image | Conceptual, abstract | 3 |
| GPT Image 1.5 | Image | Photorealistic, editorial | 3, 5 |
| **Google Whisk** | Image → Video | Reference cleanup, cinematic loops | **3, 5** |
| **Google Flow** | Video (interpolation) | Scroll transitions, morphs | **5** |

---

## HOOK 2 — CONTEXT ENGINEERING (Phase 0 ORIENT + Phase 1 STUDY)

**Principle:** "Your coding agents are only as good as the instructions and assets you feed them." Generic prompts = generic output. Context injection = premium output.

### Insight: Discovery Interview Protocol `[W]`
Before any code, the architect agent conducts a 5-7 question structured interview:
1. **Data origin** — Where does content come from? (CMS, static, API, manual)
2. **Priority hierarchy** — What are the top 3 things a visitor must see/do?
3. **Interaction level** — Passive consumption vs. active engagement?
4. **Responsiveness requirements** — Mobile-first? Desktop-dominant? Parity?
5. **Competitive positioning** — What should this feel better than?
6. **Asset inventory** — What exists? What must be generated?
7. **Performance tier** — Speed-critical? Motion-heavy? Balanced?

**Phase 0 ORIENT integration:** Add Discovery Interview as a mandatory step between project type selection and Phase 1 entry. The interview output feeds directly into the Site DNA Profile.

### Insight: Universal Repository as Permanent Source of Truth `[P]`
Samir's "Universal AI Architect Repository" contains:
- `framework-rules.md` — Hard-locks tech stack
- `dashboard-patterns.md` — Encodes layout intelligence

**Iron Canvas equivalent:** This IS our skill architecture. The insight validates our approach — the skill repo itself is the universal repository. The difference: Iron Canvas also studies the existing site (competitors don't).

### Insight: Screen Recording as Phase 1 Input `[T]`
Video 3 uses a screen recording of the target site as source of truth — capturing motion timing, scroll behavior, and interaction patterns that screenshots miss.

**Phase 1 STUDY integration:** Add optional "Screen Recording Analysis" input type. When provided, extract:
- Scroll-to-animation timing relationships
- Transition durations and easing curves
- Interaction trigger points
- Content reveal sequences

---

## HOOK 3 — SCROLL SEQUENCE ARCHITECTURE (Phase 6 COMPOSE)

**Principle:** Scroll-tied animations require frame-level control. Videos can't be scrubbed by scroll position — individual frames can.

### Insight: Video-to-Frames Pipeline `[T]`
1. Generate source video (Whisk animate, Flow interpolation, or existing footage)
2. Extract frames using conversion tool at **15fps** (not 30fps — half the file count, visually identical on web)
3. Place frame sequences in `/public/sequences/` with numbered naming (`frame-001.jpg`, `frame-002.jpg`, etc.)
4. Canvas component draws frames tied to ScrollTrigger progress

**Phase 6 COMPOSE integration:** The scroll engine assembly must include:
```
FRAME EXTRACTION PROTOCOL:
1. Source video → ffmpeg or browser tool → JPEG frames at 15fps
2. Naming: {sequence-name}-{NNN}.jpg (zero-padded 3 digits)
3. Storage: /public/sequences/{sequence-name}/
4. Preloading: First 10 frames eager, remainder lazy
5. Canvas binding: GSAP ScrollTrigger → frame index = Math.floor(progress * totalFrames)
```

### Insight: Asset Pipeline Setup Before Code `[W]`
"Before we write even a single line of code, we need to set up our asset pipeline. The AI can't build a website if it can't find the files."

**Agent-A (Foundation) integration:** Before scaffolding HTML/CSS, Agent-A must:
1. Verify all generated assets exist in `/public/`
2. Confirm sequence folders are numbered correctly
3. Validate video files have correct codec/format for web
4. Create asset manifest JSON listing all resources and their categories

---

## HOOK 4 — BRAND PERSONALITY TO MOTION MAPPING (Phase 2 FEEL)

**Principle:** Motion choices aren't arbitrary — they derive from brand identity scores.

### Insight: Aesthetic-Driven Asset Selection `[P]`
Samir's retro build (Video 1) demonstrates how a single Pinterest reference image drives ALL downstream decisions:
- Color palette (deep space blacks, pixel greens, CRT amber)
- Motion type (scan lines, matrix rain, oscilloscope waves)
- Typography (monospace terminal fonts)
- Interaction style (command-line inputs, boot sequences)

**Phase 2 FEEL integration:** The Brand Personality Matrix already scores 6 axes. Add explicit mapping:

| BPM Score Range | Asset Generation Style |
|----------------|----------------------|
| Bold 8-10 + Avant-garde 8-10 | Custom 3D, WebGL, Whisk cinematic loops |
| Bold 5-7 + Refined 6-10 | Flow interpolation, subtle parallax frames |
| Bold 1-4 + Classic 7-10 | Static hero images, minimal motion |
| Playful 7-10 | Animated illustrations, GIF-style loops |
| Serious 8-10 + Technical 7-10 | Data visualization, clean transitions |

### Insight: "Scaling the Aesthetic" `[C]`
A great hero section isn't enough — the entire site must breathe the same DNA. Every section gets its own contextual background asset:
- System stats → oscilloscope waveform loop
- Testimonials → matrix code rain loop
- Footer → seamless globe rotation

**Agent-D must generate section-specific background assets, not just hero assets.**

---

## HOOK 5 — MULTI-AGENT ORCHESTRATION PATTERNS (SWARM + MISSION modes)

**Principle:** "We stopped trying to get one model to do everything. Instead, we orchestrated a team of specialized AI tools."

### Insight: Tool Specialization Chain `[W]`
Samir's pipeline assigns one tool per job:
- **Whisk** → Visual generation (stills + animation)
- **Flow** → Motion interpolation (frame-to-frame)
- **Gemini 3 Pro** → Architecture and blueprint generation (massive context window)
- **Antigravity** → Code execution and scaffolding
- **TestSprite** → Autonomous QA via MCP

**Iron Canvas mapping:**
| Samir's Role | Iron Canvas Agent | Phase |
|-------------|------------------|-------|
| Whisk/Flow (asset gen) | Agent-D (Artifacts) | 3, 5 |
| Gemini (architect) | Orchestrator | 0-3.9 |
| Antigravity (builder) | Agents A-C (Foundation, Motion, UI) | 4-6 |
| TestSprite (QA) | Agent-E (QA) | 7 |

### Insight: Blueprint-Then-Build Pattern `[W]`
Video 3's workflow: Screen recording → AI Studio generates comprehensive blueprint → Blueprint handed to coding IDE → IDE follows blueprint exactly.

**This IS Phase 3.9 (Design PRD Packaging).** Validates that the PRD step is non-optional. The blueprint must be complete before any agent writes code.

### Insight: Autonomous QA Agent `[T]`
TestSprite runs as an MCP server inside the editor:
1. Receives the PRD as test context
2. Auto-generates test cases from requirements
3. Runs 13+ test cases in parallel
4. Produces a detailed test report with videos, error codes, and fix suggestions
5. Fix suggestions are fed back to the coding agent

**Agent-E (QA) integration:** Add MCP-based QA tooling as an optional execution path in Phase 7 REFINE. When available:
- Feed the Design PRD from Phase 3.9 as test context
- Run automated accessibility, performance, and visual regression tests
- Generate fix report → route back to relevant Build Agent

---

## HOOK 6 — PRD / BLUEPRINT GENERATION (Phase 3.9 PACKAGE)

**Principle:** The implementation plan IS the product specification. It defines React components, motion logic, framework configuration, and even copy — all before code.

### Insight: PRD Contents Must Include `[C]`
From Video 3's blueprint generation, a production PRD contains:
1. **Component inventory** — Every React component named and described
2. **Motion logic** — Which animations, what triggers, what easing
3. **Framework configuration** — Tailwind v4 config, Next.js settings
4. **Copy/content** — Actual text content, not lorem ipsum
5. **Asset manifest** — Every video, image sequence, and static asset with paths
6. **Layout grid** — Section order, spacing, responsive breakpoints

**Phase 3.9 template update:** Add "Asset Manifest" and "Framework Configuration" as required PRD sections. The current template covers components and motion but misses explicit asset paths and framework config.

### Insight: Context Window Exploitation `[P]`
Samir uses Google AI Studio with Gemini 3 Pro specifically for its massive context window — he feeds a full screen recording + master prompt simultaneously.

**Iron Canvas implication:** When generating the Design PRD in Phase 3.9, prefer models with large context windows. The PRD generation step should receive:
- All Phase 0-3 outputs (Site DNA, BPM, North Star, Validation Report)
- Screen recording or reference screenshots
- The skill's own phase documentation

---

## HOOK 7 — ANTI-PATTERNS + CRAFT WISDOM (references/anti-patterns.md)

**Principle:** "If you feed them generic prompts, you're going to get generic boring websites that look exactly like everyone else's."

### Anti-Pattern: One-Shot Prompting `[P]`
"Most people just open a coding editor and start typing 'build me a SaaS dashboard.' Then they keep prompting linearly — fixing errors, fighting linters, rewriting components, wondering why the UI keeps drifting."

**Iron Canvas already solves this** with the 8-phase pipeline. But this quote belongs in anti-patterns.md as the #1 warning.

### Anti-Pattern: Skipping Asset Pipeline `[T]`
"You can't just put video files directly onto a website. They're too heavy. But more importantly, you can't control their playback with the scroll bar."

**Add to anti-patterns.md:** Never hand raw video to a scroll engine. Always classify (scroll-tied → frames, looping → video, static → image) and optimize before integration.

### Anti-Pattern: Context Drift `[P]`
"That approach forces the AI to guess your stack, your layout logic, and your standards — and just keep guessing why your project is breaking."

**Add to anti-patterns.md:** Context drift is the #1 cause of UI drift in multi-turn agent sessions. The cure is persistent context injection (our skill repo) + discovery interview (Phase 0) + Design PRD (Phase 3.9).

### Craft Detail: Feature Discovery Post-Build `[C]`
After the initial build, Samir asks the agent "what other features can we add to make it more appealing?" and gets suggestions like sound design, custom cursor, micro-interactions — then implements them.

**Phase 7 REFINE integration:** Add "Enhancement Discovery" step where the QA agent suggests additive features based on the BPM scores and competitive analysis, beyond just bug fixes and performance tuning.

### Craft Detail: Post-Build Micro-Interaction Pass `[C]`
Sound design, custom cursors, and micro-interactions are added AFTER the main build, not during. This prevents scope creep during core development.

**Agent-C (UI) integration:** Micro-interactions are a dedicated post-build pass, not interleaved with component development. Agent-C runs two sweeps:
1. **Core pass:** Components, layout, responsive behavior
2. **Polish pass:** Cursor effects, hover states, sound design, loading transitions

---

*Video Integration Protocol — Iron Canvas v4.2*
*Source: Samir's Applied AI Engineering series (2026)*
*"Your coding agents are only as good as the instructions and the assets you feed them."*
