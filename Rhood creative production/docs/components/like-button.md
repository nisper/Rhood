# like button

```json
{
  "name": "like button",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=8555-1158&t=dXdC4YFLBloB6Ztr-11"
  },
  "figma": {
    "variant_properties": {
      "checked": { "values": ["true", "false"], "default": "false" },
      "state": { "values": ["default", "hover"], "default": "default" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "ic thumbs-up",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка like."
    }
  ],
  "usage_rules": {
    "checked": "checked=false — действие не выбрано; checked=true — действие выбрано.",
    "state": "state=hover — состояние наведения."
  }
}
```

`like button` — кнопка реакции like.

## Сводка компонента

| Параметр  | Значения           | По умолчанию | Что задаёт                   |
| --------- | ------------------ | ------------ | ---------------------------- |
| `checked` | `true`, `false`    | `false`      | Выбранное состояние.         |
| `state`   | `default`, `hover` | `default`    | Визуальное состояние кнопки. |

## Использует компоненты

| Компонент      | Связь           | Роль         |
| -------------- | --------------- | ------------ |
| `ic thumbs-up` | Nested instance | Иконка like. |
