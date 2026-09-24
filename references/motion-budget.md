# MOTION BUDGET
## *Iron Canvas — Phase 2 Integration*

> Motion without budget is noise.
> Every Iron Canvas build defines what moves, what anchors, and what costs too much
> before a single line of GSAP is written.

**Easing, tempo and personality are governed by the Motion Personality system in [`references/motion-language.md`](motion-language.md)** — this file budgets scope, anchors and cost.

---

## THE CORE PRINCIPLE

High-end motion design is NOT about animating everything.
It is about intentional contrast between what moves and what stays still.
The still elements make the moving elements land harder.
The moving elements make the still elements feel grounded.

**Motion budget = the set of intentional decisions about animation scope,
made BEFORE execution, that govern Agent-B's entire session.**

---

## STEP 1: ASSIGN A MOTION TIER

Based on Phase 0 project type + Brand Personality Matrix:

```
TIER 1 — RESTRAINED (Dashboards, functional apps, corporate sites)
  Brand: Bold ≤ 4, Avant-garde ≤ 4
  Budget: Minimal motion. State transitions only.
  Entry: Fade in/up on page sections — 0.3-0.4s max
  Scroll: No scroll-linked animation (only intersection triggers)
  Hover: Color shift, subtle lift (translateY -2px), no dramatic effects
  Never: Particle effects, cursor trails, magnetic buttons, scroll sequences

TIER 2 — PURPOSEFUL (Marketing sites, landing pages, product sites)
  Brand: Bold 5-7, Avant-garde 4-7
  Budget: Selective motion. 3-4 animated moments per scroll length.
  Entry: Section entrances with stagger — 0.5-0.7s
  Scroll: 1-2 scroll-triggered sequences (hero, key feature)
  Hover: Magnetic button available if bold ≥ 6
  Never: Full-page cursor WebGL, overwhelming particle systems

TIER 3 — EXPRESSIVE (Portfolios, campaigns, luxury/fashion brands)
  Brand: Bold 7-10, Avant-garde 6-10
  Budget: Rich motion. Scroll as primary narrative tool.
  Entry: Dramatic reveals — char/word stagger, clip-path, scale
  Scroll: Full scroll engine (60-frame sequences), pinned panels
  Hover: Magnetic cursor, trailing cursor, card tilt, image reveal on hover
  Cursor: Custom cursor with brand personality
  WebGL: Three.js if avant-garde ≥ 8

TIER 4 — IMMERSIVE (Creative studios, immersive campaigns, game-adjacent sites)
  Brand: Avant-garde 8-10, any bold score
  Budget: Maximum. Motion IS the content.
  Entry: Full page-level transitions (Barba.js or custom)
  Scroll: WebGL-driven scroll, camera movement, 3D product viewers
  Hover: Everything in Tier 3 plus shader effects
  Audio: Optional ambient sound layer (requires explicit permission)
```

---

## STEP 2: MOTION ZONES

Every page is divided into motion zones. Define them before building.

```
ZONE A: HERO (above fold)
  → ALWAYS animates. This is the first impression.
  → Budget: Richest animation on the page. Sets expectations.
  → Tier 1: Simple fade. Tier 2: Type reveal + image in.
  → Tier 3: Full text choreography + scroll-pinned panel or scroll sequence.

ZONE B: NARRATIVE SECTIONS (the scroll story)
  → Intersection Observer triggers (not scroll-linked unless Tier 3+).
  → Stagger reveals: text blocks, cards, image grids.
  → Rule: One motion "moment" per section. Not every element in the section.
  → The anchor: At least ONE element in each section should not animate.

ZONE C: INTERACTIVE ELEMENTS (CTAs, buttons, forms, navigation)
  → Hover states are always present (all tiers).
  → Tier 1: Color + underline. Tier 2: Magnetic + scale.
  → Tier 3: Full magnetic + cursor swap + GSAP tween on hover.

ZONE D: BACKGROUND LAYER (mesh, particles, Three.js scenes)
  → Only Tier 3-4.
  → Must not compete with foreground content.
  → Rule: Background motion slows when user is reading.
  → Rule: background motion speed ≤ 30% of foreground motion speed.

ZONE E: PAGE TRANSITIONS
  → Tier 1-2: Simple fade or slide (CSS transitions).
  → Tier 3-4: Barba.js page transitions with enter/leave hooks.
  → Budget: 0.4-0.8s max transition time. Never longer.
```

---

## STEP 3: WHAT NEVER MOVES (The Anchors)

Defining anchors is as important as defining what moves.

```
ALWAYS ANCHORED (no animation, all tiers):
  → Body text blocks being READ (do not scroll-link reading content)
  → Navigation (after initial entrance animation, nav is static)
  → Footer (subtle fade-in only — never animated per-element)
  → Price/CTA numbers (these must be stable for cognitive processing)

ANCHORED IN TIER 1-2 (animate only in Tier 3-4):
  → Section background elements
  → Large imagery (static in Tier 1-2, scroll-parallax only in Tier 3+)
  → Decorative borders and rule lines
```

---

## STEP 4: TIMING BUDGET

A timing budget prevents motion from feeling sluggish or chaotic.

```
MAXIMUM DURATIONS:
  Micro (hover states, focus rings):    0.2s
  Element entry (single):               0.5-0.7s
  Section entrance (staggered group):   0.7-1.2s total (not per element)
  Hero narrative sequence:              1.5-2.5s total
  Page transition:                      0.5-0.8s
  Scroll pinned sequence:               Governed by scroll distance, not time

STAGGER INTERVALS:
  Character-level:   0.015-0.025s per char
  Word-level:        0.04-0.07s per word
  Line-level:        0.08-0.12s per line
  Card-level:        0.06-0.10s per card
  Section-level:     0.12-0.18s per major element

EASING QUICK-SELECT:
  Entrance:          expo.out (fast start, smooth landing)
  Exit:              power2.in (smooth start, fast departure)
  Hover:             power1.inOut (symmetric, natural)
  Scroll-linked:     none (linear — let scroll position do the work)
  Spring/bounce:     elastic.out(1, 0.3) (sparingly — personality moments only)
```

---

## STEP 5: PERFORMANCE GATES

Motion budget must not break performance budget.

```
GATE 1: GPU COMPOSITING CHECK
  → Only animate: transform (translate/scale/rotate) and opacity
  → NEVER animate: top, left, width, height, margin, padding, border-width
  → will-change: transform — set immediately before animation, clear in onComplete

GATE 2: REDUCE MOTION RESPECT
  → ALL animations must be gated by prefers-reduced-motion
  → Implementation:
    const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (motionOK) { /* run full GSAP timeline */ }
    else { /* show content immediately, no animation */ }

GATE 3: SCROLL SEQUENCE WEIGHT
  → If using image frame sequences: max 60 frames at WebP compression
  → Must lazy-load: only frames ±10 from current position in memory
  → Scroll-tied motion is NEVER a <video> — it is canvas + frames + ScrollTrigger (Anti-Pattern #7)
  → A looping background MP4 (autoplay muted loop playsinline) is fine — it is not scroll-tied
  → Mobile fallback for heavy frame sequences: fewer frames or a static poster — never a <video> swap

GATE 4: SCROLL TRIGGER CLEANUP
  → All ScrollTrigger instances must be stored and killed on route change
  → const triggers = []; ... triggers.push(ScrollTrigger.create({...}));
  → On cleanup: triggers.forEach(t => t.kill());
```

---

## INTEGRATION POINT: feel-profile.json

Phase 2 output must include:

```json
{
  "motion": {
    "tier": "1 | 2 | 3 | 4",
    "hero_animation": "fade | type-reveal | full-choreography | immersive",
    "scroll_sequences": false,
    "magnetic_cursor": false,
    "three_js": false,
    "page_transitions": false,
    "prefers_reduced_motion_fallback": true,
    "motion_notes": "any special constraints or opportunities"
  }
}
```

Agent-B reads this before writing a single GSAP line.
Orchestrator uses this to decide whether to spawn Agent-D (scroll sequences).

---

## React / Next.js Motion Rules

> When Iron Canvas encounters a React or Next.js project, these additional
> rules prevent performance collapse. GSAP remains the primary motion engine,
> but these rules govern how motion integrates with React's render cycle.

### Framework Mixing Ban

```
CRITICAL: NEVER mix GSAP and Framer Motion in the same component tree.

  GSAP — used for:
    ✅ Isolated full-page scrolltelling
    ✅ Canvas backgrounds and scroll sequences
    ✅ ScrollTrigger-driven animations
    ✅ Complex timeline choreography
    Wrapped in strict useEffect cleanup blocks.

  Framer Motion — used for:
    ✅ UI component interactions (hover, tap, layout transitions)
    ✅ Bento grid card animations (layoutId, staggerChildren)
    ✅ AnimatePresence for mount/unmount transitions
    ✅ Shared element transitions across state changes

  DEFAULT TO GSAP for Iron Canvas builds (our pipeline is GSAP-native).
  Framer Motion only when the project is React-first and client requests it.
```

### Performance Rules for React Motion

```
NEVER use React useState for:
  → Magnetic hover effects (continuous mouse tracking)
  → Continuous animations (infinite loops, breathing effects)
  → Any animation updating faster than 60fps

INSTEAD use:
  → Framer Motion: useMotionValue + useTransform (outside render cycle)
  → GSAP: gsap.to() targeting DOM refs directly
  → CSS custom properties animated via JS (element.style.setProperty)

WHY: useState triggers re-renders. At 60fps = 60 re-renders/second.
This causes performance collapse on mobile. Motion values bypass React's
render cycle entirely.
```

### Perpetual Motion Isolation

```
ANY perpetual motion or infinite loop animation MUST:
  1. Be wrapped in React.memo to prevent parent re-renders
  2. Live in its own microscopic Client Component
  3. NEVER share state with parent layout
  4. Use will-change: transform sparingly (only while actively animating)

WRONG:
  function Dashboard() {
    // 60fps animation re-rendering the entire dashboard
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => { /* animation loop setting pos */ });
    return <div>{/* all dashboard content re-renders */}</div>
  }

RIGHT:
  const PulseIndicator = React.memo(() => {
    // Isolated — parent never re-renders
    return <motion.div animate={{ scale: [1, 1.2, 1] }} />;
  });
```

### Staggered Children Rules

```
For staggerChildren (Framer Motion):
  → Parent (variants) and Children MUST reside in the SAME Client Component tree
  → If data is fetched asynchronously, pass data as props into a centralized
    Parent Motion wrapper — don't split across component boundaries
  → Use AnimatePresence to wrap dynamic lists for enter/exit animations
```

### Scroll Reveal Performance

```
USE: IntersectionObserver or Framer Motion whileInView
NEVER: window.addEventListener('scroll')

window scroll listeners cause continuous reflows on every frame.
IntersectionObserver fires only when elements cross threshold boundaries.

For GSAP ScrollTrigger (Iron Canvas default):
  → Lazy-init below fold
  → Kill triggers on unmount (useEffect cleanup)
  → Use scrub: 0.5 for smooth scroll-linked animations (not scrub: true)
```

### useEffect Cleanup (MANDATORY)

```javascript
// EVERY animation in a React component MUST have cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
    gsap.to('.element', { /* ... */ });
    ScrollTrigger.create({ /* ... */ });
  }, containerRef);

  return () => ctx.revert(); // Kills ALL animations + ScrollTriggers
}, []);
```

---

*Iron Canvas v4.2 — references/motion-budget.md*
