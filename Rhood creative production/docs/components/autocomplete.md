# Autocomplete

```json
{
  "name": "Autocomplete",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=360-1758&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "content": { "values": ["text", "chips"], "default": "text" },
      "empty": { "values": ["true", "false"], "default": "true" },
      "disabled": { "values": ["false", "true"], "default": "false" },
      "error": { "values": ["false", "true"], "default": "false" },
      "state": {
        "values": ["default", "hovered", "focused"],
        "default": "default"
      },
      "expanded": { "values": ["false", "true"], "default": "false" }
    },
    "component_properties": {
      "helperText": { "type": "boolean", "default": false },
      "required": { "type": "boolean", "default": false },
      "label": { "type": "boolean", "default": false },
      "clear": { "type": "boolean", "default": false }
    }
  },
  "dependencies": [
    {
      "component": "chip",
      "documentation": "chip.md",
      "relation": "nested instance",
      "role": "Выбранные значения при content=chips."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Очистка выбранных значений при clear=true."
    },
    {
      "component": "ic chevron-down",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор свёрнутого списка."
    },
    {
      "component": "ic chevron-up",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор раскрытого списка."
    },
    {
      "component": "menu",
      "documentation": "menu.md",
      "relation": "opens",
      "role": "Список вариантов при expanded=true."
    }
  ],
  "usage_rules": {
    "content": "content=text — одно текстовое значение; content=chips — несколько выбранных значений в chips.",
    "state": "state=focused задаёт активное состояние поля; expanded=true показывает раскрытое состояние и chevron-up.",
    "label": "label=true показывает floating label для заполненного или активного поля.",
    "clear": "clear=true показывает кнопку очистки выбранных значений."
  }
}
```

`Autocomplete` — поле выбора с возможностью поиска. При `expanded=true` оно открывает отдельный [Menu](menu.md) со списком вариантов.

## Сводка компонента

| Параметр     | Значения                        | По умолчанию | Что задаёт                                                |
| ------------ | ------------------------------- | ------------ | --------------------------------------------------------- |
| `size`       | `md`, `sm`                      | `md`         | Размер поля.                                              |
| `content`    | `text`, `chips`                 | `text`       | Одно текстовое значение или несколько выбранных значений. |
| `empty`      | `true`, `false`                 | `true`       | Наличие выбранного значения.                              |
| `disabled`   | `false`, `true`                 | `false`      | Доступность поля.                                         |
| `error`      | `false`, `true`                 | `false`      | Ошибочное состояние.                                      |
| `state`      | `default`, `hovered`, `focused` | `default`    | Визуальное состояние поля.                                |
| `expanded`   | `false`, `true`                 | `false`      | Раскрытое состояние и направление chevron.                |
| `helperText` | `true`, `false`                 | `false`      | Наличие helper text.                                      |
| `required`   | `true`, `false`                 | `false`      | Индикатор обязательного поля.                             |
| `label`      | `true`, `false`                 | `false`      | Наличие floating label.                                   |
| `clear`      | `true`, `false`                 | `false`      | Наличие кнопки очистки.                                   |

## Использует компоненты

| Компонент                          | Связь           | Роль                                         |
| ---------------------------------- | --------------- | -------------------------------------------- |
| [Chip](chip.md)                    | Nested instance | Выбранные значения при `content=chips`.      |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Очистка выбранных значений при `clear=true`. |
| `ic chevron-down`                  | Nested instance | Индикатор свёрнутого списка.                 |
| `ic chevron-up`                    | Nested instance | Индикатор раскрытого списка.                 |
| [Menu](menu.md)                    | Opens           | Список вариантов при `expanded=true`.        |

## Правила применения

- `content=text` — для одного текстового значения;
- `content=chips` — для нескольких выбранных значений;
- `state=focused` задаёт активное состояние поля;
- `expanded=true` показывает раскрытое состояние и `ic chevron-up`;
- выпадающий список результатов — отдельный Menu, который открывается при `expanded=true`.
