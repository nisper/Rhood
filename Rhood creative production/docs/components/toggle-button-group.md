# toggle button-group

```json
{
  "name": "toggle button-group",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=8827-1349&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["lg", "md", "sm"], "default": "lg" },
      "color": { "values": ["neutral", "contrast"], "default": "neutral" }
    },
    "component_properties": {
      "content": {
        "type": "slot",
        "default": null,
        "figma_key": "content#10354:0"
      }
    }
  },
  "dependencies": [
    {
      "component": "toggle button",
      "documentation": "toggle-button.md",
      "relation": "nested instance",
      "role": "Кнопки внутри группы."
    },
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка внутри toggle button.",
      "note": "Instance называется ic star, но его main component называется star. Нужно проверить источник иконки."
    }
  ],
  "usage_rules": {
    "size": "size задаёт размер всех toggle button внутри группы.",
    "color": "color=neutral или color=contrast задаёт цветовую семантику группы и её кнопок.",
    "content": "content заменяет две toggle button по умолчанию собственным содержимым.",
    "selection": "Выбор и состояние отдельных кнопок настраиваются через nested instances toggle button.",
    "usage": "Использовать только как альтернативную версию компонента tab, пока пользователь не скажет иного."
  },
  "open_questions": [
    "Nested instance иконки называется ic star, но его main component называется star. Нужно проверить, что используется актуальная иконка из Parser – Lucide icons."
  ]
}
```

`toggle button-group` — группа связанных toggle button для выбора одного из вариантов.

## Сводка компонента

| Параметр  | Значения              | По умолчанию | Что задаёт                                                |
| --------- | --------------------- | ------------ | --------------------------------------------------------- |
| `size`    | `lg`, `md`, `sm`      | `lg`         | Размер кнопок в группе.                                   |
| `color`   | `neutral`, `contrast` | `neutral`    | Семантический цвет группы.                                |
| `content` | Slot                  | `null`       | Собственное содержимое группы вместо кнопок по умолчанию. |

## Использует компоненты

| Компонент                         | Связь           | Роль                                                           |
| --------------------------------- | --------------- | -------------------------------------------------------------- |
| [toggle button](toggle-button.md) | Nested instance | Кнопки внутри группы.                                          |
| `ic star`                         | Nested instance | Иконка внутри toggle button; main component называется `star`. |

## Правила использования

- Использовать только как альтернативную версию [[docs/components/tab.md|tab]], пока пользователь не скажет иного.
