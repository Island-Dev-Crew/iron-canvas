# Surface Pack: APP / DASHBOARD — Iron Canvas v5.0
## *Density is design. Motion is meaning. Depth is atmosphere, never spectacle.*

```yaml
pack: app-dashboard
surface: "Dashboards, mission control, analytics, admin UIs, internal tools, productivity applications"
project_types: [C]
status: stable
version: 5.0
```

> **Position in pipeline:** Dispatched at Phase 0 for Type C. Read AFTER SKILL.md + ROUTING.md.
> **What it replaces:** The § DASHBOARD ADDENDUM (SKILL.md §13) as the *primary* Type C authority —
> the addendum remains valid and is incorporated here; this pack extends it to a full surface.
> **What it preserves:** Every §13 principle. DENSITY IS DESIGN was right in v3; it is right now.

---

## WHY THIS PACK EXISTS

Through v4.x, Type C was the de-powered type: `Scroll Engine: NO · 3D Eligible: NO · dark
tokens`. Correct instincts, framed as subtraction. v5.0 reframes: **apps are not websites
minus the fun — they are a surface with their own physics.** A world-class dashboard is as
much an Iron Canvas flagship as an Awwwards campaign site. Different altitude, same craft.

What websites express through scroll narrative, apps express through **state change**:
data arriving, panels focusing, commands executing, systems breathing. That is the motion
language this pack owns.

---

## 2. PHASE OVERRIDES

| Phase | Override |
|-------|----------|
| 1 STUDY | DNA extraction targets *information architecture*: metric hierarchy, task frequency, data freshness expectations. Screenshot the app under real data density, never empty states. |
| 3 SCOUT | Use this pack's North Star search sets (§6). Reference universe is mission control / terminal / premium SaaS app — not landing pages. |
| 4 FORGE | Scroll physics → **panel physics** (below). Agent-B builds data-motion.js instead of scroll-engine.js. Agent-C builds the app shell grammar before components. |
| 5 GENERATE | Artifact Assessment usually returns lean: OG image (always) + empty-state art (§19 generative, low intensity). No scroll frames. Hero imagery rare. |
| 6 COMPOSE | Integration = shell + panels + data bindings + state choreography. No Barba, no Lenis. Command palette wired last (it touches everything). |
| 7 VERIFY | This pack's verify profile (§5) replaces the web battery. |

Phases 0, 2, 3.5, 3.9, 8: standard. **Phase 2 FEEL is emphatically universal — apps have
BPM too.** A trading terminal (serious 9, fast 8) and a creator analytics app (playful 7,
bold 6) must not ship the same dashboard.

---

## THE DENSITY SCALE

Density is the app-surface analog of the DIS mode ceiling — set at Phase 0, tokenized by
Agent-A, user-togglable when `technical ≥ 6`.

```
┌────────────┬──────────────────┬─────────────────┬───────────────────────────┐
│ Density    │ Row height/gaps  │ Type scale base │ When                      │
├────────────┼──────────────────┼─────────────────┼───────────────────────────┤
│ COMFORTABLE│ 48px / 1.5rem    │ 15–16px         │ Consumer apps, playful≥6  │
│ DENSE      │ 36px / 1.25rem   │ 13–14px         │ DEFAULT — professional    │
│ COMPACT    │ 28px / 0.75rem   │ 12–13px         │ Terminals, serious≥8 +    │
│            │                  │                 │ technical≥8 (Bloomberg)   │
└────────────┴──────────────────┴─────────────────┴───────────────────────────┘
```

**DENSITY IS DESIGN (§13, upheld):** more information per viewport = more professional.
The failure mode is not density — it is density without hierarchy. Every screen still
answers in one glance: *what is the ONE number that matters right now?*

---

## THE APP SHELL GRAMMAR

Built by Agent-C first, before any panel. Four elements, one decision each:

```
1. NAV RAIL      — left, 56px collapsed / 240px expanded. Icons + labels. Active state
                   uses accent, never a filled block. Collapse state persists.
2. TOP BAR       — 56px. Breadcrumb/context left, global actions + presence right.
                   Glass (System 2) against the content plane — the bar sits NEAR-band.
3. COMMAND PALETTE — ⌘K. Non-negotiable on every app ≥ DENSE density. Focus blur
                   (Tier I depth) dims the app behind it. Fuzzy search over every action.
4. PANEL PLANE   — the bento grid (§13 CSS, upheld) on the MID band. Panels are the
                   unit of composition, reveal, and depth.
```

---

## THE DATA-MOTION GRAMMAR

The pack's core contribution. Every animation answers "what changed?" — motion that
doesn't carry information is vetoed (MOTION IS FUNCTIONAL, §13).

```
┌──────────────────┬──────────────────────────────────────────┬──────────────────┐
│ Pattern          │ What it says                             │ Spec             │
├──────────────────┼──────────────────────────────────────────┼──────────────────┤
│ COUNTER DRAW     │ "this number is the point"               │ §13 GSAP counter │
│ CHART ENTRY      │ "this data just arrived"                 │ §13 bar/line draw│
│ LIVE PULSE       │ "this is real-time"                      │ §13 data-pulse   │
│ DIFF FLASH       │ "this value changed while you watched"   │ 300ms bg tint,   │
│                  │                                          │ green/red = ONLY │
│                  │                                          │ direction        │
│ FLIP RESORT      │ "same items, new order"                  │ FLIP transform,  │
│                  │                                          │ 400ms, stagger 30│
│ SKELETON MORPH   │ "loading became content"                 │ skeleton crossfa-│
│                  │                                          │ des to real, no  │
│                  │                                          │ layout jump      │
│ PANEL CASCADE    │ "a view is assembling"                   │ 60ms stagger,    │
│                  │                                          │ y:12 fade, once  │
│ FOCUS DIM        │ "this panel has your attention"          │ siblings drop to │
│                  │                                          │ 0.6 + blur 2px   │
└──────────────────┴──────────────────────────────────────────┴──────────────────┘

TIMING BY BPM ENERGY:
  fast ≥ 7 / trading-grade      → durations ×0.6, no entry stagger on data updates
  contemplative ≥ 7             → durations ×1.4, cascade allowed on route change
  DEFAULT                       → as specced above
REAL-TIME RULE: data updates NEVER animate position (rows don't dance). Values flash,
order FLIPs only on user sort. A live table that reflows itself is unusable.
```

---

## 3. DIS PROFILE (all 9 systems)

```
System 1 GRADIENT MESH    → cap 0.5   ATMOSPHERE band only, behind the panel plane
System 2 GLASS DEPTH      → FLOOR 0.3 the surface signature (§13 glass-card upheld)
System 3 KINETIC TYPE     → cap 0.4   headers + hero KPI only; body type never animates
System 4 PARTICLE FIELD   → cap 0.3   ambient, ATMOSPHERE band, off at COMPACT density
System 5 BORDER LUMINANCE → cap 0.6   status glow is MEANING here (alerts, live edges)
System 6 SCROLL SEQUENCES → cap 0.1   apps don't scroll-tell stories; panels reveal
System 7 MAGNETIC CURSOR  → cap 0.2   custom cursors cost precision; dot at most
System 8 MICRO POLISH     → FLOOR 0.4 toasts, loading, feedback = app quality floor
System 9 DEPTH LANGUAGE   → see §4
```

---

## 4. DEPTH PROFILE

```
DEFAULT BAND: 0.15–0.35 (Tier I composed depth)
CEILING:      0.5 — ONE sanctioned Tier II moment (below)
```

> **Register ↔ pack precedence (CD3 ★v5.1):** the Treatment Register is the OUTERMOST clamp.
> A **pure-utilitarian admin/report is R0 (cap 0.2)** — this pack's 0.5 Tier-II centerpiece is
> then clamped to 0.2 (`min(0.5, 0.2)`), and that is correct: no depth centerpiece behind a data
> grid (Anti-Pattern #15). A dashboard that genuinely *earns* the sanctioned centerpiece is an
> **R1+ task** — classify it so at ORIENT, and the 0.5 ceiling applies. Set the register from the
> task, not by reaching for the centerpiece.

Tier I is where apps live: elevation ramp on panels, focus blur behind palette/modals,
glass strata (bar NEAR / panels MID / mesh ATMOSPHERE), zero parallax gimmicks.

**The sanctioned Tier II moment — THE CENTERPIECE:** mission-control apps (`bold ≥ 6` or
explicit operator request) may stage ONE WebGL data centerpiece: the ops globe, the fleet
particle map, the network topology in space. It is a *data visualization that happens to
be 3D*, palette-locked, lazy-loaded, and it earns its draw calls by carrying live data.
igloo-style ambience without an igloo-style world.

**Never on this surface:** camera rails, scroll dollies, world materials, WebGL backdrops
behind data grids (Anti-Pattern #15 red-flag territory).

---

## STATE CHOREOGRAPHY — states are designed moments

```
LOADING  → skeleton screens in exact final geometry (SKELETON MORPH). Spinners are defeat.
EMPTY    → the onboarding surface. §19 generative art at 0.2–0.3 (System C/D — noise
           gradient or geometric tiling, seeded, palette-locked) + ONE next action.
           An empty state without an action is a dead end.
ERROR    → factual, calm, actionable. What failed → what we kept safe → the retry.
           serious ≥ 7 brands never joke in error states.
SUCCESS  → proportional: micro-tick for routine saves; DIFF FLASH for big completions.
           playful ≥ 7 unlocks ONE celebratory moment per session, not per click.
```

---

## 5. VERIFY PROFILE (replaces the web battery)

```
PERFORMANCE:
  INP < 200ms on every interactive element (the app-surface LCP-equivalent)
  Panel transitions hold 60fps (measured, DevTools trace)
  Live-data update cost: no dropped frames at 10 updates/sec on the busiest view
  Route change to interactive < 800ms · Command palette open < 100ms
  Centerpiece (if present): lazy, ≤ 100 draw calls, degrades per fallback ladder

ACCESSIBILITY:
  Full keyboard traversal — every action reachable, palette included
  Data viz: color is never the only channel (shape/label/pattern accompany green/red)
  Contrast at DENSE and COMPACT densities verified (small type is where contrast dies)
  prefers-reduced-motion: all grammar patterns → opacity-only versions
  Focus states visible at every density; focus never trapped in a panel

6-AXIS AUDIT (adapted): craft → density-hierarchy · identity → BPM expressed in an app ·
motion → grammar compliance (no decorative motion) · depth → band discipline ·
states → all four choreographed on every view ·
treatment&soul (Axis 6, CD3) → register R0/R1 (this surface's home): restraint IS the
craft — information-density and state-as-form over decoration; zero slop-tells; DIS caps at the register
```

---

## 6. NORTH STAR SEARCH SETS

```
§13 set (upheld):  "mission control UI dark dashboard premium" · "SpaceX Dragon UI" ·
                   "NASA mission control redesign" · "Bloomberg terminal dark concept" ·
                   "glassmorphism data visualization dark gold"
v5.0 additions:    "Linear app UI design system quality"
                   "Vercel dashboard dark analytics design"
                   "Arwes sci-fi UI framework interface"
                   "Palantir Foundry ops UI design"
                   "premium admin panel awwwards dense data"
                   "trading terminal UI modern dark design"
```

---

## 7. OUTPUT ARTIFACTS DELTA

```
agent-outputs/
├── agent-a/  + density-tokens.css, elevation-tokens.css
├── agent-b/  − scroll.js, scroll-engine.js, transitions.js
│             + data-motion.js, state-choreography.js, centerpiece.js (if sanctioned)
├── agent-c/  + app-shell.css, command-palette.js, states/ (loading/empty/error/success)
└── agent-e/  + density-audit.md (hierarchy check at all densities)
```

---

## ANTI-PATTERN EMPHASES (registry additions for this surface)

- **#12 INTENSITY MISMATCH** — most common as *over*-intensity here. Red flag: aggregate > 0.5 on `serious ≥ 8` ops tooling.
- **#15 DEPTH THEATER** — WebGL backdrop behind a data grid is the canonical violation.
- **DASHBOARD-SPECIFIC RED FLAGS:** motion on live data reflow · green/red for anything but direction/status · spinner where a skeleton belongs · empty state without an action · chart animation over 1s (data is not cinema).

---

*Surface Pack: APP / DASHBOARD — Iron Canvas v5.0*
*"Websites tell stories through scroll. Apps tell them through state."*
*"Density is design. Motion is meaning. Depth is atmosphere."*
