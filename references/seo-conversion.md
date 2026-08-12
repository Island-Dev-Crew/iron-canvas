# SEO + CONVERSION ARCHITECTURE
## *Iron Canvas — Phase 1 + Phase 7 Integration*

> Beautiful sites that nobody finds, or that confuse visitors into leaving,
> are not successful sites. Iron Canvas now bakes SEO awareness and conversion
> architecture into the pipeline as first-class concerns.

---

## PART A: SEO ARCHITECTURE

### Semantic HTML Hierarchy (Phase 1 → Agent-A enforcement)

```
RULE: One h1 per page. Always.
  → The h1 is the page's primary topic declaration.
  → It should contain the primary keyword for the page.
  → It is NOT the logo or brand name (that belongs in the <header> or aria-label).

H1 → H2 → H3 hierarchy must be logical (no skipping levels):
  → H2 = major sections
  → H3 = subsections within H2 sections
  → Never use headings for visual styling — use CSS classes for size

Agent-A checklist:
  □ Exactly one h1 per page
  □ All h2/h3 headings are descriptive, not decorative
  □ Section landmarks used: <header>, <nav>, <main>, <section>, <aside>, <footer>
  □ aria-label on icon-only buttons
  □ alt text on all <img> elements (descriptive, not filename)
```

### Meta Tags (Phase 7 → Agent-E checklist)

```html
<!-- Required for every page -->
<title>[Primary Keyword] | [Brand Name]</title>
<meta name="description" content="[150-160 char description with primary keyword]">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="[full URL of this page]">

<!-- Open Graph (social sharing) -->
<meta property="og:title" content="[Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[OG Image URL — see below]">
<meta property="og:url" content="[Page URL]">
<meta property="og:type" content="website">

<!-- Twitter/X Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="[OG Image URL]">
```

### Open Graph Image — IRON CANVAS DELIVERABLE

**The OG image is an artifact that Iron Canvas must produce in Phase 5.**

```
OG Image spec:
  → Size: 1200 × 630px (required)
  → Content: Brand mark + primary visual + tagline
  → Style: Matches site design language (color, typography, feel)
  → Generation: Nano Banana Pro or GPT Image 1.5 with branded spec
  → Prompt structure:
    "Professional open graph social media image, 1200x630px,
     [brand name] logo on [background color], [primary visual],
     [tagline text], style: [brand personality], clean, no noise,
     fits Twitter card large format"
  → Save as: /assets/og-image.jpg (optimize to <200KB)

Add to Phase 5 Artifact Assessment Gate:
  OG Image is ALWAYS generated (no score threshold — every site gets one).
  It is the minimum artifact requirement regardless of Assessment Gate score.
```

### Schema.org Structured Data

```javascript
/* Add to <head> for relevant project types */

/* Project Type B (Marketing/SaaS) → Organization schema */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Brand Name]",
  "url": "[Site URL]",
  "logo": "[Logo URL]",
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer service" }
};

/* Project Type D (E-Commerce/Product) → Product schema */
/* Project Type E (Local Business) → LocalBusiness schema */
/* Always include: WebSite schema with sitelinks searchbox */

/* Inject as JSON-LD in <head>: */
<script type="application/ld+json">
  {JSON.stringify(orgSchema, null, 2)}
</script>
```

---

## PART B: CONVERSION ARCHITECTURE

### Phase 1 STUDY Addendum: 5 Conversion Questions

After Phase 1 site extraction, answer these 5 questions.
They shape every design decision downstream.

```
Q1: WHAT IS THE PRIMARY CONVERSION?
  → One answer only. "Buy now" / "Book a call" / "Download" / "Sign up"
  → All design energy flows toward this one action.
  → If unclear: ask the client/user before proceeding.

Q2: WHAT IS THE SECONDARY CONVERSION?
  → The fallback for visitors not ready for the primary.
  → "Subscribe to email list" / "Follow on social" / "Read more"
  → Secondary CTA is present but visually subordinate.

Q3: WHAT IS THE VALUE PROPOSITION? (above fold, in 6 words or less)
  → Can a first-time visitor understand what this is in 3 seconds?
  → Test: Cover the logo. Does the hero still explain the product?
  → If no → flag for hero copy revision in Phase 4.

Q4: WHAT ARE THE 3 TRUST SIGNALS?
  → Social proof: testimonials, case studies, client logos
  → Authority: press mentions, awards, credentials
  → Risk reduction: money-back guarantee, free trial, no credit card
  → Iron Canvas places at least 2 of these ABOVE the first CTA.

Q5: WHAT IS THE FRICTION?
  → Count clicks to primary conversion.
  → More than 3 clicks → suggest simplification in design-prd.md
  → Any form fields that aren't essential → recommend removing
```

### CTA Hierarchy Protocol

```
LEVEL 1 — PRIMARY (one per page, maximum two)
  → Full filled button, brand accent color
  → Largest, most prominent interactive element
  → Positioned: above fold + repeated after key value prop section

LEVEL 2 — SECONDARY (supporting action)
  → Ghost button (outline only) or text link with icon
  → Positioned near primary, visually lighter
  → Never compete with primary for attention

LEVEL 3 — TERTIARY (explore more)
  → Text link only, with directional arrow
  → Used for "learn more", "see all", "read more"
  → Lowest visual weight

ANTI-PATTERNS:
  ❌ Two primary CTAs competing (both filled, same visual weight)
  ❌ CTA below all the value prop content (user leaves before scrolling)
  ❌ CTA that doesn't describe the action ("Click here" vs "Start free trial")
  ❌ Form with more than 4 fields for a first-time ask
```

### Above-Fold Conversion Checklist

```
Agent-E runs this at Phase 7 VERIFY:

□ Value proposition is visible without scrolling (desktop AND mobile)
□ Primary CTA is visible without scrolling (desktop AND mobile)
□ At least one trust signal is visible above fold
□ Brand identity is clear (logo/wordmark visible)
□ Page load is under 3 seconds (performance budget met)
□ No autoplay video or audio (unless user-initiated)
□ Hero headline is ≤ 10 words and describes the primary value
□ Mobile hero is not just a collapsed version — it's redesigned for portrait
```

---

## INTEGRATION POINTS

**Phase 1 (STUDY):** Add conversion questions to site-dna-profile.json
**Phase 5 (GENERATE):** OG image is always generated — add to default artifact list
**Phase 7 (VERIFY):** Agent-E runs above-fold conversion checklist
**Phase 8 (HANDOFF):** SEO meta tags documented in HANDOFF.md

---

*Iron Canvas v4.2 — references/seo-conversion.md*
