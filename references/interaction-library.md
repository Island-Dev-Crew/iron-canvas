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
  transition: transform 0.2s power1.inOut, box-shadow 0.2s ease;
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
    transition: transform 0.3s power1.inOut;
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

*Iron Canvas v4.2 — references/interaction-library.md*
*Consumed by: agent-prompts/agent-c-ui.md*
