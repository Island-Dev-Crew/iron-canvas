# Surface Pack Contract — Iron Canvas v5.0
## *One core. Many surfaces. Every pack self-contained for its domain.*

> **Position in pipeline:** Phase 0 (ORIENT) classifies → router dispatches ONE pack → pack
> governs phase overrides, DIS profile, and verify profile for the whole run.
> **What it replaces:** Nothing — it formalizes what Phase 0's type table already implied.
> **What it preserves:** The self-containment law. SKILL.md remains the complete web-surface
> body; packs extend the system to new surfaces without diluting it.

---

## WHY PACKS, NOT A BIGGER SKILL.md

The v4.2.0 reconciliation proved the failure mode: when SKILL.md was reduced to routing
pointers, agents regressed to v3 behavior. The inverse failure is just as real — inlining
game HUD design, native app patterns, and Unreal pipelines would balloon SKILL.md past
6,000 lines and dilute the focus that makes the web pipeline strong.

**The law, extended to v5.0:**
```
SKILL.md         = the CORE (phases 0–3.9, DIS, tokens, anti-patterns) + the WEB surface, fully inline
surfaces/*/PACK.md = one additional surface each, fully self-contained FOR THAT SURFACE
```
A build agent reads SKILL.md + ROUTING.md + exactly ONE pack. Never two packs. Never a
pack instead of SKILL.md.

---

## THE REGISTRY

| Pack | Surface | Project Types | Status |
|------|---------|--------------|--------|
| `surfaces/web/` | Websites — the flagship | A, B, D, E, F | **STABLE** (body lives in SKILL.md) |
| `surfaces/app-dashboard/` | Dashboards, admin UIs, applications | C, C-app | **STABLE** ★v5.0 |
| `surfaces/immersive-3d/` | Tier III worlds as the product | A-world | **STABLE** ★v5.0 (Agent F is the world agent; §22 gate mandatory) |
| `surfaces/game-realtime/` | Game frontends, HUDs, menus + Unreal adapter | G | **EXPERIMENTAL** ★v5.0 (patterns stable; engine adapter is spec-stage — see `game-realtime/UNREAL-ADAPTER.md`) |

Unlisted = unrouted. Phase 0 dispatches only registry packs. EXPERIMENTAL packs run the
full pipeline but flag their status in the orient decision and the handoff.

---

## REQUIRED BLOCKS — every PACK.md must define all seven

### 1. IDENTITY
```yaml
pack: app-dashboard
surface: "Dashboards, mission control, analytics, admin UIs, productivity applications"
project_types: [C]
status: stable | experimental
version: 5.0
```

### 2. PHASE OVERRIDES
Which of phases 0–8 run differently on this surface, and how. Unlisted phases run exactly
as SKILL.md specifies. Overrides may REPLACE a phase's technique but never SKIP a phase —
Phase 5 and Phase 6 gates remain mandatory on every surface.

### 3. DIS PROFILE
Per-system floors and caps layered onto the standard DIS calculation (applied at the
"surface pack cap" step of the resolution order). All 9 systems must be listed, even if
the entry is "standard."

### 4. DEPTH PROFILE
The pack's depth-language range: default band, ceiling, and what Tier II/III moments are
sanctioned on this surface. (See `references/depth-language.md`.)

### 5. VERIFY PROFILE
Phase 7 checks for this surface. Web's Lighthouse/LCP battery does not transfer — an app
measures INP and frame budget; a game measures frame time and input latency. Every profile
must define: performance metrics + budgets, accessibility battery, and the 6-axis audit
(Axis 6 — CD3 Treatment & Soul — is non-optional; every pack's VERIFY profile inherits it ★v5.1)
adapted to the surface.

### 6. NORTH STAR SEARCH SETS
Phase 3 SCOUT queries calibrated to the surface's reference universe.

### 7. OUTPUT ARTIFACTS DELTA
Additions/substitutions to the § OUTPUT ARTIFACTS tree. Core artifacts (orient-decision,
feel-profile, design-prd, verification-report) are universal and may never be dropped.

---

## ROUTER INTEGRATION (Phase 0)

The orient decision JSON gains two fields ★v5.0:

```json
{
  "surface_pack": "web | app-dashboard | immersive-3d | game-realtime",
  "depth_intensity_hint": 0.0
}
```

Dispatch rule: `project_type` → pack per the registry table. The pack is chosen ONCE at
Phase 0 and never switched mid-run. If a project seems to need two packs (marketing site
+ admin app), it is two Iron Canvas runs sharing one feel-profile.

---

## WHAT PACKS INHERIT (and may not redefine)

- The Brand Personality Matrix and Palette Derivation Protocol (Phase 2 is universal)
- The DIS calculation algorithm (packs adjust inputs via profile, never the algorithm)
- The anti-pattern registry (packs may ADD emphases, never waive entries)
- The North Star discipline (every surface gets a Phase 3 reference image)
- Staging-first production protocol
- Agent autonomy tiers

**A pack is a lens, not a fork.** If a pack needs to rewrite the core, the core is wrong —
fix it there.

---

*Surface Pack Contract — Iron Canvas v5.0*
*"One core. Many surfaces. The DNA decides the altitude; the pack decides the terrain."*
