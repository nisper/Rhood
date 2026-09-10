# Parser Token Mapping

Figma-to-code token mapping for Figma file `Parser - Components` (`MbjYVdGZqH95blipWMHXtp`).

No product screens or layouts were generated. This document keeps the Figma source names and their normalized code token names.

## Token Naming Mapping

| Figma token                               | Code token                                       |
| ----------------------------------------- | ------------------------------------------------ |
| `palette/neutral/900`                     | `colors.neutral.900`                             |
| `palette/blue/500`                        | `colors.blue.500`                                |
| `palette/brand/500`                       | `colors.brand.500`                               |
| `palette/blue grey/500`                   | `colors.blueGrey.500`                            |
| `palette/light blue/500`                  | `colors.lightBlue.500`                           |
| `palette/cian/500`                        | `colors.cyan.500`                                |
| `theme/text/neutral/primary`              | `semantic.{mode}.text.primary`                   |
| `theme/text/neutral/secondary`            | `semantic.{mode}.text.secondary`                 |
| `theme/text/brand`                        | `semantic.{mode}.text.brand`                     |
| `theme/text/link-hovered`                 | `semantic.{mode}.text.linkHovered`               |
| `theme/surface/bg`                        | `semantic.{mode}.surface.bg`                     |
| `theme/surface/under-islands`             | `semantic.{mode}.surface.underIslands`           |
| `theme/fill/brand-hover`                  | `semantic.{mode}.fill.brandHover`                |
| `theme/fill/input-neutral`                | `semantic.{mode}.fill.inputNeutral`              |
| `theme/border/focus`                      | `semantic.{mode}.border.focus`                   |
| `theme/component/charts/color-1`          | `colors.charts.1`                                |
| `theme/component/checkbox/fill/brand`     | `component.checkbox.fill.brand`                  |
| `opacity-disabled`                        | `opacity.disabled` / Tailwind `opacity-disabled` |
| `sizing/base module/2`                    | `spacing.module.2` / Tailwind `spacing.2`        |
| `sizing/border-radius/border-radius-md`   | `radius.md`                                      |
| `sizing/common-input/padding/px-md`       | `input.sizes.md.px`                              |
| `sizing/common-input/shape/border_radius` | `input.radius`                                   |
| `sizing/button counter/min-width/md`      | `button.counter.md.minWidth`                     |
| `sizing/chips/padding/py-sm`              | `chip.sizes.sm.py`                               |
| `sizing/badge/min-width`                  | `badge.minWidth`                                 |
| `sizing/layout/root`                      | `spacing.layout.root`                            |
| `sizing/island/gap`                       | `spacing.layout.islandGap`                       |
| `Typography/body/body1`                   | `typography.body1`                               |
| `Typography/headline/headline5`           | `typography.headline5`                           |
| `Typography/button/md`                    | `typography.buttonMd`                            |
| `Typography/input/sm`                     | `typography.inputSm`                             |
| `Effects/shadow/lg`                       | `shadow.lg`                                      |

## Notes

- Raw token values are kept in `docs/tokens.md`.
- `brand` is an alias of the Figma `blue` ramp.
- Figma uses `Roboto`, `Roboto Mono`, and `Merriweather`.
- The core spacing scale is an 8px module with half and quarter steps. These map to Tailwind spacing in `docs/tokens.md`.
- Figma component sets mapped into component token groups:
  - Buttons: `button-brand`, `button-error`, `button-info`, `button-neutral`, `button-contrast`, `button-dark`.
  - Inputs: `textfield`, `textfield multiline`, `select`, `searchInput`, `dateInput`, `password`, `RangeInput`, `autoComlete`.
  - Tags, chips, and badges: `tag`, `chip`, `toggleChip`, `badge`.
- No dedicated `card` token collection was present. Figma uses island/layout tokens for framed surfaces and result cards.
- Figma has no local paint styles; colors are stored as variables.
- Figma has no explicit z-index variables. The z-index scale above is a recommended normalized application scale.
- Figma includes typoed legacy names: `cian`, `fill/contast-disabled`, `border/succees-light`, and deprecated `fill/input (deprecated)`. Code should normalize these to `cyan`, `contrastDisabled`, `successLight`, and avoid deprecated tokens.
- The responsive sizing collection has four modes: `1920-1366`, `1365-1280`, `1279-1024`, and `1023-375 (tab-mob)`.
