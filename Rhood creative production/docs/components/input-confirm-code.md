# input confirm code

```json
{
  "name": "input confirm code",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=1918-18189&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
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
    }
  ],
  "usage_rules": {
    "content": "empty=true показывает пустые ячейки кода; empty=false — введённое значение.",
    "state": "state=default, hovered или focused задаёт состояние поля.",
    "error": "error=true показывает ошибочное состояние.",
    "disabled": "disabled=true делает ввод недоступным."
  }
}
```

`input confirm code` — поле для ввода кода подтверждения по отдельным позициям.

## Сводка компонента

| Параметр     | Значения                        | По умолчанию | Что задаёт                         |
| ------------ | ------------------------------- | ------------ | ---------------------------------- |
| `empty`      | `false`, `true`                 | `true`       | Наличие введённого кода.           |
| `disabled`   | `false`, `true`                 | `false`      | Недоступность поля.                |
| `error`      | `false`, `true`                 | `false`      | Ошибочное состояние.               |
| `state`      | `default`, `focused`, `hovered` | `default`    | Состояние взаимодействия.          |
| `helperText` | `true`, `false`                 | `false`      | Видимость вспомогательного текста. |

## Использует компоненты

| Компонент                             | Связь           | Роль                   |
| ------------------------------------- | --------------- | ---------------------- |
| [[docs/components/helper-text.md\|helper text]] | Nested instance | Вспомогательный текст. |
