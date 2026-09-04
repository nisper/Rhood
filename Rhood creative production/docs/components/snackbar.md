# snackbar

```json
{
  "name": "snackbar",
  "type": "component",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=930-25605&t=VGzD5fU6SKlR7lRu-11"
  },
  "figma": {
    "variant_properties": {},
    "component_properties": {
      "button": { "type": "boolean", "default": true },
      "close": { "type": "boolean", "default": true },
      "icon": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Дополнительное действие при button=true."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Закрытие snackbar при close=true."
    },
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка по умолчанию при icon=true."
    }
  ],
  "usage_rules": {
    "button": "button=true показывает текстовое действие.",
    "close": "close=true показывает кнопку закрытия.",
    "icon": "icon=true показывает иконку слева от сообщения."
  }
}
```

`snackbar` — короткое системное сообщение с опциональной иконкой, действием и закрытием.

## Сводка компонента

| Параметр | Значения        | По умолчанию | Что задаёт                         |
| -------- | --------------- | ------------ | ---------------------------------- |
| `button` | `true`, `false` | `true`       | Наличие текстового действия.       |
| `close`  | `true`, `false` | `true`       | Наличие кнопки закрытия.           |
| `icon`   | `true`, `false` | `true`       | Наличие иконки слева от сообщения. |

## Использует компоненты

| Компонент                          | Связь           | Роль                                       |
| ---------------------------------- | --------------- | ------------------------------------------ |
| [UI Buttons](buttons.md)           | Nested instance | Дополнительное действие при `button=true`. |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Закрытие snackbar при `close=true`.        |
| `ic star`                          | Nested instance | Иконка по умолчанию при `icon=true`.       |
