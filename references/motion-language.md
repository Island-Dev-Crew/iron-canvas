# Motion Language — the living doctrine

> *"Kinetic Energy — Everything feels alive, intentional, moving."* — FEEL.md, the first Feel Brief
>
> *"Motion without budget is noise."* — references/motion-budget.md

This file is Iron Canvas's **one motion vocabulary**: the aliveness floor, the seven personalities,
the curve roles, the three tempos, arrival, heartbeat, hand-feel, breath, stillness, transitions,
type in motion, camera, and sound. It is bound one-to-one to the Score Runtime
([`runtime/canvas-score.js`](../runtime/canvas-score.js)) so the words an agent writes are the
motion a visitor sees. Where an older file names a curve or a tempo, this file wins.

Read it at FEEL (to choose the kinetic signature), at PACKAGE (to write the score —
[`cinematic-score.md`](cinematic-score.md)), at FORGE (Agent-B, Agent-C), and at VERIFY (Axis 7).

---

## 1. Why motion is the soul

The first Iron Canvas page (March 2026, restored as [`showcase/origin.html`](../showcase/origin.html))
produced the depth, breath and beauty people remember **with no animation library at all**:

- three hairline gold rings turning at **18 s clockwise, 28 s counter-clockwise, 12 s clockwise** —
  their least common multiple is 252 s, so the composition never visibly repeats for four minutes;
- four glowing beads riding those rings like point lights;
- a hexagon core that **breathes 12 px every 6 s** while a soft wash of light crosses it every 4 s;
- a still film of grain at **3.2 %** laid over everything, so the content scrolls *under* it;
- one gold hue at about **sixteen opacities**, from a .02 watermark to a .5 bead halo — depth made of light;
- **10rem of dark air** between sections;
- **one curve** for every entrance, `cubic-bezier(0.16, 1, 0.3, 1)`: it covers most of the distance
  at once, then exhales into place for most of a second — a heavy object settling on a damper.

By 1.7 s after load the type is still and only the mechanism keeps breathing. That is the feeling
to protect: **motion as a slow mechanical heartbeat in one place, crisp confident hand-feel
everywhere else, and depth from light, grain and darkness.** The stack is irrelevant; the direction
is everything. Every later tier — GSAP, WebGL, film — is the same feeling at a higher altitude.

---

## 2. The Aliveness Floor — never waived

Five things ship on **every surface at every register**, R0 through R4. The Treatment Register
(CD3, SKILL.md §0.2) decides *how much* moves and how loudly; the floor guarantees that something
always breathes. **Restraint is not stillness.** A build missing any of the five fails
**Anti-Pattern #18 LIFELESS** and VERIFY **Axis 7 (Aliveness)**, which no register can waive.

| Floor element | What it is | The numbers | Quietest form (R0) | Fullest form (R4) |
|---|---|---|---|---|
| **ARRIVAL** | One designed first moment — the load choreography | ≤ 1.5 s total; 50–150 ms steps; never everything at once | title → content → actions, 600–900 ms fade-and-rise, three steps | camera-settle intro, one move of 1.5–3 s ending at station 0 |
| **HEARTBEAT** | One perpetual, low-amplitude element that never visibly loops | co-prime periods (4 · 6 · 7 · 11 · 13 · 18 · 28 s); travel ≤ 12 px; alpha swings ≤ .2 | a breathing status dot (scale 1 → 1.15 → 1, 2 s) or a live-data tick | the world itself breathes: fog drift, particle flow, light |
| **HAND-FEEL** | Every interactive element answers hover, press and focus | tick ≤ 0.25 s; state 0.3 s; press = scale .98 or 1 px down | full hover / active / focus-visible on every control | the same, plus cursor lean and magnetic pull on fine pointers |
| **BREATH** | Air, plus one ambient layer | ≥ 20 % of every viewport breathes; grain .03–.04 | air + a light ladder (one hue, many alphas) | grain, mesh that breathes, atmosphere, fog as brand |
| **COMPOSED STILL** | The reduced-motion and no-JS path, designed | rests on the final designed frame; never blank | the same page, at rest | Tier I still of the world, plus the kill switch |

**How to read the floor at low registers.** At R0 an arrival is 600 ms and a heartbeat is one dot.
That is enough: a calm tool that breathes reads as *cared for*; a dead one reads as *abandoned*.
Calm is not dead. At R4 the floor is invisible because the whole world satisfies it.

---

## 3. The seven personalities — the emotional register of time

One vocabulary for GSAP, for CSS, and for the runtime. Pick **one house personality** per project
and at most **one accent personality** for the signature moment; quiet chapters may rest on
`tide`, and scroll-owned motion is always `drift`. Keep to **three duration families** or fewer
(hands, entrances, ambience).

| Personality | Curve (GSAP · CSS) | Duration · stagger | It feels like | Reach for it when |
|---|---|---|---|---|
| `silk` | `expo.out` · `cubic-bezier(0.16, 1, 0.3, 1)` | 1.4 s · 0.035 | a heavy object on a damper: lands at once, exhales for most of a second. **The original Iron Canvas curve.** | luxury, editorial, unhurried confidence; refined ≥ 6 |
| `tide` | `sine.inOut` · `cubic-bezier(0.37, 0, 0.63, 1)` | 2.4 s · 0.08 | water arriving and leaving; breathing | contemplative ≥ 7, wellness, oceanic, slow luxury |
| `gravity` | `power4.out` · `cubic-bezier(0.22, 1, 0.36, 1)` | 1.1 s · 0.05 | weight, authority, a thing that has decided to arrive | serious ≥ 7 with bold ≥ 6; institutions, finance, industry |
| `spark` | `back.out(1.7)` · `cubic-bezier(0.34, 1.56, 0.64, 1)` | 0.6 s · 0.025 | a small overshoot of joy | playful ≥ 7; also the **tick** for micro-moves everywhere |
| `snap` | `power3.inOut` · `cubic-bezier(0.76, 0, 0.24, 1)` | 0.5 s · 0.02 | precision; a decisive cut | technical ≥ 7, fast ≥ 7; tools, dashboards, dev products |
| `bloom` | `expo.inOut` · `cubic-bezier(0.87, 0, 0.13, 1)` | 1.8 s · 0.06 | light opening; the reveal of something precious | the signature reveal — once per page |
| `drift` | `none` · `linear` | scrub | the camera travelling; depth by velocity | anything scroll owns: parallax, scrubs, rotations |

### The curve roles (CSS tokens every build ships)

The runtime handles personalities in JavaScript. CSS-only work (Tier I, hover states, the
no-library path) uses **roles**, never raw values:

```css
:root {
  --ease-arrive:  cubic-bezier(0.16, 1, 0.3, 1);    /* every entrance and state change — the calm exhale */
  --ease-tick:    cubic-bezier(0.34, 1.56, 0.64, 1); /* micro-moves of 0.25 s or less ONLY — "the Iron Spring" */
  --ease-breathe: cubic-bezier(0.37, 0, 0.63, 1);   /* ambient loops — sine in-out */
  --ease-depart:  cubic-bezier(0.55, 0, 1, 0.45);   /* exits — accelerate away */
  /* linear: rotation, marquees, scrub */
  --dur-hand: 180ms;  --dur-state: 320ms;  --dur-arrive: 850ms;  --dur-hero: 1400ms;
  --stagger-arrive: 120ms;
  --breath: 6s;       /* heartbeat base; co-prime partners: 4s · 7s · 11s · 13s */
}
```

**The inversion, corrected.** On the original page `--spring` meant the calm expo-out curve and
`--spring-slow` meant the overshoot. One day later the methodology swapped them and made the
overshoot the default for reveals, so for five versions the doctrine's "signature" curve was not
the curve that made the original feel expensive. v6 retires both names. Arrivals use
`--ease-arrive`. Overshoot lives only in `--ease-tick`, only under 0.25 s. An overshoot on a
0.8 s reveal reads as a bounce — cheap — which is exactly what the original avoided.

**GSAP ease names never appear in CSS.** `transition: transform .3s power2.out` is invalid CSS;
the browser drops the whole declaration and the hover loses its easing. Use the role tokens.

### Brand Personality Matrix → personality

```
contemplative ≥ 7                    → tide for entrances, silk for type
refined ≥ 6 (minimal ≥ 6, classic ≥ 6) → silk (the house default for Iron Canvas's own surfaces)
serious ≥ 7 and bold ≥ 6              → gravity
playful ≥ 7                          → spark for hands and small reveals, silk for layout
technical ≥ 7 or fast ≥ 7             → snap
the signature reveal of a precious object → bloom, once
scroll-owned motion                   → drift, always
```

This mirrors how the Depth Language maps the BPM to camera behaviour
([`depth-language.md`](depth-language.md) — contemplative → slow dolly; fast → snap rails).

---

## 4. The three tempos

| Tempo | Range | Curve role | What lives here |
|---|---|---|---|
| **Hands** | 0.15–0.5 s | `--ease-tick` (≤ 0.25 s), `--ease-arrive` | hover, press, toggles, focus rings, arrow nudges |
| **Entrances** | 0.8–1.4 s, 100–150 ms steps, 28–48 px travel | `--ease-arrive` / the house personality | reveals, arrivals, section groups |
| **Ambience** | 4–36 s loops, **co-prime periods** | `--ease-breathe`, `linear` | the heartbeat, marquees, mesh drift, grain never moves |

**Timing budget** (restored from the v3 motion budget): micro 0.2 s · single entry 0.5–0.7 s ·
section group 0.7–1.2 s total · hero narrative 1.5–2.5 s · page transition 0.5–0.8 s, never
longer. Stagger: characters 0.015–0.025 s · words 0.04–0.07 · lines 0.08–0.12 · cards 0.06–0.10 ·
sections 0.12–0.18.

**Co-prime periods** are the secret of perpetual motion that never feels like a loop. Two
elements at 4 s and 6 s realign every 12 s — the eye catches it. At 18, 28 and 12 s they realign
every 252 s — the eye never does. Choose periods that share no factors, and let the longest be
the slowest.

---

## 5. Arrival — the load choreography

> *"Every site gets ONE load choreography — make it memorable."*
> *"NEVER animate everything simultaneously."*

```text
Phase 0 (0–200 ms)      ground, atmosphere, canvas / WebGL init — the heartbeat is already turning
Phase 1 (200–600 ms)    the primary visual or 3D element
Phase 2 (400–800 ms)    the headline — by line, word or character
Phase 3 (600–1000 ms)   supporting text
Phase 4 (800–1200 ms)   calls to action
Phase 5 (1000–1400 ms)  navigation and secondary UI
Total ≤ 1500 ms · related elements step 50–150 ms apart · hero on the house personality,
supporting elements gentler (silk → tide, gravity → silk) · then STILLNESS — only the heartbeat moves
```

**The no-library arrival** (the original page, Tier I): every piece rises 28 px on
`fadeUp .8s var(--ease-arrive)` at 0.20 · 0.35 · 0.50 · 0.65 · 0.80 s. Because expo-out
front-loads the travel, the five pieces *land* in a quick cascade and then share one long,
near-imperceptible settle.

**The GSAP arrival** (filled, not a stub — restored from the v3 forge recipes):

```javascript
export function runLoadSequence() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set('[data-load]', { autoAlpha: 1 });            // composed still — final frame, no travel
    return null;
  }
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 0.9 }, delay: 0.1 });
  tl.to('.hero__bg', { autoAlpha: 1, duration: 0.6 }, 0);                          // Phase 0
  tl.from('.hero__visual', { autoAlpha: 0, scale: 0.94, duration: 1.2 }, 0.2);    // Phase 1
  const split = SplitText.create('.hero__title', { type: 'lines,words', mask: 'lines', aria: 'auto' });
  tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.4);     // Phase 2
  tl.from('.hero__sub', { autoAlpha: 0, y: 28 }, 0.7);                              // Phase 3
  tl.from('.hero__cta', { autoAlpha: 0, y: 28, stagger: 0.08 }, 0.85);              // Phase 4
  tl.from('.nav',       { autoAlpha: 0, y: -12, duration: 0.7 }, 1.0);               // Phase 5
  return tl;
}
```

**The runtime arrival**: a `load` act in the score (see [`cinematic-score.md`](cinematic-score.md)).
The Score Runtime adds the reduced, static and kill-switch paths for free.

At R4 the arrival is the **loader as brand moment**: the DOM shell paints instantly, a designed
veil shows real progress in the brand's type and palette, and the world enters with one camera-
settle move of 1.5–3 s that ends at station 0. *"The loader is part of the brand moment, not an
apology."*

---

## 6. The heartbeat — perpetual motion that never visibly loops

**The iron orb recipe** (Tier I, pure CSS — the original page's soul):

```css
.orb        { position: relative; width: clamp(280px, 42vw, 520px); aspect-ratio: 1; }
.orb-ring   { position: absolute; border-radius: 50%; border: 1px solid rgb(var(--accent-rgb) / .15);
              animation: orb-spin 18s linear infinite; }
.orb-ring:nth-child(1) { inset: 0; }
.orb-ring:nth-child(2) { inset: 14%; border-color: rgb(var(--accent-rgb) / .08); animation-duration: 28s; animation-direction: reverse; }
.orb-ring:nth-child(3) { inset: 27%; border-width: 1.5px; border-color: rgb(var(--accent-rgb) / .2); animation-duration: 12s; }
.orb-ring::before { content: ''; position: absolute; top: -3px; left: 50%; width: 6px; height: 6px; border-radius: 50%;
                    translate: -50% 0; background: rgb(var(--accent-rgb));
                    box-shadow: 0 0 12px rgb(var(--accent-rgb)), 0 0 24px rgb(var(--accent-rgb) / .5); }   /* the beads */
.orb-core   { position: absolute; inset: 33%; animation: breathe var(--breath) var(--ease-breathe) infinite; }
@keyframes orb-spin { to { rotate: 360deg; } }
@keyframes breathe  { 50% { translate: 0 -12px; } }
@media (prefers-reduced-motion: reduce) { .orb-ring, .orb-core { animation: none; } }  /* rests, composed */
```

**Heartbeat rules**
1. **One focal heartbeat per viewport.** Two heartbeats compete; the eye stops trusting either.
2. **Low amplitude.** Travel ≤ 12 px, alpha swings ≤ .2, scale ≤ 1.15. It is felt before it is seen.
3. **Co-prime periods** (§4). Seed any randomness (mulberry32) so every run renders the same.
4. **Pause what nobody sees**: `animation-play-state: paused` when off-screen (IntersectionObserver)
   or when the tab is hidden (`visibilitychange`). Resume where it left off.
5. **Rest composed** under reduced motion: the beads stay lit, the rings stop at a designed angle.

**Heartbeats for data surfaces** — the five Bento archetypes, each *"a 'perpetual state' that loops
infinitely to keep the dashboard feeling alive"*: the intelligent list (auto-sorts every 4–6 s),
the command input (typewriter 40 ms/char, 2 s pause), the live status (breathing dots, 2 s), the
wide data stream (a 30 s cycle — *"feels effortless, not frantic"*), and focus mode (staggered
highlight, a floating toolbar on `back.out(1.5)`). Full specs: `surfaces/app-dashboard/PACK.md`.

---

## 7. Hand-feel — the texture of touch

> *"Every clickable element must feel tactile."*

The original page's hand vocabulary, which every build inherits:

| Moment | Recipe | Why it feels expensive |
|---|---|---|
| Row hover | border warms to accent .3; a **1 px accent line draws left → right over 0.5 s** (`::before` width 0 → 100 %) on `--ease-arrive`; the ghost numeral warms from .12 to .28 | the page answers with light, not a jump |
| Primary button | brightens; lifts 2 px on `--ease-tick` over 0.15 s; blooms `0 8px 32px rgb(accent / .25)`; `:active` scale .98 | a tick of life, then weight under the finger |
| Ghost link | the arrow nudges `translateX(4px)` on `--ease-tick`, 0.2 s | anticipation, not decoration |
| Card | lifts 3 px into a deep tinted shadow with an accent edge and a diagonal wash, 0.35 s | glass rising out of a tray |
| Magnetic lean | the element follows the pointer at 0.2–0.3 strength and releases on `elastic.out(1, 0.4)` over 0.6 s — or, CSS-only, rides its own `--ease-tick` transition so each retarget overshoots slightly | the interface leaning toward you |
| 3D tilt | `rotateX(y × −8°) rotateY(x × 8°)`, perspective 600, elastic return | a plate catching the light |

**Rules.** Hover, active and focus-visible on **every** interactive element. Focus rings are
designed (an accent hairline with offset), never removed. Magnetic pull and tilt only under
`(hover: hover) and (pointer: fine)` and only when motion is allowed. Measure an unmoving wrapper,
never the element you are moving, or the pull chases itself. The cursor tier comes from the DIS
dial `design_intensity.systems.magnetic_cursor` (0–1): below 0.3 the native cursor; 0.3–0.6
a trailing ring; above 0.6 magnetic fields; WebGL distortion only at 0.9+ and R3+.

---

## 8. Breath — air, light, and the still film

> *"Whitespace is not empty space. It is the breath between notes."*

- **Air.** About 10rem between sections on desktop. At most 80 % of any viewport carries
  content; **20 % breathes**. Emptiness is an invitation: *"emptiness should be an invitation, not a
  dead end."*
- **The still film.** SVG `feTurbulence` fractal noise (baseFrequency .85, 4 octaves), a 200 px
  tile, opacity .03–.04, fixed, above everything, never moving. *"Subtle — should be felt not seen."*
- **The light ladder.** One accent hue at many alphas makes depth without 3D: .02 for a watermark,
  .04–.05 for ambient pools, .08–.2 for hairlines, .25 for a bloom, .5 for a point light.
- **Mesh that breathes.** Two to four radial ellipses in the palette, drifting on 20–40 s co-prime
  loops. Organic, multi-point, never a flat two-stop gradient.
- **Tinted shadows.** Shadows take the colour of the room's light. Grey shadows are a tell.
- **The field recedes.** Background motion slows while the visitor reads — at most 30 % of the
  foreground's speed — and an ambient WebGL field dims and slows behind quiet chapters, then
  returns for the signature.

---

## 9. Stillness and anchors

> *"High-end motion design is NOT about animating everything. It is about intentional contrast
> between what moves and what stays still. The still elements make the moving elements land
> harder. The moving elements make the still elements feel grounded."*

- **The hero always moves.** It is the first impression.
- **One motion moment per narrative section** — not every element in it.
- **At least one element in each section never animates** (the anchor): body text being read,
  prices, the numbers a decision rests on, the primary action once it has arrived.
- **Never scroll-link text someone is reading.** Scroll-link statements, not paragraphs.
- **Quiet chapters are designed**, not leftover: the pause in the motion sentence
  ([`cinematic-score.md`](cinematic-score.md)) is what makes the climax land.

---

## 10. Transitions — every cut is a feeling

| Transition | It feels | Recipe |
|---|---|---|
| Fade through black | **Cinematic** | 0.4 s out, 0.2 s hold, 0.5 s in on `--ease-arrive` |
| Curtain (the **Iron Curtain**) | **Theatrical** | overlay `scaleY 0 → 1` from the bottom, 0.55 s `power3.inOut`; swap; `1 → 0` from the top with a 0.1 s delay; then run the arrival |
| Shared-element morph | **Seamless** | GSAP Flip, or same-document View Transitions (baseline since October 2025) |
| Colour flood | **Brand-forward** | the accent floods from the pressed control's position |
| WebGL distortion | **Psychedelic** | displacement shader across a render target; R3+ only |
| Zoom in/out | **Magazine** | the next page grows out of a thumbnail |
| Liquid swipe | **Viscous, playful** | the page wipes like poured liquid; playful ≥ 7 |
| Morphing modal | **Continuous** | a button expands into the dialog it opens |

Cross-document `@view-transition` is progressive enhancement only. Every transition kills the old
page's ScrollTriggers and Lenis instance in `leave`, scopes `gsap.context` to the incoming
container, and ends by running that page's arrival.

---

## 11. Type in motion

| Type personality | Split | Motion | Timing |
|---|---|---|---|
| EXPRESSIVE | characters | rise from y 40 with opacity | 0.8 s, 0.02 s per char, `expo.out` |
| EDITORIAL | words, masked by line | words fade up together per line | 0.9 s, 0.05 s per word, `power2.out` |
| COMMANDING | none | the heading rises as one block, y 20 | 0.6 s, `power3.out` |
| REFINED | lines, masked | lines unveil out of their masks | 1.1 s, 0.09 s per line, `expo.out` |
| FUNCTIONAL | none | opacity only, or nothing | 0.4 s |

Runtime verbs: `unveil` with `split: lines | words | chars`, `scramble` (a deterministic signal
decoding), `sweep` (a band of light crossing the type via `--ic-sweep`), `count` (a fact landing,
tabular numerals). SplitText is free since GSAP 3.13 and supports masks, `autoSplit` and aria —
always pass `aria: 'auto'` so screen readers hear words, not letters.

---

## 12. Camera — the same personalities, in space

For Tier II/III scenes the Depth Language owns the camera
([`depth-language.md`](depth-language.md)): contemplative → slow dolly (8–12 s per section);
fast → snap rails; organic → spline paths with ±0.5° handheld drift; technical → axis-locked,
orthographic moments; serious ≥ 8 → no roll, ever; playful → FOV breathing and ±2° cursor lean.
Focus pulls are the Tier III signature move — at most once per section.

For Tier I (DOM only) the same feelings translate: contemplative → `tide` scrubs and slow parallax
bands; fast → `snap` cuts; organic → `drift` with micro-rotation; technical → no rotation, hard
alignments; serious → no scale change larger than 1.04; playful → `spark` overshoots and cursor lean.

**One clock.** Scroll is the playhead. Lenis only smooths native scroll; ScrollTrigger reads it;
the WebGL camera and every DOM chapter subscribe to the same progress. Never two scroll owners in
one viewport — that is **Anti-Pattern #19 TWO CLOCKS**.

---

## 13. Sound — haptic depth

Sound never had a doctrine; FEEL.md's "haptic depth" is its seed. v6 writes one:

1. **Invited, never imposed.** Off by default, behind a visible toggle, remembered per visitor.
   No autoplay, ever.
2. **One timbre per brand.** A single instrument family — glass, felt, brass, wood, air.
3. **Cues follow meaning.** Sound marks the signature moment and the commit (a confirmation, a
   landing) — not every hover.
4. **Beds are rare.** An ambient bed only at R3+ with micro-polish ≥ 0.9, looped seamlessly,
   ducked under any cue.
5. **Space in worlds.** At R4, place emitters in the scene (`PannerNode`, `panningModel: 'HRTF'`) so
   sound comes from where things are.
6. **Lightest source first.** A synthesized WebAudio tone (zero payload) → the audio engine
   (ElevenLabs sound generation, [`power-engines.md`](power-engines.md)) for bespoke cues.

---

## 14. How the register shapes motion (and never removes the floor)

| | Arrival | Heartbeat | Signature | Scroll | Engines |
|---|---|---|---|---|---|
| **R0** Utilitarian | 600–900 ms, three steps | one status pulse or live tick | none, or an information-design move (a state morph) | native; nothing pinned | off |
| **R1** Functional | ≤ 1.2 s thesis hero | one ambient element in the hero | one memorable moment | one scrub moment allowed | off |
| **R2** Editorial | orchestrated reveal | heartbeat + breathing atmosphere | one staged moment | scrubbed chapters around the signature | signature only |
| **R3** Maximalist | full choreography | a living layer per act | a signature technique, the climax | the full motion sentence | on |
| **R4** Immersive | loader as brand moment + camera settle | the world breathes | the mechanism, acted out in the world | a camera rail — scroll is the dolly | on, twin camera |

---

## 15. The verbs (what the runtime performs)

| Verb | Kind | The feeling | Use it for |
|---|---|---|---|
| `fade` | enter | quiet arrival | labels, secondary text, R0 everything |
| `rise` | enter | lift into place | content blocks, cards, actions |
| `unveil` | enter | a curtain drawn (masked, by line/word/char) | headlines — the hero's voice |
| `bloom` | enter | light opening | the signature reveal |
| `focus` | enter | a rack focus onto the subject | ledes, the thing after the headline |
| `tilt` | enter | a plane swinging into view | cards, panels, screenshots |
| `wipe` | enter | an edit — the cut as reveal | images, before/after |
| `iris` | enter | the aperture opening | the signature image at R3+ |
| `sink` · `lift` | exit | departure with weight · with lightness | leaving a pinned act |
| `defocus` | exit | attention moving elsewhere | the previous idea stepping back |
| `dolly` | exit | the camera pushing *through* | a threshold between worlds |
| `drift` | scrub | parallax — depth by velocity | background bands, atmosphere |
| `draw` | special | a line of thought | diagrams, signatures, the mechanism as a path |
| `count` | special | a fact landing | real numbers only |
| `scramble` | special | a signal decoding | technical subjects; never body copy |
| `sweep` | special | light passing | the climax headline; once |

---

## 16. Engineering rules (so the feeling survives production)

- Animate `transform` and `opacity` (and `filter` sparingly, `clip-path` for wipes). Never layout properties.
- Apply `will-change` just before a tween and clear it after; never leave it on idle elements.
- **Reduced motion is decided before anything starts**: return before Lenis is constructed, not after.
- **Lenis**: import from the `lenis` package (not `@studio-freight/lenis`); drive it from GSAP's
  ticker (`gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0)`) and forward
  `lenis.on('scroll', ScrollTrigger.update)`. Route programmatic jumps through `lenis.scrollTo`.
- React / Next.js: never mix GSAP and Framer Motion in one tree; no `useState` for anything at
  60 fps; perpetual motion in its own memoized client component; `gsap.context` + `revert()` on
  unmount. Full rules: [`motion-budget.md`](motion-budget.md) "React / Next.js Motion Rules".
- Seed every random choice. Pause off-screen. Dispose WebGL. Cap DPR (1.5 desktop, 1 mobile by
  default; 2 is the ceiling).
- Every entrance target can never stay hidden: a CSS failsafe reveals it after 3 s if the script
  never runs; `?motion=off` and the kill switch leave the page fully readable.

---

## 17. Proving it is alive

VERIFY Axis 7 (SKILL.md §10) checks the floor with evidence, not adjectives:

- a video of the first 5 seconds (the arrival), a 15-second slow scroll (the Taste Doctrine's
  "15-second scroll", now a test), and a reduced-motion recording;
- automated proxies: an arrival timeline exists; at least one running animation is in view at rest;
  100 % of interactive elements change on hover and on focus; exactly one scroll owner; reduced
  motion shows every entrance target at its final state;
- a critic's eye: *"Does the motion serve the story, or is it noise?"* · *"What would make someone
  say 'show me that again'?"* · *"Which section feels leftover?"*

*Adjectives direct. Evidence proves.*
