# control label

```json
{
  "name": "control label",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=399-2325&t=dXdC4YFLBloB6Ztr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "weight": { "values": ["regular", "medium"], "default": "medium" },
      "state": {
        "values": ["default", "error", "disabled"],
        "default": "default"
      },
      "inputDirection": {
        "values": ["column", "row"],
        "default": "column"
      }
    },
    "component_properties": {
      "label": {
        "type": "text",
        "default": "Label",
        "figma_key": "label#11302:0"
      },
      "required": {
        "type": "boolean",
        "default": false,
        "figma_key": "required#2727:5"
      }
    }
  },
  "dependencies": [],
  "usage_rules": {
    "label": "Текст подписи задают через component property label.",
    "required": "required=true показывает обязательность поля через звёздочку.",
    "inputDirection": "inputDirection=column используют, когда label расположен над control; inputDirection=row — когда label расположен слева от control.",
    "weight": "weight=medium использует визуально более плотное начертание label.",
    "labelTextWidth": "Если ширина control label — Fill container или Fixed, вложенный текст Label имеет ширину Fill container. При ширине Hug contents текст Label сохраняет Hug contents."
  }
}
```

`control label` — подпись для [[docs/patterns/input-component|input-component]]

## Сводка компонента

| Параметр         | Значения                       | По умолчанию | Что задаёт                               |
| ---------------- | ------------------------------ | ------------ | ---------------------------------------- |
| `size`           | `md`, `sm`                     | `md`         | Размер текста и высоту label.            |
| `weight`         | `regular`, `medium`            | `medium`     | Насыщенность текста label.               |
| `state`          | `default`, `error`, `disabled` | `default`    | Цвет и состояние label.                  |
| `inputDirection` | `column`, `row`                | `column`     | Расположение label относительно control. |
| `label`          | Текст                          | `Label`      | Текст подписи.                           |
| `required`       | `true`, `false`                | `false`      | Наличие `*` обязательного поля.          |

## Направление control

- `inputDirection=column` используй, когда label расположен над control;
- `inputDirection=row` используй, когда label расположен слева от control.
