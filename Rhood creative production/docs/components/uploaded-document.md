# uploaded document

```json
{
  "name": "uploaded document",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-15628&t=4o9n7IZTZdcMV6po-11"
  },
  "figma": {
    "variant_properties": {
      "fontWeight": { "values": ["medium", "regular"], "default": "regular" },
      "dense": { "values": ["false", "true"], "default": "false" },
      "paddingX": { "values": ["false", "true"], "default": "true" },
      "state": {
        "values": ["default", "hovered", "focused"],
        "default": "default"
      },
      "selected": { "values": ["false", "true"], "default": "false" }
    },
    "component_properties": {
      "secondaryText": {
        "type": "boolean",
        "default": false,
        "figma_key": "secondaryText#654:51"
      },
      "icon": {
        "type": "boolean",
        "default": true,
        "figma_key": "icon#654:57"
      },
      "iconButton": {
        "type": "boolean",
        "default": true,
        "figma_key": "iconButton#654:69"
      }
    }
  },
  "dependencies": [
    {
      "component": "File type icon",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка типа файла в начале строки."
    },
    {
      "component": "button-neutral",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Действие удаления документа при iconButton=true."
    },
    {
      "component": "ic trash-2",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка удаления документа.",
      "note": "Instance имеет префикс ic , но его main component называется trash-2."
    }
  ],
  "usage_rules": {
    "selected": "selected=true показывает выбранный документ.",
    "state": "state=default, hovered или focused задаёт состояние строки.",
    "dense": "dense=true используй для компактной строки документа.",
    "content": "secondaryText, icon и iconButton управляют составом строки.",
    "paddingX": "paddingX=true добавляет горизонтальные внутренние отступы; paddingX=false используем, когда их задаёт родительский контейнер."
  },
  "open_questions": [
    "Nested instance File type icon не использует маркер ic . Нужно подтвердить, что это отдельный компонент типа файла, а не иконка из Parser – Lucide icons.",
    "Nested instance ic trash-2 имеет main component trash-2. Нужно проверить источник иконки."
  ]
}
```

`uploaded document` — строка загруженного документа с выбором и действием удаления.

## Сводка компонента

| Параметр        | Значения                        | По умолчанию | Что задаёт                         |
| --------------- | ------------------------------- | ------------ | ---------------------------------- |
| `fontWeight`    | `medium`, `regular`             | `regular`    | Начертание текста строки.          |
| `dense`         | `false`, `true`                 | `false`      | Плотность строки.                  |
| `paddingX`      | `false`, `true`                 | `true`       | Горизонтальные внутренние отступы. |
| `state`         | `default`, `hovered`, `focused` | `default`    | Состояние взаимодействия.          |
| `selected`      | `false`, `true`                 | `false`      | Выбранное состояние документа.     |
| `secondaryText` | `true`, `false`                 | `false`      | Наличие вторичного текста.         |
| `icon`     | `true`, `false`                 | `true`       | Наличие иконки типа файла.         |
| `iconButton`    | `true`, `false`                 | `true`       | Наличие действия удаления.         |

## Использует компоненты

| Компонент                    | Связь           | Роль                                                  |
| ---------------------------- | --------------- | ----------------------------------------------------- |
| `File type icon`             | Nested instance | Иконка типа файла.                                    |
| [button-neutral](buttons.md) | Nested instance | Действие удаления документа.                          |
| `ic trash-2`                 | Nested instance | Иконка удаления; main component называется `trash-2`. |

## Открытые вопросы

- Nested instance `File type icon` не использует маркер `ic `. Нужно подтвердить, что это отдельный компонент типа файла, а не иконка из `Parser – Lucide icons`.
- Nested instance `ic trash-2` имеет main component `trash-2`. Нужно проверить источник иконки.
