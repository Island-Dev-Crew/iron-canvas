# Prompt Engineering for Context-Aware Artifacts

> How to craft prompts that produce images that BELONG in the site, not just images that look cool.

## The Problem

Generic prompts produce generic images. "A luxury body butter jar" gives you something that might work... or might clash with the site's palette, lighting, mood, and container CSS. Context-aware prompts eliminate the guessing.

## Prompt Structure

```
[Subject] + [Material/Style] + [Colors (hex)] + [Lighting] + [Camera Angle] + [Background] + [Context] + [Negative]
```

## Component Breakdown

### Subject
Be hyper-specific about what the object IS:
- ❌ "a jar of body butter"
- ✅ "a 6oz body butter in a cylindrical matte black glass jar with a wide-mouth brushed gold screw-top lid, Crown Collection logo embossed in gold on the front center"

### Material/Style
Describe physical properties:
- "matte black glass" (not just "black")
- "brushed gold metal" (not just "gold")
- "soft-touch frosted" (for different jar types)
- "photorealistic product photography" (style direction)

### Colors (Include Hex Codes)
Reference the EXACT palette from Phase 1:
- "deep black background (#0A0A0A)"
- "warm gold accent lighting (#D4AF37)"
- "cream-colored product (#F5E6C8)"
- "subtle champagne highlights (#C9B48A)"

### Lighting
Describe direction, quality, and color:
- "soft studio lighting from upper-left, warm temperature"
- "single key light 45° from right, soft fill, no harsh shadows"
- "dramatic rim lighting from behind in gold tone"

### Camera Angle
Be precise:
- "front-facing, slightly elevated (15° above eye level)"
- "three-quarter view from right (30° rotation)"
- "top-down flat lay"
- "extreme close-up on texture"

### Background
Match the section where it'll live:
- "deep black background (#0A0A0A), seamless studio" (for hero sections)
- "transparent background" (for overlay compositions)
- "blurred lifestyle environment, warm tones" (for context shots)

### Context (How It Will Be Used)
Tell the model about the CSS environment:
- "This will be displayed at 400×400px inside a card with rounded corners"
- "This will be the hero banner at 1920×600px with a left-to-right dark gradient overlay on top"
- "This will be a small 200×200px thumbnail"

### Negative Constraints
Prevent palette/style drift:
- "no cold blue tones, no purple, no teal"
- "no flat illustration, no cartoon style"
- "no harsh shadows, no blown-out highlights"
- "no text or watermarks"

## Complete Prompt Examples

### Hero Product Shot
```
Luxury body butter in a matte black glass jar (6oz, wide-mouth) with brushed 
gold screw-top lid, "Crown Collection" embossed in gold on front center. 
Soft studio lighting from upper-left, warm color temperature. Front-facing 
view, slightly elevated 15 degrees. Deep black seamless background (#0A0A0A) 
with subtle warm gold (#D4AF37) rim light from behind. Photorealistic product 
photography, shallow depth of field. No cold tones, no blue, no flat illustration.
```

### Ingredient Explosion Frame
```
Same luxury body butter jar (matte black glass, brushed gold lid) with lid 
floating 3 inches above the open jar. Raw shea butter chunks, cocoa butter 
shavings, and honey droplets suspended in mid-air around the jar, caught in 
warm golden light. Black background (#0A0A0A), gold accent lighting (#D4AF37). 
Photorealistic, dramatic product photography, soft bokeh on floating ingredients. 
No cold tones, no purple, no neon.
```

### Lifestyle Context Shot
```
Woman's hands (dark skin, elegant nails) scooping cream from an open matte 
black glass jar with gold lid resting beside it on a marble vanity counter. 
Warm bathroom lighting, morning golden hour through a window. Shallow depth 
of field focused on the jar and hands. Warm neutral tones (#F5E6C8, #D4AF37, 
#0A0A0A). Photorealistic lifestyle photography. No cold tones, no clinical feel.
```

## Scroll Sequence Consistency

For frame sequences, establish a BASE PROMPT and only vary the action:

```
BASE: "luxury body butter jar, matte black glass container, brushed gold lid,
Crown Collection embossed logo, soft studio lighting from upper-left, 
black background (#0A0A0A), gold accent (#D4AF37), photorealistic product photography"

FRAME 01: [BASE] + ", jar centered, lid sealed, front view, subtle shadow beneath"
FRAME 02: [BASE] + ", jar centered, faint golden aura glowing from jar edges"
FRAME 03: [BASE] + ", lid tilted 10 degrees, thin line of golden light from gap"
FRAME 04: [BASE] + ", lid lifted 20 degrees, warm steam wisps rising"
FRAME 05: [BASE] + ", lid floating 1 inch above jar, cream surface visible"
```

**Key:** The BASE never changes. Only the action descriptor changes. This maximizes visual consistency across frames.

## Iteration Pattern

1. **First attempt** → Usually 60-70% right
2. **Evaluate** → What's off? Color? Angle? Material?
3. **Adjust prompt** → Add more specificity where it missed
4. **Re-generate** → Compare with attempt 1
5. **Select best** → Or combine elements in post-processing
