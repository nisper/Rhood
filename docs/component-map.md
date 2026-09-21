# Component Map

| Figma node | Figma component | Code component |
| --- | --- | --- |
| `10647:1326` | `Button` | `src/components/ui/button.tsx` / `Button` |
| `10103:2350` | `buttonFavorite` | `src/components/ui/button-favorite.tsx` / `ButtonFavorite` |
| `8701:15073` | `Indicator` | `src/components/ui/indicator.tsx` / `Indicator` |
| `1171:18402` | `List` | `src/components/ui/list.tsx` / `List` |
| `9929:5668` | `ListSmall` | `src/components/ui/list-small.tsx` / `ListSmall` |
| `654:8330` | `ListItem` | `src/components/ui/list-item.tsx` / `ListItem` |
| `9929:4765` | `ListItemSmall` | `src/components/ui/list-item-small.tsx` / `ListItemSmall` |
| `435:1112` | `MenuDivider` | `src/components/ui/menu-divider.tsx` / `MenuDivider` |
| `433:4194` | `MenuItemSingleSelect` | `src/components/ui/menu-item-single-select.tsx` / `MenuItemSingleSelect` |
| `436:1556` | `Menu` | `src/components/ui/menu.tsx` / `Menu` |
| `10471:2487` | `MenuItemMultiselect` | `src/components/ui/menu-item-multiselect.tsx` / `MenuItemMultiselect` |
| `1088:155` | `MenuMultiselect` | `src/components/ui/menu-multiselect.tsx` / `MenuMultiselect` |
| `746:1851` | `Tooltip` | `src/components/ui/tooltip.tsx` / `Tooltip` |
| `913:6350` | `OnboardingTooltip` | `src/components/ui/onboarding-tooltip.tsx` / `OnboardingTooltip` |
| `10389:13275` | `helpCenter` | `src/components/ui/help-center.tsx` / `HelpCenter` |
| `10389:13285` | `MainHeader` | `src/components/ui/main-header.tsx` / `MainHeader` |
| `4163:45161` | `toolbar filter` | `src/components/ui/toolbar-filter.tsx` / `ToolbarFilter` |
| `464:3585` | `Tab` | `src/components/ui/tab.tsx` / `Tab` |
| `8931:1882` | `TabBar` | `src/components/ui/tab-bar.tsx` / `TabBar` |
| `348:8648` | `Select` | `src/components/ui/select.tsx` / `Select` |
| `11269:12350` | `search` | `src/components/ui/search.tsx` / `Search` |
| `930:25605` | `Snackbar` | `src/components/ui/snackbar.tsx` / `Snackbar` |
| `414:3051` | `TableCell` | `src/components/ui/table-cell.tsx` / `TableCell` |
| `416:3328` | `Table` | `src/components/ui/table.tsx` / `Table` |

| `8555:1158` | `LikeButton` | `src/components/ui/like-button.tsx` / `LikeButton` |
| `10252:5944` | `Tag` | `src/components/ui/tag.tsx` / `Tag` |
| `8827:1349` | `ToggleButtonGroup` | `src/components/ui/toggle-button-group.tsx` / `ToggleButtonGroup` |
| `10742:281` | `IconButton` | `src/components/ui/icon-button.tsx` / `IconButton` |
| `712:480` | `HelpIcon` | `src/components/ui/help-icon.tsx` / `HelpIcon` |
| `968:779` | `InfoIcon` | `src/components/ui/info-icon.tsx` / `InfoIcon` |
| `787:12583` | `AlertDefault` | `src/components/ui/alert-default.tsx` / `AlertDefault` |
| `1653:28207` | `Chip` | `src/components/ui/chip.tsx` / `Chip` |
| `1336:8438` | `toggleChip` | `src/components/ui/toggle-chip.tsx` / `ToggleChip` |
| `351:8845` | `avatar` | `src/components/ui/avatar.tsx` / `Avatar` |
| `505:4164` | `textfield` | `src/components/ui/text-field.tsx` / `Textfield` |
| `11269:12380` | `InputNumber` | `src/components/ui/input-number.tsx` / `InputNumber` |
| `11270:13059` | `InputNumberRange` | `src/components/ui/input-number-range.tsx` / `InputNumberRange` |
| `734:6530` | `Textarea` | `src/components/ui/textarea.tsx` / `Textarea` |
| `399:2325` | `formControlLabel` | `src/components/ui/form-control-label.tsx` / `FormControlLabel` |
| `351:2706` | `formHelperText` | `src/components/ui/form-helper-text.tsx` / `FormHelperText` |

MenuSingleSelect и MenuMultiselect сохранены как совместимые обёртки над Menu. На витрине контейнер, оба типа пунктов и разделитель представлены на общей странице Menu.

List и ListItem представлены на общей странице List. Актуальный источник: `Rhood creative production/docs/components/list-item.md` (Figma `654:8330`). ListItemSmall сохранён как обёртка над ListItem с `dense=true`; ListSmall — совместимая сборка компактных строк, без отдельной страницы витрины. `paddingX` заменяет обратный по смыслу `disGutters`, старое свойство поддерживается.

TableCellHead сохранён как совместимая обёртка над TableCell с `role="head"`. Для новых таблиц используй Table и TableCell с `role="head"` или `role="body"`; на витрине это одна страница Table.

Правила выбора строк, сортировки и размеров колонок описаны в [Table](table.md).
