# Score Runtime — `canvas-score.js`

> **The agent writes the score. The runtime performs it.**
> Iron Canvas's original motion doctrine was alive but fragile: every run hand-wrote its own
> animation code, and every run could break it. The Score Runtime moves the fragile part into one
> tested engine. Agents author *intent* — acts, shots, verbs, personalities — and the runtime
> performs it with reduced-motion, kill-switch, and no-JavaScript fallbacks built in.

Live reference: **[verbs.html](./verbs.html)** — every verb and personality, performed. Schema:
**[score.schema.json](./score.schema.json)**. Doctrine: `references/motion-language.md` and
`references/cinematic-score.md`.

---

## 1. Wire a page (four steps)

```html
<head>
  <!-- 1. mark JS-capable before first paint -->
  <script>document.documentElement.classList.add('ic-js')</script>
  <style>
    /* 2. entrance targets start hidden — and can never stay hidden */
    .ic-js [data-ic]{opacity:0}
    .ic-js:not(.ic-ready) [data-ic]{animation:ic-failsafe .5s 3s forwards}
    @keyframes ic-failsafe{to{opacity:1}}
  </style>
</head>
<body>
  <section id="hero">
    <h1 data-ic>Every idea has a feeling</h1>          <!-- 3. mark entrance targets -->
  </section>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
  <script type="module">
    import { performScore } from './canvas-score.js';     // 4. perform the score
    performScore({
      personality: 'silk',
      acts: [{ id: 'hero', el: '#hero', trigger: 'load',
               shots: [{ at: 0.2, target: 'h1', verb: 'unveil', split: 'lines' }] }],
    });
  </script>
</body>
```

Mark with `data-ic` only the elements that **enter** (they must start unseen). Exits, scrubs, and
specials (`draw`, `count`, `scramble`, `sweep`) start visible. Put `data-breath` on a *wrapper*, never
on an element a shot also transforms — breath and shots would fight over `transform`.

## 2. The score

```jsonc
{
  "title": "The Living Canvas",
  "logline": "An idea becomes a world you can walk through.",   // what the viewer feels by the end
  "personality": "silk",          // default motion personality
  "tempo": 1,                     // >1 contemplative, <1 fast — scales enter/load acts
  "seed": 5417,                   // breath phases are seeded: identical on every run
  "breath": { "amplitude": 1 },   // ambient idle motion on [data-breath]
  "acts": [
    {
      "id": "spark", "el": "#spark", "intent": "a single warm light, breathing",
      "trigger": "scrub",          // enter (play on arrival) · scrub (scroll is the clock) · load (play now)
      "pin": true, "length": "180%", "scrub": 0.8, "hold": 0.4,
      "shots": [
        { "at": 0,   "target": ".ember",  "verb": "bloom", "personality": "bloom" },
        { "at": 0.4, "target": "h2",      "verb": "unveil", "split": "chars" },
        { "at": 1.2, "call": "cameraTo", "args": "station-1", "note": "the world begins" }
      ]
    }
  ]
}
```

`at` and `duration` are seconds on the act's timeline. In **scrub** acts they are proportions —
the whole timeline is stretched across `length` of scroll. `intent` (acts) and `note` (shots) are
director's notes for humans and critics; the runtime ignores them, reviewers don't.

## 3. The vocabulary

| Verb | Kind | What it does | The feeling |
|---|---|---|---|
| `fade` | enter | opacity | quiet arrival |
| `rise` | enter | y 48→0 + opacity | lift into place |
| `unveil` | enter | slides up out of a mask (with `split`: per line/word/char) | a curtain drawn |
| `bloom` | enter | scale .86→1, blur 16→0, opacity | light opening |
| `focus` | enter | blur 12→0 | rack focus onto the subject |
| `tilt` | enter | rotateX 24°→0 in perspective | a plane swinging into view |
| `wipe` | enter | clip-path inset reveal | an edit — the cut as reveal |
| `iris` | enter | clip-path circle reveal | the aperture opening |
| `sink` · `lift` | exit | fall away · rise away | departure with weight · with lightness |
| `defocus` | exit | blur 0→12, dim | attention moving elsewhere |
| `dolly` | exit | scale→2.4, fade | the camera pushing *through* |
| `drift` | scrub | y 0→−120 over scroll | parallax — depth by velocity |
| `draw` | special | SVG strokes self-draw | a line of thought |
| `count` | special | number climbs (tabular) | a fact landing |
| `scramble` | special | deterministic glyph resolve | a signal decoding |
| `sweep` | special | tweens `--ic-sweep` for a light band across type | light passing |

**Personalities** (the emotional register of time): `silk` expo.out 1.4s · `tide` sine.inOut 2.4s ·
`gravity` power4.out 1.1s · `spark` back.out(1.7) 0.6s · `snap` power3.inOut 0.5s · `bloom`
expo.inOut 1.8s · `drift` linear (scrub). Any shot can override `ease`, `duration`, `stagger`,
`from`, `to`.

## 4. Modes — chosen once, never mixed

| Mode | When | Behavior |
|---|---|---|
| `full` | default | pins, scrubbed timelines, breath, Lenis smooth scroll |
| `reduced` | `prefers-reduced-motion` or `?motion=reduced` | short opacity-only reveals; no pins, no breath, native scroll; exits and scrubs skipped so content stays |
| `static` | `?motion=off`, `options.motion === false`, or GSAP absent | final states only; `ic-js` removed so nothing can hide |

## 5. The controller

```js
const show = performScore(score, { hooks: { cameraTo: (station) => world.cameraTo(station) } });
await show.ready;                        // after fonts load and every act is built
show.on('progress', (actId, p) => {});   // scrub acts: 0..1 — drive WebGL cameras from this
show.on('page', (p) => {});              // whole-page progress
show.on('enter', (actId) => {});
show.seek('spark', 0.5);                 // jump to a moment (evidence screenshots)
show.kill();                             // the kill switch — see below
window.__icScore                         // the same controller, for Playwright evidence
```

**The kill switch** stops every motion and leaves the page fully readable: entrances land on
their final state; anything an exit or scrub moved returns to its natural CSS state; `ic-js` is
removed so nothing can re-hide. `?score=debug` shows ScrollTrigger markers and logs an act table.

## 6. Proven behavior (verbs.html, Chromium, 1280×800)

- all 12 enter/special verbs perform; 0 console errors; 0 horizontal overflow
- scrub act at 50% scroll → drift exactly half-travelled, defocus begun on cue
- kill at 97% of a dolly exit → title restored to opacity 1, no transform; 0 hidden entrance targets
- `?motion=reduced` → no Lenis, 0 pins, 0 breath tweens, no transforms
- `?motion=off` → mode static, 0 triggers, 0 hidden entrance targets

Two faults were found by this testing and fixed before release: clip/mask verbs (`wipe`, `iris`,
unsplit `unveil`) never lifted the pre-paint `opacity:0`, and the kill switch completed exit moves,
leaving departed content invisible.
