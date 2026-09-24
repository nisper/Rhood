import { CircleHelp, Columns3Cog, Map } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { MainHeader } from "@/components/ui/main-header";
import { Menu } from "@/components/ui/menu";
import { MenuDivider } from "@/components/ui/menu-divider";
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { ToolbarFilter } from "@/components/ui/toolbar-filter";
import listings from "@/data/mock/real-estate-listings.json";

const navItems = [
  { label: "Набор базы", active: true },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Подключение городов" },
  { label: "Статистика" },
];

type SortColumn = "buyer" | "price" | "pricePerM2" | "publishedAt";
type SortState = { column: SortColumn; direction: "asc" | "desc" } | null;
type ColumnKey =
  | "buyer"
  | "price"
  | "liquidity"
  | "source"
  | "publishedAt"
  | "status";

const tableColumns: { key: ColumnKey; label: string }[] = [
  { key: "buyer", label: "Покупатель" },
  { key: "price", label: "Цена" },
  { key: "liquidity", label: "Ликвидность" },
  { key: "source", label: "Источник" },
  { key: "publishedAt", label: "Опубликован" },
  { key: "status", label: "Статус" },
];

const sortOptions: { label: string; value: Exclude<SortState, null> }[] = [
  {
    label: "По цене — дороже",
    value: { column: "price", direction: "desc" },
  },
  {
    label: "По цене — дешевле",
    value: { column: "price", direction: "asc" },
  },
  {
    label: "По цене за м² — дороже",
    value: { column: "pricePerM2", direction: "desc" },
  },
  {
    label: "По цене за м² — дешевле",
    value: { column: "pricePerM2", direction: "asc" },
  },
  {
    label: "По дате — новые",
    value: { column: "publishedAt", direction: "desc" },
  },
  {
    label: "По дате — старые",
    value: { column: "publishedAt", direction: "asc" },
  },
];

const leaderboardRows = [
  ["Александр Белов", 248],
  ["Мария Иванова", 231],
  ["Дмитрий Кузнецов", 219],
  ["Анна Смирнова", 207],
  ["Сергей Попов", 196],
  ["Елена Соколова", 185],
  ["Алексей Волков", 173],
  ["Ольга Морозова", 162],
  ["Иван Лебедев", 151],
  ["Наталья Новикова", 143],
  ["Михаил Фёдоров", 134],
  ["Татьяна Орлова", 126],
  ["Павел Захаров", 117],
  ["Виктория Егорова", 109],
  ["Андрей Павлов", 98],
  ["Ирина Васильева", 87],
  ["Роман Семёнов", 76],
  ["Юлия Козлова", 64],
  ["Максим Никитин", 52],
  ["Светлана Баранова", 41],
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function formatPublishedAt(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Yekaterinburg",
    year: "numeric",
  }).format(new Date(value));
}

function formatSource(domain: string) {
  return (
    {
      AVITO: "Авито",
      CIAN: "Циан",
      DOMCLICK: "Домклик",
      YANDEX: "Яндекс Недвижимость",
    }[domain] ?? domain
  );
}

function getPrice(listing: (typeof listings)[number]) {
  return Number(listing.price) * 1_000;
}

function getSpecs(listing: (typeof listings)[number]) {
  const rooms = listing.roomCount === 0 ? "Ст." : `${listing.roomCount} ком.`;
  return `${rooms}, ${listing.area.toLocaleString("ru-RU")} м², этаж ${listing.floor}/${listing.floorCount}`;
}

function TableToolbar({
  hiddenColumns,
  onHiddenColumnsChange,
  onLeaderboardOpen,
  onSortChange,
  sort,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  onHiddenColumnsChange: (columns: Set<ColumnKey>) => void;
  onLeaderboardOpen: () => void;
  onSortChange: (sort: SortState) => void;
  sort: SortState;
}) {
  const [columnsOpen, setColumnsOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(false);
  const columnsMenuRef = React.useRef<HTMLDivElement>(null);
  const selectedSortOption = sortOptions.find((option) =>
    isSelected(option.value),
  );

  React.useEffect(() => {
    if (!columnsOpen) return;

    function closeColumnsMenu(event: PointerEvent) {
      if (!columnsMenuRef.current?.contains(event.target as Node)) {
        setColumnsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeColumnsMenu);
    return () => document.removeEventListener("pointerdown", closeColumnsMenu);
  }, [columnsOpen]);

  function isSelected(option: Exclude<SortState, null>) {
    return (
      sort?.column === option.column && sort.direction === option.direction
    );
  }

  function toggleColumn(column: ColumnKey) {
    const nextColumns = new Set(hiddenColumns);
    if (nextColumns.has(column)) nextColumns.delete(column);
    else nextColumns.add(column);
    onHiddenColumnsChange(nextColumns);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        aria-expanded={sortOpen}
        aria-haspopup="menu"
        expanded={sortOpen}
        label={false}
        onExpandedChange={setSortOpen}
        menu={
          sortOpen && (
            <Menu
              className="absolute left-0 top-full z-20 mt-1 min-w-[280px]"
              role="menu"
            >
              {sortOptions.map((option) => (
                <MenuItemSingleSelect
                  icon={false}
                  key={option.label}
                  onClick={() => {
                    onSortChange(option.value);
                    setSortOpen(false);
                  }}
                  rightSlot={false}
                  secondaryText={false}
                  selected={isSelected(option.value)}
                  startIcon={false}
                >
                  {option.label}
                </MenuItemSingleSelect>
              ))}
            </Menu>
          )
        }
        onClick={() => {
          setSortOpen((open) => !open);
          setColumnsOpen(false);
        }}
        size="sm"
        value={selectedSortOption?.label ?? "Сортировка"}
      />

      <Button
        appearance="default"
        endIcon={false}
        onClick={() =>
          window.open(
            "https://yandex.ru/maps/55/tyumen/",
            "_blank",
            "noopener,noreferrer",
          )
        }
        size="sm"
        startIcon={<Map aria-hidden="true" strokeWidth={2} />}
      >
        На карте
      </Button>

      <div className="relative" ref={columnsMenuRef}>
        <Button
          appearance="default"
          aria-expanded={columnsOpen}
          aria-haspopup="menu"
          endIcon={false}
          onClick={() => {
            setColumnsOpen((open) => !open);
            setSortOpen(false);
          }}
          size="sm"
          startIcon={<Columns3Cog aria-hidden="true" strokeWidth={2} />}
        >
          Столбцы
        </Button>
        {columnsOpen && (
          <Menu
            align="right"
            className="absolute right-0 top-full z-20 mt-1"
            role="menu"
          >
            {tableColumns.map((column) => (
              <MenuItemMultiselect
                checked={!hiddenColumns.has(column.key)}
                icon={false}
                key={column.key}
                onClick={() => toggleColumn(column.key)}
                rightSlot={false}
                secondaryText={false}
                startIcon={false}
              >
                {column.label}
              </MenuItemMultiselect>
            ))}
            {hiddenColumns.size > 0 && (
              <>
                <MenuDivider />
                <Button
                  appearance="ghost"
                  className="w-full justify-start"
                  endIcon={false}
                  onClick={() => onHiddenColumnsChange(new Set())}
                  size="sm"
                  startIcon={false}
                >
                  Сбросить все
                </Button>
              </>
            )}
          </Menu>
        )}
      </div>
      <Button
        appearance="default"
        endIcon={false}
        onClick={onLeaderboardOpen}
        size="sm"
        startIcon={
          <img
            alt=""
            className="size-5 object-contain"
            src="/Rhood/assets/medal-gold.png"
          />
        }
      >
        Таблица лидеров
      </Button>
    </div>
  );
}

function LeaderboardModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <ModalContainer className="min-h-0">
      <Modal
        className="w-full"
        maxWidth={700}
        onOpenChange={onOpenChange}
        open={open}
        title="Таблица лидеров"
        titleAs="h1"
      >
        <Table bordered>
          <div
            className="flex border-b border-[var(--parser-border-light)]"
            role="row"
          >
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width="content"
            >
              Место
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="text"
              width="fill"
            >
              Участник
            </TableCell>
            <TableCell
              helpIcon={false}
              role="head"
              sort={false}
              type="number"
              width="content"
            >
              Сохранено
            </TableCell>
          </div>
          {leaderboardRows.map(([participant, saved], index) => (
            <div
              className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
              key={participant}
              role="row"
            >
              <TableCell role="body" type="number" width="content">
                {index + 1}
              </TableCell>
              <TableCell role="body" type="text" width="fill">
                {participant}
              </TableCell>
              <TableCell role="body" type="number" width="content">
                {formatNumber(saved)}
              </TableCell>
            </div>
          ))}
        </Table>
      </Modal>
    </ModalContainer>
  );
}

function ResultHeader({
  hiddenColumns,
  onSort,
  sort,
  sortable = true,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  onSort: (column: SortColumn) => void;
  sort: SortState;
  sortable?: boolean;
}) {
  return (
    <div
      className="flex border-b border-[var(--parser-border-light)]"
      role="row"
    >
      <TableCell
        paddingX
        role="head"
        sizeSmall
        sort={false}
        type="checkbox"
        width={28}
      />
      <TableCell
        className="min-w-[300px]"
        helpIcon={false}
        role="head"
        sizeSmall
        sort={false}
        type="text"
        width="fill"
      >
        Адрес
      </TableCell>
      {!hiddenColumns.has("buyer") && (
        <TableCell
          onClick={sortable ? () => onSort("buyer") : undefined}
          role="head"
          sizeSmall
          sort={sortable}
          sortDirection={
            sortable && sort?.column === "buyer" ? sort.direction : undefined
          }
          type="number"
          width={130}
        >
          Покупатель
        </TableCell>
      )}
      {!hiddenColumns.has("price") && (
        <TableCell
          helpIcon={false}
          onClick={sortable ? () => onSort("price") : undefined}
          role="head"
          sizeSmall
          sort={sortable}
          sortDirection={
            sortable && sort?.column === "price" ? sort.direction : undefined
          }
          type="number"
          width={175}
        >
          Цена, ₽
        </TableCell>
      )}
      {!hiddenColumns.has("liquidity") && (
        <TableCell
          helpIcon={false}
          role="head"
          sizeSmall
          sort={false}
          type="text"
          width={152}
        >
          Ликвид.
        </TableCell>
      )}
      {!hiddenColumns.has("source") && (
        <TableCell
          helpIcon={false}
          role="head"
          sizeSmall
          sort={false}
          type="text"
          width={190}
        >
          Источник
        </TableCell>
      )}
      {!hiddenColumns.has("publishedAt") && (
        <TableCell
          helpIcon={false}
          onClick={sortable ? () => onSort("publishedAt") : undefined}
          role="head"
          sizeSmall
          sort={sortable}
          sortDirection={
            sortable && sort?.column === "publishedAt"
              ? sort.direction
              : undefined
          }
          type="text"
          width={150}
        >
          Опубликован
        </TableCell>
      )}
      {!hiddenColumns.has("status") && (
        <TableCell
          helpIcon={false}
          role="head"
          sizeSmall
          sort={false}
          type="text"
          width={236}
        >
          Статус
        </TableCell>
      )}
    </div>
  );
}

function ResultRow({
  hiddenColumns,
  listing,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  listing: (typeof listings)[number];
}) {
  const price = getPrice(listing);
  const pricePerM2 = Math.round(price / listing.area);

  return (
    <div
      className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
      role="row"
    >
      <TableCell
        paddingX
        role="body"
        rowId={listing.id}
        sizeSmall
        type="checkbox"
        width={28}
      />

      <TableCell
        className="min-w-[300px]"
        custom
        role="body"
        sizeSmall
        type="text"
        width="fill"
      >
        <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
          <p className="text-[var(--parser-text-brand)]">{getSpecs(listing)}</p>
          <p className="text-[var(--parser-text-neutral-primary)]">
            {listing.address}
          </p>
        </div>
      </TableCell>

      {!hiddenColumns.has("buyer") && (
        <TableCell custom role="body" sizeSmall type="number" width={130}>
          <p className="w-full font-mono text-right text-sm leading-5 tracking-[0.17px]">
            {listing.buyerDemandAvailableCount}
          </p>
        </TableCell>
      )}

      {!hiddenColumns.has("price") && (
        <TableCell custom role="body" sizeSmall type="number" width={175}>
          <div className="w-full font-mono text-right text-sm leading-5 tracking-[0.17px]">
            <p className="text-[var(--parser-text-neutral-primary)]">
              {formatNumber(price)}
            </p>
            <p className="text-[var(--parser-text-neutral-secondary)]">
              {formatNumber(pricePerM2)}
            </p>
          </div>
        </TableCell>
      )}

      {!hiddenColumns.has("liquidity") && (
        <TableCell custom role="body" sizeSmall type="text" width={152}>
          <Chip
            appearance="muted"
            className="self-start"
            color="neutral"
            icon={false}
            propDelete={false}
            size="sm"
            thumbnail={false}
          >
            Оцениваем
          </Chip>
        </TableCell>
      )}

      {!hiddenColumns.has("source") && (
        <TableCell custom role="body" sizeSmall type="text" width={190}>
          <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
            <p className="text-[var(--parser-text-brand)]">
              {formatSource(listing.domain)}
            </p>
            <p className="text-[var(--parser-text-neutral-secondary)]">
              {listing.clientName ?? "Частное лицо"}
            </p>
          </div>
        </TableCell>
      )}

      {!hiddenColumns.has("publishedAt") && (
        <TableCell custom role="body" sizeSmall type="text" width={150}>
          <p className="text-sm leading-5 tracking-[0.17px]">
            {formatPublishedAt(listing.publishedAt)}
          </p>
        </TableCell>
      )}

      {!hiddenColumns.has("status") && (
        <TableCell custom role="body" sizeSmall type="text" width={236}>
          <Chip
            appearance="muted"
            className="self-start"
            color="neutral"
            icon={false}
            propDelete={false}
            size="sm"
            thumbnail={false}
          >
            {listing.userStatus ? "В работе" : "Еще не звонили из Rhood"}
          </Chip>
        </TableCell>
      )}
    </div>
  );
}

function ListingsTable({
  className,
  hiddenColumns,
  onSort,
  sort,
  sortable = true,
}: {
  className?: string;
  hiddenColumns: ReadonlySet<ColumnKey>;
  onSort: (column: SortColumn) => void;
  sort: SortState;
  /** Enables sorting by clicking a column header. */
  sortable?: boolean;
}) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const sortedListings = [...listings]
    .sort((first, second) => {
      if (!sort) return 0;

      const firstValue =
        sort.column === "price"
          ? getPrice(first)
          : sort.column === "pricePerM2"
            ? Math.round(getPrice(first) / first.area)
            : sort.column === "publishedAt"
              ? new Date(first.publishedAt).getTime()
              : first.buyerDemandAvailableCount;
      const secondValue =
        sort.column === "price"
          ? getPrice(second)
          : sort.column === "pricePerM2"
            ? Math.round(getPrice(second) / second.area)
            : sort.column === "publishedAt"
              ? new Date(second.publishedAt).getTime()
              : second.buyerDemandAvailableCount;
      const comparison = firstValue - secondValue;

      return sort.direction === "asc" ? comparison : -comparison;
    })
    .slice(0, 20);

  return (
    <Table
      bordered
      className={className}
      selection={{
        onSelectedIdsChange: setSelectedIds,
        rowIds: sortedListings.map((listing) => listing.id),
        selectedIds,
      }}
    >
      <ResultHeader
        hiddenColumns={hiddenColumns}
        onSort={onSort}
        sort={sort}
        sortable={sortable}
      />
      {sortedListings.map((listing) => (
        <ResultRow
          hiddenColumns={hiddenColumns}
          key={listing.id}
          listing={listing}
        />
      ))}
    </Table>
  );
}

export function ApartmentListingsScreen() {
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<ColumnKey>>(
    new Set(),
  );
  const [sort, setSort] = React.useState<SortState>(null);
  const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);

  function handleSort(column: SortColumn) {
    setSort((current) =>
      current?.column === column
        ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" },
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[var(--parser-text-neutral-primary)]">
      <MainHeader logoHref="/Rhood/" navItems={navItems} />
      <ToolbarFilter empty resp="desk" />

      <main className="grid min-w-0 gap-0">
        <section className="px-[var(--rh-sizing-layout-edge-to-edge-wrapper)] py-4">
          <h1 className="rh-typography-h1 mb-1">15 208 квартир в Тюмени</h1>
          <p className="text-[var(--rh-theme-text-neutral-secondary)]">
            Но вообще, сегодня-то мы проверили 19 880 объектов. Мы просто дубли
            не показываем
          </p>
        </section>
        <section
          aria-label="Управление выдачей"
          className="px-[var(--rh-sizing-layout-edge-to-edge-wrapper)] py-3"
        >
          <TableToolbar
            hiddenColumns={hiddenColumns}
            onHiddenColumnsChange={setHiddenColumns}
            onLeaderboardOpen={() => setLeaderboardOpen(true)}
            onSortChange={setSort}
            sort={sort}
          />
        </section>
        <section aria-label="Список квартир" className="overflow-x-scroll">
          <ListingsTable
            className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
            hiddenColumns={hiddenColumns}
            onSort={handleSort}
            sort={sort}
            sortable={false}
          />
        </section>
        <section className="px-[var(--rh-sizing-layout-edge-to-edge-wrapper)] my-5">
          <Button
            appearance="default"
            endIcon={false}
            size="md"
            startIcon={false}
          >
            Показать еще 50 объектов
          </Button>
        </section>
        {leaderboardOpen && (
          <LeaderboardModal
            onOpenChange={setLeaderboardOpen}
            open={leaderboardOpen}
          />
        )}
      </main>
    </div>
  );
}
