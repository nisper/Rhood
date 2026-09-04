# input text multiline

```json
{
  "name": "input text multiline",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=734-6530&t=64Qq6uwHdtCKN34B-11"
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
      "required": {
        "type": "boolean",
        "default": true,
        "figma_key": "required#2982:0"
      }
    }
  },
  "dependencies": [
    {
      "component": "helper text",
      "documentation": "helper-text.md",
      "relation": "nested instance",
      "role": "Вспомогательный текст при helperText=true."
    }
  ],
  "usage_rules": {
    "empty": "empty=true показывает пустое поле; empty=false — поле с введённым значением.",
    "required": "required=true показывает обязательность поля.",
    "state": "state=default, hovered или focused задаёт состояние поля."
  },
  "open_questions": []
}
```

`input text multiline` — текстовое поле для ввода одной или нескольких строк.

## Сводка компонента

| Параметр       | Значения                        | По умолчанию | Что задаёт                          |
| -------------- | ------------------------------- | ------------ | ----------------------------------- |
| `size`         | `md`, `sm`                      | `md`         | Размер поля.                        |
| `empty`        | `true`, `false`                 | `true`       | Наличие введённого значения.        |
| `disabled`     | `false`, `true`                 | `false`      | Недоступность поля.                 |
| `error`        | `false`, `true`                 | `false`      | Ошибочное состояние.                |
| `state`        | `default`, `hovered`, `focused` | `default`    | Состояние взаимодействия.           |
| `helperText`   | `true`, `false`                 | `false`      | Видимость вспомогательного текста.  |
| `label`        | `true`, `false`                 | `true`       | Видимость основной подписи.         |
| `required`     | `true`, `false`                 | `true`       | Обязательность поля.                |

## Использует компоненты

| Компонент                             | Связь           | Роль                                                    |
| ------------------------------------- | --------------- | ------------------------------------------------------- |
| [[docs/components/helper-text.md]] | Nested instance | Вспомогательный текст.                                  |
