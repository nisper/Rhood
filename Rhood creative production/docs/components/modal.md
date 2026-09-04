# Modal

```json
{
  "name": "modal",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-14068&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "resp": { "values": ["desk", "mob"], "default": "desk" }
    },
    "component_properties": {
      "children": { "type": "slot", "default": null },
      "closeButton": { "type": "boolean", "default": true }
    }
  },
  "dependencies": [
    {
      "component": "Modal top",
      "documentation": "modal-top.md",
      "relation": "nested instance",
      "role": "Верхняя зона mobile bottom sheet при resp=mob."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Закрытие Modal на desktop при closeButton=true."
    }
  ],
  "usage_rules": {
    "resp": "resp=desk — отдельное окно; resp=mob — bottom sheet.",
    "children": "children задаёт содержимое Modal.",
    "closeButton": "closeButton=true показывает кнопку закрытия на desktop."
  }
}
```

`Modal` — контейнер для отдельного окна на desktop и bottom sheet на mobile.

## Сводка компонента

| Параметр      | Значения        | По умолчанию | Что задаёт                               |
| ------------- | --------------- | ------------ | ---------------------------------------- |
| `resp`        | `desk`, `mob`   | `desk`       | Композицию Modal для desktop или mobile. |
| `children`    | Slot            |              | Содержимое Modal.                        |
| `closeButton` | `false`, `true` | `true`       | Видимость кнопки закрытия на desktop.    |

## Использует компоненты

| Компонент                          | Связь           | Роль                                              |
| ---------------------------------- | --------------- | ------------------------------------------------- |
| [Modal top](modal-top.md)          | Nested instance | Верхняя зона mobile bottom sheet при `resp=mob`.  |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Закрытие Modal на desktop при `closeButton=true`. |

## Правила применения

- `resp=desk` — отдельное окно;
- `resp=mob` — bottom sheet;
- Передавай содержимое через `children`;
- `closeButton=true` показывает кнопку закрытия на desktop.
