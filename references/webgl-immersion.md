# WebGL Immersion Reference

Use this when Iron Canvas selects IMMERSIVE mode.

## Stack Routing

- **Static/vanilla:** Three.js with explicit renderer lifecycle
- **React/Next:** React Three Fiber + dynamic client-only import
- **Simple 2D depth:** Canvas 2D / SVG / CSS transforms instead of WebGL
- **Launch video:** Remotion / Flow / Whisk assets when deterministic video is better than runtime 3D
  (★v6: HyperFrames is the default film renderer; Seedance 2.5 for photoreal shots)
- ★v6 **New Tier III worlds:** prefer `WebGPURenderer` with TSL node materials — one codebase
  compiles to WGSL (WebGPU) and GLSL (the WebGL2 fallback is automatic). Import three via an
  import map pinned to an exact version; addons from the same version.

## Technical Defaults

- `devicePixelRatio`: ★v6 `Math.min(window.devicePixelRatio, 1.5)` on desktop and `1` on mobile by
  default — `2` is the absolute ceiling, never the default
- `prefers-reduced-motion`: render static final frame
- `powerPreference`: `high-performance` only for the scene canvas, not global UI
- `IntersectionObserver`: pause/stop frameloop when offscreen
- `visibilitychange`: pause when tab hidden
- Mobile: reduce particle density and avoid cursor-only affordances

## Lifecycle Notes ★v6

- **One clock.** The camera is a pure function of the score's progress — subscribe with
  `show.on('progress', (actId, p) => world.setAct(actId, p))`; never read `window.scrollY`, never
  pin on your own. The signature act's `call` hook fires the peak.
- **The field recedes behind quiet chapters.** An ambient field dims and slows while the visitor
  reads (at most 30 % of the foreground's speed) and returns for the signature — the world listens.
- **Pause what nobody sees** — off-screen (IntersectionObserver) and on hidden tabs
  (`visibilitychange`); resume where it left off. `compileAsync` before the first frame.
- **Dispose everything** on unmount: renderer, render targets, geometries, materials, textures,
  the composer's passes. `WEBGL_lose_context` for hot-reload cleanup in development.
- **`preserveDrawingBuffer` only under `?qa`** (evidence capture reads pixels); never in
  production — it costs a copy every frame.
- **Colours come from the tokens.** CSS ships RGB mirrors as space-separated triplets
  (`--accent-rgb: 224 187 110`, used in CSS as `rgb(var(--accent-rgb) / 0.2)`); three.js reads the
  same triplet — never a hard-coded hex that drifts from the palette.
- **The clear-colour haze.** Through an `EffectComposer`, the renderer's clear colour is
  sRGB-encoded twice and lifts the whole frame into a grey haze. Clear to black and tint the ground
  with a CSS layer behind a transparent canvas.

## Control Surface Pattern

Every immersive scene needs one config file:

```ts
// ★v6: colours are read from the CSS RGB mirror tokens ("224 187 110"), never hard-coded.
// Pass each triplet through THREE.Color#setRGB(r, g, b, THREE.SRGBColorSpace).
const tokenRGB = (name: string): [number, number, number] => {
  const [r, g, b] = getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim().split(/\s+/).map((v) => Number(v) / 255);
  return [r, g, b];
};

export const HERO = {
  emblem3D: true,
  camera: { z: 520, fov: 50 },
  bloom: { threshold: 0.14, smoothing: 0.86, intensity: 1.75, radius: 0.78 },
  fog: { enabled: true, color: tokenRGB('--bg-rgb'), near: 520, far: 1320 },
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
  dpr: { desktop: 1.5, mobile: 1, ceiling: 2 },   // ★v6 defaults
};
```

## Degradation Ladder

1. Full WebGL scene
2. Static canvas/SVG fallback if WebGL fails
3. Reduced-motion final frame (★v6 the composed still — the designed final frame, never blank)
4. Kill switch (`emblem3D=false`, `webgl=false`, or equivalent)

## Common Failures

- Huge unmasked geometry reading as an accidental gray rectangle
- Console errors from unsupported JSX props inside R3F groups
- Tuning values scattered across scene files
- Mobile horizontal overflow from absolute hero elements
- Bloom that looks good on desktop but washes out on mobile
- Reduced-motion path still running RAF/parallax
- Calling the work premium without screenshot evidence
- ★v6 A mounted-but-black canvas — the canvas exists, frames drawn = 0 (a failed shader, a lost
  context, a camera inside the geometry); check frames drawn and the lit-pixel ratio at every station
- ★v6 A grey haze over the whole scene — the clear colour encoded to sRGB twice through the composer
- ★v6 Two scroll owners — the camera reading `window.scrollY` beside a pinned GSAP section
  (Anti-Pattern #19 TWO CLOCKS)
- ★v6 A world that never rests — the field at full speed behind the text someone is reading

## Verification

Use `references/evidence-qa.md` and `templates/immersion-scorecard.md` before handoff.
★v6: plus the station captures (`templates/scroll-capture.spec.ts` — every act at 1440×900 and
390×844) and the aliveness recordings. Headless SwiftShader under-reports frame rate — never
judge fps there.
