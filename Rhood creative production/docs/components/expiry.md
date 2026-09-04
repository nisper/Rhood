# Expiry

```json
{
  "name": "Expiry",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=1376-584&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "color": { "values": ["warning", "error"], "default": "error" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Действие «Продлить»."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Закрытие уведомления."
    },
    {
      "component": "ic triangle-alert",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка предупреждения при color=warning."
    },
    {
      "component": "ic circle-alert",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка ошибки при color=error."
    }
  ],
  "usage_rules": {
    "color": "color=warning — подписка скоро закончится; color=error — срок подписки закончился."
  }
}
```

`Expiry` — полноширинное уведомление о сроке подписки RHOOD Plus с действием «Продлить».

## Сводка компонента

| Параметр | Значения           | По умолчанию | Что задаёт                                                       |
| -------- | ------------------ | ------------ | ---------------------------------------------------------------- |
| `color`  | `warning`, `error` | `error`      | Сценарий истечения подписки, цвет поверхности и основную иконку. |

## Использует компоненты

| Компонент                          | Связь           | Роль                                       |
| ---------------------------------- | --------------- | ------------------------------------------ |
| [UI Buttons](buttons.md)           | Nested instance | Действие «Продлить».                       |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Закрытие уведомления.                      |
| `ic triangle-alert`                | Nested instance | Иконка предупреждения при `color=warning`. |
| `ic circle-alert`                  | Nested instance | Иконка ошибки при `color=error`.           |

## Правила применения

- `color=warning` — подписка скоро закончится;
- `color=error` — срок подписки закончился.
