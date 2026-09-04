# input phone

```json
{
  "name": "input phone",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11101-7309&t=64Qq6uwHdtCKN34B-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "empty": { "values": ["true", "false"], "default": "true" },
      "disabled": { "values": ["false", "true"], "default": "false" },
      "error": { "values": ["false", "true"], "default": "false" },
      "state": {
        "values": ["default", "hovered", "focused"],
        "default": "default"
      }
    },
    "component_properties": {
      "helperText": {
        "type": "boolean",
        "default": false,
        "figma_key": "helperText#351:14"
      },
      "label": {
        "type": "boolean",
        "default": true,
        "figma_key": "label#591:190"
      },
      "required": {
        "type": "boolean",
        "default": true,
        "figma_key": "required#2947:0"
      }
    }
  },
  "dependencies": [
    {
      "component": "helper text",
      "documentation": "helper-text.md",
      "relation": "nested instance",
      "role": "Вспомогательный текст при helperText=true."
    }
  ],
  "usage_rules": {
    "size": "size=md или size=sm задаёт размер поля.",
    "empty": "empty=true показывает пустое поле, empty=false — введённый номер.",
    "state": "state=default, hovered или focused задаёт состояние поля.",
    "required": "required=true показывает обязательность поля."
  }
}
```

`input phone` — поле для ввода номера телефона.

## Сводка компонента

| Параметр     | Значения                        | По умолчанию | Что задаёт                         |
| ------------ | ------------------------------- | ------------ | ---------------------------------- |
| `size`       | `md`, `sm`                      | `md`         | Размер поля.                       |
| `empty`      | `true`, `false`                 | `true`       | Наличие введённого номера.         |
| `disabled`   | `false`, `true`                 | `false`      | Недоступность поля.                |
| `error`      | `false`, `true`                 | `false`      | Ошибочное состояние.               |
| `state`      | `default`, `hovered`, `focused` | `default`    | Состояние взаимодействия.          |
| `helperText` | `true`, `false`                 | `false`      | Видимость вспомогательного текста. |
| `label`      | `true`, `false`                 | `true`       | Видимость подписи внутри поля.     |
| `required`   | `true`, `false`                 | `true`       | Обязательность поля.               |

## Использует компоненты

| Компонент | Связь | Роль |
| --- | --- | --- |
| [[docs/components/helper-text.md|helper text]] | Nested instance | Вспомогательный текст. |

## Связанные паттерны

- [[docs/patterns/phone.md|Phone]].
