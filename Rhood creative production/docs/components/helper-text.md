# helper text

```json
{
  "name": "helper text",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=351-2706&t=dXdC4YFLBloB6Ztr-11"
  },
  "figma": {
    "variant_properties": {
      "color": {
        "values": ["default", "error", "disabled", "warning"],
        "default": "default"
      }
    },
    "component_properties": {}
  },
  "dependencies": [],
  "usage_rules": {
    "color": "color задаёт смысл helper text: default — нейтральная подсказка, error — ошибка, disabled — недоступное поле, warning — предупреждение."
  }
}
```

`helper text` — вспомогательный текст под полем: подсказка, ошибка, предупреждение или текст для disabled-состояния.

## Сводка компонента

| Параметр | Значения                                  | По умолчанию | Что задаёт                |
| -------- | ----------------------------------------- | ------------ | ------------------------- |
| `color`  | `default`, `error`, `disabled`, `warning` | `default`    | Цвет и смысл helper text. |
