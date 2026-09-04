# UI Icon Buttons

```json
{
  "name": "icon button",
  "type": "component_set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10742-281"
  },
  "figma": {
    "variant_properties": {
      "style": {
        "values": ["primary", "secondary", "ghost", "contrast", "inherit"],
        "default": "primary"
      },
      "size": { "values": ["md", "sm", "xsm"], "default": "md" },
      "state": { "values": ["default", "hovered"], "default": "default" }
    },
    "component_properties": {}
  },
  "usage_rules": {
    "surface_relation": {
      "surface_bg": ["secondary", "ghost"],
      "not_surface_bg": ["inherit", "contrast"],
      "any_surface": ["primary"]
    },
    "inherit": {
      "when_to_use": {
        "parent_background_token_not": "surface/bg",
        "action_requires_contrast_emphasis": false
      },
      "overrides": {
        "icon": {
          "color_variable": "contextual_icon_color",
          "rule": "Используй variable для иконки согласно контексту родителя."
        },
        "hover": {
          "fill_color_source": "resolved_hex_of_icon_color_variable",
          "opacity": 0.08,
          "rule": "В Fill передай HEX из variable, назначенной иконке."
        }
      }
    },
    "contrast": {
      "when_to_use": {
        "parent_background_token_not": "surface/bg",
        "parent_surface_is_white": false,
        "action_requires_contrast_emphasis": true,
        "rule": "Выбирай contrast для заметного действия внутри цветного или тёмного баннера. Не используй contrast на белой поверхности."
      },
      "styles": {
        "default": {
          "fill": "fill/contrast",
          "icon": "text/neutral/primary-static"
        },
        "hover": { "fill": "fill/contrast-hover" }
      }
    }
  }
}
```

## Сводка компонента

| Параметр           | Значения                                               | По умолчанию | Что задаёт                                            |
| ------------------ | ------------------------------------------------------ | ------------ | ----------------------------------------------------- |
| `name`             | `icon button`                                          |              | Имя компонента в Figma.                               |
| `type`             | `component_set`                                        |              | Тип Figma-сущности: набор variants одного компонента. |
| `source.figma_url` | URL                                                    |              | Ссылка на component set в Figma.                      |
| `style`            | `primary`, `secondary`, `ghost`, `contrast`, `inherit` | `primary`    | Визуальный стиль кнопки.                              |
| `size`             | `md`, `sm`, `xsm`                                      | `md`         | Размер кнопки.                                        |
| `state`            | `default`, `hovered`                                   | `default`    | Состояние кнопки.                                     |

Иконка задаётся override внутри инстанса.

## Связь кнопки с поверхностью

| Поверхность     | Кнопки                |
| --------------- | --------------------- |
| `surface/bg`    | `secondary`, `ghost`  |
| Не `surface/bg` | `inherit`, `contrast` |
| Любая           | `primary`             |

- `inherit` — для вторичного или контекстного действия;
- `contrast` — для заметного действия в цветном или тёмном баннере.

## `inherit`

Для кнопок на фоне, отличающемся от `surface/bg`.

Цвет иконки и фон при hover задаются overrides из контекста родителя. `inherit` не подбирает их автоматически.

**State: hovered**

В Fill передаём HEX из variable, назначенной иконке, с opacity `8%`.

## `contrast`

`contrast` — заполненный вариант для заметного действия внутри цветного или тёмного баннера.

- Default: `fill/contrast`, иконка — `text/neutral/primary-static`.
- Hover: `fill/contrast-hover`.

Не использовать на белой поверхности.
