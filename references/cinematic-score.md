# The Cinematic Score — the motion contract

> **The agent writes the score. The runtime performs it.**
>
> *"Every animation must serve a purpose. This protocol ensures no animation is added
> arbitrarily — each one is designed, categorized, and justified before a single line of motion
> code is written."* — the v3 Motion Architecture, restored

Motion coordinated through prose breaks in predictable ways: two things own the scroll, two
atmospheres fight, reduced motion leaks, the climax lands next to another climax, and nobody can
say why a section moves. The **score** replaces prose with a contract. It is a small JSON document
that says, for the whole page:

- the **motion sentence** — the arc the visitor travels;
- one **act** per section — its job, its emotion in and out, its role, its trigger;
- the **shots** inside each act — verbs from one vocabulary placed on a timeline;
- exactly **one signature**, exactly **one clock**, and what every act *means* when it is still.

It is written at **PACKAGE (3.9)**, performed at **FORGE (4)** by the Score Runtime
([`runtime/canvas-score.js`](../runtime/canvas-score.js)), checked by
[`scripts/ic-preflight.mjs`](../scripts/ic-preflight.mjs) before hand-off, and proven at **VERIFY
(7)**. The same acts drive the launch film and the generative shot list (§7). The words it uses —
personalities, verbs, tempos — are defined in [`motion-language.md`](motion-language.md).

---

## 1. The motion sentence

Cinematic pages have an arc; busy pages have a list. The sentence is the arc:

| Beat | Intent (what the visitor should feel) | Energy | Typical verbs |
|---|---|---|---|
| **establish** | the world, before the point — orient the viewer, promise the feeling | medium | `unveil` (lines), `focus`, `fade` |
| **accelerate** | the pull toward it — momentum, density rising | rising | `unveil` (words), `tilt`, `rise` |
| **pause** | a held breath — the quiet chapter that makes the next moment land | **low** | `fade` on `tide`, nothing else |
| **reveal** | the thing itself — the first sight of the mechanism | high | `bloom`, `wipe`, `iris`, `draw` |
| **recover** | let the eye rest — supporting proof, lower energy | low | `rise` (staggered), `drift` |
| **climax** | the one unforgettable moment — the mechanism, acted out at full scale | **peak** | the signature: a scene, a `sweep`, a `count` of something real |
| **resolve** | the calm after light — the invitation, the action | settling | `rise`, then stillness |

**The register sets the length of the sentence** (the Studio compiles exactly this):

```
R0  establish → resolve
R1  establish → reveal → resolve
R2  establish → accelerate → pause → reveal → resolve
R3  establish → accelerate → pause → reveal → recover → climax → resolve
R4  the full sentence, as a camera rail through one world
```

**Two loud beats never touch.** At R2 and above, a `pause` or `recover` sits between any two
high-energy acts. The quiet chapter is not filler — it is the reason the climax lands.

---

## 2. Acts — the section contract

Every section of the page is one act. Each act declares:

| Field | Meaning | Example |
|---|---|---|
| `id`, `el` | name and CSS selector of the section | `"reveal"`, `"#act-reveal"` |
| `stage` | its beat in the motion sentence | `"reveal"` |
| `job` | what the section does for the visitor | `orient · establish_stakes · explain_system · compare · trace_evidence · show_progression · explore_network · inspect_detail · commit · handoff` |
| `role` | `signature` (exactly one per page) · `support` · `stillness` | `"signature"` |
| `intent` | what the visitor feels here, in words a person would use | `"the first sight of the mechanism"` |
| `emotion` | `{ "in": "...", "out": "..." }` — the feeling on arrival and on leaving | `{ "in": "curious", "out": "certain" }` |
| `trigger` | `load` (play now) · `enter` (play on arrival) · `scrub` (scroll is the clock) | `"scrub"` |
| `personality` | the act's register of time (default: the score's house personality) | `"bloom"` |
| `pin`, `length`, `scrub`, `hold` | scrub acts: pinned, how much scroll, smoothing, the rest on the final frame | `true`, `"220%"`, `0.9`, `0.4` |
| `reduced` | what the still frame *means* under reduced motion — the settled state | `"the mechanism diagram, fully drawn"` |
| `fallback` | what shows without WebGL or on a slow network | `"poster frame of the scene"` |
| `shots` | the verbs on this act's timeline (§3) | |

**Jobs choose families** (from the Adaptive Design Intelligence temporal grammar):

| Job | Strong motion families | Avoid |
|---|---|---|
| `orient` | an atmospheric field; a restrained camera settle; `unveil` + `focus` | dense controls before context |
| `explain_system` | a pinned transformation; a diagram that draws itself (`draw`); a state morph | an unexplained 3D object |
| `compare` | a synchronized split; `wipe` between states | free parallax |
| `trace_evidence` | a provenance rail; `count` of real numbers | auto-moving labels |
| `show_progression` | a scroll-linked timeline | an endless marquee |
| `commit` | stillness; one decisive action | a climax competing with the action |

---

## 3. Shots — verbs on a timeline

A shot places one verb at one moment: `at` (seconds on the act's timeline — or a proportion of
the act's scroll in `scrub` acts), `target`, `verb`, optional `split`, `personality`, `duration`,
`stagger`, `from`/`to` overrides, and `note` — the director's note that says why the shot exists.
A shot can instead `call` a hook (for example the WebGL camera: `{ "at": 0.5, "call": "signature",
"args": "peak" }`).

**Timing follows emotional weight.** The oldest Iron Canvas storyboard said it best: *"More frames
at critical moments (lid opening, ingredient explosion). Fewer frames during slow transitions
(subtle glow, settling)."* In a score that means:

- the **signature act** gets the most scroll: 200–280 % of the viewport, pinned, with a `hold`;
- quiet acts get 100–140 %, unpinned, one shot;
- inside an act, shots crowd around the peak and thin out toward the rest;
- every pinned act ends with `hold` 0.3–0.5 so the final frame — where the meaning sits — rests.

**Spend verbs like money.** Two to four shots per act. One in the pause. `sweep` and `bloom` once
per page. `count` only on numbers that are true.

---

## 4. The contract's teeth — portfolio rules

`scripts/ic-preflight.mjs` checks every rule below in one pass and reports each violation with its
JSON path. Errors block PACKAGE hand-off; warnings go to the critic.

1. **One signature.** Exactly one act has `role: "signature"`. (error)
2. **One clock.** Scroll-owned motion lives only in `scrub` acts; nothing else pins or scrubs, and
   the WebGL camera subscribes to the runtime's `progress` events instead of reading scroll itself.
   Two owners in one viewport is **Anti-Pattern #19 TWO CLOCKS**. (error)
3. **One vocabulary.** One house personality plus at most one accent for the signature. `drift`
   (scroll-owned motion) never counts, and `tide` never counts while it only breathes in quiet acts
   (`stillness` / `pause`). Verbs only from the runtime's seventeen. (error for unknown verbs;
   warning for a second accent)
4. **Quiet between loud.** At R2+, two high-energy acts (`reveal`, `climax`, or any act with
   `role: signature`) are never adjacent without a `pause` or `recover` between them. (warning)
5. **Every act has a feeling.** `intent` and `emotion.in` / `emotion.out` are filled with words a
   person would use — not "TODO", not "Static". (error when empty; warning under 12 characters)
6. **Every act has a still meaning.** `reduced` says what the settled frame communicates. (warning)
7. **Mobile never pins on the web pack at R0–R3.** Pinned acts declare a mobile semantic
   transformation instead; the immersive-3d pack may keep a simplified rail if it holds 40 fps. (warning)
8. **Scrub consistency.** A `scrub` act has a `length` or an `end`; an `enter` act has no `length`. (error)

**Budgets** the score must fit (web pack, R3/R4 defaults): first-load JS ≤ 180 kB gzipped with
three.js lazy-loaded; above-the-fold media ≤ 6 MB; one display face and one text face; DPR 1.5
desktop / 1 mobile; particle counts set by viewport.

**Collision rules:** one dominant spectacle per viewport; aurora, iridescence, cloud gradients and
frosted glass are *alternative* atmospheres — pick one; never autoplay human video beside another
moving hero; evidence grids stay quiet; motion around proof and around the commit settles.

---

## 5. A complete score

```json
{
  "title": "Tidewater Coffee — the roast",
  "logline": "You can taste the fire before you smell the coffee.",
  "personality": "silk",
  "tempo": 1.1,
  "seed": 5417,
  "breath": { "amplitude": 0.8 },
  "signature": "roast",
  "acts": [
    { "id": "arrival", "el": "#arrival", "stage": "establish", "job": "orient", "role": "support",
      "intent": "a dark room, one warm light, the smell of something about to happen",
      "emotion": { "in": "curious", "out": "drawn in" },
      "trigger": "load", "reduced": "the headline and the warm light, at rest",
      "shots": [
        { "at": 0.1, "target": ".label", "verb": "fade" },
        { "at": 0.25, "target": "h1", "verb": "unveil", "split": "lines", "note": "the voice arrives line by line" },
        { "at": 0.7, "target": ".lede", "verb": "focus" }
      ] },
    { "id": "origin", "el": "#origin", "stage": "pause", "job": "establish_stakes", "role": "stillness",
      "intent": "a held breath — where the beans come from",
      "emotion": { "in": "drawn in", "out": "trusting" },
      "trigger": "enter", "personality": "tide", "reduced": "the farm photograph and one sentence",
      "shots": [ { "at": 0, "target": ".lede", "verb": "fade", "note": "the quiet chapter — no transforms" } ] },
    { "id": "roast", "el": "#roast", "stage": "climax", "job": "explain_system", "role": "signature",
      "intent": "green beans turn to amber, then to deep brown, as the visitor scrolls the heat up",
      "emotion": { "in": "trusting", "out": "hungry" },
      "trigger": "scrub", "pin": true, "length": "240%", "scrub": 0.9, "hold": 0.4, "personality": "bloom",
      "reduced": "three stills — green, amber, brown — side by side with their temperatures",
      "fallback": "the three stills as the poster",
      "mobile": "no pin — the three stills stack, each rising into view with its temperature",
      "shots": [
        { "at": 0.05, "target": "h2", "verb": "unveil", "split": "words" },
        { "at": 0.2, "call": "roast", "args": "heat", "note": "the WebGL beans track the scroll" },
        { "at": 0.62, "target": ".temp", "verb": "count", "note": "real roast temperatures only" },
        { "at": 0.8, "target": "h2", "verb": "sweep" }
      ] },
    { "id": "order", "el": "#order", "stage": "resolve", "job": "commit", "role": "support",
      "intent": "the calm after the fire — one clear way to order",
      "emotion": { "in": "hungry", "out": "decided" },
      "trigger": "enter", "reduced": "the offer and the button",
      "shots": [
        { "at": 0.05, "target": "h2", "verb": "rise" },
        { "at": 0.25, "target": ".cta", "verb": "rise", "stagger": 0.06 }
      ] }
  ]
}
```

Schema: [`runtime/score.schema.json`](../runtime/score.schema.json). The contract fields (`stage`,
`job`, `role`, `emotion`, `reduced`, `fallback`, `signature`) are documentation to the runtime —
it ignores them — and law to the preflight and the critic.

---

## 6. Performing the score

- **Vanilla / static pages** — the Score Runtime, wired in four steps
  ([`runtime/README.md`](../runtime/README.md)): mark `ic-js` before first paint, hide `[data-ic]`
  entrance targets behind a 3 s CSS failsafe, load GSAP + ScrollTrigger + Lenis, call
  `performScore(score, { hooks })`.
- **React / Next.js** — the runtime is framework-agnostic; call it from one client component
  inside `useEffect`, and call `show.kill()` on unmount. If the team ports verbs to its own hook,
  the score stays the contract and the verb names keep their meaning.
- **WebGL** — the scene never reads scroll. It subscribes:
  `show.on('progress', (actId, p) => world.setAct(actId, p))`, and the signature act's `call`
  hook fires the peak. Camera = a pure function of (act, progress).
- **Modes, chosen once, never mixed** — `full`; `reduced` (prefers-reduced-motion or
  `?motion=reduced`: short opacity-only reveals, no pins, no breath, native scroll); `static`
  (`?motion=off`, GSAP missing, or `motion: false`: final states only). `show.kill()` is the kill
  switch; `window.__icScore` exposes the controller to evidence harnesses; `?score=debug` draws
  the markers and logs the act table.

---

## 7. One score, three outputs

The score is the lingua franca between the page, the film and the generative engines.

| Output | How the score drives it |
|---|---|
| **The site** | performed live by the runtime |
| **The film** (PREMIERE, Phase 8) | the page is rendered as video by a seekable timeline. With HyperFrames (Apache-2.0, HTML → video): GSAP timelines are paused and **seeked, never played**; no wall clock (`Date.now`, `requestAnimationFrame`, timers); seeded randomness; every asset loaded before frame 0; fps and size locked. One timeline → the launch film, social cut-downs, README loops. |
| **The generative shot list** | the score's beats compile into a Seedance 2.5 job's TIMELINE — `[0–3 s] establish`, `[3–6 s] reveal`, … — with one camera move per beat, cause before effect. The Studio emits it (`studio/compile.mjs`). |

**The twin camera.** When Blender and video are both on (R2+, depth ≥ 0.4), the signature scene's
camera rail is authored once: Blender renders a flat grey **clay** clip along it
(`camera-rail.json` + `clay.mp4`), Seedance uses that clip as `@Video1` for camera and blocking only,
and the site's WebGL camera reads the same stations. **The film and the site match shot for shot.**
Details: [`power-engines.md`](power-engines.md).

---

## 8. Writing a good score

1. **Start from the mechanism sentence** (FEEL). The signature act acts it out; if you cannot say
   what the signature shows in one sentence, the score is not ready.
2. **Write intent first, verbs second.** An act without a feeling is decoration with a schedule.
3. **Let the quiet act be quiet.** One `fade` on `tide`. No transforms.
4. **Pair verbs into phrases**: `unveil` the headline → `focus` the lede → `rise` the actions.
   The signature gets `bloom` or `iris`, and `sweep` once at the peak.
5. **Rest on the final frame.** `hold` on every pinned act. The settled state carries the meaning.
6. **Write director's notes.** `note` on any shot whose reason is not obvious. The critic reads them.
7. **Rehearse** with `?score=debug`; capture with `show.seek(actId, p)` at 0, 0.5 and 1 for
   every act.

---

## 9. Evidence for a score

- station screenshots for every act at progress 0.5 and 1 (desktop 1440 × 900, mobile 390 × 844);
- reduced-motion screenshots showing each act's declared `reduced` state;
- page progress reaches ≈ 1 at the end of the scroll; exactly one scroll owner;
- zero console or page errors; no horizontal overflow;
- the 5-second arrival video and the 15-second slow scroll (VERIFY Axis 7).

Harness: [`templates/scroll-capture.spec.ts`](../templates/scroll-capture.spec.ts) steps the scroll,
dwells, screenshots each station, and asserts the liveness metrics.
