# Surface Pack — FILM ★v6
## *The page already is a film. This pack cuts it.*

> Launch films, product promos, motion-graphics explainers, brand films, social cut-downs, OG
> video and hero loops. One **film score** is the contract; three lanes render it — **code**
> (HyperFrames: exact type, counts, UI, data), **video** (Seedance 2.5, or MiniMax via ingest:
> organic matter — smoke, crowds, hands, weather, paint) and **Blender** (the camera and the
> blocking; hero objects with real light). *The spine outlasts the model:* engines change month
> to month; the score, the style lock and the gates carry the work across.
>
> Read with SKILL.md + ROUTING.md. Doctrine this pack leans on: `references/cinematic-score.md`
> (the score; §7 one score, three outputs), `references/motion-language.md` (personalities,
> tempos, sound), `references/power-engines.md` (engines, gates, the ledger, the twin camera).

---

## 1. IDENTITY

```yaml
pack: film
surface: "Launch films, product promos, motion-graphics explainers, brand films, social cut-downs, OG video, hero loops"
project_types: [H]            # H = film / motion piece (Phase 0 routing)
status: experimental          # the doctrine and the contract are stable; no lane has rendered on the reference machine yet
version: 6.0
```

**When to dispatch it.** The deliverable is a timed piece of video — even when it is cut from a
site Iron Canvas built. A site *and* its launch film are two runs sharing one feel-profile and one
style board (the pack rule: one pack per run).

---

## 2. PHASE OVERRIDES

Unlisted phases run exactly as SKILL.md specifies. No phase is skipped; Phases 5 and 6 stay mandatory.

**0 · ORIENT** — record the film format: aspect ratios (16:9 · 9:16 · 1:1), length, delivery
(site hero · launch · social · OG), music source (licensed · own · none — never a placeholder
shipped as final), voice-over yes/no, and the lanes `engines/detect.mjs` reports. Q8 (the
mechanism) is still asked: the film's climax acts it out.

**1 · STUDY** — work from the subject's **real screens and real copy**: rebuild product UI as
DOM with the site's own tokens, fonts and words. *A screenshot can only be panned;* a DOM screen
can be choreographed. Reference films are cut into timed contact sheets (dense capture) and every
claim about them carries an evidence class (Observed · Derived · Unverified).

**2 · FEEL** — the Feel Brief, plus two film artifacts:
- **The style board**, one per world: type specimen, palette with roles, component zoo,
  mini-scenes, motion thumbnails, stage, notes — and a separate **type sheet**. The board locks
  only after **three consecutive probe frames pass the blind critic** ("never batch before three
  pass"). Patch the board's prompt, never an individual frame.
- **The four-question spine** laid over the motion sentence: *What is this?* (establish) · *Why
  care?* (accelerate) · *Does it work?* (reveal → recover → climax — proof beats) · *What do I do?*
  (resolve — the end card).

**3 · SCOUT** — reference films are analysed, not admired: dense frames, contact sheets, a timed
cut list, measured easing (Derived at best). Direction Fusion still applies (Voice · World ·
Instrument).

**3.9 · PACKAGE — THE FILM SCORE** (§8 below): context once per film, segments once per project
(verbatim, hash-locked), beats per shot; every shot routed to a lane; a beat grid if there is
music; `STORYBOARD.md` as the human-readable shot list. The Artifact Assessment Gate writes the
lane jobs here.

**4 · FORGE — the code lane (C).** Library first: base component × house style × preset. Every
motion value is a typed, ranged variable (entry delay, travel, spin, hold). **The model writes
decisions; kits render** — `decisions.json` (which word to emphasise, which preset, which cut) is
the LLM's only output at render time; seeded, schema-checked compositions do the rest.
HyperFrames compositions obey its determinism contract (below).

**5a · ASSET FORGE — the video and Blender lanes.** V-lane shots through `engines/video`
(Seedance 2.5 for hero shots where paint, palette and a single accent must hold; MiniMax via
`ingest` for choreography-literal volume shots). B-lane through `engines/blender`: the clay rail
locks camera and blocking before any paid generation (the twin camera); hero objects render as
plates with alpha. Sound through `engines/audio`.

**5 · GENERATE — the tournament, with a trust gate.** Candidates per shot by register; a blind
critic judges in situ; select with a written reason. After each shot the critic writes plain
sentences into `.ic/learnings.md`, and every later job compiles with them. **No bulk render
("blast") until three consecutive shots pass with no new learnings.**

**6 · COMPOSE — assembly.** One master composition: V clips as media tracks, C shots as
sub-compositions, Blender plates under or over the DOM, occluder transitions and type layers.
**The frame index is the only clock.** With music: analyse the beat grid first, then edit to it.

**7 · VERIFY** — the film gates (§5).

**8 · HANDOFF** — masters (ProRes 4444 or PNG sequences with alpha for overlays; gitignored),
web encodes (`ledger.mjs encode --profile brand-film` 1080p + AAC; 9:16 and 1:1 cut-downs; poster
from 40 % in), captions, a provenance sidecar per generated asset, an honest table of real versus
placeholder assets, and wall-clock per stage — never a speed claim without a timing artifact.

---

## 3. DIS PROFILE

| # | System | On this surface |
|---|---|---|
| 1 | Gradient mesh atmosphere | standard — becomes plates: bloom + vignette, a time-of-day light arc |
| 2 | Glass depth | cap 0.6 — glass only where the product's own UI is glass |
| 3 | Kinetic typography | floor 0.5 — type is the performance; words and lines, never letter-by-letter body text |
| 4 | Particle field | standard — swarms and fields come from §19 algorithmic art, seeded and cue-driven |
| 5 | Border luminance | standard |
| 6 | Scroll-tied sequences | 0 on the page — the film *is* the sequence |
| 7 | Magnetic cursor | becomes cursor choreography: an on-screen product cursor that clicks on the beat |
| 8 | Micro-polish | floor 0.7 — sound design, the end card, captions |
| 9 | Depth language | all tiers — composed (DOM + parallax plates), staged (a Blender hero plate), inhabited (a world fly-through on a clay rail) |

The aliveness floor holds in film form: an arrival in the first second, no dead frame (every
static hold carries a drift), hand-feel becomes the cursor's weight, breath is the air between
beats, and the still path is the poster and the captioned cut.

---

## 4. DEPTH PROFILE

The baseline camera is 2D (scale and translate) — and that is where most AI motion graphics stop.
This pack sanctions real lensing: **three layers at three speeds** (near · mid · far plates),
rack focus between them, perspective moves from Blender plates, and a baked camera rail when a
move must match a site (`runtime/camera-rail.js`, `ic-camera-rail/2`).

**The closed camera vocabulary** — one verb per beat, each with its easing signature. *An eased
whoosh is not a whoosh:* easing is chosen per segment.

| Verb | Signature |
|---|---|
| `hold-push` | open at scale 1.03–1.10 with copy readable; hold ≥ 1.35 s; push to the focus element at 1.30–1.45 over 0.6–1.2 s (expo in-out); hold ≥ 1.45 s |
| `drift` | +2 % scale over ≥ 2.4 s under any static hold, linear — the frame never goes dead |
| `settle` | 1.10 → 1.00 over about 4 s on the end card |
| `climb` | accelerating, no settle — energy rising into the next beat |
| `pull-back` | expo out, then a 0.5–1 s hold — the reveal of scale |
| `crash-zoom` | power4 in, short — once per film |
| `whip` | a motion-blurred transition between beats |
| `track-past` · `orbit` (quarter turn) · `dive` · `locked-ground` (the camera holds, subjects cross the lens) | |

---

## 5. VERIFY PROFILE

The seven axes apply, read for time instead of scroll. Axis 4 (performance) becomes the render
gates; Axis 7 (aliveness) becomes *no dead frames*.

| Gate | Check | Pass |
|---|---|---|
| **Score lint** | every selector resolves; no event past the end; known presets only; every scene has a camera move; no CSS transitions or viewport units on seeked nodes; fonts self-hosted | 0 findings |
| **Timing law** | every event within the duration table (§6, ±20 %); holds ≥ 0.8 s after key moments; copy readable ≥ 1.3 s before any push; transitions 0.4–0.6 s | 100 % of events |
| **Board lock** | three consecutive probe frames pass the blind critic before any batch | logged approver + reason |
| **Contact sheet** | a 12-frame (or every-beat) sheet before render: nothing clipped by the camera, no empty frame, type legible at thumbnail size, a living end card | 0 open items |
| **Sync** | every sound within ±1 frame of its visual cause; big hits on beats; beat drift corrected | ≤ 33 ms at 30 fps |
| **Density** | ≤ about 1.7 cues/s; ≤ 7 key ticks/s; one tick per group under voice-over; silence or a riser before the logo | pass |
| **Loudness** | −14 LUFS integrated (±1); true peak ≤ −1 dBTP; voice ≥ +6 dB over the bed in the speech band | pass |
| **Handoff law** | each shot ends on the next one's opening frame — edge correlation > 0.35 — or the cut hides inside an occluder | every cut |
| **Type (OCR)** | frames sampled at 2 fps contain only the quoted strings, spelled exactly | 0 strays |
| **Energy** | reject clips one global transform explains (a Ken Burns still passed off as motion) | pass |
| **Determinism** | the same seed renders identical frame hashes twice (C lane) | identical |
| **Render integrity** | ffprobe codec, size, fps, duration match the score; frame count exact; a 4K crop shows sharp text | pass |
| **Accessibility** | captions for any voice; no more than 3 flashes per second; 9:16 cut legible on a phone | pass |
| **Rights** | every generated asset has provenance; no recognisable real person without a `rights` note; no third-party brand shipped as if official | pass |

---

## 6. THE FILM LAWS (numbers, from measured films)

**Timing.** Words land 0.6–0.8 s each, 0.08–0.14 s apart · transitions 0.4–0.6 s, never longer ·
camera moves 0.8–1.6 s · count-ups 1.0–1.6 s · holds ≥ 0.8 s after a key moment · the next scene
starts half a beat early (overlap-in) · hard cuts land on bar lines when chrome is shared.

**Sound.** Sound only what causes it · one sonic family per brand (glassy, felt, brass, wood…) ·
effects sit well under the music (about −12 to −19 dB) · trim the leading air from generated
effects (20–150 ms of silence makes every hit late) · a density curve, not a constant patter ·
silence or a riser before the logo · music first, cut to its beat grid · a brand sonic motif,
reused.

**Picture.** One light law (one source, a single blown-out core at most) · a rationed accent (red
stays scarce on a monochrome base unless the act is *about* it) · in-world typography with its own
type sheet — no extruded, glowing or letter-by-letter type · effects belong to the edit, not the
prompt (no "glitch", "burst", "particle" in a generation prompt).

---

## 7. NORTH STAR SEARCH SETS

```
"product launch film motion graphics 2026" · "SaaS promo UI camera push kinetic type"
"brand film typographic motion design" · "data visualization motion graphics explainer"
"Vox style collage explainer motion" · "Apple product film type and light"
"motion design reel 2026 award" · "cinematic UI film one light"
Reference films → sheet-extract: dense frames, timed contact sheets, a cut list (Observed / Derived)
```

---

## 8. THE FILM SCORE — the contract every lane compiles from

Three lifespans, so nothing is retyped and nothing drifts:

```jsonc
{
  "title": "Tidewater — the roast", "logline": "You can taste the fire before you smell the coffee.",
  "context": {                                   // once per film — compiled into every job
    "scene": "a roastery before dawn, one drum, one lamp",
    "format": { "aspect": ["16:9", "9:16"], "length": 30, "fps": 30, "bpm": 100, "max_beats_per_shot": 3 },
    "space": "near within touching distance · mid · far · true parallax · rack focus at the climax",
    "energy": "high early, slower late", "rules": ["one idea per beat", "≤ 2 quoted strings per shot", "effects belong to the edit"]
  },
  "segments": {                                  // once per project — pasted VERBATIM, locked by hash
    "style_lock": "segments/style-lock.md@sha256:…", "typography": "segments/type.md@sha256:…",
    "physics": "segments/physics.md@sha256:…", "audio": "segments/audio.md@sha256:…",
    "negative": "segments/negative.md@sha256:…", "music": "tracks/bed.wav (licensed) | none"
  },
  "shots": [
    { "id": "s01", "lane": "V", "engine": "seedance-2.5", "len": 6, "stage": "establish",
      "refs": [ { "tag": "@Image1", "segment": "style_lock", "job": "palette, finish, light", "exclude": "layout, composition, any text" } ],
      "beats": [ { "open": "already moving: steam lifting off the drum", "action": ["the lamp swings once"],
                   "camera": { "verb": "hold-push", "ease": "expo.inOut" }, "text": [],
                   "sfx": ["low drum rumble"], "edit": { "type": "handoff", "to": "s02", "hold": 0.5 } } ] },
    { "id": "s02", "lane": "C", "engine": "hyperframes", "kit": "data/count-lockstep", "len": 5, "stage": "reveal",
      "cues": { "count_to": 218, "unit": "°C", "at": 1.2 }, "edit": { "type": "occluder-cut", "to": "s03" } },
    { "id": "s03", "lane": "B>V", "engine": "blender+seedance-2.5", "rail": "rails/s03.camera-rail.json", "len": 8,
      "stage": "climax", "role": "signature" }
  ]
}
```

**Lanes.** `C` code (HyperFrames; exact type, counts, UI, charts, maps, cursors) · `V` video
(Seedance 2.5 / MiniMax; organic matter) · `B` Blender (camera, blocking, hero objects, light) ·
`B>V` the twin camera (clay rail → Seedance `@Video1`) · `V>C` a scale bridge (organic → exact,
one shared handoff frame). **Exact count or exact type → code. Always.**

**The beat grammar.** Every beat opens *already moving*, carries one idea and one named camera
move, and ends with an explicit edit: `handoff` (the next shot opens on this frame), `occluder-cut`
(a dark element crosses the lens; 2–7 near-black frames hide the cut), `match-cut-shape` (a line
becomes a horizon, an object becomes a point), `cut-on-bar`, `blur-dissolve` (0.2–0.5 s).

**STORYBOARD.md** — the human shot list, one row per shot:
`# · VO in · Len · Lane · The shot · The move · On screen`, with the hero shots named.

**The page and the film share the score.** When the film is cut from an Iron Canvas site, the
page's `score.json` acts become the film's stages, its signature act is the film's climax, and
HyperFrames seeks the page's own GSAP timeline frame by frame (`references/cinematic-score.md` §7).

---

## 9. MOTION PRESETS (named, parameterised, measured)

| Preset | Parameters |
|---|---|
| `type.blurInWords` | 0.65–0.7 s per word, 0.07–0.085 s stagger, blur 12 → 0 px, rise ≈ 10 px, expo out; a soft whoosh on the first word only |
| `type.popKeyword` | opacity 0.4 → 1 in one frame; scale 1.06 → 1 and y +2 % → 0 over ≈ 4 frames, power3 out — no overshoot |
| `type.slamTitle` | from ≈ 110 % above its rest, settling in two steps; subline +0.25 s |
| `type.inWorldPlane` | the word lives on a plane the camera travels past |
| `cam.holdPush` · `cam.drift` · `cam.settle` | §4 |
| `cursor.clickOnBeat` | enters off-target; travel 0.6–0.9 s (expo out); dwell 0.25–0.3 s; press to 0.97 with a ripple; the click sound lands on the beat |
| `data.countUp` / `count.lockstep` | 1.0–1.6 s; the number and its fill share one eased driver; tabular numerals; true numbers only |
| `data.drawSeries` | draw 1.2 s; markers pop in 0.4 s, 0.26 s apart, from 0.3 scale |
| `data.stateCascade` | rows flip every 0.5–1 beat; counter in sync; tint and label change together |
| `ui.typePrompt` | ≈ 40 characters/s visible; at most 8 key ticks ≈ 140 ms apart; a block caret |
| `route.travel` | basemap 1.5 s; labels by ≈ 2.2 s; travel ≈ 8.5 s sine in-out with the HUD bound to one progress value; ≈ 2.5 s hold |
| `scene.overlapIn` · `scene.cutOnBar` · `scene.blurDissolve` | next scene half a beat early (in 0.5 s, out 0.45 s) · hard cut on a bar line · blur-through 0.2–0.5 s |
| `endcard.riserImpact` | riser from the bar − 1.8 beats; impact on the bar; the mark alone first; tagline; CTA shimmer; hold ≥ 2 s with no dead frame |
| `atmos.timeOfDayArc` | one global light layer keyed to the story's own clock (night navy → dawn amber from the bottom edge) |
| `atmos.boil12` | a 12 fps hand-made look — render at 24, hold each pose two frames, re-jitter every layer from a seeded PRNG |
| `attn.focusGlow` | an accent glow on the next subject ≈ 0.5 s before the camera moves there |

The web personalities still apply: `silk` for reveals, `spark` for the cursor's tick, `tide` for
atmosphere, `snap` for data cuts.

---

## 10. ANTI-PATTERNS (film emphases — the core registry still applies)

- Text-to-video for product UI, numbers or exact type — code owns exactness.
- A static full-screen UI with no camera — it reads as a slideshow; screenshots instead of DOM.
- CSS transitions, viewport units or CDN fonts on seeked nodes — they break determinism.
- Crossfading scenes that share sticky chrome — the navs ghost.
- Sound on every element; untrimmed generated effects; music swapped without beat analysis.
- Camera pushes that slice a heading or skip the readable hold; a dead end card.
- Paraphrasing the style lock — store it verbatim and hash-locked; keep a lens glossary so director
  words translate ("bent" rendered as fisheye cost two versions).
- Blasting before trust; batching frames before the board passes.
- A Ken Burns still passed off as motion; letter-by-letter or extruded, glowing type.
- Publishing a rebuilt third-party brand as marketing; a speed claim without a timing artifact.

---

## 11. OUTPUT ARTIFACTS DELTA

```
iron_canvas_output/film/
├── film.score.json          context · segments · shots · beats · lanes
├── STORYBOARD.md            the shot list (# · VO in · Len · Lane · The shot · The move · On screen)
├── style-board.png          + type-sheet.png — locked after three passing probes
├── segments/                style-lock · typography · physics · audio · negative (verbatim, hashed)
├── compositions/            HyperFrames master + sub-compositions (C lane)
├── rails/                   ic-camera-rail/2 files (B and B>V lanes)
├── contact-sheets/          pre-render beat sheets · post-render dense sheets
├── cues.json                sound and voice on the beat grid
├── learnings.md             the critic's per-shot learnings (the trust gate reads it)
├── web/                     brand-film 1080p · 9x16 · 1x1 · poster · og-video
└── verification.json        ffprobe · LUFS · sync · OCR · determinism hashes · wall-clock per stage
masters/                     gitignored — ProRes 4444 / PNG sequences with alpha
```

---

*Surface Pack — FILM · Iron Canvas v6 · experimental*
*"The structure outlasts the model."*
