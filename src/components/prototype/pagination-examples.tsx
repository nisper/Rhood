import * as React from "react"

import { Pagination } from "@/components/ui/pagination"
import { ShowcaseSection } from "@/components/ui/showcase-section"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

const properties = [
  ["currentPage", "number", "1", "Номер текущей страницы."],
  ["totalPages", "number", "1", "Общее количество страниц."],
  ["onPageChange", "(page: number) => void", "—", "Вызывается при выборе страницы или кнопки навигации."],
  ["size", "md · sm", "md", "Размер кнопок пагинации."],
]

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">{children}</code>
}

function InteractivePagination({ size = "md" }: { size?: "md" | "sm" }) {
  const [page, setPage] = React.useState(4)
  return <div className="grid justify-items-center gap-3">
    <Pagination currentPage={page} onPageChange={setPage} size={size} totalPages={12} />
    <p aria-live="polite" className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Страница {page} из 12</p>
  </div>
}

export function PaginationExamples() {
  return <div className="grid min-w-0">
    <ShowcaseSection
      codeSnippet={<Code><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">Pagination</span>{" "}<span className="text-[var(--rh-theme-text-info)]">currentPage</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{`{page}`}</span>{" "}<span className="text-[var(--rh-theme-text-info)]">totalPages</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{`{12}`}</span>{" "}<span className="text-[var(--rh-theme-text-info)]">onPageChange</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">{`{setPage}`}</span>{" />"}</Code>}
      description="Пагинация помогает перейти к нужной странице. Нажми на номер, «Назад» или «Вперёд», чтобы проверить переключение."
      panels={[<div className="flex min-h-[136px] items-center justify-center rounded-xl bg-white px-6 py-4" key="default"><InteractivePagination /></div>]}
      title="Стиль"
    />

    <ShowcaseSection
      codeSnippet={<Code><span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span><span className="text-[var(--rh-palette-purple-700)]">Pagination</span>{" "}<span className="text-[var(--rh-theme-text-info)]">size</span><span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span><span className="text-[var(--rh-theme-text-success)]">"sm"</span>{" … />"}</Code>}
      description="Размер md используется по умолчанию. sm подходит для более плотных блоков."
      panels={[<div className="flex min-h-[136px] flex-wrap items-center justify-center gap-8 rounded-xl bg-white px-6 py-4" key="sizes"><InteractivePagination /><InteractivePagination size="sm" /></div>]}
      title="Размер"
    />

    <ShowcaseSection
      description="На первой странице кнопка «Назад» недоступна, на последней — «Вперёд». Номера страниц остаются интерактивными."
      panels={[<div className="flex min-h-[136px] flex-wrap items-center justify-center gap-8 rounded-xl bg-white px-6 py-4" key="edges"><Pagination currentPage={1} totalPages={5} /><Pagination currentPage={5} totalPages={5} /></div>]}
      title="Состояния"
    />

    <ShowcaseSection
      description="Компонент включает кнопки страниц, текстовые кнопки навигации и многоточие для пропущенных диапазонов."
      panels={[<div className="flex min-h-[136px] items-center justify-center rounded-xl bg-white px-6 py-4" key="ellipsis"><Pagination currentPage={6} totalPages={12} /></div>]}
      title="Состав"
    />

    <section className="mb-10 grid gap-3">
      <div className="grid gap-1"><h2 className="rh-typography-h4">Свойства</h2><p className="rh-typography-b1">Настройки Pagination.</p></div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={false} key={title} role="head" sort={false} type="text" width={index === 3 ? "fill" : index === 0 ? 150 : 140}>{title}</TableCell>)}
        </div>
        {properties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
          {row.map((cell, index) => <TableCell key={index} role="body" type="text" width={index === 3 ? "fill" : index === 0 ? 150 : 140}>{cell}</TableCell>)}
        </div>)}
      </Table>
    </section>
  </div>
}
