# Power Engines

> **Toggles for the tools that take a design from beautiful to unbelievable.**
> Blender for the shots code can't make. Seedance 2.5 for photoreal film with sound. Audio for the
> commit chime and the ambient bed. Each engine is optional, detected (never provisioned), and
> degrades to a named fallback — a missing engine never blocks a build. Doctrine:
> [`references/power-engines.md`](../references/power-engines.md).

## Switch them on

Copy [`canvas.config.example.json`](canvas.config.example.json) to your project root as
`canvas.config.json` and flip `enabled`. Then scan:

```bash
node engines/detect.mjs            # → .ic/power-engines.json (Phase 0 reads this)
```

| State | Meaning |
|---|---|
| `enabled` | you asked for it and it's here |
| `available` | it's here, you didn't ask |
| `missing` | you asked, it's absent — the engine prints its plan, exits 2, the build uses the fallback |
| `disabled` | you switched it off |

Secrets come from the environment only — `FAL_KEY`, `ELEVENLABS_API_KEY` (and `REPLICATE_API_TOKEN` / `ARK_API_KEY`
where those providers are used). Nothing is written to disk, nothing is ever signed up for.

## The engines

| Engine | Command | Makes | Fallback when off |
|---|---|---|---|
| **Blender** | `node engines/blender/blender.mjs plan\|sheet\|run --job job.json` · `selftest` | `clay-camera` reference clips + baked camera rails (roll, per-segment ease, seeded handheld, the move in words; `sheet` = 21 stills to approve first) · `hero-object` GLB (Draco) + turntable · `turntable` frames · `matcap` light — every render frame-counted | procedural three.js → §19 point cloud → Tier I still |
| **Video** (Seedance 2.5) | `node engines/video/video.mjs plan\|run\|ingest --job shot.json` | films, loops, transitions — fal queue automated; Dreamina / Higgsfield / ModelArk via `ingest` | HyperFrames → §19 flow field → poster |
| **Audio** (ElevenLabs) | `node engines/audio/audio.mjs plan\|run --job cue.json` | ambient beds, signature cues | no audio UI, or a synthesized WebAudio bed |
| **Ledger** | `node engines/ledger.mjs list\|select\|verify\|encode\|promote` | selection with reasons, re-hash verification, web encodes, provenance sidecars | — |

Exit codes everywhere: **0** ok · **1** failed (including over a tier budget) · **2** unavailable (plan printed).

## The twin camera — Blender × Seedance 2.5

The strongest thing these two engines do together:

```bash
node engines/blender/blender.mjs run --job engines/examples/living-canvas-rail.clay.json
#   → clay.mp4           grey, flat-shaded, 5 s: the camera move and blocking, nothing else
#   → camera-rail.json   ic-camera-rail/2: the stations + one baked sample per frame (three.js space)
node engines/video/video.mjs run --job engines/examples/living-canvas-trailer.shot.json
#   @Video1 = clay.mp4 (camera and blocking only) · @Image1 = a style frame (palette and light only)
```

The film inherits the clay render's exact camera; the site's WebGL camera plays the same baked
samples with [`runtime/camera-rail.js`](../runtime/camera-rail.js) (`rail.apply(camera, progress)`).
Station `fov` is **vertical** degrees, as in three.js — the job fits Blender's sensor vertically so
the number means the same thing in both. Stations may also carry `roll` and a per-segment `ease`.
**Film and site match shot for shot.** Clay renders carry no gizmos, grids, outlines, or frame
counters — those come back in the generation as objects.

## Every generated asset is accountable

```
.ic/runs/<ts>-<name>/            gitignored
  manifest.json                  jobs + items: sha256, measured media/mesh facts, selection + reason
  inputs/  candidates/  web/  evidence/
public/video/hero.mp4
public/video/hero.mp4.provenance.json   engine · tool · model · prompt · seed · params · inputs · rights · cost
```

`ledger.mjs select` refuses a reason under 16 characters. `promote` refuses anything unselected or changed
since it was recorded. `verify` re-hashes every file instead of trusting the stored hash.

## Proven on this machine (Windows 11, Node 22, ffmpeg 8.1)

- `detect.mjs` with and without a config: states and fallbacks reported correctly (Blender and video `missing` — not installed / no key)
- Blender `plan` → exit 0; `run` without Blender → exit 2 with the fallback; `blender_forge.py` compiles
- Seedance `plan` compiles the fal-structured prompt; cost ≈ $4.62 per 10 s 720p clip (fal's published ≈ $0.47/s); `run` without `FAL_KEY` → exit 2
- `ingest` of a 9.5 s clip → measured 9.5 s 1280×720 @24 fps +audio, provenance written
- `select` rejects a one-word reason; `verify` passes, then **fails after a one-byte tamper**; `encode` poster / bg-loop / scroll-tied (143 + 143 frames); `promote` writes the sidecar
- audio `plan`, and `run` without a key → exit 2
- v6: `blender_forge.py` compiles with the vertical-FOV camera, the roll + handheld rig, the baked
  `ic-camera-rail/2` samples and the 21-still `sheet` gate; `sheet` without Blender → exit 2 with its plan
- v6: `runtime/camera-rail.js` — 9 unit checks (look-at, roll, slerp, baked playback within 0.008 units of
  the rail over 96 frames, `apply` sets fov + projection); the old job's FOV convention would have made the
  clay film 1.78× tighter than the site — fixed

**The twin-camera parity check** — [`blender/parity.html`](blender/parity.html) renders the clay
blocking in three.js from the baked rail and compares silhouettes with Blender's frames (first,
middle, last; PASS = IoU ≥ 0.90). `?selftest` proves the metric without Blender: the correct vertical
fov scores 1.000, the old horizontal-fov reading 0.30 / 0.22 / 0.00. On a machine with Blender,
`node engines/blender/handoff.mjs` runs the whole proof (selftest → 21-still sheet → full clay render →
the parity URL), resumes after fixes, and `handoff.mjs complete` records the result in
`blender/evidence/twin-camera-parity.json`.

**Not yet proven here:** a real Blender render (Blender is not installed on this machine — run
`node engines/blender/blender.mjs selftest` where it is) and a paid fal generation (no key used).
