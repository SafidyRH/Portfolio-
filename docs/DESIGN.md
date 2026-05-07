# Portfolio Design

## Mission

Create implementation-ready, token-driven UI guidance for Stavros Symeonidis that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand

- Product/brand: Stavros Symeonidis
- URL: https://www.stavrossymeonidis.dev/
- Audience: developers and technical teams
- Product surface: dashboard web app

## Style Foundations

- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Inter`, `font.family.stack=Inter`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`, `font.size.md=18px`, `font.size.lg=20px`, `font.size.xl=24px`, `font.size.2xl=48px`, `font.size.3xl=60px`, `font.size.4xl=153.6px`
- Color palette: `color.text.primary=oklch(0.985 0 0)`, `color.text.secondary=#f2f2f2`, `color.text.tertiary=#b3b3b3`, `color.text.inverse=oklch(0.7668 0 0)`, `color.surface.base=#000000`, `color.surface.muted=#ffffff`, `color.surface.raised=oklch(0 0 0)`, `color.surface.strong=oklab(0.999994 0.0000455678 0.0000200868 / 0.3)`, `color.border.default=oklch(0.3356 0.0045 247.96)`, `color.border.strong=#353739`
- Spacing scale: `space.1=2px`, `space.2=4px`, `space.3=8px`, `space.4=12px`, `space.5=16px`, `space.6=24px`, `space.7=28px`, `space.8=32px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=10px`, `radius.md=14px`, `radius.lg=22369600px` | `motion.duration.instant=150ms`, `motion.duration.fast=300ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone

Concise, confident, implementation-focused.

## Rules: Do

- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure

- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: buttons (21), links (7), inputs (5), lists (4), navigation (1).

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
