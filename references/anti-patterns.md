# Anti-Patterns & Design Quality Gates — What Iron Canvas Must NEVER Do

> These are the mistakes that turn premium enhancement into generic destruction. Memorize them.
> Section I covers workflow anti-patterns (process failures).
> Section II covers design-level AI tells (output failures).
> Both sections are mandatory reading for ALL agents at EVERY phase start.

---

## SECTION I: WORKFLOW ANTI-PATTERNS

### The 22 Anti-Patterns (#1–11 v4 core · #12–15 v4.2/v5.0 · #16–17 CD3 v5.1 · #18–22 v6)

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
**Prevent:** set `treatment_register` (R0–R4) at ORIENT from the task, not the brand's loudness; the register caps the DIS ceiling. When unsure, drop a register — restraint executed well beats spectacle misapplied — **never below the aliveness floor (#18).**
**Red flag:** DIS reading exceeds the register cap; an R0 task carrying gradient orbs and kinetic type; a flagship shipped with library defaults and no unforgettable moment.

## v6 ADDITIONS — The Living Canvas (Anti-Patterns #18–22)

### 18. Lifeless ★v6 — correct and dead
**Looks like:** nothing arrives, it is simply there; nothing breathes at rest; buttons change colour and nothing else; flat grounds with no air and no light; reduced motion shows a blank. FEEL.md named it on day one: *"Overly minimalist (empty without purpose)"* and *"'We built this in a weekend' energy."*
**Why:** restraint misread as stillness — register caps, SOLO ceilings and "drop a register" applied to the floor instead of the ceiling; gates that measure discipline (no jank, no errors) but never life.
**Prevent:** the aliveness floor at every register — ARRIVAL, HEARTBEAT, HAND-FEEL, BREATH, COMPOSED STILL (SKILL.md §0.1; `references/motion-language.md` §2) — proven by VERIFY Axis 7 with recordings. The counterweight to #17: under-producing fails as surely as over-producing.
**Red flag:** zero running animations in view one second after load; a control whose hover and focus styles equal its rest style; a reduced-motion screenshot with empty sections.

### 19. Two Clocks ★v6 — two things own the scroll
**Looks like:** a pinned GSAP act and a WebGL camera reading `window.scrollY`; a parallax library fighting Lenis; `seek` landing in the wrong place; reduced motion still scrubbing; the film and the page drifting apart.
**Why:** motion coordinated through prose, each agent wiring its own listener.
**Prevent:** one clock — only the score's `scrub` acts own scroll; Lenis only smooths native scroll; WebGL and every DOM chapter subscribe to the runtime's progress; programmatic jumps go through `lenis.scrollTo`. `scripts/ic-preflight.mjs` rejects a second owner.
**Red flag:** any `scroll` event listener outside the runtime; `pin: true` on an act whose trigger is not `scrub`.

### 20. Flagged but Shipped ★v6 — a known risk treated as FYI
**Looks like:** an agent notes "this emblem resembles a licensed character" or "the display face fell back to a comic font" — and both ship; a handoff that says "verified" while a P0 test is still red.
**Why:** risk notes and red tests are read as commentary instead of blockers; narration substitutes for evidence.
**Prevent:** every flagged item is resolved or explicitly waived by the operator before HANDOFF; a red P0 test blocks the word "verified" anywhere in the handoff. Adjectives direct; evidence proves.
**Red flag:** a risk list in the transcript that never reaches the handoff; "it all works" beside a failing test.

### 21. Defaults as Decisions ★v6 — template pre-fills shipped as choices
**Looks like:** the PRD template's blurred shadow ladder, translucent hairlines, radius ladder, four easing curves or a generic font fallback appear in the build because they were pre-filled, not because the DNA chose them.
**Why:** a filled-in template reads like a decision; nobody decides what is already written down.
**Prevent:** the design contract (SKILL.md §5 3.9d) — every slot is a decision taken from the DNA; `scripts/ic-contract.mjs` checks the build against it in CI. Taste enforced, not advisory.
**Red flag:** the contract and the template are identical; a font stack whose only fallback is the generic family when the contract names a floor.

### 22. Unreviewed Interpolation ★v6 — generated in-betweens shipped unseen
**Looks like:** keyframe interpolation or image-to-video adds framings, zooms or content no keyframe contained ("no zoom" ignored), and the clip goes straight into a scroll sequence or a film.
**Why:** the keyframes were reviewed; the frames between them were assumed.
**Prevent:** after any interpolation, sample frames and match them to the keyframes; flag shots that match none for approve-or-reject in the ledger (`select` needs a written reason). In film work the board locks only after three probe frames pass.
**Red flag:** a 150-frame sequence promoted with no contact sheet; a clip described by its requested length instead of its measured one.

---

## SECTION II: DESIGN SLOP — AI TELLS TO ELIMINATE

> These are the CSS patterns, content patterns, and component patterns that make
> AI-generated output look generic ("slop"). Even when the Iron Canvas pipeline
> is followed perfectly, agents can still produce output with these tells.
> Every agent MUST scan their output against this list before committing.
> One-line entries ending in "→ see …" are rules the Phase 7 Design Quality Gate (phases/07-refine.md)
> or the CD3 canon (#16 above · references/claude-design-3.md) already states with the same fix —
> kept here as cross-references, never as a second copy.

### Visual & CSS Tells

```
❌ Pure #000000 black anywhere
   → Use off-black (#0a0a0a, #111111), Zinc-950, or charcoal
   → True black creates harsh contrast and screams "default"

❌ Neon / outer glow box-shadows
   → Use inner borders or shadows tinted to the background hue
   → Example: box-shadow: 0 8px 24px oklch(from var(--color-accent) l c h / 0.3)

❌ Default Tailwind shadows (shadow-md, shadow-lg, shadow-xl)
   → Always customize. Tint shadows to background. Use diffused, wide-spread shadows
   → Example: shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]

❌ Oversaturated accent colors (saturation > 80%) → see phases/07-refine.md (Color & Surface Audit)

❌ Excessive gradient text on large headers
   → Use gradient text ONLY as a focused accent, never on primary display text

❌ h-screen for full-height sections
   → ALWAYS use min-h-[100dvh] to prevent catastrophic iOS Safari viewport jumping

❌ Complex flexbox percentage math: w-[calc(33%-1rem)]
   → ALWAYS use CSS Grid: grid grid-cols-1 md:grid-cols-3 gap-6

❌ Emojis in code, markup, text content, headings, or alt text
   → Replace with high-quality icons (Phosphor, Radix) or clean SVG primitives

❌ Arbitrary z-index values (z-50, z-[9999])
   → Reserve z-indexes strictly for systemic layers: nav, modals, overlays, tooltips

❌ Animating top, left, width, or height
   → Animate exclusively via transform and opacity for GPU acceleration

❌ backdrop-blur on scrolling containers
   → Apply blur ONLY to fixed/sticky elements (nav, overlays). Scrolling blur = GPU meltdown

❌ Grain/noise overlays on scrolling containers → see phases/07-refine.md (Color & Surface Audit)
```

### Typography Tells

```
❌ Inter font for premium or creative contexts (default, unless the Brand Personality Matrix / register justifies it)
   → Use: Geist, Outfit, Cabinet Grotesk, Satoshi, Clash Display
   → Inter is acceptable ONLY for functional/data UIs where the BPM scores it
   → NOTE: This is a guardrail, not an absolute ban. If Phase 1 DNA extraction
     finds Inter already in use and the brand identity requires it, preserve it.

❌ Oversized H1s that just "scream"
   → Control hierarchy with weight and color, not just massive scale
   → Use tracking-tighter and font-weight contrast, not font-size alone

❌ System fonts as the only choice (Arial, Helvetica, -apple-system alone) → see phases/07-refine.md (Typography Audit) + CD3 HARD FAIL (a default font stack with no reason)

❌ Orphan words in headings (single word on last line) → see phases/07-refine.md (Typography Audit)

❌ Only Regular (400) and Bold (700) weights → see phases/07-refine.md (Typography Audit)

❌ All-caps subheaders everywhere
   → Mix lowercase italics, sentence case, or small-caps for variety

❌ Serif fonts in dashboard/software UIs
   → Serif in dashboards is ALWAYS wrong. Use sans-serif + monospace pairing
   → NOTE: Serif is fine for editorial/creative when BPM avant-garde ≥ 6
```

### Layout Tells

```
❌ Centered Hero when BPM Bold ≥ 5 (default, unless the Brand Personality Matrix / register justifies it)
   → Default to split screen (50/50), left-aligned content, or asymmetric whitespace
   → NOTE: Centered IS acceptable for brands with Bold < 5 (refined/conservative)

❌ 3-column equal card feature rows (default, unless the Brand Personality Matrix / register justifies it)
   → Use 2-column zig-zag, asymmetric grid, masonry, or horizontal scroll
   → The "three equal cards horizontally" is the #1 AI layout fingerprint

❌ Cards of equal height forced by flexbox when content varies
   → Allow variable heights or use masonry when content length differs

❌ Uniform border-radius on everything
   → Vary: tighter on inner elements, softer on containers

❌ Symmetrical vertical padding everywhere → see phases/07-refine.md (Layout Audit)

❌ No overlap or depth at all
   → Use negative margins to create layering when appropriate

❌ Buttons not bottom-aligned in card groups
   → Pin CTAs to bottom of cards so they form a clean horizontal line

❌ Edge-to-edge layouts with no max-width → see phases/07-refine.md (Layout Audit)
```

### Content Tells (The "Jane Doe" Effect)

```
❌ Generic names: "John Doe", "Jane Smith" → see phases/07-refine.md (Content Audit)

❌ Startup slop names: "Acme", "Nexus", "SmartFlow", "TechCorp"
   → Invent premium, contextual brand names

❌ Fake round numbers: 99.99%, 50%, $100.00, 1234567
   → Use organic, messy data: 47.2%, $99.00

❌ AI copywriting clichés
   → BANNED: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer",
     "Delve", "Tapestry", "In the world of...", "Revolutionary"
   → Write plain, specific language. Concrete verbs.

❌ Lorem Ipsum anywhere → see phases/07-refine.md (Content Audit) + CD3 LAW 2 / HARD FAIL (never lorem)

❌ Broken Unsplash links
   → Use: https://picsum.photos/seed/{contextual_name}/800/600
   → Or: SVG UI Avatars for placeholder avatars

❌ Same avatar image for multiple users → see phases/07-refine.md (Content Audit)

❌ All blog post dates identical → see phases/07-refine.md (Content Audit)

❌ "Oops!" error messages → see phases/07-refine.md (Content Audit) + CD3 LAW 2 (errors say what failed and how to fix it)

❌ Exclamation marks in success messages
   → Be confident, not loud

❌ Title Case On Every Header
   → Use sentence case instead
```

### Component Tells

```
❌ Generic card look (border + shadow + white bg) as default
   → Cards exist ONLY when elevation communicates hierarchy
   → For high-density: replace with border-t, divide-y, or negative space

❌ Generic circular spinners for loading → see phases/07-refine.md (Component Audit)

❌ Always one filled button + one ghost button
   → Add text links or tertiary styles to reduce visual noise

❌ Accordion FAQ sections as default
   → Try side-by-side list, searchable help, or progressive disclosure

❌ 3-card carousel testimonials with dots
   → Use masonry wall, embedded social posts, or single rotating quote

❌ Modals for everything
   → Use inline editing, slide-over panels, or expandable sections for simple actions

❌ Avatar circles exclusively
   → Try squircles or rounded squares for differentiation

❌ shadcn/ui in its generic default state → see phases/07-refine.md (Component Audit) + #16 Slop Tells

❌ Standard Lucide/Feather icons exclusively
   → Use Phosphor, Heroicons, or custom sets. Standardize stroke width globally
```

### External Resource Tells

```
❌ Import hallucinations — importing packages not in package.json
   → ALWAYS check package.json before importing. Output install command if missing

❌ Missing favicon → see phases/07-refine.md (Code Quality Audit)

❌ Missing meta tags → see phases/07-refine.md (Code Quality Audit)

❌ Commented-out dead code → see phases/07-refine.md (Code Quality Audit)

❌ Div soup → see phases/07-refine.md (Code Quality Audit)

❌ Hardcoded pixel widths for layout → see phases/07-refine.md (Code Quality Audit)
```

### Red Flags for Design Slop

```
🚩 The output could have been generated by any AI without reading the DNA Profile
🚩 You used Inter/Arial/Helvetica without the DNA Profile specifying it
🚩 You wrote "Lorem ipsum" or "Acme Corp" anywhere
🚩 All your card shadows are default Tailwind values
🚩 Your Hero section is centered text over a dark image — unless the Brand Personality Matrix / register justifies it
🚩 You have 3 equal cards in a row as a "features" section — unless the Brand Personality Matrix / register justifies it
🚩 Every number in the UI is a round, fake value
🚩 The loading state is a generic circular spinner
🚩 You used h-screen instead of min-h-[100dvh]
🚩 You imported a library without checking package.json
```

---

*Iron Canvas v4.2 — references/anti-patterns.md*
*Design slop rules derived from taste-skill analysis, adapted to Iron Canvas's DNA-first philosophy*
