# show more

```json
{
  "name": "show more",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=8555-4017&t=ZYIUEr4BfCyyPDli-11"
  },
  "figma": {
    "variant_properties": {
      "style": { "values": ["secondary", "ghost"], "default": "secondary" },
      "expanded": { "values": ["false", "true"], "default": "false" },
      "size": { "values": ["md", "sm"], "default": "md" },
      "state": { "values": ["default", "hover"], "default": "default" }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "ic chevron-down",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор свёрнутого состояния при expanded=false."
    },
    {
      "component": "ic chevron-up",
      "documentation": "",
      "relation": "nested instance",
      "role": "Индикатор раскрытого состояния при expanded=true."
    }
  ],
  "usage_rules": {
    "purpose": "Используем для раскрытия продолжения уже показанного контента.",
    "label": "Label — «Читать дальше».",
    "expanded": "expanded=false показывает ic chevron-down; expanded=true показывает ic chevron-up."
  }
}
```

`show more` — действие для раскрытия продолжения уже показанного контента.

## Сводка компонента

| Параметр   | Значения             | По умолчанию | Что задаёт                                                   |
| ---------- | -------------------- | ------------ | ------------------------------------------------------------ |
| `style`    | `secondary`, `ghost` | `secondary`  | Визуальный стиль действия.                                   |
| `expanded` | `false`, `true`      | `false`      | Свёрнутое или раскрытое состояние и соответствующий chevron. |
| `size`     | `md`, `sm`           | `md`         | Размер действия.                                             |
| `state`    | `default`, `hover`   | `default`    | Визуальное состояние.                                        |

## Использует компоненты

| Компонент         | Связь           | Роль                                                 |
| ----------------- | --------------- | ---------------------------------------------------- |
| `ic chevron-down` | Nested instance | Индикатор свёрнутого состояния при `expanded=false`. |
| `ic chevron-up`   | Nested instance | Индикатор раскрытого состояния при `expanded=true`.  |

## Правила применения

- Используем для раскрытия продолжения уже показанного контента;
- label — «Читать дальше».
