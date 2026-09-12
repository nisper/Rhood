import * as React from "react"

import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"

type SortColumn = "object" | "city" | "price"
type SortState = { column: SortColumn; direction: "asc" | "desc" } | null

const pages = [
  [
    { id: "cosmos", object: "Космос", city: "Екатеринбург", price: 12500000 },
    { id: "mayak", object: "Маяк", city: "Верхняя Пышма", price: 8900000 },
  ],
  [
    { id: "orbit", object: "Орбита", city: "Екатеринбург", price: 10300000 },
    { id: "sever", object: "Северный", city: "Берёзовский", price: 7600000 },
  ],
]

const experimentalListings = [
  { id: "cosmos", object: "Космос", city: "Екатеринбург", price: 899000 },
  { id: "mayak", object: "Маяк", city: "Верхняя Пышма", price: 780000 },
  { id: "orbit", object: "Орбита", city: "Екатеринбург", price: 650000 },
  { id: "sever", object: "Северный", city: "Берёзовский", price: 420000 },
]

const cellProperties = [
  ["role", "head / body", "head", "Ячейка заголовка или данных."],
  ["type", "text / number / skeleton / checkbox", "checkbox", "Содержимое, выравнивание и состояние загрузки."],
  ["checked / indeterminate", "boolean", "false", "Ручное состояние checkbox, если Table.selection не используется."],
  ["onCheckedChange", "(checked) => void", "—", "Обработчик ручного выбора, если Table.selection не используется."],
  ["rowId", "string", "—", "ID строки для встроенного выбора через Table.selection."],
  ["paddingX", "true / false", "true", "Стандартные горизонтальные отступы. false — если их задаёт родитель."],
  ["sizeSmall", "true / false", "false", "Компактная высота; должна совпадать у всех ячеек таблицы."],
  ["sort", "true / false", "true", "Делает заголовок сортируемым."],
  ["sortDirection", "asc / desc", "—", "Показывает стрелку только у активной сортировки."],
  ["width", "content / fill / number", "content", "Ширина колонки: по содержимому, поровну или фиксированная в пикселях."],
  ["children", "ReactNode", "Head / Cell", "Содержимое текстовой или числовой ячейки."],
]

function Properties() {
  const widths = [160, "fill", 140, "fill"] as const

  return <Table className="w-full !min-w-0 rounded-lg border border-[var(--parser-border-light)] bg-white">
    <div className="flex border-b border-[var(--parser-border-light)]" role="row">
      {["Свойство", "Значения", "По умолчанию", "Назначение"].map((title, index) => <TableCell helpIcon={index === 0} key={title} role="head" sort={false} type="text" width={widths[index]}>{title}</TableCell>)}
    </div>
    {cellProperties.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row[0]} role="row">
      {row.map((cell, index) => <TableCell key={index} role="body" type="text" width={widths[index]}>{cell}</TableCell>)}
    </div>)}
  </Table>
}

function BorderExample({ bordered }: { bordered: boolean }) {
  return <Table className={`w-full !min-w-0 bg-white${bordered ? " border border-[var(--parser-border-light)]" : ""}`}>
    <div className="flex border-b border-[var(--parser-border-light)]" role="row">
      <TableCell role="head" sort={false} type="text" width="fill">Объект</TableCell>
      <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Город</TableCell>
      <TableCell helpIcon={false} role="head" sort={false} type="number" width={150}>Стоимость, ₽</TableCell>
    </div>
    {pages[0].map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row.id} role="row">
      <TableCell role="body" type="text" width="fill">{row.object}</TableCell>
      <TableCell role="body" type="text" width="fill">{row.city}</TableCell>
      <TableCell role="body" type="number" width={150}>{row.price.toLocaleString("ru-RU")}</TableCell>
    </div>)}
  </Table>
}

function sortRows(rows: (typeof pages)[number], sort: SortState) {
  return [...rows].sort((first, second) => {
    if (!sort) return 0
    const result = sort.column === "price"
      ? first.price - second.price
      : first[sort.column].localeCompare(second[sort.column], "ru")
    return sort.direction === "asc" ? result : -result
  })
}

export function TableExamples() {
  const [page, setPage] = React.useState(0)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [sort, setSort] = React.useState<SortState>(null)
  const [experimentalSort, setExperimentalSort] = React.useState<SortState>(null)
  const currentRows = pages[page]
  const currentIds = currentRows.map(row => row.id)
  const sortedRows = sortRows(pages.flat(), sort)
  const experimentalRows = sortRows(experimentalListings, experimentalSort)

  function toggleSort(column: SortColumn) {
    setSort(current => current?.column === column
      ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
      : { column, direction: "asc" })
  }

  function toggleExperimentalSort(column: SortColumn) {
    setExperimentalSort(current => current?.column === column
      ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
      : { column, direction: "asc" })
  }

  return <div className="grid min-w-0 gap-10">
    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Выбор</h2>
        <p>Настройка Table.selection управляет строками текущей страницы пагинации. Если выбрана часть строк, Checkbox в шапке показывает промежуточное состояние. Нажатие в этом состоянии выбирает все строки страницы.</p>
      </div>
      <Table className="border border-[var(--parser-border-light)] bg-white" selection={{ onSelectedIdsChange: setSelectedIds, rowIds: currentIds, selectedIds }}>
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          <TableCell role="head" sort={false} type="checkbox" width={40} />
          <TableCell role="head" sort={false} type="text" width="fill">Объект</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Город</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="number" width={150}>Стоимость, ₽</TableCell>
        </div>
        {currentRows.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" role="row" key={row.id}>
          <TableCell role="body" rowId={row.id} type="checkbox" width={40} />
          <TableCell role="body" type="text" width="fill">{row.object}</TableCell>
          <TableCell role="body" type="text" width="fill">{row.city}</TableCell>
          <TableCell role="body" type="number" width={150}>{row.price.toLocaleString("ru-RU")}</TableCell>
        </div>)}
      </Table>
      <div className="flex items-center gap-3 text-sm">
        <button className="rounded-md border border-[var(--parser-border-light)] px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50" disabled={page === 0} onClick={() => setPage(page - 1)} type="button">Назад</button>
        <span>Страница {page + 1} из {pages.length}</span>
        <button className="rounded-md border border-[var(--parser-border-light)] px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50" disabled={page === pages.length - 1} onClick={() => setPage(page + 1)} type="button">Вперёд</button>
      </div>
      <p className="text-sm text-[var(--parser-text-neutral-secondary)]">Выбор на второй странице сохраняется, но не влияет на состояние checkbox первой страницы.</p>
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Контент</h2>
        <p>Шапка объясняет, что означают значения в колонке. Повторяющиеся единицы измерения и валюта остаются в шапке: «Стоимость, ₽», «Площадь, м²». В строках остаются только значения.</p>
      </div>
      <div className="grid gap-6 rounded-xl bg-[var(--parser-surface-under-islands)] p-4 sm:grid-cols-2">
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Шапка</p><div className="flex bg-white"><TableCell role="head" type="text">Название</TableCell><TableCell helpIcon={false} role="head" sort={false} type="number">Стоимость, ₽</TableCell></div></div>
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Строка данных</p><div className="flex bg-white"><TableCell role="body" type="text">Космос</TableCell><TableCell role="body" type="number">12 500 000</TableCell></div></div>
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Загрузка</p><div className="flex bg-white"><TableCell role="body" type="skeleton" /><TableCell role="body" type="skeleton" /></div></div>
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Компактные ячейки</p><div className="flex bg-white"><TableCell role="body" sizeSmall type="text">Космос</TableCell><TableCell role="body" sizeSmall type="number">12 500 000 ₽</TableCell></div></div>
      </div>
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Размер</h2>
        <p>Ширину задают одинаково для всех ячеек одной колонки. По умолчанию — по самому широкому содержимому. Для колонок, которые должны занять свободное место, используй <code>width=&quot;fill&quot;</code>; они делят его поровну. Для известной ширины передай число в пикселях, например <code>width={'{160}'}</code>.</p>
      </div>
      <Table className="border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          <TableCell role="head" sort={false} type="text" width="content">По контенту</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">100%</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width={160}>Фиксированная</TableCell>
        </div>
        <div className="flex" role="row">
          <TableCell role="body" type="text" width="content">Короткий текст</TableCell>
          <TableCell role="body" type="text" width="fill">Этот текст переносится, если для него не хватает ширины.</TableCell>
          <TableCell role="body" type="text" width={160}>Текст переносится в границах 160 px.</TableCell>
        </div>
      </Table>
      <p className="text-sm text-[var(--parser-text-neutral-secondary)]">В режимах 100% и фиксированной ширины текст переносится. Сокращение через «…» добавляют только для отдельно описанного сценария.</p>
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Сортировка</h2>
        <p>Стрелка есть только у колонки, по которой таблица отсортирована. Нажми на «Объект» или «Стоимость»: первое нажатие сортирует по возрастанию, повторное меняет направление.</p>
      </div>
      <Table className="border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          <TableCell onClick={() => toggleSort("object")} role="head" sort sortDirection={sort?.column === "object" ? sort.direction : undefined} type="text" width="fill">Объект</TableCell>
          <TableCell helpIcon={false} role="head" sort={false} type="text" width="fill">Город</TableCell>
          <TableCell helpIcon={false} onClick={() => toggleSort("price")} role="head" sort sortDirection={sort?.column === "price" ? sort.direction : undefined} type="number" width={150}>Стоимость, ₽</TableCell>
        </div>
        {sortedRows.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row.id} role="row">
          <TableCell role="body" type="text" width="fill">{row.object}</TableCell>
          <TableCell role="body" type="text" width="fill">{row.city}</TableCell>
          <TableCell role="body" type="number" width={150}>{row.price.toLocaleString("ru-RU")}</TableCell>
        </div>)}
      </Table>
      <p aria-live="polite" className="text-sm text-[var(--parser-text-neutral-secondary)]">{sort ? `Сортировка: ${sort.column === "object" ? "Объект" : "Стоимость"}, ${sort.direction === "asc" ? "по возрастанию" : "по убыванию"}.` : "Сортировка не применена."}</p>
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Горизонтальные отступы</h2>
        <p><code>paddingX</code> включён по умолчанию. Он добавляет внутренние горизонтальные отступы ячейки. Передай <code>paddingX={'{false}'}</code>, только если отступы уже задаёт родитель.</p>
      </div>
      <Table className="w-full !min-w-0 border border-[var(--parser-border-light)] bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          <TableCell role="head" sort={false} type="text" width="fill">paddingX=true</TableCell>
          <TableCell helpIcon={false} paddingX={false} role="head" sort={false} type="text" width="fill">paddingX=false</TableCell>
        </div>
        <div className="flex" role="row">
          <TableCell role="body" type="text" width="fill">Стандартные отступы ячейки</TableCell>
          <TableCell paddingX={false} role="body" type="text" width="fill">Отступы задаёт родитель</TableCell>
        </div>
      </Table>
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Help icon</h2>
        <p>Иконка справки относится к заголовку колонки и находится сразу после его текста.</p>
      </div>
      <div className="w-fit rounded-xl border border-[var(--parser-border-light)] bg-white"><TableCell role="head" sort={false} type="text" width="content">Средняя стоимость</TableCell></div>
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Обводка</h2>
        <p>У таблицы всегда есть скругление <code>rounded-lg</code>. Обводку добавляют, когда она нужна в конкретном контексте: это <code>1px solid border-light</code>. Если обводка не нужна, свойство <code>border</code> не задают.</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">Без обводки</p><BorderExample bordered={false} /></div>
        <div className="grid gap-2"><p className="text-xs text-[var(--parser-text-neutral-secondary)]">С обводкой</p><BorderExample bordered /></div>
      </div>
    </section>

    <section className="grid min-w-0 gap-4">
      <h2 className="text-xl font-semibold">Свойства в коде</h2>
      <p>Ниже — интерфейс TableCell для реализации. Правила применения описаны в разделах выше.</p>
      <Properties />
    </section>

    <section className="grid gap-4">
      <div className="grid gap-1">
        <h2 className="text-xl font-semibold">Экспериментальная таблица</h2>
        <p>Все ячейки используют <code>paddingX={'{false}'}</code>. Нажми на любой заголовок, чтобы отсортировать данные.</p>
      </div>
      <Table className="bg-white">
        <div className="flex border-b border-[var(--parser-border-light)]" role="row">
          <TableCell onClick={() => toggleExperimentalSort("object")} paddingX={false} role="head" sort sortDirection={experimentalSort?.column === "object" ? experimentalSort.direction : undefined} type="text" width="fill">Объект</TableCell>
          <TableCell helpIcon={false} onClick={() => toggleExperimentalSort("city")} paddingX={false} role="head" sort sortDirection={experimentalSort?.column === "city" ? experimentalSort.direction : undefined} type="text" width="fill">Город</TableCell>
          <TableCell helpIcon={false} onClick={() => toggleExperimentalSort("price")} paddingX={false} role="head" sort sortDirection={experimentalSort?.column === "price" ? experimentalSort.direction : undefined} type="number" width="content">Стоимость, ₽</TableCell>
        </div>
        {experimentalRows.map(row => <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" key={row.id} role="row">
          <TableCell paddingX={false} role="body" sortDirection={experimentalSort?.column === "object" ? experimentalSort.direction : undefined} type="text" width="fill">{row.object}</TableCell>
          <TableCell paddingX={false} role="body" sortDirection={experimentalSort?.column === "city" ? experimentalSort.direction : undefined} type="text" width="fill">{row.city}</TableCell>
          <TableCell paddingX={false} role="body" sortDirection={experimentalSort?.column === "price" ? experimentalSort.direction : undefined} type="number" width="content">{row.price.toLocaleString("ru-RU")}</TableCell>
        </div>)}
      </Table>
    </section>
  </div>
}
