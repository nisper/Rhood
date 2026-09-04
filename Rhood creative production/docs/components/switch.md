# switch

```json
{
  "name": "switch",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10342-365&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "switchPosition": { "values": ["right", "left"], "default": "right" },
      "disabled": { "values": ["false", "true"], "default": "false" },
      "size": { "values": ["md", "sm"], "default": "md" },
      "checked": { "values": ["false", "true"], "default": "true" }
    },
    "component_properties": {
      "checked": { "type": "boolean", "default": true },
      "disabled": { "type": "boolean", "default": false },
      "icon": { "type": "boolean", "default": false },
      "label": { "type": "boolean", "default": true },
      "size": { "type": "variant", "default": "md" },
      "switchPosition": { "type": "variant", "default": "right" }
    }
  },
  "dependencies": [
    {
      "component": "stacks",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка label при icon=true.",
      "note": "Nested instance иконки не имеет префикса ic ."
    }
  ],
  "usage_rules": {
    "checked": "checked=true — включённое состояние; checked=false — выключенное состояние.",
    "disabled": "disabled=true — недоступное состояние.",
    "label": "label=true показывает текст label.",
    "icon": "icon=true показывает иконку слева от label.",
    "switchPosition": "switchPosition=right размещает switch справа от label; switchPosition=left — слева."
  },
  "open_questions": [
    "Nested instance иконки называется stacks, без обязательного префикса ic . Нужно привести имя к формату ic stacks или заменить на актуальный компонент из Parser – Lucide icons."
  ]
}
```

`switch` — переключатель с опциональными label и иконкой.

## Сводка компонента

| Параметр         | Значения        | По умолчанию | Что задаёт                            |
| ---------------- | --------------- | ------------ | ------------------------------------- |
| `switchPosition` | `right`, `left` | `right`      | Положение switch относительно label.  |
| `disabled`       | `false`, `true` | `false`      | Доступность switch.                   |
| `size`           | `md`, `sm`      | `md`         | Размер switch и label.                |
| `checked`        | `false`, `true` | `true`       | Включённое или выключенное состояние. |
| `icon`           | `true`, `false` | `false`      | Наличие иконки рядом с label.         |
| `label`          | `true`, `false` | `true`       | Наличие текста label.                 |

## Использует компоненты

| Компонент | Связь           | Роль                                                            |
| --------- | --------------- | --------------------------------------------------------------- |
| `stacks`  | Nested instance | Иконка label при `icon=true`. Instance не имеет префикса `ic `. |

## Открытые вопросы

- Nested instance иконки называется `stacks`, без обязательного префикса `ic `. Нужно привести имя к формату `ic stacks` или заменить на актуальный компонент из `Parser – Lucide icons`.
