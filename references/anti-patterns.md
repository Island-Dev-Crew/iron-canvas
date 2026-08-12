# Anti-Patterns — What Iron Canvas Must NEVER Do

> These are the mistakes that turn premium enhancement into generic destruction. Memorize them.

## The 17 Anti-Patterns (#1–11 v4 core · #12–15 v4.2/v5.0 · #16–17 CD3 v5.1)

### 1. Cookie-Cutter
**What it looks like:** All sites end up with the same palette, fonts, and layout.
**Why it happens:** Skipping Phase 1 (STUDY) and applying a default "nice-looking" template.
**How to prevent:** Complete the DNA Profile before touching anything. The palette comes FROM the site.

### 2. Blind Generation
**What it looks like:** AI-generated images that don't fit their container, clash with the palette, or float on mismatched backgrounds.
**Why it happens:** Generating images without studying where they'll go.
**How to prevent:** Complete the Pre-Generation Checklist in Phase 5. Screenshot the target section. Document the CSS context. THEN generate.

### 3. Template Imposition
**What it looks like:** Forcing navy/gold, dark mode, or any specific aesthetic regardless of the existing design.
**Why it happens:** Having a "taste" preference and applying it universally.
**How to prevent:** Phase 4 (FORGE) explicitly says: adapt to the site, never impose.

### 4. Batch-and-Pray
**What it looks like:** Generating all images at once, dropping them all in, hoping they work.
**Why it happens:** Time pressure, laziness, or overconfidence.
**How to prevent:** Phase 5 Generation Protocol: generate → preview → select → test in situ → iterate. One at a time.

### 5. Identity Erasure
**What it looks like:** The enhanced site is unrecognizable from the original. The owner says "that's not my brand."
**Why it happens:** Over-enhancing. Changing too many things at once. Losing sight of the original DNA.
**How to prevent:** Phase 7 checklist: "Is this recognizably the SAME site but better?" If not, pull back.

### 6. Trinket Dropping
**What it looks like:** Small AI-generated images scattered around that don't integrate with the page's CSS, gradients, or layout.
**Why it happens:** Treating image placement as "upload and done" instead of composing with CSS context.
**How to prevent:** Phase 6 (COMPOSE) — every image must be verified in context with screenshot proof.

### 7. Video-as-Animation
**What it looks like:** Playing an MP4 video where a scroll-driven canvas animation should be.
**Why it happens:** Videos are easier to implement than canvas frame sequences.
**Why it's wrong:** Videos can't scrub with scroll, can't reverse, can't sync content overlays, have autoplay restrictions on mobile.
**How to prevent:** Use the scroll engine architecture from Phase 6. Canvas + frames + ScrollTrigger.

### 8. Frame Inconsistency
**What it looks like:** Scroll sequence frames with wildly different lighting, angles, materials, or styles. The "animation" looks like a slideshow of different photos.
**Why it happens:** Generating frames with different prompts or insufficient consistency constraints.
**How to prevent:** Use the Consistency Protocol from Phase 5: SAME base prompt, only vary the action/angle. Or use Keyframe Interpolation (v4): 2 stills → Google Flow → extract frames.

### 9. One-Shot Prompting ★v4
**What it looks like:** Opening a coding editor and typing "build me a SaaS dashboard" then prompting linearly, fixing errors, fighting linters, rewriting components, wondering why the UI keeps drifting.
**Why it happens:** Treating AI coding agents as junior developers who can guess your stack, layout logic, and standards.
**How to prevent:** Iron Canvas's entire pipeline. Discovery Interview (Phase 0) injects business logic. Design PRD (Phase 3.9) is the immutable source of truth. The skill repo IS persistent context that eliminates guessing.

### 10. Skipping Asset Pipeline ★v4
**What it looks like:** Dropping raw video files directly into the page as scroll-driven animation. Files are too heavy, can't control playback with scroll, performance collapses.
**Why it happens:** Not understanding the difference between looping background video and scroll-tied frame sequences.
**How to prevent:** EVERY asset gets classified: scroll-tied → frames at 15fps, looping background → autoplay video, static → optimized image. Never hand raw video to a scroll engine. Classify → optimize → THEN integrate.

### 11. Context Drift ★v4
**What it looks like:** AI agents guess your tech stack, design system, and business logic because you never defined the rules. Each prompt gets further from the original intent. UI drifts over time.
**Why it happens:** No persistent context injection. One-shot prompting without a source of truth.
**How to prevent:** The skill repo is the "universal repository." Discovery Interview captures intent. Design PRD locks in decisions. All agents reference the same tokens and the same PRD. Context drift is structurally impossible when the pipeline is followed.

## Red Flags During Work

If you notice any of these, STOP and reassess:

- 🚩 You haven't looked at the existing site's CSS yet
- 🚩 You're about to use a hex code that isn't in the DNA Profile
- 🚩 You're generating an image without knowing its exact container dimensions
- 🚩 You're applying the same technique you used on the last project
- 🚩 The enhanced version looks "better" but doesn't feel like the same brand
- 🚩 You're about to embed a `<video>` tag for a scroll-synced animation
- 🚩 Your scroll sequence frames were generated with different base prompts
- 🚩 You're prompting "fix the bug" instead of referencing the Design PRD ★v4
- 🚩 You dropped a video file directly into the page without classifying it ★v4
- 🚩 The agent is guessing your intent instead of reading the interview output ★v4

## Craft Wisdom (v4 — from Samir's Applied AI Engineering)

### Feature Discovery Post-Build
After the initial build is stable, ask the agent: "What other features can we add
to make this more appealing?" This often surfaces sound design, custom cursor
refinements, and micro-interactions that weren't in the original scope. These
get implemented in Agent-C's Polish Pass.

### Post-Build Micro-Interaction Pass
Sound design, custom cursors, and micro-interactions are added AFTER the main
build, not during. This prevents scope creep during core development. Agent-C
runs two sweeps: Core Pass (components, layout) → Polish Pass (cursor, hover,
sound, transitions).

---

## v4.2 ADDITIONS — Anti-Patterns #12–14

### 12. Intensity Mismatch ★v4.2
**Looks like:** Flash that ignores DNA — a law firm with particles + magnetic cursor at full blast, or a fashion brand left static in MISSION mode.
**Why:** Applying mode defaults without reading BPM, or BPM without mode caps.
**Prevent:** The Design Intensity Scale runs BOTH inputs (mode ceiling + BPM floor/override). If the result looks wrong, a BPM score is wrong — recheck before adjusting.
**Red flag:** aggregate_intensity > 0.7 with serious ≥ 8, or < 0.3 with bold ≥ 8.

### 13. Code-vs-AI Misrouting ★v4.2
**Looks like:** AI-generating a logo, icon, or data chart (fuzzy, inexact, wrong numbers, fixed resolution). Or faking photorealistic organic imagery with SVG/code (flat, synthetic).
**Why:** Reaching for one tool habitually instead of classifying the asset.
**Prevent:** Asset Classification asks first — photographic/organic → AI engine; designed/exact → code-driven. A product photo is AI; a logo is SVG; a chart is Remotion/SVG; a smoke transition is Flow; a geometric scroll morph is a Hyperframe.
**Red flag:** Generating a logo or chart with Nano Banana Pro.

### 14. Generative-for-its-own-sake ★v4.2
**Looks like:** Rainbow particle explosion on a law firm site. A flow field on a brand that scored minimal 9. Generative art bolted on for flash, not DNA.
**Why:** Treating algorithmic art as decoration rather than a DNA-driven choice.
**Prevent:** Generative art only activates when the BPM table fires AND design intensity ≥ 0.3, with a brand-conditioned palette. Must pass the "same site but better?" test.
**Red flag:** p5 rainbow defaults in production; generative hero on a Tier 1 page; generative system with minimal ≥ 8.

---

## v5.0 ADDITION — Anti-Pattern #15

### 15. Depth Theater ★v5.0
**Looks like:** A spinning torus knot behind a pricing table. A voxel world on a Tier 1 marketing page. Three different 3D metaphors on one site. Text baked into canvas. "We added Three.js" as the design story.
**Why:** Depth treated as a feature to bolt on instead of an altitude the DNA sets. The old `three_js_eligible: YES/NO` binary invited this — YES became "add 3D somewhere."
**Prevent:** Depth intensity comes out of the DIS calculation like every other system (System 9, `references/depth-language.md`). If the BPM doesn't unlock Tier II, there is no scene. If it unlocks Tier III, the world IS the design — not a garnish on a normal page.
**Red flag:** Default Three.js lighting/colors in production; depth > 0.4 with minimal ≥ 8; a canvas element containing rendered text; more than one `<canvas>` world per page; WebGL backdrop behind a data grid; torus knots, anywhere, ever.

---

## v5.1 ADDITIONS — Claude Design 3 (Anti-Patterns #16–17)

### 16. Slop Tells ★v5.1 — the anti-slop canon
**Looks like:** the handful of looks AI design defaults to when nothing was decided — warm cream (#F4F1EA) + serif display + terracotta accent sold as "editorial"; near-black with a lone acid-green/vermilion pop as the whole idea; Inter or Space Grotesk chosen as the "safe" face with no reason; emoji as section markers; everything centered; `rounded-lg` on everything; a purple→blue gradient hero on white; uniform radius/spacing/shadow with no hierarchy; decorative `01 / 02 / 03` markers on non-sequential content; shadcn/Tailwind defaults shipped as if finished.
**Why:** the model spends its freedom on a familiar default instead of the subject. It is the visual equivalent of lorem — placeholder taste.
**Prevent:** where the DNA/operator pins a direction (even one of these), it wins. Where nothing is pinned, **never spend the freedom on a default** — derive palette, type, and structure from the subject's own world (CD3 Law 2). Tripping the canon with nothing pinned = **VERIFY Axis 6 fail**.
**Red flag:** a design that would reskin cleanly onto any other brand; a font stack with no stated reason; structural markers that encode nothing true.

### 17. Register Mismatch ★v5.1 — wrong treatment for the task
**Looks like:** a maximal R3 spectacle on an internal admin tool; a scroll-jacked hero on a status dashboard; OR the inverse — a flat, unconsidered R0 treatment on a flagship brand page that needed a point of view. Effort aimed at the wrong altitude.
**Why:** treating "how much design" as a fixed setting instead of calibrating the treatment to the task's ambition (CD3 Law 1).
**Prevent:** set `treatment_register` (R0–R4) at ORIENT from the task, not the brand's loudness; the register caps the DIS ceiling. When unsure, drop a register — restraint executed well beats spectacle misapplied.
**Red flag:** DIS reading exceeds the register cap; an R0 task carrying gradient orbs and kinetic type; a flagship shipped with library defaults and no unforgettable moment.
