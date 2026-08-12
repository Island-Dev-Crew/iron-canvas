# Leonardo AI Blueprints — Integration Guide

> Pre-configured AI workflows for production-grade artifact generation.

## What Are Blueprints?

Leonardo AI Blueprints are ready-to-use AI pipelines that package optimal models, prompts, settings, and multi-step processes into one-click tools. They eliminate complex prompt engineering and deliver studio-quality results.

**Access:** [app.leonardo.ai](https://app.leonardo.ai/) → Blueprints, or [leonardo.ai/blueprints](https://leonardo.ai/blueprints)

## Blueprints Relevant to Iron Canvas

### Product Studio Photoshoot
**Use for:** Generating professional product photography angles
**Input:** Upload existing product photo
**Output:** Multiple studio-quality angles with consistent lighting
**Iron Canvas Phase:** 5 (GENERATE)

### Product In Scene
**Use for:** Placing products in lifestyle/contextual environments
**Input:** Product photo + scene description
**Output:** Product naturally integrated into environment (shelves, hands, surfaces, vanities)
**Iron Canvas Phase:** 5 (GENERATE)

### Product Spin Video
**Use for:** 360° product rotation → extract frames for scroll sequences
**Input:** Product photo
**Output:** Video of product rotating
**Post-processing:**
```bash
ffmpeg -i spin.mp4 -vf "fps=15" frame_%04d.png   # 15fps = canonical scroll-tied sweet spot (see references/video-integration-protocol.md)
```
**Iron Canvas Phase:** 5 (GENERATE) → feeds 6 (COMPOSE)

### Style Transfer / Aesthetic Mapping
**Use for:** Applying the site's exact visual identity to generated images
**Input:** Source image + style reference (screenshot of site)
**Output:** Image restyled to match site aesthetic
**Iron Canvas Phase:** 5 (GENERATE) — use after initial generation to match DNA

### Custom Relight
**Use for:** Matching lighting, shadows, and atmosphere across multiple frames
**Input:** Image + lighting description
**Output:** Image with adjusted lighting
**Iron Canvas Phase:** 5 (GENERATE) — critical for scroll sequence consistency

### Background Change
**Use for:** Swapping backgrounds to match different site sections
**Input:** Product image + background description
**Output:** Product on new background
**Iron Canvas Phase:** 5 (GENERATE) — dark backgrounds for hero, lighter for detail sections

### Instant Outpaint
**Use for:** Expanding images to fill wider containers
**Input:** Image + target dimensions
**Output:** Expanded image with AI-generated edges
**Iron Canvas Phase:** 6 (COMPOSE) — when images don't fit container aspect ratios

## API Access (Programmatic)

```bash
# List available Blueprints
GET https://cloud.leonardo.ai/api/rest/v1/blueprints

# Get Blueprint version details
GET https://cloud.leonardo.ai/api/rest/v1/blueprints/{id}/version/{versionId}

# Submit Blueprint job
POST https://cloud.leonardo.ai/api/rest/v1/blueprints/{id}/run
{
  "nodeInputs": {
    "imageUrl": "https://...",
    "prompt": "..."
  }
}

# Poll for results
GET https://cloud.leonardo.ai/api/rest/v1/generations/{generationId}
```

## Workflow: Blueprint → Iron Canvas

1. **Generate base product shot** with Nano Banana Pro (or upload real photo)
2. **Run through Product Studio Photoshoot** for professional angles
3. **Apply Style Transfer** using site screenshot as reference
4. **Run Custom Relight** for lighting consistency
5. **Extract frames** if using Product Spin Video
6. **Verify in Phase 6** — screenshot in context, evaluate blend

## Cost Considerations

- Free tier: Limited generations per day
- Pro plans: Higher volume, priority processing
- API: Token-based pricing per generation
- **Tip:** Generate variants in Leonardo, but do final tweaks/consistency with Nano Banana Pro (included with Gemini API key)
