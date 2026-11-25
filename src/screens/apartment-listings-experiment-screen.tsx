import {
  Columns3Cog,
  ChevronLeft,
  ChevronsDown,
  ChevronsUp,
  CircleUser,
  Copy,
  Map,
  Minus,
  Plus,
  Phone,
  Table2,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArchiveIntroOverlay } from "@/components/prototype/archive-intro-overlay";
import { ObjectFilter, type ObjectFilterValues } from "@/components/ui/object-filter";
import { Chip } from "@/components/ui/chip";
import { Footer } from "@/components/ui/footer";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { List } from "@/components/ui/list";
import { MainHeader } from "@/components/ui/main-header";
import { Menu } from "@/components/ui/menu";
import { MenuDivider } from "@/components/ui/menu-divider";
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { useMenuOpen } from "@/hooks/use-menu-open";
import { cn } from "@/lib/utils";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { ExperimentObjectInfo } from "@/screens/apartment-listings-experiment-object-info";
import { ObjectCard } from "@/components/ui/object-card";
import { ObjectRow, type ObjectRowColumn } from "@/components/ui/object-row";
import { MapPriceTag } from "@/components/ui/map-price-tag";
import { Pagination } from "@/components/ui/pagination";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { Select } from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";
import archiveFlatListings from "@/data/mock/archive-flat-listings.json";
import archiveHouseListings from "@/data/mock/archive-house-listings.json";
import archiveLandListings from "@/data/mock/archive-land-listings.json";
import flatListings from "@/data/mock/real-estate-flat-listings.json";
import houseListings from "@/data/mock/real-estate-house-listings.json";
import landListings from "@/data/mock/real-estate-land-listings.json";
import { myObjectStatuses } from "@/data/my-object-statuses";

const LISTINGS_PER_PAGE = 20;
const VIEWED_LISTINGS_STORAGE_KEY = "rhood-viewed-listings";
const MY_LISTING_STATUS_COLUMN_WIDTH = 152;
const MY_LISTING_DUPLICATES_COLUMN_WIDTH = 142;
const listings = [...flatListings, ...houseListings, ...landListings];
const listingsByPropertyType = {
  Квартиры: flatListings,
  Дома: houseListings,
  Участки: landListings,
};
const archiveListingsByPropertyType = {
  Квартиры: archiveFlatListings.result,
  Дома: archiveHouseListings.result,
  Участки: archiveLandListings.result,
};
const archiveObjectCountByPropertyType = {
  Квартиры: archiveFlatListings.count,
  Дома: archiveHouseListings.count,
  Участки: archiveLandListings.count,
};

function getNavItems(activeItem: "base" | "my" | "archive") {
  return [
    {
      label: "Набор базы",
      active: activeItem === "base",
      href: "?view=apartment-listings-experiment",
    },
    {
      label: "Мои объекты",
      active: activeItem === "my",
      href: "?view=my-listings",
    },
    { label: "Подборки" },
    { label: "Избранное" },
    { label: "Расширение" },
    { label: "Архив", active: activeItem === "archive", href: "?view=archive" },
  ];
}

type SortColumn = "buyer" | "price" | "pricePerM2" | "publishedAt";
type SortState = { column: SortColumn; direction: "asc" | "desc" } | null;
type ColumnKey = ObjectRowColumn;

const listingsTableColumns: { key: ColumnKey; label: string }[] = [
  { key: "price", label: "Цена" },
  { key: "source", label: "Источник" },
  { key: "publishedAt", label: "Опубликован" },
  { key: "status", label: "Статус" },
];

const myListingsTableColumns: { key: ColumnKey; label: string }[] = [
  { key: "address", label: "Адрес" },
  { key: "price", label: "Цена, ₽" },
  { key: "pricePerM2", label: "Цена за м², ₽" },
  { key: "duplicates", label: "Дубли" },
  { key: "savedAt", label: "Сохранен в CRM" },
  { key: "crmStatus", label: "Статус в CRM" },
  { key: "id", label: "ID" },
];

type ArchivePropertyType = keyof typeof archiveListingsByPropertyType;
type ArchiveColumn = { key: ColumnKey; label: string };
type MyListingRow = {
  listing: (typeof listings)[number];
  originalIndex: number;
  duplicateCount: number;
  duplicatePriceStatus: "cheaper" | "more-expensive" | null;
  crmStatus: (typeof myObjectStatuses)[number];
};

const listingTypeByPropertyType: Record<ArchivePropertyType, "FLAT" | "HOUSE" | "LAND"> = {
  Квартиры: "FLAT",
  Дома: "HOUSE",
  Участки: "LAND",
};

function getArchivePropertyTypeLabel(count: number, propertyType: ArchivePropertyType) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const formIndex = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? 2
    : lastDigit === 1
      ? 0
      : lastDigit >= 2 && lastDigit <= 4
        ? 1
        : 2;
  const forms: Record<ArchivePropertyType, [string, string, string]> = {
    Квартиры: ["квартира", "квартиры", "квартир"],
    Дома: ["дом", "дома", "домов"],
    Участки: ["участок", "участка", "участков"],
  };

  return forms[propertyType][formIndex];
}

const sharedArchiveColumns: ArchiveColumn[] = [
  { key: "address", label: "Адрес" },
  { key: "price", label: "Цена, ₽" },
  { key: "source", label: "Источник" },
  { key: "author", label: "Автор" },
  { key: "publishedAt", label: "Опубликован" },
  { key: "actualizedAt", label: "Снят" },
];

const archiveColumnsByPropertyType: Record<ArchivePropertyType, ArchiveColumn[]> = {
  Квартиры: [
    sharedArchiveColumns[0],
    { key: "rooms", label: "Ком." },
    { key: "area", label: "Площ., м²" },
    { key: "floor", label: "Этаж" },
    sharedArchiveColumns[1],
    { key: "pricePerM2", label: "Цена, ₽/м²" },
    ...sharedArchiveColumns.slice(2),
  ],
  Дома: [
    sharedArchiveColumns[0],
    { key: "area", label: "Площ., м²" },
    { key: "landArea", label: "Площадь, сот." },
    sharedArchiveColumns[1],
    { key: "pricePerM2", label: "Цена, ₽/м²" },
    ...sharedArchiveColumns.slice(2),
  ],
  Участки: [
    sharedArchiveColumns[0],
    { key: "landArea", label: "Площадь, сот." },
    sharedArchiveColumns[1],
    { key: "pricePerSotka", label: "Цена, ₽/сот." },
    ...sharedArchiveColumns.slice(2),
  ],
};

const CALL_COLUMN_WIDTH = 56;
const BUYER_COLUMN_WIDTH = 55;
const PRICE_COLUMN_WIDTH = 128;
const PUBLISHED_AT_COLUMN_WIDTH = 160;

const archiveTableColumnsByPropertyType = {
  Квартиры: [
    { key: "address", alignment: "left" },
    { key: "rooms", alignment: "right" },
    { key: "area", alignment: "right" },
    { key: "floor", alignment: "right" },
    { key: "price", alignment: "right" },
    { key: "pricePerM2", alignment: "right" },
    { key: "source", alignment: "left" },
    { key: "author", alignment: "left" },
    { key: "publishedAt", alignment: "left" },
    { key: "actualizedAt", alignment: "left" },
  ],
  Дома: [
    { key: "address", alignment: "left" },
    { key: "area", alignment: "right" },
    { key: "landArea", alignment: "right" },
    { key: "price", alignment: "right" },
    { key: "pricePerM2", alignment: "right" },
    { key: "source", alignment: "left" },
    { key: "author", alignment: "left" },
    { key: "publishedAt", alignment: "left" },
    { key: "actualizedAt", alignment: "left" },
  ],
  Участки: [
    { key: "address", alignment: "left" },
    { key: "landArea", alignment: "right" },
    { key: "price", alignment: "right" },
    { key: "pricePerSotka", alignment: "right" },
    { key: "source", alignment: "left" },
    { key: "author", alignment: "left" },
    { key: "publishedAt", alignment: "left" },
    { key: "actualizedAt", alignment: "left" },
  ],
} as const;

const archivePhotos = [
  { alt: "Гостиная объекта", src: "/Rhood/assets/obj-livingroom.jpg" },
  { alt: "Спальня объекта", src: "/Rhood/assets/obj-badroom.jpg" },
  { alt: "Фасад дома", src: "/Rhood/assets/obj-outside.jpg" },
];

const sortOptions: { label: string; value: Exclude<SortState, null> }[] = [
  {
    label: "По дате — новые",
    value: { column: "publishedAt", direction: "desc" },
  },
  {
    label: "По дате — старые",
    value: { column: "publishedAt", direction: "asc" },
  },
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

function getListingImage(listing: (typeof listings)[number]) {
  if (listing.type === "HOUSE") return "/Rhood/assets/obj-outside.jpg";
  if (listing.type === "LAND") return "/Rhood/assets/archive-unsplash-exterior-1.jpg";
  const hash = [...listing.id].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 0);
  return listingCardPhotos[hash % listingCardPhotos.length];
}

function getMaximumFractionDigits(values: readonly (number | null | undefined)[]): number {
  return values.reduce<number>((maximum, value) => {
    if (value == null) return maximum;
    return Math.max(maximum, value.toString().split(".")[1]?.length ?? 0);
  }, 0);
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
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
  return Number(listing.price);
}

function getSpecs(listing: (typeof listings)[number]) {
  if (listing.type === "LAND") {
    return `Участок, ${listing.area.toLocaleString("ru-RU")} сот.`;
  }

  if (listing.type === "HOUSE") {
    const landArea = listing.landArea
      ? `, участок ${listing.landArea.toLocaleString("ru-RU")} сот.`
      : "";
    return `Дом, ${listing.area.toLocaleString("ru-RU")} м²${landArea}`;
  }

  const rooms = listing.roomCount === 0 ? "Ст." : `${listing.roomCount} ком.`;
  return `${rooms}, ${listing.area.toLocaleString("ru-RU")} м², этаж ${listing.floor}/${listing.floorCount}`;
}

function getObjectInfoData(listing: (typeof listings)[number]) {
  const price = getPrice(listing);
  const previousPrice = Number(listing.priceHistory?.[1]?.price);
  const priceTrend = Number.isFinite(previousPrice)
    ? price > previousPrice ? "up" as const : price < previousPrice ? "down" as const : null
    : null;

  return {
    address: listing.address,
    author: listing.clientName ?? "Частное лицо",
    buyerCount: listing.buyerDemandAvailableCount ?? 0,
    commentCount: listing._count.comments,
    constructionYear: "constructionYear" in listing ? listing.constructionYear : null,
    description: listing.description,
    imageSrc: getListingImage(listing),
    phone: listing.phone,
    price,
    pricePerArea: Math.round(price / listing.area),
    pricePerAreaUnit: listing.type === "LAND" ? "сот." as const : "м²" as const,
    priceTrend,
    publishedAt: formatPublishedAt(listing.publishedAt),
    renovationType: "renovationType" in listing ? listing.renovationType : null,
    source: formatSource(listing.domain),
    sourceHref: sourceHref(listing.domain, listing.url ?? ""),
    specs: getSpecs(listing),
    status: listing.userStatus ? "В работе" : "Еще не звонили из Rhood",
  };
}

function TableToolbar({
  archive = false,
  archivePropertyType = "Квартиры",
  hiddenColumns,
  onHiddenColumnsChange,
  onLeaderboardOpen,
  onCardsViewChange,
  onSortChange,
  myListings = false,
  cardsView = false,
  showColumnsControl = true,
  showLeaderboard = true,
  showMap = true,
  sort,
}: {
  archive?: boolean;
  archivePropertyType?: ArchivePropertyType;
  hiddenColumns: ReadonlySet<ColumnKey>;
  onHiddenColumnsChange: (columns: Set<ColumnKey>) => void;
  onLeaderboardOpen: () => void;
  onCardsViewChange: (cardsView: boolean) => void;
  onSortChange: (sort: SortState) => void;
  myListings?: boolean;
  cardsView?: boolean;
  showColumnsControl?: boolean;
  showLeaderboard?: boolean;
  showMap?: boolean;
  sort: SortState;
}) {
  const columnsMenuRef = React.useRef<HTMLDivElement>(null);
  const sortMenuRef = React.useRef<HTMLDivElement>(null);
  const [columnsOpen, setColumnsOpen] = useMenuOpen(columnsMenuRef);
  const [sortOpen, setSortOpen] = useMenuOpen(sortMenuRef);
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
  }, [columnsOpen, setColumnsOpen]);

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

  const toolbarButtonAppearance = myListings ? "default" : "ghost";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className={sortOpen ? "relative z-40" : "relative"} ref={sortMenuRef}>
      <Select
        appearance="ghost"
        aria-expanded={sortOpen}
        aria-haspopup="menu"
        expanded={sortOpen}
        label={false}
        onExpandedChange={setSortOpen}
        menu={
          sortOpen && (
            <Menu
              className="absolute left-0 top-full z-50 mt-1 min-w-[280px]"
              role="menu"
            >
              {sortOptions.map((option) => (
                <MenuItemSingleSelect
                  icon={false}
                  key={option.label}
                  onClick={(event) => {
                    event.stopPropagation();
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
      </div>

      {showMap && <Button
        appearance={toolbarButtonAppearance}
        endIcon={false}
        onClick={() => onCardsViewChange(!cardsView)}
        size="sm"
        startIcon={cardsView ? <Table2 aria-hidden="true" strokeWidth={2} /> : <Map aria-hidden="true" strokeWidth={2} />}
      >
        {cardsView ? "Списком" : "На карте"}
      </Button>}

      {showLeaderboard && <Button
        appearance={toolbarButtonAppearance}
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
      {showColumnsControl && !cardsView && <div className="relative ml-auto" ref={columnsMenuRef}>
        <Button
          appearance={myListings ? "ghost" : toolbarButtonAppearance}
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
            className="absolute right-0 top-full z-30 mt-1"
            role="menu"
          >
              {(archive ? archiveColumnsByPropertyType[archivePropertyType] : myListings ? myListingsTableColumns : listingsTableColumns).map((column) => (
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
      </div>}
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
  propertyType,
  showActions = true,
  showCall = true,
  sort,
  sortable = true,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  onSort: (column: SortColumn) => void;
  propertyType: ArchivePropertyType;
  showActions?: boolean;
  showCall?: boolean;
  sort: SortState;
  sortable?: boolean;
}) {
  return (
    <TableRow>
      <TableCell
        column="selection"
        paddingX
        role="head"
        compact
        sort={false}
        type="checkbox"
        width={36}
      />
      <TableCell
        className="min-w-[300px]"
        column="address"
        helpIcon={false}
        role="head"
        compact
        sort={false}
        type="text"
        width="fill"
      >
        Адрес
      </TableCell>
      {!hiddenColumns.has("buyer") && (
        <TableCell
          column="buyer"
          aria-label="Покупатели"
          helpTooltip="Покупатели с точным совпадением потребности под этот объект в Космосе"
          onClick={sortable ? () => onSort("buyer") : undefined}
          role="head"
          compact
          sort={sortable}
          sortDirection={
            sortable && sort?.column === "buyer" ? sort.direction : undefined
          }
          type="number"
          width={BUYER_COLUMN_WIDTH}
        >
          <CircleUser aria-hidden="true" className="size-5" />
        </TableCell>
      )}
      {showCall && <TableCell
        column="call"
        aria-label="Позвонить"
        helpTooltip="Звонок будет совершен из Rhood, мы его запишем и расшифруем"
        role="head"
        compact
        sort={false}
        type="text"
        width={CALL_COLUMN_WIDTH}
      >
        <Phone aria-hidden="true" className="size-5" />
      </TableCell>}
      {!hiddenColumns.has("price") && (
        <TableCell
          column="price"
          helpIcon={false}
          onClick={sortable ? () => onSort("price") : undefined}
          role="head"
          compact
          sort={sortable}
          sortDirection={
            sortable && sort?.column === "price" ? sort.direction : undefined
          }
          type="number"
          width={PRICE_COLUMN_WIDTH}
        >
          <>
            Цена, ₽
            <br />
            {propertyType === "Участки" ? "Цена, ₽/сот." : "Цена, ₽/м²"}
          </>
        </TableCell>
      )}
      {!hiddenColumns.has("liquidity") && (
        <TableCell
          column="liquidity"
          helpIcon={false}
          role="head"
          compact
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
          compact
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
          compact
          sort={sortable}
          sortDirection={
            sortable && sort?.column === "publishedAt"
              ? sort.direction
              : undefined
          }
          type="text"
          width={PUBLISHED_AT_COLUMN_WIDTH}
        >
          Опубликован
        </TableCell>
      )}
      {!hiddenColumns.has("status") && (
        <TableCell
          column="status"
          helpIcon={false}
          role="head"
          compact
          sort={false}
          type="text"
          width={236}
        >
          Статус
        </TableCell>
      )}
      {showActions && <TableCell
        aria-label="Действия"
        column="actions"
        helpIcon={false}
        role="head"
        compact
        sort={false}
        type="text"
        width={118}
      >
        Действия
      </TableCell>}
    </TableRow>
  );
}

function ArchiveResultHeader({
  columns,
  hiddenColumns,
}: {
  columns: ArchiveColumn[];
  hiddenColumns: ReadonlySet<ColumnKey>;
}) {
  const availableColumns = new Set(columns.map(({ key }) => key));
  const label = (key: ColumnKey) => columns.find((column) => column.key === key)?.label ?? "";

  return (
    <TableRow>
        {availableColumns.has("address") && !hiddenColumns.has("address") && <TableCell column="address" helpIcon={false} role="head" sort={false} type="text" width="fill">
          {label("address")}
        </TableCell>}
        {availableColumns.has("rooms") && !hiddenColumns.has("rooms") && <TableCell column="rooms" helpIcon={false} role="head" sort={false} type="number" width={60}>
          {label("rooms")}
        </TableCell>}
        {availableColumns.has("area") && !hiddenColumns.has("area") && <TableCell column="area" helpIcon={false} role="head" sort={false} type="number" width={96}>
          {label("area")}
        </TableCell>}
        {availableColumns.has("landArea") && !hiddenColumns.has("landArea") && <TableCell column="landArea" helpIcon={false} role="head" sort={false} type="number" width={120}>
          {label("landArea")}
        </TableCell>}
        {availableColumns.has("floor") && !hiddenColumns.has("floor") && <TableCell column="floor" helpIcon={false} role="head" sort={false} type="number" width={70}>
          {label("floor")}
        </TableCell>}
        {availableColumns.has("price") && !hiddenColumns.has("price") && <TableCell column="price" helpIcon={false} role="head" sort={false} type="number" width={110}>
          {label("price")}
        </TableCell>}
        {availableColumns.has("pricePerM2") && !hiddenColumns.has("pricePerM2") && <TableCell column="pricePerM2" helpIcon={false} role="head" sort={false} type="number" width={110}>
          {label("pricePerM2")}
        </TableCell>}
        {availableColumns.has("pricePerSotka") && !hiddenColumns.has("pricePerSotka") && <TableCell column="pricePerSotka" helpIcon={false} role="head" sort={false} type="number" width={120}>
          {label("pricePerSotka")}
        </TableCell>}
        {availableColumns.has("source") && !hiddenColumns.has("source") && <TableCell column="source" helpIcon={false} role="head" sort={false} type="text" width={110}>
          {label("source")}
        </TableCell>}
        {availableColumns.has("author") && !hiddenColumns.has("author") && <TableCell column="author" helpIcon={false} role="head" sort={false} type="text" width={130}>
          {label("author")}
        </TableCell>}
        {availableColumns.has("publishedAt") && !hiddenColumns.has("publishedAt") && <TableCell column="publishedAt" helpIcon={false} role="head" sort={false} type="text" width={120}>
          {label("publishedAt")}
        </TableCell>}
        {availableColumns.has("actualizedAt") && !hiddenColumns.has("actualizedAt") && <TableCell column="actualizedAt" helpIcon={false} role="head" sort={false} type="text" width={120}>
          {label("actualizedAt")}
        </TableCell>}
    </TableRow>
  );
}

function ArchiveResultRow({
  areaFractionDigits,
  propertyType,
  landAreaFractionDigits,
  hiddenColumns,
  listing,
  onOpen,
}: {
  areaFractionDigits: number;
  propertyType: ArchivePropertyType;
  landAreaFractionDigits: number;
  hiddenColumns: ReadonlySet<ColumnKey>;
  listing: (typeof listings)[number];
  onOpen: () => void;
}) {
  const price = getPrice(listing);
  const availableColumns = new Set(archiveColumnsByPropertyType[propertyType].map(({ key }) => key));
  const pricePerM2 = Math.round(price / listing.area);
  const landArea = listing.landArea ?? (propertyType === "Участки" ? listing.area : null);
  const pricePerSotka = landArea ? Math.round(price / landArea) : null;
  const areaValue = (value: number | null | undefined, fractionDigits: number) =>
    value == null ? "—" : value.toLocaleString("ru-RU", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

  return (
    <TableRow hover onClick={onOpen}>
      {availableColumns.has("address") && !hiddenColumns.has("address") && <TableCell column="address" role="body" type="text" width="fill">
        {listing.address}
      </TableCell>}
      {availableColumns.has("rooms") && !hiddenColumns.has("rooms") && <TableCell column="rooms" role="body" type="number" width={60}>
        {listing.roomCount === 0 ? "Студия" : listing.roomCount}
      </TableCell>}
      {availableColumns.has("area") && !hiddenColumns.has("area") && <TableCell column="area" role="body" type="number" width={96}>
        {areaValue(listing.area, areaFractionDigits)}
      </TableCell>}
      {availableColumns.has("landArea") && !hiddenColumns.has("landArea") && <TableCell column="landArea" role="body" type="number" width={120}>
        {areaValue(landArea, landAreaFractionDigits)}
      </TableCell>}
      {availableColumns.has("floor") && !hiddenColumns.has("floor") && <TableCell column="floor" role="body" type="number" width={70}>
        {listing.floor}/{listing.floorCount}
      </TableCell>}
      {availableColumns.has("price") && !hiddenColumns.has("price") && <TableCell column="price" role="body" type="number" width={110}>
        {formatNumber(price)}
      </TableCell>}
      {availableColumns.has("pricePerM2") && !hiddenColumns.has("pricePerM2") && <TableCell column="pricePerM2" role="body" type="number" width={110}>
        {formatNumber(pricePerM2)}
      </TableCell>}
      {availableColumns.has("pricePerSotka") && !hiddenColumns.has("pricePerSotka") && <TableCell column="pricePerSotka" role="body" type="number" width={120}>
        {pricePerSotka == null ? "—" : formatNumber(pricePerSotka)}
      </TableCell>}
      {availableColumns.has("source") && !hiddenColumns.has("source") && <TableCell column="source" role="body" type="text" width={110}>
        {formatSource(listing.domain)}
      </TableCell>}
      {availableColumns.has("author") && !hiddenColumns.has("author") && <TableCell column="author" role="body" type="text" width={130}>
        {listing.clientName ?? "Частное лицо"}
      </TableCell>}
      {availableColumns.has("publishedAt") && !hiddenColumns.has("publishedAt") && <TableCell className="tabular-nums" column="publishedAt" role="body" type="text" width={120}>
        {formatDate(listing.publishedAt)}
      </TableCell>}
      {availableColumns.has("actualizedAt") && !hiddenColumns.has("actualizedAt") && <TableCell className="tabular-nums" column="actualizedAt" role="body" type="text" width={120}>
        {formatDate(listing.actualizedAt)}
      </TableCell>}
    </TableRow>
  );
}

function ArchiveListingsTable({
  className,
  currentPage,
  hiddenColumns,
  propertyType,
  listings: tableListings,
  onOpenObjectInfo,
  sort,
}: {
  className?: string;
  currentPage: number;
  hiddenColumns: ReadonlySet<ColumnKey>;
  propertyType: ArchivePropertyType;
  listings: readonly (typeof listings)[number][];
  onOpenObjectInfo: (listing: (typeof listings)[number]) => void;
  sort: SortState;
}) {
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
              : first.buyerDemandAvailableCount ?? 0;
      const secondValue =
        sort.column === "price"
          ? getPrice(second)
          : sort.column === "pricePerM2"
            ? Math.round(getPrice(second) / second.area)
            : sort.column === "publishedAt"
              ? new Date(second.publishedAt).getTime()
              : second.buyerDemandAvailableCount ?? 0;

      return sort.direction === "asc"
        ? firstValue - secondValue
        : secondValue - firstValue;
    })
    .slice((currentPage - 1) * LISTINGS_PER_PAGE, currentPage * LISTINGS_PER_PAGE);
  const areaFractionDigits = getMaximumFractionDigits(tableListings.map(({ area }) => area));
  const landAreaFractionDigits = getMaximumFractionDigits(tableListings.map((listing) =>
    listing.landArea ?? (propertyType === "Участки" ? listing.area : null),
  ));

  return (
    <Table
      bordered
      className={className}
      columns={archiveTableColumnsByPropertyType[propertyType]}
      minWidth={1200}
      stickyHeader
      verticalBorders
    >
      <ArchiveResultHeader
        columns={archiveColumnsByPropertyType[propertyType]}
        hiddenColumns={hiddenColumns}
      />
      {sortedListings.map((listing) => (
        <ArchiveResultRow
          key={listing.id}
          areaFractionDigits={areaFractionDigits}
          hiddenColumns={hiddenColumns}
          listing={listing}
          landAreaFractionDigits={landAreaFractionDigits}
          propertyType={propertyType}
          onOpen={() => onOpenObjectInfo(listing)}
        />
      ))}
    </Table>
  );
}

function sortListings(tableListings: readonly (typeof listings)[number][], sort: SortState) {
  return [...tableListings].sort((first, second) => {
      if (!sort) return 0;

      const firstValue =
        sort.column === "price"
          ? getPrice(first)
          : sort.column === "pricePerM2"
            ? Math.round(getPrice(first) / first.area)
            : sort.column === "publishedAt"
              ? new Date(first.publishedAt).getTime()
              : first.buyerDemandAvailableCount ?? 0;
      const secondValue =
        sort.column === "price"
          ? getPrice(second)
          : sort.column === "pricePerM2"
            ? Math.round(getPrice(second) / second.area)
            : sort.column === "publishedAt"
              ? new Date(second.publishedAt).getTime()
              : second.buyerDemandAvailableCount ?? 0;
      const comparison = firstValue - secondValue;

      return sort.direction === "asc" ? comparison : -comparison;
  });
}

function ListingsList({
  currentPage,
  listings: tableListings,
  onOpenObjectInfo,
  onPreviewObjectInfo,
  selectedListingId,
  viewedListingIds,
  sort,
}: {
  currentPage: number;
  listings: readonly (typeof listings)[number][];
  onOpenObjectInfo: (listing: (typeof listings)[number]) => void;
  onPreviewObjectInfo: (listing: (typeof listings)[number]) => void;
  selectedListingId?: string;
  sort: SortState;
  viewedListingIds: ReadonlySet<string>;
}) {
  const [selectedListingIds, setSelectedListingIds] = React.useState<ReadonlySet<string>>(() => new Set());
  const sortedListings = sortListings(tableListings, sort)
    .slice((currentPage - 1) * LISTINGS_PER_PAGE, currentPage * LISTINGS_PER_PAGE);

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
    <List aria-label="Объекты" className="mt-3" role="list">
      {sortedListings.map((listing) => {
        const selected = listing.id === selectedListingId;
        return <div key={listing.id} onMouseEnter={() => onPreviewObjectInfo(listing)} role="listitem">
          <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
            <Checkbox
              aria-label={`Выбрать объект: ${getSpecs(listing)}, ${listing.address}`}
              checked={selectedListingIds.has(listing.id)}
              label={false}
              onChange={(event) => {
                const checked = event.target.checked;
                setSelectedListingIds((current) => {
                  const next = new Set(current);
                  if (checked) next.add(listing.id);
                  else next.delete(listing.id);
                  return next;
                });
              }}
              size="sm"
            />
            <button
              aria-current={selected ? "true" : undefined}
              className="grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-2 text-left"
              onClick={() => onOpenObjectInfo(listing)}
              onFocus={() => onPreviewObjectInfo(listing)}
              type="button"
            >
              <span className="min-w-0">
                <span className={cn("block rh-typography-b2", selected || viewedListingIds.has(listing.id) ? "text-[var(--rh-theme-text-neutral-primary)]" : "text-[var(--rh-theme-text-neutral-secondary)]", selected && "font-semibold")}>{getSpecs(listing)}</span>
                <span className="block truncate rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">{listing.address}</span>
              </span>
              <span className={cn("rh-typography-b2 tabular-nums whitespace-nowrap", selected ? "text-[var(--rh-theme-text-neutral-primary)]" : "text-[var(--rh-theme-text-neutral-secondary)]")}>{formatNumber(getPrice(listing))} ₽</span>
            </button>
          </div>
        </div>;
      })}
    </List>
  );
}

function getObjectCountLabel(count: number) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const noun = lastTwoDigits >= 11 && lastTwoDigits <= 14
    ? "объектов"
    : lastDigit === 1
      ? "объект"
      : lastDigit >= 2 && lastDigit <= 4
        ? "объекта"
        : "объектов";

  return `${count} ${noun}`;
}

function MyListingsTable({
  className,
  currentPage,
  hiddenColumns,
  listings: tableListings,
}: {
  className?: string;
  currentPage: number;
  hiddenColumns: ReadonlySet<ColumnKey>;
  listings: readonly MyListingRow[];
}) {
  const pageListings = tableListings.slice(
    (currentPage - 1) * LISTINGS_PER_PAGE,
    currentPage * LISTINGS_PER_PAGE,
  );

  if (tableListings.length === 0) {
    return (
      <div className="px-4 py-8 text-center rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">
        Нет объектов по выбранным фильтрам
      </div>
    );
  }

  return (
    <Table
      bordered
      className={className}
      columns={[
        ...myListingsTableColumns
          .filter(({ key }) => !hiddenColumns.has(key))
          .map(({ key }) => ({
            key,
            alignment: key === "price" || key === "pricePerM2" ? "right" as const : key === "id" ? "center" as const : "left" as const,
          })),
      ]}
      minWidth={1440}
      stickyHeader
      verticalBorders
    >
      <TableRow>
        {!hiddenColumns.has("address") && <TableCell column="address" helpIcon={false} role="head" sort={false} type="text" width="fill">Адрес</TableCell>}
        {!hiddenColumns.has("price") && <TableCell column="price" helpIcon helpTooltip="Мы постоянно сравниваем актуальные цены из CRM с изменениями цен на агрегаторе" role="head" sort={false} type="number" width={PRICE_COLUMN_WIDTH}>Цена, ₽</TableCell>}
        {!hiddenColumns.has("pricePerM2") && <TableCell column="pricePerM2" helpIcon={false} role="head" sort={false} type="number" width={PRICE_COLUMN_WIDTH}>Цена за м², ₽</TableCell>}
        {!hiddenColumns.has("duplicates") && <TableCell column="duplicates" helpIcon helpTooltip="Объекты, найденные на других площадках, как возможные дубли" role="head" sort={false} type="text" width={MY_LISTING_DUPLICATES_COLUMN_WIDTH}>Дубли</TableCell>}
        {!hiddenColumns.has("savedAt") && <TableCell column="savedAt" helpIcon={false} role="head" sort={false} type="text" width={176}>Сохранен в CRM</TableCell>}
        {!hiddenColumns.has("crmStatus") && <TableCell column="crmStatus" helpIcon={false} role="head" sort={false} type="text" width={MY_LISTING_STATUS_COLUMN_WIDTH}>Статус в CRM</TableCell>}
        {!hiddenColumns.has("id") && <TableCell column="id" helpIcon={false} role="head" sort={false} type="text" width={56}>ID</TableCell>}
      </TableRow>
      {pageListings.map(({ listing, duplicateCount, duplicatePriceStatus, crmStatus }) => {
        const price = getPrice(listing);

        return (
          <TableRow key={listing.id}>
            {!hiddenColumns.has("address") && <TableCell column="address" role="body" type="text" width="fill">
              <Link
                external
                externalLabel="Космос"
                href={sourceHref(listing.domain, listing.url ?? "")}
                onClick={(event) => event.stopPropagation()}
                rel="noreferrer"
                size="b2"
                target="_blank"
              >
                {listing.address}
              </Link>
            </TableCell>}
            {!hiddenColumns.has("price") && <TableCell column="price" role="body" type="number" width={PRICE_COLUMN_WIDTH}>{formatNumber(price)}</TableCell>}
            {!hiddenColumns.has("pricePerM2") && <TableCell column="pricePerM2" role="body" type="number" width={PRICE_COLUMN_WIDTH}>{formatNumber(Math.round(price / listing.area))}</TableCell>}
            {!hiddenColumns.has("duplicates") && <TableCell
              column="duplicates"
              custom
              helpIcon={Boolean(duplicatePriceStatus)}
              helpTooltip={duplicatePriceStatus === "cheaper"
                ? "Есть дешевле"
                : duplicatePriceStatus === "more-expensive"
                  ? "Есть дороже"
                  : undefined}
              role="body"
              type="text"
              width={MY_LISTING_DUPLICATES_COLUMN_WIDTH}
            >
              <div className="flex min-h-5 w-full items-center justify-between gap-1">
                {duplicateCount > 0 ? (
                  <Link href="#duplicates" onClick={(event) => event.stopPropagation()} size="b2">
                    {getObjectCountLabel(duplicateCount)}
                  </Link>
                ) : "—"}
                {duplicatePriceStatus && (
                  <span
                    aria-label={duplicatePriceStatus === "cheaper" ? "Есть дешевле" : "Есть дороже"}
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-[var(--rh-sizing-border-radius-md)]",
                      duplicatePriceStatus === "cheaper"
                        ? "bg-[var(--rh-theme-fill-error-light)] text-[var(--rh-theme-icon-error)]"
                        : "bg-[var(--rh-theme-fill-success-light)] text-[var(--rh-theme-icon-success)]",
                    )}
                    role="img"
                  >
                    {duplicatePriceStatus === "cheaper"
                      ? <ChevronsDown aria-hidden="true" className="size-4" />
                      : <ChevronsUp aria-hidden="true" className="size-4" />}
                  </span>
                )}
              </div>
            </TableCell>}
            {!hiddenColumns.has("savedAt") && <TableCell className="tabular-nums" column="savedAt" role="body" type="text" width={176}>
              {formatPublishedAt(listing.createdAt)}
            </TableCell>}
            {!hiddenColumns.has("crmStatus") && <TableCell column="crmStatus" role="body" type="chip" width={MY_LISTING_STATUS_COLUMN_WIDTH}>
              <Chip appearance="muted" className="shrink-0 self-start" color={crmStatus.color} icon={false} propDelete={false} size="sm">
                {crmStatus.label}
              </Chip>
            </TableCell>}
            {!hiddenColumns.has("id") && <TableCell column="id" role="body" type="button" width={56}>
              <IconButton
                aria-label={`Скопировать ID ${listing.id}`}
                appearance="inherit"
                icon={<Copy aria-hidden="true" strokeWidth={2} />}
                onClick={(event) => {
                  event.stopPropagation();
                  void navigator.clipboard?.writeText(String(listing.id));
                }}
                size="sm"
              />
            </TableCell>}
          </TableRow>
        );
      })}
    </Table>
  );
}

const listingCardPhotos = [
  "/Rhood/assets/object-gallery-2.png",
  "/Rhood/assets/object-gallery-3.png",
  "/Rhood/assets/object-gallery-4.png",
  "/Rhood/assets/obj-livingroom.jpg",
];

const mapObjectMarkers = [
  [8, 29], [12, 64], [19, 47], [22, 74], [25, 85], [27, 31], [31, 56], [34, 41],
  [36, 24], [38, 70], [40, 49], [44, 35], [44, 84], [47, 58], [50, 46], [53, 63],
  [56, 38], [57, 26], [58, 51], [60, 72], [63, 44], [66, 58], [68, 35], [71, 67],
  [73, 23], [74, 47], [78, 56], [82, 36], [86, 62], [91, 48],
] as const;

const mapObjectMarkerCounts: Record<number, number> = {
  2: 3,
  7: 2,
  13: 4,
  18: 2,
  24: 3,
};

function sourceHref(domain: string, path: string) {
  const host = {
    AVITO: "https://www.avito.ru",
    CIAN: "https://www.cian.ru",
    DOMCLICK: "https://domclick.ru",
    YANDEX: "https://realty.yandex.ru",
  }[domain] ?? "#";
  return `${host}${path.startsWith("/") ? path : `/${path}`}`;
}

function ListingsCardGrid({
  currentPage,
  listings: tableListings,
  viewedListingIds,
  onOpenObjectInfo,
  sort,
}: {
  currentPage: number;
  listings: readonly (typeof listings)[number][];
  viewedListingIds: ReadonlySet<string>;
  onOpenObjectInfo: (listing: (typeof listings)[number]) => void;
  sort: SortState;
}) {
  const sortedListings = [...tableListings]
    .sort((first, second) => {
      if (!sort) return 0;
      const firstValue = sort.column === "price"
        ? getPrice(first)
        : sort.column === "pricePerM2"
          ? Math.round(getPrice(first) / first.area)
          : sort.column === "publishedAt"
            ? new Date(first.publishedAt).getTime()
          : first.buyerDemandAvailableCount ?? 0;
      const secondValue = sort.column === "price"
        ? getPrice(second)
        : sort.column === "pricePerM2"
          ? Math.round(getPrice(second) / second.area)
          : sort.column === "publishedAt"
            ? new Date(second.publishedAt).getTime()
          : second.buyerDemandAvailableCount ?? 0;
      return sort.direction === "asc" ? firstValue - secondValue : secondValue - firstValue;
    })
    .slice((currentPage - 1) * LISTINGS_PER_PAGE, currentPage * LISTINGS_PER_PAGE);

  if (!sortedListings.length) {
    return <div className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)] grid min-h-52 place-items-center text-center rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">Ничего не найдено</div>;
  }

  return (
    <div className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)] flex flex-wrap items-start gap-3">
      {sortedListings.map((listing, index) => (
        <ObjectCard
          address={listing.address}
          author={listing.clientName ?? "Частное лицо"}
          details={getSpecs(listing)}
          image={listingCardPhotos[(currentPage * LISTINGS_PER_PAGE + index) % listingCardPhotos.length]}
          imageAlt={`Объект недвижимости: ${listing.address}`}
          key={listing.id}
          onDetailsClick={() => onOpenObjectInfo(listing)}
          price={`${formatNumber(getPrice(listing))} ₽`}
          pricePerM2={`${formatNumber(Math.round(getPrice(listing) / listing.area))} ₽/м²`}
          publishedAt={`Опубликован: ${formatPublishedAt(listing.publishedAt)}`}
          source={formatSource(listing.domain)}
          sourceHref={sourceHref(listing.domain, listing.url ?? "")}
          viewed={viewedListingIds.has(listing.id)}
          subway={false}
        />
      ))}
    </div>
  );
}

export function ApartmentListingsExperimentScreen({
  view = "base",
}: {
  view?: "base" | "my" | "archive";
}) {
  const isMyListings = view === "my";
  const isArchive = view === "archive";
  const [myPropertyType, setMyPropertyType] = React.useState<ArchivePropertyType>("Квартиры");
  const [myCrmStatus, setMyCrmStatus] = React.useState("Все статусы");
  const [basePropertyType, setBasePropertyType] = React.useState<ArchivePropertyType>("Квартиры");
  const [baseFilterValues, setBaseFilterValues] = React.useState<ObjectFilterValues>({
    city: [], propertyType: "Квартиры", roominess: [], areaStart: "", areaEnd: "", priceStart: "", priceEnd: "", source: [], author: [],
  });
  const baseListings = listingsByPropertyType[basePropertyType].filter((listing) => {
    const { city, roominess, areaStart, areaEnd, priceStart, priceEnd, source, author } = baseFilterValues;
    if (city.length && !city.some((cityName) => listing.address.toLowerCase().includes(cityName.toLowerCase()))) return false;
    if (roominess.length && !roominess.some((room) => room === "Студия"
      ? listing.roomCount === 0 || listing.description?.toLowerCase().includes("студия")
      : room === "4+" ? (listing.roomCount ?? 0) >= 4 : listing.roomCount === Number(room))) return false;
    if (areaStart && listing.area < Number(areaStart)) return false;
    if (areaEnd && listing.area > Number(areaEnd)) return false;
    if (priceStart && Number(listing.price) < Number(priceStart)) return false;
    if (priceEnd && Number(listing.price) > Number(priceEnd)) return false;
    const sourceDomains: Record<string, string> = { "Авито": "AVITO", "Циан": "CIAN", "Домклик": "DOMCLICK", "Яндекс Недвижимость": "YANDEX" };
    if (source.length && !source.some((sourceName) => listing.domain === sourceDomains[sourceName])) return false;
    const authorTypes: Record<string, string> = { "Частное лицо": "OWNER", "Агентство": "AGENCY" };
    if (author.length && !author.some((authorName) => listing.author === authorTypes[authorName])) return false;
    return true;
  });
  const [archivePropertyType, setArchivePropertyType] = React.useState<
    keyof typeof archiveListingsByPropertyType
  >("Квартиры");
  const screenListings = isArchive
    ? archiveListingsByPropertyType[archivePropertyType].map((listing) => ({
        ...listing,
        clientName: listing.author === "AGENCY" ? "Агентство" : "Частное лицо",
        buyerDemandAvailableCount: 0,
      })) as unknown as typeof listings
    : isMyListings
      ? listings
      : baseListings;
  const myObjectRows: MyListingRow[] = screenListings.map((listing, originalIndex) => ({
    listing,
    originalIndex,
    duplicateCount: originalIndex % 5 === 4 ? 0 : originalIndex % 4 + 1,
    duplicatePriceStatus: originalIndex % 5 === 0
      ? "cheaper"
      : originalIndex % 5 === 1
        ? "more-expensive"
        : null,
    crmStatus: myObjectStatuses[originalIndex % myObjectStatuses.length],
  }));
  const filteredMyObjectRows = myObjectRows.filter(({ listing, crmStatus }) => (
    listing.type === listingTypeByPropertyType[myPropertyType]
    && (myCrmStatus === "Все статусы" || crmStatus.label === myCrmStatus)
  ));
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<ColumnKey>>(
    new Set(),
  );
  const [sort, setSort] = React.useState<SortState>({
    column: "publishedAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [leaderboardOpen, setLeaderboardOpen] = React.useState(false);
  const [cardsView, setCardsView] = React.useState(false);
  const isMapView = !isMyListings && cardsView;
  const mapListObjectCount = isArchive
    ? archiveObjectCountByPropertyType[archivePropertyType]
    : screenListings.length;
  const mapListPropertyType = isArchive ? archivePropertyType : basePropertyType;
  const [selectedListing, setSelectedListing] = React.useState<
    (typeof listings)[number] | null
  >(null);
  const [previewListing, setPreviewListing] = React.useState<(typeof listings)[number] | null>(null);
  const visibleBaseListings = sortListings(baseListings, sort)
    .slice((currentPage - 1) * LISTINGS_PER_PAGE, currentPage * LISTINGS_PER_PAGE);
  const activePreviewListing = visibleBaseListings.find((listing) => listing.id === previewListing?.id)
    ?? visibleBaseListings[0]
    ?? null;
  const [viewedListingIds, setViewedListingIds] = React.useState<Set<string>>(() => {
    try {
      const stored = window.localStorage.getItem(VIEWED_LISTINGS_STORAGE_KEY);
      return new Set(stored ? JSON.parse(stored) as string[] : []);
    } catch {
      return new Set();
    }
  });
  const [selectedMapMarkerIndex, setSelectedMapMarkerIndex] = React.useState<number | null>(null);
  const [closingMapMarkerIndex, setClosingMapMarkerIndex] = React.useState<number | null>(null);
  const mapSidebarCloseTimer = React.useRef<number | null>(null);
  const [mapZoom, setMapZoom] = React.useState(1);
  const visibleMapMarkerIndex = selectedMapMarkerIndex ?? closingMapMarkerIndex;
  const selectedMapMarkerCount = visibleMapMarkerIndex === null
    ? 0
    : mapObjectMarkerCounts[visibleMapMarkerIndex] ?? 1;
  const selectedMapListings = visibleMapMarkerIndex === null || screenListings.length === 0
    ? []
    : Array.from({ length: selectedMapMarkerCount }, (_, offset) => (
        screenListings[(visibleMapMarkerIndex + offset) % screenListings.length]
      ));

  function closeMapSidebar() {
    if (selectedMapMarkerIndex === null) return;
    setClosingMapMarkerIndex(selectedMapMarkerIndex);
    setSelectedMapMarkerIndex(null);
    if (mapSidebarCloseTimer.current !== null) window.clearTimeout(mapSidebarCloseTimer.current);
    mapSidebarCloseTimer.current = window.setTimeout(() => {
      setClosingMapMarkerIndex(null);
      mapSidebarCloseTimer.current = null;
    }, 300);
  }

  function openListing(listing: (typeof listings)[number]) {
    setViewedListingIds((current) => {
      if (current.has(listing.id)) return current;
      const next = new Set(current).add(listing.id);
      try {
        window.localStorage.setItem(VIEWED_LISTINGS_STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Keep the viewed state for this session when storage is unavailable.
      }
      return next;
    });
    setSelectedListing(listing);
  }

  const tableToolbar = <TableToolbar
    archive={isArchive}
    archivePropertyType={archivePropertyType}
    hiddenColumns={hiddenColumns}
    onHiddenColumnsChange={setHiddenColumns}
    onLeaderboardOpen={() => setLeaderboardOpen(true)}
    onCardsViewChange={setCardsView}
    onSortChange={setSort}
    myListings={isMyListings}
    cardsView={cardsView}
    showColumnsControl={isMyListings || isArchive}
    showLeaderboard={!isMyListings && !isArchive}
    showMap={!isMyListings}
    sort={sort}
  />;

  return (
    <div className={cn(
      "overflow-x-clip bg-[var(--rh-theme-surface-bg)] text-[var(--parser-text-neutral-primary)]",
      isMapView ? "flex h-svh flex-col overflow-hidden" : "min-h-screen",
    )}>
      <MainHeader
        contentWidth="container"
        logoHref="/Rhood/"
        navItems={getNavItems(view)}
      />
      <main className={cn("grid min-w-0 gap-0", isMapView && "min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)]")}>
        <>
            <section className={cn("py-8", !isMyListings && !isArchive && "border-b border-[var(--rh-theme-border-light)]")}>
              <div className="rhood-layout-container">
              {isMyListings ? (
                <>
                  <h1 className="rh-typography-h2 mb-1 font-[500]">Мои объекты</h1>
                  <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">
                    Объекты, сохранённые из парсера, и дубли ваших объектов из Космоса.
                  </p>
                </>
              ) : (
                <h1 className="rh-typography-h2 mb-1 font-[500]">
                  {isArchive ? (
                    "Архив объектов"
                  ) : (
                    <>
                      {formatNumber(screenListings.length)}{" "}
                      {screenListings.length === 1
                        ? "объект"
                        : screenListings.length >= 2 && screenListings.length <= 4
                          ? "объекта"
                          : "объектов"} в Тюмени
                    </>
                  )}
                </h1>
              )}
              {isMyListings && (
                <ObjectFilter
                  className="mt-6 pt-0"
                  contentWidth="none"
                  crmStatus={myCrmStatus}
                  crmStatusOptions={["Все статусы", ...myObjectStatuses.map(({ label }) => label)]}
                  filters={["propertyType", "crmStatus"]}
                  onCrmStatusChange={(value) => {
                    setMyCrmStatus(value);
                    setCurrentPage(1);
                  }}
                  onPropertyTypeChange={(value) => {
                    setMyPropertyType(value as ArchivePropertyType);
                    setCurrentPage(1);
                  }}
                  propertyType={myPropertyType}
                  propertyTypeControl="segmented"
                  showFiltersButton={false}
                />
              )}
              </div>
              {!isMyListings && (
                isArchive ? (
                  <ObjectFilter
                    className="mt-6 pt-0"
                    contentWidth="container"
                    propertyType={archivePropertyType}
                    onPropertyTypeChange={(value) => setArchivePropertyType(value as typeof archivePropertyType)}
                    showFiltersButton={false}
                  />
                ) : (
                  <ObjectFilter
                    className="mt-6 pt-0"
                    contentWidth="container"
                    filters={basePropertyType === "Квартиры"
                      ? ["propertyType", "roominess", "area", "price"]
                      : ["propertyType", "area", "price"]}
                    onValuesChange={(nextValues) => {
                      setBaseFilterValues(nextValues);
                      setCurrentPage(1);
                      setPreviewListing(null);
                    }}
                    onPropertyTypeChange={(value) => {
                      setBasePropertyType(value as ArchivePropertyType);
                      setCurrentPage(1);
                      setPreviewListing(null);
                    }}
                    propertyType={basePropertyType}
                  />
                )
              )}
            </section>
            {!isMapView && (isMyListings || isArchive || cardsView) && <section
              aria-label="Управление выдачей"
              className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
            >
              {tableToolbar}
            </section>}
        </>
        {isMapView ? (
          <div className="relative flex min-h-0 w-full flex-1 gap-0">
            <div
              aria-hidden={selectedMapMarkerIndex === null}
              className={cn(
                "shrink-0 overflow-hidden transition-[width] duration-300 ease-out",
                selectedMapMarkerIndex !== null && selectedMapListings.length > 0
                  ? selectedMapListings.length > 1 ? "w-[540px]" : "w-[276px]"
                  : "w-0",
              )}
              inert={selectedMapMarkerIndex === null}
            >
              <aside
                aria-label="Карточки объектов"
                className={cn(
                  "relative h-full w-max bg-[var(--rh-theme-surface-bg)] transition-transform duration-300 ease-out",
                  selectedMapMarkerIndex !== null && selectedMapListings.length > 0 ? "translate-x-0" : "-translate-x-full",
                )}
              >
                <div className="grid h-full w-full auto-rows-max grid-cols-2 content-start gap-3 overflow-y-auto overflow-x-hidden px-3 pb-3 pt-0">
                  {selectedMapListings.map((listing, index) => (
                    <ObjectCard
                      address={listing.address}
                      author={listing.clientName ?? "Частное лицо"}
                      className="h-fit w-[252px] shrink-0"
                      details={getSpecs(listing)}
                      image={listingCardPhotos[(visibleMapMarkerIndex! + index) % listingCardPhotos.length]}
                      imageAlt={`Объект недвижимости: ${listing.address}`}
                      key={`map-panel-${listing.id}-${index}`}
                      onDetailsClick={() => openListing(listing)}
                      price={`${formatNumber(getPrice(listing))} ₽`}
                      pricePerM2={`${formatNumber(Math.round(getPrice(listing) / listing.area))} ₽/м²`}
                      publishedAt={`Опубликован: ${formatPublishedAt(listing.publishedAt)}`}
                      source={formatSource(listing.domain)}
                      sourceHref={sourceHref(listing.domain, listing.url ?? "")}
                      viewed={viewedListingIds.has(listing.id)}
                      subway={false}
                    />
                  ))}
                </div>
              </aside>
            </div>
            <section
              aria-label="Карта объявлений"
              className={cn(
                "relative min-w-0 flex-1 overflow-hidden bg-cover bg-center",
                selectedMapMarkerIndex !== null && selectedMapListings.length > 0 && "rounded-l-[var(--rh-sizing-border-radius-lg)]",
              )}
              style={{
                backgroundImage: 'url("/Rhood/assets/tyumen-lenina-54-2-map.png")',
                backgroundSize: `${mapZoom * 100}% auto`,
              }}
            >
              {mapObjectMarkers.map(([left, top], index) => (
                <MapPriceTag
                  className="absolute z-[2] mt-1 -translate-x-1/2 -translate-y-full"
                  count={mapObjectMarkerCounts[index]}
                  key={`map-object-${index}`}
                  onClick={() => {
                    if (mapSidebarCloseTimer.current !== null) {
                      window.clearTimeout(mapSidebarCloseTimer.current);
                      mapSidebarCloseTimer.current = null;
                    }
                    setClosingMapMarkerIndex(null);
                    setSelectedMapMarkerIndex(index);
                  }}
                  price={Number(screenListings[index % screenListings.length]?.price ?? 0)}
                  selected={selectedMapMarkerIndex === index}
                  style={{ left: `${50 + (left - 50) * mapZoom}%`, top: `${50 + (top - 50) * mapZoom}%` }}
                />
              ))}
              <Button
                appearance="contrast"
                className="absolute right-4 top-4 z-10"
                endIcon={false}
                onClick={() => setCardsView(false)}
                size="md"
                startIcon={<Table2 aria-hidden="true" strokeWidth={2} />}
              >
                {formatNumber(mapListObjectCount)}{" "}
                {getArchivePropertyTypeLabel(mapListObjectCount, mapListPropertyType)} списком
              </Button>
              <div aria-label="Масштаб карты" className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1" role="group">
                <IconButton
                  aria-label="Увеличить масштаб карты"
                  appearance="contrast"
                  disabled={mapZoom >= 2}
                  icon={<Plus aria-hidden="true" />}
                  onClick={() => setMapZoom((zoom) => Math.min(2, Number((zoom + 0.25).toFixed(2))))}
                  size="md"
                />
                <IconButton
                  aria-label="Уменьшить масштаб карты"
                  appearance="contrast"
                  disabled={mapZoom <= 1}
                  icon={<Minus aria-hidden="true" />}
                  onClick={() => setMapZoom((zoom) => Math.max(1, Number((zoom - 0.25).toFixed(2))))}
                  size="md"
                />
              </div>
            </section>
            {selectedMapMarkerIndex !== null && selectedMapListings.length > 0 && (
              <div className={cn("absolute top-2 z-10", selectedMapListings.length > 1 ? "left-[548px]" : "left-[284px]")}>
                <IconButton
                  aria-label="Закрыть панель объектов"
                  appearance="contrast"
                  icon={<ChevronLeft aria-hidden="true" />}
                  onClick={closeMapSidebar}
                  size="sm"
                />
              </div>
            )}
          </div>
        ) : (
          <section
            aria-label={`Список: ${isArchive ? archivePropertyType.toLowerCase() : isMyListings ? "объекты" : basePropertyType.toLowerCase()}`}
            className={cn(
              "min-w-0",
              (cardsView || isMyListings || isArchive) && "mt-3",
              !cardsView && !isMyListings && !isArchive && "grid grid-cols-[minmax(0,1fr)_884px] items-stretch gap-6 px-[var(--rh-sizing-layout-edge-to-edge-wrapper)]",
            )}
          >
            {cardsView ? (
              <ListingsCardGrid
                currentPage={currentPage}
                listings={screenListings}
                onOpenObjectInfo={openListing}
                viewedListingIds={viewedListingIds}
                sort={sort}
              />
            ) : isMyListings ? (
              <MyListingsTable
                className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
                currentPage={currentPage}
                hiddenColumns={hiddenColumns}
                listings={filteredMyObjectRows}
              />
            ) : isArchive ? (
              <ArchiveListingsTable
                className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
                currentPage={currentPage}
                hiddenColumns={hiddenColumns}
                propertyType={archivePropertyType}
                listings={screenListings}
                onOpenObjectInfo={openListing}
                sort={sort}
              />
            ) : (
              <>
                <div className="min-w-0 border-r border-[var(--rh-theme-border-light)] pr-6 pt-6">
                  <section aria-label="Управление выдачей">{tableToolbar}</section>
                  <ListingsList
                    currentPage={currentPage}
                    listings={screenListings}
                    onOpenObjectInfo={openListing}
                    onPreviewObjectInfo={setPreviewListing}
                    selectedListingId={activePreviewListing?.id}
                    viewedListingIds={viewedListingIds}
                    sort={sort}
                  />
                  <footer className="flex justify-center pt-4 pb-4">
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        setPreviewListing(null);
                      }}
                      totalPages={Math.ceil(screenListings.length / LISTINGS_PER_PAGE)}
                    />
                  </footer>
                </div>
                {activePreviewListing && (
                  <aside aria-label="Информация об объекте" className="sticky top-0 max-h-dvh self-start overflow-y-auto pt-6">
                    <ExperimentObjectInfo
                      data={getObjectInfoData(activePreviewListing)}
                      key={activePreviewListing.id}
                      onClose={() => setPreviewListing(null)}
                    />
                  </aside>
                )}
              </>
            )}
            {(cardsView || isMyListings || isArchive) && <footer className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)] flex justify-center pt-4 pb-4">
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={Math.ceil((isMyListings ? filteredMyObjectRows.length : screenListings.length) / LISTINGS_PER_PAGE)}
              />
            </footer>}
          </section>
        )}
        {leaderboardOpen && (
          <LeaderboardModal
            onOpenChange={setLeaderboardOpen}
            open={leaderboardOpen}
          />
        )}
        {selectedListing && (
          isArchive ? (
            <PhotoGallery
              containerDisplay="viewport"
              photos={archivePhotos}
              map={
                selectedListing.latitude != null && selectedListing.longitude != null
                  ? {
                      latitude: selectedListing.latitude,
                      longitude: selectedListing.longitude,
                      imageSrc: "/Rhood/assets/tyumen-lenina-54-2-map.png",
                      previewSrc: "/Rhood/assets/map-preview-figma.png",
                      title: `Расположение объекта: ${selectedListing.address}`,
                    }
                  : undefined
              }
              sidebar={{
                title: selectedListing.address,
                headline: `${formatNumber(getPrice(selectedListing))} ₽`,
                supportingText: `${formatNumber(Math.round(getPrice(selectedListing) / selectedListing.area))} ₽/м²`,
                metadata: [
                  { label: "Где", value: formatSource(selectedListing.domain) },
                  { label: "Автор", value: selectedListing.clientName ?? "Частное лицо" },
                  {
                    label: "Когда размещался",
                    value: `${formatDate(selectedListing.publishedAt)}–${formatDate(selectedListing.actualizedAt)}`,
                    numeric: true,
                  },
                ],
                fields: [
                  {
                    label: "Комнаты",
                    value: selectedListing.roomCount === 0 ? "Студия" : `${selectedListing.roomCount} комната`,
                    numeric: selectedListing.roomCount !== 0,
                  },
                  { label: "Площадь", value: `${selectedListing.area.toLocaleString("ru-RU")} м²`, numeric: true },
                  { label: "Этаж", value: `${selectedListing.floor} из ${selectedListing.floorCount}`, numeric: true },
                ],
                description: selectedListing.description ?? undefined,
              }}
              onClose={() => setSelectedListing(null)}
            />
          ) : (
            <ExperimentObjectInfo
              data={getObjectInfoData(selectedListing)}
              onClose={() => setSelectedListing(null)}
              presentation="drawer"
            />
          )
        )}
      </main>
      {!isMapView && <Footer className={cardsView || isMyListings || isArchive ? "mt-8" : undefined} />}
      {isArchive && !isMapView && <ArchiveIntroOverlay />}
    </div>
  );
}
