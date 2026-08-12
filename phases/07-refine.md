# Phase 7: REFINE — Iterative Polish

> The refinement loop: LOOK → REACT → DESCRIBE → FIX → LOOK AGAIN

## The Rule

You are never done after one pass. Premium quality requires iteration. Look at the result, react honestly, describe what's wrong, fix it, look again. Repeat until you'd be proud to show it.

## The Refinement Loop

```
LOOK → REACT → DESCRIBE → FIX → LOOK AGAIN
  ↑                                    ↓
  └────────────────────────────────────┘
         (repeat until premium)
```

### LOOK
Screenshot the page. Full page desktop. Full page mobile. Each section individually. Look at it like a user seeing it for the first time.

### REACT
Gut reaction. What feels off? What catches your eye (good or bad)? Don't analyze yet — just react.

### DESCRIBE
Now articulate: WHY does that thing feel off? Be specific:
- "The hero text competes with the background — not enough contrast"
- "Product cards feel static — missing hover lift effect"
- "The scroll animation stutters at 40% progress — frame gap too large"

### FIX
Apply the fix. One thing at a time.

### LOOK AGAIN
Screenshot again. Did the fix work? Did it create new problems?

## Quality Checklist (Per Site — Adapt to DNA)

### Identity Preservation
- [ ] Site retains its unique personality and palette
- [ ] Enhanced version is recognizably the SAME site but better
- [ ] No elements feel foreign or imposed from a different aesthetic

### Visual Quality
- [ ] All images blend into their containers naturally
- [ ] No floating objects on mismatched backgrounds
- [ ] Typography hierarchy is clear using the site's own fonts
- [ ] Shadows tinted to the site's own hue
- [ ] Color contrast passes WCAG AA (4.5:1 for body text)

### Interaction Quality
- [ ] Hover/active/focus states on every interactive element
- [ ] Scroll animations fire smoothly (no mobile jank)
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] No unexpected layout shifts during interaction

### Scroll Engine Quality (If Applicable)
- [ ] Scroll sequence scrubs smoothly in both directions
- [ ] Content overlays sync with animation timing
- [ ] Loading experience is graceful (progress indicator)
- [ ] No blank canvas at any scroll position
- [ ] Mobile fallback works (reduced frames or static image)

### Performance
- [ ] Lighthouse Performance score ≥ 85
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Frame preloading doesn't block initial render

### Cross-Device
- [ ] Desktop (1440px) — verified
- [ ] Tablet (768px) — verified
- [ ] Mobile (375px) — verified
- [ ] Mobile landscape — no broken layouts

## Common Refinement Patterns

### Problem: Image doesn't blend
**Fix:** Add CSS overlay gradient matching the section's background color:
```css
filter: brightness(0.8) saturate(1.2);
/* or */
mix-blend-mode: multiply;
```

### Problem: Text unreadable over image
**Fix:** Add gradient scrim:
```css
background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
```

### Problem: Scroll animation stutters
**Fix:** Check frame count and gap. Add intermediate frames where stutter occurs. Increase `scrub` value for more smoothness.

### Problem: Hover states feel generic
**Fix:** Tint the hover effect to the site's palette:
```css
/* Instead of: */
transform: scale(1.02);
/* Use: */
transform: scale(1.02) translateY(-4px);
box-shadow: 0 12px 40px rgba(var(--brand-rgb), 0.2);
```

### Problem: Mobile scroll is laggy
**Fix:** Reduce frame count, lower resolution, disable non-essential animations:
```css
@media (max-width: 768px) {
  .grain::after { display: none; }
  .parallax { transform: none !important; }
}
```

## DESIGN QUALITY GATE — Anti-Slop Audit + CD3 Axis 6 (Treatment & Soul ★v5.1)

> This gate catches common AI design mistakes before handoff.
> Run this checklist AFTER the refinement loop, BEFORE promotion.
> Derived from cross-industry design audit best practices.
>
> **This audit IS the operational half of VERIFY Axis 6 — one gate, not two.** The
> checklists below satisfy the anti-slop half; the CD3 half is here too:

### Axis 6 — Treatment & Soul (a BLOCKING axis; full battery in SKILL.md §10 / references/claude-design-3.md)
- [ ] **Register match** — output sits within the `treatment_register` cap (R0–R4) set at ORIENT, AND the register itself matches the TASK's ambition (not merely internally consistent)
- [ ] **Soul** — a stranger can name the subject from the design alone; nothing reskins cleanly onto another brand
- [ ] **Anti-slop** — trips zero items in the CD3 canon (references/anti-patterns.md #16 Slop Tells / #17 Register Mismatch) unless the DNA pinned one
- [ ] **Copy carries** — labels/controls/errors read human; active voice; no system-speak
- [ ] **Both themes** — if two ship, both are deliberate + legible (or single-theme is a stated choice)
- [ ] **One unforgettable thing** — a single deliberate moment the page is built around
- **Pass = ≥ 5/6 with zero HARD FAILs** (same threshold as SKILL.md §10).
- HARD FAIL (any blocks ship): lorem in a shipped surface · a default font stack with no reason · accent fighting the ground · body scrolling sideways on mobile
- On fail → register mismatch: re-ORIENT (reset `treatment_register`); soul/anti-slop: re-STUDY (re-harvest the subject)

### Typography Audit
- [ ] No browser default fonts (Arial, Helvetica alone) in production
- [ ] Headlines have explicit letter-spacing (not default 0)
- [ ] Line-height set for each type role (headings: 1.0-1.15, body: 1.6-1.8)
- [ ] No orphan words in headings (text-wrap: balance applied)
- [ ] Font weights include Medium (500) or SemiBold (600), not just 400/700
- [ ] Body text max-width ≤ 65ch
- [ ] No serif fonts in dashboard/software UIs
- [ ] Font-display: swap on all @font-face declarations

### Color & Surface Audit
- [ ] No pure #000000 anywhere — off-black used
- [ ] Accent colors desaturated (saturation < 80%)
- [ ] One accent color maximum per project
- [ ] No warm/cool gray fluctuation within same project
- [ ] Shadows tinted to background hue — no default black shadows
- [ ] No AI purple/blue neon gradient aesthetic
- [ ] Grain/noise overlays on fixed pseudo-elements only — not scrolling containers

### Layout Audit
- [ ] No 3-column equal card feature rows (unless DNA Profile specifies)
- [ ] Content constrained by max-width container (1200-1440px)
- [ ] All layouts collapse gracefully to single column below 768px
- [ ] No horizontal overflow on mobile
- [ ] Touch targets ≥ 44px on all interactive elements
- [ ] Cards exist only where elevation communicates hierarchy
- [ ] Bottom padding optically larger than top where needed

### Content Audit
- [ ] No generic names (John Doe, Jane Smith, Acme Corp)
- [ ] No fake round numbers (99.99%, 50%, $100.00)
- [ ] No AI copywriting clichés (Elevate, Seamless, Unleash, Next-Gen)
- [ ] No Lorem Ipsum anywhere
- [ ] No broken Unsplash image links
- [ ] Unique avatar for every distinct user
- [ ] Blog/content dates are varied (not all identical)
- [ ] Error messages are direct (no "Oops!" or exclamation marks)

### Component Audit
- [ ] All interactive elements have 5 states (default, hover, focus, active, disabled)
- [ ] Loading states use skeletal loaders (not circular spinners)
- [ ] Empty states include a CTA (invitation, not dead end)
- [ ] Error states are inline with specific messages
- [ ] Navigation has active/current page indicator
- [ ] shadcn/ui customized (if used) — not in default state
- [ ] Icon stroke widths standardized across project

### Code Quality Audit
- [ ] Semantic HTML used (<nav>, <main>, <article>, <section>)
- [ ] No commented-out dead code
- [ ] No inline styles mixed with CSS classes
- [ ] All imports verified against package.json
- [ ] Favicon included
- [ ] Meta tags complete (title, description, og:image)
- [ ] No hardcoded pixel widths for layout — relative units used
- [ ] Alt text on all meaningful images (not just alt="" or alt="image")

### Strategic Omissions Check
- [ ] Privacy policy / Terms of service links in footer (if required)
- [ ] No dead-end pages — every page has a way back
- [ ] Custom 404 page (if applicable)
- [ ] Form validation (client-side) on all forms
- [ ] Skip-to-content link for keyboard users
- [ ] scroll-behavior: smooth on html element

---

## Phase 7 Completion Criteria

- [ ] Full refinement loop completed (minimum 2 passes)
- [ ] All quality checklist items pass
- [ ] Desktop, tablet, and mobile verified with screenshots
- [ ] Performance metrics within targets
- [ ] Final screenshot captures saved for documentation
- [ ] User approval obtained before promoting to production

## Promotion to Production

Once Phase 7 is complete and approved:
1. Create visual diff (staging vs current production screenshots)
2. Present to stakeholder for approval
3. Merge staging → main (per Production Branching Protocol)
4. Verify production deployment
5. Document in project changelog

---

*← [Phase 6: COMPOSE](06-compose.md) | Back to [README](../README.md)*
