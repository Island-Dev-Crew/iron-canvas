# TYPOGRAPHY SYSTEM
## *Iron Canvas — Phase 2 Integration*

> Typography is the single most powerful signal of design quality.
> Every Iron Canvas build must make explicit type decisions before writing CSS.
> This file governs those decisions.

---

## STEP 1: TYPE PERSONALITY CLASSIFICATION

After running the Brand Personality Matrix (Phase 2), classify type personality:

```
BRAND PERSONALITY → TYPE PERSONALITY

Avant-garde ≥ 8 + Bold ≥ 7    →  EXPRESSIVE
  Display fonts: Clash Display, Swear, Editorial New, PP Editorial
  Energy: Striking contrast ratios, oversized headings, unconventional layouts

Avant-garde 5-7 + Bold 5-8    →  EDITORIAL
  Display fonts: Migra, GT Alpina, Canela, Freight Display
  Energy: Literary quality, generous leading, text as texture

Avant-garde 1-4 + Bold 6-9    →  COMMANDING
  Display fonts: Neue Haas Grotesk, GT America, ABC Monument Grotesk
  Energy: Authority through scale, tight leading, no-nonsense hierarchy

Avant-garde 3-6 + Bold 3-6    →  REFINED
  Display fonts: Cormorant, ITC Caslon, Freight Text, Optima
  Energy: Quiet confidence, elegant spacing, premium restraint

Avant-garde 1-4 + Bold 1-4    →  FUNCTIONAL
  Display fonts: Inter, Lato, Source Sans 3, IBM Plex Sans
  Energy: Clarity above all, 16px+ body, high x-height
```

---

## STEP 2: PAIRING PROTOCOL

Every Iron Canvas build uses exactly three type roles:

```
ROLE 1: DISPLAY / HEADING (h1, h2, large callouts)
  Purpose: Makes the first impression. Sets emotional tone.
  Variable font: Preferred if available (allows weight animation)
  Size range: clamp(3rem, 7vw, 8rem) for h1

ROLE 2: BODY / READING (p, li, blockquote)
  Purpose: Long-form legibility. Often different classification from display.
  Size: clamp(1rem, 1.1vw, 1.15rem)
  Line height: 1.6-1.8 for body text
  Letter spacing: 0 to 0.01em (NEVER negative for body)

ROLE 3: ACCENT / MONO (labels, captions, code, nav)
  Purpose: Creates contrast and system feel. Often a geometric sans or mono.
  Examples: DM Mono, JetBrains Mono (for data/code), Space Grotesk (labels)
  Size: 0.75-0.9rem, tight tracking (0.05-0.1em), all-caps for small labels
```

**Pairing examples by personality:**
```
EXPRESSIVE:   Clash Display + Satoshi + DM Mono
EDITORIAL:    GT Alpina + GT America + Space Grotesk
COMMANDING:   ABC Monument Grotesk + same font lighter weight + IBM Plex Mono
REFINED:      Cormorant Garamond + Jost + Cormorant (italic for accent)
FUNCTIONAL:   Inter Variable + Inter + JetBrains Mono
```

---

## STEP 3: TYPE-MOTION RELATIONSHIP

Type motion is governed by the Motion Budget. Here are the type-specific rules:

```
ON ENTRY (page load / section entry):
  EXPRESSIVE:  Full line split → chars stagger up from y:40, opacity 0→1
               Duration: 0.8s, stagger: 0.02s per char, ease: expo.out
  EDITORIAL:   Word-level split → words fade up together per line
               Duration: 0.9s, stagger: 0.05s per word, ease: power2.out
  COMMANDING:  No split — full heading fades up as block
               Duration: 0.6s, ease: power3.out, y:20
  FUNCTIONAL:  No animation or minimal opacity fade (0.4s)

ON SCROLL (scroll-linked):
  Only use for hero/statement text that is the focal scroll moment.
  Use gsap.to with scrub:0.5 for smooth letterform reveals.
  NEVER scroll-link body text — only display/statement text.

HOVER (interactive text links):
  Underline animation: scaleX 0→1 from left, transform-origin: left
  Color shift: 0.2s ease transition, never jarring
```

---

## STEP 4: CRITICAL ANTI-PATTERNS

```
❌ System fonts in production (Arial, Helvetica, -apple-system as only choice)
   → Always self-host or use Google/Variable fonts with font-display: swap

❌ Unset letter-spacing on display text
   → ALL display headings need explicit letter-spacing. Default 0 if tight.
     Expressive: -0.02em to -0.04em on display. Functional: +0.02em on labels.

❌ Line-height not set for each type role
   → Headings: 1.0-1.15. Subheadings: 1.2-1.35. Body: 1.6-1.8.

❌ Font weight mismatches (e.g., using 400 for a display font designed for 700+)
   → Check each font's optimal weight range before assigning.

❌ Animating font-size (causes layout reflow)
   → Use transform: scale() for size emphasis, not font-size changes.

❌ More than 3 distinct typefaces on one page
   → Three roles maximum. Variations come from weight, size, tracking.

❌ Orphan words in headings (single word on last line)
   → Use: text-wrap: balance on headings (CSS modern standard)
   → Or add non-breaking spaces (&nbsp;) between last two words
```

---

## STEP 5: LOADING PROTOCOL

```css
/* Self-hosted fonts: preload critical fonts in <head> */
<link rel="preload" href="/fonts/font-display.woff2" as="font" type="font/woff2" crossorigin>

/* font-face with display swap */
@font-face {
  font-family: 'DisplayFont';
  src: url('/fonts/font-display.woff2') format('woff2');
  font-weight: 100 900; /* variable font range */
  font-display: swap; /* prevents invisible text during load */
}

/* Body font: defer loading to avoid render block */
/* Use font-display: optional for less critical secondary fonts */
```

---

## INTEGRATION POINT: feel-profile.json

The feel profile output of Phase 2 must include:

```json
{
  "typography": {
    "personality": "EXPRESSIVE | EDITORIAL | COMMANDING | REFINED | FUNCTIONAL",
    "display_font": "Font name",
    "body_font": "Font name",
    "accent_font": "Font name",
    "display_entry_animation": "char-stagger | word-fade | block-fade | none",
    "heading_tracking": "-0.03em",
    "body_line_height": "1.7",
    "font_source": "self-hosted | google | variable"
  }
}
```

Agent-A consumes this to generate `tokens.css`.
Agent-B consumes this to configure SplitText and entry animations.

---

*Iron Canvas v4.2 — references/typography-system.md*
