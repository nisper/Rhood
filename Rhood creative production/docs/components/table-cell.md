# table-cell

```json
{
  "name": "table-cell",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=414-3051&t=gIHs3x27CNjYvmlh-11"
  },
  "figma": {
    "variant_properties": {
      "role": { "values": ["body", "head"], "default": "head" },
      "type": {
        "values": ["text", "number", "skeleton", "checkbox"],
        "default": "checkbox"
      },
      "sizeSmall": { "values": [true, false], "default": false },
      "paddingX": { "values": [true, false], "default": true }
    },
    "component_properties": {
      "slot": { "type": "slot", "default": null },
      "sort": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "Checkbox",
      "documentation": "checkbox.md",
      "relation": "nested instance",
      "role": "Выбор всех строк при role=head и одной строки при role=body."
    },
    {
      "component": "Skeleton",
      "documentation": "",
      "relation": "nested instance",
      "role": "Заглушка загрузки при type=skeleton."
    },
    {
      "component": "help icon",
      "documentation": "help-icon.md",
      "relation": "nested instance",
      "role": "Подсказка в default content slot при role=head и type=text или type=number."
    },
    {
      "component": "ic square",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка внутри вложенного Checkbox."
    }
  ],
  "usage_rules": {
    "role": "role=head — ячейка строки заголовков; role=body — ячейка строки данных.",
    "type": "type=text — текстовая ячейка; type=number — числовая ячейка с моноширинным текстом и выравниванием вправо; type=skeleton — состояние загрузки; type=checkbox — ячейка выбора.",
    "paddingX": "paddingX=true добавляет стандартные внутренние горизонтальные отступы. paddingX=false используй, когда отступы задаёт родитель.",
    "slot": "В type=text и type=number slot содержит содержимое ячейки. При role=head его default content — текст и help icon.",
    "sort": "sort=true показывает стрелку сортировки в правом верхнем углу ячейки. Используй её только для сортируемой ячейки заголовка.",
    "height": "Высота каждой ячейки — hug; высоту строки определяет самая высокая ячейка."
  }
}
```

`table-cell` — базовая ячейка таблицы для строк заголовков и данных.

## Сводка компонента

| Параметр    | Значения                                 | По умолчанию | Что задаёт                                            |
| ----------- | ---------------------------------------- | ------------ | ----------------------------------------------------- |
| `role`      | `body`, `head`                           | `head`       | Роль ячейки: в строке данных или в строке заголовков. |
| `type`      | `text`, `number`, `skeleton`, `checkbox` | `checkbox`   | Тип содержимого ячейки.                               |
| `paddingX`  | `false`, `true`                          | `true`       | Наличие внутренних горизонтальных отступов.           |
| `sizeSmall` | `false`, `true`                          | `false`      | Компактная высота ячейки.                             |
| `slot`      | Slot                                     |              | Содержимое ячейки для `type=text` и `type=number`.    |
| `sort`      | `false`, `true`                          | `true`       | Показывает стрелку сортировки в правом верхнем углу.   |

## Правила применения

- `role=head` используй в строке заголовков, `role=body` — в строке данных;
- `type=checkbox` с `role=head` выбирает все строки, с `role=body` — одну строку;
- В `type=text` и `type=number` добавляй содержимое в slot `slot`. При `role=head` его default content — текст и help icon;
- `paddingX=false` используй, когда горизонтальные отступы задаёт родитель;
- `sort=true` используй только в сортируемой ячейке заголовка;
- Высота каждой ячейки должна быть `hug`: высоту строки задаёт самая высокая ячейка.

## Использует компоненты

| Компонент                 | Связь           | Роль                                                                              |
| ------------------------- | --------------- | --------------------------------------------------------------------------------- |
| [Checkbox](checkbox.md)   | Nested instance | Выбор всех строк при `role=head` и одной строки при `role=body`.                  |
| `Skeleton`                | Nested instance | Заглушка загрузки при `type=skeleton`.                                            |
| [help icon](help-icon.md) | Nested instance | Подсказка в default content slot при `role=head` и `type=text` или `type=number`. |
| `ic square`               | Nested instance | Иконка внутри вложенного Checkbox.                                                |
