# add photos

```json
{
  "name": "add photos",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-15612&t=4o9n7IZTZdcMV6po-11"
  },
  "figma": {
    "variant_properties": {
      "state": { "values": ["default", "hover"], "default": "default" },
      "isLoad": { "values": ["false", "true"], "default": "false" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "ic image-plus",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка добавления фотографий при isLoad=false."
    },
    {
      "component": "ic loader-circle",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор загрузки при isLoad=true."
    }
  ],
  "usage_rules": {
    "state": "state=default показывает обычное состояние; state=hover — состояние наведения.",
    "isLoad": "isLoad=true показывает состояние загрузки вместо действия добавления фотографий."
  },
  "open_questions": [
    "В component set отсутствует комбинация state=hover и isLoad=true. Нужно подтвердить, что hover не нужен во время загрузки."
  ]
}
```

`add photos` — плитка для добавления фотографий с состоянием загрузки.

## Сводка компонента

| Параметр | Значения           | По умолчанию | Что задаёт                     |
| -------- | ------------------ | ------------ | ------------------------------ |
| `state`  | `default`, `hover` | `default`    | Состояние наведения.           |
| `isLoad` | `false`, `true`    | `false`      | Состояние загрузки фотографий. |

## Использует компоненты

| Компонент          | Связь           | Роль                          |
| ------------------ | --------------- | ----------------------------- |
| `ic image-plus`    | Nested instance | Иконка добавления фотографий. |
| `ic loader-circle` | Nested instance | Индикатор загрузки.           |

## Открытые вопросы

- В component set отсутствует комбинация `state=hover` и `isLoad=true`. Нужно подтвердить, что hover не нужен во время загрузки.
