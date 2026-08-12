---
name: iron-canvas-1-perception
description: >
  Sub-skill 1 of 4 in the Iron Canvas Master pipeline.
  Performs deep Design DNA extraction from existing sites, screenshots, codebases,
  or vision documents. Outputs design_brief.json — the DNA blueprint that governs
  all subsequent protocols. Call this first, before any design or code changes.
  
  Triggers: "analyze this site", "extract the design system", "understand the brand",
  "figure out the design DNA", "what's the design language here", "prep for redesign"
parent_skill: iron-canvas-master
protocol: 1 of 4
---

# IRON CANVAS — PROTOCOL 1: PERCEPTION PROTOCOL
### *Deep Design DNA Extraction & Intent Mapping*

> **This protocol must complete before any design or animation work begins.**
> Its output (`design_brief.json`) is the source of truth for all other protocols.

## EXECUTION STEPS

### STEP 1: ASSET ACQUISITION

Collect ALL available inputs. Check for:
- [ ] Site URL → fetch it
- [ ] Screenshots → analyze images
- [ ] Source code → inspect CSS, design tokens, component styles
- [ ] Brand guide / style doc → read it
- [ ] Video reference → search for frames, fetch live site, catalog techniques

**If video is referenced:**
```
1. Search: "[video title/ID] website design"
2. Search Awwwards, Codrops, Made With GSAP
3. Catalog every animation technique in the video:
   - Entry animations, scroll behaviors, cursor fx
   - Page transitions, 3D elements, text animations
   - Shader effects, micro-interactions
4. Document as technique_catalog[] in design_brief.json
```

**If insufficient inputs:**
→ Run § RX Research Extension (see Master SKILL.md)
→ Search competitors: "[industry] awwwards site of the day"
→ Report what was researched vs. assumed

---

### STEP 2: COLOR DNA EXTRACTION

Extract and document:
```json
{
  "color_dna": {
    "dominant": "#hex",
    "secondary": "#hex",
    "text_primary": "#hex",
    "text_secondary": "#hex",
    "accent_primary": "#hex",
    "accent_secondary": "#hex",
    "gradient_start": "#hex",
    "gradient_end": "#hex",
    "emotion": "description",
    "contrast_ratio": "WCAG AA/AAA",
    "color_temperature": "warm/cool/neutral",
    "saturation_character": "muted/vivid/earthy/neon"
  }
}
```

---

### STEP 3: TYPOGRAPHY DNA EXTRACTION

```json
{
  "typography_dna": {
    "display_font": "Name",
    "body_font": "Name",
    "mono_font": "Name or null",
    "scale_ratio": "1.25/1.333/1.5/custom",
    "weight_range": "e.g. 300-900",
    "letter_spacing_hero": "em value",
    "line_height_body": "value",
    "text_personality": "editorial/technical/humanist/geometric/expressive",
    "typographic_move": "The ONE memorable typographic decision"
  }
}
```

**CRITICAL:** If fonts are generic (Inter, Roboto, Arial) — flag this as a `[TYPE_GAP]`.

---

### STEP 4: SPATIAL & MOTION DNA

```json
{
  "spatial_dna": {
    "base_unit": "8px",
    "grid_columns": 12,
    "max_width": "1440px",
    "density": "airy/balanced/dense",
    "layout_personality": "centered/asymmetric/edge-to-edge/grid-breaking",
    "negative_space_use": "description"
  },
  "motion_dna": {
    "easing_character": "springy/mechanical/smooth/dramatic/organic",
    "duration_base": "300ms",
    "duration_hero": "900ms",
    "stagger_pattern": "sequential/random/radial/none",
    "scroll_behavior": "snap/smooth/locomotive/native",
    "existing_animations": [],
    "motion_personality": "One-word descriptor"
  }
}
```

---

### STEP 5: BRAND PERSONALITY MATRIX

Score each dimension 1-10:
```json
{
  "brand_personality": {
    "minimal_vs_maximal": 5,
    "serious_vs_playful": 5,
    "classic_vs_avant_garde": 5,
    "digital_vs_organic": 5,
    "quiet_vs_bold": 5,
    "fast_vs_contemplative": 5,
    "personality_summary": "2-sentence description of the brand's character"
  }
}
```

---

### STEP 6: INTENT ARCHAEOLOGY

```json
{
  "intent": {
    "audience": "Who arrives here and in what mental state",
    "primary_action": "Buy/sign up/explore/be impressed/learn",
    "target_emotion": "What they should feel in the first 3 seconds",
    "competitive_context": "SaaS/portfolio/e-commerce/campaign/other",
    "wow_moment": "The ONE thing that should make them screenshot"
  }
}
```

---

### STEP 7: ENHANCEMENT GAP ANALYSIS

List every gap found:
```json
{
  "enhancement_gaps": [
    {
      "type": "MOTION_GAP / COLOR_GAP / TYPE_GAP / SPATIAL_GAP / INTERACTION_GAP / 3D_GAP / TRANSITION_GAP",
      "description": "What's missing or wrong",
      "priority": "HIGH / MEDIUM / LOW",
      "leverage": "How much this would elevate the experience"
    }
  ],
  "existing_strengths": ["list what's already working"],
  "top_3_opportunities": ["The highest-ROI improvements"]
}
```

---

### GATE 1 — DNA COMPLETENESS CHECK

Score:
- [ ] Color system complete (8 values)? ✓/✗
- [ ] Typography identified? ✓/✗
- [ ] Spatial system defined? ✓/✗
- [ ] Motion DNA (≥3 properties)? ✓/✗
- [ ] Brand personality (all 6 scored)? ✓/✗
- [ ] Intent (all 5 answered)? ✓/✗
- [ ] Gaps (≥3 categorized)? ✓/✗

**7/7 = PASS → Call Protocol 2 (iron-canvas-2-motion)**
**5-6/7 = Run § RX then re-check**
**<5/7 = FAIL → Re-run this protocol**

---

### OUTPUT

Write `design_brief.json` with all extracted data.
Report findings to user/agent as a summary before proceeding.
