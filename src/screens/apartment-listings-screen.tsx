import { CircleHelp } from "lucide-react"
import * as React from "react"

import { Chip } from "@/components/ui/chip"
import { MainHeader } from "@/components/ui/main-header"
import { Table } from "@/components/ui/table"
import { TableCell } from "@/components/ui/table-cell"
import { ToolbarFilter } from "@/components/ui/toolbar-filter"
import listings from "@/data/mock/real-estate-listings.json"

const navItems = [
  { label: "Набор базы", active: true },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Подключение городов" },
  { label: "Статистика" },
]

type SortColumn = "buyer" | "price" | "publishedAt"
type SortState = { column: SortColumn; direction: "asc" | "desc" } | null

function formatNumber(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value)
}

function formatPublishedAt(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Yekaterinburg",
    year: "numeric",
  }).format(new Date(value))
}

function formatSource(domain: string) {
  return {
    AVITO: "Авито",
    CIAN: "Циан",
    DOMCLICK: "Домклик",
    YANDEX: "Яндекс Недвижимость",
  }[domain] ?? domain
}

function getPrice(listing: (typeof listings)[number]) {
  return Number(listing.price) * 1_000
}

function getSpecs(listing: (typeof listings)[number]) {
  const rooms = listing.roomCount === 0 ? "Ст." : `${listing.roomCount} ком.`
  return `${rooms}, ${listing.area.toLocaleString("ru-RU")} м², этаж ${listing.floor}/${listing.floorCount}`
}

function ResultHeader({ onSort, sort }: { onSort: (column: SortColumn) => void; sort: SortState }) {
  return (
    <div className="flex border-b border-[var(--parser-border-light)]" role="row">
      <TableCell paddingX role="head" sizeSmall sort={false} type="checkbox" width={28} />
      <TableCell className="min-w-[300px]" helpIcon={false} role="head" sizeSmall sort={false} type="text" width="fill">Адрес</TableCell>
      <TableCell onClick={() => onSort("buyer")} role="head" sizeSmall sort sortDirection={sort?.column === "buyer" ? sort.direction : undefined} type="number" width={130}>Покупатель</TableCell>
      <TableCell helpIcon={false} onClick={() => onSort("price")} role="head" sizeSmall sort sortDirection={sort?.column === "price" ? sort.direction : undefined} type="number" width={175}>Цена, ₽</TableCell>
      <TableCell helpIcon={false} role="head" sizeSmall sort={false} type="text" width={152}>Ликвид.</TableCell>
      <TableCell helpIcon={false} role="head" sizeSmall sort={false} type="text" width={190}>Источник</TableCell>
      <TableCell helpIcon={false} onClick={() => onSort("publishedAt")} role="head" sizeSmall sort sortDirection={sort?.column === "publishedAt" ? sort.direction : undefined} type="text" width={150}>Опубликован</TableCell>
      <TableCell helpIcon={false} role="head" sizeSmall sort={false} type="text" width={236}>Статус</TableCell>
    </div>
  )
}

function ResultRow({ listing }: { listing: (typeof listings)[number] }) {
  const price = getPrice(listing)
  const pricePerM2 = Math.round(price / listing.area)

  return (
    <div className="flex border-b border-[var(--parser-border-light)] last:border-b-0" role="row">
      <TableCell paddingX role="body" sizeSmall type="checkbox" width={28} />

      <TableCell className="min-w-[300px]" custom role="body" sizeSmall type="text" width="fill">
        <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
          <p className="text-[var(--parser-text-brand)]">{getSpecs(listing)}</p>
          <p className="text-[var(--parser-text-neutral-primary)]">{listing.address}</p>
        </div>
      </TableCell>

      <TableCell custom role="body" sizeSmall type="number" width={130}>
        <p className="w-full font-mono text-right text-sm leading-5 tracking-[0.17px]">{listing.buyerDemandAvailableCount}</p>
      </TableCell>

      <TableCell custom role="body" sizeSmall type="number" width={175}>
        <div className="w-full font-mono text-right text-sm leading-5 tracking-[0.17px]">
          <p className="text-[var(--parser-text-neutral-primary)]">{formatNumber(price)}</p>
          <p className="text-[var(--parser-text-neutral-secondary)]">{formatNumber(pricePerM2)}</p>
        </div>
      </TableCell>

      <TableCell custom role="body" sizeSmall type="text" width={152}>
        <Chip appearance="muted" className="self-start" color="neutral" icon={false} propDelete={false} size="sm" thumbnail={false}>
          Оцениваем
        </Chip>
      </TableCell>

      <TableCell custom role="body" sizeSmall type="text" width={190}>
        <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
          <p className="text-[var(--parser-text-brand)]">{formatSource(listing.domain)}</p>
          <p className="text-[var(--parser-text-neutral-secondary)]">{listing.clientName ?? "Частное лицо"}</p>
        </div>
      </TableCell>

      <TableCell custom role="body" sizeSmall type="text" width={150}>
        <p className="text-sm leading-5 tracking-[0.17px]">{formatPublishedAt(listing.publishedAt)}</p>
      </TableCell>

      <TableCell custom role="body" sizeSmall type="text" width={236}>
        <Chip appearance="muted" className="self-start" color="neutral" icon={false} propDelete={false} size="sm" thumbnail={false}>
          {listing.userStatus ? "В работе" : "Еще не звонили из Rhood"}
        </Chip>
      </TableCell>
    </div>
  )
}

function ListingsTable({ onSort, sort }: { onSort: (column: SortColumn) => void; sort: SortState }) {
  const sortedListings = [...listings]
    .sort((first, second) => {
      if (!sort) return 0

      const firstValue = sort.column === "price"
        ? getPrice(first)
        : sort.column === "publishedAt"
          ? new Date(first.publishedAt).getTime()
          : first.buyerDemandAvailableCount
      const secondValue = sort.column === "price"
        ? getPrice(second)
        : sort.column === "publishedAt"
          ? new Date(second.publishedAt).getTime()
          : second.buyerDemandAvailableCount
      const comparison = firstValue - secondValue

      return sort.direction === "asc" ? comparison : -comparison
    })
    .slice(0, 20)

  return (
    <Table className="rounded-none">
      <ResultHeader onSort={onSort} sort={sort} />
      {sortedListings.map((listing) => <ResultRow key={listing.id} listing={listing} />)}
    </Table>
  )
}

export function ApartmentListingsScreen() {
  const [sort, setSort] = React.useState<SortState>(null)

  function handleSort(column: SortColumn) {
    setSort((current) => current?.column === column
      ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
      : { column, direction: "asc" })
  }

  return (
    <div className="min-h-screen bg-white text-[var(--parser-text-neutral-primary)]">
      <MainHeader navItems={navItems} />
      <ToolbarFilter empty resp="desk" />

      <main>
        <ListingsTable onSort={handleSort} sort={sort} />
      </main>

      <button className="fixed bottom-4 right-4 inline-flex rounded-full" type="button">
        <div className="rounded-full bg-[var(--parser-fill-neutral-dark)]">
          <CircleHelp aria-hidden="true" className="size-10 p-2 text-[var(--parser-text-primary-contrast)]" strokeWidth={2} />
        </div>
      </button>
    </div>
  )
}
