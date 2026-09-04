# Page heading

```json
{
  "name": "Page heading",
  "type": "component",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10512-364&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {},
    "component_properties": {
      "back": { "type": "boolean", "default": true },
      "secondaryText": { "type": "boolean", "default": true },
      "rightSlot": { "type": "boolean", "default": true },
      "disGutters": { "type": "boolean", "default": false },
      "children": { "type": "slot", "default": null }
    }
  },
  "dependencies": [
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Кнопка возврата с ic chevron-left при back=true."
    }
  ],
  "usage_rules": {
    "gutters": "disGutters=false применяет layout/edge-to-edge/wrapper. disGutters=true используй, когда боковые поля уже задаёт родитель.",
    "back": "back=true показывает кнопку возврата.",
    "secondaryText": "secondaryText=true показывает подзаголовок.",
    "rightSlot": "rightSlot=true показывает children справа."
  }
}
```

`Page heading` — заголовок страницы с кнопкой возврата, подзаголовком и действием справа.

## Сводка компонента

| Параметр        | Значения        | По умолчанию | Что задаёт                             |
| --------------- | --------------- | ------------ | -------------------------------------- |
| `back`          | `false`, `true` | `true`       | Видимость кнопки возврата.             |
| `secondaryText` | `false`, `true` | `true`       | Видимость подзаголовка.                |
| `rightSlot`     | `false`, `true` | `true`       | Видимость области для действия справа. |
| `disGutters`    | `false`, `true` | `false`      | Применение внешних боковых полей.      |
| `children`      | Slot            |              | Вложенное действие справа.             |

## Использует компоненты

| Компонент                          | Связь           | Роль                                                 |
| ---------------------------------- | --------------- | ---------------------------------------------------- |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Кнопка возврата с `ic chevron-left` при `back=true`. |

## Правила применения

- `disGutters=false` применяет `layout/edge-to-edge/wrapper`;
- `disGutters=true` используй, когда боковые поля уже задаёт родитель;
- `back=true` показывает кнопку возврата;
- `secondaryText=true` показывает подзаголовок;
- Передавай действие справа через `children`, если `rightSlot=true`.
