# onboarding tooltip

```json
{
  "name": "onboarding tooltip",
  "type": "component",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=913-6350&t=4o9n7IZTZdcMV6po-11"
  },
  "figma": {
    "variant_properties": {},
    "component_properties": {
      "bottomArrow": {
        "type": "boolean",
        "default": false,
        "figma_key": "bottomArrow#2794:125"
      },
      "topArrow": {
        "type": "boolean",
        "default": true,
        "figma_key": "topArrow#2794:126"
      },
      "leftArrow": {
        "type": "boolean",
        "default": false,
        "figma_key": "leftArrow#2954:0"
      },
      "rightArrow": {
        "type": "boolean",
        "default": false,
        "figma_key": "rightArrow#2954:1"
      }
    }
  },
  "dependencies": [
    {
      "component": "button",
      "documentation": "buttons.md",
      "relation": "nested instance",
      "role": "Действие в onboarding tooltip."
    },
    {
      "component": "icon button",
      "documentation": "icon-buttons.md",
      "relation": "nested instance",
      "role": "Кнопки перехода назад и вперёд."
    },
    {
      "component": "ic circle-check",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконка подтверждения."
    },
    {
      "component": "ic star",
      "documentation": "",
      "relation": "nested instance",
      "role": "Иконки перехода назад и вперёд.",
      "note": "Оба instances называются ic star, но их main components называются chevron-left и chevron-right."
    }
  ],
  "usage_rules": {
    "arrows": "topArrow, bottomArrow, leftArrow и rightArrow управляют направлением указателя tooltip.",
    "navigation": "back и forward используются для перехода между шагами onboarding.",
    "content": "Компонент содержит текст, иконку подтверждения и действия навигации."
  },
  "open_questions": [
    "Instances стрелочных иконок называются ic star, хотя их main components — chevron-left и chevron-right. Нужно переименовать instances в ic chevron-left и ic chevron-right и проверить источник иконок."
  ]
}
```

`onboarding tooltip` — подсказка для пошагового onboarding с указателем и навигацией.

## Сводка компонента

| Параметр      | Значения        | По умолчанию | Что задаёт        |
| ------------- | --------------- | ------------ | ----------------- |
| `bottomArrow` | `true`, `false` | `false`      | Указатель снизу.  |
| `topArrow`    | `true`, `false` | `true`       | Указатель сверху. |
| `leftArrow`   | `true`, `false` | `false`      | Указатель слева.  |
| `rightArrow`  | `true`, `false` | `false`      | Указатель справа. |

## Использует компоненты

| Компонент                          | Связь           | Роль                                                       |
| ---------------------------------- | --------------- | ---------------------------------------------------------- |
| [button](buttons.md)               | Nested instance | Действие onboarding tooltip.                               |
| [UI Icon Buttons](icon-buttons.md) | Nested instance | Переход назад и вперёд.                                    |
| `ic circle-check`                  | Nested instance | Иконка подтверждения.                                      |
| `ic star`                          | Nested instance | Иконка back; main component называется `chevron-left`.     |
| `ic star`                          | Nested instance | Иконка forward; main component называется `chevron-right`. |

## Открытые вопросы

- Instances стрелочных иконок называются `ic star`, хотя их main components — `chevron-left` и `chevron-right`. Нужно переименовать instances в `ic chevron-left` и `ic chevron-right` и проверить источник иконок.
