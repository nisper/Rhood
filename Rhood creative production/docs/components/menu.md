# Menu

```json
{
  "name": "menu",
  "type": "component",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=436-1556&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {},
    "component_properties": { "children": { "type": "slot", "default": null } }
  },
  "dependencies": [
    {
      "component": "menu item single select",
      "documentation": "menu-item-single-select.md",
      "relation": "nested instance",
      "role": "Пункт выбора одного значения."
    },
    {
      "component": "menu item multiselect",
      "documentation": "menu-item-multiselect.md",
      "relation": "nested instance",
      "role": "Пункт выбора нескольких значений."
    },
    {
      "component": "menu-divider",
      "documentation": "menu-divider.md",
      "relation": "nested instance",
      "role": "Разделитель групп пунктов."
    }
  ],
  "usage_rules": {
    "children": "Через children задаётся состав Menu: пункты выбора и разделители.",
    "selection": "Тип пунктов выбирай по модели выбора: single select для одного значения, multiselect для нескольких."
  }
}
```

`Menu` — всплывающий контейнер для списка вариантов выбора.

## Сводка компонента

| Параметр   | Значения | По умолчанию | Что задаёт                                |
| ---------- | -------- | ------------ | ----------------------------------------- |
| `children` | Slot     |              | Состав Menu: пункты выбора и разделители. |

## Использует компоненты

| Компонент                                             | Связь           | Роль                              |
| ----------------------------------------------------- | --------------- | --------------------------------- |
| [Menu item single select](menu-item-single-select.md) | Nested instance | Пункт выбора одного значения.     |
| [Menu item multiselect](menu-item-multiselect.md)     | Nested instance | Пункт выбора нескольких значений. |
| [Menu divider](menu-divider.md)                       | Nested instance | Разделитель групп пунктов.        |

## Правила применения

- Состав Menu задаётся через `children`;
- для выбора одного значения используй `Menu item single select`;
- для выбора нескольких значений используй `Menu item multiselect`;
- `menu-divider` разделяет смысловые группы пунктов.
