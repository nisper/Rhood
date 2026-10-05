import {
  Columns3Cog,
  Map,
  Phone,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { MainHeader } from "@/components/ui/main-header";
import { Menu } from "@/components/ui/menu";
import { MenuDivider } from "@/components/ui/menu-divider";
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { ObjectInfo } from "@/components/ui/object-info";
import { Select } from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";
import { ToolbarFilter } from "@/components/ui/toolbar-filter";
import listings from "@/data/mock/real-estate-listings.json";

function getNavItems(activeItem: "base" | "my") {
  return [
  { label: "Набор базы", active: activeItem === "base", href: "?view=apartment-listings" },
  { label: "Мои объекты", active: activeItem === "my", href: "?view=my-listings" },
  { label: "Подборки" },
  { label: "Избранное" },
  ];
}

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

const resultTableColumns = [
  { key: "selection", alignment: "left" },
  { key: "address", alignment: "left" },
  { key: "buyer", alignment: "right" },
  { key: "call", alignment: "center" },
  { key: "price", alignment: "right" },
  { key: "liquidity", alignment: "left" },
  { key: "source", alignment: "left" },
  { key: "publishedAt", alignment: "left" },
  { key: "status", alignment: "left" },
] as const;

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

const leaderboardColumnWidths = {
  place: 67,
  saved: 144,
} as const;

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
  showLeaderboard = true,
  showMap = true,
  sort,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  onHiddenColumnsChange: (columns: Set<ColumnKey>) => void;
  onLeaderboardOpen: () => void;
  onSortChange: (sort: SortState) => void;
  showLeaderboard?: boolean;
  showMap?: boolean;
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

      {showMap && <Button
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
      </Button>}

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
      {showLeaderboard && <Button
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
      </Button>}
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
        className="w-full pb-4"
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
              width={leaderboardColumnWidths.place}
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
              width={leaderboardColumnWidths.saved}
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
              <TableCell
                role="body"
                type="number"
                width={leaderboardColumnWidths.place}
              >
                {index + 1}
              </TableCell>
              <TableCell role="body" type="text" width="fill">
                {participant}
              </TableCell>
              <TableCell
                role="body"
                type="number"
                width={leaderboardColumnWidths.saved}
              >
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
        column="selection"
        paddingX
        role="head"
        sizeSmall
        sort={false}
        type="checkbox"
        width={28}
      />
      <TableCell
        className="min-w-[300px]"
        column="address"
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
          column="buyer"
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
      <TableCell
        column="call"
        helpIcon={false}
        role="head"
        sizeSmall
        sort={false}
        type="text"
        width="content"
      >
        Позвонить
      </TableCell>
      {!hiddenColumns.has("price") && (
        <TableCell
          column="price"
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
          <>
            Цена, ₽
            <br />
            Цена за м², ₽
          </>
        </TableCell>
      )}
      {!hiddenColumns.has("liquidity") && (
        <TableCell
          column="liquidity"
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
          column="source"
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
          column="publishedAt"
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
          column="status"
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
  onOpen,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  listing: (typeof listings)[number];
  onOpen: () => void;
}) {
  const price = getPrice(listing);
  const pricePerM2 = Math.round(price / listing.area);

  return (
    <TableRow hover onClick={onOpen}>
      <TableCell
        column="selection"
        onClick={(event) => event.stopPropagation()}
        paddingX
        role="body"
        rowId={listing.id}
        sizeSmall
        type="checkbox"
        width={28}
      />

      <TableCell
        className="min-w-[300px]"
        column="address"
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
        <TableCell
          column="buyer"
          custom
          role="body"
          sizeSmall
          type="number"
          width={130}
        >
          <p className="w-full font-mono text-right text-sm leading-5 tracking-[0.17px]">
            {listing.buyerDemandAvailableCount}
          </p>
        </TableCell>
      )}
      <TableCell
        column="call"
        custom
        role="body"
        sizeSmall
        type="text"
        width="content"
      >
        <div className="grid">
          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 rh-typography-b2 whitespace-nowrap"
          >
            Позвонить
          </span>
          <IconButton
            appearance="primary"
            aria-label="Позвонить"
            className="col-start-1 row-start-1 justify-self-center"
            icon={<Phone aria-hidden="true" strokeWidth={2} />}
            onClick={(event) => event.stopPropagation()}
            size="xsm"
          />
        </div>
      </TableCell>

      {!hiddenColumns.has("price") && (
        <TableCell
          column="price"
          custom
          role="body"
          sizeSmall
          type="number"
          width={175}
        >
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
        <TableCell
          column="liquidity"
          custom
          role="body"
          sizeSmall
          type="text"
          width={152}
        >
          <Chip
            appearance="muted"
            className="self-start"
            color="neutral"
            icon={false}
            propDelete={false}
            size="sm"
          >
            Оцениваем
          </Chip>
        </TableCell>
      )}

      {!hiddenColumns.has("source") && (
        <TableCell
          column="source"
          custom
          role="body"
          sizeSmall
          type="text"
          width={190}
        >
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
        <TableCell
          column="publishedAt"
          custom
          role="body"
          sizeSmall
          type="text"
          width={150}
        >
          <p className="text-sm leading-5 tracking-[0.17px]">
            {formatPublishedAt(listing.publishedAt)}
          </p>
        </TableCell>
      )}

      {!hiddenColumns.has("status") && (
        <TableCell
          column="status"
          custom
          role="body"
          sizeSmall
          type="text"
          width={236}
        >
          <Chip
            appearance="muted"
            className="self-start"
            color="neutral"
            icon={false}
            propDelete={false}
            size="sm"
          >
            {listing.userStatus ? "В работе" : "Еще не звонили из Rhood"}
          </Chip>
        </TableCell>
      )}
    </TableRow>
  );
}

function ListingsTable({
  className,
  hiddenColumns,
  listings: tableListings,
  onOpenObjectInfo,
  onSort,
  sort,
  sortable = true,
}: {
  className?: string;
  hiddenColumns: ReadonlySet<ColumnKey>;
  listings: readonly (typeof listings)[number][];
  onOpenObjectInfo: (listing: (typeof listings)[number]) => void;
  onSort: (column: SortColumn) => void;
  sort: SortState;
  /** Enables sorting by clicking a column header. */
  sortable?: boolean;
}) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const sortedListings = [...tableListings]
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

  React.useEffect(() => {
    const availableIds = new Set(tableListings.map((listing) => listing.id));
    setSelectedIds((current) => current.filter((id) => availableIds.has(id)));
  }, [tableListings]);

  if (sortedListings.length === 0) {
    return (
      <div className="grid min-h-52 place-items-center rounded-[var(--rh-sizing-border-radius-md)] border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)] p-6 text-center">
        <div className="grid gap-1">
          <p className="rh-typography-h4">Ничего не найдено</p>
          <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">
            Попробуй изменить или сбросить фильтры.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Table
      bordered
      className={className}
      columns={resultTableColumns}
      minWidth={1600}
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
          onOpen={() => onOpenObjectInfo(listing)}
        />
      ))}
    </Table>
  );
}

export function ApartmentListingsScreen({
  view = "base",
}: {
  view?: "base" | "my";
}) {
  const isMyListings = view === "my";
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<ColumnKey>>(
    new Set(),
  );
  const [sort, setSort] = React.useState<SortState>(null);
  const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);
  const [selectedListing, setSelectedListing] = React.useState<
    (typeof listings)[number] | null
  >(null);

  function handleSort(column: SortColumn) {
    setSort((current) =>
      current?.column === column
        ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" },
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--rh-theme-surface-bg)] text-[var(--parser-text-neutral-primary)]">
      <MainHeader
        className="border-b-0"
        logoHref="/Rhood/"
        navItems={getNavItems(isMyListings ? "my" : "base")}
      />
      {!isMyListings && <ToolbarFilter className="border-b-0" />}

      <main className="grid min-w-0 gap-0">
        <section className="px-[var(--rh-sizing-layout-edge-to-edge-wrapper)] p-8">
          <h1 className="rh-typography-h2 mb-1 font-[500]">
            {formatNumber(listings.length)}{" "}
            {listings.length === 1 ? "квартира" : "квартир"} в Тюмени
          </h1>
          <p className="text-[var(--rh-theme-text-neutral-secondary)]">
            Но вообще, сегодня-то мы проверили 19 880 объектов. Мы просто дубли
            не показываем
          </p>
        </section>
        <section className="min-w-0">
          <div className="flex min-w-0 flex-col gap-4">
            <section
              aria-label="Управление выдачей"
              className="px-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
            >
              <TableToolbar
                hiddenColumns={hiddenColumns}
                onHiddenColumnsChange={setHiddenColumns}
                onLeaderboardOpen={() => setLeaderboardOpen(true)}
                onSortChange={setSort}
                showLeaderboard={!isMyListings}
                showMap={!isMyListings}
                sort={sort}
              />
            </section>
            <section
              aria-label="Список квартир"
              className="min-w-0 overflow-x-auto"
            >
              <ListingsTable
                className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
                hiddenColumns={hiddenColumns}
                listings={listings}
                onOpenObjectInfo={(listing) => {
                  setSelectedListing(listing);
                }}
                onSort={handleSort}
                sort={sort}
                sortable={false}
              />
              <footer className="pt-4">
                <Button
                  appearance="default"
                  endIcon={false}
                  size="md"
                  startIcon={false}
                >
                  Показать еще 50 объектов
                </Button>
              </footer>
            </section>
          </div>
        </section>
        {leaderboardOpen && (
          <LeaderboardModal
            onOpenChange={setLeaderboardOpen}
            open={leaderboardOpen}
          />
        )}
        {selectedListing && (
          <ObjectInfo
            onClose={() => setSelectedListing(null)}
            presentation="drawer"
          />
        )}
      </main>
    </div>
  );
}

export function MyListingsScreen() {
  return <ApartmentListingsScreen view="my" />;
}
