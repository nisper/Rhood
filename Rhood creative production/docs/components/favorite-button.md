# Favorite button

```json
{
  "name": "Favorite button",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10225-1705&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm", "xsm"], "default": "md" },
      "style": { "values": ["secondary", "ghost"], "default": "secondary" },
      "checked": { "values": [false, true], "default": false },
      "hasOnlyIcon": { "values": [false, true], "default": false },
      "state": { "values": ["default", "hovered"], "default": "default" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "ic favorite_outline",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка до добавления в избранное."
    },
    {
      "component": "ic favorite_filled",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка после добавления в избранное."
    }
  ],
  "usage_rules": {
    "checked": "checked=false — объект не в избранном; checked=true — объект в избранном.",
    "hasOnlyIcon": "hasOnlyIcon=false — кнопка с label; hasOnlyIcon=true — кнопка только с иконкой."
  }
}
```

`Favorite button` — кнопка для добавления объекта в избранное и удаления из него; может показываться с label или только с иконкой.

## Сводка компонента

| Параметр      | Значения             | По умолчанию | Что задаёт                           |
| ------------- | -------------------- | ------------ | ------------------------------------ |
| `size`        | `md`, `sm`, `xsm`    | `md`         | Размер кнопки.                       |
| `style`       | `secondary`, `ghost` | `secondary`  | Визуальный стиль кнопки.             |
| `checked`     | `false`, `true`      | `false`      | Состояние избранного.                |
| `hasOnlyIcon` | `false`, `true`      | `false`      | Кнопка с label или только с иконкой. |
| `state`       | `default`, `hovered` | `default`    | Визуальное состояние кнопки.         |

## Использует компоненты

| Компонент             | Связь           | Роль                                 |
| --------------------- | --------------- | ------------------------------------ |
| `ic favorite_outline` | Nested instance | Иконка до добавления в избранное.    |
| `ic favorite_filled`  | Nested instance | Иконка после добавления в избранное. |

## Правила применения

- `checked=false` — объект не в избранном;
- `checked=true` — объект в избранном;
- `hasOnlyIcon=false` — кнопка с label;
- `hasOnlyIcon=true` — кнопка только с иконкой.
