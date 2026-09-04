# tab

```json
{
  "name": "tab",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=464-3585&t=4o9n7IZTZdcMV6po-11"
  },
  "figma": {
    "variant_properties": {
      "paddingX": { "values": ["false", "true"], "default": "true" },
      "selected": { "values": ["false", "true"], "default": "false" },
      "state": { "values": ["default", "hovered"], "default": "default" },
      "direction": {
        "values": ["horizontal", "vertical"],
        "default": "horizontal"
      }
    },
    "component_properties": {
      "icon": {
        "type": "boolean",
        "default": false,
        "figma_key": "icon#483:4"
      },
      "secondaryText": {
        "type": "boolean",
        "default": false,
        "figma_key": "secondaryText#3252:0"
      }
    }
  },
  "dependencies": [
    {
      "component": "star",
      "documentation": "",
      "relation": "nested instance",
      "role": "icon при icon=true.",
      "note": "Nested instance иконки не имеет префикса ic ."
    }
  ],
  "usage_rules": {
    "direction": "direction=horizontal — tab для горизонтального списка; direction=vertical — tab для вертикального списка.",
    "selected": "selected=true показывает активный tab с индикатором снизу или слева в зависимости от direction.",
    "state": "state=hovered представлен только для selected=false; variants selected=true + state=hovered в component set отсутствуют.",
    "icon": "icon=true показывает иконку перед текстом.",
    "paddingX": "paddingX=true добавляет горизонтальные внутренние отступы tab; paddingX=false используем, когда их задаёт родительский контейнер.",
    "secondaryText": "secondaryText=true показывает вторую строку текста."
  },
  "open_questions": [
    "Nested instance иконки называется star, без обязательного префикса ic . Нужно привести имя к формату ic star или заменить на актуальный компонент из Parser – Lucide icons."
  ]
}
```

`tab` — элемент навигации внутри tabs.

## Сводка компонента

| Параметр        | Значения                 | По умолчанию | Что задаёт                             |
| --------------- | ------------------------ | ------------ | -------------------------------------- |
| `paddingX`      | `false`, `true`          | `true`       | Горизонтальные внутренние отступы tab. |
| `selected`      | `false`, `true`          | `false`      | Активное состояние tab.                |
| `state`         | `default`, `hovered`     | `default`    | Визуальное состояние невыбранного tab. |
| `direction`     | `horizontal`, `vertical` | `horizontal` | Ориентация tab в группе.               |
| `icon`     | `true`, `false`          | `false`      | Наличие иконки перед текстом.          |
| `secondaryText` | `true`, `false`          | `false`      | Наличие второй строки текста.          |

## Использует компоненты

| Компонент | Связь           | Роль                                                               |
| --------- | --------------- | ------------------------------------------------------------------ |
| `star`    | Nested instance | icon при `icon=true`. Instance не имеет префикса `ic `. |

## Открытые вопросы

- Nested instance иконки называется `star`, без обязательного префикса `ic `. Нужно привести имя к формату `ic star` или заменить на актуальный компонент из `Parser – Lucide icons`.
- В component set отсутствуют variants `selected=true` + `state=hovered`; сейчас `hovered` есть только для `selected=false`.
