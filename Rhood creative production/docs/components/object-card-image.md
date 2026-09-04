# Object card image

```json
{
  "name": "Object card image",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-13870&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "skeleton": { "values": [false, true], "default": false },
      "hasPhoto": { "values": [false, true], "default": true },
      "hover": { "values": [false, true], "default": false },
      "sold": { "values": [false, true], "default": false },
      "brokenImage": { "values": [false, true], "default": false }
    },
    "component_properties": {
      "favorite": { "type": "boolean", "default": true },
      "delete": { "type": "boolean", "default": false }
    }
  },
  "dependencies": [
    {
      "component": "Favorite icon button",
      "documentation": "favorite-icon-button.md",
      "relation": "nested instance",
      "role": "Добавление объекта в избранное и удаление из него."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Переключение фотографий на hover и удаление объекта при delete=true."
    },
    {
      "component": "ic image",
      "documentation": "",
      "relation": "nested instance",
      "role": "Заглушка, когда hasPhoto=false и brokenImage=false."
    },
    {
      "component": "ic image-off",
      "documentation": "",
      "relation": "nested instance",
      "role": "Заглушка, когда hasPhoto=false и brokenImage=true."
    }
  ],
  "usage_rules": {
    "context": "Используй в карточке объекта в выдаче.",
    "skeleton": "skeleton=true показывает состояние загрузки изображения.",
    "sold": "sold=true затемняет фотографию.",
    "hover": "hover=true при hasPhoto=true показывает icon buttons с ic chevron-left и ic chevron-right для переключения фотографий объекта.",
    "favorite": "favorite=true показывает Favorite icon button.",
    "delete": "delete=true показывает действие удаления объекта из подборки.",
    "hasPhoto": "hasPhoto=false показывает заглушку; brokenImage определяет её вид."
  }
}
```

`Object card image` — изображение в карточке объекта в выдаче. Компонент показывает фотографию, её состояния и действия поверх изображения.

## Сводка компонента

| Параметр      | Значения        | По умолчанию | Что задаёт                               |
| ------------- | --------------- | ------------ | ---------------------------------------- |
| `skeleton`    | `false`, `true` | `false`      | Состояние загрузки изображения.          |
| `hasPhoto`    | `false`, `true` | `true`       | Наличие фотографии.                      |
| `hover`       | `false`, `true` | `false`      | Показ кнопок переключения фотографий.    |
| `sold`        | `false`, `true` | `false`      | Затемнение проданного объекта.           |
| `brokenImage` | `false`, `true` | `false`      | Вид заглушки при отсутствии фотографии.  |
| `favorite`    | `false`, `true` | `true`       | Видимость действия избранного.           |
| `delete`      | `false`, `true` | `false`      | Видимость действия удаления из подборки. |

## Использует компоненты

| Компонент                                       | Связь           | Роль                                                                   |
| ----------------------------------------------- | --------------- | ---------------------------------------------------------------------- |
| [Favorite icon button](favorite-icon-button.md) | Nested instance | Добавление объекта в избранное и удаление из него.                     |
| [UI Icon Buttons](icon-buttons.md)              | Nested instance | Переключение фотографий на hover и удаление объекта при `delete=true`. |
| `ic image`                                      | Nested instance | Заглушка, когда `hasPhoto=false` и `brokenImage=false`.                |
| `ic image-off`                                  | Nested instance | Заглушка, когда `hasPhoto=false` и `brokenImage=true`.                 |

## Правила применения

- Используй в карточке объекта в выдаче;
- `skeleton=true` показывает состояние загрузки изображения;
- `hasPhoto=false` показывает заглушку, а `brokenImage` определяет её вид;
- `sold=true` затемняет фотографию;
- `hover=true` при `hasPhoto=true` показывает `icon button` с `ic chevron-left` и `ic chevron-right` для переключения фотографий объекта;
- `favorite=true` показывает `Favorite icon button`;
- `delete=true` показывает действие удаления объекта из подборки.
