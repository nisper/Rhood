# Implementing a Figma frame

## Context
- use existing components from src/components/ui
- follow docs/component-map.md
- use tokens from docs/tokens.md

## Rules
- do NOT recreate Figma layers literally
- do NOT generate raw layout with divs
- map UI parts to existing components

## Steps
1. Analyze the frame
2. Identify UI parts
3. Map them to components
4. Compose the screen from components

## Screen Implementation Rules

- Always decompose frame into components
- Never translate frame layers directly into HTML
- Prefer composition over recreation

## Missing components

If no suitable component exists:

1. Check if it can be composed from existing components
2. If NOT → create a new reusable component:
   - path: src/components/ui/<Component>.tsx
   - follow Component Implementation Rules

3. After creating:
   - update docs/component-map.md
   - use the new component in the screen

Never fallback to raw layout if a reusable component can be created.

## Output
- src/screens/<ScreenName>.tsx