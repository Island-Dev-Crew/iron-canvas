# Surface Pack: GAME / REALTIME — Iron Canvas v5.0
## *The UI shares the frame with the game. Every millisecond and every pixel is borrowed.*

```yaml
pack: game-realtime
surface: "Game frontends — title screens, menus, HUDs, overlays, settings, companion sites. NOT gameplay systems."
project_types: [G]
status: experimental
version: 5.0
```

> **Position in pipeline:** Dispatched at Phase 0 for Type G ★v5.0 (game frontend/HUD work).
> **Scope discipline:** Iron Canvas designs the *interface layer* of games — everything the
> player reads, navigates, and configures. Gameplay mechanics, level design, and engine
> systems are out of scope. The Unreal MCP adapter (below) carries the design language INTO
> an engine; it does not make Iron Canvas a game studio.
> **EXPERIMENTAL:** patterns are sound; the engine-adapter tooling is community-stage. Web-
> delivered game frontends (menus/HUDs in canvas/DOM, companion sites) are fully supported today.

---

## 2. PHASE OVERRIDES

| Phase | Override |
|-------|----------|
| 1 STUDY | DNA source is the game's art direction: key art, world palette, material language, era/genre codes. The UI is a citizen of the game world, not a web page floating over it. |
| 2 FEEL | BPM as standard + the **diegetic decision** (below) + photosensitivity envelope (flash/strobe limits set here, enforced at Verify). |
| 3 SCOUT | Game-UI North Star sets (§6). Reference universe is shipped games + game-UI archives, not websites. |
| 4 FORGE | Agent-C builds the **HUD grammar** + menu system before any styling. Agent-B's motion work becomes **game-feel timing** (juice curves, response envelopes). Input-agnostic from the first wireframe: gamepad, KB/M, touch. **★v5.2 — run as a GAUNTLET LOOP** (pack override of the R2–R4 default: fires at **R3/R4 only** — a Type-G companion site at R2 builds its HUD once, well): fan out N HUD/game-feel candidates, a blind critic scores each against the game-feel bar (juice envelopes, ≤ 8ms HUD latency, colorblind + photosensitivity gates, North Star diff), loop until one clears (references/gauntlet-loop.md). |
| 4.5 IMMERSE | Title screen IS the sanctioned immersive moment (Agent F, §22 gate applies) — **gauntlet-forged ★v5.2 at R3/R4** (`references/gauntlet-loop.md`): fan out N title-screen candidates, blind-critic against scorecard ≥ 4.0 + North Star, ship the winner. In-HUD 3D elements (radar, holo-maps) count as staged scenes — one max. |
| 5 GENERATE | Assets: iconography systems (SVG, states × rarities), frame/border nine-slices, §19 generative backgrounds for menus (seeded — menus must be reproducible in bug reports). |
| 6 COMPOSE | Composition = layering contract with the game frame (below), state machine wiring (title → menu → loadout → in-game → pause), settings persistence. |
| 7 VERIFY | This pack's verify profile (§5) — includes photosensitivity and colorblind gates web packs don't carry. |

---

## THE DIEGETIC DECISION (Phase 2 output — one choice, like the world material)

```
NON-DIEGETIC   classic overlay HUD — exists for the player, not in the world
               → serious ≥ 7 or competitive/readability-first titles
SPATIAL        UI planes positioned in the world but not part of its fiction
               → technical ≥ 7, sci-fi/strategy codes
DIEGETIC       the interface exists IN the fiction (Dead Space spine, cockpit dashes)
               → avant_garde ≥ 8 AND immersion-first single-player DNA
MIXED          diegetic signature moments + non-diegetic critical info (most AAA)
               → default when scores conflict; critical info is NEVER diegetic-only
```

## THE HUD GRAMMAR

```
SAFE AREAS     5% TV-safe inset minimum; every anchor tested at 16:9, 21:9, Steam Deck 16:10
ANCHOR LOGIC   corners = persistent status · center = momentary feedback · edges = spatial cues
               Center screen belongs to the GAME. HUD trespasses only for critical states.
FOCUS FLOW     one primary readable per game state; declutter idle HUD (fade non-critical
               after N seconds — contemplative ≥ 6 shortens N)
LATENCY        HUD reacts within ONE game frame: state → visual ≤ 8ms budget at 120fps.
               Web-frontend equivalent: input feedback < 16ms, zero layout thrash on update.
INPUT-AGNOSTIC every screen navigable by D-pad focus chain, pointer, and touch;
               focus state is a designed element (§ border luminance), never default outline
```

## GAME-FEEL TIMING (Agent-B's grammar here)

```
RESPONSE      button/select feedback 40–80ms attack, overshoot ease (the "juice" envelope)
CONFIRM       purchase/equip/level-up: 200–400ms ceremonies, scaled by rarity/weight
DAMAGE/ALERT  0ms attack, hold, 150ms release — alerts never fade IN
MENU MOVES    120–200ms panel slides; a menu that animates slower than the player thinks is broken
PHOTOSENSITIVITY (hard envelope, set Phase 2, gated Phase 7):
  no full-screen flashes > 3/sec · no red flashes > 2/sec · flash area ≤ 25% viewport
  unless the game ships a photosensitivity-safe mode toggle (then both paths verify)
```

---

## 3. DIS PROFILE (all 9 systems)

```
System 1 GRADIENT MESH    → menus only, cap 0.6 (in-HUD atmosphere belongs to the game)
System 2 GLASS DEPTH      → floor 0.3 on menu panels; HUD glass cap 0.5 (readability tax)
System 3 KINETIC TYPE     → menus floor 0.4 (Persona-grade type energy welcome);
                            HUD numerals cap 0.2 — damage numbers animate, labels never
System 4 PARTICLE FIELD   → menu backgrounds only (seeded §19); in-HUD cap 0.2
System 5 BORDER LUMINANCE → floor 0.4 — focus/rarity/status glow is MEANING (as app-dashboard)
System 6 SCROLL SEQUENCES → cap 0 — no scroll narratives inside game UI
System 7 MAGNETIC CURSOR  → cap 0.3 pointer modes only; never on gamepad focus
System 8 MICRO POLISH     → FLOOR 0.6 — game feel IS micro-interaction; sound hooks mandatory
System 9 DEPTH LANGUAGE   → see §4
```

## 4. DEPTH PROFILE

```
DEFAULT: 0.2–0.5 (HUD lives at Tier I — composed layers over the game's own depth)
CEILING: 0.8 — TITLE SCREEN ONLY (the sanctioned Tier III-adjacent moment: menu world,
         camera drift, §22 evidence gate applies in full)
HARD RULE: the game frame is the ATMOSPHERE band. HUD occupies NEAR; menus MID.
           UI never fogs, blurs, or parallaxes the gameplay viewport itself.
```

---

## 5. VERIFY PROFILE

```
PERFORMANCE:  UI cost ≤ 2ms/frame co-resident with game render (measure UI-only pass)
              menu transitions 60fps · zero GC hitches from UI pooling during gameplay
              web frontend: INP < 100ms (players notice what office users forgive)
READABILITY:  every HUD element legible at 3m/couch distance at 1080p (type ≥ 24px eq.)
              all four anchor corners hold at 16:9 / 21:9 / 16:10 safe areas
ACCESSIBILITY (game-grade, mandatory):
              colorblind: deuteranopia/protanopia/tritanopia sims — status never hue-only
              full D-pad/focus-chain traversal · remap-safe labels (never "press [X]" hardcoded)
              photosensitivity envelope verified (automated flash analysis on captures)
              UI scale option 80–130% without layout breakage
EVIDENCE:     §22 harness adapted — screenshots per game state (title/menu/HUD idle/HUD
              combat/pause), per aspect ratio, plus colorblind sim captures
6-AXIS AUDIT: craft → frame discipline · identity → game-world citizenship · motion →
              juice envelopes · depth → band contract with gameplay viewport · states →
              full state machine choreographed · treatment&soul (Axis 6, CD3) →
              register match to the game's world; HUD legibility + diegetic coherence as soul; no decoration slop
```

---

## 6. NORTH STAR SEARCH SETS

```
"Destiny 2 UI design system analysis" · "Persona 5 menu UI motion design"
"Dead Space diegetic UI RIG" · "Cyberpunk 2077 HUD design breakdown"
"Arwes sci-fi UI framework" · "game UI database interface in game"
"Hades UI design supergiant" · "Steam Deck UI safe area guidelines"
```
Study: how shipped games spend their motion budget (juice on player actions, calm
everywhere else) and how rarity/status color systems survive colorblind modes.

---

## 7. OUTPUT ARTIFACTS DELTA

```
agent-outputs/
├── agent-a/  + hud-tokens.css (safe areas, anchor grid, couch-distance type scale)
├── agent-b/  − scroll/transitions  + game-feel.js (juice envelopes), state-machine.js
├── agent-c/  + hud/ (per-state layouts), menus/, focus-chain.js, settings-schema.json
├── agent-f/  + title-world/ (if title-screen moment sanctioned — §22 evidence included)
└── agent-e/  + colorblind-sim-captures/, photosensitivity-report.md, aspect-ratio-proof/
```

---

## UNREAL / ENGINE DELIVERY

Web-native frontends ship from this pack directly. For engine-native delivery (UMG/Slate,
Niagara, Sequencer), the design PRD + this pack's outputs map through the adapter:
**→ `surfaces/game-realtime/UNREAL-ADAPTER.md`** (spec: tokens → Material Parameter
Collections, motion → UMG animations, §19 systems → Niagara, camera rails → Sequencer).
The adapter is a CONSUMER of the pipeline — it never bypasses phases or gates.

---

*Surface Pack: GAME / REALTIME — Iron Canvas v5.0 (EXPERIMENTAL)*
*"The UI shares the frame. Every millisecond and every pixel is borrowed from the game."*
*"Juice on player actions. Calm everywhere else."*
