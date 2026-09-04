# Alert

```json
{
  "name": "Alert",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=787-12583&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "resp": { "values": ["desk", "mob"], "default": "desk" },
      "color": {
        "values": ["error", "warning", "neutral", "brand"],
        "default": "error"
      },
      "style": { "values": ["muted", "contrast"], "default": "muted" }
    },
    "component_properties": {
      "bigIcon": { "type": "boolean", "default": true },
      "children": { "type": "slot", "default": null },
      "icon": { "type": "boolean", "default": true },
      "title": { "type": "boolean", "default": true },
      "description": { "type": "boolean", "default": true },
      "action": { "type": "boolean", "default": true },
      "closeButton": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Действие в Alert."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Закрытие Alert."
    },
    {
      "component": "telegram",
      "documentation": "",
      "relation": "nested instance",
      "role": "Большая иконка по умолчанию; имя требует префикса `ic `."
    },
    {
      "component": "ic circle-alert",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка Alert с ошибкой."
    },
    {
      "component": "ic triangle-alert",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка предупреждения."
    },
    {
      "component": "ic circle-check",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка успешного состояния."
    }
  ],
  "usage_rules": {
    "resp": "resp=desk и resp=mob используют разные внутренние композиции Alert.",
    "children": "children заменяет большую иконку по умолчанию.",
    "content": "Видимость большой иконки, основной иконки, заголовка, описания, действия и закрытия настраивается отдельными component properties."
  }
}
```

`Alert` — компонент для краткого сообщения о состоянии или важном событии с опциональными действием и закрытием.

## Сводка компонента

| Параметр      | Значения                               | По умолчанию | Что задаёт                                    |
| ------------- | -------------------------------------- | ------------ | --------------------------------------------- |
| `resp`        | `desk`, `mob`                          | `desk`       | Внутреннюю композицию для desktop или mobile. |
| `color`       | `error`, `warning`, `neutral`, `brand` | `error`      | Семантический цвет сообщения.                 |
| `style`       | `muted`, `contrast`                    | `muted`      | Контрастность поверхности Alert.              |
| `bigIcon`     | `true`, `false`                        | `true`       | Наличие большой иконки.                       |
| `children`    | Slot                                   |              | Заменяет большую иконку по умолчанию.         |
| `icon`        | `true`, `false`                        | `true`       | Наличие основной иконки рядом с текстом.      |
| `title`       | `true`, `false`                        | `true`       | Наличие заголовка.                            |
| `description` | `true`, `false`                        | `true`       | Наличие описания.                             |
| `action`      | `true`, `false`                        | `true`       | Наличие действия.                             |
| `closeButton` | `true`, `false`                        | `true`       | Наличие кнопки закрытия.                      |

## Использует компоненты

| Компонент                          | Связь           | Роль                         |
| ---------------------------------- | --------------- | ---------------------------- |
| [UI Buttons](buttons.md)           | Nested instance | Действие в Alert.            |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Закрытие Alert.              |
| `telegram`                         | Nested instance | Большая иконка по умолчанию. |
| `ic circle-alert`                  | Nested instance | Иконка Alert с ошибкой.      |
| `ic triangle-alert`                | Nested instance | Иконка предупреждения.       |
| `ic circle-check`                  | Nested instance | Иконка успешного состояния.  |

## Правила применения

- `resp=desk` и `resp=mob` — разные внутренние композиции одного компонента;
- `children` заменяет большую иконку по умолчанию;
- `bigIcon`, `icon`, `title`, `description`, `action` и `closeButton` независимо управляют видимостью своих частей.

## Открытые вопросы

- Переименовать прямую вложенную иконку `telegram` в `ic telegram`.
