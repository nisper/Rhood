# Object gallery preview

```json
{
  "name": "Object gallery preview",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-13915&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "resp": { "values": ["desk", "mob"], "default": "desk" },
      "slide": { "values": ["1", "2", "3"], "default": "1" }
    },
    "component_properties": {
      "backButton": { "type": "boolean", "default": false },
      "closeButton": { "type": "boolean", "default": false },
      "counter": { "type": "boolean", "default": true },
      "favorite": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "Chip",
      "documentation": "chip.md",
      "relation": "nested instance",
      "role": "Счётчик текущей фотографии."
    },
    {
      "component": "Favorite icon button",
      "documentation": "favorite-icon-button.md",
      "relation": "nested instance",
      "role": "Добавление объекта в избранное и удаление из него."
    },
    {
      "component": "chevron_left",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка локальной кнопки возврата."
    },
    {
      "component": "close",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка локальной кнопки закрытия."
    }
  ],
  "usage_rules": {
    "context": "Используй как большую фотографию объекта на странице объекта.",
    "resp": "resp=desk и resp=mob используют разные композиции preview.",
    "slide": "slide задаёт текущую фотографию в preview.",
    "counter": "counter=true показывает номер текущей фотографии.",
    "backButton": "backButton=true показывает кнопку возврата на mobile.",
    "closeButton": "closeButton=true показывает кнопку закрытия на mobile.",
    "favorite": "favorite=true показывает Favorite icon button на mobile.",
    "fullscreen": "Нажатие на preview открывает полноэкранный просмотрщик фотографий."
  }
}
```

`Object gallery preview` — большая фотография объекта на странице объекта. Нажатие на неё открывает полноэкранный просмотрщик фотографий.

## Сводка компонента

| Параметр      | Значения        | По умолчанию | Что задаёт                                 |
| ------------- | --------------- | ------------ | ------------------------------------------ |
| `resp`        | `desk`, `mob`   | `desk`       | Композицию preview для desktop или mobile. |
| `slide`       | `1`, `2`, `3`   | `1`          | Текущую фотографию в preview.              |
| `backButton`  | `false`, `true` | `false`      | Видимость кнопки возврата на mobile.       |
| `closeButton` | `false`, `true` | `false`      | Видимость кнопки закрытия на mobile.       |
| `counter`     | `false`, `true` | `true`       | Видимость счётчика фотографий.             |
| `favorite`    | `false`, `true` | `true`       | Видимость действия избранного на mobile.   |

## Использует компоненты

| Компонент                                       | Связь           | Роль                                               |
| ----------------------------------------------- | --------------- | -------------------------------------------------- |
| [Chip](chip.md)                                 | Nested instance | Счётчик текущей фотографии.                        |
| [Favorite icon button](favorite-icon-button.md) | Nested instance | Добавление объекта в избранное и удаление из него. |
| `chevron_left`                                  | Nested instance | Иконка локальной кнопки возврата.                  |
| `close`                                         | Nested instance | Иконка локальной кнопки закрытия.                  |

## Правила применения

- Используй как большую фотографию объекта на странице объекта;
- `resp=desk` и `resp=mob` используют разные композиции preview;
- `slide` задаёт текущую фотографию в preview;
- `counter=true` показывает номер текущей фотографии;
- `backButton=true` показывает кнопку возврата на mobile;
- `closeButton=true` показывает кнопку закрытия на mobile;
- `favorite=true` показывает `Favorite icon button` на mobile;
- Нажатие на preview открывает полноэкранный просмотрщик фотографий.
