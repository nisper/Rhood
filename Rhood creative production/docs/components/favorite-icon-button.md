# Favorite icon button

```json
{
  "name": "Favorite icon button",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=968-779&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm", "xsm"], "default": "md" },
      "checked": { "values": [false, true], "default": false },
      "state": { "values": ["default", "hovered"], "default": "default" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "ic heart",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка действия до добавления в избранное."
    },
    {
      "component": "ic heart-filled",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка после добавления в избранное."
    }
  ],
  "usage_rules": {
    "checked": "checked=false — объект не в избранном; checked=true — объект в избранном."
  }
}
```

`Favorite icon button` — компактное действие для добавления объекта в избранное и удаления из него.

## Сводка компонента

| Параметр  | Значения             | По умолчанию | Что задаёт                   |
| --------- | -------------------- | ------------ | ---------------------------- |
| `size`    | `md`, `sm`, `xsm`    | `md`         | Размер кнопки и иконки.      |
| `checked` | `false`, `true`      | `false`      | Состояние избранного.        |
| `state`   | `default`, `hovered` | `default`    | Визуальное состояние кнопки. |

## Использует компоненты

| Компонент         | Связь           | Роль                                       |
| ----------------- | --------------- | ------------------------------------------ |
| `ic heart`        | Nested instance | Иконка действия до добавления в избранное. |
| `ic heart-filled` | Nested instance | Иконка после добавления в избранное.       |

## Правила применения

- `checked=false` — объект не в избранном;
- `checked=true` — объект в избранном.
