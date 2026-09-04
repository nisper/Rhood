# help icon

```json
{
  "name": "help icon",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=712-480&t=dXdC4YFLBloB6Ztr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["lg", "md", "sm"], "default": "lg" },
      "state": { "values": ["default", "hovered"], "default": "default" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "ic circle-question-mark",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка help."
    },
    {
      "component": "tooltip",
      "documentation": "tooltip.md",
      "relation": "nested instance",
      "role": "Подсказка в state=hovered."
    }
  ],
  "usage_rules": {
    "state": "state=hovered показывает tooltip.",
    "size": "size задаёт размер help icon."
  }
}
```

`help icon` — иконка справки с tooltip в hovered-состоянии.

## Сводка компонента

| Параметр | Значения             | По умолчанию | Что задаёт                              |
| -------- | -------------------- | ------------ | --------------------------------------- |
| `size`   | `lg`, `md`, `sm`     | `lg`         | Размер help icon.                       |
| `state`  | `default`, `hovered` | `default`    | Визуальное состояние и наличие tooltip. |

## Использует компоненты

| Компонент                 | Связь           | Роль                         |
| ------------------------- | --------------- | ---------------------------- |
| `ic circle-question-mark` | Nested instance | Иконка help.                 |
| [tooltip](tooltip.md)     | Nested instance | Подсказка в `state=hovered`. |
