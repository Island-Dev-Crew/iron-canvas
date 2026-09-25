---
name: iron-canvas-4-verify
description: >
  Sub-skill 4 of 4 in the Iron Canvas Master pipeline.
  The 6-axis quality audit that validates the implementation against Awwwards design
  standards, animation quality, aesthetic taste, performance, brand DNA fidelity, and
  (Axis 6, CD3 ★v5.1) treatment-register match + soul — see SKILL.md §10 + references/claude-design-3.md.
  Run as the final step. If any axis fails, routes back to the appropriate Protocol.
  Produces verification_report.json and the final PASS/REFINE verdict.
  
  Triggers: "verify the design", "quality check", "run the audit",
  "is this ready", "grade the output", "final check", "sign off"
parent_skill: iron-canvas-master
protocol: 4 of 4
requires: design_brief.json, motion_blueprint.json, implementation (from Protocol 3)
---

> **Archival — superseded.** Kept for history. The live doctrine is SKILL.md v6 (§7b Choreography)
> and `references/motion-language.md`. Do not execute this file.

# IRON CANVAS — PROTOCOL 4: VERIFICATION NEXUS
### *6-Axis Quality Audit & Final Sign-Off (Axis 6 = CD3 Treatment & Soul ★v5.1)*

> **Simulate three critical perspectives simultaneously:**
> 1. An Awwwards judge evaluating for Site of the Day
> 2. A principal engineer reviewing for production readiness
> 3. An accessibility auditor reviewing for inclusive design
>
> **Be honest. Sycophancy here is expensive. A failed gate caught now
> costs hours. A failed gate caught after delivery costs days.**

> **★v5.1 — READ AXES 1–5 AT THE TREATMENT REGISTER (CD3).** The Awwwards axes are
> register-relative. At **R0/R1** the Awwwards-judge perspective evaluates *excellence FOR a
> utilitarian/functional treatment* (hierarchy, clarity, restraint, information design) — the
> "must surprise / keep scrolling / Dribbble-ready" criteria (Axes 1–3) are **waived at R0,
> softened at R1**. A correct, restrained R0 output PASSES; do not route it back toward
> spectacle — over-production on an R0 task is an Axis 6 register-mismatch FAIL (Anti-Pattern
> #17). At **R2–R4** the axes apply at full maximalist strength.

---

## AXIS 1 — AWWWARDS DESIGN SCORE
*"Would this win Site of the Day?"*

Score each criterion 1-10 (Awwwards scale):

```
DESIGN
  Visual impact and uniqueness:          __/10
  Color and typography sophistication:   __/10
  Spatial composition:                   __/10
  Aesthetic coherence:                   __/10
  DESIGN AVERAGE:                        __/10

USABILITY
  Navigation clarity:                    __/10
  Content hierarchy:                     __/10
  Mobile experience:                     __/10
  Loading and performance feel:          __/10
  USABILITY AVERAGE:                     __/10

CREATIVITY
  Originality of concept:                __/10
  Innovation in interaction:             __/10
  Memorable moments:                     __/10
  Unexpected delightful details:         __/10
  CREATIVITY AVERAGE:                    __/10

CONTENT
  Clarity of messaging:                  __/10
  Visual communication of purpose:       __/10
  Hierarchy guides attention:            __/10
  CONTENT AVERAGE:                       __/10

AWWWARDS TOTAL: __ /10 (average of 4 averages)
```

**Scoring thresholds:**
- 9.0+: Exceptional — potential SOTD winner
- 8.0-8.9: Excellent — strong honorable mention
- 7.5-7.9: ✅ PRODUCTION READY — minimum for delivery
- 7.0-7.4: ⚠️ NEEDS WORK — specific improvements required
- < 7.0: ❌ FAIL — significant redesign needed

**If < 7.5:** Document exactly which criteria scored low and WHY.
→ Return to Protocol 3 Phase 3 (Polish) or Protocol 1 (if it's a DNA issue)

---

## AXIS 2 — ANIMATION QUALITY AUDIT
*"Does the motion serve the story, or is it noise?"*

Check each question (✓ Pass / ✗ Fail):

```
□ Every animation has a PURPOSE (not just decoration)?
□ Animations are CONSISTENT (same easing family throughout)?
□ Timing is CALIBRATED (nothing too fast, nothing too slow)?
□ Scroll animations FEEL PHYSICAL (weight, momentum)?
□ Load animations complete by 1.5s?
□ Motion SUPPORTS brand personality (intensity matches matrix)?
□ No JANKY moments (layout shifts, repaints, drops)?
□ SMOOTH on mobile (60fps or graceful degradation)?
□ Satisfying HIERARCHY of moments (big + small)?
□ Does the animation make you WANT TO KEEP SCROLLING?
```

**Score: 10/10 = Perfect | 9/10 = Excellent | ≥7/10 = ✅ PASS**
**< 7/10 = ❌ FAIL → Return to Protocol 3 Phase 2 for specific animation revisions**

**Document each ✗ with specific remediation:**
```
FAIL: [which animation]
PROBLEM: [what's wrong]
FIX: [specific code change needed]
```

---

## AXIS 3 — THE TASTE TEST
*"Would a senior designer at a top creative agency be proud of this?"*

This is the most uncompromising gate. All 7 must pass.

### T1: FONT CHOICE
Is the typography DESIGNED or DEFAULTED?
```
PASS criteria:
- Display font is distinctive, not generic (Inter/Roboto/Arial = FAIL for creative sites)
- Font pairing has contrast and intentionality
- Letter-spacing and weight choices feel crafted

Status: ✓ PASS / ✗ FAIL
Evidence: [what you see]
Fix if fail: [replace font, adjust specs]
```

### T2: COLOR DRAMA
Does the palette have TENSION and CHARACTER?
```
PASS criteria:
- Not all neutrals — at least one accent that actually pops
- Color communicates an emotion before words are read
- No "safe beige everything" or "corporate blue everything"

Status: ✓ PASS / ✗ FAIL
Evidence: [what you see]
Fix if fail: [which color needs replacing/strengthening]
```

### T3: UNEXPECTED DETAIL
Is there at least ONE thing that surprises?
```
PASS criteria:
- A section header that behaves unexpectedly
- A hover interaction that produces delight
- A background that rewards close attention
- An animation sequence that makes someone say "wait, show me that again"

Status: ✓ PASS / ✗ FAIL
Evidence: [what the surprise is]
Fix if fail: [add specific interaction/detail]
```

### T4: THE SLOW SCROLL TEST
Scroll the complete page slowly. Does EVERY section feel intentional?
```
PASS criteria:
- No section feels "leftover" or half-finished
- No section that could have been removed without loss
- Transitions between sections feel designed

Status: ✓ PASS / ✗ FAIL
Problem sections: [list any that feel weak]
Fix: [specific improvements]
```

### T5: THE SCREENSHOT TEST
Take a screenshot. Would you share this as an example of good design?
```
PASS criteria:
- Would appear on Dribbble / Awwwards without embarrassment
- Has at least one visual element worth studying
- Layout is not "AI default" (centered stack, purple gradients, generic cards)

Status: ✓ PASS / ✗ FAIL
Evidence: [what makes it shareable / what holds it back]
```

### T6: THE COMPETITOR TEST
Compare to the top 3 competitors in this space.
```
PASS criteria:
- Demonstrably better, or at minimum equal on 4/5 dimensions
- Has at least 1 dimension where it clearly wins

Status: ✓ PASS / ✗ FAIL
Competitor comparison: [brief 3-way comparison]
```

### T7: THE 5-SECOND TEST
Can a new viewer understand the purpose AND feel the intended emotion within 5 seconds?
```
PASS criteria:
- Primary purpose clear from hero without scrolling
- Emotional register (calm/exciting/trustworthy/edgy) immediately felt
- No confusion about what this site is or does

Status: ✓ PASS / ✗ FAIL
Evidence: [what communicates well / what's confusing]
Fix: [hero/headline/visual adjustments]
```

**TASTE TEST RESULT:**
- 7/7: ✅ PASS
- Any single ✗: ❌ FAIL → Fix the specific item(s) before proceeding

---

## AXIS 4 — PERFORMANCE & TECHNICAL AUDIT
*"Is this production-ready?"*

```
□ Lighthouse Performance score ≥ 85?
□ Largest Contentful Paint < 2.5 seconds?
□ Cumulative Layout Shift < 0.1?
□ No console errors in production build?
□ Works in Chrome + Firefox + Safari + Edge (latest 2 versions)?
□ Mobile tested at 375px viewport?
□ All images: WebP format, lazy-loaded, width+height set?
□ Fonts: preloaded, font-display: swap?
□ JS bundle: no unexpectedly large dependencies?
□ CSS: no unused variables or duplicate declarations?
□ Only transform + opacity animated (no layout triggers)?
□ Memory: event listeners cleaned up, Three.js disposed (if used)?
```

**Score: 12/12 = Perfect | ≥10/12 = ✅ PASS | 8-9/12 = ⚠️ ACCEPTABLE with notes**
**< 8/12 = ❌ FAIL → Return to Protocol 3 Phase 1 performance section**

---

## AXIS 5 — BRAND DNA FAITHFULNESS
*"Does this look like it belongs to this brand?"*

Cross-reference `design_brief.json` against the implementation:

```
□ Every defined color used correctly?
□ Display font used at correct weights and sizes?
□ Body font used with correct line-height and measure?
□ Spacing system consistent with defined base unit?
□ Motion easing matches motion_personality defined in DNA?
□ Target audience would respond correctly to this?
□ Emotional intent from Intent Archaeology comes through clearly?
```

**Score: 7/7 = Perfect DNA match | 5-6/7 = ✅ Minor drift acceptable**
**< 5/7 = ❌ Identity crisis → Refactor tokens and revisit Protocol 1**

---

## AXIS 6 — TREATMENT & SOUL (Claude Design 3 ★v5.1)
*"Is this the RIGHT treatment for the task, and is it grounded in something real?"*

```
□ Register match — output intensity sits within the treatment_register cap (R0–R4) set at
  ORIENT, AND the register itself matches the TASK's ambition (not merely internally consistent)
□ Soul — a stranger can name the subject from the design alone; nothing reskins cleanly onto another brand
□ Anti-slop — trips zero items in the CD3 canon (references/anti-patterns.md #16 Slop Tells / #17 Register Mismatch) unless the DNA pinned one
□ Copy carries — labels/controls/errors read human; active voice; no system-speak
□ Both themes — if two ship, both deliberate + legible (or single-theme is a stated choice)
□ One unforgettable thing — a single deliberate moment the page is built around
```

**Score: ≥ 5/6 with zero HARD FAILs = ✅ | any HARD FAIL = ❌**
HARD FAIL: lorem in a shipped surface · a default font stack with no reason · accent fighting the ground · body text scrolling sideways on mobile.
Full doctrine + register table: references/claude-design-3.md; canonical battery: SKILL.md §10.

---

## FINAL SIGN-OFF SCORECARD

```
╔══════════════════════════════════════════════════════════════════╗
║                  IRON CANVAS FINAL SIGN-OFF                      ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Axis 1 — Awwwards Design Score:    __ /10   (need ≥ 7.5)       ║
║  Axis 2 — Animation Quality:        __ /10   (need ≥ 7/10 ✓)    ║
║  Axis 3 — Taste Test:               __ /7    (need 7/7)          ║
║  Axis 4 — Performance:              __ /12   (need ≥ 10)         ║
║  Axis 5 — Brand DNA Match:          __ /7    (need ≥ 5)          ║
║  Treatment Register (R0–R4):        __       (set at ORIENT; caps DIS)  ║
║  Axis 6 — Treatment & Soul (CD3):   __ /6    (need ≥ 5, no hard-fails)  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ALL AXES PASS:  ✅ DELIVER — on-register, soulful, Awwwards-grade║
║  ANY AXIS FAILS: 🔄 RETURN to remediation pathway (see below)    ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## REMEDIATION ROUTING

| Axis | Fail Reason | Return To |
|------|-------------|-----------|
| Axis 1 low (Design) | Typography/color/layout | Protocol 3 → Phase 1+3 |
| Axis 1 low (Creativity) | Lacks surprise/uniqueness | Protocol 2 → add missing techniques |
| Axis 2 (Animation) | Specific animations janky/purposeless | Protocol 3 → Phase 2 |
| Axis 3 T1 (Fonts) | Generic typography | Protocol 3 → token system |
| Axis 3 T2 (Color) | No drama or tension | Protocol 3 → color tokens |
| Axis 3 T3 (Surprise) | Nothing memorable | Protocol 2 → add micro-interaction |
| Axis 3 T4-T7 | Weak sections/communication | Protocol 3 → targeted polish |
| Axis 4 (Performance) | Speed/technical issues | Protocol 3 → Phase 1 performance |
| Axis 5 (Brand DNA) | Identity drift | Protocol 1 re-run → token correction |
| Axis 6 Register mismatch (CD3) | Wrong treatment for the task | ORIENT — re-set treatment_register to the task's ambition |
| Axis 6 Soul / anti-slop (CD3) | Generic / trips the slop canon | Protocol 1 STUDY — re-harvest the subject's own world |

---

## OUTPUT

Write `verification_report.json`:
```json
{
  "axis_1_awwwards": {
    "design": __,
    "usability": __,
    "creativity": __,
    "content": __,
    "total": __,
    "status": "PASS/FAIL",
    "notes": "..."
  },
  "axis_2_animation": {
    "score": "__/10",
    "fails": [],
    "status": "PASS/FAIL"
  },
  "axis_3_taste": {
    "t1_font": "PASS/FAIL",
    "t2_color": "PASS/FAIL",
    "t3_surprise": "PASS/FAIL",
    "t4_slow_scroll": "PASS/FAIL",
    "t5_screenshot": "PASS/FAIL",
    "t6_competitor": "PASS/FAIL",
    "t7_five_second": "PASS/FAIL",
    "overall": "PASS/FAIL"
  },
  "axis_4_performance": {
    "score": "__/12",
    "fails": [],
    "status": "PASS/FAIL"
  },
  "axis_5_brand_dna": {
    "score": "__/7",
    "drift_areas": [],
    "status": "PASS/FAIL"
  },
  "final_verdict": "DELIVER / REFINE",
  "remediation_required": []
}
```

Present the final verdict and verification_report.json to the agent/user.
If DELIVER: provide the complete implementation.
If REFINE: provide the specific changes needed and the protocols to return to.
