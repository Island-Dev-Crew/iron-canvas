# Power Engines — Blender, Seedance 2.5, and sound

> **Toggles for the tools that take a design from beautiful to unbelievable.**
> Code builds the page. Blender builds the shots code can't. Seedance 2.5 films what neither can.
> Sound gives depth a texture. Each engine is optional, detected (never provisioned), gated by
> the register, and degrades to a named fallback — a missing engine never blocks a build.

Operator guide and commands: [`engines/README.md`](../engines/README.md). This file is the doctrine:
when an engine is appropriate, how the engines work together, and how every generated asset stays
accountable.

---

## 1. Available × appropriate

A toggle says an engine is **available**. The Treatment Register says whether it is **appropriate**.
Both must agree before a job runs:

| Register | Blender | Video (Seedance 2.5) | Audio |
|---|---|---|---|
| **R0** Utilitarian | off | off — generative film on a utility is Anti-Pattern #17 | off |
| **R1** Functional | off | off | off |
| **R2** Editorial | only when depth ≥ 0.4 (Tier II) | **the signature only** — one loop or one shot | one cue, no bed |
| **R3** Maximalist | clay rail + hero object | a 10 s film or signature loops | commit cue + ambient bed |
| **R4** Immersive | clay rail + hero object + world pieces | a 15 s film; **twin camera** when Blender is also on | bed + cues, spatial in the world |

The Studio (`studio/compile.mjs`) applies exactly these gates and records every refusal in the
treatment (`engine_gates`) so the reason is on the record.

**Code first.** The code-native lane — DOM choreography, SVG, shaders, particles, the Score
Runtime — is always the first answer. An engine earns its place only by adding what code cannot:
exact sculpted geometry, baked light, path-traced frames, deterministic camera rails (Blender);
photoreal motion with native sound (Seedance); bespoke sound (audio). A Blender GLB that duplicates
what three.js could build procedurally is weight without value.

---

## 2. Switching them on

Copy [`engines/canvas.config.example.json`](../engines/canvas.config.example.json) to the project
root as `canvas.config.json`, flip `enabled`, then scan at Phase 0:

```bash
node engines/detect.mjs          # → .ic/power-engines.json, copied into orient-decision.json.power_engines
```

| State | Meaning | What the build does |
|---|---|---|
| `enabled` | requested and present | jobs run |
| `available` | present, not requested | nothing — the operator decides |
| `missing` | requested, absent | the engine prints its full plan and exits 2; the build takes the fallback |
| `disabled` | switched off | nothing |

**Secrets come from the environment only** — `FAL_KEY`, `ELEVENLABS_API_KEY`, and where those
providers are used `REPLICATE_API_TOKEN` / `ARK_API_KEY`. Nothing is written to disk. No engine
ever signs up for an account, buys credits, or creates a credential. `budget.credit_cap_usd` and
`budget.max_candidates_per_job` cap spend per project.

**Exit codes everywhere:** 0 ok · 1 failed (including over a tier budget) · 2 unavailable, plan printed.

---

## 3. The twin camera — Blender × Seedance 2.5

The strongest thing the two engines do together. The signature scene's camera is authored **once**:

1. **Blender (`clay-camera` job)** renders the camera move through flat grey blocking — Workbench
   clay, delivery aspect ratio, one continuous move of 3–6 s — and writes two files:
   `clay.mp4` and `camera-rail.json`. Stations are authored in three.js space: `position`,
   `target`, `fov` (**vertical** degrees, as three.js means it — the job fits Blender's sensor
   vertically so the number means the same thing in both), `roll` (degrees about the view axis)
   and `ease` (`bezier` · `linear` · `constant` — the shape of the segment *leaving* that station).
2. **The camera is baked, not re-interpolated.** After keying, the job samples the evaluated camera
   at **every rendered frame** and writes the samples into `camera-rail.json`
   (`ic-camera-rail/2`: position, quaternion and vertical fov per frame, in three.js space).
   Blender's own curves decide every in-between once; nobody re-derives them.
3. **Seedance 2.5 (reference-to-video)** receives the clay clip as `@Video1` with one job —
   *camera path, speed and blocking only* — and a style frame as `@Image1` — *palette, material and
   light only*. The prompt states what each reference must **not** contribute (the grey surfaces,
   the flat light; the style frame's composition and text).
4. **The site's WebGL camera plays the baked samples** with
   [`runtime/camera-rail.js`](../runtime/camera-rail.js), driven by the score's progress:
   `show.on('progress', (act, p) => act === 'world' && rail.apply(camera, p))`. A stations-only rail
   (before Blender has run) is approximated with eased segments and look-at aim — bake it to be exact.

**The film and the site match shot for shot.** Clay renders carry no gizmos, grids, outlines,
overlays or frame counters — anything visible in the clay comes back in the generation as an object.
Keep the blockout minimal and honest: real-scale masses (a person is 1.67 m), one surface colour
(blockout colours leak into the generation), no blown-out windows.

Gate: Blender on + video on + depth ≥ 0.4 + register ≥ R2.

---

## 4. Blender — the shots code can't make

```bash
node engines/blender/blender.mjs plan|run --job job.json      # selftest proves an install
```

| Job | Makes | Use it for |
|---|---|---|
| `clay-camera` | `clay.mp4` + `camera-rail.json` | the twin camera; previz for any camera move |
| `hero-object` | a Draco GLB + stats + a 4-view turntable | one hero object with weight — seeded, sculpted form tinted by role tokens |
| `turntable` | frames → `ledger.mjs encode --profile scroll-tied` | a product 360° as a scroll-tied sequence |
| `matcap` | a baked matcap PNG | cheap, beautiful material in three.js without lights |

**Budgets are enforced, not advised** — an over-budget GLB fails the job:

| Tier | Triangles | File size | Draw calls |
|---|---|---|---|
| II Staged | ≤ 150,000 | ≤ 1.5 MB | ≤ 100 |
| III Inhabited | ≤ 600,000 | ≤ 8 MB | ≤ 300 |

**Headless scripts are the production path** (`blender --background --factory-startup --python`).
The official Blender MCP executes model-written code without guards; keep it for sessions a human
is watching. Blender emits no KTX2 textures — post-process GLBs with glTF-Transform (meshopt or
Draco, then KTX2: ETC1S for colour, UASTC for data). For static hero scenes, bake lighting into a
second UV set: Cycles quality at almost no runtime cost.

**Fallback:** procedural three.js geometry → a §19 point-cloud promotion → a Tier I composed-depth still.

---

## 5. Seedance 2.5 — film, loops and transitions

```bash
node engines/video/video.mjs plan|run --job shot.json         # fal queue, automated (FAL_KEY)
node engines/video/video.mjs ingest --job shot.json --file clip.mp4   # made in Dreamina / Higgsfield / ModelArk
```

**Modes.** `text-to-video`; `image-to-video` (`image_url`, plus `end_image_url` — set first = last
for a seamless loop); `reference-to-video` (`image_urls`, `video_urls`, `audio_urls` — the twin
camera's mode). Resolution 480p / 720p / 1080p; duration `auto` or 4–30 s; aspect ratio;
`generate_audio`; `seed`.

**The shot job compiles to fal's prompt template**, in this order: FORMAT · REFERENCE ROLES ·
TIMELINE · CAMERA · CONTINUITY · AUDIO · CONSTRAINTS. The TIMELINE comes from the score's beats
(`[0–3 s] ESTABLISH — …`), so the film tells the same story as the page.

**Writing a shot that works**
- one primary camera move per beat; separate camera motion from subject motion;
- cause before effect ("the lid lifts, *then* light escapes");
- one material and one light source throughout (continuity);
- loops: 4–8 s, slow, muted, first frame = last frame;
- name what to exclude — people, text, logos — unless the subject needs them.

**Cost** (fal, 2026-07): tokens = height × width × seconds × 24 / 1024 at $0.0214 per 1,000 tokens —
about **$0.47 per second at 720p**, so a 10 s 720p clip is ≈ $4.62. `plan` prints the estimate
before anything is spent.

**Measured, never inferred.** Every candidate is ffprobed and hashed; a clip is described by its
measured length, never by the length that was requested.

**Fallback:** HyperFrames for designed motion → a §19 noise or flow field for organic loops → a poster still.

---

## 6. Audio — sound as haptic depth

```bash
node engines/audio/audio.mjs plan|run --job cue.json          # ElevenLabs sound generation
```

The sound doctrine lives in [`motion-language.md`](motion-language.md) §13. The page-side
contract: off by default, a visible toggle, `AudioContext` resumes only inside a user gesture, one
cue per signature commit. **With the engine off, ship no audio UI — a dead toggle is slop.** A
synthesized WebAudio tone is the zero-payload fallback.

---

## 7. The ledger — every generated asset is accountable

Generated media goes through one ledger, the media tournament of the GENERATE phase:

```bash
node engines/ledger.mjs list|select|verify|encode|promote --run .ic/runs/<ts>-<name>
```

```
.ic/runs/<ts>-<name>/              gitignored — masters never enter the repo
  manifest.json                    jobs + items: sha256, measured media / mesh facts, selection + reason
  inputs/  candidates/  web/  evidence/
public/video/hero.mp4                         only reviewed web encodes are promoted
public/video/hero.mp4.provenance.json         engine · tool · model · prompt · seed · params · inputs · rights · cost
```

1. **Candidates by register** — R2 two, R3 three, R4 four; up to eight for an identity film.
2. **A blind critic scores the candidates**, never the builder's self-report. *"Prefer a slightly
   quieter frame with strong identity over a spectacular but interchangeable frame."*
3. **`select` requires a written reason** of at least 16 characters: what makes this one win.
4. **`verify` re-hashes every file** instead of trusting the stored hash.
5. **`encode`** makes the web renditions: `bg-loop` (muted, 1920 and 1280), `brand-film` (1080p with
   AAC), `scroll-tied` (15 fps WebP frames, desktop and mobile — scroll-tied motion is never a
   `<video>`), `poster` (a still from 40 % in; first frames are often black or unsettled).
6. **`promote`** copies only a selected, unchanged candidate into `public/` and writes its
   provenance sidecar. Never silently promote candidate 1.

---

## 8. Where the engines sit in the pipeline

```
ORIENT(0)      node engines/detect.mjs → orient-decision.json.power_engines
PACKAGE(3.9)   the Artifact Assessment Gate runs here (moved from Phase 5) and writes the engine jobs
               from the score's beats — clay rail, hero object, shot jobs, cues
FORGE(4) ‖ ASSET FORGE(5a)   engines run in parallel with the build agents
               Agent-D: video + audio · Agent-F with Agent-D: meshes and the clay rail
GENERATE(5)    the tournament: candidates → blind critic → select with reasons → verify → encode → promote
COMPOSE(6)     integrates promoted encodes only — never a master, never an unselected candidate
VERIFY(7)      every shipped generated file has a provenance sidecar (Axis 4)
HANDOFF(8)     PREMIERE — the launch film from the same score (cinematic-score.md §7)
```

---

## 9. Fallback ladders

| Engine | 1st fallback | 2nd | Floor |
|---|---|---|---|
| Blender | procedural three.js geometry | §19 point-cloud promotion | Tier I composed-depth still |
| Video | HyperFrames (designed motion) | §19 noise / flow field (organic loops) | poster still |
| Audio | synthesized WebAudio cue | — | no audio UI at all |

**Never flat.** Every ladder ends in a designed, composed state — not an empty box.
