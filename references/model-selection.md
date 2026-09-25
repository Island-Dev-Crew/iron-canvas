# Model Selection Guide — v4.2 (+ ★v6 Power Engines)

> Which AI model for which job. Choose based on the artifact type, not convenience.
> ★v6: code first — an engine earns its place only by adding what code cannot (exact sculpted
> geometry and baked light: Blender; photoreal motion with native sound: Seedance 2.5; bespoke
> sound: audio). Every choice below is judged later in the media tournament (Phase 5).

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
| **Film / seamless loops / transitions** ★v6 | **Seedance 2.5** (fal `bytedance/seedance-2.5/…`) | HyperFrames (designed motion) | Probe live before relying on this row; loops = first frame = last frame |
| **Hero 3D object / camera rail** ★v6 | **Blender** (headless) | procedural three.js | Budgeted GLBs; the clay rail drives the twin camera |
| **Designed motion film / OG video** ★v6 | **HyperFrames** (HTML → video) | Remotion (adapter) | Deterministic: seeked, never played |
| **Signature cues / ambient beds** ★v6 | ElevenLabs sound generation | synthesized WebAudio | Off by default in the page; a visible toggle |

★v6 — `Kling 3 / Veo 3` and every other video row: **probe live before relying on a registry
row.** Model names, modes, durations and prices move faster than this file.

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

## ★v6 POWER ENGINES — Seedance 2.5 · Blender · HyperFrames · audio

Optional, detected at ORIENT (`node engines/detect.mjs` — never provisioned), gated by the
register (R0/R1 off · R2 the signature only · R3 on · R4 on + twin camera), always degrading to a
named fallback. Doctrine: [power-engines.md](power-engines.md) · commands: `engines/README.md`.

| Engine | Access | Modes / jobs | Notes |
|--------|--------|--------------|-------|
| **Seedance 2.5** | fal `bytedance/seedance-2.5/text-to-video` · `…/image-to-video` · `…/reference-to-video` (`node engines/video/video.mjs plan\|run\|ingest --job shot.json`) | t2v · i2v (`image_url` + `end_image_url` — set first = last for a seamless loop) · reference-to-video (`image_urls`, `video_urls`, `audio_urls` — the twin camera's mode) · 480p / 720p / 1080p · duration `auto` or 4–30 s · `generate_audio` · `seed` | Prompt order FORMAT · REFERENCE ROLES · TIMELINE · CAMERA · CONTINUITY · AUDIO · CONSTRAINTS. ≈ $0.47/s at 720p (fal, 2026-07); `plan` prints the estimate before any spend. **Probe live before relying on this row.** |
| **Blender (headless)** | `blender --background --factory-startup --python engines/blender/blender_forge.py -- --job job.json --out <run>` (`node engines/blender/blender.mjs plan\|run --job`) | `clay-camera` (clay.mp4 + camera-rail.json) · `hero-object` (seeded Draco GLB + stats + turntable) · `turntable` · `matcap` | Budgets fail the job: Tier II ≤ 150k tris / 1.5 MB / 100 draw calls; Tier III ≤ 600k / 8 MB / 300. Never drive production through the Blender MCP. KTX2 is a post step (glTF-Transform). |
| **HyperFrames** | HTML + GSAP / three.js / CSS → MP4, MOV with alpha, WebM with alpha, PNG sequences (HeyGen, Apache-2.0) | the launch film, social cut-downs, README loops, OG video, designed scroll-tied frames | Determinism contract: timelines paused and seeked, never played; no wall clock; seeded randomness; assets loaded before frame 0; fps and size locked. `lint` / `check` / `snapshot` before render. |
| **Audio (ElevenLabs)** | `node engines/audio/audio.mjs plan\|run --job cue.json` | cues at the signature and the commit · beds at R3+ | With the engine off, ship no audio UI; WebAudio synth is the zero-payload fallback. |

**Live UI wins; record variance.** When a provider's live UI or API differs from this registry —
a renamed model, a new duration limit, a changed price, a mode that moved — the live surface wins.
Build against what is live and record the variance (what the registry said, what was found) in the
run's evidence and the asset's provenance.

**Never infer duration from the requested setting.** Every clip is ffprobed and hashed when it
enters the ledger; it is described by its measured length and size — a "10 s" request that
returns 9.5 s is a 9.5 s clip.

## Asset Classification Taxonomy ★v4

EVERY generated asset must be classified before integration:

```
SCROLL-TIED:        → 15fps JPEG frames → Canvas + ScrollTrigger
LOOPING BACKGROUND: → MP4 autoplay+loop+muted → z-index behind content
STATIC:             → WebP/AVIF optimized → loading="lazy" below fold
```

★v6 — seven classes: the three above, plus **CODE-DRIVEN** (SVG / canvas / generative, often stays
live — v4.2), **MESH** (Blender GLB, Draco, budgeted by tier, lazy-loaded behind the DOM shell),
**FILM** (Seedance 2.5 or HyperFrames: a 1080p + AAC brand-film encode, poster from 40 % in, never
autoplays with sound) and **CUE** (audio: off by default, behind a visible toggle, one cue per
signature commit). Every generated file ships with a `.provenance.json` sidecar (engines/ledger.mjs).

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
| GSAP DrawSVG / MorphSVG | code → vector motion | premium SVG choreography (flubber = alternative morph) | free since GSAP 3.13 ★v6 |
| Remotion | code → video | data motion graphics, OG video, designed sequences (★v6 an adapter for React-first teams) | free for individuals and teams ≤ 3; company licence above 3 employees ★v6 |
| Hyperframes (A/B/C) | code → frames | deterministic scroll sequences (non-photographic) | free |
| HyperFrames renderer ★v6 | HTML → video | the default film renderer (PREMIERE), OG video, designed loops | free (Apache-2.0) |
| p5.js / Canvas 2D | code → generative | flow fields, particles ≤2k, attractors | free |
| WebGL / GLSL | code → generative | noise gradients, shaders, particles ≤8k (Tier 3) | free |

DECISION: organic/photographic → AI engine. geometric/data/logo/exact → code-driven.
Prefer the lightest engine that hits the look. SVG that can stay live → keep it live.

→ references/code-driven-assets.md · references/algorithmic-art.md
