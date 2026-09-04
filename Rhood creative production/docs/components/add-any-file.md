# add any file

```json
{
  "name": "add any file",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-15621&t=4o9n7IZTZdcMV6po-11"
  },
  "figma": {
    "variant_properties": {
      "state": { "values": ["default", "active"], "default": "default" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Действие добавления файла."
    },
    {
      "component": "ic circle-check",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка успешного добавления файла."
    }
  ],
  "usage_rules": {
    "state": "state=default показывает обычное состояние; state=active — активное состояние добавления или перетаскивания файла.",
    "content": "Компонент показывает действие добавления файла и текстовую подсказку."
  }
}
```

`add any file` — зона добавления файла с обычным и активным состоянием.

## Сводка компонента

| Параметр | Значения            | По умолчанию | Что задаёт                       |
| -------- | ------------------- | ------------ | -------------------------------- |
| `state`  | `default`, `active` | `default`    | Состояние зоны добавления файла. |

## Использует компоненты

| Компонент            | Связь           | Роль                               |
| -------------------- | --------------- | ---------------------------------- |
| [button](buttons.md) | Nested instance | Действие добавления файла.         |
| `ic circle-check`    | Nested instance | Иконка успешного добавления файла. |
