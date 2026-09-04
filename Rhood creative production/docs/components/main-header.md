# Main header

```json
{
  "name": "main header",
  "type": "component_set",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-13285&m=dev"
  },
  "figma": {
    "variant_properties": {
      "resp": {
        "values": ["desk", "mob"],
        "default": "desk",
        "variable_binding": "resp/resp"
      }
    },
    "component_properties": {}
  },
  "dependencies": [
    {
      "component": "icon button",
      "documentation": "docs/components/icon-buttons.md",
      "relation": "nested_instance",
      "role": "Utility actions на desktop и burger на mobile."
    },
    {
      "component": "main header menu button",
      "documentation": "docs/components/main-header-menu-button.md",
      "relation": "nested_instance",
      "role": "Пункты основной desktop-навигации."
    },
    {
      "component": "avatar",
      "documentation": "docs/components/avatar.md",
      "relation": "nested_instance",
      "role": "Профиль пользователя на desktop."
    },
    {
      "component": "main menu mobile",
      "documentation": "docs/components/main-menu-mobile.md",
      "relation": "opens",
      "role": "Full-screen мобильная навигация по burger."
    }
  ],
  "structure": {
    "desk": {
      "children": [
        "logo",
        "main header menu button instances",
        "icon button instances",
        "avatar instance"
      ]
    },
    "mob": {
      "children": ["logo", "burger icon button instance"],
      "burger_destination": {
        "name": "main menu mobile",
        "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10932-9974&t=NyqpH4gpmutuQtjr-11",
        "type": "full_screen_mobile_navigation"
      }
    }
  },
  "nested_instance_overrides": {
    "main_header_menu_button": {
      "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10389-13259&t=NyqpH4gpmutuQtjr-11",
      "properties": ["text", "selected", "new", "state"]
    }
  },
  "usage_rules": {
    "responsive": "Свяжи variant property resp у instance с variable resp/resp. Не переключай variant вручную на каждом экране.",
    "navigation": "Настраивай пункты навигации через nested instances Main header menu button. Не пересобирай header из отдельных компонентов.",
    "layout": "Не создавай локальные horizontal padding overrides: внутри variants уже используются layout variables."
  }
}
```

`Main header` — основная навигация, которая размещается на каждой странице RHOOD.

## Сводка компонента

| Параметр           | Значения        | По умолчанию | Что задаёт                                            |
| ------------------ | --------------- | ------------ | ----------------------------------------------------- |
| `name`             | `main header`   |              | Имя компонента в Figma.                               |
| `type`             | `component_set` |              | Тип Figma-сущности: набор variants одного компонента. |
| `source.figma_url` | URL             |              | Ссылка на component set в Figma.                      |
| `resp`             | `desk`, `mob`   | `desk`       | Desktop- или mobile-конструкцию header.               |

У instance `Main header` значение `resp` связываем с Figma variable `resp/resp`. Она передаёт значение текущего sizing-mode родителя и переключает variant.

## Использует компоненты

| Компонент                                             | Связь           | Роль                                           |
| ----------------------------------------------------- | --------------- | ---------------------------------------------- |
| [Icon button](icon-buttons.md)                        | Nested instance | Utility actions на desktop и burger на mobile. |
| [Main header menu button](main-header-menu-button.md) | Nested instance | Пункты основной desktop-навигации.             |
| [Avatar](avatar.md)                                   | Nested instance | Профиль пользователя на desktop.               |
| [Main menu mobile](main-menu-mobile.md)               | Opens           | Full-screen мобильная навигация по burger.     |

## Структура variants

### `resp=desk`

- Логотип;
- Основная навигация из nested instances `Main header menu button`;
- Группа utility actions из `icon button`;
- `avatar`.

### `resp=mob`

- Логотип;
- `icon button` с burger-иконкой;
- Burger открывает `Main menu mobile` — отдельную full-screen мобильную навигацию, а не [Drawer](drawer.md).

## Настройка навигации

- Пункты основной навигации настраиваем в nested instances `Main header menu button`;
- В каждом instance вручную задаём текст, `selected`, `new` и `state`;
- `selected` определяет активный раздел, `new` — видимость badge `НОВОЕ`;
- Не пересобираем header вручную из логотипа, кнопок и avatar;
- Не меняем horizontal padding header локальными overrides: они уже связаны с layout variables внутри variants.
