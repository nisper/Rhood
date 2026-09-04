# Modal top

```json
{
  "name": "modal top",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-14227&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "variant": { "values": ["grabber", "close btn"], "default": "grabber" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Кнопка закрытия при variant=close btn."
    }
  ],
  "usage_rules": {
    "grabber": "Используй для верхней зоны mobile bottom sheet.",
    "close_btn": "Используй, когда в верхней зоне нужна кнопка закрытия вместо grabber."
  }
}
```

`Modal top` — верхняя зона mobile Modal.

## Сводка компонента

| Параметр  | Значения               | По умолчанию | Что задаёт                     |
| --------- | ---------------------- | ------------ | ------------------------------ |
| `variant` | `grabber`, `close btn` | `grabber`    | Содержимое верхней зоны Modal. |

## Использует компоненты

| Компонент                          | Связь           | Роль                                     |
| ---------------------------------- | --------------- | ---------------------------------------- |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Кнопка закрытия при `variant=close btn`. |

## Правила применения

- `grabber` — для верхней зоны mobile bottom sheet;
- `close btn` — когда в верхней зоне нужна кнопка закрытия вместо grabber.
