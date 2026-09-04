# input number range

```json
{
  "name": "input number range",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=7603-2174&t=RlsQgkmCU6SGWE6b-11"
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
      "component": "input number",
      "documentation": "input-number.md",
      "relation": "nested instance",
      "role": "Начальное и конечное числовые значения."
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

`input number range` — компонент для ввода начального и конечного числовых значений.

## Сводка компонента

| Параметр    | Значения                        | По умолчанию | Что задаёт                         |
| ----------- | ------------------------------- | ------------ | ---------------------------------- |
| `disabled`  | `false`, `true`                 | `false`      | Недоступность обоих полей.         |
| `error`     | `false`, `true`                 | `false`      | Ошибочное состояние диапазона.     |
| `state`     | `default`, `hovered`, `focused` | `default`    | Состояние взаимодействия.          |
| `helperText` | `true`, `false`                 | `false`      | Видимость вспомогательного текста. |

## Использует компоненты

| Компонент                         | Связь           | Роль                                   |
| --------------------------------- | --------------- | -------------------------------------- |
| [[docs/components/input-number.md]] | Nested instance | Начальное и конечное числовые значения. |
| [[docs/components/helper-text.md]] | Nested instance | Вспомогательный текст.                 |
