# Updating a component from Figma

## Goal

Update an existing component based on changes in Figma without breaking the current codebase.

## Steps

1. Analyze the updated Figma component via MCP:
   - identify what changed (layout, spacing, states, tokens, variants)

2. Compare with existing implementation:
   - locate the component in src/components/ui
   - understand current structure and API (props)

3. Apply updates:
   - update only what changed
   - keep existing API (props, naming, usage)
   - use Tailwind and tokens from docs/tokens.md
   - follow token mapping from docs/token-mapping.md

4. Rules:
   - Do NOT recreate the component from scratch
   - Do NOT break existing usage
   - Do NOT rename props without explicit confirmation
   - Do NOT introduce raw values if token exists

5. Variants:
   - update or extend variants if needed
   - keep them consistent with existing API

6. Mapping:
   - update docs/component-map.md only if structure or usage changed
   - do NOT duplicate mappings

7. If changes affect API:
   - STOP
   - propose changes first
   - wait for confirmation before implementing
