# Модалка сохранения объекта в CRM
## Задача

Когда пользователь сохраняет объект из парсера в CRM, я хотел бы, чтобы он указал еще номер телефона собственника квартиры и номер квартиры.

Эти поля необязательные, но было бы неплохо.

Вот тебе модалка [Untitled](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=78-820&t=79Q1nsYn8hzoVrVK-11), которую пользователь видит при сохранении объекта в CRM.

Покажи, как бы мы могли получить данные, о которых я сказал выше.

## Отчёт по выполнению

### Прочитанные инструкции и паттерны

- [[_instructions/figma.md|Инструкции по Figma]].
- [[_instructions/button.md|Инструкции по кнопкам]].
- [[_instructions/copy-guidelines.md|Правила оформления текстов и документов]].

### Рассмотренные компоненты Parser – Components

В библиотеке `Parser – Components` проверены component sets `rangeInput`, `dateInput` и `searchInput`. Дополнительно выполнен поиск по `textInput` и `field`.

Подходящего текстового или телефонного input для телефона собственника и номера квартиры не найдено. Поэтому для новых полей не использован ни один instance из библиотеки: `rangeInput`, `dateInput` и `searchInput` не соответствуют данным сценария.

Существующие instances в модалке сохранены без изменений:

- [Кнопка «Отмена»](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1750).
- [Кнопка «Сохранить»](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1751).
- [Кнопка закрытия](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1752).

### Созданные layers и frames

Исходная [модалка](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=78-820) не менялась. Для демонстрации создан отдельный вариант — [modal — CRM с дополнительными данными](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1742). Он создан как копия исходной модалки и после detachment стал frame.

Внутри варианта вместо instances созданы локальные frames:

- [Блок «Дополнительные данные»](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1824).
- [Поле «Телефон собственника»](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1826) и его input [111:1828](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1828).
- [Поле «Номер квартиры»](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1830) и его input [111:1832](https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1832).

### Несработавшие правила и роутинг

- В [[_instructions/figma.md|инструкции по Figma]] указан роутинг к `docs/patterns/form.md`, но такого файла в рабочей папке нет.
- Правило переиспользования компонентов не удалось применить к новым полям: в разрешённой библиотеке не найден подходящий input. Это зафиксированное локальное исключение.
- Роутинг для кнопок сработал: существующие button instances сохранены.

## Результат

https://www.figma.com/design/45Yc9LJvD3PBMUHE07oGPm/Untitled?node-id=111-1742&t=79Q1nsYn8hzoVrVK-11