# Pagination

```json
{
  "name": "Pagination",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10970-7679&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "type": { "values": ["range", "pages", "load more"], "default": "range" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Переход назад и вперёд при type=range и type=pages."
    },
    {
      "component": "Pagination / Page button",
      "documentation": "pagination-page-button.md",
      "relation": "nested instance",
      "role": "Номера страниц при type=pages."
    },
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Подгрузка следующей части выдачи при type=load more."
    }
  ],
  "usage_rules": {
    "range": "type=range показывает переход назад и вперёд с диапазоном выданных результатов.",
    "pages": "type=pages показывает номера страниц, многоточия и переход назад/вперёд.",
    "load_more": "type=load more показывает кнопку для подгрузки следующей части выдачи."
  }
}
```

`Pagination` — навигация по частям выдачи.

## Сводка компонента

| Параметр | Значения                      | По умолчанию | Что задаёт                  |
| -------- | ----------------------------- | ------------ | --------------------------- |
| `type`   | `range`, `pages`, `load more` | `range`      | Способ навигации по выдаче. |

## Использует компоненты

| Компонент                                             | Связь           | Роль                                                    |
| ----------------------------------------------------- | --------------- | ------------------------------------------------------- |
| [UI Icon Buttons](icon-buttons.md)                    | Nested instance | Переход назад и вперёд при `type=range` и `type=pages`. |
| [Pagination / Page button](pagination-page-button.md) | Nested instance | Номера страниц при `type=pages`.                        |
| [UI Buttons](buttons.md)                              | Nested instance | Подгрузка следующей части выдачи при `type=load more`.  |

## Правила применения

- `type=range` показывает переход назад и вперёд с диапазоном выданных результатов;
- `type=pages` показывает номера страниц, многоточия и переход назад/вперёд;
- `type=load more` показывает кнопку для подгрузки следующей части выдачи.
