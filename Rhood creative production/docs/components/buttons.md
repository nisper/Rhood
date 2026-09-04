# UI Buttons

```json
{
  "name": "button",
  "type": "component_set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10647-1326"
  },
  "figma": {
    "variant_properties": {
      "style": {
        "values": [
          "primary",
          "secondary",
          "ghost",
          "destructive",
          "inherit",
          "contrast"
        ],
        "default": "primary"
      },
      "size": { "values": ["md", "sm", "xsm"], "default": "md" },
      "state": { "values": ["default", "hover"], "default": "default" },
      "disabled": { "values": [false, true], "default": false }
    },
    "component_properties": {
      "label": { "type": "text", "default": "Label" },
      "startIcon": { "type": "boolean", "default": true },
      "endIcon": { "type": "boolean", "default": true },
      "counter": { "type": "boolean", "default": false }
    }
  },
  "usage_rules": {
    "surface_bg": {
      "when_to_use": {
        "parent_background_token": "surface/bg",
        "variants": ["secondary", "ghost", "destructive"],
        "rule": "secondary, ghost и destructive ориентированы на surface/bg. Используй их только на этой поверхности."
      }
    },
    "inherit": {
      "stability": "working_agreement",
      "when_to_use": {
        "parent_background_token_not": "surface/bg",
        "action_requires_contrast_emphasis": false,
        "rule": "Выбирай inherit для вторичного или контекстного действия на поверхности родителя. Цвет текста, иконок и hover определяй по классу поверхности ниже, а не по названию semantic token."
      },
      "surface_rules": {
        "semantic_muted": {
          "surface_tokens": [
            "fill/error-light",
            "fill/warning-light",
            "fill/brand-light"
          ],
          "text_icon": "surface_semantic_color",
          "hover_overlay": { "color": "same_as_text_icon", "opacity": 0.08 }
        },
        "neutral_muted": {
          "surface_tokens": ["fill/neutral"],
          "text_icon": "neutral_primary",
          "hover_overlay": { "token": "neutral_hover" }
        },
        "solid_contrast": {
          "surface_tokens": ["fill/brand", "fill/error", "fill/neutral-dark"],
          "text_icon": "contrast",
          "hover_overlay": { "color": "contrast", "opacity": 0.08 }
        },
        "solid_light": {
          "surface_tokens": ["fill/warning"],
          "text_icon": "neutral_primary",
          "hover_overlay": { "color": "neutral_primary", "opacity": 0.08 }
        }
      },
      "application": {
        "rule": "style=inherit не подбирает цвет автоматически. Для label и каждой видимой иконки задай variable из контекста родителя.",
        "overrides": {
          "label": { "color_variable": "contextual_text_color" },
          "visible_icons": {
            "color_variable": "contextual_icon_color",
            "rule": "Используй variable для иконок согласно контексту родителя."
          },
          "hover": {
            "fill_color_source": "resolved_hex_of_label_color_variable",
            "opacity": 0.08,
            "rule": "В Fill передай HEX из variable, назначенной label."
          }
        },
        "migration": "При замене legacy-кнопки проверь fills и variable aliases у label и видимых иконок. swapComponent может сохранить цветовые overrides старого инстанса; замени их на значения из surface_rules."
      }
    },
    "contrast": {
      "when_to_use": {
        "parent_background_token_not": "surface/bg",
        "parent_surface_is_white": false,
        "action_requires_contrast_emphasis": true,
        "rule": "Выбирай contrast для главного CTA внутри цветного или тёмного баннера, когда нужна заметная заполненная кнопка. Не используй contrast на белой поверхности."
      },
      "styles": {
        "default": {
          "fill": "fill/contrast",
          "text_icon": "text/neutral/primary-static"
        },
        "hover": { "fill": "fill/contrast-hover" },
        "disabled": {
          "fill": "fill/contrast-disabled",
          "text_icon": "text/neutral/contrast-disabled"
        }
      }
    },
    "ghost": {
      "when_to_use": {
        "parent_background_token": "surface/bg",
        "action_color_does_not_require_surface_override": true
      }
    },
    "secondary": { "when_to_use": { "parent_background_token": "surface/bg" } },
    "destructive": {
      "when_to_use": {
        "parent_background_token": "surface/bg",
        "action_is_destructive": true
      }
    },
    "primary": { "when_to_use": { "action_is_primary": true } }
  }
}
```

## Сводка компонента

| Параметр           | Значения                                                              | По умолчанию | Что задаёт                                            |
| ------------------ | --------------------------------------------------------------------- | ------------ | ----------------------------------------------------- |
| `name`             | `button`                                                              |              | Имя компонента в Figma.                               |
| `type`             | `component_set`                                                       |              | Тип Figma-сущности: набор variants одного компонента. |
| `source.figma_url` | URL                                                                   |              | Ссылка на component set в Figma.                      |
| `style`            | `primary`, `secondary`, `ghost`, `destructive`, `inherit`, `contrast` | `primary`    | Визуальный стиль кнопки.                              |
| `size`             | `md`, `sm`, `xsm`                                                     | `md`         | Размер кнопки.                                        |
| `state`            | `default`, `hover`                                                    | `default`    | Состояние кнопки.                                     |
| `disabled`         | `false`, `true`                                                       | `false`      | Доступность кнопки.                                   |
| `label`            | Текст                                                                 | `Label`      | Текст кнопки.                                         |
| `startIcon`        | `false`, `true`                                                       | `true`       | Видимость иконки слева.                               |
| `endIcon`          | `false`, `true`                                                       | `true`       | Видимость иконки справа.                              |
| `counter`          | `false`, `true`                                                       | `false`      | Видимость счётчика.                                   |

## Связь кноки с поверхностью

| Поверхность     | Кнопки                              |
| --------------- | ----------------------------------- |
| `surface/bg`    | `secondary`, `ghost`, `destructive` |
| Не `surface/bg` | `inherit`, `contrast`               |
| Любая           | `primary`                           |

- `inherit` — для вторичного или контекстного действия;
- `contrast` — для заметного главного CTA в цветном или тёмном баннере.

## `inherit`

Для кнопок на фоне, отличающемся от `surface/bg`.

Цвет текста и иконок, а также фон при hover задаются overrides из контекста родителя. `inherit` не подбирает их автоматически.

**State: hover**
В Fill мы передаем HEX из переменной которую вешаем на текст с opacity: 8%.

**Цвет иконок**
Используем переменную для иконок, согласно контексту.

## `contrast`

`contrast` — заполненный вариант для главного CTA внутри цветного или тёмного баннера.

- Default: `fill/contrast`, текст и иконки — `text/neutral/primary-static`.
- Hover: `fill/contrast-hover`.
- Disabled: `fill/contrast-disabled`, текст и иконки — `text/neutral/contrast-disabled`.

Не использовать на белой поверхности.
