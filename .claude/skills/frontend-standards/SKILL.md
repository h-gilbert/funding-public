---
name: frontend-standards
description: Frontend design standards and prohibited patterns for the Funding Showcase project. Use when creating, modifying, or reviewing any frontend components, CSS styles, or UI elements. Automatically applies to all Vue components, CSS/SCSS files, and Tailwind configurations.
---

# Frontend Design Standards

This skill defines mandatory design standards and explicitly prohibited styling patterns for the Funding Showcase frontend.

## PROHIBITED PATTERNS

### Bracket Borders / Parenthesis Borders (STRICTLY FORBIDDEN)

**This styling pattern is explicitly banned from this entire project.**

Do NOT use decorative borders that appear only on the left side (or any single side) of a card/container with curved corners creating a bracket or parenthesis visual effect.

#### What This Looks Like (DO NOT USE):
- Cards with a curved line on the left side only
- Border styling that resembles `(` or `)` parentheses
- "L-shaped" accent borders on corners
- Single-side decorative borders with `border-radius` on corners
- Gradient or solid color accents only on card edges

#### Prohibited CSS Patterns:

```css
/* BANNED - Left bracket border with pseudo-elements */
.card::before {
  content: '';
  position: absolute;
  left: 0;
  border-left: 2px solid;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

/* BANNED - Single-side accent borders */
.card {
  border-left: 3px solid var(--accent);
  border-radius: 8px;
}

/* BANNED - Asymmetric border styling */
.card {
  border: none;
  border-left: 2px solid gradient(...);
}

/* BANNED - Corner-only decorative elements */
.card::before,
.card::after {
  /* Top-left and bottom-left corner accents */
}
```

#### Prohibited Tailwind Patterns:

```html
<!-- BANNED -->
<div class="border-l-2 border-l-red-500 rounded-lg">
<div class="border-l-4 border-gradient rounded-xl">
```

### Why This Is Banned

1. **Visual inconsistency** - Creates asymmetric, unbalanced designs
2. **Overused pattern** - Common in generic templates, lacks originality
3. **Accessibility concerns** - Decorative-only borders can confuse screen readers
4. **Maintenance burden** - Complex pseudo-element implementations are fragile

## APPROVED ALTERNATIVES

When you need to highlight or distinguish cards/containers, use these approved patterns instead:

### 1. Full Border Cards
```css
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
}
```

### 2. Subtle Shadow Elevation
```css
.card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
```

### 3. Background Color Differentiation
```css
.card {
  background: var(--card-bg);
  border-radius: 8px;
}
```

### 4. Top Accent Bar (Full Width)
```css
.card {
  border-top: 3px solid var(--accent);
  border-radius: 8px;
}
```

### 5. Icon or Badge Indicators
Use icons, badges, or labels inside the card rather than decorative borders.

## Enforcement

When working on any frontend code in this project:

1. **Never create** bracket/parenthesis border styles
2. **Refactor existing code** if you encounter this pattern
3. **Reject designs** that include this pattern and suggest alternatives
4. **Review pull requests** for violations of this standard

## Scope

This prohibition applies to:
- All Vue components in `/src/`
- All CSS/SCSS files in `/src/assets/styles/`
- All Tailwind configurations
- Any new UI components or design system elements
