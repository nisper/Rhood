# Menu item single select

```json
{
  "name": "Menu item single select",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=433-4194&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "selected": { "values": [false, true], "default": true },
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
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "icon по умолчанию."
    }
  ],
  "usage_rules": {
    "selection": "Используется в Menu, где можно выбрать только одно значение.",
    "selected": "selected=true показывает текущий выбранный пункт.",
    "rightSlot": "rightSlot управляет правым слотом, а rightSlotText и rightSlotChip — его содержимым."
  }
}
```

`Menu item single select` — пункт Menu для выбора одного значения.

## Сводка компонента

| Параметр        | Значения             | По умолчанию | Что задаёт                     |
| --------------- | -------------------- | ------------ | ------------------------------ |
| `selected`      | `false`, `true`      | `true`       | Выбранность пункта.            |
| `disabled`      | `false`, `true`      | `false`      | Доступность пункта.            |
| `state`         | `default`, `hovered` | `default`    | Визуальное состояние пункта.   |
| `icon`     | `true`, `false`      | `true`       | Наличие icon.            |
| `secondaryText` | `true`, `false`      | `true`       | Наличие вторичного текста.     |
| `rightSlot`     | `true`, `false`      | `true`       | Наличие правого слота.         |
| `rightSlotText` | `true`, `false`      | `true`       | Наличие текста в правом слоте. |
| `rightSlotChip` | `true`, `false`      | `true`       | Наличие Chip в правом слоте.   |

## Использует компоненты

| Компонент       | Связь           | Роль                                 |
| --------------- | --------------- | ------------------------------------ |
| [Chip](chip.md) | Nested instance | Дополнительная метка в правом слоте. |
| `ic star`       | Nested instance | icon по умолчанию.             |

## Правила применения

- Используй в [Menu](menu.md), где можно выбрать одно значение;
- `selected=true` — текущий выбранный пункт;
- `rightSlot` управляет правым слотом, `rightSlotText` и `rightSlotChip` — его содержимым.
