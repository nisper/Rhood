# input text

```json
{
  "name": "input text",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=505-4429&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "empty": { "values": ["true", "false"], "default": "true" },
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
      "label": {
        "type": "boolean",
        "default": true,
        "figma_key": "label#591:190"
      },
      "startText": {
        "type": "boolean",
        "default": true,
        "figma_key": "startText#591:370"
      },
      "endText": {
        "type": "boolean",
        "default": true,
        "figma_key": "endText#591:420"
      },
      "clearButton": {
        "type": "boolean",
        "default": true,
        "figma_key": "clearButton#591:470"
      },
      "required": {
        "type": "boolean",
        "default": true,
        "figma_key": "required#2947:0"
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
      "role": "Очистка поля при clearButton=true."
    }
  ],
  "usage_rules": {
    "state": "state=default, hovered или focused задаёт состояние поля.",
    "content": "empty, label, startText и endText управляют содержимым поля.",
    "helperText": "helperText=true показывает вспомогательный текст.",
    "clearButton": "clearButton=true показывает очистку заполненного поля.",
    "required": "required=true показывает обязательность поля."
  }
}
```

`input text` — текстовое поле для ввода однострочного значения.

## Сводка компонента

| Параметр       | Значения                        | По умолчанию | Что задаёт                          |
| -------------- | ------------------------------- | ------------ | ----------------------------------- |
| `size`         | `md`, `sm`                      | `md`         | Размер поля.                        |
| `empty`        | `true`, `false`                 | `true`       | Наличие введённого значения.        |
| `disabled`     | `false`, `true`                 | `false`      | Недоступность поля.                 |
| `error`        | `false`, `true`                 | `false`      | Ошибочное состояние.                |
| `state`        | `default`, `focused`, `hovered` | `default`    | Состояние взаимодействия.           |
| `helperText`   | `true`, `false`                 | `false`      | Видимость вспомогательного текста.  |
| `label`        | `true`, `false`                 | `true`       | Видимость основной подписи.         |
| `startText`    | `true`, `false`                 | `true`       | Текст в начале поля.                |
| `endText`      | `true`, `false`                 | `true`       | Текст в конце поля.                 |
| `clearButton`  | `true`, `false`                 | `true`       | Кнопка очистки.                     |
| `required`     | `true`, `false`                 | `true`       | Обязательность поля.                |

## Использует компоненты

| Компонент                             | Связь           | Роль                                                             |
| ------------------------------------- | --------------- | ---------------------------------------------------------------- |
| [[docs/components/helper-text.md\|helper text]] | Nested instance | Вспомогательный текст.                                           |
| [[docs/components/icon-buttons.md\|UI Icon Buttons]]    | Nested instance | Очистка поля.                                                    |
