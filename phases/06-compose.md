# Phase 6: COMPOSE — Integration, Scroll Engine & Assembly

> ⚠️ **THIS PHASE IS NEVER OPTIONAL.**
>
> Phase 6 always runs — even if Phase 5 was skipped.
> Phase 6 assembles everything from Agents A-D into a coherent,
> deployed product. Without Phase 6, generated artifacts sit in folders
> and the scroll engine never gets built.
>
> The Rule: Integration is not "upload and done."
> Every artifact must be verified IN CONTEXT. Screenshot. Evaluate. Adjust. Repeat.
>
> **★v6 — COMPOSE integrates promoted encodes only** — never a master, never an unselected
> candidate. What reaches the page came through the media tournament (Phase 5): selected with a
> written reason, verified, encoded, promoted into `public/` with a `.provenance.json` sidecar.
> COMPOSE is deterministic integration, not fan-out territory — it assembles the winners and
> keeps **one clock**: the score's scrub acts own the scroll; everything else subscribes.

---

## MANDATORY FIRST ACTION

```
READ: ROUTING.md → § PHASE 6 ROUTING DECISION TREE
READ: references/scroll-engine.md   (if scroll engine planned)
INJECT into Agent-B:
  references/expertise-injection.md  (GSAP + Lenis + Barba sections)
```

---

## STEP 1: CHECK INCOMING STATE

Before starting, verify what Phase 5 produced:

```
□ artifact-assessment.json exists?
  → If YES: what was the decision? (GENERATE / CONDITIONAL / SKIP)
  → If NO: run the Artifact Assessment Gate now (★v6 phases/03.9-package.md 3.9b —
    it moved from Phase 5 to the end of PACKAGE)

□ agent-d artifacts exist? (/agent-outputs/agent-d/)
  → If YES: proceed to image integration (Step 2)
  → If NO (SKIP decision): proceed to merge and structural work (Step 4)

□ ★v6 promoted encodes exist? (public/ — each generated file with its .provenance.json)
  → engines/ledger.mjs verify passes for every run
  → integrate ONLY these; a master or an unselected candidate never ships

□ scroll frames exist? (/agent-outputs/agent-d/frames/ — ★v6 or a scroll-tied encode in public/)
  → If YES: build scroll engine (Step 3)
  → If NO: skip scroll engine assembly

□ ★v6 score.json present and preflighted? (the acts, the signature, the clock the page performs)
```

---

## STEP 2: IMAGE INTEGRATION

For every artifact from Agent-D:

### Integration Process

```
1. Place artifact in the page HTML at its designated section
2. Screenshot the section with artifact in place
3. Evaluate 3 questions:
   a. Does it BLEND? (no floating object on mismatched background)
   b. Does the LIGHTING match surrounding elements?
   c. Does it FEEL like it was always part of this design?
4. Apply artifact-css.css from Agent-D
5. Adjust CSS if needed (see patterns below) — the integration levers (restored ★v6):
   - Overlay gradients to match surrounding darkness/lightness
   - Opacity tweaks
   - Blend modes (multiply for darker integration, screen for lighter)
   - Tint filters to match palette temperature
6. Check at 375px mobile viewport
7. If doesn't work → back to Agent-D → regenerate with adjusted prompt
8. ★v6 R2+: give it a living entrance and a slow life (Ken Burns drift, parallax band, light
   response) on the house personality — no image sits dead; stopped under reduced motion
```

### CSS Integration Patterns

```css
/* Darken image to match dark section */
.hero-image {
  filter: brightness(0.7) saturate(1.2);
}

/* Warm tint to match gold palette */
.product-image {
  filter: sepia(0.1) saturate(1.3);
}

/* Blend modes — multiply for darker integration (an image's white ground drops out and the
   result darkens: light sections), screen for lighter (an image's black ground drops out and the
   result lightens: dark sections) */
.product-image--multiply { mix-blend-mode: multiply; }
.product-image--screen   { mix-blend-mode: screen; }

/* Gradient overlay for text readability
   ★v6: the scrim is the section's own ground through its RGB mirror token, never a hard-coded hex */
.image-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgb(var(--bg-rgb) / 0.85) 0%, transparent 60%);
  pointer-events: none;
}

/* Fade edges into section background */
.product-hero-image {
  -webkit-mask-image: linear-gradient(
    to left,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to left,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
}
```

---

## STEP 3: SCROLL ENGINE ASSEMBLY

**Only if artifact-assessment.json shows scroll_engine_needed: true**

### Load First

```
READ: references/scroll-engine.md      ← FULL architecture, read completely
INJECT: references/expertise-injection.md → GSAP section into Agent-B
```

### Dispatch Agent-B with Scroll Engine Task

```
Agent-B: Implement scroll-engine.js per references/scroll-engine.md.
Frames are at: /agent-outputs/agent-d/frames/frame_0001.webp → frame_00XX.webp
Mobile frames at: /agent-outputs/agent-d/frames-mobile/
Total frame count: [from artifact-assessment.json]
Section: [from design-prd.md Section 4 scroll engine spec]
Content overlays: [from design-prd.md timing values]
```

### ★v6 — One clock: the sequence is a scrub act of the score

When the page performs a score, the frame sequence **is** its section's `scrub` act — the score
pins it and owns its scroll; the canvas only draws. Subscribe instead of creating a second pinned
ScrollTrigger over the same section (two owners in one viewport is Anti-Pattern #19 TWO CLOCKS):

```javascript
// runtime path — the score's scrub act is the clock; the canvas subscribes
const show = performScore(score, { hooks });
show.on('progress', (actId, p) => {
  if (actId === 'reveal') drawFrame(Math.round(p * (TOTAL_FRAMES - 1)));   // the act that owns #scroll-section
});
```

Under reduced motion the runtime neither pins nor scrubs: draw the act's designed still (its
`reduced` meaning — often the final frame or the poster) once, and let the page scroll natively.
The hand-written ScrollTrigger below is the no-runtime path; it must still be the only scroll
owner in its viewport.

### Core Implementation (Agent-B builds this)

```javascript
// scroll-engine.js
// READ references/scroll-engine.md for complete architecture

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 60; // from artifact-assessment.json
const frames = [];
let loadedCount = 0;

// STEP 1: Preload all frames (mandatory — never enable scroll before this)
function preloadFrames() {
  return new Promise((resolve) => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4,'0')}.webp`;
      img.onload = () => {
        loadedCount++;
        // Show loading progress to user
        const progress = loadedCount / TOTAL_FRAMES;
        document.querySelector('.loader-progress').style.width = `${progress * 100}%`;
        if (loadedCount === TOTAL_FRAMES) resolve();
      };
      img.onerror = () => {
        // Frame failed — still count it, show fallback if too many fail
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) resolve();
      };
      frames.push(img);
    }
  });
}

const canvas = document.getElementById('scroll-canvas');
const ctx = canvas.getContext('2d');

// Cover-fit frame to canvas
let currentFrame = 0;
function drawFrame(index) {
  const img = frames[Math.min(index, TOTAL_FRAMES - 1)];
  if (!img || !img.complete) return;
  currentFrame = index;
  const scale = Math.max(canvas.width/img.naturalWidth, canvas.height/img.naturalHeight);
  const x = (canvas.width - img.naturalWidth*scale) / 2;
  const y = (canvas.height - img.naturalHeight*scale) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, img.naturalWidth*scale, img.naturalHeight*scale);
}

// Handle resize
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = window.innerWidth * dpr;    // assigning width resets the context transform
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  // No ctx.scale(dpr, dpr): drawFrame() already works in device pixels (canvas.width/height);
  // scaling again would draw every frame dpr× too large on HiDPI screens.
  if (frames.length) drawFrame(currentFrame);   // a resize clears the canvas — repaint the last frame
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize after preload
preloadFrames().then(() => {
  document.querySelector('#frame-loader').style.display = 'none';
  drawFrame(0);

  // Fallback check
  if (loadedCount < TOTAL_FRAMES * 0.8) {
    canvas.style.display = 'none';
    document.querySelector('.scroll-static-fallback').style.display = 'block';
    return;
  }

  // Map scroll position to frames
  gsap.to({ frame: 0 }, {
    frame: TOTAL_FRAMES - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '#scroll-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,  // Higher = smoother but laggier
      pin: canvas,
    },
    onUpdate: function() {
      drawFrame(Math.round(this.targets()[0].frame));
    }
  });

  // Content overlays synced to scroll progress (from design-prd.md)
  // Add one gsap.fromTo per overlay, using percentages from PRD
  gsap.fromTo('.scroll-overlay-1',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0,
      scrollTrigger: {
        trigger: '#scroll-section',
        start: '10% top', end: '20% top',
        scrub: true
      }
    }
  );

  gsap.fromTo('.scroll-overlay-1',
    { opacity: 1 },
    { opacity: 0,
      scrollTrigger: {
        trigger: '#scroll-section',
        start: '25% top', end: '30% top',
        scrub: true
      }
    }
  );

  // Add additional overlays per design-prd.md Section 4 timing
});
```

### HTML Structure for Scroll Section

```html
<!-- Loading indicator (visible before frames load) — graceful progress, not a white screen.
     ★v6: colours from the tokens, never hard-coded hex (the loader is part of the brand moment) -->
<div id="frame-loader" style="position:fixed;inset:0;background:var(--color-bg);z-index:100;
     display:flex;flex-direction:column;align-items:center;justify-content:center;">
  <div class="loader-track" style="width:200px;height:2px;background:rgb(var(--accent-rgb) / 0.2);border-radius:1px;">
    <div class="loader-progress" style="height:100%;width:0%;background:var(--color-accent);transition:width 0.1s;border-radius:1px;"></div>
  </div>
  <p style="color:var(--color-accent);font-size:0.75rem;margin-top:1rem;letter-spacing:0.1em;text-transform:uppercase;">
    Loading Experience
  </p>
</div>

<!-- Static fallback (shown if frames fail to load) -->
<div class="scroll-static-fallback" style="display:none;">
  <img src="/public/images/iron-canvas/product-hero.webp"
       alt="[Product description]"
       width="1920" height="1080" loading="eager" />
</div>

<!-- Scroll sequence section -->
<section id="scroll-section" style="height: 500vh;" aria-label="Product reveal">
  <canvas id="scroll-canvas"
    style="position:sticky;top:0;width:100vw;height:100vh;display:block;"
    aria-hidden="true"></canvas>

  <!-- Content overlays (positioned absolute within section) -->
  <div class="scroll-overlay-1" style="position:absolute;top:15%;left:0;right:0;
       text-align:center;z-index:2;pointer-events:none;opacity:0;">
    <h2>Crafted with intention</h2>
    <p>Every ingredient chosen for your skin</p>
  </div>

  <div class="scroll-overlay-2" style="position:absolute;top:40%;left:0;right:0;
       text-align:center;z-index:2;pointer-events:none;opacity:0;">
    <h2>Pure luxury, no compromise</h2>
    <p>Limited batches. When it's gone, it's gone.</p>
  </div>
</section>
```

### Mobile Optimization

```javascript
// Detect mobile, serve lower-res frames
const isMobile = window.innerWidth < 768;
const FRAME_PATH = isMobile ? '/frames-mobile/frame_' : '/frames/frame_';
const FRAME_EXT = '.webp';
// ★v6 restored recipe — reduce frame count on mobile
const FRAME_STEP = isMobile ? 2 : 1; // Every other frame on mobile
const EFFECTIVE_FRAMES = Math.ceil(TOTAL_FRAMES / FRAME_STEP);
// Preload frame (1 + i * FRAME_STEP) for i = 0 … EFFECTIVE_FRAMES - 1, and scrub
// { frame: 0 } → { frame: EFFECTIVE_FRAMES - 1 } — the same sequence at half the payload.
```

The mobile fallback for a heavy sequence is fewer frames (`frames-mobile/`, `FRAME_STEP`) or a
static poster — never a `<video>` (Anti-Pattern #7; a *looping* background may be muted video).

---

## STEP 4: AGENT MERGE SEQUENCE

Merge all agent outputs in this exact order:

```
1. Start with Agent-A output:
   - tokens.css → link in <head>
   - index.html → base scaffold
   - base.css → link in <head>

2. Layer Agent-B (motion):
   - ★v6 Add motion.js + canvas-score.js (performs score.json) — or the framework port
   - Add scroll.js, load-sequence.js to scripts
   - Add scroll-engine.js if scroll frames present
   - Add transitions.js if page transitions planned
   - Wire data-magnetic, data-scroll-section, .reveal attrs to Agent-A HTML
   - ★v6 Confirm the act ids (id="act-<id>") match the score, every entrance target carries
     data-ic, the heartbeat wrapper carries data-breath, and ic-js + the 3 s failsafe sit in <head>

3. Layer Agent-C (UI/UX):
   - Add components.css after base.css
   - Add interactions.js (cursor init, nav scroll behavior)
   - Verify all 3-state interactions are in place — ★v6 the hand-feel floor on every control

4. Integrate Agent-D (artifacts):
   - Place each artifact at its designated location in HTML
   - Link artifact-css.css
   - Run in-situ test per Step 2
   - Verify all artifacts blend
   - ★v6 Promoted encodes only (public/ + .provenance.json); `engines/ledger.mjs verify` passes

4b. ★v6 Integrate Agent-F (when depth ≥ 0.4):
   - The scene subscribes to the score's progress (show.on('progress')) — no scroll listener of its own
   - Budgeted GLBs lazy-load behind the DOM shell; the fallback ladder reaches Tier I, never flat

5. Implement Agent-E fixes:
   - Apply all CRITICAL fixes immediately
   - Apply all HIGH fixes before deploy
   - Log MEDIUM and LOW for future iteration
```

---

## STEP 5: PAGE TRANSITIONS (if specified in design-prd.md)

```
INJECT: references/expertise-injection.md → Barba.js section into Agent-B

Agent-B implements transitions.js — ★v6 the transition is chosen by the feeling it serves (PRD §4):
  - fade-through-black → cinematic · curtain (the Iron Curtain, scaleY) → theatrical
  - shared-element morph → seamless · colour flood → brand-forward
  - WebGL distortion → psychedelic (R3+ only) · zoom in/out → magazine
  - Calls runLoadSequence() in enter() callback (★v6 with the runtime: performScore(nextScore))
  - Kills all ScrollTrigger instances in leave() callback (★v6 with the runtime: show.kill())
  - Re-initializes Lenis in enter() callback (lenis.destroy() in leave; gsap.context scoped to the new container)
  - ★v6 single-page apps: same-document View Transitions can carry the transition natively;
    cross-document @view-transition is progressive enhancement only
```

---

## STEP 6: VERIFY ALL INTEGRATION

```
□ Screenshot every section at desktop (1440px)
□ Screenshot every section at mobile (375px)
□ All artifacts in place and blending (3-question test per artifact)
□ Scroll engine: frames load → progress indicator works → scrubs smoothly
□ Scroll overlays appear and disappear at correct scroll percentages
□ Reverse scroll (up) plays frames backward correctly
□ Static fallback shows if frames fail
□ Page transitions fire on nav link click (if implemented)
□ Load sequence fires on fresh page load (check Network tab → throttle to Slow 3G)
□ Loading: graceful progress indicator, not white screen
□ Mobile: scroll engine serves mobile frames, no horizontal scroll, 30fps minimum
□ ★v6 One clock: exactly one scroll owner per viewport; the WebGL scene and DOM chapters subscribe
□ ★v6 Reduced motion: every entrance target at its final state; no pins, no scrubs, no breath —
  the composed still, never blank
□ ★v6 Alive at rest: the heartbeat runs in view, pauses off-screen and on a hidden tab
```

---

## PHASE 6 COMPLETION CRITERIA

```
□ All Agent-D artifacts integrated and verified in situ
□ ★v6 Only promoted encodes integrated — each generated file has its .provenance.json
□ ★v6 The score performed end to end; one clock; the ic-js failsafe present
□ Scroll engine built and functional (if scroll_engine_needed: true)
□ Frame preloader shows progress before scroll activates
□ Content overlays sync with scroll timing from PRD
□ Static fallback functional if frames fail
□ All Agent-E critical fixes applied
□ Agent merge complete (A→B→C→D→E order)
□ Desktop and mobile screenshots reviewed
□ Implementation files in /implementation/ folder
□ Public assets (images, frames) in /implementation/public/

READY FOR: Phase 7 → phases/07-refine.md
```

---

## COMMON PHASE 6 FAILURES & FIXES

```
FAILURE: "Generated artifacts are in the folder but not on the site"
FIX: You merged agent outputs but didn't run in-situ placement.
     Each artifact needs to be manually placed in the HTML AND verified.

FAILURE: "Scroll engine works but frames look wrong at certain positions"
FIX: Frame gap — add intermediate frames around the problem region.
     Or increase scrub value (0.5 → 1.0) for smoother progression.

FAILURE: "Canvas is blank on iOS Safari"
FIX: iOS Safari requires user interaction before some canvas operations.
     Add a tap-to-begin fallback or verify canvas context is created after
     first touch event.

FAILURE: "Page transition fires but new page loads without animations"
FIX: runLoadSequence() must be called inside Barba.js enter() callback.
     Also re-initialize Lenis and ScrollTrigger.refresh() in enter().

FAILURE: "Everything looks fine on desktop but broken on mobile"
FIX: Check min-height: 100dvh (not 100vh).
     Check touch target sizes ≥ 44px.
     Check scroll engine is serving frames-mobile/ set.
     Check no horizontal overflow from fixed-width elements.

FAILURE: "Jumps stutter, seek lands in the wrong place, the film and the page drift apart" ★v6
FIX: Two clocks (Anti-Pattern #19). Only the score's scrub acts own scroll; Lenis only
     smooths native scroll; the WebGL scene and the frame canvas subscribe to progress;
     programmatic jumps route through lenis.scrollTo.

FAILURE: "Reduced motion shows a blank section" ★v6
FIX: An entrance target stayed hidden. Mark ic-js in <head> with the 3 s failsafe; in
     reduced mode set every [data-ic] to its final state before anything else runs.
```

---
*← [Phase 5: GENERATE](05-generate.md) | Back to [ROUTING.md](../ROUTING.md) | Next: [Phase 7: REFINE →](07-refine.md)*
