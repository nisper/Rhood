# Avatar

```json
{
  "name": "avatar",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=351-8845&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "type": {
        "values": ["image", "text", "icon", "skeleton"],
        "default": "image"
      },
      "size": { "values": ["40px", "32px", "24px", "20px"], "default": "40px" }
    },
    "component_properties": { "badge": { "type": "boolean", "default": false } }
  },
  "dependencies": [
    {
      "component": "ic user",
      "documentation": "",
      "relation": "nested instance",
      "role": "Стандартная иконка пользователя при type=icon."
    }
  ],
  "usage_rules": {
    "content": "type=image — для фото, type=text — для инициалов, type=icon — для стандартной иконки пользователя, type=skeleton — для загрузки.",
    "badge": "badge=true используем, когда нужен индикатор присутствия."
  }
}
```

`Avatar` — круглый компонент для представления пользователя: с фото, инициалами или стандартной иконкой.

## Сводка компонента

| Параметр | Значения                            | По умолчанию | Что задаёт                                      |
| -------- | ----------------------------------- | ------------ | ----------------------------------------------- |
| `type`   | `image`, `text`, `icon`, `skeleton` | `image`      | Тип содержимого аватара или состояние загрузки. |
| `size`   | `40px`, `32px`, `24px`, `20px`      | `40px`       | Размер аватара.                                 |
| `badge`  | `true`, `false`                     | `false`      | Индикатор присутствия.                          |

## Использует компоненты

| Компонент | Связь           | Роль                                             |
| --------- | --------------- | ------------------------------------------------ |
| `ic user` | Nested instance | Стандартная иконка пользователя при `type=icon`. |

## Правила применения

- `type=image` — для фотографии пользователя;
- `type=text` — для инициалов, когда фотографии нет;
- `type=icon` — для стандартного представления пользователя;
- `type=skeleton` — для загрузки аватара;
- `badge=true` включаем, когда нужен индикатор присутствия.
