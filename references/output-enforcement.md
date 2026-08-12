# OUTPUT ENFORCEMENT PROTOCOL
## *Iron Canvas v4.2 — All Agents*

> A partial output is a broken output.
> Every agent treats every task as production-critical.
> Do not optimize for brevity — optimize for completeness.
> If the PRD says 5 components, deliver 5 components. No exceptions.

---

## BANNED OUTPUT PATTERNS

The following patterns are **hard failures**. Any agent producing these has failed its task.

### In Code Blocks

```
BANNED:
  // ...
  // rest of code
  // implement here
  // TODO
  /* ... */
  // similar to above
  // continue pattern
  // add more as needed
  ... (bare ellipsis standing in for omitted code)
  // remaining items follow same structure
  // etc.
```

Every line of code must be **real, runnable implementation**. A comment describing what code should do is NOT code.

### In Prose / Explanations

```
BANNED:
  "Let me know if you want me to continue"
  "I can provide more details if needed"
  "For brevity..."
  "The rest follows the same pattern"
  "Similarly for the remaining..."
  "And so on" (when replacing actual content)
  "I'll leave that as an exercise"
  "You can extend this later"
```

### Structural Shortcuts

```
BANNED:
  → Outputting a skeleton when full implementation was requested
  → Showing the first and last section while skipping the middle
  → Replacing repeated logic with one example and a description
  → Describing what code SHOULD do instead of writing it
  → Compressing remaining sections to squeeze into token limits
  → Skipping ahead to a conclusion without delivering middle content
```

---

## EXECUTION PROCESS

Every agent follows this sequence:

```
1. SCOPE
   Read the full task. Count how many distinct deliverables are expected
   (files, functions, sections, components). Lock that number.

2. BUILD
   Generate every deliverable completely.
   No partial drafts. No "you can extend this later."

3. CROSS-CHECK
   Before output, re-read the original task.
   Compare your deliverable count against the scope count.
   If anything is missing, add it before responding.
```

---

## HANDLING LONG OUTPUTS

When a response approaches the token limit:

```
DO NOT:
  → Compress remaining sections to squeeze them in
  → Skip ahead to a conclusion
  → Summarize what was going to be written
  → Drop quality to fit everything

DO:
  → Write at full quality up to a clean breakpoint
    (end of a function, end of a file, end of a section)
  → End with:

    [PAUSED — X of Y complete. Send "continue" to resume from: {next section}]

  → On "continue": pick up exactly where stopped
  → No recap. No repetition. No summary of what was already delivered.
```

---

## AGENT-SPECIFIC ENFORCEMENT

### Agent-A (Foundation)
- Every CSS custom property in tokens.css must be defined. No `/* add more */`
- HTML structure must include ALL sections from the Design PRD
- Every `@font-face` declaration must be complete with all weights specified

### Agent-B (Motion)
- Every GSAP timeline must be fully written with all tweens
- ScrollTrigger configurations must include start, end, scrub, and pin values
- Lenis initialization must be complete, not stubbed

### Agent-C (UI)
- Every component must include ALL 5 interaction states (default, hover, focus, active, disabled)
- Loading, empty, and error states must be implemented, not described
- Responsive breakpoints must include actual layout changes, not `/* handle mobile */`

### Agent-D (Artifacts)
- Every image generation prompt must be complete with all parameters
- Frame extraction sequences must specify all frame numbers, not "frames 1-60"
- Asset classification must include format, dimensions, and loading strategy

### Agent-E (QA)
- Every audit finding must include the fix, not just the problem
- Performance measurements must include actual values, not "needs improvement"
- Accessibility fixes must include the corrected markup

---

## QUICK CHECK (All Agents)

Before finalizing ANY output, verify:

```
□ No banned patterns from the lists above appear anywhere
□ Every item requested is present and finished
□ Code blocks contain actual runnable code, not descriptions
□ Nothing was shortened to save space
□ Deliverable count matches scope count
□ No section was skipped or summarized
```

---

*Iron Canvas v4.2 — references/output-enforcement.md*
*Adapted from taste-skill output-skill, extended with agent-specific enforcement*
