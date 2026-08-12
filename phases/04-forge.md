# Phase 4: FORGE — Structural Enhancement

> Upgrade the site's skeleton. Design engineering rules apply but must be ADAPTED to the existing design.

## The Rule

Respect the existing design. You're a surgeon adding capability, not an architect rebuilding from scratch. Every enhancement must feel like it was ALWAYS there.

> **★v5.2 — at R2–R4, FORGE runs as a GAUNTLET LOOP.** Where the register earns it, the
> structural build is not one-shot-and-refine: **fan out N candidate directions** for the
> signature surfaces (hero, key sections, the component/motion grammar), each `worktree-fleet`-
> isolated, shadowed by a **blind cross-family critic** scoring against the falsifiable bar
> (the pack's §5 VERIFY + the 6-axis audit read at the register + a North Star reference-peg
> diff). Loop until one clears, ship the winner. Fleet width R2 = 2 · R3 = 3 · R4 = 3–4, round
> cap 3, never start cold (needs the Design PRD + North Star from Phases 0–3.9). **OFF at
> R0/R1** — a utilitarian skeleton is built once, well (looping it is Anti-Pattern #17). Full
> protocol: [`../references/gauntlet-loop.md`](../references/gauntlet-loop.md).

## Universal Upgrades (Always Add)

These improve any site regardless of style:

### Scroll-Triggered Reveals
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
```

### Hover/Active/Focus States
Every interactive element needs all three:
- **Hover**: Visual feedback on desktop (scale, glow, color shift)
- **Active**: Press feedback (slight scale-down, darken)
- **Focus**: Keyboard navigation (outline using site's accent color)

### Spring Curves
Replace `ease` and `ease-in-out` with spring-inspired beziers:
```css
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--snap: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Mobile Responsive
- `min-h-[100dvh]` (not `100vh` — accounts for mobile browser chrome)
- Touch targets minimum 44×44px
- No horizontal scroll on any viewport

### Grain/Noise Texture (When Appropriate)
```css
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* noise pattern */
  pointer-events: none;
  z-index: 9999;
}
```
Use on: luxury, editorial, artistic, vintage sites.
Skip on: corporate, medical, educational, clean/minimal sites.

### Glassmorphism (When It Fits)
```css
.glass {
  background: rgba(var(--bg-rgb), 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```
Use on: modern, luxury, tech sites.
Skip on: traditional, heritage, community sites.

## Adaptive Enhancements (Respect the DNA)

### Typography
- **Keep** the existing font stack. Improve hierarchy:
  - Display: tighter letter-spacing (-0.02em to -0.04em)
  - Body: increase line-height (1.6-1.8)
  - Headings: adjust font-weight for more contrast
- **Only swap** if the fonts are genuinely bad (system defaults, Comic Sans, etc.)

### Colors
- **Keep** the existing palette. Enhance depth:
  - Add tinted shadows using the site's own hues
  - Create gradient variants of existing colors
  - Improve contrast ratios (WCAG AA minimum)
- **Never** replace colors with a "safer" or "more standard" palette

### Layout
- **Keep** the existing section order and structure
- **Enhance** with asymmetry, broken grids, overlapping elements
- **Add** whitespace where things feel cramped
- **Never** reorganize sections based on your preference

### Tinted Shadows
```css
/* Gold palette site */
box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);

/* Maroon palette site */
box-shadow: 0 20px 60px rgba(143, 42, 50, 0.15);

/* Navy palette site */
box-shadow: 0 20px 60px rgba(26, 54, 93, 0.15);
```
Always tint shadows to the site's dominant hue. Gray shadows are generic.

## Phase 4 Completion Criteria

- [ ] Scroll reveal animations added to all below-fold sections
- [ ] Hover/active/focus states on every interactive element
- [ ] Transitions use spring curves
- [ ] Mobile responsive verified on 375px viewport
- [ ] Grain texture added (if appropriate for this site's personality)
- [ ] Typography hierarchy improved without changing fonts
- [ ] Shadows tinted to site's palette
- [ ] All enhancements feel native to the existing design

---

*← [Phase 3: SCOUT](03-scout.md) | Back to [README](../README.md) | Next: [Phase 5: GENERATE →](05-generate.md)*
