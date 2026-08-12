---
name: iron-canvas-2-motion
description: >
  Sub-skill 2 of 4 in the Iron Canvas Master pipeline.
  Designs the complete animation system and motion choreography blueprint.
  Takes design_brief.json from Protocol 1 as input and outputs motion_blueprint.json.
  Must be run AFTER Protocol 1 completes and BEFORE any code is written.
  
  Triggers: "plan the animations", "design the motion system", "animation blueprint",
  "figure out the scroll choreography", "what animations should we add"
parent_skill: iron-canvas-master
protocol: 2 of 4
requires: design_brief.json (from Protocol 1)
---

# IRON CANVAS — PROTOCOL 2: MOTION ARCHITECTURE
### *Animation System Design & Scene-by-Scene Choreography Blueprint*

> **Purpose:** Every animation must serve a purpose. This protocol ensures no
> animation is added arbitrarily — each one is designed, categorized, and justified
> before a single line of motion code is written.

## INPUT REQUIRED
- `design_brief.json` (from Protocol 1)
- Brand Personality Matrix scores (especially Bold/Quiet and Classic/Avant-garde)
- Enhancement gaps list (especially MOTION_GAP, INTERACTION_GAP, 3D_GAP, TRANSITION_GAP)

---

## STEP 1: LOAD CHOREOGRAPHY DESIGN

Design the page's arrival sequence. Every site gets ONE load choreography — make it memorable.

**Template:**
```
Phase 0 (0-200ms):    Background / canvas / WebGL init
Phase 1 (200-600ms):  Primary hero visual or 3D element entrance  
Phase 2 (400-800ms):  Main headline (character/word stagger)
Phase 3 (600-1000ms): Supporting text / descriptor
Phase 4 (800-1200ms): CTA button(s)
Phase 5 (1000-1400ms): Navigation + secondary UI elements
```

**Rules:**
- Total duration: ≤ 1500ms
- Use stagger delays of 50-100ms between related elements
- Hero elements: dramatic easing (`power4.out`, `elastic.out`)
- Supporting elements: gentle easing (`power2.out`, `sine.out`)
- NEVER animate everything simultaneously

---

## STEP 2: SCROLL TECHNIQUE MAPPING

For each major section, assign scroll techniques:

| Technique | Best For | Tech |
|-----------|----------|------|
| Pin + Scrub | Hero-to-content transitions | GSAP ScrollTrigger |
| Multi-layer Parallax | Depth, landscape sections | GSAP / CSS |
| Reveal on Enter | Cards, content sections | IO / GSAP |
| Horizontal Scroll | Galleries, portfolios | GSAP ScrollTrigger |
| Image Sequence | Product stories | Canvas + ScrollTrigger |
| Counter Animation | Stats, numbers | GSAP + ScrollTrigger |
| Text Scramble | Hero words, taglines | Custom / GSAP |
| 3D Camera Move | Immersive heroes | Three.js + ScrollTrigger |
| Morphing SVG | Shape transitions | GSAP MorphSVG |
| Progress Indicator | Long content | ScrollTrigger progress |

**Smooth Scroll Choice:**
- Default recommendation: **Lenis** (lightweight, modern)
- Parallax-heavy: Locomotive Scroll
- Deep GSAP project: ScrollSmoother
- Simple sites: native scroll-behavior

---

## STEP 3: CURSOR SYSTEM DESIGN

Select 1-2 cursor techniques maximum (match intensity to Bold/Quiet score):

| Score 1-4 (Quiet) | Score 5-7 (Moderate) | Score 8-10 (Bold) |
|-------------------|---------------------|------------------|
| Custom dot cursor | Trailing cursor | Fluid trail |
| CSS blend mode | Magnetic elements | WebGL distortion |
| Size-on-hover | Image reveal | Particle system |

If Bold score < 5 and site is corporate/enterprise: **no custom cursor**

---

## STEP 4: PAGE TRANSITIONS

| Technique | Feel | Tech |
|-----------|------|------|
| Fade-through-black | Cinematic | GSAP + Barba.js |
| Curtain reveal | Theatrical | GSAP + Barba.js |
| Shared element morph | Seamless | GSAP Flip + Barba.js |
| Color flood | Brand-forward | GSAP + Barba.js |
| WebGL distortion | Psychedelic | Three.js + GLSL |
| Zoom in/out | Magazine | GSAP |

**If SPA (React/Next.js):** Use Framer Motion `AnimatePresence` or GSAP + route hooks
**If classic multi-page:** Barba.js is the standard

---

## STEP 5: MICRO-INTERACTION MAPPING

Define ALL 3 states for EVERY interactive element:

```json
{
  "micro_interactions": {
    "primary_cta": {
      "hover": "scale(1.04) + shadow elevation",
      "active": "scale(0.97)",
      "focus": "visible outline ring"
    },
    "nav_links": {
      "hover": "underline animates in from left",
      "active": "color shift",
      "focus": "outline"
    },
    "cards": {
      "hover": "translateY(-4px) + shadow increase",
      "active": "translateY(-2px)",
      "focus": "outline"
    },
    "images": {
      "hover": "scale(1.04) inside container",
      "active": "—",
      "focus": "outline"
    },
    "hamburger": {
      "hover": "slight rotation hint",
      "active": "morphs to X over 300ms",
      "focus": "outline"
    }
  }
}
```

---

## STEP 6: TYPOGRAPHIC ANIMATION

Match text animation intensity to Brand Personality + Enhancement Gaps:

| Technique | When to Use |
|-----------|-------------|
| Character split + stagger | Hero headlines (avant-garde ≥ 6) |
| Word stagger | Subheadings, feature titles |
| Line reveal (clip-path) | Section titles, elegant reveals |
| Text scramble | Counter headlines, loading states |
| Marquee/ticker | Brand bars, feature loops |
| Kinetic type | Experimental heroes only |
| Number counter | Statistics, metrics |
| Gradient animate | Accent phrases, CTAs |

---

## STEP 7: 3D DECISION

**Use WebGL/Three.js ONLY when:**
- Product is inherently 3D (physical products, spatial)
- Avant-garde score ≥ 8 AND this is a portfolio/campaign/studio site
- Budget and timeline support it
- Mobile degradation plan exists

**Skip 3D when:**
- Corporate SaaS, news, editorial, e-commerce catalog
- Performance budget is tight
- Mobile is primary traffic source

---

## STEP 8: TECH STACK DECLARATION

```json
{
  "tech_stack": {
    "animation_primary": "GSAP 3 / Framer Motion / CSS-only",
    "scroll_library": "Lenis / Locomotive / ScrollSmoother / native",
    "page_transitions": "Barba.js / Next.js AnimatePresence / None",
    "text_animation": "GSAP SplitText / custom split / None",
    "cursor": "Custom JS / GSAP lerp / None",
    "3d_library": "Three.js / None",
    "shaders": "Custom GLSL / None",
    "framework": "React / Next.js / Vanilla JS / Vue / Svelte",
    "performance_budget": {
      "target_fps": 60,
      "max_js_kb": 300,
      "lcp_target": "< 2.5s",
      "reduce_motion_fallback": true
    }
  }
}
```

---

## STEP 9: EASING VOCABULARY

Define project-specific easing constants:
```javascript
const EASES = {
  heroIn: "power4.out",
  textIn: "power3.out",
  elementIn: "power2.out",
  heroOut: "power2.in",
  hover: "power1.inOut",
  spring: "elastic.out(1, 0.3)",
  brandCurve: "cubic-bezier(0.16, 1, 0.3, 1)"
};
```

---

## STEP 10: SCENE CHOREOGRAPHY MAP

Document for every major section:
```
[SECTION NAME]
  Load:     [What happens when this section enters viewport]
  Scroll:   [Behavior as user scrolls through/past]
  Cursor:   [Any cursor interactions in this zone]
  Exit:     [What happens as it leaves viewport]
  Duration: [Approx viewport time / scroll distance]
  Technique:[Primary technique from taxonomy]
  Emotion:  [What the user should feel here]
```

---

## GATE 2 — ARCHITECTURE COHERENCE CHECK

- [ ] All 7 animation categories addressed (A-G) or marked N/A? ✓/✗
- [ ] Tech stack declared with no conflicts? ✓/✗
- [ ] Reduce-motion fallback planned? ✓/✗
- [ ] Performance budget defined? ✓/✗
- [ ] Scene choreography map covers every major section? ✓/✗
- [ ] Easing library defined? ✓/✗
- [ ] Intensity matches Brand Personality scores? ✓/✗

**7/7 = PASS → Call Protocol 3 (iron-canvas-3-forge)**
**5-6/7 = CONDITIONAL PASS → Note gaps, proceed carefully**
**<5/7 = FAIL → Revise before proceeding**

---

## OUTPUT

Write `motion_blueprint.json` with all decisions documented.
Present scene choreography map to user/agent for confirmation before executing Protocol 3.
