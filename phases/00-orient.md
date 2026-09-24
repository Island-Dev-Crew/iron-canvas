# Phase 0: ORIENT — Project Classification & Mode Selection

> First action on every Iron Canvas engagement.
> Takes 5 minutes. Saves hours of misdirected effort.

## The Rule

Before any research, before any screenshots, before anything — classify the project and select the execution mode. Every downstream decision depends on getting these two right.

> **★v6 — ORIENT also names the mechanism and scans the engines.** Two more things are recorded
> here that every later phase leans on: the product's one true **mechanism** (Discovery Interview
> Q8 — the signature moment will act it out) and the **power engines** actually present
> (`node engines/detect.mjs`). When the run starts from an Iron Canvas Studio bible, its decisions
> are recorded here as given — ORIENT does not re-ask them.

---

## Step 0 ★v6: Intake — Is There a Studio Bible?

If the operator arrives with a production bible compiled by Iron Canvas Studio
(`studio/index.html` → `studio/compile.mjs`: treatment · score · engine jobs · config · mission),
its decisions are **starting positions recorded here as given**. The interview (Step 1b) only
fills what the bible left blank.

| Bible field | Recorded at ORIENT as | Carried to |
|---|---|---|
| `treatment.register` | `treatment_register` | the DIS cap and every register gate |
| `treatment.surface` | `surface_pack` | the pack dispatch (Step 1) |
| `treatment.depth` | `depth_intensity_hint` | Phase 2 DIS (the final value is computed there) |
| `treatment.mechanism` | `mechanism_sentence` (Q8) | FEEL `signature`, the score's one signature act |
| `treatment.feel_line`, `treatment.personality` | starting inputs | FEEL — the kinetic signature is still written at Phase 2 |
| `treatment.gauntlet`, `treatment.engine_gates` | recorded as given | FORGE / IMMERSE / GENERATE |
| `score` | the starting `score.json` | PACKAGE 3.9 (rewritten there, then preflighted) |
| `jobs` | the starting engine jobs | PACKAGE 3.9b |
| `config` | `canvas.config.json` | the power-engine scan (Step 4b) |

Keep the bible's files with the run (`iron_canvas_output/`). FEEL, SCOUT and the gauntlet still do
the creative work — a bible sets the starting direction, never the verdict. A placeholder left in
the bible (for example *"(name the one true mechanism in a sentence — if you cannot, stop and
ask)"*) is a blank, not a decision: ask.

---

## Step 1: Classify the Project Type

Read the project brief, URL, or client description and assign a type:

| Type | Description | Surface Pack ★v5.0 | Scroll Engine | Depth Ceiling ★v5.0 | Default Stack |
|------|-------------|--------------------|--------------|--------------------|---------------|
| **A** | Animated site, campaign, portfolio, creative studio | `web` | YES | 1.0 (Tier III if bold ≥ 8 + avant_garde ≥ 8) | ELEVATED / IMMERSIVE |
| **B** | Marketing/SaaS landing page, startup, product launch | `web` | Optional | 0.35 (Tier I — T1 perf cap) | STANDARD |
| **C** | Dashboard, mission control, analytics, admin UI, applications | `app-dashboard` | NO | 0.5 (Tier I + one sanctioned centerpiece) | STANDARD (dark tokens) |
| **D** | E-commerce, product showcase, luxury brand | `web` | YES (product reveal) | 0.7 (Tier II product orbit eligible) | STANDARD / ELEVATED |
| **E** | Enhancement of existing live site | Per original type | Per original type | Per original type | Match existing |
| **F** | New site from scratch (no existing design) | Per type | Per type | Per type | TBD in Phase 4 |
| **G** ★v5.0 | Game frontend — title/menus/HUD/overlays/companion | `game-realtime` (EXPERIMENTAL) | NO | 0.8 (title screen only; HUD ≤ 0.5) | Per delivery: web-native or engine via UNREAL-ADAPTER |
| **H** ★v6 | Film / motion piece — launch film, promo, explainer, cut-downs, OG video, loops | `film` (EXPERIMENTAL) | NO (the film score's timeline is the clock) | per `surfaces/film/PACK.md` | one film score, three lanes: code (HyperFrames) · video (Seedance 2.5) · Blender |

**Type A world-dispatch rule ★v5.0:** if the depth hint resolves Tier III *sustained* (the
world IS the experience — the "website or transcript?" test in `surfaces/immersive-3d/PACK.md`),
dispatch `immersive-3d` instead of `web`. A Tier III *moment* inside a DOM page stays `web`.

> ★v5.0 — `3D Eligible: YES/NO` is retired. Depth is System 9 of the DIS, dialed 0–1 by
> mode + BPM + surface pack (see `references/depth-language.md`). The column above shows the
> *pack ceiling*, not a binary. The floor is never flat: every type carries ≥ 0.1 composed depth.

**Type C (Dashboard/App) note ★v5.0:** Dispatch `surfaces/app-dashboard/PACK.md` — the primary
Type C authority (it incorporates and extends the § DASHBOARD ADDENDUM in SKILL.md). Scroll
physics → panel physics + data-motion grammar.

**Type E note:** Phase 1 STUDY is NON-NEGOTIABLE and must complete before any other phase. Identity Erasure (Anti-Pattern #5) is highest risk here.

**Type F note:** Start at Phase 2 (FEEL), not Phase 1. Use competitor sites for Phase 1 DNA reference.

**Type H note ★v6:** Dispatch `surfaces/film/PACK.md` when the deliverable is a timed piece of
video — even one cut from a site Iron Canvas built. A site *and* its launch film are two runs
sharing one feel-profile (one pack per run). A launch film cut from this run's own page is
PREMIERE (Phase 8), not a separate run.

---

## Step 1b ★v6: The Discovery Interview (Q8 — the Mechanism)

Before any code, run the structured interview (v4; Q8 added in v6). Its answers feed
`orient-decision.json → interview_summary` and the Site DNA Profile. With a Studio bible, ask only
what the bible left blank.

```
Q1: DATA ORIGIN — Where does content come from? (CMS, static, API, manual)
Q2: PRIORITY HIERARCHY — What are the top 3 things a visitor must see/do?
Q3: INTERACTION LEVEL — Passive consumption vs. active engagement?
Q4: RESPONSIVENESS — Mobile-first? Desktop-dominant? Parity?
Q5: COMPETITIVE POSITIONING — What should this feel better than?
Q6: ASSET INVENTORY — What visual assets exist? What must be generated?
Q7: PERFORMANCE TIER — Speed-critical? Motion-heavy? Balanced?
Q8: THE MECHANISM ★v6 — In one sentence, what is this product's one true mechanism?
    (If you cannot name it in one sentence, stop and ask. The signature moment will act it out.)
```

**Why Q8 matters.** The mechanism sentence is the seed of the whole score. FEEL carries it into
`feel-profile.json → signature.mechanism_sentence`; PACKAGE writes the one signature act that acts
it out; the engines film it. Example: *"signals converge on one governed checkpoint and fan out
into six operating surfaces."* A mechanism is never invented to fill the field — an unanswered Q8
is escalated to the operator, not guessed.

---

## Step 2: Select Execution Mode

```
SOLO: One agent. Sequential phases. No parallelism.
      Best for: Quick enhancements, small sites, single developer
      Time: Baseline

SWARM: Orchestrator + 4 parallel Build Agents (A, B, C, D).
       Best for: Standard production, most client projects
       Time: 2-3× faster than SOLO

MISSION: Orchestrator + Research + Validation + 5 Build Agents + QA
         Best for: Complex sites, dashboards, flagship Iron Canvas work
         Time: Fastest with highest quality ceiling
```

**★v6 — SOLO is the most common real-world mode.** It caps how many systems activate and how
loud they are — **never the aliveness floor**. Every mode ships ARRIVAL (one designed first
moment, ≤ 1.5 s), HEARTBEAT (one perpetual low-amplitude element on co-prime periods), HAND-FEEL
(every control answers hover, press and focus), BREATH (air + one ambient layer) and a COMPOSED
STILL (reduced motion rests on the designed final frame). At SOLO that can be a 600 ms arrival and
one breathing dot; it is never nothing (Anti-Pattern #18 LIFELESS).

**Decision guide:**
- Type A (animated site): SWARM recommended, MISSION for flagship
- Type B (marketing): SWARM or SOLO
- Type C (dashboard): MISSION recommended (data + glass + animation all specialized)
- Type D (e-commerce): SWARM (Agent-D is critical for scroll sequence frames)
- Type E (enhancement): SOLO (Phase 1 requires careful sequential study)
- Type F (new scratch): MISSION for best results
- Type H (film / motion piece) ★v6: per `surfaces/film/PACK.md`

---

## Step 3: Define Phase Emphasis

Based on project type, which phases get maximum attention:

```json
{
  "type_A": ["emphasize: Phase 3 SCOUT", "Phase 6 COMPOSE scroll engine", "Phase 4 motion depth"],
  "type_B": ["emphasize: Phase 2 FEEL", "Phase 4 FORGE interactions", "Phase 7 VERIFY conversions"],
  "type_C": ["emphasize: Phase 1 STUDY data hierarchy", "Phase 3 SCOUT mission control refs", "Phase 4 FORGE bento density"],
  "type_D": ["emphasize: Phase 5 GENERATE artifacts", "Phase 6 COMPOSE scroll sequence"],
  "type_E": ["emphasize: Phase 1 STUDY (non-negotiable)", "Phase 4 FORGE (preserve DNA)"],
  "type_F": ["emphasize: Phase 2 FEEL", "Phase 3 SCOUT (references only, no existing site)"]
}
```

---

## Step 4: Set Agent Autonomy Tier

Before recording the ORIENT decision, establish how the agent handles tool
and service provisioning. **Read [references/agent-autonomy.md](../references/agent-autonomy.md)**
for the full protocol (tiers, stack scan, persistence policy, retry logic).

```yaml
agent_autonomy:
  tier: 1 | 2 | 3
  # Tier 1 — SUPERVISED: Ask before any account creation, install, or payment
  # Tier 2 — GUIDED:     Self-provision free tools/accounts, ask before paid (DEFAULT)
  # Tier 3 — AUTONOMOUS: Use judgment, sign up/install/configure as needed, log everything
  tier_label: "SUPERVISED | GUIDED | AUTONOMOUS"
  budget_ceiling_monthly: 50    # USD, optional (Tier 3)
  allow_paid: true              # false = free-tier only regardless of tier
```

**If the operator hasn't specified a tier, default to Tier 2 (GUIDED).**

After setting the tier, run the **Stack Scan** (Steps 3-5 of the Agent Autonomy
Protocol) to inventory what's installed, what's missing, and resolve gaps
per tier before the build begins.

Also see [references/tool-acquisition-protocol.md](../references/tool-acquisition-protocol.md)
for additional provisioning patterns and credential management detail.

---

## Step 4b ★v6: Power-Engine Scan

```bash
node engines/detect.mjs          # reads canvas.config.json → .ic/power-engines.json
```

The scan reads the operator's toggles (`canvas.config.json` — copied from
`engines/canvas.config.example.json`, or the Studio bible's `config`) and records what is actually
present — Blender, Seedance 2.5, audio, imagery, film — each in one of four states, with its named
fallback:

| State | Meaning | What the build does |
|---|---|---|
| `enabled` | requested and present | its jobs are written at PACKAGE 3.9b and run in ASSET FORGE (5a) |
| `available` | present, not requested | nothing — the operator decides |
| `missing` | requested, absent | the engine prints its plan and exits 2; the build takes the fallback |
| `disabled` | switched off | nothing |

**Engines are detected, never provisioned** — at every autonomy tier. Secrets come from the
environment only (`FAL_KEY`, `ELEVENLABS_API_KEY`, …); no engine signs up, buys credits or writes
a credential. A toggle says an engine is **available**; the Treatment Register says whether it is
**appropriate**, and both must agree: R0/R1 all off · R2 the signature only (Blender only at depth
≥ 0.4) · R3 on · R4 on + the twin camera. A missing engine never blocks a build — every engine
degrades to a named fallback: Blender → procedural three.js → §19 point cloud → Tier I still ·
video → HyperFrames → §19 flow field → poster · audio → WebAudio synth → no audio UI.

---

## Step 5: Record the ORIENT Decision

Output this before proceeding:

```json
{
  "project_name": "",
  "project_type": "A/B/C/D/E/F/G/H",
  "type_description": "1-sentence rationale for the type assignment",
  "execution_mode": "SOLO / SWARM / MISSION",
  "mode_rationale": "1-sentence rationale",
  "phase_emphasis": [],
  "agents_to_spawn": [],
  "tech_stack_default": "MINIMAL / STANDARD / ELEVATED / IMMERSIVE",
  "surface_pack": "web / app-dashboard / immersive-3d / game-realtime / film",
  "treatment_register": "R0 / R1 / R2 / R3 / R4 — from the task's AMBITION, not the brand's loudness (CD3 Law 1); caps the DIS ceiling, never the aliveness floor. See references/claude-design-3.md",
  "depth_intensity_hint": 0.0,
  "mechanism_sentence": "★v6 Q8 — one sentence: the product's one true mechanism (escalate when blank; never invent)",
  "power_engines": { "blender": "enabled", "video": "missing", "audio": "disabled", "imagery": "enabled", "film": "enabled" },
  "interview_summary": {
    "data_origin": "",
    "priority_hierarchy": [],
    "interaction_level": "",
    "responsiveness": "",
    "competitive_positioning": "",
    "asset_inventory": "",
    "performance_tier": ""
  },
  "agent_autonomy": {
    "tier": 2,
    "tier_label": "GUIDED",
    "budget_ceiling_monthly": null,
    "allow_paid": true
  },
  "stack_scan_status": "complete / pending",
  "tools_provisioned": [],
  "tools_pending_approval": [],
  "dashboard_route": true,
  "scroll_engine": true,
  "three_js_eligible": "RETIRED ★v5.0 — use depth_intensity_hint + System 9 (references/depth-language.md)",
  "start_phase": "1 (or 2 for Type F)"
}
```

---

## Tech Stack Default Selection

```
MINIMAL:   CSS animations + Intersection Observer only
           When: Accessibility-critical, fast LCP required, simple content
           LCP: < 1.5s

STANDARD:  GSAP + ScrollTrigger + Lenis + CSS
           When: Most professional sites, SaaS, corporate
           LCP: < 2s

ELEVATED:  GSAP + ScrollTrigger + Lenis + SplitText + Barba.js
           When: Agency sites, portfolios, Awwwards-caliber ambitions
           LCP: < 2.5s

IMMERSIVE: GSAP + Three.js + Lenis + Custom GLSL + Barba.js
           When: Creative studios, campaigns, bold ≥ 8, avant-garde ≥ 8
           LCP: < 3s acceptable (heavy investment payoff)
```

---

## Phase 0 Completion Criteria

- [ ] ★v6 Studio bible intake: if a bible exists, its decisions are recorded as given and only its blanks are asked
- [ ] Project type assigned with rationale
- [ ] Surface pack dispatched (`web` / `app-dashboard` / `immersive-3d` / `game-realtime` / ★v6 `film`) ★v5.0
- [ ] **Treatment Register (R0–R4) chosen from the TASK's ambition + recorded ★v5.1** (CD3 — caps the whole DIS; see references/claude-design-3.md). Not the brand's loudness; when unsure, drop a register — ★v6 **never below the aliveness floor. Restraint is not stillness.**
- [ ] ★v6 Discovery Interview Q1–Q8 answered — **the mechanism sentence (Q8) recorded**, or escalated to the operator (never invented)
- [ ] ★v6 Power-engine scan run (`node engines/detect.mjs`) — `power_engines` recorded with each engine's state and fallback
- [ ] Depth intensity hint recorded (final value computed at Phase 2 DIS) ★v5.0
- [ ] Execution mode selected with rationale
- [ ] Phase emphasis defined
- [ ] Tech stack default selected
- [ ] Agent autonomy tier set (default: Tier 2 GUIDED)
- [ ] Stack scan completed (tools available vs. needed)
- [ ] ORIENT decision JSON recorded

**Only proceed to Phase 1 (or Phase 2 for Type F) when complete.**

---
*← Back to [SKILL.md](../SKILL.md) | Next: [Phase 1: STUDY →](01-study.md)*
