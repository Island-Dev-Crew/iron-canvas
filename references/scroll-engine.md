# Scroll Engine Reference — GSAP ScrollTrigger + HTML5 Canvas

> The technical deep-dive for building Apple-style scroll-driven image sequence animations.

## How It Works

A pre-rendered series of frames (extracted from video or AI-generated) is drawn onto an HTML5 `<canvas>` element. Scroll position maps directly to frame index. Scroll down = forward. Scroll up = reverse. It's a digital flipbook controlled by your thumb.

## Why Canvas, Not Video

| Feature | Canvas Frames | MP4 Video |
|---------|--------------|-----------|
| Scroll scrubbing | ✅ Pixel-perfect | ❌ Laggy/impossible |
| Reverse on scroll up | ✅ Instant | ❌ Not supported |
| Content overlay sync | ✅ Per-frame precision | ❌ Approximate at best |
| Performance | ✅ GPU-accelerated | ⚠️ Decode overhead |
| Mobile support | ✅ Universal | ⚠️ Autoplay restrictions |
| SEO/Accessibility | ⚠️ Needs fallback | ⚠️ Needs fallback |
| File size | ⚠️ ~3-5MB for 60 frames | ✅ ~1-2MB compressed |

## Architecture

```
┌─────────────────────────────────────────────┐
│                  VIEWPORT                    │
│  ┌───────────────────────────────────────┐  │
│  │  <canvas> (sticky, 100vw × 100vh)    │  │
│  │  Draws frames[currentIndex]           │  │
│  │                                       │  │
│  │  ┌─ Content Overlay Layer ──────────┐ │  │
│  │  │  Text, CTAs (absolute, z-index)  │ │  │
│  │  │  Opacity controlled by scroll %  │ │  │
│  │  └─────────────────────────────────┘ │  │
│  └───────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  Scroll Container: height = N × 100vh       │
│  (N = 5-8 for comfortable scrub pacing)     │
│  User scrolls through this tall container   │
│  which drives the animation                 │
└─────────────────────────────────────────────┘
```

## Dependencies

```bash
npm install gsap
```

GSAP's ScrollTrigger is free for most use cases. Check [gsap.com/pricing](https://gsap.com/pricing) for commercial licensing.

## Preloader Pattern

```javascript
function preloadFrames(totalFrames, pathTemplate, onProgress) {
  return new Promise((resolve) => {
    const frames = [];
    let loaded = 0;
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = pathTemplate.replace('{n}', String(i).padStart(4, '0'));
      img.onload = () => {
        loaded++;
        onProgress(loaded / totalFrames);
        if (loaded === totalFrames) resolve(frames);
      };
      img.onerror = () => {
        console.warn(`Frame ${i} failed to load`);
        loaded++;
        if (loaded === totalFrames) resolve(frames);
      };
      frames[i - 1] = img;
    }
  });
}

// Usage
const frames = await preloadFrames(
  60,
  '/frames/frame_{n}.webp',
  (progress) => {
    document.querySelector('.loader-bar').style.width = `${progress * 100}%`;
  }
);
```

## Performance Tips

1. **WebP format** — 30-50% smaller than PNG at equivalent quality
2. **Lazy resolution** — Serve 960×540 on mobile, 1920×1080 on desktop
3. **Frame budget** — 40-60 frames is the sweet spot (smooth but fast loading)
4. **CDN** — Host frames on a CDN with aggressive caching headers
5. **Intersection Observer** — Only start preloading when section is near viewport
6. **Canvas size** — Match `devicePixelRatio` for retina but cap at 2x

```javascript
const dpr = Math.min(window.devicePixelRatio, 2);
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);
```

## Content Overlay Timing

Map text appearances to scroll progress percentages:

```javascript
// Overlay appears at 10-20% scroll
gsap.fromTo('.callout-1',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#scroll-section',
      start: '10% top',
      end: '20% top',
      scrub: true,
    }
  }
);

// Overlay disappears at 25-30%
gsap.fromTo('.callout-1',
  { opacity: 1 },
  { opacity: 0,
    scrollTrigger: {
      trigger: '#scroll-section',
      start: '25% top',
      end: '30% top',
      scrub: true,
    }
  }
);
```

## Fallback Strategy

```javascript
// If frames fail to load, show static hero
if (loadedFrames < totalFrames * 0.8) {
  canvas.style.display = 'none';
  document.querySelector('.static-fallback').style.display = 'block';
}
```

## Real-World Examples

- [Apple AirPods Pro](https://www.apple.com/airpods-pro/) — Clean minimal scroll reveals
- [DJI Mavic 3](https://www.dji.com/en/mavic-3) — Product feature highlights
- [Scrollsequence Examples](https://scrollsequence.com/examples) — Various implementations
