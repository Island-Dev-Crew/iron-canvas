# Phase 0: ORIENT — Project Classification & Mode Selection

> First action on every Iron Canvas engagement.
> Takes 5 minutes. Saves hours of misdirected effort.

## The Rule

Before any research, before any screenshots, before anything — classify the project and select the execution mode. Every downstream decision depends on getting these two right.

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

**Decision guide:**
- Type A (animated site): SWARM recommended, MISSION for flagship
- Type B (marketing): SWARM or SOLO
- Type C (dashboard): MISSION recommended (data + glass + animation all specialized)
- Type D (e-commerce): SWARM (Agent-D is critical for scroll sequence frames)
- Type E (enhancement): SOLO (Phase 1 requires careful sequential study)
- Type F (new scratch): MISSION for best results

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

## Step 5: Record the ORIENT Decision

Output this before proceeding:

```json
{
  "project_name": "",
  "project_type": "A/B/C/D/E/F",
  "type_description": "1-sentence rationale for the type assignment",
  "execution_mode": "SOLO / SWARM / MISSION",
  "mode_rationale": "1-sentence rationale",
  "phase_emphasis": [],
  "agents_to_spawn": [],
  "tech_stack_default": "MINIMAL / STANDARD / ELEVATED / IMMERSIVE",
  "surface_pack": "web / app-dashboard / immersive-3d / game-realtime",
  "treatment_register": "R0 / R1 / R2 / R3 / R4 — from the task's AMBITION, not the brand's loudness (CD3 Law 1); caps the DIS ceiling. See references/claude-design-3.md",
  "depth_intensity_hint": 0.0,
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

- [ ] Project type assigned with rationale
- [ ] Surface pack dispatched (`web` or `app-dashboard`) ★v5.0
- [ ] **Treatment Register (R0–R4) chosen from the TASK's ambition + recorded ★v5.1** (CD3 — caps the whole DIS; see references/claude-design-3.md). Not the brand's loudness; when unsure, drop a register.
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
