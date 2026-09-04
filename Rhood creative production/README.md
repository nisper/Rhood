---
cssclasses:
---
# RHOOD

Рабочая база знаний по внутреннему продукту «Этажей» для набора базы объектов недвижимости. Здесь собраны продуктовая документация, договорённости по Figma, описание компонентов и вспомогательные материалы.

## С чего начать

- [Продуктовая документация](./product/README.md) — назначение продукта, карта функционала, пользовательские сценарии и глоссарий.
- [Видение продукта](./product/vision.md) — аудитория, проблема, ценность и продуктовые принципы.
- [Карта функционала](./product/feature-map.md) — основные области и фичи.
- [Карта пользовательских сценариев](./product/scenario-map.md) — ключевые пути пользователей.

## Структура

| Папка или файл                                                 | Содержание                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`product`](./product/)                                        | Продуктовые документы: видение, глоссарий, фичи и сценарии.        |
| [`docs`](./docs/)                                              | Документация дизайн-системы: компоненты, паттерны и foundations.   |
| [`changelog`](./changelog/)                                    | Журнал важных изменений, решений и последствий для будущей работы. |
| [`_instructions`](./_instructions/)                            | Рабочие правила для сценариев и задач.                             |
| [`references`](./references/)                                  | Визуальные референсы и исходные материалы.                         |
| [`lucide-icons-by-category.md`](lucide-icons-by-category.md) | Каталог иконок Lucide по категориям.                               |

## Как устроена документация

- [`docs/components`](./docs/components/) — отдельные `component sets`: variants, component properties, состав и правила использования.
- [`docs/patterns`](./docs/patterns/) — композиции из компонентов для конкретных UI-сценариев. Например, [table](docs/patterns/table.md).
- [`docs/variables`](./docs/variables/) и [layout-composition](./docs/layout-composition.md) — foundations: variables и правила композиции layout.
- [`_instructions`](./_instructions/) — рабочие правила: как выполнять задачу. Они не заменяют документацию компонента или паттерна.

Для таблиц это означает: [table.md](./_instructions/table.md) задаёт порядок сборки, а [data-table.md](docs/patterns/table.md) описывает сам UI-паттерн.

## Рабочие правила

Перед работой проверь релевантные инструкции в папке [`_instructions`](./_instructions/):

- [Figma Instructions](./_instructions/figma.md) — для работы с макетами.
- [Icon Instructions](./_instructions/icon.md) — для подбора и актуализации иконок.
- [Copy Guidelines](./_instructions/copy-guidelines.md) — для текстов и документов.
- [Документация компонентов](./_instructions/component-documentation.md) — для описания component sets и их свойств.
- [Ведение changelog](./_instructions/changelog.md) — для фиксации важных изменений и решений.
