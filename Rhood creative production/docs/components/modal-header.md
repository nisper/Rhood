# Modal header

```json
{
  "name": "modal header",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-14155&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "paddings": { "values": [false, true], "default": true }
    },
    "component_properties": {
      "closeLeft": { "type": "boolean", "default": true },
      "avatar": { "type": "boolean", "default": true },
      "centerSection": { "type": "boolean", "default": true },
      "title": { "type": "boolean", "default": true },
      "secondaryText": { "type": "boolean", "default": true },
      "secondaryIcon": { "type": "boolean", "default": true },
      "link": { "type": "boolean", "default": true },
      "buttonBottom": { "type": "boolean", "default": true },
      "buttonRight": { "type": "boolean", "default": true },
      "closeRight": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Кнопки закрытия слева и справа."
    },
    {
      "component": "Avatar",
      "documentation": "avatar.md",
      "relation": "nested instance",
      "role": "Аватар в шапке."
    },
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Дополнительные действия под текстом и справа."
    },
    {
      "component": "ic circle-check",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка вторичного текста при secondaryIcon=true."
    }
  ],
  "usage_rules": {
    "paddings": "paddings=true добавляет боковые поля; paddings=false убирает их.",
    "content": "Видимость частей шапки настраивается отдельными boolean component properties.",
    "drawer": "В Drawer используется как фиксированная шапка с нужными overrides."
  }
}
```

`Modal header` — составная шапка для Modal и Drawer.

## Сводка компонента

| Параметр        | Значения        | По умолчанию | Что задаёт                         |
| --------------- | --------------- | ------------ | ---------------------------------- |
| `paddings`      | `false`, `true` | `true`       | Наличие боковых полей.             |
| `closeLeft`     | `false`, `true` | `true`       | Кнопку закрытия слева.             |
| `avatar`        | `false`, `true` | `true`       | Аватар.                            |
| `centerSection` | `false`, `true` | `true`       | Центральную текстовую секцию.      |
| `title`         | `false`, `true` | `true`       | Заголовок.                         |
| `secondaryText` | `false`, `true` | `true`       | Вторичный текст.                   |
| `secondaryIcon` | `false`, `true` | `true`       | Иконку рядом со вторичным текстом. |
| `link`          | `false`, `true` | `true`       | Ссылку в центральной секции.       |
| `buttonBottom`  | `false`, `true` | `true`       | Дополнительную кнопку под текстом. |
| `buttonRight`   | `false`, `true` | `true`       | Дополнительную кнопку справа.      |
| `closeRight`    | `false`, `true` | `true`       | Кнопку закрытия справа.            |

## Использует компоненты

| Компонент                          | Связь           | Роль                                               |
| ---------------------------------- | --------------- | -------------------------------------------------- |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Кнопки закрытия слева и справа.                    |
| [Avatar](avatar.md)                | Nested instance | Аватар в шапке.                                    |
| [UI Buttons](buttons.md)           | Nested instance | Дополнительные действия под текстом и справа.      |
| `ic circle-check`                  | Nested instance | Иконка вторичного текста при `secondaryIcon=true`. |

## Правила применения

- `paddings=true` добавляет боковые поля, `paddings=false` — убирает их;
- Настраивай видимость частей шапки отдельными boolean `component properties`;
- В Drawer используй шапку как фиксированную, с нужными overrides.
