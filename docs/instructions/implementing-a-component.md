# Component Implementation Rules

## Context

- Design tokens are defined in docs/tokens.md
- Token mapping is defined in docs/token-mapping.md

## Steps

1. Analyze Figma component via MCP:
   - structure
   - variants (size, state, type)
   - token usage

2. Create component:
   - path: src/components/ui/<Component>.tsx
   - use React + TypeScript
   - use Tailwind CSS
   - follow shadcn/ui patterns

3. Implementation rules:
   - Do NOT recreate Figma layers literally
   - Do NOT generate deeply nested divs
   - Prefer semantic HTML
   - Use tokens from docs/tokens.md
   - Do NOT use raw px values if token exists
   - Do NOT inline SVG paths
   - Never use images for icons from Figma
   - Always replace icons with lucide-react icons
   - If icon is unknown:
     - use a close match from lucide-react
     - explicitly mention the substitution in the response

4. Variants:
   - extract all variants from Figma
   - implement via props (variant, size, state)
   - keep API simple and reusable

5. Code quality:
   - keep code readable
   - avoid unnecessary wrappers
   - split subcomponents if needed (Icon, Label, etc.)

6. Component mapping:
   - mapping file location: docs/component-map.md
   - if docs/component-map.md does NOT exist → create it
   - append mapping for this component in format:

     Figma: <component name / variant path>
     Code: <usage example>

   - ensure naming consistency across all mappings
   - do NOT duplicate existing mappings

7. If unclear:
   - ask for clarification
   - OR propose best structure
