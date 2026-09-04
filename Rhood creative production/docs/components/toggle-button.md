# toggle button

```json
{
  "name": "toggle button",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=8899-2485&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["lg", "md", "sm"], "default": "lg" },
      "disabled": { "values": ["false", "true"], "default": "false" },
      "selected": { "values": ["false", "true"], "default": "true" },
      "state": { "values": ["default", "hover"], "default": "default" },
      "color": { "values": ["neutral", "contrast"], "default": "neutral" }
    },
    "component_properties": {
      "label": {
        "type": "boolean",
        "default": true,
        "figma_key": "label#504:173"
      },
      "icon": {
        "type": "boolean",
        "default": true,
        "figma_key": "icon#504:186"
      }
    }
  },
  "dependencies": [
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка при icon=true.",
      "note": "Instance называется ic star, но его main component называется star. Нужно проверить источник иконки."
    }
  ],
  "usage_rules": {
    "selected": "selected=true показывает выбранную кнопку; selected=false — невыбранную.",
    "state": "state=default или state=hover задаёт состояние кнопки.",
    "disabled": "disabled=true делает кнопку недоступной; в component set для disabled представлен default-вариант с selected=false.",
    "content": "label и icon независимо управляют текстом и иконкой.",
    "color": "color=neutral и color=contrast задают семантическую поверхность toggle button."
  },
  "open_questions": [
    "Nested instance называется ic star, но его main component называется star. Нужно проверить, что используется актуальная иконка из Parser – Lucide icons."
  ]
}
```

`toggle button` — кнопка-переключатель с состоянием выбора.

## Сводка компонента

| Параметр   | Значения              | По умолчанию | Что задаёт                        |
| ---------- | --------------------- | ------------ | --------------------------------- |
| `size`     | `lg`, `md`, `sm`      | `lg`         | Размер кнопки.                    |
| `disabled` | `false`, `true`       | `false`      | Недоступность кнопки.             |
| `selected` | `false`, `true`       | `true`       | Выбранное состояние.              |
| `state`    | `default`, `hover`    | `default`    | Состояние взаимодействия.         |
| `color`    | `neutral`, `contrast` | `neutral`    | Семантическую поверхность кнопки. |
| `label`    | `true`, `false`       | `true`       | Наличие текста.                   |
| `icon`     | `true`, `false`       | `true`       | Наличие иконки.                   |

## Использует компоненты

| Компонент | Связь           | Роль                                                      |
| --------- | --------------- | --------------------------------------------------------- |
| `ic star` | Nested instance | Иконка при `icon=true`; main component называется `star`. |

## Открытые вопросы

- Nested instance называется `ic star`, но его main component называется `star`. Нужно проверить, что используется актуальная иконка из `Parser – Lucide icons`.
