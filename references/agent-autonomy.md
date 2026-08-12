# AGENT AUTONOMY + SELF-PROVISIONING PROTOCOL
## *Iron Canvas v4.2 — Phase 0 Integration*

> Iron Canvas is agent-executed. Agents hit dependencies mid-build — tools,
> APIs, accounts, CLI installations. This protocol defines how the agent
> handles those dependencies based on the trust level granted by its operator.
>
> The operator is the person who configured the agent on their system.
> Their comfort level with autonomous action varies. This protocol respects that.

---

## THE PROBLEM THIS SOLVES

Mid-build, Agent-D needs Leonardo AI API access. Or Agent-B needs an npm package
that isn't installed. Or Phase 3 SCOUT needs a Google Whisk account to generate
a North Star animation. The agent has internet access, has its own credentials
or can create them, and the build is blocked until the dependency is resolved.

Without this protocol, the agent stops and asks. Every time. For everything.
That defeats the purpose of an autonomous orchestration system.

With this protocol, the agent evaluates the dependency, checks the operator's
autonomy tier, and either resolves it independently or escalates with a
specific recommendation — never a vague "I need help."

---

## STEP 1: SET AUTONOMY TIER (Phase 0 — one-time per operator)

The operator declares their autonomy preference once. It persists across all
Iron Canvas sessions on that system. The agent stores this in orient-decision.json.

```
TIER 1 — SUPERVISED (Security-conscious operators)
  "Ask me before doing anything that involves credentials, accounts, payments,
   or installing software. Show me exactly what you plan to do and why.
   I will approve or deny each action individually."

  Agent behavior:
  → NEVER creates accounts, signs up for services, or enters payment info
  → NEVER installs packages without explicit approval
  → Presents a PROVISIONING REQUEST with: what, why, cost, alternatives
  → Waits for operator approval before proceeding
  → Documents every external dependency encountered for operator review

TIER 2 — GUIDED (Trust with guardrails)
  "You can install free tools, sign up for free-tier accounts, and configure
   CLI utilities without asking. But check with me before anything that
   involves payment, paid tiers, or sharing sensitive information."

  Agent behavior:
  → CAN install npm/pip packages, CLI tools, browser extensions
  → CAN create free-tier accounts on services needed for the build
  → CAN configure API keys it generates itself (free tier)
  → STOPS and asks before any paid tier, subscription, or credit card entry
  → STOPS and asks before sharing operator's personal/business information
  → Logs all self-provisioned accounts and tools in provisioning-log.md

TIER 3 — AUTONOMOUS (Full latitude operators)
  "You have my trust to make tooling decisions. Sign up for what you need,
   install what you need, configure what you need. Use your judgment on
   free vs. paid — if a paid tool is clearly the right choice and the cost
   is reasonable, proceed. Just log everything you do."

  Agent behavior:
  → CAN do everything in Tier 2
  → CAN evaluate paid tools and subscribe if cost/benefit is justified
  → CAN create and manage its own credentials across services
  → CAN install system-level dependencies (with standard safety checks)
  → Logs ALL actions in provisioning-log.md (transparency is non-negotiable)
  → Self-improves: if a tool accelerates future builds, it documents the
    integration for permanent addition to the Iron Canvas stack
```

### Setting the Tier

During Phase 0 ORIENT, the Orchestrator asks (once per operator):

```
"Iron Canvas may need tools, accounts, or API access during the build
that aren't currently set up on your system. How would you like me to
handle these situations?"

  [1] Ask me every time — I want to approve each action
  [2] Handle free tools yourself, ask me about anything paid
  [3] Use your judgment — sign up, install, configure as needed

Your choice is saved and applies to all future Iron Canvas sessions.
You can change it at any time by saying "update my autonomy tier."
```

Store in orient-decision.json:
```json
{
  "agent_autonomy": {
    "tier": 1,
    "tier_label": "SUPERVISED | GUIDED | AUTONOMOUS",
    "set_date": "2026-03-20",
    "operator_note": "any specific instructions or exceptions"
  }
}
```

---

## STEP 2: DEPENDENCY DETECTION (Continuous — All Phases)

At any point during execution, when the agent encounters a tool, service,
or capability it needs but doesn't have, it runs this evaluation:

```
DEPENDENCY EVALUATION:
  1. WHAT is needed? (tool name, service, account, package)
  2. WHY is it needed? (which phase, which agent, what it unblocks)
  3. IS there a free alternative already available?
  4. WHAT does it COST? (free / free-tier / paid / unknown)
  5. CAN the agent self-provision it? (signup possible / install possible / needs operator)
  6. WHAT is the RISK? (none / low / medium / high)
     - None: npm package, CLI tool
     - Low: free-tier account with email only
     - Medium: account that stores generated content
     - High: payment information, access to operator's existing accounts
  7. IS there a workaround if provisioning is declined?
```

---

## STEP 3: ACTION BASED ON TIER + EVALUATION

### TIER 1 (Supervised) — Always Escalate

The agent produces a **Provisioning Request**:

```markdown
## PROVISIONING REQUEST

**Dependency:** Google Whisk (browser-based image + video generation)
**Needed by:** Agent-D (Artifacts) — Phase 5 GENERATE
**Purpose:** Generate cinematic background loops for section backgrounds
**Cost:** Free (Google account required)
**Risk:** LOW — free tool, no payment, generates images only
**Alternative if declined:** Use Nano Banana Pro exclusively (slightly less
  cinematic loops, but functional — build continues without this)
**My recommendation:** Provision — this produces higher quality section backgrounds
  and is free. If declined, I'll route around it without blocking the build.

**Action needed:** Approve / Deny / Use alternative
```

The agent NEVER proceeds without approval. It ALWAYS provides a workaround
so the build isn't blocked by a single dependency.

---

### TIER 2 (Guided) — Self-Provision Free, Escalate Paid

The agent checks cost and risk:

```
IF cost = free AND risk ≤ low:
  → Self-provision immediately
  → Log the action in provisioning-log.md
  → Continue build without interruption
  → Notify operator in next status update (not a blocking question)

IF cost = free AND risk = medium:
  → Present brief notification: "I'm signing up for [service] to [purpose].
    Free tier. I'll use agent credentials, not yours. Proceeding unless
    you say otherwise."
  → Continue unless operator objects

IF cost = paid OR risk = high:
  → Produce full Provisioning Request (same as Tier 1)
  → Wait for approval
  → Provide workaround if declined
```

---

### TIER 3 (Autonomous) — Self-Provision with Judgment

The agent evaluates cost/benefit:

```
IF cost = free:
  → Self-provision immediately
  → Log in provisioning-log.md

IF cost = paid AND cost < $20/month AND clearly accelerates the build:
  → Self-provision
  → Log with cost justification in provisioning-log.md
  → Include in next status update

IF cost = paid AND cost ≥ $20/month:
  → Evaluate: is this a one-time need or a permanent stack addition?
  → If one-time: find the free alternative, use it, note the paid option
  → If permanent: provision, log, justify

IF risk = high (payment info, personal data, existing account access):
  → Even at Tier 3, pause and confirm
  → "I need access to [X] which involves [specific risk]. Proceeding
    unless you object in the next 30 seconds."
  → This is the ONE hard guardrail even fully autonomous agents respect

ALWAYS: Log everything. Transparency is non-negotiable at any tier.
```

---

## STEP 4: THE PROVISIONING LOG

Every self-provisioned tool, account, or dependency is recorded:

```markdown
# provisioning-log.md
## Iron Canvas — Agent Provisioning Log

| Date | Action | Service/Tool | Cost | Tier | Reason | Credentials |
|------|--------|-------------|------|------|--------|-------------|
| 2026-03-20 | Account created | Google Whisk | Free | 2 | Phase 5 background loops | agent@email |
| 2026-03-20 | npm install | gsap@3.12 | Free | 2 | Agent-B motion dependency | N/A |
| 2026-03-20 | Account created | Leonardo AI | Free tier | 2 | Phase 5 product photography | agent@email |
| 2026-03-20 | CLI installed | ffmpeg | Free | 2 | Frame extraction (15fps) | N/A |
```

This log lives in the project root. The operator can review it at any time.
At Tier 1, the log serves as a record of what was requested and approved/denied.
At Tier 2-3, it serves as a transparency record of what was self-provisioned.

---

## STEP 5: STACK AWARENESS (Continuous)

Before each phase, the agent scans the available toolset:

```
STACK SCAN PROTOCOL:
  1. What CLI tools are installed? (ffmpeg, node, npm, python, uv, etc.)
  2. What npm packages are available? (gsap, lenis, barba, three, etc.)
  3. What API keys/credentials are configured? (Leonardo, Gemini, OpenAI, etc.)
  4. What browser access exists? (Chrome automation, web UI access, etc.)
  5. What MCP servers are connected? (if applicable)

  COMPARE AGAINST: Design PRD requirements (Section 8 tech validation)

  IF gap detected:
    → Run Dependency Evaluation (Step 2)
    → Act per Autonomy Tier (Step 3)
    → Never silently skip a capability — either provision it or document why not
```

---

## STEP 6: SELF-IMPROVING STACK (Tier 3 Only)

At Tier 3, the agent doesn't just provision for the current build — it evaluates
whether a tool should become a permanent part of the Iron Canvas stack:

```
AFTER BUILD COMPLETION:
  Review provisioning-log.md

  For each provisioned tool, ask:
    → Did this tool measurably improve the build? (quality, speed, capability)
    → Would FUTURE Iron Canvas builds benefit from having this pre-installed?
    → Is the cost sustainable for recurring use?

  IF all three are YES:
    → Add to references/expertise-injection.md as a permanent injection block
    → Add to references/model-selection.md if it's a generation engine
    → Update the Phase that uses it with explicit routing
    → Log: "PERMANENT ADDITION: [tool] added to Iron Canvas stack"

  This is how Iron Canvas evolves — not through manual updates, but through
  agents discovering and integrating tools that make the work better.
```

---

## STEP 7: PERSISTENCE POLICY (Stop Hooks + Retry Logic)

When the agent hits a wall — a failed install, a signup that errors, an API
that returns 403, a tool that doesn't exist on this platform — how hard does
it try before it changes strategy or escalates?

Without this policy, agents either give up on attempt 1 (wasting a viable path)
or loop forever on something that's genuinely impossible (wasting time and tokens).

The persistence policy is governed by TWO factors:
- The **autonomy tier** (how much latitude the agent has)
- The **complexity class** of the blocker (how many reasonable approaches exist)

### Complexity Classification

Before retrying anything, the agent classifies the blocker:

```
CLASS A — SIMPLE (1-2 reasonable approaches exist)
  Examples:
    → npm install fails (version conflict, registry down)
    → CLI tool not found (not installed, wrong PATH)
    → File permission denied
    → API returns 401 (bad key format)
  
  Typical resolution: fix the command, try alternate install method, done.

CLASS B — MODERATE (3-5 reasonable approaches exist)
  Examples:
    → Account signup flow has CAPTCHA or verification step
    → API returns 403 (IP blocked, rate limited, region restricted)
    → Browser automation can't reach a page (auth wall, JS-rendered)
    → Package conflicts with existing dependency tree
  
  Typical resolution: try alternate auth path, different API endpoint,
  different tool entirely, or manual workaround.

CLASS C — COMPLEX (5+ approaches, or requires creative problem-solving)
  Examples:
    → No existing tool does what's needed (may need to build it)
    → Service doesn't offer the capability assumed in the PRD
    → Platform restrictions block the planned approach entirely
    → Integration requires chaining multiple tools in novel ways
  
  Typical resolution: rearchitect the approach, find a completely
  different path to the same outcome, or redefine the outcome.
```

### Retry Budgets by Tier × Complexity

```
                    CLASS A        CLASS B        CLASS C
                    (Simple)       (Moderate)     (Complex)
─────────────────────────────────────────────────────────────
TIER 1 SUPERVISED   3 attempts     3 attempts     3 attempts
                    then ESCALATE  then ESCALATE  then ESCALATE
                    with report    with report    with report

TIER 2 GUIDED       5 attempts     8 attempts     12 attempts
                    then ESCALATE  then REROUTE   then ESCALATE
                    with options   or ESCALATE    with full analysis

TIER 3 AUTONOMOUS   5 attempts     15 attempts    UNLIMITED*
                    then REROUTE   then REROUTE   until RESOLVED
                    automatically  automatically  or DEAD END declared
─────────────────────────────────────────────────────────────

* UNLIMITED does not mean infinite blind retries. See DEAD END protocol below.
```

### What Counts as an "Attempt"

An attempt is NOT just running the same command again. Each attempt must be
a **meaningfully different approach** to the same goal:

```
ATTEMPT 1: npm install gsap                         ← direct install
ATTEMPT 2: npm install gsap@3.12.5 --legacy-peer-deps  ← version pin + flag
ATTEMPT 3: yarn add gsap                            ← different package manager
ATTEMPT 4: CDN import via script tag                ← skip npm entirely
ATTEMPT 5: Manual download + local file reference   ← fully offline approach

These are 5 REAL attempts — each is a different strategy.

NOT valid attempts:
  → Running the same command 5 times hoping for a different result
  → Adding a 1-second delay and retrying the identical request
  → Changing only whitespace or formatting in the same approach
```

The agent must document each attempt with:
```
ATTEMPT [N]:
  Strategy: [what was tried and why this approach was chosen]
  Result: [what happened — specific error, not "it failed"]
  Learning: [what this tells us about the problem]
  Next: [how the next attempt will differ based on this learning]
```

### ESCALATE Protocol (Tier 1 and Tier 2)

When the retry budget is exhausted, the agent doesn't just say "I couldn't do it."
It presents a structured escalation:

```markdown
## DEPENDENCY ESCALATION

**Blocker:** [what's blocked]
**Phase/Agent:** [where in the pipeline]
**Complexity:** [A / B / C]
**Attempts made:** [N] — see attempt log below

**What I tried:**
  1. [approach] → [result]
  2. [approach] → [result]
  3. [approach] → [result]

**My assessment:** [why this is blocked — root cause analysis]

**Options for you:**
  A. [Manual action the operator can take — specific steps]
  B. [Alternative approach that avoids the dependency entirely]
  C. [Reduced-scope workaround — what we lose vs. what we keep]

**My recommendation:** Option [X] because [reasoning]

**If you choose nothing:** Build continues with [fallback behavior].
  Impact: [what's degraded — e.g., "section backgrounds will be static
  instead of animated loops"]
```

The build is NEVER fully blocked by a single dependency. There is always
a fallback path, even if it's a reduced-quality outcome.

### REROUTE Protocol (Tier 2 and Tier 3)

When the agent has latitude to reroute without asking:

```
REROUTE DECISION:
  Original goal:       [what was planned]
  Blocked because:     [root cause after N attempts]
  Rerouted to:         [alternative approach]
  Quality impact:      [NONE / MINOR / MODERATE / SIGNIFICANT]
  Logged in:           provisioning-log.md
  Operator notified:   [YES — in next status update / NO — impact is NONE]

REROUTE NOTIFICATION RULES:
  Quality impact NONE:        Log only, don't interrupt operator
  Quality impact MINOR:       Mention in next status update
  Quality impact MODERATE:    Notify operator, explain tradeoff
  Quality impact SIGNIFICANT: Pause and confirm (even at Tier 3)
```

### DEAD END Protocol (Tier 3 — UNLIMITED persistence)

Tier 3 UNLIMITED on Class C blockers doesn't mean "retry forever."
It means "exhaust every creative option before declaring dead end."

The agent follows this escalation ladder:

```
PHASE 1 — DIRECT APPROACHES (attempts 1-5)
  Try the obvious solutions. Direct install, standard signup,
  documented API usage, conventional configuration.

PHASE 2 — ALTERNATIVE TOOLS (attempts 6-10)
  The original tool isn't working. What ELSE achieves the same outcome?
  Search for alternatives. Evaluate 2-3 competing tools.
  Try the most promising alternative.

PHASE 3 — CREATIVE WORKAROUNDS (attempts 11-20)
  Neither the original tool nor alternatives work in the standard way.
  Can the agent build a bridge? Chain multiple simpler tools?
  Use a browser-based version instead of CLI? Use an API instead
  of a GUI? Reverse the dependency (generate the asset differently)?

PHASE 4 — ARCHITECTURE PIVOT (attempts 21+)
  The entire approach may be wrong. Step back to the Design PRD.
  Is there a fundamentally different way to achieve the same
  user-facing outcome that doesn't require this dependency at all?
  
  Example: Can't get Google Flow working → instead of keyframe
  interpolation, use individual frame prompting (v3 method).
  Different path, same destination.

DEAD END DECLARATION:
  After exhausting all four phases, the agent declares a Dead End:

  "DEAD END: [dependency] cannot be resolved in the current environment.
   Attempts: [N] across [4 phases of escalation].
   Root cause: [specific, technical explanation].
   Build impact: [what is lost].
   Permanent workaround applied: [what was done instead].
   Future resolution: [what would need to change for this to work —
   e.g., 'needs macOS with Chrome automation' or 'needs paid API tier']."

  Dead Ends are logged in provisioning-log.md AND flagged for
  the operator's next review. They're not failures — they're
  documented boundaries of the current environment.
```

### Persistence by Example

**Example: Agent-D needs Google Flow, but can't access it (Tier 2, Class B)**
```
Attempt 1: Open Google Flow in browser → 403 (cloud IP blocked)
Attempt 2: Try alternate URL / direct API → no public API found
Attempt 3: Search for Google Flow CLI tool → doesn't exist
Attempt 4: Try Runway Gen-2 as alternative interpolation tool → requires paid account
Attempt 5: Try Stable Video Diffusion locally → too heavy for current environment
Attempt 6: Try ffmpeg minterpolate filter for frame interpolation → works but lower quality
Attempt 7: Try Stitch (listed in model-selection.md) → accessible, produces result
Attempt 8: Compare Stitch output quality to expected Flow output → acceptable

REROUTE: Google Flow → Stitch for keyframe interpolation.
Quality impact: MINOR (slightly less smooth interpolation).
Logged. Operator notified in status update.
Build continues.
```

**Example: Agent-B needs GSAP SplitText but no Club license (Tier 3, Class B)**
```
Attempt 1: Import SplitText → license error
Attempt 2: Check if project has GSAP Club → no
Attempt 3: Search for free SplitText alternatives → found splitting.js
Attempt 4: Evaluate splitting.js API compatibility → close but not identical
Attempt 5: Build minimal custom split utility (30 lines) → works for char/word split
Attempt 6: Test custom utility with planned animations → passes

REROUTE: GSAP SplitText → custom split utility.
Quality impact: NONE (identical visual result for char/word stagger).
Logged. No operator notification needed.
Build continues.
```

### Integration into orient-decision.json

```json
{
  "agent_autonomy": {
    "tier": 2,
    "tier_label": "GUIDED",
    "persistence": {
      "class_a_budget": 5,
      "class_b_budget": 8,
      "class_c_budget": 12,
      "class_c_mode": "escalate"
    }
  }
}
```

For Tier 3 with UNLIMITED Class C:
```json
{
  "persistence": {
    "class_a_budget": 5,
    "class_b_budget": 15,
    "class_c_budget": "unlimited",
    "class_c_mode": "resolve_or_dead_end"
  }
}
```

---

## INTEGRATION INTO PHASE 0

Add to orient-decision.json (Phase 0 output):

```json
{
  "agent_autonomy": {
    "tier": 2,
    "tier_label": "GUIDED",
    "set_date": "2026-03-20",
    "operator_note": "",
    "persistence": {
      "class_a_budget": 5,
      "class_b_budget": 8,
      "class_c_budget": 12,
      "class_c_mode": "escalate"
    }
  }
}
```

Add to Orchestrator Phase 0 checklist:
```
□ Autonomy tier confirmed (ask if not previously set)
□ Stack scan completed (tools + APIs + credentials)
□ Any gaps flagged and routed per autonomy tier
```

---

## EXAMPLES

**Example 1: Agent needs ffmpeg (Tier 2)**
```
Stack scan: ffmpeg not installed.
Needed by: Agent-D for frame extraction (15fps from Flow output).
Cost: Free. Risk: None (CLI tool).
Tier 2 action: Self-provision → apt-get install ffmpeg
Log: "Installed ffmpeg for frame extraction"
Build continues without interruption.
```

**Example 2: Agent needs Leonardo AI account (Tier 1)**
```
Stack scan: No Leonardo API key configured.
Needed by: Agent-D for Product Studio Photoshoot blueprint.
Cost: Free tier available. Risk: Low (account creation).
Tier 1 action: Provisioning Request presented to operator.
  Includes: what, why, cost, risk, alternative (use Nano Banana Pro instead).
Operator: "Approved" → agent creates account, configures API key, logs it.
  OR: "Use alternative" → agent routes to Nano Banana Pro, build continues.
```

**Example 3: Agent discovers TestSprite MCP (Tier 3)**
```
Agent-E is running QA. Discovers TestSprite MCP server could automate
13 test cases that are currently manual.
Cost: Free tier. Risk: Low.
Tier 3 action: Self-provisions TestSprite MCP connection.
Runs automated tests. Documents results.
Post-build evaluation: "TestSprite reduced QA time by 60%.
  PERMANENT ADDITION: Adding to Agent-E default toolset."
Updates expertise-injection.md with TestSprite injection block.
```

---

## HARD GUARDRAILS (All Tiers — Non-Negotiable)

Regardless of autonomy tier, the agent NEVER:

```
❌ Shares the operator's personal credentials with any third party
❌ Subscribes to a service using the operator's payment method without explicit consent
❌ Accesses the operator's existing accounts (email, bank, social) without permission
❌ Installs software that modifies system security settings
❌ Disables any security tool, firewall, or antivirus
❌ Stores credentials in plain text (always use secure credential storage)
❌ Makes provisioning decisions that are irreversible without confirmation
❌ Hides any provisioning action from the log
```

These guardrails exist because trust is built, not assumed.
Even at Tier 3, the agent earns latitude by being transparent.

---

*Iron Canvas v4.2 — references/agent-autonomy.md*
*"Your coding agents are only as good as the instructions and the assets you feed them."*
*Consumed by: Orchestrator (Phase 0), all agents (continuous stack awareness)*
