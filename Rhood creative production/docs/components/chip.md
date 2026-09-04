# Chip

```json
{
  "name": "chip",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=1653-28207&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["lg", "md", "sm"], "default": "md" },
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
        "default": "contrast"
      }
    },
    "component_properties": {
      "thumbnail": { "type": "boolean", "default": true },
      "icon": { "type": "boolean", "default": true },
      "label": { "type": "boolean", "default": true },
      "remove": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "avatar",
      "documentation": "avatar.md",
      "relation": "nested instance",
      "role": "Thumbnail Chip при thumbnail=true."
    },
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка Chip по умолчанию."
    },
    {
      "component": "ic circle-x",
      "documentation": "",
      "relation": "nested instance",
      "role": "Удаление Chip при remove=true."
    }
  ],
  "usage_rules": {
    "role": "Chip не является input-component: он показывает выбранное значение или дополнительную информацию.",
    "content": "thumbnail, icon, label и remove независимо управляют составом Chip.",
    "remove": "remove=true используй, когда выбранное значение можно удалить."
  }
}
```

`Chip` — метка для выбранного значения или дополнительной информации. Он не является input-component и не меняет состояние по нажатию.

## Сводка компонента

| Параметр    | Значения                                                      | По умолчанию | Что задаёт                  |
| ----------- | ------------------------------------------------------------- | ------------ | --------------------------- |
| `size`      | `lg`, `md`, `sm`                                              | `md`         | Размер Chip.                |
| `color`     | `neutral`, `brand`, `error`, `warning`, `success`, `contrast` | `neutral`    | Семантический цвет Chip.    |
| `style`     | `outlined`, `muted`, `contrast`                               | `contrast`   | Визуальный стиль Chip.      |
| `thumbnail` | `true`, `false`                                               | `true`       | Наличие thumbnail с Avatar. |
| `icon`      | `true`, `false`                                               | `true`       | Наличие иконки.             |
| `label`     | `true`, `false`                                               | `true`       | Наличие текстовой метки.    |
| `remove`    | `true`, `false`                                               | `true`       | Наличие действия удаления.  |

## Размеры

| `size` | Min-width |
| ------ | --------- |
| `lg`   | 40 px.    |
| `md`   | 32 px.    |
| `sm`   | 26 px.    |

## Использует компоненты

| Компонент           | Связь           | Роль                                 |
| ------------------- | --------------- | ------------------------------------ |
| [Avatar](avatar.md) | Nested instance | Thumbnail Chip при `thumbnail=true`. |
| `ic star`           | Nested instance | Иконка Chip по умолчанию.            |
| `ic circle-x`       | Nested instance | Удаление Chip при `remove=true`.     |

## Правила применения

- Chip показывает выбранное значение или дополнительную информацию, но не используется для выбора значения;
- `thumbnail`, `icon`, `label` и `remove` независимо управляют составом Chip;
- `remove=true` включай, когда выбранное значение можно удалить.
