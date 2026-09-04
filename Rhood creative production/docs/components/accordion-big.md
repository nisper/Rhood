# Accordion big

```json
{
  "name": "Accordion big",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=3288-2986&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "expanded": { "values": ["false", "true"], "default": "false" }
    },
    "component_properties": { "body": { "type": "boolean", "default": true } }
  },
  "dependencies": [
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
    "body": "body влияет только при expanded=true."
  }
}
```

`Accordion big` — крупный accordion с отдельной поверхностью, заголовком и опциональным body.

## Сводка компонента

| Параметр   | Значения        | По умолчанию | Что задаёт                                                   |
| ---------- | --------------- | ------------ | ------------------------------------------------------------ |
| `expanded` | `false`, `true` | `false`      | Свёрнутое или раскрытое состояние и соответствующий chevron. |
| `body`     | `true`, `false` | `true`       | Наличие body в раскрытом состоянии.                          |

## Использует компоненты

| Компонент         | Связь           | Роль                            |
| ----------------- | --------------- | ------------------------------- |
| `ic chevron-down` | Nested instance | Индикатор свёрнутого состояния. |
| `ic chevron-up`   | Nested instance | Индикатор раскрытого состояния. |

## Правила применения

- `expanded=false` — свёрнутое состояние;
- `expanded=true` — раскрытое состояние;
- `body=true` показывает body только при `expanded=true`.
