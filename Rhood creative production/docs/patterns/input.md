# Input

Input состоит из [[docs/components/control-label.md|Control-label]] из [[docs/patterns/input-component.md|подходящего компонента ввода]].

## Если Input использует [[docs/components/control-label.md|control label]]

1. Бери component set [input](https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=11297-9861&t=WM9HjYf4R62wQvUf-11);
2. Выбирай направление `flow=column / row`;
3. Разрывай связь с родителем (detach instance);
4. Заменяем вложенный `input text` на подходящий `input component`;
5. Меняй ширину [[docs/components/control-label.md|control label]], если надо.

## Если Input не использует [[docs/components/control-label.md|control label]]

1. Используй подходящий `input component`.
## Размер

[[docs/components/control-label.md|Control label]] и [[docs/patterns/input-component.md|компонент ввода]] в `input` должны одно значение `size=sm / md`

## Обязательные поля

- Отмечаем только обязательные поля;
- Необязательное поле не помечаем никак.

### Если [[docs/components/control-label.md|Control label]] есть

1. В конце текста в `control label` добавь ` *` (пробел и астериск);
2. Знак `*` окрась в цвет `text/error`.

### Если [[docs/components/control-label.md|Control label]] нет

Используй required=true у выбранного [[docs/patterns/input-component.md|компонента ввода]].

## Валидация

Если валидация вернула ошибку, у [[docs/patterns/input-component.md|компонента ввода]] `error=true`.
