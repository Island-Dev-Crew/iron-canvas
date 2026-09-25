# Direction Fusion — Voice · World · Instrument

> *"Iron Canvas is NOT a template. It's a methodology."*
> Work reads as unusually rich, deep and specific when it comes from more than one lineage —
> and as a reskin when it comes from one.

Direction Fusion is how SCOUT (Phase 3) turns references into an **authored** direction instead
of a copy of the strongest reference or a collage of five. It comes from the Adaptive Design
Intelligence skill (proven on a shipped build: LCP 804 ms, CLS 0, 119 kB of JavaScript) and is
adapted here to Iron Canvas's phases. **A named direction from the operator always overrides it.**

---

## 1. When there is no direction: infer the feel from the subject

Before any reference, read the subject's own world (STUDY + FEEL):

| Subject vocabulary | Ask | Feeds |
|---|---|---|
| **Nouns & instruments** | What objects, tools, surfaces does this subject handle? | material, imagery, the mechanism |
| **Verbs & tempo** | What does it *do*, and how fast? | motion personality, tempo |
| **Materials** | What is it made of, literally or in spirit? (stone, glass, liquid, light, fabric, paper, steel) | the world material, texture, light |
| **Proof state** | What can it actually prove today? (live product, numbers, customers, none yet) | how loud the claims may be; `count` only on true numbers |

Compress it to the **feel line** — `3 adjectives · 1 material · 1 tempo` — for example
*"forged · patient · warm · iron · slow"*. The feel line goes into `feel-profile.json` and the
Studio brief, and its SHA-256 becomes the provenance key for source scoring.

---

## 2. Three sources, three different questions

Choose three exact references (sites, recordings, or screenshot sets) — each answering a
**different** question, so no single source can own the result:

| Source | The question it answers | It may lend | It may not lend |
|---|---|---|---|
| **Voice** | How does this subject *speak*? | type hierarchy, scale ratio, spacing rhythm | colour, imagery |
| **World** | What is it *made of*? | material, surface, colour, imagery, depth rule | layout, type |
| **Instrument** | How do its facts *move*? | temporal behaviour, component states, the proof device | palette, type |

The lanes are disjoint: `Voice → {typography, spatial}` · `World → {material, color, imagery}` ·
`Instrument → {temporal, components}`.

---

## 3. The fusion rules

1. **Project-owned grammar.** At least 3 of the 5 global axes — grid, typography, material, motion,
   tokens — belong to the project, not to any source. No source owns more than 2.
2. **Translate by role, never by value.** A source's "accent that marks the primary action" becomes
   *our* accent in that role — never its hex code.
3. **Mutate at least three axes** against every source: spatial topology · typography and hierarchy ·
   material and rendering language · temporal cadence and interaction cause. Recolouring or swapping
   assets in a reference composition is imitation, not fusion.
4. **Two or three variants**, rotating which source leads the hero, the instrument and the commit
   moment. At R2–R4 these variants *are* the gauntlet's candidates.
5. **The North Star is fed by roles**: *"World lends: paper-over-black instrument blocks;
   Instrument lends: count-up rings that hold."*

---

## 4. Watch, don't guess — evidence classes

References lie in stills. Every claim taken from a reference carries a class:

| Class | Meaning | Example |
|---|---|---|
| **Observed** | seen directly in a recording, a live session or the source code | "the hero pins for about 2 viewports; recorded at 30 fps" |
| **Derived** | inferred from observed frames | "trajectory: an arc; the easing looks like expo-out" |
| **Unverified** | not seen — a guess, a gallery still, a claim in copy | "they use a custom shader" |

A gallery preview never proves scroll, hover, responsive or implementation behaviour. Record the
live site before claiming how it moves. Sampling cadence for recordings: rapid reels 4–8 fps ·
walkthroughs 1–2 fps · long talks every 30–60 s plus scene changes; contact sheets carry frame and
timestamp labels. Easing read from frames is **Derived** at best.

---

## 5. The fusion record

`scout-report.json` records, per source: identity (canonical URL or recording hash), role (Voice /
World / Instrument), what it lends, what was mutated, and the evidence class of each claim. After
the build, a short learning note — sources, what transferred per section, measured results,
lessons — goes into the run's evidence folder so the next fusion starts smarter.

**Rights.** References authorize study, not copying. Recordings and preview clips stay in a
gitignored evidence folder; they are never redistributed in a public repository.
