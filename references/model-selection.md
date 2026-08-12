# Model Selection Guide — v4.2

> Which AI model for which job. Choose based on the artifact type, not convenience.

## Quick Reference (v4 — Whisk + Flow added)

| Need | Primary | Alternative | Notes |
|------|---------|------------|-------|
| **Product stills** | Nano Banana Pro (Gemini 3 Pro) | GPT Image 1.5 | Best for photorealistic product shots |
| **Hero images** | Nano Banana Pro | Grok Imagine | Wide aspect ratios, atmospheric |
| **Icons/Small graphics** | Nano Banana Pro | GPT Image 1.5 | 1:1 aspect, transparent bg |
| **Reference cleanup** | **Google Whisk** ★v4 | Nano Banana Pro | Remove text/overlays from Pinterest refs |
| **Cinematic loops** | **Google Whisk** (animate) ★v4 | Kling 3 | Background loops (oscilloscope, matrix rain) |
| **Scroll transition source** | **Google Flow** ★v4 | Stitch | Start + end frame → interpolated video |
| **Video/Animation** | Kling 3 | Veo 3 | For motion sequences |
| **Start/End keyframes** | Stitch | **Google Flow** ★v4 | Frame interpolation between two images |
| **Product rotations** | Leonardo Product Spin Video | — | 360° sequences, extract frames |
| **Style matching** | Leonardo Style Transfer | — | Apply site identity to any image |
| **Scene placement** | Leonardo Product In Scene | — | Lifestyle product photography |
| **Relighting** | Leonardo Custom Relight | — | Match lighting across frames |
| **Background swap** | Leonardo Background Change | — | Context-match section backgrounds |
| **Canvas expansion** | Leonardo Instant Outpaint | — | Fill wider containers |
| **Scroll sequence** | **Flow interpolation** ★v4 (preferred) | Nano Banana Pro (keyframes) + ffmpeg | See scroll-engine.md |
| **OG image (social)** | Nano Banana Pro | GPT Image 1.5 | 1200×630px, always generated |

## v4 NEW ENGINES

### Google Whisk
**Access:** Type "Google Whisk" in browser
**Input:** Subject image + text prompt
**Output:** Cleaned reference image OR animated cinematic video loop

```
WORKFLOW A — Reference Cleanup:
  1. Upload subject (e.g., Pinterest reference with text overlay)
  2. Prompt: "Remove all text, clean seamless background, maintain style"
  3. Result: Clean reference for North Star validation

WORKFLOW B — Cinematic Background Loop:
  1. Generate or upload base image
  2. Click Animate button
  3. Prompt: "[motion description — oscillating, falling, rotating, pulsing]"
  4. Result: Seamless looping video for section backgrounds

CLASSIFICATION: Whisk animate output → LOOPING BACKGROUND category
  → autoplay + loop + muted in browser
  → z-index behind content with CSS opacity filters
```

### Google Flow
**Access:** Type "Google Flow" in browser
**Input:** Start frame image + end frame image
**Output:** Interpolated video transition between the two frames

```
WORKFLOW — Keyframe Interpolation for Scroll Sequences:
  1. Generate START frame (Whisk or Nano Banana Pro — the "before" state)
  2. Generate END frame (Whisk or Nano Banana Pro — the "after" state)
  3. Set type to "Frames to Video"
  4. Upload both frames
  5. Optional motion prompt for guidance
  6. Generate → receive interpolated video
  7. Extract frames at 15fps:
     ffmpeg -i flow-output.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%03d.jpg

CLASSIFICATION: Flow output → SCROLL-TIED category
  → Extract to individual frames at 15fps
  → Canvas component draws frames tied to ScrollTrigger progress

THIS IS THE v4 RECOMMENDED DEFAULT for scroll sequences.
More natural motion than individual prompts. Faster than generating 60 frames.
```

## Asset Classification Taxonomy ★v4

EVERY generated asset must be classified before integration:

```
SCROLL-TIED:        → 15fps JPEG frames → Canvas + ScrollTrigger
LOOPING BACKGROUND: → MP4 autoplay+loop+muted → z-index behind content
STATIC:             → WebP/AVIF optimized → loading="lazy" below fold
```

## Nano Banana Pro Commands

> **`generate-image`** denotes your configured image-generation tool or MCP (e.g. a Nano
> Banana Pro / Gemini 3 Pro Image wrapper, or any provider you wire up). The flags below are
> the interface Iron Canvas assumes — map `--prompt`, `--filename`, `--resolution`,
> `--aspect-ratio`, and `-i` (edit-from-image) to your provider's equivalent.

```bash
# Basic generation
generate-image \
  --prompt "your description" \
  --filename "output.png" \
  --resolution 2K

# Specific aspect ratio
generate-image \
  --prompt "hero banner" \
  --filename "hero.png" \
  --resolution 2K \
  --aspect-ratio 16:9

# Edit existing image
generate-image \
  --prompt "make the background darker, add gold rim lighting" \
  --filename "hero-v2.png" \
  -i hero.png \
  --resolution 2K

# OG Image (always generated)
generate-image \
  --prompt "[brand] social share image, 1200x630, [brand colors], [tagline]" \
  --filename "og-image.png" \
  --resolution 1K \
  --aspect-ratio 16:9
```

## Frame Extraction (v4 — 15fps default)

```bash
# v4 standard: 15fps (NOT 30fps — half the files, visually identical on web)
ffmpeg -i source.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%03d.jpg
ffmpeg -i source.mp4 -vf "fps=15,scale=960:540" frames-mobile/frame_%03d.jpg

# From Leonardo Product Spin Video (24fps source → 15fps web)
ffmpeg -i product_spin.mp4 -vf "fps=15,scale=1920:1080" frames/frame_%03d.webp

# Optimize WebP frames
for f in frames/*.webp; do cwebp -q 80 "$f" -o "$f"; done
```


---

## CODE-DRIVEN ENGINES ★v4.2

Sit ALONGSIDE the AI engines. Routed when the asset is geometric/data/logo/exact (not organic).

| Engine | Type | Best For | Cost |
|--------|------|----------|------|
| Inline SVG + CSS/SMIL | code → vector | logos, morphs, patterns, icons, dividers | free |
| GSAP DrawSVG / MorphSVG | code → vector motion | premium SVG choreography (flubber = free morph) | license |
| Remotion | code → video | data motion graphics, OG video, designed sequences | free |
| Hyperframes (A/B/C) | code → frames | deterministic scroll sequences (non-photographic) | free |
| p5.js / Canvas 2D | code → generative | flow fields, particles ≤2k, attractors | free |
| WebGL / GLSL | code → generative | noise gradients, shaders, particles ≤8k (Tier 3) | free |

DECISION: organic/photographic → AI engine. geometric/data/logo/exact → code-driven.
Prefer the lightest engine that hits the look. SVG that can stay live → keep it live.

→ references/code-driven-assets.md · references/algorithmic-art.md
