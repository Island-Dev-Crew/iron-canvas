# Unreal MCP Adapter — Iron Canvas v5.0 (SPEC)
## *The design PRD, delivered into an engine. A consumer of the pipeline, never a bypass.*

> **STATUS: EXPERIMENTAL SPEC.** Community Unreal MCP servers (actor spawning, Blueprint
> authoring, material editing over the Model Context Protocol) work today but are not
> production-hardened. This document defines the *contract* so the adapter slots in as the
> tooling matures. Nothing in the core pipeline depends on it.

---

## THE CONTRACT IN ONE LINE

```
design-prd.md + feel-profile.json + pack outputs  ──adapter──►  Unreal-native equivalents
The adapter TRANSLATES Iron Canvas artifacts. It never generates design decisions.
```

Every phase, every gate, every anti-pattern check runs exactly as the dispatched pack
specifies (game-realtime for HUD/menus; immersive-3d grammar for world/camera work).
The adapter is Phase 6 COMPOSE machinery — a delivery target, like a browser is.

---

## MAPPING TABLE — Iron Canvas artifact → Unreal construct

| Iron Canvas artifact | Unreal construct | Notes |
|---|---|---|
| `tokens.css` color ramp (oklch) | **Material Parameter Collection** (`MPC_Brand`) | one MPC = the palette; sRGB-converted, scalar params for alpha steps |
| `tokens.css` type scale | **UMG font assets + DataTable** (`DT_TypeScale`) | couch-distance scale from game-realtime pack §HUD grammar |
| `--elev-*` / depth tokens | **UMG translucency/shadow styles + PostProcess DoF settings** | Tier I composed depth = UMG layer treatments |
| Data-motion / game-feel timing specs | **UMG Widget Animations** | juice envelopes → animation curves; naming: `UIA_<Pattern>_<State>` |
| Camera rail spec (`camera-rail-spec.json`) | **Level Sequence** (Sequencer) + CineCamera rig | stations → keyframes, spline interp matches BPM camera rules |
| §19 algorithmic art (seeded systems) | **Niagara System** | seed exposed as user parameter — reproducibility rule holds in-engine |
| Fog/atmosphere tokens (`--world-fog-*`) | **Exponential Height Fog + PostProcess Volume** | fog color from MPC_Brand — palette-locked atmosphere, never engine default |
| HUD layouts (per-state) | **UMG Widget Blueprints** (`WBP_HUD_<State>`) | anchor logic → UMG anchors; safe areas → DPI-safe zone settings |
| Focus-chain spec | **Common UI input routing / navigation config** | D-pad traversal contract from pack §HUD grammar |
| State machine (`state-machine.js` spec) | **GameInstance subsystem + Blueprint enum states** | title → menu → loadout → in-game → pause |
| Kill switch / fallback ladder | **CVar** (`ui.IronCanvas.ImmersiveTitle 0/1`) | §22 one-line kill switch, engine-native |

---

## MCP COMMAND FLOW (when an Unreal MCP server is connected)

```
1. VALIDATE   adapter reads design-prd.md + pack outputs; refuses to run on a PRD
              missing feel-profile / DIS block (no gates skipped upstream)
2. FOUNDATION create MPC_Brand, DT_TypeScale, folder structure /Game/UI/IronCanvas/
3. WIDGETS    author WBP_* per HUD state; wire anchors + safe areas
4. MOTION     create UMG animations from timing specs; Niagara systems from §19 seeds
5. ATMOSPHERE fog + post-process volumes from world tokens (immersive/title work only)
6. SEQUENCER  camera rail → Level Sequence (title screens, menu worlds)
7. EVIDENCE   screenshot captures per game state via MCP viewport tools →
              feeds the §22 scorecard exactly like Playwright feeds web evidence
```

Agent autonomy: engine installs/plugins follow the Agent Autonomy Protocol tiers
(references/agent-autonomy.md) — an MCP server that wants to install engine plugins is a
Tier 2+ "ask before paid/system-level" event.

---

## HARD RULES

1. **PRD-DOWNSTREAM ONLY** — the adapter consumes finished design decisions. "Design it
   in-engine" is a pipeline bypass; run the phases first.
2. **SEEDS SURVIVE TRANSLATION** — every Niagara system exposes the Iron Canvas seed;
   a menu background must be reproducible from the manifest, same as web.
3. **PALETTE-LOCKED** — no engine-default fog, bloom, or example materials in deliverables
   (Anti-Pattern #15's engine cousin: default UE starter-content aesthetics).
4. **EVIDENCE STILL GATES** — §22 applies: per-state screenshots, scorecard ≥ 4.0, zero
   auto-fails (console errors → Blueprint compile warnings + runtime ensures).
5. **NEVER GATE THE CORE** — if the MCP server is absent/broken, the pack still ships its
   web-native artifacts; the adapter is additive delivery, not a dependency.

---

## KNOWN TOOLING (evaluation notes, not endorsements)

Community Unreal MCP servers currently expose: actor spawn/transform, Blueprint node
authoring, material instance editing, asset listing, viewport screenshots. Gaps that keep
this EXPERIMENTAL: UMG widget authoring depth, Sequencer keyframe APIs, Niagara parameter
coverage, and undo/transaction safety. Re-evaluate per project at Phase 3.5 VALIDATE —
the feature matrix gate applies to the adapter like any other technology.

---

*Unreal MCP Adapter Spec — Iron Canvas v5.0*
*"The adapter translates. The pipeline decides."*
