# Checkbox

```json
{
  "name": "Checkbox",
  "type": "component set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=405-3391&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": {
    "variant_properties": {
      "size": { "values": ["md", "sm"], "default": "md" },
      "checked": { "values": [false, true], "default": false },
      "indeterminate": { "values": [false, true], "default": false },
      "disabled": { "values": [false, true], "default": false },
      "error": { "values": [false, true], "default": false },
      "state": { "values": ["default", "hovered"], "default": "default" },
      "skeleton": { "values": [false, true], "default": false }
    },
    "component_properties": { "label": { "type": "boolean", "default": true } }
  },
  "dependencies": [
    {
      "component": "Skeleton",
      "documentation": "",
      "relation": "nested instance",
      "role": "Заглушка Checkbox при skeleton=true."
    },
    {
      "component": "ic square",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка невыбранного Checkbox."
    },
    {
      "component": "ic square-check",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка выбранного Checkbox."
    },
    {
      "component": "ic square-minus",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка неопределённого состояния."
    }
  ],
  "usage_rules": {
    "checked": "checked=true — выбранное состояние.",
    "indeterminate": "indeterminate=true используй только вместе с checked=true для группового частичного выбора.",
    "skeleton": "skeleton=true — состояние загрузки: использует вложенный Skeleton вместо label и checkbox-иконки."
  }
}
```

`Checkbox` — компонент для одиночного выбора и выбора нескольких элементов в группе.

## Сводка компонента

| Параметр        | Значения             | По умолчанию | Что задаёт                                  |
| --------------- | -------------------- | ------------ | ------------------------------------------- |
| `size`          | `md`, `sm`           | `md`         | Размер Checkbox и вертикальные отступы.     |
| `checked`       | `false`, `true`      | `false`      | Выбранное состояние.                        |
| `indeterminate` | `false`, `true`      | `false`      | Неопределённое состояние группового выбора. |
| `disabled`      | `false`, `true`      | `false`      | Доступность Checkbox.                       |
| `error`         | `false`, `true`      | `false`      | Ошибочное состояние невыбранного Checkbox.  |
| `state`         | `default`, `hovered` | `default`    | Визуальное состояние.                       |
| `skeleton`      | `false`, `true`      | `false`      | Состояние загрузки.                         |
| `label`         | `true`, `false`      | `true`       | Наличие подписи.                            |

## Использует компоненты

| Компонент         | Связь           | Роль                                   |
| ----------------- | --------------- | -------------------------------------- |
| `Skeleton`        | Nested instance | Заглушка Checkbox при `skeleton=true`. |
| `ic square`       | Nested instance | Иконка невыбранного Checkbox.          |
| `ic square-check` | Nested instance | Иконка выбранного Checkbox.            |
| `ic square-minus` | Nested instance | Иконка неопределённого состояния.      |

## Правила применения

- `checked=true` — выбранное состояние;
- `indeterminate=true` используй только вместе с `checked=true` для группового частичного выбора;
- `skeleton=true` — состояние загрузки: Checkbox использует вложенный Skeleton вместо label и checkbox-иконки.
