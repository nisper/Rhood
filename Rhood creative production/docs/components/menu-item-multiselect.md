# Menu item multiselect

```json
{
  "name": "Menu item multiselect",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10471-2487&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "checked": { "values": [false, true], "default": false },
      "disabled": { "values": [false, true], "default": false },
      "state": { "values": ["default", "hovered"], "default": "default" }
    },
    "component_properties": {
      "icon": { "type": "boolean", "default": true },
      "secondaryText": { "type": "boolean", "default": true },
      "rightSlot": { "type": "boolean", "default": true },
      "rightSlotText": { "type": "boolean", "default": true },
      "rightSlotChip": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "chip",
      "documentation": "chip.md",
      "relation": "nested instance",
      "role": "Дополнительная метка в правом слоте."
    },
    {
      "component": "ic square",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор невыбранного пункта."
    },
    {
      "component": "ic square-check",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор выбранного пункта."
    },
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "icon по умолчанию."
    }
  ],
  "usage_rules": {
    "selection": "Используется в Menu, где можно выбрать несколько значений.",
    "checked": "checked=true показывает выбранный пункт.",
    "rightSlot": "rightSlot управляет правым слотом, а rightSlotText и rightSlotChip — его содержимым."
  }
}
```

`Menu item multiselect` — пункт Menu для выбора нескольких значений.

## Сводка компонента

| Параметр        | Значения             | По умолчанию | Что задаёт                            |
| --------------- | -------------------- | ------------ | ------------------------------------- |
| `checked`       | `false`, `true`      | `false`      | Выбранность пункта и иконку checkbox. |
| `disabled`      | `false`, `true`      | `false`      | Доступность пункта.                   |
| `state`         | `default`, `hovered` | `default`    | Визуальное состояние пункта.          |
| `icon`     | `true`, `false`      | `true`       | Наличие icon.                   |
| `secondaryText` | `true`, `false`      | `true`       | Наличие вторичного текста.            |
| `rightSlot`     | `true`, `false`      | `true`       | Наличие правого слота.                |
| `rightSlotText` | `true`, `false`      | `true`       | Наличие текста в правом слоте.        |
| `rightSlotChip` | `true`, `false`      | `true`       | Наличие Chip в правом слоте.          |

## Использует компоненты

| Компонент         | Связь           | Роль                                 |
| ----------------- | --------------- | ------------------------------------ |
| [Chip](chip.md)   | Nested instance | Дополнительная метка в правом слоте. |
| `ic square`       | Nested instance | Индикатор невыбранного пункта.       |
| `ic square-check` | Nested instance | Индикатор выбранного пункта.         |
| `ic star`         | Nested instance | icon по умолчанию.             |

## Правила применения

- Используй в [Menu](menu.md), где можно выбрать несколько значений;
- `checked=true` — выбранный пункт;
- `rightSlot` управляет правым слотом, `rightSlotText` и `rightSlotChip` — его содержимым.
