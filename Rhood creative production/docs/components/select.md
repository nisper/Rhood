# Select

```json
{
  "name": "Select",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=348-8648&t=qGgv7BYxcRHpfLVP-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "content": { "values": ["text", "chips"], "default": "text" },
      "disabled": { "values": [false, true], "default": false },
      "error": { "values": [false, true], "default": false },
      "state": {
        "values": ["default", "hovered", "focused"],
        "default": "default"
      },
      "expanded": { "values": [false, true], "default": false }
    },
    "component_properties": {
      "helperText": { "type": "boolean", "default": false },
      "icon": { "type": "boolean", "default": false }
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
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "icon по умолчанию при icon=true."
    },
    {
      "component": "ic arrow_drop_down",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор свёрнутого списка."
    },
    {
      "component": "ic arrow_drop_up",
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
    "content": "content=text — одно выбранное значение; content=chips — несколько выбранных значений в chips.",
    "state": "state=focused задаёт активное состояние поля.",
    "expanded": "expanded=true показывает раскрытое состояние, ic arrow_drop_up и открывает Menu.",
    "helperText": "helperText=true показывает вспомогательный текст под полем."
  }
}
```

`Select` — поле выбора одного или нескольких значений.

## Сводка компонента

| Параметр     | Значения                        | По умолчанию | Что задаёт                                      |
| ------------ | ------------------------------- | ------------ | ----------------------------------------------- |
| `size`       | `md`, `sm`                      | `md`         | Размер поля.                                    |
| `content`    | `text`, `chips`                 | `text`       | Одно значение или несколько выбранных значений. |
| `disabled`   | `false`, `true`                 | `false`      | Доступность поля.                               |
| `error`      | `false`, `true`                 | `false`      | Ошибочное состояние.                            |
| `state`      | `default`, `hovered`, `focused` | `default`    | Визуальное состояние поля.                      |
| `expanded`   | `false`, `true`                 | `false`      | Раскрытое состояние Select.                     |
| `helperText` | `false`, `true`                 | `false`      | Видимость вспомогательного текста.              |
| `icon`  | `false`, `true`                 | `false`      | Видимость icon.                           |

## Использует компоненты

| Компонент            | Связь           | Роль                                          |
| -------------------- | --------------- | --------------------------------------------- |
| [[docs/components/chip.md\|Chip]]      | Nested instance | Выбранные значения при `content=chips`.       |
| `ic star`            | Nested instance | icon по умолчанию при `icon=true`. |
| `ic arrow_drop_down` | Nested instance | Индикатор свёрнутого списка.                  |
| `ic arrow_drop_up`   | Nested instance | Индикатор раскрытого списка.                  |
| [[docs/components/menu.md\|Menu]]      | Opens           | Список вариантов при `expanded=true`.         |

## Правила применения

- `content=text` — одно выбранное значение;
- `content=chips` — несколько выбранных значений в chips;
- `state=focused` задаёт активное состояние поля;
- `expanded=true` показывает раскрытое состояние, `ic arrow_drop_up` и открывает [[docs/components/menu.md|Menu]];
- `helperText=true` показывает вспомогательный текст под полем.
