import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { ObjectCard } from "@/components/ui/object-card";

const properties = [
  ["image", "string", "демо-изображение", "URL фотографии объекта."],
  ["imageAlt", "string", "Интерьер квартиры", "Альтернативный текст фотографии."],
  ["favorite", "boolean", "true", "Показывает кнопку добавления в избранное."],
  ["notForClient", "boolean", "true", "Показывает внутренние статусы, источник и дату публикации."],
  ["pictures", "boolean", "true", "Показывает фотографию объекта."],
  ["state", "default · hovered", "default", "Статичное состояние для примеров витрины; при наведении hover работает нативно."],
  ["subway", "boolean", "true", "Показывает станцию метро."],
  ["footer", "ReactNode", "действия карточки", "Заменяет блок действий внизу карточки."],
  ["onDetailsClick · onCommentsClick · onReportClick", "() => void", "—", "Обработчики нижних действий карточки."],
  ["price · pricePerM2 · details · address", "string", "данные демо-объекта", "Цена и основные характеристики объекта."],
  ["source · author · publishedAt · sourceHref", "string", "данные демо-объекта", "Источник объявления, автор, дата и адрес ссылки."],
  ["…props", "ComponentProps<article>", "—", "Нативные свойства корневого article."],
];

const usedComponents = [
  { href: "/Rhood/?view=components&component=button-favorite", title: "ButtonFavorite" },
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
];

export function ObjectCardExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection description="У карточки один фиксированный размер из макета и нет стилей-вариантов. Она меняет фон при наведении; состояние hovered нужно для статичной демонстрации на витрине." panels={[<div className="flex min-h-[600px] items-start justify-center overflow-auto rounded-xl bg-white px-4 py-3"><div className="flex flex-wrap items-start justify-center gap-4"><ObjectCard /><ObjectCard state="hovered" /></div></div>]} title="Состояния" usedComponents={usedComponents} />
    <ShowcaseSection description="Изображение, статусы, станция метро и нижние действия можно скрыть или заменить. Кнопка избранного переключается по нажатию." panels={[<div className="flex min-h-[600px] items-start justify-center overflow-auto rounded-xl bg-white px-4 py-3"><div className="flex flex-wrap items-start justify-center gap-4"><ObjectCard favorite={false} notForClient={false} /><ObjectCard pictures={false} subway={false} /></div></div>]} title="Состав" usedComponents={usedComponents} />
    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">Публичные настройки карточки объекта.</p></div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">{["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>)}</div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">{row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>)}</div>)}
      </Table>
    </section>
  </div>;
}
