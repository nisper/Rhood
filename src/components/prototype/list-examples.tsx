import { ShowcaseSection } from "@/components/ui/showcase-section";
import * as React from "react";

import { List } from "@/components/ui/list";
import { ListItem, type ListItemProps } from "@/components/ui/list-item";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const properties = [
  ["dense", "true · false", "false", "Компактная вертикальная плотность строки."],
  ["paddingX", "true · false", "true", "Включает или убирает горизонтальные отступы строки."],
  ["disGutters", "true · false", "false", "Устаревший алиас для отключения горизонтальных отступов; paddingX имеет приоритет."],
  ["fontWeight", "medium · regular", "regular", "Насыщенность основного текста."],
  ["state", "default · hovered · focused", "default", "Статичное визуальное состояние для витрины и тестирования."],
  ["selected", "true · false", "false", "Отмечает текущий раздел навигации."],
  ["disabled", "true · false", "false", "Отключает взаимодействие и вложенные действия."],
  ["startIcon / endIcon", "true · false · ReactNode", "true", "Иконки в начале и конце строки."],
  ["secondaryText / secondaryLabel", "boolean · ReactNode", "true · Secondary", "Вторичный текст и его содержимое."],
  ["iconButton / button", "true · false", "true", "Дополнительные действия справа."],
  ["children", "ReactNode", "List item", "Основной текст строки."],
];

function CodeToken({ children, role = "value" }: { children: React.ReactNode; role?: "component" | "prop" | "value" | "punctuation" }) {
  const color = {
    component: "text-[var(--rh-palette-purple-700)]",
    prop: "text-[var(--rh-theme-text-info)]",
    value: "text-[var(--rh-theme-text-success)]",
    punctuation: "text-[var(--rh-theme-text-neutral-secondary)]",
  }[role];
  return <span className={color}>{children}</span>;
}

function ListItemSnippet({ paddingX }: { paddingX: boolean }) {
  return (
    <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
      <CodeToken role="punctuation">{"<"}</CodeToken>
      <CodeToken role="component">ListItem</CodeToken>{" "}
      <CodeToken role="prop">paddingX</CodeToken>
      <CodeToken role="punctuation">=</CodeToken>
      <CodeToken role="punctuation">{"{"}</CodeToken>
      <CodeToken>{String(paddingX)}</CodeToken>
      <CodeToken role="punctuation">{"}"}</CodeToken>
      <CodeToken role="punctuation">{" />"}</CodeToken>
    </code>
  );
}

function StateRow({ label, props }: { label: string; props: ListItemProps }) {
  return (
    <div className="grid gap-2">
      <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">{label}</p>
      <ListItem {...props} button={false} iconButton={false} endIcon={false}>
        Раздел
      </ListItem>
    </div>
  );
}

export function ListExamples() {
  const [page, setPage] = React.useState("Объекты");

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="List — контейнер для строк ListItem. У него нет собственных размеров: плотность строки задаёт свойство dense."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">Обычная</p>
                  <List><ListItem button={false} iconButton={false} endIcon={false}>Раздел</ListItem></List>
                </div>
                <div className="grid gap-2">
                  <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">Компактная</p>
                  <List><ListItem button={false} dense iconButton={false} endIcon={false}>Раздел</ListItem></List>
                </div>
              </div>
            </div>]}
        title="Размер"
      />

      <ShowcaseSection
        description="Нативный hover работает при наведении. Свойства state и selected нужны для статичной демонстрации состояний; disabled блокирует взаимодействие."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <div className="grid w-full max-w-[640px] gap-5 sm:grid-cols-2">
                <StateRow label="default" props={{}} />
                <StateRow label="hovered" props={{ state: "hovered" }} />
                <StateRow label="focused" props={{ state: "focused" }} />
                <StateRow label="selected" props={{ selected: true }} />
                <StateRow label="disabled" props={{ disabled: true }} />
              </div>
            </div>]}
        title="Состояния"
      />

      <ShowcaseSection
        description="paddingX управляет горизонтальными отступами строки: true оставляет их, false убирает."
        codeSnippet={<><ListItemSnippet paddingX /><br /><ListItemSnippet paddingX={false} /></>}
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <div className="grid w-full max-w-[480px] gap-4">
                <div className="grid gap-2">
                  <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">paddingX: true</p>
                  <List><ListItem button={false} endIcon={false} iconButton={false} paddingX>Раздел</ListItem></List>
                </div>
                <div className="grid gap-2">
                  <p className="text-xs leading-4 text-[var(--parser-text-neutral-secondary)]">paddingX: false</p>
                  <List><ListItem button={false} endIcon={false} iconButton={false} paddingX={false}>Раздел</ListItem></List>
                </div>
              </div>
            </div>]}
        title="Горизонтальные отступы"
      />

      <ShowcaseSection
        description="Строка поддерживает основной и вторичный текст, стартовую и конечную иконки, а также встроенные действия. В навигации выбранный раздел меняется по клику."
        panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <nav aria-label="Пример навигационного списка" className="w-full max-w-[480px]">
                <List>
                  {["Объекты", "Профиль", "Настройки"].map((label) => (
                    <button
                      aria-current={page === label ? "page" : undefined}
                      className="w-full cursor-pointer rounded-[var(--rh-sizing-border-radius-md)] text-left focus-visible:outline-2 focus-visible:outline-[var(--parser-border-focus)]"
                      key={label}
                      onClick={() => setPage(label)}
                      type="button"
                    >
                      <ListItem button={false} endIcon={false} iconButton={false} secondaryText={false} selected={page === label}>
                        {label}
                      </ListItem>
                    </button>
                  ))}
                </List>
              </nav>
            </div>, <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white">
              <List className="w-full max-w-[480px]">
                <ListItem button={false} endIcon={false} iconButton={false} secondaryText={false}>Только текст</ListItem>
                <ListItem button={false} endIcon={false} iconButton={false} secondaryLabel="Дополнительная информация">Две строки</ListItem>
                <ListItem button={false} iconButton={false} startIcon={false}>Без стартовой иконки</ListItem>
                <ListItem button={false} endIcon={false} startIcon={false} secondaryText={false}>С иконкой-действием</ListItem>
                <ListItem endIcon={false} iconButton={false} startIcon={false} secondaryText={false}>С кнопкой</ListItem>
              </List>
            </div>]}
        title="Состав"
      />

      <section className="mb-10 grid gap-3">
        <div className="grid gap-1">
          <h2 className="rh-typography-h4">Свойства</h2>
          <p className="rh-typography-b1">Настройки ListItem. List принимает стандартные props div и размещает строки вертикально.</p>
        </div>
        <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
          <div className="flex border-b border-[var(--parser-border-light)]" role="row">
            {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => (
              <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{title}</TableCell>
            ))}
          </div>
          {properties.map((row) => (
            <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
              {row.map((cell, index) => (
                <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 160 : 140}>{cell}</TableCell>
              ))}
            </div>
          ))}
        </Table>
      </section>
    </div>
  );
}
