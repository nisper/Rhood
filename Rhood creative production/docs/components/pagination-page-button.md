# Pagination / Page button

```json
{
  "name": "Pagination / Page button",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=3416-13658&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "state": {
        "values": ["default", "hover", "checked"],
        "default": "default"
      }
    },
    "component_properties": {}
  },
  "dependencies": [],
  "usage_rules": {
    "context": "Используй только как nested instance внутри Pagination при type=pages.",
    "state": "state=checked обозначает текущую страницу; state=hover — состояние при наведении."
  }
}
```

`Pagination / Page button` — кнопка отдельной страницы в пагинации.

## Сводка компонента

| Параметр | Значения                      | По умолчанию | Что задаёт                 |
| -------- | ----------------------------- | ------------ | -------------------------- |
| `state`  | `default`, `hover`, `checked` | `default`    | Состояние кнопки страницы. |

## Правила применения

- Используй только как nested instance внутри [Pagination](pagination.md) при `type=pages`;
- `state=checked` обозначает текущую страницу;
- `state=hover` — состояние при наведении.
