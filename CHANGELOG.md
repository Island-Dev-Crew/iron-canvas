# Changelog

## v6.0 — THE LIVING CANVAS (the soul restored, made executable) — 2026-09-24

**Theme:** The early Iron Canvas, for all its bugs, *felt* alive — *"Kinetic Energy — Everything
feels alive, intentional, moving."* By v5.2 the method was precise and mechanical: the lines that
carried the feeling lived in files SKILL.md never routed to, two archive overlays had silently
erased the v4.2.0 motion arsenal, and the restraint defaults (SOLO caps, "drop a register",
aliveness checks waived at R0) had quietly made stillness the safe answer. v6 restores the voice
inline, makes it executable, and guards it so it cannot be chopped again. Source studies:
a forensic soul-recovery report across every revision since `45dcc41`, a fusion study of the
Adaptive Design Intelligence and Immersive Landing Forge skills, frontier research (Claude
Design, Seedance 2.5, Blender, WebGPU, HyperFrames), and five frame-by-frame film breakdowns.

### Added — the voice and the floor
- **SKILL.md §0.1 THE VOICE** — the studio's own words, back on the main path: *"We don't
  vibe-code. We engineer beauty."*, the master blacksmith's studio, the five emotions,
  *"a feel brief is not a mood board — it's a lens"*, the stillness paragraph, *"whitespace is the
  breath between notes"*, *"every pixel earns its place … 2am on a dim screen"*, the surgeon, the
  detective, the three critics. Framed as the studio's voice, never a client's palette. CD3
  becomes **§0.2, the conscience** (all "§0" references still resolve).
- **The Living Rules** — (1) the **ALIVENESS FLOOR**: arrival · heartbeat · hand-feel · breath ·
  composed still, at every register and surface; (2) **write the score**; (3) **adjectives direct,
  evidence proves**; (4) one craft, every altitude.
- **VERIFY Axis 7 — Aliveness**, 6/6, never waived; recordings as evidence (first 5 s, a
  15-second slow scroll, reduced motion). The Final Sign-Off is now 7 axes.
- **The Feel Brief** (Phase 2): `lens`, the 3-second/after timeline, reference vibes as places,
  `sensory_keywords`, the **feel line** (3 adjectives · material · tempo), `subject_vocabulary`, a
  required **`kinetic_signature`** and the `signature` (mechanism sentence). GATE 2 fails on an
  empty kinetic signature. "Lifeless / mechanical" is the default anti-feeling of every project.
- **Discovery Interview Q8 — the mechanism.**
- **Anti-patterns #18 LIFELESS · #19 TWO CLOCKS · #20 FLAGGED BUT SHIPPED · #21 DEFAULTS AS
  DECISIONS · #22 UNREVIEWED INTERPOLATION** (registry 17 → 22).
- **Taste Doctrine #9 Nothing ships lifeless · #10 One clock, one signature.**

### Added — the executable parts
- **`runtime/`** — the **Score Runtime** (`canvas-score.js`): acts → shots → 17 verbs × 7
  personalities; full / reduced / static modes; kill switch; `window.__icScore`; `?score=debug`.
  `score.schema.json` (+ the motion-contract fields `stage · job · role · emotion · reduced ·
  fallback · signature`), `verbs.html` (the verb gallery), `camera-rail.js` (plays a
  Blender-baked camera rail by the score's progress). SKILL.md **§23**.
- **`engines/`** — the **Power Engines**: `detect.mjs`; Blender (`clay-camera` with a vertical-FOV
  camera, roll, per-segment easing, seeded handheld, baked per-frame `ic-camera-rail/2` samples, the
  move in words, a 21-still `sheet` gate and frame-count proof; `hero-object`; `turntable`;
  `matcap`); Seedance 2.5 (fal queue or ingest, cost printed first, clips measured never inferred);
  ElevenLabs audio; the **ledger** (select with a reason · re-hash verify · encode · promote with a
  provenance sidecar). Register gates: *a toggle says available, the register says appropriate.*
  The **twin camera**: Blender clay rail → Seedance `@Video1` → the same rail in WebGL. SKILL.md **§24**.
- **`studio/`** — **Iron Canvas Studio**: idea in → treatment, score, engine jobs, config and a
  paste-ready mission out; shows the aliveness floor per register. SKILL.md **§25**.
- **`scripts/`** — `ic-preflight.mjs` (feel brief + score + engine config in one pass, every
  violation with its JSON path); `ic-contract.mjs` (the build against its **design contract** —
  colours, faces, curves, durations, radius, shadow, borders, hard fails); `lint-skill.mjs`
  (paths · fences · voice anchors · version · the **loss guard**).
- **`showcase/origin.html`** — the first Iron Canvas page (March 2026), restored with its bugs fixed
  (reveal cascade, no-JS guard, visible dust, mobile keeps the orb, full reduced motion, seeded
  randomness, AA contrast), public-safe, zero libraries — plus `origin.contract.json`, which it passes.
- **`showcase/living-canvas/`** — the five-act WebGL scroll film; its score now lives in the page as
  data (`<script type="application/json" data-ic-score>`) and passes preflight with zero warnings.
- **`surfaces/film/PACK.md`** — Type **H** (experimental): launch films, motion graphics, promos,
  cut-downs, OG video — one film score (context · segments · beats) → code (HyperFrames), video
  (Seedance 2.5 / MiniMax via ingest) and Blender lanes; the camera vocabulary; measured presets;
  timing and sound laws; render gates.
- **References** — `motion-language.md` (the one motion vocabulary), `cinematic-score.md` (the
  score as motion contract; one score → site · film · shot list), `power-engines.md`,
  `direction-fusion.md` (Voice · World · Instrument; evidence classes).
- **Templates** — `scroll-capture.spec.ts` (Axis 7 evidence), `design-contract.json`.
- **PACKAGE 3.9b–d** — the Artifact Assessment Gate moves here from Phase 5 (engine jobs written
  before FORGE; ASSET FORGE 5a runs in parallel); preflight must pass; the design contract.
- **Phase 5 GENERATE** becomes the media tournament; **Phase 8** gains **PREMIERE** (the launch
  film cut from the same score, HyperFrames determinism contract, film craft numbers).

### Restored — the v4.2.0 material erased by the `0a06432` overlay (2026-06)
- `references/interaction-library.md` — **High-End Component Patterns** (Double-Bezel, Button-in-
  Button, Liquid Glass, Fluid Island nav, Eyebrow) and the **Creative Arsenal** (44 named patterns),
  now with a *min register* column.
- `references/motion-budget.md` — **React / Next.js Motion Rules**.
- `references/anti-patterns.md` — **Section II, design-level AI tells** (34 items restored in full,
  19 cross-referenced to CD3 / the Phase 7 gate; taste bans re-conditioned on the BPM as the source
  analysis intended).
- `references/grid-rhythm.md` — **Step 7 responsive hardening** (byte-identical to `d58bbd1`).
- `agent-prompts/agent-c-ui.md` — the v4.2.0 prompt (5-state mandate, high-end patterns) + a
  **Hand-feel** block from the original page; `agent-e-qa.md` — the adversarial stance (*"Finds what
  everyone else missed"*) and the Design Quality Gate; `orchestrator.md` — *"Your taste doctrine:
  Amplify what's already good. Never replace. Never impose."* + *"You are the keeper of the feel brief."*
- `surfaces/app-dashboard/PACK.md` — the **five Bento motion archetypes** (*"a 'perpetual state'
  that loops infinitely to keep the dashboard feeling alive"*), each with its reduced-motion state.
- `references/expertise-injection.md` — the lost best practices (*"Verify at Higher Abstraction"*,
  *"Don't Use Ralph Wiggum for Taste"*); SKILL.md — the full Golden Rule (*"Extract. Understand. Then
  enhance."*), the lineage line, the filled load choreography, the transition-as-feeling table, the
  per-section Emotion map (§7b), *"Generate for the context, not for the prompt"*, timing by
  emotional weight, *"a site with no images … is a FAILED run"*.
- Every restored block is recorded with its source revision and line range in the v6 pull request.

### Changed
- **Curve roles fixed** — the original page's calm expo-out (`0.16, 1, 0.3, 1`) is every arrival
  (`--ease-arrive`); the overshoot (`0.34, 1.56, 0.64, 1`) is only for micro-moves ≤ 0.25 s
  (`--ease-tick`). The inverted `--spring` / `--spring-slow` names are retired. One personality
  system (silk · tide · gravity · spark · snap · bloom · drift) binds the doctrine to the runtime.
- **CD3 Law 1** — *"When unsure, drop a register — never below the aliveness floor. Restraint is not
  stillness."* Law 3 gains the design plan before code; Law 4 a registry of named model defaults
  that grows every run; Law 5 *"no evidence without intent"*.
- **§22** — *"Evidence beats adjectives"* becomes **"Adjectives direct. Evidence proves."** — right
  about completion claims, wrong as a writing style.
- **DIS §17** — the floor is reserved before any cap (calc step 0); SOLO caps systems, never the
  floor; every dial gets its felt description back; a sound doctrine inside System 8.
- **Agent prompts** — Agent-B gains an intent block, performs the score, and decides reduced motion
  *before* Lenis is constructed (the `lenis` package); Agent-C takes the cursor tier from the DIS
  dial on fine pointers only; Agent-D generates for the context and runs ASSET FORGE; Agent-E
  collects the aliveness evidence.
- **North Star examples** span three different worlds instead of all hard-coding the studio's
  obsidian + gold + Outfit; `color-system.md`'s indigo-first examples are replaced by three
  contrasting derived palettes.
- **§13** — "DARK IS DEFAULT" becomes the *studio* default; client dashboards derive from DNA.
- `references/typography-system.md` — Step 0 rights gate + Step 2b specimen tournament; Inter /
  Space Grotesk only with a stated reason.
- `sub-skills/` — marked archival, superseded by SKILL.md §7b.

### Fixed
- Merge splices: the Phase 2 FEEL-profile JSON and the BPM map (buried inside a Phase 3 code block),
  the engine registry and keyframe method (inside the "AI engine selection" fence), Agent-B's tier
  block (inside Agent-C's CSS), Agent-C's two-sweep block (inside Agent-D's prompt), Agent-D's asset
  classification (under Agent-E's header), the conversion questions (inside the DNA JSON), the HDR
  note and the §18/§19 notes (between a rule and its title).
- The Taste Test T1–T7 fences, whose info strings swallowed Axes 4–5 into a code block.
- The undefined `BRAND_BOLD_SCORE` global; the `@keyframes data-pulse` CSS inside a `javascript`
  fence; GSAP ease names inside CSS transitions (invalid — the browser drops the declaration);
  `rgba(var(--accent-rgb), …)` vs space-separated mirrors (one convention: `rgb(var(--x-rgb) / α)`).
- Motion-budget GATE 3's contradiction with Anti-Pattern #7 (looping MP4 fine; scroll-tied never video).
- The Blender clay camera treated `fov` as horizontal while three.js reads vertical — the clay film
  would have been 1.78× tighter than the site; now vertical, baked per frame, and unit-tested.
- The Studio's R1 depth cap (0.35) now matches SKILL.md §17 (0.5).

### Removed / Relocated (the loss ledger — `scripts/lint-skill.mjs --against 49614ba` names every file below)
- **SKILL.md** — rewritten, not lost: the v4 invocation block (replaced by v6 invocations); the
  three North Star example prompts that hard-coded `#0a0e14` / `#c9a84c` / Outfit (replaced by three
  contrasting worlds); the PRD's `heroIn/textIn/spring/brand` easing placeholder (replaced by the
  personality system and the score); Agent-B's empty `runLoadSequence` stub and unconditional Lenis
  start (replaced by the filled choreography and a reduced-motion early return); the r128 Three.js
  injection lines about OrbitControls and CDN bundles (stale); `--spring` / `--spring-slow` /
  `--smooth` tokens (retired roles); "DARK IS DEFAULT … = Iron Canvas signature" (now the studio
  default); version strings v5.2 → v6.0. Every other flagged line is a reworded or re-fenced
  original whose content survives.
- **references/color-system.md** — the indigo (hue 260) worked examples in Steps 2–5 and the JSON
  sample: replaced by three derived palettes so no single example reads as the default.
- **phases/03-scout.md** — the free-form "reference collection" step: replaced by Direction Fusion
  (the "specific elements that feel premium" framing is kept); the Type A / C / D North Star
  templates that hard-coded the studio's OLED black, gold and Outfit (replaced by three contrasting
  worlds — Anti-Pattern #3).
- **phases/03.9-package.md** and **templates/design-prd.md** — the PRD template re-cut to SKILL.md
  §2 / §4 / §9–§11: the retired `--spring` / `--spring-slow` / `--smooth` tokens and v5 durations,
  the `heroIn … brand` easing object, the Locomotive / ScrollSmoother option, the flattened
  transition list and the "animations disabled" reduced-motion line removed; the Artifact Assessment
  Gate moved in from Phase 5.
- **phases/05-generate.md** — the Assessment Gate relocated to 3.9b (moved, not lost); a scrim
  hard-coded to the studio's `#0a0e14` replaced by a token.
- **references/design-intensity-scale.md** — the stale 8/8 · 6/8 · 3/8 mode table replaced by SKILL.md
  §17's 9/9 · 7/9 · 4/9; cursor tiers and drivers reconciled to the DIS dial; the JSON example,
  calculation steps and resolution order renumbered to match SKILL.md.
- **templates/invocation-templates.md** — v5.2 version strings and 6-axis wording; a dashboard North
  Star that imposed the studio palette on client work; `var(--spring)` in the quick-enhancement template.
- **phases/06-compose.md** — reworded, not lost: the Assessment Gate check (moved to 3.9b); the frame
  loader and text scrim hard-coded to the studio's `#0a0e14` / `#c9a84c` (now tokens); the commented
  `MOBILE_STEP` stub (replaced by the restored `FRAME_STEP` recipe); `ctx.scale(dpr, dpr)` (a HiDPI
  double-scale bug); the transition steps now carry ★v6 annotations (runtime equivalents, cleanup craft kept).
- **README.md** — condensed: the v5.2 / v4.3 / v4.2 banners folded into "Earlier releases" (their
  highlights kept verbatim), the per-file tree shortened to folders (the full annotated map lives in
  REPO_MAP.md), the v5.2 invocations replaced by v6 ones.
- **phases/03.5-validate.md**, **templates/technical-validation-report.md** — GSAP licence gates
  (SplitText, MorphSVG, DrawSVG): the whole toolset has been free since GSAP 3.13; replaced by font,
  media and paid-engine licensing checks.
- Not moved into this public repository on purpose: the unredacted original site, the Strategic
  Synthesis, and the first methodology (public-safe policy, v5.2). They remain in the private history.

---

## v5.2 — GAUNTLET-FORGED PREMIUM (the build method for R2–R4) — 2026-08-12

**Theme:** The premium tier stops one-shotting its most immersive work. At registers R2–R4,
the **generative** phases FORGE / IMMERSE / GENERATE run as a **gauntlet loop** — fan out N
candidates, shadow each with a **blind cross-family critic** scoring against a **falsifiable
bar**, loop until one clears, ship the survivor. The output you see is the winner of a fleet,
not the first draft. (COMPOSE(6) is deliberately excluded — it assembles the winners; it is
integration, not fan-out territory.) This wires IDC's `gauntlet-loop` island into Iron Canvas's
own parts — no new machinery.

### Added
- **references/gauntlet-loop.md** — the loop protocol, as a *wiring* of parts Iron Canvas
  already ships. The **register gate** (R0/R1 OFF — looping to "wow" a utilitarian tool is
  Anti-Pattern #17; R2 scoped, R3 on, R4 mandatory). The **three slots** filled with Iron
  Canvas's own machinery: Task = the Design PRD artifact; Build method = fan-out via
  `worktree-fleet`, one builder per candidate, shadowed by a `cross-family-review` blind
  critic; Bar = the immersion scorecard ≥ 4.0 + a **North Star reference-peg screenshot diff**
  + the pack §5 VERIFY + 6-axis (Axis 6 = CD3) + Playwright evidence. The **two hard edits**
  (falsifiable bar; never start cold — the loop runs only after Phases 0–3.9 make the PRD +
  North Star). Round cap 3, fleet width R2=2/R3=3/R4=3–4 (enforced vs advisory stated).
  Graduation: **gauntlet for wow, Phase-7 VERIFY for proof.** Matt Schumer credit + Anthropic
  evaluator-optimizer lineage carried in.

### Changed
- **phases/04-forge.md** — FORGE now runs as the gauntlet loop at R2–R4 on the general
  (non-game) path: a preamble fans out N candidate directions for the signature surfaces
  (hero, key sections, component/motion grammar), blind-critic'd against the pack §5 VERIFY +
  6-axis + North Star diff. OFF at R0/R1. Closes the "doctrine names FORGE but nothing wires
  it" gap the pre-merge gauntlet caught.
- **phases/04.5-immerse.md** — IMMERSE now runs as the gauntlet loop at R2–R4: a preamble
  after `## Steps`, and step 6 rewritten from "Score and iterate" → "Gauntlet: blind-critic
  selection loop" (fan out, blind-critic vs the bar + North Star diff, loop/kill/reseed, ship
  winner, then still pass Phase 7 VERIFY).
- **surfaces/immersive-3d/PACK.md** — the 4.5 IMMERSE core phase is a gauntlet loop (R4 =
  mandatory); the world you ship is the survivor of a fleet.
- **surfaces/game-realtime/PACK.md** — FORGE (HUD grammar + game-feel) and the title-screen
  IMMERSE moment gauntlet-forged at R3/R4 against the game-feel bar (juice envelopes, ≤ 8ms
  HUD latency, colorblind + photosensitivity gates, North Star diff).
- **phases/05-generate.md** — signature artifacts the Assessment Gate greenlights are fan-out
  gauntleted at R2–R4 (OFF at R0/R1).
- **SKILL.md** — frontmatter v5.1 → **v5.2**, body banner + FINAL SIGN-OFF box banner bumped
  to v5.2, a v5.2 doctrine note (scoped to the generative phases; COMPOSE excluded); IMMERSIVE
  MODE body block declares the gauntlet build method and its fleet widths.
- **ROUTING.md** — `references/gauntlet-loop.md` added to the FILE → PURPOSE map and the
  REFERENCE LOADING RULES (load at ORIENT when register ≥ R2, then before Phase 4/4.5/5).
- **REPO_MAP.md** — `references/gauntlet-loop.md` added to the file tree + reference index.

### Register-gated (the discipline)
- The gauntlet is **the throttle's high end**, not a default. It is OFF at R0/R1 by law —
  running it there is itself a VERIFY Axis 6 failure. Restraint is still the deliverable where
  the treatment calls for it.

---

## v5.1 — CLAUDE DESIGN 3 (the Treatment Doctrine + soul) — 2026-08-11

**Theme:** A governing design doctrine infused into the heart — above the DIS and Depth
Language. Iron Canvas now calibrates the *treatment*, not just the *amount* of design;
one craft across a high-dynamic-range span, every choice grounded in the subject.

### Added
- **references/claude-design-3.md** — the CD3 doctrine (the soul, made law). Five laws:
  (1) calibrate the treatment not whether to design — the **Treatment Register R0–R4**,
  the system's high-dynamic-range axis; (2) ground it in the subject (soul); (3) the
  non-negotiable fundamentals every register (typography/neutrals/both-themes/layout/
  boldness/UI-is-information-design); (4) the anti-slop canon; (5) how CD3 composes with
  DIS/BPM/Depth without duplication. Includes VERIFY Axis 6 (Treatment & Soul).
- **SKILL.md §0 — Claude Design 3, The Treatment Doctrine** — inline at the heart (before
  the pipeline), with the R0–R4 register table; frontmatter declares v5.1.
- **DIS (references/design-intensity-scale.md)** — the **Treatment Register** as the
  ceiling-above-the-ceiling: `INTENSITY = f(Register cap, Mode ceiling, BPM)`. At R0 the
  nine systems sit near 0.0 *on purpose* — executed restraint, not stripped maximalism.
- **VERIFY Axis 6 — Treatment & Soul** (SKILL.md §10): register match, soul, anti-slop,
  copy-carries, both-themes, one-unforgettable-thing; hard-fails block ship. Sign-off box
  now records the register and Axis 6.
- **Anti-Patterns #16 (Slop Tells)** + **#17 (Register Mismatch)** — the anti-slop canon
  and the over/under-produced-for-the-task failure, as VERIFY-blocking vetoes.
- **ORIENT (phases/00-orient.md)** — `treatment_register` recorded in orient-decision.json.
- **ROUTING.md** — claude-design-3.md wired as the third entry-point read (governs all phases).

### Fixed (from a read-only integrity audit of the live v5.0 tree)
- Frame-rate contradiction: SKILL.md AGENT-D said "24fps (sweet spot)" while
  references/video-integration-protocol.md says 15fps — reconciled to 15fps across
  ALL call-sites (SKILL.md, ROUTING.md, phases/05-generate.md, references/expertise-injection.md;
  `grep fps=24` now returns zero).
- Unbalanced code fence in agent-prompts/agent-d-artifacts.md (the "NEW DELIVERABLES"
  block ran to EOF unclosed) — closed.
- The FINAL SIGN-OFF: v5.0 shipped TWO adjacent sign-off boxes; the stale "IRON CANVAS
  v4.2" 5-axis card was **removed** and a single canonical v5.1 6-axis box (register +
  Axes 1–6) is the only scorecard. SKILL.md frontmatter `version` bumped 5.0 → 5.1.

### Hardened across THREE blind-critic gauntlet rounds (the seams the doctrine polices)
The CD3 infusion was itself gauntleted three times (3 lenses each). Each round returned
mergeable:false and caught real seams — every one fixed, none laundered. The convergence:
- **Round 1** — the register was declared "the outermost cap on the whole DIS" but absent from
  the external DIS/Depth resolution orders → wired in.
- **Round 2** — SKILL.md's OWN inline §17 DIS engine still didn't apply the register (a
  self-containment regression against the reconciliation law), and sub-skills/04-VERIFY.md had
  been HOLLOW-RELABELED (6-axis header, 5-axis body) → register ported into §17's formula +
  algorithm + resolution order; a real executable Axis 6 added to 04-VERIFY's body/scorecard/remediation.
- **Round 3** (the deepest) — Awwwards VERIFY Axes 1–3 were never register-relativized, so a
  correctly-restrained R0 output would FAIL "must surprise / keep scrolling / Dribbble-ready" and
  the any-axis-fail routing would push it back toward the over-production CD3 forbids → Axes 1–5
  are now read AT the register (waived at R0, softened at R1; full strength R2–R4) in both VERIFY
  entry points; the DIS calc loop reconciled to 9 systems so the register clamps Depth too;
  agent-e-qa given Axis 6 / treatment_register awareness; the register↔pre-existing-caps
  redundancy question answered (they compose via min()); DIS H1/§17-subtitle/ROUTING-outputs
  labels + lineage refs brought current.
The specific fixes below (from the read-only audit + rounds 1–3):
- **Register wired into the generative math** (the headline seam): it was declared "the
  outermost cap on the whole DIS" but was absent from the resolution orders and the DIS
  algorithm — so a `bold≥6` BPM depth floor (0.4) could resolve above an R0 cap (0.2).
  Added the Treatment Register cap as the final clamp in the DIS resolution order + DIS
  Calculation Algorithm + the Depth Language resolution order. It is now a generative
  constraint, not only a reactive VERIFY check.
- **Axis 6 threaded into the leaf VERIFY** (phases/07-refine.md) and made non-optional for
  every surface pack via SURFACE-PACK-CONTRACT — the R0/R1 dashboard path can no longer
  verify without it. The pre-existing anti-slop audit and the CD3 canon are now one gate.
- **ORIENT now gates the register**: a Phase 0 completion-criteria item requires
  `treatment_register` be set (it was recorded in JSON but never gated).
- **Axis 6 remediation routes** added (register-fail → re-ORIENT; soul/anti-slop → re-STUDY).
- Stale "5-axis" labels → "6-axis" across SKILL.md (COMPOSE diagram, pipeline, REFINE
  loop-exit) and ROUTING.md; register table columns clarified as CAP (not floor); the
  bare `[anti-patterns.md]` link given a real target.

### Noted, not changed
- references/composition.md and references/visual-rhythm.md are referenced from
  an internal planning doc but honestly labeled "(to be created from videos)" — roadmap
  markers, not dangling pointers. Left as-is (not fabricated).

## v5.0 — SURFACES (final) — 2026-07-01

**Theme:** The final assembly. All four surface packs shipped, v4.3's IMMERSIVE mode
reconciled into the Depth Language as its evidence-gated execution lane, and the live
depth demo proving the whole grammar in one scrollable page.

### Added
- **surfaces/immersive-3d/PACK.md** — Type A-world (sustained Tier III). World grammar
  (ONE material: SDF/voxel/point-cloud/PBR, chosen from brand substance), world tokens,
  camera-rail spec (stations → Catmull-Rom spline, BPM-conditioned glides), loader protocol
  (the loader is a brand moment, not an apology), Agent F as the world agent, §22 evidence
  gate at full strength (fallback ladder PROVEN with WebGL disabled). Dispatch test:
  "if WebGL died, is what remains a website or a transcript?"
- **surfaces/game-realtime/PACK.md** (EXPERIMENTAL) — Type G game frontends. The diegetic
  decision (non-diegetic/spatial/diegetic/mixed by BPM), HUD grammar (safe areas, anchor
  logic, ≤ 8ms latency, input-agnostic focus chains), game-feel timing (juice envelopes,
  photosensitivity hard envelope), game-grade verify (colorblind sims, aspect-ratio proofs,
  UI ≤ 2ms/frame co-resident budget).
- **surfaces/game-realtime/UNREAL-ADAPTER.md** — the Unreal MCP adapter SPEC: full mapping
  table (tokens → Material Parameter Collections, motion → UMG animations, §19 seeds →
  Niagara, camera rails → Sequencer, kill switch → CVar), MCP command flow, hard rules
  (PRD-downstream only; seeds survive translation; never gates the core). Experimental by
  design — community MCP tooling re-evaluated per project at Phase 3.5.
- **showcase/depth.html** — the live Depth Language demo. Standalone, no-build (Three.js
  via CDN import map). Scroll IS the dial: composed bento with grammar-ratio parallax →
  staged seeded point-emblem in a window → inhabited camera-rail world with palette-locked
  espresso fog. Obeys every rule it demonstrates: mulberry32 seed 5417, DPR cap 2, IO
  lazy-init + pause, reduced-motion static frames, no-WebGL fallback ladder, DOM-first text,
  one light direction across all three tiers. Browser-verified: zero console errors, zero
  horizontal overflow, dial/tier/world transitions proven at every station.
- **SKILL.md §22 (Immersive Mode — The Evidence Gate)** — inline. v4.3's Agent F + Phase 4.5
  + scorecard reconciled with v5.0: the lane now AUTO-SELECTS at depth_language ≥ 0.4
  (computed from BPM, not vibes). The gate IS §20's fallback-ladder rule, proven in a browser.

### Changed
- v4.3 (merged from main mid-cycle via PR #2) reconciled: its appended "SECTION 20" renumbered
  to §22 and rewritten to integrate with Depth Language; `three_js_allowed` heuristics map to
  depth intensity; IMMERSIVE mode description updated in frontmatter + pipeline diagram.
- Surface registry complete: web + app-dashboard + immersive-3d STABLE, game-realtime EXPERIMENTAL.
- Phase 0: Type G added; Type A world-dispatch rule ("website or transcript?" test);
  surface_pack enum covers all four packs.
- QUICK_REFERENCE: routing table rebuilt around packs + depth ceilings.
- Version cohesion: SKILL.md frontmatter 5.0, all core docs bumped v5.0.

### Preserved
- v4.3's evidence doctrine, verbatim: one unforgettable moment; WebGL as progressive
  enhancement; premium is a score, not a vibe claim.
- The complete v4.2 web pipeline; SKILL.md self-containment (2560+ lines, §20/§21/§22 inline).
- Staging-first production protocol.

---

## v5.0-alpha — Surfaces: Core + Packs + Depth Language — 2026-07-01

**Theme:** Iron Canvas beyond websites. One design-quality core dispatched across surface
packs, with depth promoted from a YES/NO binary to the 9th DIS system — a z-axis grammar
that scales from a dashboard's composed shadows to an igloo.inc-tier inhabited world.

### Added
- **surfaces/SURFACE-PACK-CONTRACT.md** — the pack interface: 7 required blocks (identity,
  phase overrides, DIS profile, depth profile, verify profile, North Star sets, artifacts
  delta), the registry, and the dispatch rule (SKILL.md + ROUTING.md + exactly ONE pack).
- **surfaces/web/PACK.md** — the flagship declared: body = SKILL.md itself, zero overrides.
- **surfaces/app-dashboard/PACK.md** — Type C rebuilt as first-class: density scale
  (COMFORTABLE/DENSE/COMPACT), app shell grammar (nav rail, top bar, ⌘K command palette,
  panel plane), data-motion grammar (8 patterns, each answering "what changed?"), state
  choreography (loading/empty/error/success as designed moments), sanctioned Tier II data
  centerpiece, and an app-native verify profile (INP < 200ms, 60fps panels — not Lighthouse-first).
  Supersedes §13 Dashboard Addendum as primary Type C authority (principles upheld + incorporated).
- **references/depth-language.md** — DIS System 9. Three altitudes: COMPOSED (0.1–0.35,
  CSS-only), STAGED (0.4–0.7, one Three.js scene as a window), INHABITED (0.75–1.0, the
  scene IS the site — camera rail, one world material, fog as brand). Z-axis grammar
  (NEAR/MID/FAR/ATMOSPHERE bands with fixed ratios), BPM-conditioned camera choreography,
  engine registry (CSS → GSAP → Three.js → R3F+drei → GLSL SDF / WebGPU+TSL), performance
  gates with mandatory fallback ladder (III→II→I, never to flat).
- **SKILL.md §20 (Depth Language) + §21 (Surface Packs)** — full inline (self-containment law).

### Changed
- DIS: 8 → 9 systems. Mode ceilings now 9/9 (MISSION) · 7/9 (SWARM) · 4/9 (SOLO). Depth is
  never OFF — every project carries ≥ 0.1 composed depth. The floor is never flat.
- DIS resolution order gains "surface pack caps" (between Performance Tier and BPM suppression).
- Anti-patterns: 14 → 15 (#15 Depth Theater — 3D bolted on for flash; torus knots, anywhere, ever).
- Phase 0 orient: type table gains Surface Pack + Depth Ceiling columns; orient-decision.json
  gains `surface_pack` + `depth_intensity_hint`; `three_js_eligible` RETIRED (depth is a dial).
- SKILL.md §17 numbering collision fixed (Production Branching Protocol → §16b; DIS keeps §17).
- ROUTING.md: surface dispatch at Phase 0; depth-language routes at Phases 2/4; pack verify
  profiles replace the web battery at Phase 7 on non-web surfaces.
- feel-profile.json `motion.three_js` superseded by `design_intensity.systems.depth_language`
  (kept for backward compatibility, derived as intensity ≥ 0.4).

### Preserved
- SKILL.md self-containment (2400+ lines — §20/§21 added inline, nothing extracted).
- The complete v4.2 web pipeline — zero behavior change for Types A/B/D/E/F.
- § DASHBOARD ADDENDUM principles (DENSITY IS DESIGN, MOTION IS FUNCTIONAL) — upheld and
  extended, never waived.
- DNA-first philosophy + HDR range: packs are a lens, not a fork; both extremes stay first-class.
- Staging-first production protocol.

### Planned (v5.0-beta)
- surfaces/immersive-3d/ — sustained Tier III work as its own pack + showcase depth demo.
- surfaces/game-realtime/ — diegetic HUD principles + Unreal MCP adapter spec (EXPERIMENTAL).

---

## v4.3 — IMMERSIVE Mode + Agent F Evidence Gate

**Theme:** Add a browser-verified immersive quality lane for flagship WebGL/3D/signature-motion work. IMMERSIVE is layered on SWARM/MISSION only when brand DNA and performance tier justify it.

### Added
- `IMMERSIVE_MODE.md` — selection rules, pipeline insertion, acceptance gate, and doctrine.
- `phases/04.5-immerse.md` — new IMMERSE phase between FORGE and GENERATE.
- `agent-prompts/agent-f-immersion.md` — Agent F owns WebGL/3D, fallback ladder, tuning, and evidence harness.
- `references/webgl-immersion.md` — R3F/Three/WebGL implementation and degradation patterns.
- `references/evidence-qa.md` — screenshot, console, mobile, reduced-motion, and fallback evidence protocol.
- `templates/immersion-scorecard.md` — ≥4.0 average / zero auto-fail score gate.
- `templates/playwright.config.ts` and `templates/smoke.spec.ts` — portable evidence harness starter.

### Changed
- README, QUICK_REFERENCE, ROUTING, REPO_MAP, and SKILL now route IMMERSIVE projects to Agent F and Phase 4.5.
- Pipeline now supports: A/B/C/D build agents + optional F(Immersion) before E(QA).

### Preserved
- DNA-first rule, Discovery Interview, Phase 5/6 mandatory routing, and self-contained SKILL.md principle.

---

## v4.2 — Design Language Foundation + Code-Driven Assets

**Theme:** Establish a design-language ceiling that scales intelligently by mode + brand DNA,
and add deterministic code-driven asset generation alongside AI imagery.

### Added
- **references/design-intensity-scale.md** — DIS: 8 design systems, each dialed 0.0–1.0.
  Mode sets ceiling (MISSION 8/8@1.0 · SWARM 6/8@0.7 · SOLO 3/8@0.4); BPM sets floor + overrides.
  feel-profile.json gains a `design_intensity` block computed at Phase 2.
- **references/code-driven-assets.md** — fourth asset class. SVG, Remotion, Hyperframes.
  Decision gate: organic→AI, designed→code. OG video extends mandatory OG image.
- **references/algorithmic-art.md** — generative sub-class: flow fields, particles, noise
  gradients, geometric tiling, attractors. Seeded, original, brand-palette, perf-gated.
- **showcase/iron-canvas-showcase.jsx** — live-animated repo about-page. Demonstrates the
  design language scaling + 4 live code-driven SVG demos (mark draw, morph, motion bars, hypergrid).
- **SKILL.md §17 (DIS), §18 (Code-Driven), §19 (Algorithmic Art)** — full inline (self-containment rule).
- **references/color-system.md — Palette Derivation Protocol** ★v4.2: codifies how Phase 2 derives
  the oklch palette from brand DNA + extracted colors (the warm-adaptation mechanism proven in the
  smoke test). Includes BPM→palette mapping table, dark/light base rules, worked example, algorithm.
  Hard rule: NO default palette — generic violet/blue is Anti-Pattern #5.
- **showcase re-skinned to warm espresso/gold** as IDC house identity (was purple/violet).

### Changed
- Asset Classification Taxonomy: 3 → 4 classes (added CODE-DRIVEN).
- Anti-patterns: 11 → 14 (#12 Intensity Mismatch, #13 Code-vs-AI Misrouting, #14 Generative-for-its-own-sake).
- Engine registry (model-selection.md): added 6 code-driven engines.
- Agents B/C/D/E + Orchestrator: wired to read `design_intensity` and route code-driven assets.
- Orchestrator: new DIS compute step after Phase 2 FEEL.
- All 30 files version-bumped v4.1 → v4.2.

### Preserved
- SKILL.md self-containment (no routing-pointer regression — the v4 bug stays fixed).
- DNA-first philosophy: the ceiling is the same for every project; the site's DNA decides how high to climb.
- Phase 5/6 mandatory routing; staging-first protocol; Brand Personality Matrix as control surface.


---

## v4.2.0 — 2026-03-22

### Major: Self-Contained SKILL.md Reconciliation + Version Cohesion

v4.0 SKILL.md had replaced 784 lines of inline content with routing pointers
("see phases/03.5-validate.md"), reducing the file from 67K to 40K. This caused
agents to fall back to v3 behavior because they received less than half the
instruction when reading only SKILL.md.

v4.2 fixes this by merging the complete v3 inline content with all v4 additions,
producing an 88K self-contained SKILL.md (2,100+ lines). External files supplement
depth — they don't replace core content.

#### SKILL.md Reconciliation
- Full v3 inline content RESTORED (agent prompts, validation checklists, PRD template,
  5-axis audit, Dashboard Addendum, expertise injection blocks)
- All v4 additions PRESERVED on top (Discovery Interview, Whisk/Flow, asset classification,
  autonomy protocol, Two-Sweep, Enhancement Discovery, Phase 8, 11 anti-patterns)
- Net result: 88K / 2,100+ lines (v3 was 67K, v4 was 40K)

#### Version Cohesion
- ALL files across the repository now reference v4.2 consistently
- README.md fully rewritten for v4.2 architecture
- REPO_MAP.md reflects actual current state (55 files across 6 folders)
- QUICK_REFERENCE.md updated with v4.2 pipeline, engines, and anti-patterns
- Every reference file, template, agent prompt, and phase file version-bumped
- Invocation templates updated from v3 → v4.2

#### Agent Autonomy + Persistence Policy (from earlier v4 session)
- `references/agent-autonomy.md` — 3-tier system (Supervised/Guided/Autonomous)
- Persistence policy with retry budgets per complexity class
- Dead End protocol for genuinely impossible dependencies
- Stack scanning at every phase start

## v4.0.0 — 2026-03-20

### Major: Video Integration + Full v3.1 Wiring + New Asset Engines

Iron Canvas v4 integrates insights from Samir's Applied AI Engineering series,
wires all v3.1 gap-closure reference files into SKILL.md, and adds two new
asset generation engines (Google Whisk + Google Flow).

#### Video Integration (from Samir's 3-video series)
- **Google Whisk** added to Phase 3 SCOUT + Phase 5 GENERATE engine registry
  - Subject image → prompt → cleaned reference → animate → cinematic video loop
- **Google Flow** added to Phase 5 GENERATE for keyframe interpolation
  - Start frame + end frame → interpolated motion video (scroll sequence source)
- **Asset Classification Taxonomy** — every generated asset categorized as:
  - Scroll-tied → extract to JPEG frames at 15fps
  - Looping background → keep as MP4 with autoplay/loop/muted
  - Static → optimized image (WebP/AVIF)
- **Discovery Interview Protocol** added to Phase 0 ORIENT
  - 5-7 structured questions before any code (data origin, priority hierarchy,
    interaction level, responsiveness, competitive positioning, asset inventory,
    performance tier)
- **Screen Recording as Phase 1 Input** — optional input type capturing motion
  timing, scroll behavior, and interaction patterns that screenshots miss
- **Two-Sweep UI Pattern** for Agent-C:
  - Core pass: components, layout, responsive behavior
  - Polish pass: cursor effects, hover states, sound design, loading transitions
- **Enhancement Discovery** added to Phase 7 REFINE — Agent-E suggests additive
  features based on BPM scores and competitive analysis beyond bug fixes
- **BPM-to-Asset-Style Mapping** — Brand Personality Matrix now directly maps to
  asset generation approach (Whisk cinematic vs Flow interpolation vs static)
- 3 new anti-patterns: #9 One-Shot Prompting, #10 Skipping Asset Pipeline,
  #11 Context Drift
- 2 new craft details: Feature Discovery Post-Build, Post-Build Micro-Interaction Pass
- **Agent Autonomy + Self-Provisioning Protocol** (`references/agent-autonomy.md`):
  3-tier system (Supervised / Guided / Autonomous) governing how agents handle
  missing tools, accounts, and API access. Includes stack scanning, dependency
  evaluation, provisioning log, self-improving stack capabilities, and a
  **persistence policy** with retry budgets per complexity class (Simple 3-5,
  Moderate 3-15, Complex 3-unlimited), escalation/reroute protocols, and
  Dead End declaration for genuinely impossible dependencies.

#### v3.1 Reference Wiring (Gap Closure)
All 10 reference files from the v3 planning pass now wired into SKILL.md:
- `references/typography-system.md` → Phase 2 FEEL output (type_personality field)
- `references/color-system.md` → Phase 2 FEEL output (oklch palette field)
- `references/motion-budget.md` → Phase 2 FEEL output (motion tier field)
- `references/grid-rhythm.md` → Phase 4 FORGE (Agent-A spatial system)
- `references/performance-budget.md` → Phase 0 ORIENT output (performance tier)
- `references/interaction-library.md` → Phase 4/6 (Agent-C state library)
- `references/seo-conversion.md` → Phase 1 + Phase 5 + Phase 7 (OG image + conversion)
- `phases/08-handoff.md` → Pipeline routing in SKILL.md (optional final phase)
- `references/video-integration-protocol.md` → 7 hooks fully populated from transcripts

#### Updated Files (v4)
- `SKILL.md` — Complete v4 rewrite with all wiring + video integration
- `ROUTING.md` — v4 engine registry, Discovery Interview routing, asset taxonomy
- `phases/00-orient.md` — Discovery Interview + performance tier
- `phases/01-study.md` — Screen recording input type
- `phases/02-feel.md` — Typography/color/motion profile output sections
- `phases/03-scout.md` — Whisk + Flow in engine registry
- `phases/05-generate.md` — Keyframe interpolation, asset classification, OG image always
- `phases/06-compose.md` — 15fps frame extraction protocol, asset pipeline verification
- `agent-prompts/orchestrator.md` — Discovery Interview dispatch
- `agent-prompts/agent-c-ui.md` — Two-sweep pattern
- `agent-prompts/agent-d-artifacts.md` — Asset classification + Whisk/Flow
- `agent-prompts/agent-e-qa.md` — Enhancement Discovery + MCP QA path
- `templates/design-prd.md` — Asset Manifest + Framework Config sections
- `templates/invocation-templates.md` — v4 invocation syntax
- `references/anti-patterns.md` — 3 new anti-patterns
- `references/model-selection.md` — Whisk + Flow added
- `references/video-integration-protocol.md` — 7 hooks populated from transcripts

---

## v3.0.0 — 2026-03-19

### Major: Multi-Agent Orchestration System

Iron Canvas is now a full multi-agent design orchestration system, not just a sequential methodology.

#### New Architecture
- **Three execution modes:** SOLO (1 agent sequential), SWARM (parallel build agents), MISSION (full 8-agent team)
- **Phase 3.5 — Cross-LLM Technical Validation:** Dedicated validation agent verifies every planned feature for technical feasibility before any build agent executes. Prevents architecture failures discovered mid-build.
- **Phase 3.9 — Design PRD Packaging:** Orchestrator converts all research into one unified Design PRD consumed by all parallel build agents simultaneously
- **5 specialized Build Agents** with individual system prompts and clearly defined non-overlapping domains (Foundation, Motion, UI/UX, Artifacts, QA)
- **Orchestrator Agent:** New governing role — runs Phases 0-3.9, dispatches PRD, reviews outputs, never writes implementation code directly

#### New Phases
- `00-orient.md` — Project classification and execution mode selection
- `03.5-validate.md` — Cross-LLM technical validation (from Antigravity prompt pattern)
- `03.9-package.md` — Design PRD packaging for agent dispatch

#### New Files
- `agent-prompts/` — Complete system prompts for all 6 agents (Orchestrator + A-E)
- `references/expertise-injection.md` — Domain expertise injection protocol for any API/library
- `templates/design-prd.md` — Complete Design PRD template
- `templates/technical-validation-report.md` — Validation report template

#### Enhanced
- Phase 3 SCOUT: Now generates a North Star image using Nano Banana Pro / Grok Imagine / GPT Image 1.5 as the single visual anchor before any code is written
- Phase 7 VERIFY: Now the full 5-axis Awwwards-grade audit (Design / Animation / Taste / Performance / Brand DNA) with numerical thresholds and exact remediation routing
- Dashboard Addendum: Expanded with bento grid system, glassmorphism card signatures, data animation patterns, and dashboard-specific North Star scout queries

---

## v2.0.0 — 2026-03-19

### Major: Animation Architecture + North Star System

Merged two lineages:
- Island Development Crew production pipeline
- Rigorous animation architecture (Brand Personality Matrix, GSAP taxonomy, Awwwards verification)

---

## v1.0.0 — 2026-03-19

### Initial Release
- Complete 7-phase methodology (STUDY → FEEL → COLLECT → FORGE → GENERATE → COMPOSE → REFINE)
- Production branching protocol (staging → production workflow)
- 8 documented anti-patterns
- Model selection guide
- Invocation templates

---

*Iron Canvas — Island Development Crew*

### v4.2 — standalone showcase twin
- Added `showcase/index.html`: pre-transpiled, no-build static about-page (React via CDN). Runs on GitHub Pages / any static host with no bundler.
- Added `showcase/build-standalone.cjs`: regenerates index.html from the JSX source of truth.
