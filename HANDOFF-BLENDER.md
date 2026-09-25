# HANDOFF — prove the twin camera on the Blender machine

> **For the Claude Code session on Jon's Mac.** Read this whole file, then run it top to bottom.
> This file deletes itself when the job is done (`node engines/blender/handoff.mjs complete`).
> Written 2026-09-25 on Jon's Windows machine, where Blender is not installed.

## Where things stand

- **Iron Canvas v6 — The Living Canvas** is merged to `main` (merge `a9f1027`). The doctrine, the
  Score Runtime, the Power Engines, Iron Canvas Studio and the checks are all in place and verified.
- **Two things were never proven, because that machine had no Blender:**
  1. a real headless Blender render (`engines/blender/blender_forge.py`);
  2. that the site's WebGL camera sees **exactly** what Blender's clay film sees — the "twin camera".
- Why (2) matters: the first version of the clay job read `fov` as Blender's *horizontal* angle
  while three.js reads it as *vertical*, so the clay film would have been ~1.78× tighter than the
  site. That was fixed in v6 — the camera is now vertical-fit, and Blender bakes one camera sample
  per frame into `camera-rail.json`, which the site plays with `runtime/camera-rail.js`. The maths is
  unit-tested; **a real render has not confirmed it yet.** That is this job.

## What "done" means

`engines/blender/parity.html` renders the same blocking in three.js from the baked rail and compares
silhouettes with Blender's clay frames at the first, middle and last frame. **PASS = every IoU ≥ 0.90.**
Its own `?selftest` already passes on Windows (correct fov → IoU 1.000; the old bug → 0.30 / 0.22 / 0.00),
so the metric is known to catch the failure it exists for.

## Steps

```bash
# 0 · the repo, current
git clone https://github.com/Island-Dev-Crew/iron-canvas.git   # or: git pull on an existing clone
cd iron-canvas && git switch main && git pull

# 1 · tools (Node 22+, Blender 4.x or 5.x, ffmpeg)
brew install --cask blender        # or install Blender to /Applications; BLENDER_PATH also works
brew install ffmpeg node

# 2 · run the handoff — resumable: re-run after any fix and finished steps are skipped
node engines/blender/handoff.mjs
#   finds Blender → selftest (render + GLB) → the example clay rail as a 21-still sheet
#   → the full clay render (clay.mp4 + baked camera-rail.json, every frame counted) → prints the parity URL

# 3 · look at the sheet it made (…/sheet.png) — does the move read as a slow push down a corridor of arches?

# 4 · the side-by-side
npx --yes http-server . -p 4174 -c-1
#   open http://localhost:4174/engines/blender/parity.html?selftest   → must say SELFTEST PASS
#   open the ?run=… URL the handoff printed                          → must say PARITY PASS
#   save the result: in the page console, copy(JSON.stringify(window.__parity)) → paste into .ic/parity.json

# 5 · finish — records the evidence and deletes this file
node engines/blender/handoff.mjs complete
```

## If parity fails

Read the overlap images on the parity page (gold = both, red = Blender only, blue = three.js only):

- **Uniformly bigger or smaller silhouettes** → a field-of-view convention problem. Check
  `camera()` in `blender_forge.py` (`sensor_fit = "VERTICAL"`, `angle_y`) and the `fov` column of the
  baked samples.
- **Shifted or mirrored** → an axis problem. Blender → three.js is `(x, y, z) → (x, z, −y)`; the
  quaternion basis is a −90° rotation about X (`bake_rail_samples`).
- **Right at the ends, wrong in the middle** → interpolation: the page must play the *baked samples*,
  not re-interpolate stations (the rail needs `schema: ic-camera-rail/2` with `samples`).
- **A block missing or misplaced** → the three.js rebuild in `parity.html` (`buildBlocking`) versus the
  Blender blocking in `job_clay_camera` (Blender planes are horizontal; cube sizes swap y and z).

Fix, re-run `node engines/blender/handoff.mjs` (delete the `render` entry in `.ic/blender-handoff.json`
to force a re-render), re-check the page.

## Rules for this session

- **Staging-first.** Commit on a branch (`proof/blender-twin-camera`) and open a PR. Never push to
  `main`; Jon promotes.
- The repo is **public**: commit only `engines/blender/evidence/twin-camera-parity.json`, the deletion
  of this file, and any fixes. Renders and runs stay in `.ic/` (gitignored). No secrets, ever.
- Tell Jon plainly what passed, with the IoU numbers, and anything that did not.
- Optional, if time allows: `node engines/blender/blender.mjs run --job engines/examples/iron-hero.object.json`
  proves the hero-object job and its Tier budgets on a real GLB.
