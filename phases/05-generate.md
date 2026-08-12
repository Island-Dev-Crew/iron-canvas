# Phase 5: GENERATE — Artifact Assessment + Context-Aware Creation

> ⚠️ **THIS PHASE IS NEVER OPTIONAL.**
>
> Phase 5 always runs. What changes is whether it results in artifact generation
> or a documented skip decision. Agents that skip Phase 5 entirely without
> running the Artifact Assessment Gate are in violation of Iron Canvas protocol.
>
> The Crown Collection failure — runs producing zero images on a site with
> zero product photography — happened because Phase 5 was not explicitly routed.
> This file fixes that permanently.

---

## MANDATORY FIRST ACTION: READ ROUTING.MD

Before executing any step in this phase:
```
READ: ROUTING.md → § ARTIFACT ASSESSMENT GATE
READ: references/model-selection.md
READ: references/prompt-engineering.md
```

---

## STEP 1: RUN THE ARTIFACT ASSESSMENT GATE

Score each criterion 1-5. This is not optional. Every site gets scored.

> **★v5.2 — at R2–R4, the artifacts this gate greenlights are GAUNTLET-FORGED.** A signature
> artifact (a scroll sequence, a §19 generative background, a hero still, an OG render) that
> passes the gate is not built once and kept — it is **fanned out into N candidates, each
> blind-critic'd against a falsifiable bar (its own scorecard row + a North Star reference-peg
> diff + seeded reproducibility), and only the survivor ships.** Fleet width R2 = 2 · R3 = 3 ·
> R4 = 3–4, round cap 3. Register-gated: **OFF at R0/R1** — a utilitarian artifact is built
> once, well (looping it is Anti-Pattern #17). Protocol: [`../references/gauntlet-loop.md`](../references/gauntlet-loop.md).

```
CRITERION 1: IMAGE ABSENCE (1-5)
  5 = No images anywhere on the site (ZERO imagery — like Crown Collection)
  3 = Some images but weak, generic, or heavily missing in key sections
  1 = Rich, high-quality existing imagery throughout every section
  Score: ___

CRITERION 2: VISUAL STORYTELLING OPPORTUNITY (1-5)
  5 = Physical product that MUST be seen to be desired (body butter, car, food)
  3 = Service/concept that benefits from visual representation
  1 = Pure information/text service with no visual anchor
  Score: ___

CRITERION 3: SCROLL SEQUENCE VIABILITY (1-5)
  5 = Product has a reveal story (open/close, ingredient explosion, transformation)
  3 = A process or journey could be shown through scrolled frames
  1 = No natural reveal — content is better delivered statically
  Score: ___

CRITERION 4: COMPETITIVE PREMIUM GAP (1-5)
  5 = Competitors have cinematic imagery and the site looks cheap without it
  3 = Would help differentiate but not critical for credibility
  1 = Industry norm is text-forward — imagery would feel out of place
  Score: ___

CRITERION 5: BRAND PERSONALITY ALIGNMENT (1-5)
  5 = Bold ≥ 7, Avant-garde ≥ 6, feel profile is "luxury/cinematic/premium"
  3 = Mixed scores — some visuals appropriate
  1 = Serious + Corporate + Minimal — artifacts would feel intrusive
  Score: ___

TOTAL: ___ / 25
```

### DECISION

```
20-25: ✅ GENERATE — MANDATORY. Proceed to Step 2 immediately.
       Scroll engine: ASSESS in Criterion 3. If 4-5, scroll engine is required.
       Open Chrome for Leonardo if product is physical.

13-19: ✅ GENERATE — RECOMMENDED. Proceed to Step 2 for priority artifacts.
       Scroll engine: Only if Criterion 3 scored 3+.
       Use Nano Banana Pro as primary engine.

8-12:  ⚠️ CONDITIONAL. Generate only what directly addresses the lowest-scoring
       weakness. Document which artifacts were created and why.
       Skip scroll engine unless Criterion 3 scored ≥ 3.

1-7:   ❌ SKIP. Write skip rationale in artifact-assessment.json.
       Proceed to Phase 6. Phase 6 still runs (may still need integration work).
```

### WRITE artifact-assessment.json

```json
{
  "phase": 5,
  "project": "[name]",
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
  "scroll_engine_needed": true,
  "three_d_needed": false,
  "artifacts_to_generate": [
    {
      "name": "",
      "section": "",
      "priority": "CRITICAL / HIGH / MEDIUM",
      "engine": "Nano Banana Pro / Leonardo / Grok / GPT Image",
      "is_scroll_frame_sequence": false
    }
  ],
  "rationale": "",
  "skip_rationale": null
}
```

**If SKIP:** Write rationale, save artifact-assessment.json, proceed to Phase 6.
**If GENERATE:** Continue to Step 2.

---

## STEP 2: LOAD REQUIRED REFERENCES

Based on the artifact-assessment.json decision, load these before prompting:

```
ALWAYS load for Phase 5:
  → references/model-selection.md        (which engine for which artifact type)
  → references/prompt-engineering.md     (how to write context-aware prompts)

If scroll sequence planned (Criterion 3 ≥ 3):
  → references/scroll-engine.md          (architecture + frame specs)

If Leonardo work planned (any physical product):
  → references/leonardo-blueprints.md    (Blueprint workflow guide)
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
□ Note emotional target from feel-profile.json
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
```

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
2. Generate 4 VARIANTS (not 1 — always 4)
3. Preview all 4 before selecting
4. Test best variant IN SITU:
   - Place in actual page HTML
   - Screenshot the section with artifact in place
   - Evaluate 3 questions:
     a. Does it BLEND with its container (no floating/mismatched bg)?
     b. Does the LIGHTING match surrounding elements?
     c. Does it FEEL like it was always part of this design?
5. If doesn't blend naturally → adjust prompt → regenerate → retest
6. NEVER force-fit. Anti-Pattern #4 and #6 are your risks here.
```

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

/* Gradient overlay — text readability over image */
.hero-product-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(10, 14, 20, 0.9) 0%,
    rgba(10, 14, 20, 0.4) 50%,
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
□ artifact-assessment.json written with score + decision
□ If GENERATE: all priority artifacts generated
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
```

---
*← [Phase 3.9: PACKAGE](03.9-package.md) | Back to [ROUTING.md](../ROUTING.md) | Next: [Phase 6: COMPOSE →](06-compose.md)*
