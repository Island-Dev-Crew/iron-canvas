# Gauntlet Loop — the build method for the premium tier (R2–R4)

> **How Iron Canvas forges its most immersive work.** At the high registers, Iron Canvas
> does not one-shot a scene, a world, or a game frontend and refine it in place. It runs a
> **gauntlet loop**: fan out N candidate builds, shadow each with a **blind critic** that
> scores it against a **falsifiable bar**, and loop until a candidate clears — then ship the
> winner. This is what makes the premium tier premium: the output you see is the survivor of
> a fleet, not the first draft. (IDC's `gauntlet-loop` island, applied inside Iron Canvas.)
>
> **Position:** the build method for the **generative** phases — FORGE(4) / IMMERSE(4.5) /
> GENERATE(5) — at registers **R2–R4 only**. Set at ORIENT; governed by the Treatment Register.
> COMPOSE(6) is deliberately **excluded**: it is deterministic integration (it assembles the
> gauntlet's winners into the page/scroll/state system), not a space you fan out and compete —
> fanning out N assemblies of the same winning parts is motion without exploration.

---

## THE REGISTER GATE — when the gauntlet fires (and when it must not)

The gauntlet loop is powerful and expensive. It fires **only where "loop until wowed" is the
goal**, which the Treatment Register (CD3 §0.2) decides:

| Register | Gauntlet? | Why |
|----------|-----------|-----|
| **R0 Utilitarian** | ❌ OFF | Restraint IS the deliverable. Fanning out to "wow" a dashboard is over-production — **Anti-Pattern #17 (Register Mismatch)**. Build it once, well. |
| **R1 Functional** | ❌ OFF (single memorable moment may loop) | A thesis hero + one moment; loop only that one moment if it earns it. |
| **R2 Editorial** | ✅ ON (scoped) | Loop the signature moments (hero, key scroll section), not every block. |
| **R3 Maximalist** | ✅ ON | Flagship — fan out and loop the whole composition. |
| **R4 Immersive** | ✅ ON (mandatory) | The world IS the site (`surfaces/immersive-3d`); IMMERSE(4.5) runs as a full gauntlet. |

Running a gauntlet at R0/R1 is itself a **VERIFY Axis 6 failure**. The register is the throttle.

---

## THE THREE SLOTS — filled with Iron Canvas's own parts

Every gauntlet loop is three slots (per the `gauntlet-loop` island). Iron Canvas already
ships each part, so the loop is a *wiring*, not new machinery:

1. **Task** — the artifact to forge, taken verbatim from the **Design PRD** (Phase 3.9): the
   structural build (FORGE — hero, key sections, component/motion grammar), the world
   (immersive-3d), the game frontend (game-realtime), a scroll sequence, a generated artifact.
2. **Build method** — **fan out N candidates**, each built by the owning agent (**Agent-A/C**
   for FORGE candidate directions — token+shell grammar, hero, key sections; **Agent F** for
   worlds; **Agent-B/D** for scroll/scenes/§19 systems; the HUD/feel build for game frontends),
   isolated with `worktree-fleet` so candidates never overwrite each other. Each candidate is
   shadowed by a **blind critic** — a `cross-family-review` seat (independent model family,
   fresh clone) that scores the *artifact*, never the builder's self-report. Losers are killed;
   survivors reseed the next round.
   **★v6 — the candidates are SCOUT's Direction Fusion variants.** At FORGE the N directions are
   the 2–3 fusion variants recorded in `scout-report.json` — each rotates which source (Voice ·
   World · Instrument) leads the hero, the instrument and the commit — never N random restyles
   of one idea. At GENERATE the gauntlet is **the media tournament** (candidates by register
   R2 2 · R3 3 · R4 4 → blind critic → `engines/ledger.mjs select` with a written reason →
   verify → promote with provenance).
3. **Bar to hit (falsifiable — this is the whole discipline)** — a candidate clears only on
   **captured evidence a critic could fail it on**, never vibes:
   - the **immersion scorecard ≥ 4.0, zero auto-fails** (`templates/immersion-scorecard.md` —
     ★v6 six axes including Aliveness);
   - a **North Star reference-peg screenshot diff** (the loop shines because the critic is
     *visual* — screenshot the build, diff it against the North Star, fail until they converge);
   - the pack's **§5 VERIFY profile** + the **7-axis audit read at the register** (Axis 6 = CD3;
     ★v6 Axis 7 = Aliveness, scored from the recordings and never waived);
   - evidence captured by the **Playwright harness** (`templates/smoke.spec.ts`; ★v6
     `templates/scroll-capture.spec.ts` for station captures) — screenshots at every camera
     station, console-clean, zero horizontal overflow, fallback-ladder proven — ★v6 plus the
     aliveness recordings: a video of the first 5 seconds, a 15-second slow scroll, a
     reduced-motion recording.

> You can't wow your way past the bar — the critic must be able to fail you on captured evidence.

---

## THE CRITIC'S FOUR LENSES ★v6

The blind critic reviews as three critics at once — an **Awwwards judge**, a **principal
engineer**, an **accessibility auditor** (*"Be honest. Sycophancy here is expensive."*) — and a
fourth: a **creative director**, who watches the recordings, reads the score's director's notes
(`note` on each shot, `intent` and `emotion` on each act) and asks:

- *"Does the motion serve the story, or is it noise?"*
- *"What would make someone say 'show me that again'?"*
- *"Which section feels leftover?"*

The creative director scores **Axis 7 (Aliveness) from the recordings** — arrival (first 5 s),
heartbeat and hand-feel (the slow scroll and the hover/focus sweep), breath, the composed still
(the reduced-motion recording), and whether the score held (one signature, one clock, each act's
emotion recognisable in its station screenshot). A candidate that is correct and dead fails
(Anti-Pattern #18 LIFELESS) exactly as an over-produced one does (#17).

---

## THE TWO HARD EDITS (IDC's, carried in)

1. **The bar must be falsifiable.** "Make it stunning" makes the critic decorative. Iron
   Canvas already gives the loop a real bar (scorecard ≥ 4.0 + North Star peg + §22 evidence),
   so the critic can genuinely fail a candidate. Keep it that way.
2. **Never start cold.** The loop optimizes toward whatever direction it is given; pointed at a
   blank page it polishes the wrong thing at great cost. Iron Canvas structurally prevents this:
   the gauntlet runs **only after** Phases 0–3.9 produce the **Design PRD + North Star** — that
   IS the brief. If the PRD/North Star are missing, do NOT gauntlet; go back and build them.

---

## RUNNING IT — caps first, or it never returns

Loops burn hours and tokens; an uncapped loop against an unreachable bar does not terminate.
Set both **up front**, and state which are enforced vs advisory:

```
ROUND CAP:     default 3 rounds per artifact (a candidate that can't clear in 3 → escalate to
               the operator with the best-so-far + the critic's blocking evidence).   [advisory — you are the stop]
TOKEN BUDGET:  set per run from the tier's budget; when spent, ship best-so-far + disclose.    [advisory]
FLEET WIDTH:   R2 = 2 candidates · R3 = 3 · R4 = 3–4 (worlds are expensive).                    [enforced by fan-out width]
```

A tie keeps the incumbent (cheapest survivor). Record the round count and the winning
candidate's evidence in the **run ledger** — a `gauntlet-ledger.md` (or a `gauntlet` block in
the run's `verification-report.json`) written to the run's evidence dir: one row per round with
each candidate's critic verdict + scored bar, the winner marked, and the surviving blocking
evidence if the round cap was hit. This is the premium tier's proof of forging — without it, a
"gauntlet-forged" claim is authority without evidence.

---

## GRADUATION — gauntlet for wow, VERIFY for proof

The gauntlet loop gets a **wow-grade candidate fast**; it is the lightweight cousin of a full
governance gate. In Iron Canvas the **Phase 7 7-axis VERIFY + the §22 evidence gate** ARE that
gate — the real definition-of-done you would defend to a stranger. So: **gauntlet-forge the
candidate in IMMERSE/GENERATE, then it must still pass VERIFY.** Say which you are running so no
one mistakes a wowed candidate for a shipped, signed-off build. (Honest edge, per the island: a
browser oneshot is a prototype; store/platform productionization is a separate effort —
`transport-complete` / `productionize-opinion`.)

---

## Credit

The gauntlet loop was coined by [Matt Schumer](https://x.com/mattshumer_); its generator↔evaluator
core is Anthropic's evaluator-optimizer from *Building Effective Agents* (2024). Adopted into the
IDC archipelago (`gauntlet-loop`) with the falsifiable-bar and no-cold-start edits, and wired here
into Iron Canvas's premium tier. Supersede and preserve.

**No authority without evidence. You can't wow your way past a bar the critic can't fail you on.**
