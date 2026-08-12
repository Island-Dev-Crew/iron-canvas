# WebGL Immersion Reference

Use this when Iron Canvas selects IMMERSIVE mode.

## Stack Routing

- **Static/vanilla:** Three.js with explicit renderer lifecycle
- **React/Next:** React Three Fiber + dynamic client-only import
- **Simple 2D depth:** Canvas 2D / SVG / CSS transforms instead of WebGL
- **Launch video:** Remotion / Flow / Whisk assets when deterministic video is better than runtime 3D

## Technical Defaults

- `devicePixelRatio`: cap at `Math.min(window.devicePixelRatio, 2)`
- `prefers-reduced-motion`: render static final frame
- `powerPreference`: `high-performance` only for the scene canvas, not global UI
- `IntersectionObserver`: pause/stop frameloop when offscreen
- `visibilitychange`: pause when tab hidden
- Mobile: reduce particle density and avoid cursor-only affordances

## Control Surface Pattern

Every immersive scene needs one config file:

```ts
export const HERO = {
  emblem3D: true,
  camera: { z: 520, fov: 50 },
  bloom: { threshold: 0.14, smoothing: 0.86, intensity: 1.75, radius: 0.78 },
  fog: { enabled: true, color: '#06070B', near: 520, far: 1320 },
  emblem: {
    width: 228,
    metalness: 0.86,
    roughness: 0.34,
    envIntensity: 1.9,
    bobAmp: 9,
    bobSpeed: 0.68,
    tiltY: 0.18,
    tiltZ: 0.055,
  },
  density: { mobile: 0.42, tablet: 0.7 },
};
```

## Degradation Ladder

1. Full WebGL scene
2. Static canvas/SVG fallback if WebGL fails
3. Reduced-motion final frame
4. Kill switch (`emblem3D=false`, `webgl=false`, or equivalent)

## Common Failures

- Huge unmasked geometry reading as an accidental gray rectangle
- Console errors from unsupported JSX props inside R3F groups
- Tuning values scattered across scene files
- Mobile horizontal overflow from absolute hero elements
- Bloom that looks good on desktop but washes out on mobile
- Reduced-motion path still running RAF/parallax
- Calling the work premium without screenshot evidence

## Verification

Use `references/evidence-qa.md` and `templates/immersion-scorecard.md` before handoff.
