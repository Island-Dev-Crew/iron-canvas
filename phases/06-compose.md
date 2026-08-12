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
  → If NO: run the Artifact Assessment Gate now (phases/05-generate.md Step 1)

□ agent-d artifacts exist? (/agent-outputs/agent-d/)
  → If YES: proceed to image integration (Step 2)
  → If NO (SKIP decision): proceed to merge and structural work (Step 4)

□ scroll frames exist? (/agent-outputs/agent-d/frames/)
  → If YES: build scroll engine (Step 3)
  → If NO: skip scroll engine assembly
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
5. Adjust CSS if needed (see patterns below)
6. Check at 375px mobile viewport
7. If doesn't work → back to Agent-D → regenerate with adjusted prompt
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

/* Gradient overlay for text readability */
.image-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(10,14,20,0.85) 0%, transparent 60%);
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
function drawFrame(index) {
  const img = frames[Math.min(index, TOTAL_FRAMES - 1)];
  if (!img || !img.complete) return;
  const scale = Math.max(canvas.width/img.naturalWidth, canvas.height/img.naturalHeight);
  const x = (canvas.width - img.naturalWidth*scale) / 2;
  const y = (canvas.height - img.naturalHeight*scale) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, img.naturalWidth*scale, img.naturalHeight*scale);
}

// Handle resize
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
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
<!-- Loading indicator (visible before frames load) -->
<div id="frame-loader" style="position:fixed;inset:0;background:#0a0e14;z-index:100;
     display:flex;flex-direction:column;align-items:center;justify-content:center;">
  <div class="loader-track" style="width:200px;height:2px;background:rgba(201,168,76,0.2);border-radius:1px;">
    <div class="loader-progress" style="height:100%;width:0%;background:#c9a84c;transition:width 0.1s;border-radius:1px;"></div>
  </div>
  <p style="color:#c9a84c;font-size:0.75rem;margin-top:1rem;letter-spacing:0.1em;text-transform:uppercase;">
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
// Adjust TOTAL_FRAMES: mobile can use every other frame for performance
// const MOBILE_STEP = isMobile ? 2 : 1;
```

---

## STEP 4: AGENT MERGE SEQUENCE

Merge all agent outputs in this exact order:

```
1. Start with Agent-A output:
   - tokens.css → link in <head>
   - index.html → base scaffold
   - base.css → link in <head>

2. Layer Agent-B (motion):
   - Add scroll.js, load-sequence.js to scripts
   - Add scroll-engine.js if scroll frames present
   - Add transitions.js if page transitions planned
   - Wire data-magnetic, data-scroll-section, .reveal attrs to Agent-A HTML

3. Layer Agent-C (UI/UX):
   - Add components.css after base.css
   - Add interactions.js (cursor init, nav scroll behavior)
   - Verify all 3-state interactions are in place

4. Integrate Agent-D (artifacts):
   - Place each artifact at its designated location in HTML
   - Link artifact-css.css
   - Run in-situ test per Step 2
   - Verify all artifacts blend

5. Implement Agent-E fixes:
   - Apply all CRITICAL fixes immediately
   - Apply all HIGH fixes before deploy
   - Log MEDIUM and LOW for future iteration
```

---

## STEP 5: PAGE TRANSITIONS (if specified in design-prd.md)

```
INJECT: references/expertise-injection.md → Barba.js section into Agent-B

Agent-B implements transitions.js:
  - Iron Curtain: scaleY reveal (Iron Canvas signature)
  - Or other transition from PRD Section 4
  - Calls runLoadSequence() in enter() callback
  - Kills all ScrollTrigger instances in leave() callback
  - Re-initializes Lenis in enter() callback
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
□ Mobile: scroll engine serves mobile frames, no horizontal scroll, 30fps minimum
```

---

## PHASE 6 COMPLETION CRITERIA

```
□ All Agent-D artifacts integrated and verified in situ
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
```

---
*← [Phase 5: GENERATE](05-generate.md) | Back to [ROUTING.md](../ROUTING.md) | Next: [Phase 7: REFINE →](07-refine.md)*
