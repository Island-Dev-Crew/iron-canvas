---
name: iron-canvas-3-forge
description: >
  Sub-skill 3 of 4 in the Iron Canvas Master pipeline.
  Production code generation — translates design_brief.json and motion_blueprint.json
  into production-grade, Awwwards-quality animated web experiences.
  Executes in 3 distinct phases: Foundation, Motion, Polish.
  Must be run AFTER Protocols 1 and 2 complete.
  
  Triggers: "build it", "implement the animations", "write the code",
  "generate the HTML/CSS/JS", "create the web experience", "build the site"
parent_skill: iron-canvas-master
protocol: 3 of 4
requires: design_brief.json, motion_blueprint.json
---

# IRON CANVAS — PROTOCOL 3: IRON CANVAS FORGE
### *Production Code Generation — 3-Phase Build*

> **Execute phases in strict order. NEVER blend phases.**
> Phase 1 must be complete before Phase 2. Phase 2 before Phase 3.

---

## PHASE 1 — STRUCTURAL FOUNDATION
*Design DNA baked into every layer of the code*

### 1A: DESIGN TOKEN SYSTEM (Always first)

Generate the complete CSS custom properties system from `design_brief.json`.
Never hardcode any value that should be a token.

```css
:root {
  /* COLORS — from design_brief.json color_dna */
  --color-bg:           [dominant];
  --color-bg-2:         [secondary];
  --color-text:         [text_primary];
  --color-text-muted:   [text_secondary];
  --color-accent:       [accent_primary];
  --color-accent-2:     [accent_secondary];
  --color-border:       rgba(var(--color-text-rgb), 0.12);
  
  /* TYPOGRAPHY */
  --font-display: '[display_font]', serif;
  --font-body:    '[body_font]', sans-serif;
  --font-mono:    '[mono_font]', monospace;
  
  /* FLUID TYPE SCALE (clamp: mobile → desktop) */
  --text-xs:   clamp(0.75rem, 1.5vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 2vw, 1rem);
  --text-base: clamp(1rem, 2.5vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 3vw, 1.25rem);
  --text-xl:   clamp(1.25rem, 3.5vw, 1.5rem);
  --text-2xl:  clamp(1.5rem, 4vw, 2rem);
  --text-3xl:  clamp(2rem, 5vw, 3rem);
  --text-hero: clamp(3.5rem, 9vw, 8rem);
  
  /* SPACING */
  --space-1:       0.25rem;
  --space-2:       0.5rem;
  --space-4:       1rem;
  --space-8:       2rem;
  --space-16:      4rem;
  --space-section: clamp(5rem, 12vw, 10rem);
  
  /* MOTION — from motion_blueprint.json */
  --ease-hero:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:    150ms;
  --dur-normal:  300ms;
  --dur-slow:    600ms;
  --dur-hero:    1000ms;
  
  /* LAYERS */
  --z-base:   0;
  --z-raised: 10;
  --z-sticky: 200;
  --z-modal:  300;
  --z-cursor: 9999;
  --shadow-md: 0 4px 20px rgba(0,0,0,.15);
  --shadow-lg: 0 20px 60px rgba(0,0,0,.20);
}
```

### 1B: SEMANTIC HTML ARCHITECTURE

```html
<body data-scroll-container>
  <!-- Decorative canvas (if WebGL) -->
  <canvas id="webgl-canvas" aria-hidden="true"></canvas>
  
  <!-- Custom cursor (if specified in motion_blueprint) -->
  <div class="cursor" aria-hidden="true">
    <div class="cursor__dot"></div>
    <div class="cursor__ring"></div>
  </div>
  
  <!-- Page transition overlay -->
  <div class="transition-overlay" aria-hidden="true"></div>
  
  <!-- Navigation -->
  <header class="nav" role="banner">
    <!-- Content from blueprint -->
  </header>
  
  <!-- Main content -->
  <main id="main-content">
    <!-- Each section: data-scroll-section + aria-label -->
    <section class="hero" data-scroll-section aria-label="Hero">
      <!-- Animation targets get data attributes for GSAP selectors -->
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__content">
        <h1 class="hero__title" data-split-text>Headline Here</h1>
        <p class="hero__subtitle">Subheading</p>
        <a class="hero__cta btn" data-magnetic>Call to Action</a>
      </div>
    </section>
    <!-- Additional sections follow same pattern -->
  </main>
  
  <footer role="contentinfo">...</footer>
</body>
```

### 1C: PERFORMANCE FOUNDATION

```javascript
// At the top of every main.js file:

// 1. Check reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// 2. Dynamic import heavy features
const init = async () => {
  if (prefersReducedMotion) {
    return initAccessibleFallback(); // Simple fade-in only
  }
  
  // Lazy load heavy features
  const [
    { initScrollAnimations },
    { initCursor },
    { initPageTransitions }
  ] = await Promise.all([
    import('./scroll.js'),
    import('./cursor.js'),
    import('./transitions.js')
  ]);
  
  initScrollAnimations();
  initCursor();
  initPageTransitions();
};

// 3. Only animate GPU-accelerated properties:
// ✅ transform (translate, scale, rotate)
// ✅ opacity
// ❌ top, left, width, height, margin, padding

document.addEventListener('DOMContentLoaded', init);
```

---

## PHASE 2 — MOTION IMPLEMENTATION
*Execute the motion_blueprint.json scene by scene*

### 2A: GSAP INITIALIZATION

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

// Lenis smooth scroll
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smoothWheel: true
});

// Sync Lenis with GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### 2B: LOAD CHOREOGRAPHY
*(Execute the Phase sequence from motion_blueprint.json)*

```javascript
const runLoadSequence = () => {
  // Pre-hide all animation targets
  gsap.set(['.hero__title', '.hero__subtitle', '.hero__cta'], {
    autoAlpha: 0, y: 50
  });
  
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.9 },
    delay: 0.1
  });
  
  // Phase 0: Background
  tl.to('.hero__bg', { autoAlpha: 1, duration: 0.6 }, 0);
  
  // Phase 2: Split headline
  const split = new SplitText('.hero__title', { type: 'words,chars' });
  tl.from(split.chars, {
    autoAlpha: 0, y: 80, rotateX: -90,
    stagger: 0.025, duration: 0.8
  }, 0.4);
  
  // Phase 3: Subheading
  tl.to('.hero__subtitle', { autoAlpha: 1, y: 0 }, 0.8);
  
  // Phase 4: CTA
  tl.to('.hero__cta', { autoAlpha: 1, y: 0 }, 1.0);
  
  // Phase 5: Nav
  tl.to('.nav', { autoAlpha: 1, y: 0 }, 1.2);
  
  return tl;
};
```

### 2C: SCROLL ANIMATIONS
*(Implement each section per the choreography map)*

```javascript
// PIN + SCRUB HERO
gsap.timeline({
  scrollTrigger: {
    trigger: '.hero', start: 'top top',
    end: 'bottom top', scrub: 1.5, pin: true
  }
})
.to('.hero__content', { autoAlpha: 0, y: -80, scale: 0.9, ease: 'none' })
.to('.hero__bg', { scale: 1.12, ease: 'none' }, 0);


// REVEAL ON ENTER (cards, content blocks)
gsap.utils.toArray('.reveal-element').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el, start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 50, autoAlpha: 0, duration: 0.8,
    delay: i * 0.08, ease: 'power2.out'
  });
});


// COUNTER ANIMATION
gsap.utils.toArray('[data-counter]').forEach(el => {
  const target = parseInt(el.dataset.counter);
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 80%' },
    textContent: 0, duration: 2, ease: 'power2.out',
    snap: { textContent: 1 }
  });
});
```

### 2D: CURSOR SYSTEM

```javascript
class IronCursor {
  constructor() {
    if ('ontouchstart' in window) return; // Skip on touch devices
    
    this.dot = document.querySelector('.cursor__dot');
    this.ring = document.querySelector('.cursor__ring');
    this.mouse = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    
    this.bindEvents();
    this.render();
  }
  
  bindEvents() {
    window.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
      this.mouse = { x, y };
    });
    
    // Magnetic elements
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mouseenter', () =>
        gsap.to(this.ring, { scale: 2.5, duration: 0.3 }));
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(el, { x: dx, y: dy, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        gsap.to(this.ring, { scale: 1, duration: 0.3 });
      });
    });
  }
  
  render() {
    // Lerp ring to mouse position
    this.pos.x += (this.mouse.x - this.pos.x) * 0.12;
    this.pos.y += (this.mouse.y - this.pos.y) * 0.12;
    gsap.set(this.ring, { x: this.pos.x, y: this.pos.y });
    gsap.set(this.dot, { x: this.mouse.x, y: this.mouse.y });
    requestAnimationFrame(() => this.render());
  }
}

new IronCursor();
```

### 2E: PAGE TRANSITIONS (Barba.js)

```javascript
import barba from '@barba/core';

barba.init({
  transitions: [{
    name: 'curtain',
    async leave() {
      await gsap.to('.transition-overlay', {
        scaleY: 1, transformOrigin: 'bottom center',
        duration: 0.55, ease: 'power3.inOut'
      });
    },
    async enter(data) {
      gsap.set(data.next.container, { autoAlpha: 1 });
      await gsap.to('.transition-overlay', {
        scaleY: 0, transformOrigin: 'top center',
        duration: 0.55, ease: 'power3.inOut', delay: 0.1
      });
      runLoadSequence(); // Re-run load animations on new page
    }
  }]
});
```

---

## PHASE 3 — THE POLISH PROTOCOL
*The 20% that creates 80% of perceived quality*

Work through this checklist completely before calling Gate 3:

### TYPOGRAPHY POLISH
- [ ] Hero headline: `clamp()` fluid sizing, tight letter-spacing (-0.02em on display)
- [ ] No orphaned words in any headline (use `&nbsp;` if needed)
- [ ] Body: line-height 1.65-1.75, comfortable measure (45-75 chars)
- [ ] Font loading: `font-display: swap`, `<link rel="preload">` for critical fonts
- [ ] Kerning: `font-kerning: normal` on display text

### COLOR & DEPTH
- [ ] Backgrounds: gradient mesh or layered colors (never flat)
- [ ] Subtle grain texture: SVG filter or `mix-blend-mode: overlay` noise layer
- [ ] Shadows: stacked multiple (`box-shadow: 0 2px 4px..., 0 8px 24px...`)
- [ ] Section transitions: gradient blends between sections (not hard cuts)
- [ ] All contrast ratios pass WCAG AA (4.5:1 minimum for body text)

### SPACING & RHYTHM
- [ ] Consistent use of `--space-section` for all section padding
- [ ] Every element has adequate breathing room
- [ ] Mobile spacing = ~50% of desktop spacing
- [ ] Vertical rhythm consistent throughout scroll

### INTERACTION TEXTURE
- [ ] Every button: 3 states defined (default, hover, active)
- [ ] Focus indicators: visible, styled (not just browser-default)
- [ ] All color transitions: minimum 200ms duration
- [ ] Physics-convincing animations (appropriate weight + momentum)

### ACCESSIBILITY
- [ ] `@media (prefers-reduced-motion: reduce)` — all animations disabled/simplified
- [ ] All images: `alt` text or `aria-hidden="true"` for decorative
- [ ] All interactive: keyboard accessible
- [ ] Decorative animations: `aria-hidden="true"`
- [ ] Forms: visible labels (not just placeholder)

### PERFORMANCE
- [ ] Images: WebP, `loading="lazy"`, `width` + `height` attributes (prevent CLS)
- [ ] Fonts: subsetted, preloaded
- [ ] JS: dynamic imports for non-critical features
- [ ] `will-change` applied before animation, `clearProps` used after
- [ ] Three.js: `renderer.dispose()` on unmount if applicable

---

## GATE 3 — IMPLEMENTATION FIDELITY CHECK

Score each item 1-5:

```
Design DNA Fidelity
  Colors match design_brief.json:            __/5
  Typography matches DNA:                    __/5
  Spatial system consistent:                 __/5

Motion Blueprint Compliance
  Load choreography matches blueprint:       __/5
  Scroll animations cover all sections:      __/5
  Cursor implemented as specified:           __/5
  Micro-interactions have all 3 states:      __/5

Code Quality
  Design tokens used (no hardcoded values):  __/5
  Performance guards in place:               __/5
  Accessibility requirements met:            __/5
  Reduced-motion fallback works:             __/5
  Mobile/responsive checked:                 __/5

TOTAL: __/60
```

**≥ 48/60 (80%): PASS → Call Protocol 4 (iron-canvas-4-verify)**
**36-47/60: CONDITIONAL PASS → Fix all items below 4**
**< 36/60: FAIL → Return to Phase 3 Polish and remediate**
