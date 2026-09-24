# Phase 5: GENERATE — The Media Tournament ★v6 + Context-Aware Creation

> ⚠️ **THIS PHASE IS NEVER OPTIONAL.**
>
> Phase 5 always runs. What changes is whether it results in artifact generation
> or a documented skip decision. ★v6: the Artifact Assessment Gate now runs at the end of
> PACKAGE (phases/03.9-package.md 3.9b), so the engine jobs are known before FORGE and the
> ASSET FORGE lane (5a) runs in parallel with the build agents. Agents that reach Phase 5
> without an `artifact-assessment.json` are in violation of Iron Canvas protocol — stop and
> run the gate at 3.9b.
>
> The Crown Collection failure — runs producing zero images on a site with
> zero product photography — happened because Phase 5 was not explicitly routed.
> This file fixes that permanently.

## The Rule

Before generating ANY image, you must know EXACTLY where it goes, how the CSS treats it, and what the surrounding context looks like. Generate for the context, not for the prompt.

★v6 — and nothing generated ships on the builder's say-so. Phase 5 is **the media tournament**:
everything forged — stills, loops, films, meshes, cues, most of it already made in ASSET FORGE
(5a) — competes; a blind critic judges it in situ; only a selected, verified, provenanced winner
reaches `public/`. An artifact that looks spectacular alone and dropped-in on the page is a
failure; one that looks like it was always part of the design is the goal.

---

## MANDATORY FIRST ACTION: READ THE ASSESSMENT + THE REFERENCES

Before executing any step in this phase:
```
READ: artifact-assessment.json           (★v6 written at PACKAGE 3.9b — scores, decision,
                                           artifacts, engine jobs, engine gates)
READ: references/model-selection.md
READ: references/prompt-engineering.md
READ: references/power-engines.md §7     (★v6 the ledger — the tournament's rules)
```
If `artifact-assessment.json` is missing, STOP: return to PACKAGE and run the gate
(phases/03.9-package.md 3.9b — criteria in ROUTING.md § ARTIFACT ASSESSMENT GATE). The engine
jobs and the ASSET FORGE lane depend on it.

---

## STEP 1: CONFIRM THE ASSESSMENT (★v6 — the gate ran at PACKAGE 3.9b)

The gate's five criteria, its decision bands and the `artifact-assessment.json` schema moved to
PACKAGE 3.9b, beside the engine jobs they produce. Here, confirm before generating:

```
□ decision recorded: GENERATE / CONDITIONAL / SKIP
  (SKIP still runs this phase — the OG image is always generated — then Phase 6)
□ every artifact listed with its section, act, class, engine and engine status
□ ASSET FORGE (5a) candidates exist in the run ledger for every engine job — or the fallback is recorded
□ R2+: a site with no images will not finish with still no images (code-driven and generative visuals count)
```

> **★v5.2 — at R2–R4, the artifacts this gate greenlights are GAUNTLET-FORGED.** A signature
> artifact (a scroll sequence, a §19 generative background, a hero still, an OG render) that
> passes the gate is not built once and kept — it is **fanned out into N candidates, each
> blind-critic'd against a falsifiable bar (its own scorecard row + a North Star reference-peg
> diff + seeded reproducibility), and only the survivor ships.** Fleet width R2 = 2 · R3 = 3 ·
> R4 = 3–4, round cap 3. Register-gated: **OFF at R0/R1** — a utilitarian artifact is built
> once, well (looping it is Anti-Pattern #17). Protocol: [`../references/gauntlet-loop.md`](../references/gauntlet-loop.md).
> ★v6: for generated media the tournament's counts apply (Step 1b).

**If SKIP:** generate the OG image, record the skip, proceed to Phase 6.
**If GENERATE / CONDITIONAL:** run the tournament (Step 1b) over ASSET FORGE's candidates, then
generate what is still missing (Steps 2–9).

---

## STEP 1b ★v6: THE MEDIA TOURNAMENT

Everything forged — stills, loops, films, meshes, cues — competes and is judged:

```
CANDIDATES   by register: R2 2 · R3 3 · R4 4 (up to 8 for an identity film) · stills: 4 variants
CRITIC       a blind cross-family critic scores candidates in situ — never the builder's self-report
             "Prefer a slightly quieter frame with strong identity over a spectacular but
              interchangeable frame."
SELECT       engines/ledger.mjs select — a written reason (≥ 16 characters) or no selection
VERIFY       engines/ledger.mjs verify — every file re-hashed; any drift fails
ENCODE       bg-loop · brand-film · scroll-tied (15 fps WebP frames) · poster (40 % in)
PROMOTE      only selected, unchanged candidates reach public/ — each with a provenance sidecar
MEASURED     a clip is described by its measured length and size, never by the requested ones
```

```bash
node engines/ledger.mjs list    --run .ic/runs/<ts>-<name>
node engines/ledger.mjs select  --run .ic/runs/<ts>-<name> --candidate <file> --reason "why this one, in a sentence"
node engines/ledger.mjs verify  --run .ic/runs/<ts>-<name>      # re-hashes every file; exit 1 on drift
node engines/ledger.mjs encode  --in <file> --profile bg-loop|brand-film|scroll-tied|poster --out <dir>
node engines/ledger.mjs promote --run .ic/runs/<ts>-<name> --candidate <file> --to public/video/hero.mp4
```

```
.ic/runs/<ts>-<name>/              gitignored — masters never enter the repo
  manifest.json                    jobs + items: sha256, measured media / mesh facts, selection + reason
  inputs/  candidates/  web/  evidence/
public/video/hero.mp4                         only reviewed web encodes are promoted
public/video/hero.mp4.provenance.json         engine · tool · model · prompt · seed · params · inputs · rights · cost
```

**Never silently promote candidate 1.** Engine-made media (Blender · Seedance 2.5 · audio · clips
made in a provider's UI and brought in with `video.mjs ingest`) runs through the ledger; stills
from an image tool follow the same steps — candidates, a blind critic, a written reason — and ship
with the same provenance fields beside the file. The poster is taken from 40 % in, never frame 0
(first frames are often black or unsettled). At R0/R1 the engines are gated off, so the tournament
is small — the discipline is the same.

---

## STEP 2: LOAD REQUIRED REFERENCES

Based on the artifact-assessment.json decision, load these before prompting:

```
ALWAYS load for Phase 5:
  → references/model-selection.md        (which engine for which artifact type)
  → references/prompt-engineering.md     (how to write context-aware prompts)
  → references/power-engines.md          (★v6 engine gates, the twin camera, the ledger)

If scroll sequence planned (Criterion 3 ≥ 3):
  → references/scroll-engine.md          (architecture + frame specs)

If Leonardo work planned (any physical product):
  → references/leonardo-blueprints.md    (Blueprint workflow guide)

If designed motion or a film is planned (★v6):
  → references/code-driven-assets.md     (HyperFrames — the deterministic film renderer)
```

---

## STEP 3: PRE-GENERATION CHECKLIST (Per Artifact — No Exceptions)

For EVERY artifact, complete this before writing the prompt:

```
□ Screenshot the exact section where this artifact will live
□ Record container dimensions (width × height rendered)
□ Record background color behind it (hex from tokens.css)
□ Record overlay gradient on top (if any)
□ Record blend mode (normal / multiply / overlay)
□ Record opacity
□ Record border radius / clip path
□ Note palette hex codes from site-dna-profile.json
□ Note emotional target from feel-profile.json — ★v6 and the act's emotion (in → out) from the score
□ Determine aspect ratio required
□ Determine display resolution (hero = 2K, secondary = 1K, close-up = 4K)
```

Anti-Pattern #2 (Blind Generation): This checklist IS the prevention.
Never write a prompt until every box above is checked.

---

## STEP 4: WRITE CONTEXT-AWARE PROMPTS

### Prompt Formula (mandatory structure)

```
[Subject] + [Material/Style] + [Palette hex codes] + [Lighting] +
[Camera angle] + [Background] + [CSS usage context] + [Negative constraints]
```

### Full Example — Crown Collection Body Butter

★v6: the hexes below are this product's own (a matte black jar, a brushed gold lid). Every project
writes its own from `site-dna-profile.json` — never copy them as a house palette (Anti-Pattern #3).

```
Luxury body butter in a matte black glass jar (6oz, wide-mouth) with brushed
gold screw-top lid, "Crown Collection" logo embossed in gold on front center.
Soft studio lighting from upper-left, warm color temperature.
Front-facing view, slightly elevated 15 degrees.
Deep black seamless background (#0a0e14) with subtle warm gold (#c9a84c)
rim light from behind. Displayed in hero section at 1440×900px with
left-to-right gradient overlay from transparent to #0a0e14.
Photorealistic product photography, shallow depth of field.
No cold tones, no blue, no flat illustration, no watermarks.
```

---

## STEP 5: AI ENGINE ROUTING

Use references/model-selection.md for full decision matrix. Quick routing:

```
Photorealistic product / hero:   Nano Banana Pro (Gemini 3 Pro Image)
Bold expressive / dramatic:      Grok Imagine
Detailed multi-element layout:   OpenAI Image 1.5
Cinematic luxury atmosphere:     Leonardo.ai Kino XL or Phoenix
Product 360° spin:               Leonardo Product Spin Video → ffmpeg
Style matching to site DNA:      Leonardo Style Transfer
Lifestyle placement:             Leonardo Product In Scene
Cross-frame lighting:            Leonardo Custom Relight (CRITICAL for sequences)
Background swap:                 Leonardo Background Change
Container expansion:             Leonardo Instant Outpaint
Film / loops / transitions:      Seedance 2.5 (engines/video — fal queue or ingest) ★v6
Hero object / camera rail:       Blender headless (engines/blender) ★v6 — the twin camera with Seedance
Signature cues / beds:           ElevenLabs sound generation (engines/audio) ★v6
Designed motion film:            HyperFrames (the page's own score, seeked frame by frame) ★v6
```

★v6 engines are gated by the register (R0/R1 off · R2 the signature only · R3 on · R4 on + the
twin camera) and by `power_engines` (a `missing` engine takes its fallback — video → HyperFrames →
§19 flow field → poster). Their jobs were written at PACKAGE 3.9b and ran in ASSET FORGE (5a);
here they are judged, not started.

### Nano Banana Pro Command

```bash
generate-image \
  --prompt "[full context-aware prompt]" \
  --filename "artifact-name.png" \
  --resolution 2K \
  --aspect-ratio 16:9

# For image editing:
generate-image \
  --prompt "[modification instructions]" \
  --filename "artifact-name-v2.png" \
  -i existing-image.png \
  --resolution 2K
```

---

## STEP 6: LEONARDO AI BROWSER WORKFLOW

> This step drives a Chrome browser to run the Leonardo workflow.
> Navigate to app.leonardo.ai and execute the workflow; prompt the user to log in when required.

### When to use Leonardo in the browser:

```
Physical product exists (uploaded photo or Nano Banana output):
  → Product Studio Photoshoot  (multiple consistent angles)
  → Product In Scene           (lifestyle context shots)

Scroll sequence needed (Criterion 3 scored 4-5):
  → Product Spin Video         (360° → extract with ffmpeg)
  → Custom Relight             (light consistency across ALL frames)

DNA-matching needed:
  → Style Transfer             (apply site palette to any image)
  → Background Change          (match section-specific backgrounds)

Image doesn't fill container:
  → Instant Outpaint           (expand edges to fit)
```

### Browser Automation Steps

```
1. Open Chrome window
2. Navigate to: https://app.leonardo.ai/
3. Log in if needed
4. Go to Blueprints section
5. Select appropriate Blueprint
6. Upload base image (Nano Banana output or original product photo)
7. Configure settings per references/leonardo-blueprints.md
8. Run generation
9. Download outputs → save to /agent-outputs/agent-d/ or /public/images/iron-canvas/
10. For Product Spin Video → extract frames:
    ffmpeg -i spin.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%04d.webp
    ffmpeg -i spin.mp4 -vf "fps=15,scale=960:540" frames-mobile/frame_%04d.webp
```

### If browser automation is unavailable, use Leonardo API:

```bash
# Run a Blueprint via API
curl -X POST https://cloud.leonardo.ai/api/rest/v1/blueprints/{blueprintId}/run \
  -H "Authorization: Bearer $LEONARDO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"nodeInputs": {"imageUrl": "https://...", "prompt": "..."}}'

# Poll for results
curl https://cloud.leonardo.ai/api/rest/v1/generations/{generationId} \
  -H "Authorization: Bearer $LEONARDO_API_KEY"
```

---

## STEP 7: GENERATION PROTOCOL

```
FOR EACH ARTIFACT:
1. Write prompt following formula
2. Generate 4 VARIANTS (not 1 — always 4) for stills
   ★v6 video by register: R2 2 · R3 3 · R4 4 candidates
3. Preview all 4 before selecting — ★v6 a blind critic scores them, never your self-report
4. Test best variant IN SITU:
   - Place in actual page HTML
   - Screenshot the section with artifact in place
   - Evaluate 3 questions:
     a. Does it BLEND with its container (no floating/mismatched bg)?
     b. Does the LIGHTING match surrounding elements?
     c. Does it FEEL like it was always part of this design?
5. If doesn't blend naturally → adjust prompt → regenerate → retest
6. NEVER force-fit. Anti-Pattern #4 and #6 are your risks here.
7. ★v6 Select with a written reason → verify → encode → promote with provenance (Step 1b).
   NEVER silently promote candidate 1.
```

**★v6 TIMING BY EMOTIONAL WEIGHT** (storyboards, sequences, films): spend frames, seconds and
scroll where the drama is — the lid lifting, the light escaping — and let the settle be long and
quiet. The score's signature act gets the most; quiet acts get the least.

**★v6 NO IMAGE SITS DEAD (R2+):** every image gets a living entrance and a slow life — a Ken Burns
drift, a parallax band, a light response — on the house personality, stopped under reduced motion.

---

## STEP 8: SCROLL SEQUENCE FRAME GENERATION

**Only run if artifact-assessment.json says scroll_engine_needed: true**

Also load: references/scroll-engine.md (full architecture)

### Keyframe Definition (8-12 moments)

```
EXAMPLE: Crown Collection Body Butter

Frame 01: Jar centered, lid sealed, front view, slight shadow beneath
Frame 02: Jar centered, subtle golden aura glowing from jar edges
Frame 03: Lid tilted 10°, thin line of warm gold light from gap
Frame 04: Lid lifted 20°, warm steam wisps rising
Frame 05: Lid floating 1" above jar, cream surface visible
Frame 06: Raw shea butter, cocoa butter, botanicals beginning to emerge
Frame 07: Full ingredient explosion — botanicals orbiting jar at peak
Frame 08: Close-up on cream texture, extreme detail
Frame 09: Ingredients beginning to settle back
Frame 10: Lid descending back toward jar
Frame 11: Jar reassembled, slight rotation from start angle
Frame 12: Final hero pose, subtle glow, premium stillness
```

### Interpolation Strategy — timing by emotional weight (restored ★v6)

*Restored verbatim from the v1.0 GENERATE phase (`ddb94ef:phases/05-generate.md` L108–L112):*

- Generate 30-60 carefully chosen frames (NOT 200 unique AI frames)
- Canvas transitions handle smooth interpolation between them
- More frames at critical moments (lid opening, ingredient explosion)
- Fewer frames during slow transitions (subtle glow, settling)

The keyframes above follow it: frames 03–08 crowd the reveal; 01–02 and 09–12 are the settle. The
same rule governs the score (the signature act gets the most scroll) and the film (the most seconds
go where the drama is). The web budget below still caps the delivered set at 40-60 frames.

### Base Prompt Consistency Protocol

```
BASE (never changes):
"luxury body butter jar, matte black glass container, brushed gold lid,
Crown Collection embossed logo, soft studio lighting from upper-left,
deep black background (#0a0e14), gold accent (#c9a84c),
photorealistic product photography"

FRAME 01: [BASE] + ", jar centered, lid sealed, front angle, subtle shadow beneath"
FRAME 02: [BASE] + ", jar centered, faint golden aura glowing from jar edges"
FRAME 03: [BASE] + ", lid tilted 10 degrees, thin line of gold light from gap"
[...continue through all keyframes, VARYING ONLY the action descriptor]
```

**RULE:** The BASE prompt is IDENTICAL for every frame.
Only the action descriptor changes. This is Anti-Pattern #8 prevention.

### Frame Specs

```
Format:          WebP (30-50% smaller than PNG)
Desktop:         1920×1080 @ ≤80KB per frame
Mobile:          960×540  @ ≤40KB per frame
Count:           40-60 frames (sweet spot: smooth + fast loading)
Total budget:    ≤5MB desktop + ≤2.5MB mobile
Naming:          frame_0001.webp through frame_0060.webp
```

★v6: `node engines/ledger.mjs encode --in <selected clip> --profile scroll-tied --out <dir>` makes
the 15 fps WebP desktop + mobile sets from a selected clip. Two stills can become the source clip
through Google Flow ("Frames to Video") or Seedance 2.5 image-to-video with `end_image_url` (set
first = last for a seamless loop). Scroll-tied motion is never a `<video>` (Anti-Pattern #7).

★v6 **Review the in-betweens before extraction.** An interpolation engine invents the frames
between your keyframes. Sample the generated clip (a contact sheet of evenly spaced frames), match
each sample to the keyframes it sits between, and approve or reject it in the ledger — framings or
content that no keyframe contained, shipped unseen, is **Anti-Pattern #22 UNREVIEWED
INTERPOLATION**.

### Test Protocol

```
1. Generate 10 frames first (not 60)
2. Implement scroll engine (Agent-B, references/scroll-engine.md)
3. Test scrub quality:
   - Does it scroll smoothly both directions?
   - Do content overlays sync correctly?
   - Is there visible frame gap/jump?
4. If smooth → generate full set
5. If not → adjust frame count, improve key frames, retest
```

### ffmpeg Frame Optimization

```bash
# Extract from Product Spin Video
ffmpeg -i product_spin.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%04d.webp
ffmpeg -i product_spin.mp4 -vf "fps=15,scale=960:540" frames-mobile/frame_%04d.webp

# Optimize all frames
for f in frames/*.webp; do cwebp -q 80 "$f" -o "$f"; done

# Check total size
du -sh frames/
# Must be ≤ 5MB total
```

---

## STEP 9: ARTIFACT CSS INTEGRATION (Agent-D output)

For each artifact, write the CSS that makes it blend:

```css
/* artifact-css.css — generated by Agent-D, consumed by Agent-C */

/* Hero product image — blend with dark section */
.hero-product-image {
  filter: brightness(0.85) saturate(1.2);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  max-width: 600px;
}

/* Gradient overlay — text readability over image
   ★v6: the scrim is the section's own ground through its RGB mirror token, never a hard-coded hex */
.hero-product-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgb(var(--bg-rgb) / 0.9) 0%,
    rgb(var(--bg-rgb) / 0.4) 50%,
    transparent 100%
  );
  pointer-events: none;
}

/* Warm tint to match gold palette */
.product-detail-image {
  filter: sepia(0.08) saturate(1.3) brightness(0.9);
}
```

---

## PHASE 5 COMPLETION CRITERIA

Before proceeding to Phase 6:

```
□ artifact-assessment.json present with score + decision (★v6 written at PACKAGE 3.9b)
□ If GENERATE: all priority artifacts generated
□ OG image generated (always — no score threshold)
□ ★v6 Every candidate scored by a blind critic in situ; every selection carries a written reason
□ ★v6 engines/ledger.mjs verify passes; only selected, unchanged candidates promoted — each with a .provenance.json
□ ★v6 Clips described by their measured length and size (ffprobe), never the requested ones
□ ★v6 R2+: no image sits dead — a living entrance and a slow life, stopped under reduced motion
□ ★v6 Interpolated in-betweens sampled, matched to their keyframes and approved in the ledger (no Anti-Pattern #22)
□ All artifacts tested in situ (not just reviewed in isolation)
□ Every artifact has CSS integration written (artifact-css.css)
□ Scroll frames: 10-frame prototype tested before full set
□ Full frame set within 5MB total budget
□ All artifacts blend naturally — no floating objects on wrong backgrounds
□ model-selection.md consulted for engine choices
□ prompt-engineering.md formula used for all prompts
□ If Leonardo used: browser workflow completed or API used as fallback
□ Leonardo Custom Relight applied if multiple frames (consistency required)
```

**All complete → PROCEED to Phase 6 (phases/06-compose.md)**

---

## COMMON PHASE 5 FAILURES & FIXES

```
FAILURE: "No images on the final site even though artifacts were generated"
FIX: Artifacts must be integrated in Phase 6. Don't skip Phase 6.
     Generated artifacts living in /agent-outputs/agent-d/ are NOT live yet.

FAILURE: "Scroll sequence looks like a slideshow of different photos"
FIX: Anti-Pattern #8. Your base prompt changed between frames.
     Start over with a locked base prompt.

FAILURE: "Image looks great on its own but wrong on the page"
FIX: Anti-Pattern #6 (Trinket Dropping). You skipped the in-situ test.
     Place in page, screenshot, evaluate, adjust CSS, verify.

FAILURE: "Leonardo blueprint produced the wrong aesthetic"
FIX: Run Style Transfer using the site's north-star-reference.png as the
     style reference image after running the initial Blueprint.

FAILURE: "Chrome can't be opened / Leonardo unavailable"
FIX: Use Nano Banana Pro exclusively for all artifact generation.
     Document: "Leonardo workflow skipped — browser unavailable."
     Schedule Leonardo passes when Chrome access is restored.

FAILURE: "Candidate 1 shipped because nobody chose" ★v6
FIX: ledger promote refuses an unselected candidate. Blind critic → select with a
     written reason → verify → promote. Never silently promote candidate 1.

FAILURE: "The film is described as 10 s but plays 9.5 s" ★v6
FIX: Measured, never inferred. Every candidate is ffprobed and hashed; describe a clip
     by its measured length and size, never by the length that was requested.

FAILURE: "An engine is missing and the build stalled" ★v6
FIX: A missing engine never blocks a build. It exits 2 with its plan; take the named
     fallback (video → HyperFrames → §19 flow field → poster) and record it.
```

---
*← [Phase 3.9: PACKAGE](03.9-package.md) | Back to [ROUTING.md](../ROUTING.md) | Next: [Phase 6: COMPOSE →](06-compose.md)*
