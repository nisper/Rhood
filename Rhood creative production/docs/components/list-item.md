# List item

```json
{
  "name": "list-item",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=654-8330&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "paddingX": { "values": ["false", "true"], "default": "true" },
      "dense": { "values": ["false", "true"], "default": "false" },
      "fontWeight": { "values": ["medium", "regular"], "default": "medium" },
      "selected": { "values": ["false", "true"], "default": "false" },
      "state": { "values": ["default", "hovered"], "default": "default" },
      "disabled": { "values": ["false", "true"], "default": "false" }
    },
    "component_properties": {
      "startIcon": { "type": "boolean", "default": true },
      "secondaryText": { "type": "boolean", "default": true },
      "iconButton": { "type": "boolean", "default": true },
      "endIcon": { "type": "boolean", "default": true },
      "button": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "Button",
      "documentation": "docs/components/buttons.md",
      "relation": "nested instance",
      "role": "Необязательное завершающее действие в строке."
    }
  ],
  "usage_rules": {
    "scope": "Используем для навигации. Для Dropdown используем отдельный компонент.",
    "selection": "selected=true используем для текущего или выбранного пункта.",
    "interaction": "state=hovered используем только для невыбранной и доступной строки.",
    "density": "dense=true — для компактных списков; по умолчанию используем dense=false.",
    "paddingX": "paddingX=true добавляет горизонтальные внутренние отступы; paddingX=false используем, когда их задаёт родительский контейнер."
  }
}
```

`List item` — базовая строка навигационного списка. Используем её для перехода между разделами и навигационных действий.

## Сводка компонента

| Параметр        | Значения             | По умолчанию | Что задаёт                                  |
| --------------- | -------------------- | ------------ | ------------------------------------------- |
| `paddingX`      | `false`, `true`      | `true`       | Горизонтальные внутренние отступы строки.   |
| `dense`         | `false`, `true`      | `false`      | Обычную или компактную плотность строки.    |
| `fontWeight`    | `medium`, `regular`  | `medium`     | Насыщенность основного текста.              |
| `selected`      | `false`, `true`      | `false`      | Выбранное состояние.                        |
| `state`         | `default`, `hovered` | `default`    | Интерактивное состояние невыбранной строки. |
| `disabled`      | `false`, `true`      | `false`      | Недоступное состояние.                      |
| `startIcon`     | `true`, `false`      | `true`       | Наличие иконки слева.                       |
| `secondaryText` | `true`, `false`      | `true`       | Наличие вторичного текста.                  |
| `iconButton`    | `true`, `false`      | `true`       | Наличие иконки-действия справа.             |
| `endIcon`       | `true`, `false`      | `true`       | Наличие завершающей иконки справа.          |
| `button`        | `true`, `false`      | `true`       | Наличие завершающей кнопки.                 |

## Использует компоненты

| Компонент            | Связь           | Роль                                          |
| -------------------- | --------------- | --------------------------------------------- |
| [Button](buttons.md) | Nested instance | Необязательное завершающее действие в строке. |

## Правила применения

- Используем для навигации; для `Dropdown` есть отдельный компонент;
- `selected=true` — для текущего или выбранного пункта;
- `state=hovered` — только для невыбранной и доступной строки;
- `disabled=true` — только с `selected=false` и `state=default`;
- `dense=true` — для компактных списков; в остальных случаях оставляем `dense=false`;
- `paddingX=false` — когда горизонтальные отступы уже задаёт родительский контейнер.

## Ограничения variants

- Для `selected=true` существует только `state=default`;
- Для `disabled=true` существуют только `selected=false` и `state=default`.
