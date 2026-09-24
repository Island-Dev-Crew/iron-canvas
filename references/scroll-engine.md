# Scroll Engine Reference — GSAP ScrollTrigger + HTML5 Canvas

> The technical deep-dive for building Apple-style scroll-driven image sequence animations.

## One Clock ★v6 (read first)

Scroll is the playhead, and there is exactly **one** of it per viewport:

- **Lenis only smooths native scroll** — import it from the `lenis` package, drive it from GSAP's
  ticker (`gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0)`), and decide
  reduced motion *before* constructing it (reduced motion gets native scroll, no Lenis at all).
- **ScrollTrigger reads it** — `lenis.on('scroll', ScrollTrigger.update)`.
- **WebGL and every DOM chapter subscribe to one progress value** — with the Score Runtime,
  `show.on('progress', (actId, p) => …)`; the frame sequence below *is* its section's `scrub` act,
  so the canvas draws from that progress instead of creating a second pinned trigger. Nothing reads
  `window.scrollY` on its own.
- **Programmatic jumps go through `lenis.scrollTo`** — never `window.scrollTo` beside a smoothed
  scroll.
- **Reduced motion neither pins nor scrubs:** the section rests on its designed still (the act's
  `reduced` meaning — often the final frame or the poster).

Two owners in one viewport — a pinned GSAP section and a WebGL camera reading scroll, or a
parallax library fighting Lenis — is **Anti-Pattern #19 TWO CLOCKS**: jumps stutter, `seek` lands
in the wrong place, the film and the page drift apart.

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

★v6: the entire GSAP toolset — ScrollTrigger, SplitText, Flip, MorphSVG, DrawSVG — is free since
GSAP 3.13 (see SKILL.md §12); check [gsap.com/pricing](https://gsap.com/pricing) for the current
terms. Smooth scroll, when used, is the `lenis` package (`npm install lenis`).

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
canvas.width = window.innerWidth * dpr;     // assigning width resets the context transform
canvas.height = window.innerHeight * dpr;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
// Draw in device pixels (canvas.width / canvas.height). Add ctx.scale(dpr, dpr) only if you
// draw in CSS pixels instead — never both, or every frame renders dpr× too large on HiDPI.
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
