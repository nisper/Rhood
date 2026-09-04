# input number

```json
{
  "name": "input number",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11269-12380&t=RlsQgkmCU6SGWE6b-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "empty": { "values": ["true", "false"], "default": "true" },
      "disabled": { "values": ["false", "true"], "default": "false" },
      "error": { "values": ["false", "true"], "default": "false" },
      "state": {
        "values": ["default", "hovered", "focused"],
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
    "size": "size=md или size=sm задаёт размер поля.",
    "content": "empty, startText и endText управляют содержимым поля.",
    "clearButton": "clearButton=true показывает очистку заполненного поля.",
    "required": "required=true показывает обязательность поля.",
    "state": "state=default, hovered или focused задаёт состояние поля."
  }
}
```

`input number` — поле для ввода числового значения.

## Сводка компонента

| Параметр     | Значения                        | По умолчанию | Что задаёт                         |
| ------------ | ------------------------------- | ------------ | ---------------------------------- |
| `size`       | `md`, `sm`                      | `md`         | Размер поля.                       |
| `empty`      | `true`, `false`                 | `true`       | Наличие введённого значения.       |
| `disabled`   | `false`, `true`                 | `false`      | Недоступность поля.                |
| `error`      | `false`, `true`                 | `false`      | Ошибочное состояние.               |
| `state`      | `default`, `hovered`, `focused` | `default`    | Состояние взаимодействия.          |
| `helperText` | `true`, `false`                 | `false`      | Видимость вспомогательного текста. |
| `label`      | `true`, `false`                 | `true`       | Видимость основной подписи.        |
| `startText`  | `true`, `false`                 | `true`       | Текст в начале поля.               |
| `endText`    | `true`, `false`                 | `true`       | Текст в конце поля.                |
| `clearButton`| `true`, `false`                 | `true`       | Кнопка очистки.                    |
| `required`   | `true`, `false`                 | `true`       | Отметка обязательного поля.        |

## Использует компоненты

| Компонент                           | Связь           | Роль                      |
| ----------------------------------- | --------------- | ------------------------- |
| [[docs/components/helper-text.md]]  | Nested instance | Вспомогательный текст.    |
| [[docs/components/icon-buttons.md]] | Nested instance | Очистка поля.             |
