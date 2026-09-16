# Генератор токенов

Генератор переносит цветовые токены из JSON-экспорта Figma в CSS-переменные для приложения и JSON-данные для таблицы токенов.

## Входные файлы

Пока используются файлы, которые кладут в `src/tmp`:

```text
src/tmp/palette.json
src/tmp/theme.json
```

`palette.json` содержит primitive-цвета. `theme.json` содержит semantic и component-токены.

## Запуск

После обновления JSON из Figma выполни в корне проекта:

```bash
npm run tokens:generate
```

Скрипт находится в `scripts/generate-tokens.mjs`.

## Результаты

Команда обновляет два файла:

```text
src/styles/design-tokens.css
src/data/generated/tokens.generated.json
```

- `design-tokens.css` подключён в `src/index.css` и содержит CSS-переменные.
- `tokens.generated.json` предназначен для страницы/таблицы токенов в витрине компонентов.

`design-tokens.css` руками не редактируют: его нужно перегенерировать из JSON.

## Alias

Alias сохраняются как CSS-зависимости, а не заменяются итоговым hex-цветом.

```text
Figma: text/brand → brand/600 → blue/600
CSS:  --rhood-theme-text-brand: var(--rhood-palette-brand-600)
```

Скрипт поддерживает оба формата из текущего Figma-экспорта:

- metadata Figma: `com.figma.aliasData`;
- DTCG-ссылки в значении: `{blue.600}`.

В JSON для таблицы у каждого токена есть CSS-переменная, итоговое значение, alias, Figma variable ID и scopes.

## Проверки

Во время запуска генератор проверяет:

- alias ссылается на существующий токен;
- в цепочке alias нет цикла.

При проблеме команда завершится с предупреждением и ненулевым кодом. Не используй generated CSS, пока проблема не исправлена в JSON.

## Текущий порядок работы

1. Экспортируй `palette.json` и `theme.json` из Figma.
2. Замени файлы в `src/tmp`.
3. Запусти `npm run tokens:generate`.
4. Проверь вывод команды и изменения generated-файлов.
5. Используй semantic/component CSS-токены в новых или обновляемых компонентах.
