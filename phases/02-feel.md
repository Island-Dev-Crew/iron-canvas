# Phase 2: FEEL — Discover the Emotional Target → the Feel Brief ★v6

> Read the site's existing content, imagery, and palette to understand what it's TRYING to be. **Don't impose a feel — discover it.**
>
> ★v6 — *"Before a single pixel exists, we answer one question: how should your audience feel when
> they arrive? This anchors every downstream decision — from color temperature to font weight to
> motion speed. A feel brief is not a mood board. It's a lens."*

## The Rule

The emotional target comes FROM the site, not from you. You are a detective, not an art director.

**★v6 — the output of this phase is the Feel Brief** (`feel-profile.json`): the lens, the timeline
of feeling (the first 3 seconds, and after), a reference vibe that is a *place*, the feel line, the
subject's own vocabulary, the **kinetic signature** (how the work moves), the **signature** (the
mechanism it acts out) and the anti-feelings — which always include **"lifeless / mechanical"**.
An empty kinetic signature fails GATE 2. Calm is not dead.

## Process

### 0. The Lens ★v6 (write it first)

One sentence answering: **how should the audience feel when they arrive?** Then the timeline of
feeling — what they feel in the **first 3 seconds**, and what they feel **after** (the
transformation). Then the **reference vibe** — a *place*, with light, temperature and tempo,
because a place implies all three:

- *"Walking into a high-end fragrance boutique — dark, warm, intimate"* (intimate and slow)
- *"A warm living room with old wood and soft light"* (soft and settled)
- *"Walking onto a championship court before the game"* (charged, about to start)

**When the operator gave no direction, infer it from the subject's own world**
([references/direction-fusion.md](../references/direction-fusion.md) §1):

| Subject vocabulary | Ask | Feeds |
|---|---|---|
| **Nouns & instruments** | What objects, tools, surfaces does this subject handle? | material, imagery, the mechanism |
| **Verbs & tempo** | What does it *do*, and how fast? | motion personality, tempo |
| **Materials** | What is it made of, literally or in spirit? (stone, glass, liquid, light, fabric, paper, steel) | the world material, texture, light |
| **Proof state** | What can it actually prove today? (live product, numbers, customers, none yet) | how loud the claims may be; `count` only on true numbers |

Compress it to the **feel line** — `3 adjectives · 1 material · 1 tempo` (for example
*"forged · patient · warm · iron · slow"*). A Studio bible's feel line is a starting input, not a
finished answer — confirm it against what the site actually says.

### 1. Read All Copy
- What words recur? (luxury, natural, handcrafted, exclusive, community, etc.)
- What tone is the writing? (formal, casual, poetic, direct, aspirational)
- What promises are made? (quality, exclusivity, results, belonging)
- What story is being told? (origin story, mission, transformation)
- ★v6 Harvest the **subject vocabulary** here — the nouns, verbs and materials the copy already uses.

### 2. Study the Imagery
- Warm or cold tones?
- Bright and energetic or dark and moody?
- People-focused or product-focused?
- Polished studio or authentic/raw?
- Aspirational (what life could be) or relatable (what life is)?

### 3. Decode the Palette
| Palette Signal | Emotional Territory |
|---------------|-------------------|
| Black + Gold | Luxury, exclusivity, premium |
| Earth tones (browns, greens) | Natural, organic, grounded |
| Maroon + Gold | Warm, trusted, heritage |
| Navy + White | Professional, clean, reliable |
| Bright primaries | Playful, energetic, youthful |
| Pastels | Soft, gentle, approachable |
| Neon/Vibrant | Bold, modern, disruptive |
| Monochrome + one accent | Sophisticated, focused |

### 3b. Score the Brand Personality Matrix ★v6 (carried inline — it governs ALL downstream decisions)

```json
{
  "brand_personality_matrix": {
    "minimal_vs_maximal":     "__/10 → animation intensity",
    "serious_vs_playful":     "__/10 → interaction playfulness",
    "classic_vs_avant_garde": "__/10 → technique selection + 3D threshold",
    "digital_vs_organic":     "__/10 → texture + grain decisions",
    "quiet_vs_bold":          "__/10 → cursor type + WebGL decision",
    "fast_vs_contemplative":  "__/10 → animation duration + pacing",
    "summary": "2-sentence brand character description"
  }
}
```

**Matrix thresholds:**
- Bold 1-4: No custom cursor | CSS animations only
- Bold 5-7: Trailing cursor | GSAP standard stack
- Bold 8-10: Magnetic cursor + WebGL | full GSAP + Three.js eligible
- Avant-garde ≥ 8: Three.js eligible, GLSL shaders viable

Every threshold decides *how much*; none decides *whether anything breathes* — the aliveness floor
holds at Bold 1 as at Bold 10.

### 4. Synthesize the Feel Brief

Combine findings into 3-5 emotional targets, then write the one-glance summary before filling
the JSON (step 6):

**Format:**
```
FEEL BRIEF: [Site Name]
─────────────────────────
Lens:                [★v6 one sentence — how the audience should feel when they arrive]
Primary emotion:     [the dominant feeling — the first 3 seconds]
Secondary emotions:  [supporting feelings]
Aspirational target: [what the user should feel AFTER interacting — the transformation]
Anti-feelings:       [what the site should NEVER evoke — always includes "lifeless / mechanical"]
Reference vibe:      [a real-world place — "walking into a boutique hotel lobby" — light, temperature, tempo]
Feel line:           [★v6 3 adjectives · 1 material · 1 tempo]
Kinetic signature:   [★v6 personality · arrival · heartbeat · hand-feel · breath · signature moment · still path]
Mechanism:           [★v6 from ORIENT Q8] → [the one moment that acts it out]
```

### Examples

**Luxury Body Butter Brand (Crown Collection):**
```
Primary: Desire (I want this)
Secondary: Exclusivity, indulgence, trust in quality
Aspirational: "I deserve premium self-care"
Anti-feelings: Cheap, mass-produced, clinical, lifeless / mechanical
Reference vibe: Walking into a high-end fragrance boutique — dark, warm, intimate
★v6 Lens: "Like being let in on something rare, in a warm, dim room"
★v6 Kinetic signature: silk, accent bloom — arrival: the jar surfaces out of the dark in one slow
    exhale, then the name · heartbeat: warm light breathing on the lid's edge (6 s · 11 s) ·
    signature: the lid lifts and warm light escapes · still: the open jar, lit, at rest
```

**Church Community Site:**
```
Primary: Welcome (I belong here)
Secondary: Trust, warmth, spiritual depth
Aspirational: "This is my spiritual home"
Anti-feelings: Cold, corporate, judgmental, lifeless / mechanical
Reference vibe: A warm living room with old wood and soft light
★v6 Lens: "Like being greeted by name at the door"
★v6 Kinetic signature: tide — arrival: soft light rises over the welcome line, then this week's
    gathering · heartbeat: a slow pool of window light drifting across the header (13 s · 18 s) ·
    signature: the community's faces fill the wall one by one · still: the full wall, gathered
```

**Youth Academy:**
```
Primary: Excitement (I want to be part of this)
Secondary: Pride, aspiration, energy
Aspirational: "My kid will thrive here"
Anti-feelings: Boring, stuffy, outdated, lifeless / mechanical
Reference vibe: Walking onto a championship court before the game
★v6 Lens: "Like the moment the lights come up before tip-off"
★v6 Kinetic signature: gravity — arrival: the court lights come up bank by bank, then the headline
    lands with weight · heartbeat: a slow sweep of arena light across the hero (7 s · 11 s) ·
    signature: the season's real numbers count up on the scoreboard · still: the lit court, the final score
```

### 5. Write the Kinetic Signature ★v6 — how the work moves

The kinetic signature's words come from the one vocabulary in
[references/motion-language.md](../references/motion-language.md) — the same words the Score
Runtime (`runtime/canvas-score.js`) performs. Pick **one house personality** and at most **one
accent** (`bloom`, for the signature only):

| Personality | Curve (GSAP · CSS) | Duration · stagger | It feels like |
|---|---|---|---|
| `silk` | `expo.out` · `cubic-bezier(0.16, 1, 0.3, 1)` | 1.4 s · 0.035 | a heavy object on a damper — lands, then exhales (the original Iron Canvas curve) |
| `tide` | `sine.inOut` · `cubic-bezier(0.37, 0, 0.63, 1)` | 2.4 s · 0.08 | water arriving and leaving; breathing |
| `gravity` | `power4.out` · `cubic-bezier(0.22, 1, 0.36, 1)` | 1.1 s · 0.05 | weight, authority, a thing that has decided to arrive |
| `spark` | `back.out(1.7)` · `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.6 s · 0.025 | a small overshoot of joy — also the tick (≤ 0.25 s) everywhere |
| `snap` | `power3.inOut` · `cubic-bezier(0.76, 0, 0.24, 1)` | 0.5 s · 0.02 | precision; a decisive cut |
| `bloom` | `expo.inOut` · `cubic-bezier(0.87, 0, 0.13, 1)` | 1.8 s · 0.06 | light opening — the signature reveal, once |
| `drift` | `none` · `linear` | scrub | the camera travelling; depth by velocity (scroll-owned motion only) |

**From the Brand Personality Matrix:** contemplative ≥ 7 → `tide` for entrances, `silk` for type ·
refined ≥ 6 → `silk` · serious ≥ 7 and bold ≥ 6 → `gravity` · playful ≥ 7 → `spark` for hands and
small reveals, `silk` for layout · technical ≥ 7 or fast ≥ 7 → `snap` · the signature reveal of a
precious object → `bloom`, once · scroll-owned motion → `drift`, always.

**The three tempos:** hands 0.15–0.5 s · entrances 0.8–1.4 s (100–150 ms steps, 28–48 px travel) ·
ambience 4–36 s on **co-prime periods** (rings at 18 / 28 / 12 s realign only every 252 s — the eye
never catches the loop).

**The five floor fields** — every register fills all five; the register sets their amplitude:

| Field | Write | Quietest form (R0) |
|---|---|---|
| `arrival` | what the first ≤ 1.5 s does, in one sentence — never everything at once | title → content → actions, 600–900 ms, three steps |
| `heartbeat` | the one perpetual element, its co-prime periods and its amplitude (travel ≤ 12 px, alpha ≤ .2) | a breathing status dot (scale 1 → 1.15 → 1, 2 s) |
| `hand_feel` | how controls answer the hand — lift, press, lean | full hover / active / focus-visible on every control |
| `breath` | the air (≥ 20 % of every viewport) + the one ambient layer (grain / light ladder / breathing mesh) | air + a light ladder |
| `still_path` | what reduced motion shows — the composed final frame, never blank | the same page, at rest |

**The signature moment** acts out the mechanism (ORIENT Q8). If you cannot say what the signature
shows in one sentence, the brief is not ready — and the score written at PACKAGE will not be either.

### 6. The Feel Brief — output: `feel-profile.json` ★v6

```json
{
  "lens": "One sentence: how should the audience feel when they arrive?",
  "primary_emotion": "What users feel FIRST, within 3 seconds",
  "secondary_emotions": ["What sustains the experience"],
  "aspirational_target": "What they feel AFTER — the transformation",
  "anti_feelings": ["lifeless / mechanical", "Hard rule — ANY decision evoking these is VETOED"],
  "reference_vibe": "Walking into ______ — a place with light, temperature and tempo",
  "sensory_keywords": ["5–9 words, e.g. forged · cinematic · warm metallics · haptic depth · tinted darkness"],
  "feel_line": "3 adjectives · 1 material · 1 tempo",
  "subject_vocabulary": { "nouns": [], "verbs": [], "materials": [], "proof_state": "" },
  "kinetic_signature": {
    "personality": "silk | tide | gravity | spark | snap | bloom",
    "accent_personality": "bloom (the signature only) | null",
    "tempos": { "hands": "0.15–0.5s", "entrances": "0.8–1.4s", "ambience": "4–36s, co-prime" },
    "arrival": "what the first ≤ 1.5 s does — one sentence",
    "heartbeat": "the one perpetual element, its periods (co-prime) and amplitude",
    "hand_feel": "how controls answer the hand — lift, press, lean",
    "breath": "the air and the one ambient layer (grain / light ladder / breathing mesh)",
    "signature_moment": "the one unforgettable moment — it acts out the mechanism",
    "still_path": "what reduced motion shows — the composed final frame"
  },
  "signature": {
    "mechanism_sentence": "from ORIENT Q8",
    "beats": ["arrive", "commit", "resolve"],
    "chapter_ranges": "which acts carry the signature"
  },
  "brand_personality_matrix": { "...": "..." }
}
```

Anti-feelings are explicitly defined (this prevents drift). **"Lifeless / mechanical" is the
default anti-feeling of every project, at every register — calm is not dead.** Sensory words — the
lens, the reference vibe, the keywords — are required *inputs* here; they are banned only later, as
unproven completion claims (*Adjectives direct. Evidence proves.*).

### 7. The Four System Outputs + the DIS (v4, carried)

The same file carries the four system outputs the build agents read (SKILL.md 2.6 — moved into
Phase 2 in v6 from a merge splice that had buried it inside Phase 3):

```json
{
  "feel": { "primary_emotion": "", "anti_feelings": [], "reference_vibe": "" },
  "brand_personality_matrix": { "minimal_vs_maximal": 5, "...": 5 },
  "typography": {
    "personality": "EXPRESSIVE | EDITORIAL | COMMANDING | REFINED | FUNCTIONAL",
    "display_font": "", "body_font": "", "accent_font": "",
    "display_entry_animation": "char-stagger | word-fade | block-fade | none",
    "heading_tracking": "-0.03em", "body_line_height": "1.7",
    "font_records": ["license-checked FontRecords — references/typography-system.md Step 0"]
  },
  "color": {
    "primary_oklch": "derived from DNA — never a house default (Palette Derivation, §17)",
    "harmony": "analogous | complementary | monochromatic",
    "gradient_mesh": true, "mesh_intensity": "deep | vibrant | light | none",
    "grain_overlay": true, "grain_opacity": 0.035,
    "shadow_tint": true, "dark_mode": false
  },
  "motion": {
    "tier": "1 | 2 | 3 | 4",
    "hero_animation": "fade | type-reveal | full-choreography | immersive",
    "scroll_sequences": false, "magnetic_cursor": false,
    "three_js": false, "page_transitions": false
  },
  "layout": {
    "spacing_scale": "8pt | modular | golden | freeform",
    "column_system": "12-col | asymmetric | sidebar | bento",
    "container_max": "1280px", "section_rhythm": "standard | contrast-heavy | editorial"
  }
}
```

**BPM → asset style (SKILL.md 2.7):**
```
Bold 8-10 + Avant-garde 8-10 → Custom 3D, WebGL, cinematic loops (Blender / Seedance when on — §24)
Bold 5-7 + Refined 6-10      → Flow interpolation, subtle parallax frames
Bold 1-4 + Classic 7-10      → Static hero images with a living entrance, minimal motion
Playful 7-10                  → Animated illustrations, GIF-style loops
Serious 8-10 + Technical 7-10 → Data visualization, clean transitions
```

Then compute `design_intensity` (the nine DIS systems) per
[references/design-intensity-scale.md](../references/design-intensity-scale.md) — ★v6 its step 0
reserves the aliveness floor before any cap is applied; no later step removes it.

→ READ: references/typography-system.md, references/color-system.md,
         references/motion-language.md, references/motion-budget.md, references/grid-rhythm.md

### GATE 2 ★v6 — the Feel Brief is complete

```
□ lens is one sentence a person would say (not blank, not "premium")
□ reference_vibe is a place with light, temperature and tempo
□ kinetic_signature fully filled — personality, arrival, heartbeat, hand_feel, breath,
  signature_moment, still_path (an empty kinetic signature FAILS the gate)
□ anti_feelings include "lifeless / mechanical"
□ mechanism_sentence carried from ORIENT (or the gap is escalated — never invented)
```

## Phase 2 Completion Criteria

- [ ] All site copy read and tone documented
- [ ] Imagery style catalogued
- [ ] Palette decoded into emotional signals
- [ ] ★v6 Lens written — one sentence a person would say — with the first-3-seconds / after timeline
- [ ] Feel Brief written — every field of `feel-profile.json` (lens … kinetic_signature … signature), not only the summary lines
- [ ] Anti-feelings explicitly defined (this prevents drift) — ★v6 always including "lifeless / mechanical"
- [ ] ★v6 GATE 2 passes

**Only proceed to Phase 3 when the Feel Brief passes GATE 2.**

---

*← [Phase 1: STUDY](01-study.md) | Back to [README](../README.md) | Next: [Phase 3: SCOUT →](03-scout.md)*
