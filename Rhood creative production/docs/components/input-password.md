# input password

```json
{
  "name": "input password",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=785-7777&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "showPassword": { "values": ["false", "true"], "default": "false" },
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
      "label": {
        "type": "boolean",
        "default": true,
        "figma_key": "label#584:140"
      },
      "placeholder": {
        "type": "boolean",
        "default": true,
        "figma_key": "placeholder#8517:0"
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
    "showPassword": "showPassword=true показывает пароль вместо маскированного значения.",
    "state": "state=default, hovered или focused задаёт состояние поля.",
    "content": "empty и placeholder управляют содержимым поля."
  }
}
```

`input password` — поле для ввода пароля с возможностью показать значение.

## Сводка компонента

| Параметр       | Значения                        | По умолчанию | Что задаёт                          |
| -------------- | ------------------------------- | ------------ | ----------------------------------- |
| `size`         | `md`, `sm`                      | `md`         | Размер поля.                        |
| `showPassword` | `false`, `true`                 | `false`      | Отображение введённого пароля.      |
| `empty`        | `false`, `true`                 | `true`       | Наличие введённого значения.        |
| `disabled`     | `false`, `true`                 | `false`      | Недоступность поля.                 |
| `error`        | `false`, `true`                 | `false`      | Ошибочное состояние.                |
| `state`        | `default`, `focused`, `hovered` | `default`    | Состояние взаимодействия.           |
| `helperText`   | `true`, `false`                 | `false`      | Видимость вспомогательного текста.  |
| `label`        | `true`, `false`                 | `true`       | Видимость основной подписи.         |
| `placeholder`  | `true`, `false`                 | `true`       | Видимость placeholder.              |

## Использует компоненты

| Компонент                             | Связь           | Роль                   |
| ------------------------------------- | --------------- | ---------------------- |
| [[docs/components/helper-text.md\|helper text]] | Nested instance | Вспомогательный текст. |
