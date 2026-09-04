# Module title

```json
{
  "name": "Module title",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=3514-11&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["H4", "H5", "H6"], "default": "H4" }
    },
    "component_properties": {
      "secondary": { "type": "boolean", "default": true },
      "isLoading": { "type": "boolean", "default": false },
      "showSlot": { "type": "boolean", "default": true },
      "children": { "type": "slot", "default": null }
    }
  },
  "dependencies": [],
  "usage_rules": {
    "size": "size задаёт типографику заголовка и высоту skeleton.",
    "secondary": "secondary=true показывает подзаголовок.",
    "isLoading": "isLoading=true скрывает текст и children, показывая skeleton.",
    "children": "children — единый slot для вложенного действия справа; он показывается при showSlot=true и isLoading=false."
  }
}
```

`Module title` — заголовок модуля с опциональным подзаголовком, действием справа и состоянием загрузки.

## Сводка компонента

| Параметр    | Значения         | По умолчанию | Что задаёт                               |
| ----------- | ---------------- | ------------ | ---------------------------------------- |
| `size`      | `H4`, `H5`, `H6` | `H4`         | Типографику заголовка и высоту skeleton. |
| `secondary` | `false`, `true`  | `true`       | Видимость подзаголовка.                  |
| `isLoading` | `false`, `true`  | `false`      | Состояние загрузки вместо содержимого.   |
| `showSlot`  | `false`, `true`  | `true`       | Видимость области для действия справа.   |
| `children`  | Slot             |              | Вложенное действие справа.               |

## Правила применения

- `size` задаёт типографику заголовка и высоту skeleton;
- `secondary=true` показывает подзаголовок;
- `isLoading=true` скрывает текст и `children`, показывая skeleton;
- Передавай действие справа через единый `children` slot;
- `children` показывается только при `showSlot=true` и `isLoading=false`.
