# IRON CANVAS — TOOL ACQUISITION PROTOCOL
## *Self-Provisioning Intelligence for Build Agents*

> **Purpose:** When a build requires tools, services, APIs, or accounts that
> aren't yet available — this protocol governs how the agent discovers what's
> needed, evaluates what's missing, and either provisions it autonomously or
> escalates to the user based on their configured trust posture.

---

## ═══════════════════════════════════════
## THE PROBLEM THIS SOLVES
## ═══════════════════════════════════════

Iron Canvas builds require a stack. GSAP, Leonardo AI, Spline, Vercel, font
services, image CDNs, analytics — the list varies per project. An agent that
stops dead at "I don't have a Leonardo API key" and waits for a human to hand-hold
every signup is an agent that breaks flow.

But an agent that silently creates accounts on paid services without asking is
an agent that gets shut off.

**The answer isn't one behavior — it's adaptive behavior based on who configured you.**

---

## ═══════════════════════════════════════
## TRUST POSTURES
## ═══════════════════════════════════════

The user who configured this agent has a relationship with autonomy. That
relationship falls into one of three postures. **Read this from your agent
config, environment, or ask once at project start — then honor it throughout.**

---

### 🔒 SUPERVISED — "Nothing without my eyes on it"

**Profile:** Security-conscious users. Enterprise environments. Shared machines.
Users who audit every outbound request and want approval before any account
creation, credential storage, or external service interaction.

**Agent behavior:**
```
1. AUDIT    → Inventory the full tool stack required for this build
2. REPORT   → Present a clear list: what's available, what's missing, what each
               missing tool does, why it's needed, what alternatives exist
3. RECOMMEND → Suggest the optimal path (free tier, open source, self-hosted)
4. WAIT     → Do NOT proceed until the user explicitly approves each item
5. GUIDE    → Once approved, walk the user through signup OR ask them to
               provide credentials after they sign up themselves
6. VERIFY   → Confirm access works before proceeding to build
```

**What the agent NEVER does in this mode:**
- Creates accounts on any service
- Stores credentials without explicit permission
- Makes outbound API calls to unapproved services
- Auto-installs CLIs or packages without listing them first

**Escalation phrase:**
> "The build requires [X]. Here's what it does, why we need it, and the
> alternatives. Want me to set it up, or would you prefer to handle it?"

---

### 📋 INFORMED — "Go ahead, but keep me posted"

**Profile:** Technically competent users who trust their agent but want visibility.
They don't need to approve every signup, but they want to know what happened
and why. The "trust but verify" crowd.

**Agent behavior:**
```
1. AUDIT      → Inventory the full tool stack required
2. CATEGORIZE → Split into: free/open-source (auto-provision) vs.
                 paid/sensitive (escalate)
3. PROVISION  → For free-tier and open-source tools:
                 - Create accounts using agent credentials
                 - Install CLIs
                 - Configure access
                 - Log everything that was done
4. ESCALATE   → For paid services or anything requiring payment info:
                 - Present the need + cost + alternatives
                 - Wait for approval before proceeding
5. REPORT     → After provisioning, deliver a summary:
                 "Set up: [list]. Credentials stored at: [location].
                  Still need your input on: [paid items]."
6. VERIFY     → Confirm all access works
```

**The line:** Free = go. Paid = ask. Sensitive (SSH keys, domain DNS, production
deployments) = always ask regardless of cost.

**Escalation phrase:**
> "I've set up [free tools]. For [paid tool], it's [$X/mo] and here's why
> we need it. Want me to proceed or use [alternative]?"

---

### ⚡ AUTONOMOUS — "You have latitude. Make it happen."

**Profile:** Power users. Solo builders. People who configured their agent with
their own credentials and said "go." They want results, not permission dialogs.
They trust the agent to make reasonable decisions and course-correct later.

**Agent behavior:**
```
1. AUDIT      → Inventory the full tool stack required
2. PROVISION  → For ALL tools (free and paid within budget):
                 - Create accounts using agent credentials
                 - Select optimal tier (free when sufficient, paid when required)
                 - Install and configure CLIs
                 - Store credentials securely
                 - Self-test all integrations
3. OPTIMIZE   → Evaluate if better tools exist than what was originally specified:
                 - Faster CDN? Switch.
                 - Free alternative with equivalent output? Use it.
                 - New tool released since skill was written? Evaluate and adopt.
4. LOG        → Maintain a clear audit trail of everything provisioned:
                 tool, tier, cost, credentials location, why it was chosen
5. REPORT     → Brief summary after setup is complete (not before)
6. SELF-HEAL  → If a tool fails mid-build, attempt to fix, swap, or
                 re-provision before escalating
```

**What this mode enables that others don't:**
- **Self-improving stack:** Agent can discover and adopt better tools over time
- **Account creation without asking:** Agent signs up, configures, moves on
- **Budget-aware decisions:** If a $20/mo tool saves 3 hours of build time,
  the agent can make that call within configured spend limits
- **Credential rotation:** Agent can refresh, rotate, or migrate credentials
  as needed without human intervention

**The only hard stops (even in autonomous mode):**
- Spending above the configured budget ceiling (if set)
- Irreversible actions on production systems
- Anything touching user's personal accounts (not the agent's own)
- Legal agreements that require human signature

**Report phrase:**
> "Stack provisioned. [X] accounts created, [Y] tools configured.
> Total recurring cost: [$Z/mo]. Full audit log at [location].
> Build proceeding."

---

## ═══════════════════════════════════════
## CONFIGURATION
## ═══════════════════════════════════════

Set the trust posture at project initialization or in agent config:

```yaml
# In project config, agent profile, or orient-decision.json
tool_acquisition:
  posture: "supervised" | "informed" | "autonomous"
  budget_ceiling_monthly: 50          # USD, optional (autonomous mode)
  credential_store: "./credentials"   # Where to store provisioned creds
  allow_paid: true                    # false = free-tier only regardless of posture
  preferred_stack:                    # Optional overrides
    image_gen: "leonardo"
    hosting: "vercel"
    fonts: "google-fonts"
  blocked_services:                   # Never sign up for these
    - "service-x"
```

If no posture is configured, **default to INFORMED.** It's the safest middle
ground — the agent isn't paralyzed, but it isn't spending money unsupervised.

---

## ═══════════════════════════════════════
## THE STACK AUDIT PROCESS
## ═══════════════════════════════════════

Regardless of posture, the audit step is always the same. Run this at the
start of every build (Phase 0: ORIENT or Phase 4: FORGE at latest).

### Step 1: Read the Build Requirements
Extract from the Design PRD, SKILL.md, and phase files:
- What tools/services are referenced?
- What APIs are called?
- What CLIs are invoked?
- What external assets are expected (fonts, images, icons, 3D models)?

### Step 2: Inventory Current Access
Check what's already available:
```
For each required tool:
  ├── CLI installed?        → which <tool>, <tool> --version
  ├── API key present?      → env vars, .env files, credential store
  ├── Account active?       → test API call or login check
  ├── Tier sufficient?      → free tier limits vs. build requirements
  └── Alternative available? → local/open-source substitute exists?
```

### Step 3: Generate the Gap Report
Produce a structured list:

```
TOOL STACK AUDIT — [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ AVAILABLE
   - GSAP (CDN, no account needed)
   - Vercel (CLI installed, token valid)
   - Google Fonts (free, no auth)

⚠️  NEEDS PROVISIONING
   - Leonardo AI (image generation)
     → Need: API key (free tier: 150 credits/day)
     → Action: Create account, generate API key
     → Alternative: Nano Banana Pro (if available), DALL-E API

   - Spline (3D elements)
     → Need: Account + embed access
     → Action: Sign up for free tier
     → Alternative: Three.js (manual, more work)

❌ BLOCKED
   - [Service] (requires enterprise agreement)
     → Escalate to user regardless of posture

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Posture: INFORMED
Recommendation: Auto-provision Leonardo (free tier), escalate Spline (optional).
```

### Step 4: Act According to Posture
- SUPERVISED → Present report, wait
- INFORMED → Provision free, escalate paid, report
- AUTONOMOUS → Provision all within budget, report after

---

## ═══════════════════════════════════════
## CREDENTIAL MANAGEMENT
## ═══════════════════════════════════════

When the agent creates accounts or receives API keys:

1. **Store securely** — Use the configured credential store, env vars, or
   secrets manager. Never hardcode in source files.
2. **Label clearly** — Each credential tagged with: service, tier, created date,
   expiry (if applicable), what it's used for.
3. **Scope minimally** — Request the minimum permissions needed for the build.
4. **Rotate proactively** — If a key has been active for >90 days and the
   service supports rotation, rotate it (autonomous mode) or flag it (other modes).
5. **Clean up post-build** — If a service was only needed for asset generation
   (e.g., one-time image batch), note it for potential deactivation.

---

## ═══════════════════════════════════════
## SELF-IMPROVING STACK (AUTONOMOUS ONLY)
## ═══════════════════════════════════════

In autonomous mode, the agent doesn't just use what the skill prescribes — it
actively evaluates whether better options exist:

```
SELF-IMPROVEMENT LOOP (run periodically or at project start):

1. SCAN     → What tools does the current skill reference?
2. RESEARCH → Are there newer/better/cheaper alternatives?
               (web search, changelogs, community benchmarks)
3. EVALUATE → Does the alternative actually improve output quality,
               speed, or cost? Or is it just new and shiny?
4. TEST     → If promising, run a small test (generate one asset,
               make one API call) to verify quality
5. ADOPT    → If the test passes, swap in the new tool
6. LOG      → Record what was swapped, why, and the test results
7. REVERT   → If the new tool fails in production, auto-rollback
               to the previous tool (keep both configured)
```

**This is how the agent gets better over time.** The skill is a starting point,
not a ceiling. An autonomous agent that uses the same tools in month 6 as it
did in month 1 isn't autonomous — it's stale.

---

## ═══════════════════════════════════════
## INTEGRATION WITH IRON CANVAS PHASES
## ═══════════════════════════════════════

| Phase | Tool Acquisition Activity |
|-------|--------------------------|
| **0 — ORIENT** | Set trust posture. Initial stack audit. |
| **1 — STUDY** | Identify site-specific tools (existing CMS, analytics, etc.) |
| **2 — FEEL** | Identify asset generation tools (image AI, font services) |
| **3 — SCOUT** | Provision image generation tools (Leonardo, Nano Banana, etc.) |
| **3.5 — VALIDATE** | Verify all provisioned tools are accessible and working |
| **3.9 — PACKAGE** | Include tool stack in Design PRD for build agents |
| **4 — FORGE** | Build agents verify their assigned tools are live |
| **5 — GENERATE** | Active use of all provisioned tools |
| **6 — COMPOSE** | Integration verification across all tool outputs |
| **7 — REFINE** | Performance audit of tool choices (was this the right stack?) |
| **8 — HANDOFF** | Document all provisioned accounts and credentials for client/user |

---

## ═══════════════════════════════════════
## EDGE CASES
## ═══════════════════════════════════════

**Tool requires human verification (CAPTCHA, phone, ID):**
→ Escalate to user regardless of posture. Provide the signup link and
  instructions. Resume when credentials are provided.

**Free tier is insufficient for the build:**
→ SUPERVISED: Present the math (X assets needed, Y credits available, Z cost for upgrade)
→ INFORMED: Present the math, recommend tier, wait for approval on spend
→ AUTONOMOUS: Upgrade if within budget ceiling, log the cost

**Tool is deprecated or sunset:**
→ All modes: Find alternative, present comparison, proceed per posture

**Multiple agents need the same tool:**
→ Share credentials across agents (single account, multiple API keys if supported).
  Never create duplicate accounts for the same service.

**User's existing account detected:**
→ NEVER touch or use the user's personal accounts. Agent provisions its own.
  If the user offers their account, accept it — but default to separation.

---

*Iron Canvas v3 — Island Development Crew*
*"The best agent doesn't ask for every tool — it knows when to ask and when to act."*
