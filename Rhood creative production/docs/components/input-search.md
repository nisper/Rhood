# input search

```json
{
  "name": "input search",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=505-5354&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "empty": { "values": ["false", "true"], "default": "true" },
      "disabled": { "values": ["false", "true"], "default": "false" },
      "error": { "values": ["false", "true"], "default": "false" },
      "state": {
        "values": ["default", "focused", "hovered"],
        "default": "default"
      }
    },
    "component_properties": {
      "helperText": {
        "type": "boolean",
        "default": false,
        "figma_key": "helperText#351:14"
      }
    }
  },
  "dependencies": [
    {
      "component": "helper text",
      "documentation": "helper-text.md",
      "relation": "nested instance",
      "role": "Вспомогательный текст при helperText=true."
    },
    {
      "component": "search",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка поиска.",
      "note": "Nested instance иконки называется search, без префикса ic ."
    }
  ],
  "usage_rules": {
    "content": "empty задаёт наличие введённого поискового значения.",
    "state": "state=default, hovered или focused задаёт состояние поля.",
    "error": "error=true показывает ошибочное состояние."
  },
  "open_questions": [
    "Nested instance иконки называется search, без обязательного префикса ic . Нужно проверить имя и заменить на актуальный компонент из Parser – Lucide icons."
  ]
}
```

`input search` — поле для ввода поискового запроса.

## Сводка компонента

| Параметр     | Значения                        | По умолчанию | Что задаёт                         |
| ------------ | ------------------------------- | ------------ | ---------------------------------- |
| `size`       | `md`, `sm`                      | `md`         | Размер поля.                       |
| `empty`      | `false`, `true`                 | `true`       | Наличие поискового значения.       |
| `disabled`   | `false`, `true`                 | `false`      | Недоступность поля.                |
| `error`      | `false`, `true`                 | `false`      | Ошибочное состояние.               |
| `state`      | `default`, `focused`, `hovered` | `default`    | Состояние взаимодействия.          |
| `helperText` | `true`, `false`                 | `false`      | Видимость вспомогательного текста. |

## Использует компоненты

| Компонент                             | Связь           | Роль                                   |
| ------------------------------------- | --------------- | -------------------------------------- |
| [[docs/components/helper-text.md\|helper text]] | Nested instance | Вспомогательный текст.                 |
| `search`                              | Nested instance | Иконка поиска; имя без префикса `ic `. |

## Открытые вопросы

- Nested instance иконки называется `search`, без обязательного префикса `ic `. Нужно проверить имя и заменить на актуальный компонент из `Parser – Lucide icons`.
