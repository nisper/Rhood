# Drawer

```json
{
  "name": "drawer",
  "type": "component",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-14220&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {},
    "component_properties": { "children": { "type": "slot", "default": null } }
  },
  "dependencies": [
    {
      "component": "Modal header",
      "documentation": "modal-header.md",
      "relation": "nested instance",
      "role": "Фиксированная шапка Drawer."
    },
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Фиксированные действия в нижней части Drawer."
    }
  ],
  "usage_rules": {
    "children": "children задаёт прокручиваемое содержимое body.",
    "structure": "Drawer содержит фиксированные header и actions; body между ними прокручивается.",
    "reuse": "Используй готовый Drawer, не собирай боковую поверхность из отдельных фреймов."
  }
}
```

`Drawer` — боковая поверхность с фиксированной шапкой и нижними действиями.

## Сводка компонента

| Параметр   | Значения | По умолчанию | Что задаёт                        |
| ---------- | -------- | ------------ | --------------------------------- |
| `children` | Slot     |              | Прокручиваемое содержимое Drawer. |

## Использует компоненты

| Компонент                       | Связь           | Роль                                          |
| ------------------------------- | --------------- | --------------------------------------------- |
| [Modal header](modal-header.md) | Nested instance | Фиксированная шапка Drawer.                   |
| [UI Buttons](buttons.md)        | Nested instance | Фиксированные действия в нижней части Drawer. |

## Правила применения

- Передавай содержимое через `children`;
- Header и actions остаются фиксированными, а body между ними прокручивается;
- Используй готовый Drawer, не собирай боковую поверхность из отдельных фреймов.
