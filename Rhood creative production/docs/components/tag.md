# tag

```json
{
  "name": "tag",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10252-5944&t=4o9n7IZTZdcMV6po-11"
  },
  "figma": {
    "variant_properties": {
      "color": {
        "values": [
          "neutral",
          "brand",
          "error",
          "warning",
          "success",
          "contrast"
        ],
        "default": "neutral"
      },
      "style": {
        "values": ["outlined", "muted", "contrast"],
        "default": "outlined"
      }
    },
    "component_properties": {
      "delete": {
        "type": "boolean",
        "default": true,
        "figma_key": "delete#3845:0"
      },
      "label": {
        "type": "boolean",
        "default": true,
        "figma_key": "label#4240:0"
      },
      "icon": {
        "type": "boolean",
        "default": false,
        "figma_key": "icon#10277:0"
      }
    }
  },
  "dependencies": [
    {
      "component": "ic view-cozy",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка слева при icon=true."
    },
    {
      "component": "ic x",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка удаления при delete=true."
    }
  ],
  "usage_rules": {
    "color": "color задаёт семантический цвет tag: neutral, brand, error, warning, success или contrast.",
    "style": "style=outlined показывает tag с outline; style=muted — с приглушённой заливкой; style=contrast — с контрастной заливкой.",
    "content": "icon, label и delete независимо управляют составом tag.",
    "delete": "delete=true показывает иконку удаления справа."
  }
}
```

`tag` — компактная метка с опциональной иконкой и действием удаления.

## Сводка компонента

| Параметр | Значения                                                      | По умолчанию | Что задаёт                      |
| -------- | ------------------------------------------------------------- | ------------ | ------------------------------- |
| `color`  | `neutral`, `brand`, `error`, `warning`, `success`, `contrast` | `neutral`    | Семантический цвет tag.         |
| `style`  | `outlined`, `muted`, `contrast`                               | `outlined`   | Визуальный стиль tag.           |
| `delete` | `true`, `false`                                               | `true`       | Наличие иконки удаления справа. |
| `label`  | `true`, `false`                                               | `true`       | Наличие текстовой метки.        |
| `icon`   | `true`, `false`                                               | `false`      | Наличие иконки слева.           |

## Использует компоненты

| Компонент      | Связь           | Роль                               |
| -------------- | --------------- | ---------------------------------- |
| `ic view-cozy` | Nested instance | Иконка слева при `icon=true`.      |
| `ic x`         | Nested instance | Иконка удаления при `delete=true`. |
