# Phase 1: STUDY — Read the Site's DNA

> This is the phase that was missing before. Before ANY design work happens, you must profile the existing site completely.

## The Rule

**Do NOT touch anything until this phase is complete.** No CSS changes. No image swaps. No "quick fixes." Study first.

## Actions

### 1. Screenshot Every Section
- Full page capture (desktop viewport: 1440px wide)
- Full page capture (mobile viewport: 375px wide)
- Individual section crops for detailed analysis
- Note any animations/transitions that fire on scroll

### 2. Extract CSS Custom Properties
```bash
# In browser console:
document.querySelectorAll('*').forEach(el => {
  const styles = getComputedStyle(el);
  // Look for custom properties, background colors, text colors
});
```
Or simply read the CSS files / Tailwind config. Get the ACTUAL hex codes, not what you think they are.

### 3. Identify Fonts
- Display font (hero titles, big statements)
- Heading font (section headers, card titles)
- Body font (paragraphs, descriptions)
- Accent font (if any — buttons, badges, special elements)
- Check Google Fonts imports, @font-face declarations, font-family stacks

### 4. Map Every Image
For each image on the site, document:
| Image | Location | Dimensions | Container CSS | Blend Mode | Purpose |
|-------|----------|-----------|--------------|------------|---------|
| hero-bg.jpg | Hero section | 1920×1080 | `background-size: cover; opacity: 0.3` | Normal + dark overlay | Atmosphere |
| logo.svg | Navbar | 180×60 | Inline | N/A | Brand mark |
| product-1.png | Products grid | 400×400 | `object-fit: cover` | N/A | Product display |

### 5. Count and Name Sections
List every section from top to bottom:
```
1. Navbar (fixed/sticky?)
2. Hero (full-screen? half?)
3. Stats/Numbers
4. Features/Benefits
5. Products/Services
6. Testimonials
7. About/Story
8. CTA
9. Footer
```

### 6. Document What's WORKING
Be specific:
- "The gold (#DA9100) on black creates strong luxury contrast"
- "Playfair Display at large sizes has excellent visual weight"
- "The scroll reveal on the products section feels premium"

### 7. Document What's WEAK
Be specific:
- "No hover states on product cards — feels static"
- "Body text line-height too tight at 1.3 — should be 1.6+"
- "Hero image is low-res, visible compression artifacts"
- "No scroll animations below the fold — site feels flat"

## Output: Site DNA Profile

Fill out the template at `templates/site-dna-profile.md` with all findings.

```
PALETTE: [list all hex codes with descriptive names]
FONTS: [display] / [headings] / [body] / [accent]
PERSONALITY: [3-5 adjectives from the content and design]
HERO: [layout description]
SECTIONS: [count] ([names])
IMAGES: [count] — [breakdown by type]
STRENGTHS: [specific things that work]
WEAKNESSES: [specific things that need enhancement]
```

## Phase 1 Completion Criteria

- [ ] Full page screenshots captured (desktop + mobile)
- [ ] All CSS custom properties / color values extracted
- [ ] All fonts identified with their roles
- [ ] Every image mapped with dimensions, context, and purpose
- [ ] All sections counted and named
- [ ] Strengths documented with specific examples
- [ ] Weaknesses documented with specific examples
- [ ] Site DNA Profile written

**Only proceed to Phase 2 when ALL checkboxes are complete.**

---

*← Back to [README](../README.md) | Next: [Phase 2: FEEL →](02-feel.md)*
