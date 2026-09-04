# Badge

```json
{
  "name": "Badge",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=351-15938&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "color": {
        "values": [
          "default",
          "primary",
          "error",
          "warning",
          "info",
          "success",
          "transparent",
          "white"
        ],
        "default": "default"
      },
      "border": { "values": [false, true], "default": false }
    },
    "component_properties": {}
  },
  "dependencies": [],
  "usage_rules": {
    "border": "border=true добавляет контрастный outline. Комбинации border=true и color=transparent нет.",
    "transparent": "color=transparent — вариант без фона."
  }
}
```

`Badge` — компактная метка для счётчика или короткого статуса.

## Сводка компонента

| Параметр | Значения                                                                            | По умолчанию | Что задаёт                |
| -------- | ----------------------------------------------------------------------------------- | ------------ | ------------------------- |
| `color`  | `default`, `primary`, `error`, `warning`, `info`, `success`, `transparent`, `white` | `default`    | Семантический цвет Badge. |
| `border` | `false`, `true`                                                                     | `false`      | Контрастный outline.      |

## Правила применения

- `color=transparent` используй, когда Badge нужен без фона;
- `border=true` добавляет контрастный outline;
- комбинации `border=true` и `color=transparent` нет.
