# INTERACTION STATE LIBRARY
## *Iron Canvas — Agent-C Addendum*

> Beautiful sites are built from thousands of small craft decisions.
> This library defines every interactive state pattern Iron Canvas produces.
> Agent-C reads this before writing any component CSS or interaction code.

---

## RULE: STATE COMPLETENESS

Every interactive element must have ALL of these states designed:

```
Default → Hover → Focus → Active → Disabled (if applicable)

No exceptions. An un-designed focus state is an accessibility failure.
An un-designed disabled state is a UX failure.
Design all 5 before calling a component done.
```

---

## BUTTON SYSTEM

### Primary CTA Button

```css
.btn-primary {
  /* Default */
  background: var(--color-accent);
  color: white;
  padding: var(--space-3) var(--space-8);
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.45, 0, 0.55, 1), box-shadow 0.2s ease;
  box-shadow: 0 2px 8px oklch(from var(--color-accent) l c h / 0.3);

  /* Hover — GSAP magnetic (Tier 2+) or CSS lift (Tier 1) */
  /* CSS fallback: */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px oklch(from var(--color-accent) l c h / 0.4);
  }

  /* Focus — always visible, branded */
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px var(--color-surface),
      0 0 0 5px var(--color-accent);
  }

  /* Active */
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px oklch(from var(--color-accent) l c h / 0.3);
  }

  /* Disabled */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
}
```

### GSAP Magnetic Button (Tier 2-3)

```javascript
/* Inject into all .btn-primary elements when motion tier ≥ 2 */
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  const strength = 0.3;

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
});
```

---

## FORM INTERACTION PATTERNS

### Input States

```css
.input {
  /* Default */
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  color: var(--color-text);
  padding: var(--space-3) var(--space-4);
  border-radius: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;

  /* Focus — critical for accessibility */
  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px oklch(from var(--color-accent) l c h / 0.2);
  }

  /* Valid state */
  &:valid:not(:placeholder-shown) {
    border-color: oklch(0.65 0.20 150); /* green — use oklch for consistency */
  }

  /* Error state */
  &.input--error {
    border-color: oklch(0.60 0.22 25); /* red */
    background: oklch(0.60 0.22 25 / 0.05);
    box-shadow: 0 0 0 3px oklch(0.60 0.22 25 / 0.15);
  }
}
```

### Form Submission Animation (GSAP)

```javascript
/* Success: checkmark morphs in */
const successTimeline = gsap.timeline({ paused: true });
successTimeline
  .to('.form-submit-btn', { scale: 0.95, duration: 0.1 })
  .to('.form-submit-btn', {
    backgroundColor: 'oklch(0.65 0.20 150)',
    duration: 0.3,
    ease: 'power2.out'
  })
  .fromTo('.checkmark-icon',
    { scale: 0, opacity: 0, rotation: -45 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }
  )
  .from('.success-message', { y: 10, opacity: 0, duration: 0.4 });

/* On form success: */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // ... API call
  successTimeline.play();
});
```

---

## NAVIGATION STATES

### Nav Link Underline (Animated)

```css
.nav-link {
  position: relative;
  text-decoration: none;
  color: var(--color-text-muted);
  transition: color 0.2s;

  /* Animated underline */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color-accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.45, 0, 0.55, 1);
  }

  &:hover {
    color: var(--color-text);
    &::after { transform: scaleX(1); transform-origin: left; }
  }

  &.active {
    color: var(--color-text);
    &::after { transform: scaleX(1); }
  }
}
```

---

## LOADING STATES

### Skeleton Screen (content loading)

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-alt) 25%,
    oklch(from var(--color-surface-alt) calc(l + 0.05) c h) 50%,
    var(--color-surface-alt) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Page Loading (route transitions, TIER 3-4)

```javascript
/* Progress bar at top of page */
const loadBar = document.querySelector('.load-bar');

gsap.fromTo(loadBar,
  { scaleX: 0, transformOrigin: 'left' },
  { scaleX: 0.7, duration: 0.8, ease: 'power2.out' }
);

// On load complete:
gsap.to(loadBar, {
  scaleX: 1,
  duration: 0.3,
  ease: 'power2.in',
  onComplete: () => {
    gsap.to(loadBar, { opacity: 0, duration: 0.3, delay: 0.1 });
  }
});
```

---

## EMPTY STATES

When there is no content to display:

```html
<!-- Empty state template — always include an action -->
<div class="empty-state">
  <div class="empty-state__icon">
    <!-- SVG illustration — NOT a generic sad face -->
    <!-- Use a brand-relevant illustration -->
  </div>
  <h3 class="empty-state__title">Nothing here yet</h3>
  <p class="empty-state__description">
    [Context-specific explanation of why it's empty and what to do]
  </p>
  <a href="#" class="btn-primary">
    [Primary action to fill the empty state]
  </a>
</div>
```

**Empty state rules:**
- Always include a CTA — emptiness should be an invitation, not a dead end
- Write copy that speaks to the *next step*, not the absence
- Icon/illustration should match brand personality (not a generic clipboard icon)

---

## TOAST / NOTIFICATION PATTERNS

```javascript
/* GSAP toast system */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  gsap.fromTo(toast,
    { y: 20, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
  );

  gsap.to(toast, {
    y: -10, opacity: 0, scale: 0.9,
    duration: 0.3,
    delay: 3,
    ease: 'power2.in',
    onComplete: () => toast.remove()
  });
}
```

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 9999;
  backdrop-filter: blur(12px);

  &--success { background: oklch(0.25 0.08 150 / 0.9); color: oklch(0.75 0.15 150); }
  &--error   { background: oklch(0.25 0.08 25  / 0.9); color: oklch(0.75 0.15 25);  }
  &--info    { background: oklch(0.20 0.05 260 / 0.9); color: oklch(0.80 0.12 260); }
}
```

---

## HOVER CARD EFFECTS (Tier 2-3)

```javascript
/* 3D tilt on card hover */
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: y * -8,
      rotateY: x * 8,
      transformPerspective: 600,
      duration: 0.4,
      ease: 'power1.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0, rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});
```

---

## HIGH-END COMPONENT PATTERNS (v4.2)

### Double-Bezel ("Doppelrand") Card Architecture

Premium cards that look like machined hardware — a glass plate sitting in an aluminum tray.
Use when BPM luxury ≥ 7.

```css
/* Outer Shell */
.card-double-bezel {
  background: oklch(from var(--color-surface) calc(l - 0.03) c h);
  border: 1px solid oklch(from var(--color-text) l c h / 0.05);
  padding: 6px; /* p-1.5 */
  border-radius: 2rem;
}

/* Inner Core */
.card-double-bezel__inner {
  background: var(--color-surface);
  border-radius: calc(2rem - 0.375rem); /* concentric curve */
  padding: var(--space-8);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
}
```

### Button-in-Button Trailing Icon

Arrow icons nested in their own wrapper — never naked next to text.

```css
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3) var(--space-3) var(--space-6);
  border-radius: 9999px; /* full pill */
}

.btn-with-icon__arrow {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: oklch(from var(--color-text) l c h / 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}

.btn-with-icon:hover .btn-with-icon__arrow {
  transform: translate(2px, -1px) scale(1.05);
}
```

### Liquid Glass Refraction Panel

True glassmorphism with simulated edge refraction.

```css
.glass-panel {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  background: oklch(from var(--color-surface) l c h / 0.7);
  border: 1px solid oklch(from var(--color-text) l c h / 0.1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),   /* top edge refraction */
    inset 0 -1px 0 rgba(0, 0, 0, 0.05),        /* bottom edge */
    0 20px 40px -15px rgba(0, 0, 0, 0.08);      /* ambient shadow */
  border-radius: 1.5rem;
}
```

### Fluid Island Navigation

Floating glass pill nav with hamburger morph and staggered reveal.

```css
/* Closed state — floating pill */
.nav-island {
  position: fixed;
  top: 1.5rem; /* mt-6 */
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 9999px;
  backdrop-filter: blur(24px);
  background: oklch(from var(--color-surface) l c h / 0.85);
  border: 1px solid oklch(from var(--color-text) l c h / 0.08);
  padding: var(--space-2) var(--space-4);
  z-index: 100;
  transition: all 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  /* ★v6 note: `all` here animates width, height and top — layout properties that GATE 1 forbids.
     In production morph the pill with FLIP (measure → transform) or a same-document View
     Transition, and transition only transform, opacity and border-radius. */
}

/* Expanded overlay */
.nav-island.expanded {
  width: 100vw;
  height: 100dvh;
  top: 0;
  border-radius: 0;
  backdrop-filter: blur(48px);
  background: oklch(from var(--color-surface) l c h / 0.9);
}
```

```javascript
/* Hamburger morph to X */
const hamburgerMorph = gsap.timeline({ paused: true });
hamburgerMorph
  .to('.hamburger-line-1', { y: 6, rotation: 45, duration: 0.3, ease: 'power2.inOut' })
  .to('.hamburger-line-2', { opacity: 0, duration: 0.15 }, '<')
  .to('.hamburger-line-3', { y: -6, rotation: -45, duration: 0.3, ease: 'power2.inOut' }, '<');

/* Staggered nav link reveal */
const navReveal = gsap.timeline({ paused: true });
document.querySelectorAll('.nav-island-link').forEach((link, i) => {
  navReveal.fromTo(link,
    { y: 48, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
    i * 0.05 // stagger
  );
});
```

### Eyebrow Tags (Section Preheaders)

```css
.eyebrow {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.625rem; /* text-[10px] */
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 500;
  background: oklch(from var(--color-accent) l c h / 0.1);
  color: var(--color-accent);
}
```

---

## CREATIVE ARSENAL — NAMED PATTERNS (v4.2)

> Agents can reference these by name during Phase 5/6 when selecting interaction
> patterns. Each pattern has a recommended motion tier minimum.
> **Min Register** (★v6) is the lowest CD3 Treatment Register the pattern suits — R0 Utilitarian ·
> R1 Functional · R2 Editorial · R3 Maximalist · R4 Immersive (`references/claude-design-3.md`).
> Both minimums must hold: the register caps the treatment, the tier caps the motion.

### Navigation & Menus
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Mac OS Dock Magnification | Nav icons scale fluidly on hover proximity | Tier 3 | R2 |
| Magnetic Button | Buttons physically pull toward cursor | Tier 2 | R1 |
| Gooey Menu | Sub-items detach from main button like viscous liquid | Tier 3 | R2 |
| Dynamic Island | Pill-shaped UI morphing to show status/alerts | Tier 2 | R1 |
| Contextual Radial Menu | Circular menu expanding at click coordinates | Tier 3 | R2 |
| Floating Speed Dial | FAB springing out into curved secondary actions | Tier 2 | R1 |
| Mega Menu Reveal | Full-screen dropdowns with stagger-fade content | Tier 2 | R1 |

### Layout & Grids
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Bento Grid | Asymmetric, tile-based grouping (Apple Control Center) | Tier 1 | R0 |
| Masonry Layout | Staggered grid without fixed row heights (Pinterest) | Tier 1 | R0 |
| Chroma Grid | Grid tiles with continuously animating color gradients | Tier 3 | R3 |
| Split Screen Scroll | Two screen halves sliding in opposite directions | Tier 2 | R2 |
| Curtain Reveal | Hero section parting in the middle on scroll | Tier 3 | R2 |

### Cards & Containers
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Parallax Tilt Card | 3D-tilting card tracking mouse coordinates | Tier 2 | R2 |
| Spotlight Border Card | Card borders illuminating under cursor | Tier 2 | R1 |
| Glassmorphism Panel | Frosted glass with inner refraction borders | Tier 1 | R0 |
| Holographic Foil Card | Iridescent rainbow reflections shifting on hover | Tier 3 | R3 |
| Tinder Swipe Stack | Physical stack of cards user can swipe away | Tier 3 | R2 |
| Morphing Modal | Button seamlessly expanding into full-screen dialog | Tier 2 | R1 |

### Scroll Animations
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Sticky Scroll Stack | Cards stick and physically stack during scroll | Tier 2 | R1 |
| Horizontal Scroll Hijack | Vertical scroll → horizontal gallery pan | Tier 2 | R2 |
| Locomotive Scroll Sequence | Video/3D frames tied directly to scrollbar | Tier 2 | R2 |
| Zoom Parallax | Background image zooming in/out on scroll | Tier 2 | R2 |
| Scroll Progress Path | SVG vector lines drawing as user scrolls | Tier 2 | R1 |
| Liquid Swipe Transition | Page transitions wiping like viscous liquid | Tier 3 | R3 |

### Galleries & Media
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Dome Gallery | 3D gallery feeling like panoramic dome | Tier 3 | R3 |
| Coverflow Carousel | 3D carousel, center focused, edges angled back | Tier 2 | R2 |
| Drag-to-Pan Grid | Boundless grid draggable in any direction | Tier 3 | R3 |
| Accordion Image Slider | Narrow strips expanding fully on hover | Tier 1 | R1 |
| Hover Image Trail | Mouse leaves trail of popping/fading images | Tier 3 | R3 |
| Glitch Effect Image | RGB-channel shifting digital distortion on hover | Tier 2 | R2 |

### Typography & Text
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Kinetic Marquee | Text bands reversing/speeding on scroll | Tier 2 | R2 |
| Text Mask Reveal | Massive type as transparent window to video bg | Tier 3 | R3 |
| Text Scramble Effect | Matrix-style character decoding on load/hover | Tier 2 | R2 |
| Circular Text Path | Text curved along spinning circular path | Tier 2 | R2 |
| Gradient Stroke Animation | Outlined text with running gradient stroke | Tier 2 | R2 |
| Kinetic Typography Grid | Grid of letters dodging/rotating from cursor | Tier 3 | R3 |

### Micro-Interactions & Effects
| Pattern | Description | Min Tier | Min Register |
|---------|-------------|----------|--------------|
| Particle Explosion Button | CTAs shattering into particles on success | Tier 3 | R3 |
| Liquid Pull-to-Refresh | Mobile reload acting like water droplets | Tier 3 | R2 |
| Skeleton Shimmer | Shifting light reflections across placeholders | Tier 1 | R0 |
| Directional Hover Aware Button | Fill entering from mouse entry side | Tier 2 | R1 |
| Ripple Click Effect | Visual waves from precise click coordinates | Tier 2 | R1 |
| Animated SVG Line Drawing | Vectors drawing their own contours | Tier 2 | R1 |
| Mesh Gradient Background | Lava-lamp animated color blobs | Tier 2 | R2 |
| Lens Blur Depth | Dynamic focus blur highlighting foreground | Tier 2 | R0 |

---

*Iron Canvas v4.2 — references/interaction-library.md*
*Consumed by: agent-prompts/agent-c-ui.md*
*Creative Arsenal patterns derived from taste-skill analysis + Awwwards reference*
