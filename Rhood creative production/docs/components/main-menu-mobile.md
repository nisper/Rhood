# Main menu mobile

```json
{
  "name": "main menu mobile",
  "type": "component",
  "source": {
    "figma_url": "https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10932-9974&t=NyqpH4gpmutuQtjr-11"
  },
  "figma": { "variant_properties": {}, "component_properties": {} },
  "structure": {
    "header": "sticky header with logo and close icon button",
    "navigation": "primary navigation group and service navigation group",
    "account_actions": "personal account and sign out at the bottom"
  },
  "dependencies": [
    {
      "component": "Icon button",
      "documentation": "docs/components/icon-buttons.md",
      "relation": "nested instance",
      "role": "Невидимый spacer и кнопка закрытия в sticky header."
    },
    {
      "component": "List item",
      "documentation": "docs/components/list-item.md",
      "relation": "nested instance",
      "role": "Пункты основной и сервисной навигации, личный кабинет и выход."
    },
    {
      "component": "Avatar",
      "documentation": "docs/components/avatar.md",
      "relation": "nested instance",
      "role": "Аватар в пункте «Личный кабинет»."
    },
    {
      "component": "RHOOD / LOGO FULL",
      "documentation": "",
      "relation": "nested instance",
      "role": "Логотип в sticky header."
    }
  ],
  "usage_rules": {
    "entry_point": "Открывается по burger-иконке в Main header с resp=mob.",
    "surface": "Это отдельная full-screen мобильная навигация, а не Drawer.",
    "reuse": "Используй готовый component, не пересобирай меню из list item на каждом экране."
  }
}
```

`Main menu mobile` — отдельная full-screen навигация для mobile. Она открывается по burger-иконке в [Main header](main-header.md) с `resp=mob`.

## Сводка компонента

| Параметр           | Значения           | По умолчанию | Что задаёт                   |
| ------------------ | ------------------ | ------------ | ---------------------------- |
| `name`             | `main menu mobile` |              | Имя компонента в Figma.      |
| `type`             | `component`        |              | Тип Figma-сущности.          |
| `source.figma_url` | URL                |              | Ссылка на component в Figma. |

## Использует компоненты

| Компонент                      | Связь           | Роль                                                           |
| ------------------------------ | --------------- | -------------------------------------------------------------- |
| [Icon button](icon-buttons.md) | Nested instance | Невидимый spacer и кнопка закрытия в sticky header.            |
| [List item](list-item.md)      | Nested instance | Пункты основной и сервисной навигации, личный кабинет и выход. |
| [Avatar](avatar.md)            | Nested instance | Аватар в пункте «Личный кабинет».                              |
| RHOOD / LOGO FULL              | Nested instance | Логотип в sticky header.                                       |

## Структура

- Sticky header с логотипом и `icon button` для закрытия меню;
- Основная группа пунктов навигации;
- Отдельная группа сервисных пунктов;
- В нижней части — личный кабинет и выход.

## Использование

- Открывается из mobile variant `Main header`;
- Это отдельная full-screen навигация, не [Drawer](drawer.md);
- Не пересобираем её из `list item` вручную на каждом экране.
