# Claude Design 3 — The Treatment Doctrine

> **The soul of Iron Canvas, made law.** Every other system in this repo answers
> *how much* (DIS intensity) or *how deep* (Depth Language) or *how the brand feels*
> (Brand Personality Matrix). Claude Design 3 answers the two questions that sit
> *above* all of them and govern every phase: **what treatment does this actually
> call for, and is it grounded in something real?** Read this before Phase 0. It is
> the ceiling and the conscience — the DIS decides magnitude, CD3 decides register
> and truth.
>
> **Position in pipeline:** governs ORIENT(0) register selection → sharpens STUDY(1)
> + FEEL(2) grounding → sets the DIS *reading* at FORGE(4) → adds an axis at VERIFY(7).
> Wired in ROUTING.md as the doctrine every phase inherits.

---

## LAW 1 — Calibrate the treatment, not whether to design (the dynamic range)

The most common failure is a single register applied to everything: every output
pushed toward maximal Awwwards spectacle, or every output flattened to a safe
template. Both are wrong. **The craft is constant; the treatment is calibrated.** A
status dashboard, an internal memo page, a product landing page, and an immersive
brand world each deserve full craft — real hierarchy, considered spacing, a chosen
palette, deliberate type — delivered in the register the task actually calls for.

**THE TREATMENT REGISTER — Iron Canvas's high-dynamic-range axis.** Every project is
placed on this range at ORIENT, from the task's ambition (not the brand's loudness):

| Register | The task | What "full craft" means here | DIS ceiling — the CAP (max), never a floor |
|---|---|---|---|
| **R0 · Utilitarian** | A tool, admin, internal report, docs | Information design: hierarchy, tabular rhythm, state encoded in form (pill/chip/severity), one accent, zero decoration-for-its-own-sake. Polished, never flashy. | systems mostly 0.0–0.2; **restraint is the deliverable** |
| **R1 · Functional** | A SaaS/marketing page that must convert | A clear thesis hero, one memorable moment, disciplined motion that clarifies flow | 0.2–0.5 |
| **R2 · Editorial** | A page they'll keep or share; brand experience | An opinionated point of view, typography with character, an orchestrated reveal | 0.4–0.7 |
| **R3 · Maximalist** | A flagship, an Awwwards run | Layered depth, grid-breaking composition, atmosphere, a signature technique | 0.6–0.9 |
| **R4 · Immersive** | A Type-A world (see surfaces/immersive-3d) | Inhabited depth, camera rail, one material — Agent F + §22 evidence gate | 0.8–1.0 |

> **The range IS the point.** Iron Canvas was strong at R3/R4 and weak below. CD3
> makes R0–R2 first-class: a restrained treatment is *executed*, not *skipped*. The
> span from R0 to R4 is the "vast, high dynamic range" — one craft, five registers.
> Register is orthogonal to the Brand Personality Matrix: a *serious/classic* brand
> can need an R0 dashboard or an R2 editorial page. **Register = the task's ambition;
> BPM = the brand's voice; DIS = the magnitude of effect.** All three compose.

**When unsure, drop a register.** A well-composed R1 page is never wrong; an
over-produced R3 page on an R0 task is design malpractice. Match complexity to the
vision: maximal directions need elaborate execution; restrained directions need
*precision* in spacing, type, and detail. Elegance is executing the chosen register well.

---

## LAW 2 — Ground it in the subject (the soul)

Distinctive design does not come from a bag of effects; it comes from **the subject's
own world** — its materials, instruments, vocabulary, and the specific job the page
does. Before choosing a palette or a typeface, pin: the one concrete subject, its
audience, and the page's single job. Then mine the subject's world for the choices:

- **Build with real content, never lorem.** Real words expose real hierarchy problems.
- **Copy is design material, not decoration.** Name things the way a person recognizes
  them (a user manages *notifications*, not *webhook config*). Active voice; a control
  says exactly what happens ("Publish" → a toast that says "Published"). Errors explain
  what went wrong and how to fix it. Specific beats clever.
- **The one unforgettable thing.** Design for the single moment someone screenshots;
  everything else is context leading to it. (Reinforces Taste Doctrine law 5.)
- **Structure must encode truth.** Numbered markers, eyebrows, dividers, and labels are
  used only when they carry real information — a genuine sequence, a real taxonomy.
  Decorative `01 / 02 / 03` on non-sequential content is slop. Question every structural
  device: does it encode something true, or just fill space?

Soul is measured, not asserted: at VERIFY, a stranger should be able to name the
subject from the design alone. If the output could be reskinned onto any other brand
without breaking, it has no soul yet — return to STUDY.

---

## LAW 3 — The fundamentals CD3 refuses to compromise (every register)

These hold at **every** register, R0 through R4 — they are the floor of craft:

1. **Typography carries the page even when the page isn't about type.** Pair a
   characterful display face with a complementary body face *deliberately* — not the
   same families reached for on every project. Set a type scale and stay on it;
   `text-wrap: balance` on headings; ~65ch measure for running text; letter-spacing on
   uppercase labels. In agentic/artifact contexts, inline faces (no CDN font that can
   silently fall back). This deepens Agent-C's typography sweep and the DIS Kinetic
   Typography system.
2. **Choose neutrals; don't default to them.** A pure mid-grey reads as unconsidered; a
   neutral with a slight hue bias toward the accent reads as chosen. Pure white / near-
   black grounds are fine when they *suit the subject* — the point is the neutral was
   picked. (Feeds the color-system reference + Agent-A tokens.)
3. **Design both themes with equal care.** Token-level: define the palette as custom
   properties, redefine only the tokens per theme, style through the tokens. Never a
   naive invert; keep contrast legible and the accent working on both grounds. A design
   may deliberately commit to one theme — but make it a *choice*, not an omission.
4. **Let layout do the spacing.** Flex/grid + `gap`, not per-element margins that
   collapse or double. Wide content scrolls inside its own container; the page body
   never scrolls sideways. `tabular-nums` wherever digits align.
5. **Spend boldness in one place; keep everything around it quiet.** If the accent
   fights the ground, shift it toward analogous or drop saturation — don't add a second
   loud thing. (This is the discipline behind Taste Doctrine law 1 — restraint.)
6. **When it's a UI, not a document, the craft shifts to information design.** A tool is
   scanned and operated, not read top-to-bottom: surface the summary before the detail;
   encode state in form (pill/chip/severity stripe) so what needs attention reads at a
   glance; semantic color (good/warn/critical) is separate from the accent hue. Charts
   get the same care as type. (Governs the R0/R1 registers and the Dashboard surface.)

---

## LAW 4 — The anti-slop canon (what CD3 forbids on sight)

AI-generated design clusters around a few tells. Where the operator/DNA pins a
direction, that wins — including if they *ask* for one of these. Where nothing is
pinned, **never spend the freedom on a default.** The full veto list lives in
[anti-patterns.md](anti-patterns.md); the canon:

- warm cream (#F4F1EA) + a serif display + a terracotta accent, presented as "editorial"
- near-black with a lone acid-green/vermilion pop as the whole idea
- Inter or Space Grotesk chosen as the "safe" face with no reason
- emoji as section markers; everything centered; `rounded-lg` on everything
- a purple→blue gradient hero on white
- uniform radius/spacing/shadow across every component (no hierarchy)
- decorative numbered markers on non-sequential content
- library defaults (shadcn/Tailwind base) shipped as if they were a finished design

A design that trips the canon with nothing pinned to justify it **fails VERIFY**.

---

## LAW 5 — How CD3 composes with the existing systems (no duplication)

> **Why a register cap *and* the other caps?** Iron Canvas already caps intensity by
> Performance Tier (user experience), Project Type / Surface Pack (structural terrain), and
> Mode (team horsepower). The Treatment Register adds the one axis none of those express:
> **the task's ambition.** They are not redundant — they answer different questions and simply
> **compose via `min()`** (the most restrictive wins). On some tasks two caps coincide (an R1
> page under a Tier-1 perf budget); that is harmless overlap, not conflict. The register is the
> outermost clamp because ambition is the thing a restrained-but-crafted R0 output needs and the
> others cannot supply.


CD3 governs; it does not replace. The wiring:

- **ORIENT (Phase 0):** choose the Treatment Register (R0–R4) from the task's ambition.
  Record `treatment_register` in `orient-decision.json` beside `surface_pack` and
  `depth_intensity_hint`. Register caps the DIS ceiling per the LAW-1 table.
- **STUDY + FEEL (Phases 1–2):** LAW 2 sharpens DNA extraction — harvest the subject's
  materials/vocabulary as design inputs; the BPM still sets brand voice.
- **FORGE (Phase 4) + DIS:** the DIS reads its 9 systems *within* the register ceiling.
  At R0 the systems sit near 0 **on purpose** — that is executed restraint, and Agent-A/C
  deliver information-design polish, not a stripped maximalism.
- **VERIFY (Phase 7):** CD3 adds **Axis 6 — Treatment & Soul** (below). It does not
  weaken the Awwwards axes; it stops a beautiful-but-off-register or soulless output.

### VERIFY · Axis 6 — Treatment & Soul (need ≥ 5/6; any hard-fail blocks)

```
□ Register match — the treatment matches the task's ambition (R0–R4), not over/under-produced
□ Soul — a stranger can name the subject from the design alone; nothing reskins cleanly onto another brand
□ Anti-slop — trips zero items in the LAW-4 canon (unless the DNA/operator explicitly pinned one)
□ Copy carries — labels/controls/errors read as written-by-a-human; active voice; no system-speak
□ Both themes — if two themes ship, both are deliberate and legible (or single-theme is a stated choice)
□ One unforgettable thing — there is a single deliberate moment the page is built around
HARD FAIL (any one blocks ship): lorem in a shipped surface · a default font stack with no reason ·
  the accent fighting the ground · body text scrolling sideways on mobile
```

---

**No authority without evidence.** CD3 is enforced at VERIFY with captured proof
(screenshots, the register on record, the anti-slop pass) — never asserted. The
treatment is a decision on the record, not a vibe. Roll Tide.
