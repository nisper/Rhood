# Main header menu button

```json
{
  "name": "main header menu button",
  "type": "component_set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-13259&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "state": { "values": ["default", "hovered"], "default": "default" },
      "selected": { "values": [false, true], "default": false }
    },
    "component_properties": {
      "text": { "type": "text", "default": "Page menu button" },
      "new": { "type": "boolean", "default": true }
    }
  },
  "usage_rules": {
    "scope": "Используй только как nested instance Main header.",
    "selected": "У пункта текущего раздела задай selected=true.",
    "new": "Включай new только у раздела, который нужно дополнительно выделить."
  }
}
```

`Main header menu button` — пункт основной desktop-навигации внутри `Main header`.

## Сводка компонента

| Параметр           | Значения                  | По умолчанию       | Что задаёт                                            |
| ------------------ | ------------------------- | ------------------ | ----------------------------------------------------- |
| `name`             | `main header menu button` |                    | Имя компонента в Figma.                               |
| `type`             | `component_set`           |                    | Тип Figma-сущности: набор variants одного компонента. |
| `source.figma_url` | URL                       |                    | Ссылка на component set в Figma.                      |
| `state`            | `default`, `hovered`      | `default`          | Состояние пункта.                                     |
| `selected`         | `false`, `true`           | `false`            | Активность пункта.                                    |
| `text`             | Текст                     | `Page menu button` | Label пункта.                                         |
| `new`              | `false`, `true`           | `true`             | Видимость badge `НОВОЕ`.                              |

## Использование

- Используем только как nested instance внутри [Main header](main-header.md);
- Для каждого пункта вручную задаём `text`, `selected`, `new` и `state`;
- У текущего раздела включаем `selected=true`;
- Badge `НОВОЕ` включаем только у раздела, который нужно дополнительно выделить.
