# input date range

```json
{
  "name": "input date range",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11270-13149&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
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
      }
    }
  },
  "dependencies": [
    {
      "component": "input date",
      "documentation": "input-date.md",
      "relation": "nested instance",
      "role": "Начальная и конечная даты."
    },
    {
      "component": "helper text",
      "documentation": "helper-text.md",
      "relation": "nested instance",
      "role": "Вспомогательный текст при helperText=true."
    }
  ],
  "usage_rules": {
    "disabled": "disabled=true делает оба поля диапазона недоступными.",
    "error": "error=true показывает ошибочное состояние диапазона.",
    "helperText": "helperText=true показывает вспомогательный текст.",
    "state": "state=default, hovered или focused задаёт состояние компонента."
  }
}
```

`input date range` — компонент для ввода начальной и конечной даты.

## Сводка компонента

| Параметр    | Значения                        | По умолчанию | Что задаёт                         |
| ----------- | ------------------------------- | ------------ | ---------------------------------- |
| `disabled`  | `false`, `true`                 | `false`      | Недоступность обоих полей.         |
| `error`     | `false`, `true`                 | `false`      | Ошибочное состояние диапазона.     |
| `state`     | `default`, `hovered`, `focused` | `default`    | Состояние взаимодействия.          |
| `helperText` | `true`, `false`                 | `false`      | Видимость вспомогательного текста. |

## Использует компоненты

| Компонент                              | Связь           | Роль                       |
| -------------------------------------- | --------------- | -------------------------- |
| [[docs/components/input-date.md]]      | Nested instance | Начальная и конечная даты. |
| [[docs/components/helper-text.md]]     | Nested instance | Вспомогательный текст.     |
