# Toggle chip

```json
{
  "name": "Toggle chip",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=1336-8438&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["lg", "md", "sm"], "default": "lg" },
      "checked": { "values": [false, true], "default": false },
      "style": { "values": ["secondary", "ghost", "contrast"], "default": "secondary" }
    },
    "component_properties": {
      "thumbnail": { "type": "boolean", "default": true },
      "icon": { "type": "boolean", "default": true },
      "label": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "avatar",
      "documentation": "avatar.md",
      "relation": "nested instance",
      "role": "Thumbnail Toggle chip при thumbnail=true."
    },
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "icon Toggle chip по умолчанию."
    }
  ],
  "usage_rules": {
    "role": "Toggle chip — input-component для выбора одного или нескольких значений.",
    "checked": "checked=true — выбранное состояние; checked=false — невыбранное.",
    "content": "thumbnail, icon и label независимо управляют составом Toggle chip."
  }
}
```

`Toggle chip` — input-component для выбора одного или нескольких значений. Используется в фильтрах и других формах.

## Сводка компонента

| Параметр    | Значения                         | По умолчанию | Что задаёт                           |
| ----------- | -------------------------------- | ------------ | ------------------------------------ |
| `size`      | `lg`, `md`, `sm`                 | `lg`         | Размер Toggle chip.                  |
| `checked`   | `false`, `true`                  | `false`      | Невыбранное или выбранное состояние. |
| `style`     | `secondary`, `ghost`, `contrast` | `secondary`  | Визуальный стиль Toggle chip.        |
| `thumbnail` | `true`, `false`                  | `true`       | Наличие thumbnail с Avatar.          |
| `icon`      | `true`, `false`                  | `true`       | Наличие icon.                        |
| `label`     | `true`, `false`                  | `true`       | Наличие текстовой метки.             |

## Размеры

| `size` | Min-width |
| ------ | --------- |
| `lg`   | 40 px.    |
| `md`   | 32 px.    |
| `sm`   | 26 px.    |

## Использует компоненты

| Компонент           | Связь           | Роль                                        |
| ------------------- | --------------- | ------------------------------------------- |
| [Avatar](avatar.md) | Nested instance | Thumbnail Toggle chip при `thumbnail=true`. |
| `ic star`           | Nested instance | icon Toggle chip по умолчанию.              |

## Правила применения

- Используй Toggle chip для выбора значения, а не для отображения уже выбранного значения;
- `checked=true` — выбранное состояние;
- `checked=false` — невыбранное состояние;
- `thumbnail`, `icon` и `label` независимо управляют составом Toggle chip.
