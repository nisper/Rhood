# Accordion

```json
{
  "name": "Accordion",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=2487-11829&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "expanded": { "values": ["false", "true"], "default": "false" },
      "paddingX": { "values": ["false", "true"], "default": "true" }
    },
    "component_properties": {
      "icon": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "ic circle-question-mark",
      "documentation": "",
      "relation": "nested instance",
      "role": "Необязательная start icon."
    },
    {
      "component": "ic chevron-down",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор свёрнутого состояния."
    },
    {
      "component": "ic chevron-up",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор раскрытого состояния."
    }
  ],
  "usage_rules": {
    "expanded": "expanded=true — раскрытое состояние; expanded=false — свёрнутое.",
    "paddingX": "paddingX=true добавляет горизонтальные внутренние отступы; paddingX=false используем, когда их задаёт родительский контейнер."
  }
}
```

`Accordion` — строка управления раскрываемым блоком.

## Сводка компонента

| Параметр   | Значения        | По умолчанию | Что задаёт                                                   |
| ---------- | --------------- | ------------ | ------------------------------------------------------------ |
| `expanded` | `false`, `true` | `false`      | Свёрнутое или раскрытое состояние и соответствующий chevron. |
| `paddingX` | `false`, `true` | `true`       | Горизонтальные внутренние отступы.                           |
| `icon`     | `true`, `false` | `true`       | Наличие icon.                                                |

## Использует компоненты

| Компонент                 | Связь           | Роль                            |
| ------------------------- | --------------- | ------------------------------- |
| `ic circle-question-mark` | Nested instance | Необязательная start icon.      |
| `ic chevron-down`         | Nested instance | Индикатор свёрнутого состояния. |
| `ic chevron-up`           | Nested instance | Индикатор раскрытого состояния. |

## Правила применения

- `expanded=false` — свёрнутое состояние;
- `expanded=true` — раскрытое состояние;
- `paddingX=false` используем, когда горизонтальные отступы уже задаёт родительский контейнер;
- `icon=false` — когда контекст раскрываемого блока понятен без иконки.
