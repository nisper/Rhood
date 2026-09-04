# input date

```json
{
  "name": "input date",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=574-4467&t=mA2yPpv2kgrPcmFt-11"
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
      },
      "startText": {
        "type": "boolean",
        "default": true,
        "figma_key": "startText#583:115"
      },
      "label": {
        "type": "boolean",
        "default": true,
        "figma_key": "label#11310:0"
      },
      "required": {
        "type": "boolean",
        "default": true,
        "figma_key": "required#11108:0"
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
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Очистка введённой даты при empty=false."
    }
  ],
  "usage_rules": {
    "size": "size=md или size=sm задаёт размер поля даты.",
    "startText": "startText=true показывает текст в начале поля.",
    "empty": "empty=false показывает введённую дату и действие очистки.",
    "label": "label=true показывает текст «Выберите дату» в пустом поле.",
    "required": "required=true показывает отметку обязательного поля.",
    "state": "state=default, hovered или focused задаёт состояние поля.",
    "disabled": "Для disabled=true доступны только error=false и state=default."
  }
}
```

`input date` — поле для ввода даты.

## Сводка компонента

| Параметр       | Значения                        | По умолчанию | Что задаёт                          |
| -------------- | ------------------------------- | ------------ | ----------------------------------- |
| `size`         | `md`, `sm`                      | `md`         | Размер поля.                        |
| `empty`        | `false`, `true`                 | `true`       | Наличие введённой даты.             |
| `disabled`     | `false`, `true`                 | `false`      | Недоступность поля.                 |
| `error`        | `false`, `true`                 | `false`      | Ошибочное состояние.                |
| `state`        | `default`, `focused`, `hovered` | `default`    | Состояние взаимодействия.           |
| `helperText`   | `true`, `false`                 | `false`      | Видимость вспомогательного текста.  |
| `startText`    | `true`, `false`                 | `true`       | Текст в начале поля.                |
| `label`        | `true`, `false`                 | `true`       | Видимость текста «Выберите дату».   |
| `required`     | `true`, `false`                 | `true`       | Отметка обязательного поля.         |

## Использует компоненты

| Компонент                             | Связь           | Роль                                     |
| ------------------------------------- | --------------- | ---------------------------------------- |
| [[docs/components/helper-text.md\|helper text]] | Nested instance | Вспомогательный текст.                   |
| [[docs/components/icon-buttons.md\|UI Icon Buttons]]    | Nested instance | Очистка введённой даты при `empty=false`. |

## Правила применения

- `empty=true` показывает пустое поле, `empty=false` — введённую дату и действие очистки;
- `label=true` показывает текст «Выберите дату» в пустом поле;
- `helperText=true` показывает [[docs/components/helper-text.md|helper text]] под полем;
- `required=true` показывает отметку обязательного поля;
- `disabled=true` доступен только с `error=false` и `state=default`.
