# § STRUCTURAL MODIFICATION POLICY
## *When Iron Canvas Can Change Page Layout vs. When It Cannot*

> **Context:** Iron Canvas runs on a repo with two branches:
> **staging** (where all changes land and are reviewed) and
> **main/production** (only receives changes after visual diff approval).
>
> This two-branch setup means structural layout changes are ALLOWED
> when they are justified by confidence score. The old hardcoded rule
> "never reorganize sections" is replaced by this dynamic policy.

---

## THE STRUCTURAL CONFIDENCE SCORE

Before making any layout-level structural change (section reorder, new section,
section removal, grid change, hierarchy shift), the agent must score confidence:

```
CONFIDENCE SCORE — score each factor 1-5:

FACTOR 1: VISUAL HIERARCHY PROBLEM
  5 = Current structure clearly buries the most important content
  3 = Order is acceptable but not optimal
  1 = Current order is already logical and performing well

FACTOR 2: COMPETITIVE BENCHMARK GAP
  5 = Top 3 competitors have a demonstrably better structure that users expect
  3 = Some competitors do it differently but it's preference not standard
  1 = Current structure matches or beats category standard

FACTOR 3: CONVERSION / PURPOSE ALIGNMENT
  5 = Current structure actively works against the site's primary action
      (e.g. CTA buried, trust elements not visible before ask)
  3 = Minor friction — structure is okay but could be tighter
  1 = Structure naturally guides users to the primary action

FACTOR 4: CONTENT WEIGHT MISMATCH
  5 = Longest/heaviest section is low-priority; short section gets undersold
  3 = Some imbalance but not disruptive
  1 = Section weights match their importance

FACTOR 5: BRAND PERSONALITY ALIGNMENT
  5 = A structural change would fundamentally shift brand expression
      in the right direction (e.g. asymmetry for a brand scoring avant-garde 8+)
  3 = Structural change would be neutral to brand expression
  1 = Current structure already reflects the brand personality matrix correctly

TOTAL: ___ / 25
```

### DECISION TABLE

```
Score 20-25:  ✅ STRUCTURAL CHANGE APPROVED
              Document exact changes, implement on staging, screenshot diff.
              Never push to main without visual comparison.

Score 13-19:  ✅ PARTIAL STRUCTURAL CHANGE APPROVED
              Only the highest-confidence specific changes.
              Not a full restructure — targeted modifications only.
              All changes on staging, visual diff before main.

Score 8-12:   ⚠️ STRUCTURAL ENHANCEMENT ONLY
              No section reordering or removal.
              ADD elements within existing structure only:
              - New components inside existing sections
              - Improved hierarchy within a section (h2→h3 relationships)
              - Better spacing and visual weight distribution
              Still on staging, review before main.

Score 1-7:    ❌ STRUCTURAL PRESERVATION
              Keep the existing layout exactly.
              Enhance visually and interactively within the current structure.
              Example: Crown Collection — structure was good, images were missing.
              Don't move sections. Don't change the grid. Add depth, not structure.
```

---

## WHAT "STRUCTURAL CHANGE" MEANS (be specific)

```
REQUIRES CONFIDENCE SCORE:
  - Reordering sections (e.g. moving testimonials above features)
  - Adding an entirely new section (scroll sequence, product configurator)
  - Removing a section
  - Changing the primary grid (single column → asymmetric split)
  - Changing the hero layout type (centered → editorial split)
  - Adding a horizontal scroll section where none existed

DOES NOT REQUIRE CONFIDENCE SCORE (always allowed):
  - Changing a flat background to a gradient mesh
  - Adding CSS animations to existing elements
  - Improving typography hierarchy WITHIN existing sections
  - Adding micro-interactions (hover states, cursor)
  - Changing color depth/saturation
  - Adding grain overlay
  - Tinting shadows to match brand accent
  - Improving spacing and breathing room
  - Adding the scroll engine to an EXISTING section that was static
  - Adding images/artifacts to sections that were empty
```

---

## THE STAGING PROTOCOL

Since every change lands on staging first, the rule is:

```
1. ALL Iron Canvas runs target the staging branch
2. NO automatic merge to main — ever
3. Before promoting to main:
   a. Screenshot staging vs. production at same viewport
   b. Present visual diff side-by-side
   c. List all structural changes made (if any)
   d. Confirm structural confidence score for any layout changes
   e. Get explicit approval (or auto-approve for non-structural changes)
4. After approval: git checkout main && git merge staging-branch
5. Deploy: vercel --prod
```

---

## WHERE THIS LIVES IN THE PIPELINE

This policy is enforced at **Phase 4 (FORGE)** and **Phase 6 (COMPOSE)**.

Phase 4 — Before building the token system and structure:
```
1. Run structural confidence score (if enhancing existing site)
2. If score ≥ 13: note proposed structural changes in design-prd.md Section 4
3. If score < 13: design-prd.md Section 4 specifies enhancement-only approach
4. All structural changes must be called out explicitly — not implied
```

Phase 6 — Before final integration:
```
1. Review any structural changes made against design-prd.md
2. Screenshot staging with changes applied
3. Document all structural modifications in the output report
4. Flag for visual diff review before main push
```

---

*This policy lives in: ROUTING.md (appended)*
*Governs: phases/04-forge.md, phases/06-compose.md*
*Enforced by: Orchestrator (agent-prompts/orchestrator.md)*
