import {
  Columns3Cog,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  CircleUser,
  Copy,
  Map,
  Phone,
  Table2,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ArchiveIntroOverlay } from "@/components/prototype/archive-intro-overlay";
import { ObjectFilter, type ObjectFilterValues } from "@/components/ui/object-filter";
import { Chip } from "@/components/ui/chip";
import { Footer } from "@/components/ui/footer";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { MainHeader } from "@/components/ui/main-header";
import { Menu } from "@/components/ui/menu";
import { MenuDivider } from "@/components/ui/menu-divider";
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect";
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select";
import { useMenuOpen } from "@/hooks/use-menu-open";
import { cn } from "@/lib/utils";
import { Modal, ModalContainer } from "@/components/ui/modal";
import { ObjectInfo } from "@/components/ui/object-info";
import { ObjectCard } from "@/components/ui/object-card";
import { MapPriceTag } from "@/components/ui/map-price-tag";
import { Pagination } from "@/components/ui/pagination";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { Select } from "@/components/ui/select";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TabBar } from "@/components/ui/tab-bar";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";
import { Tab } from "@/components/ui/tab";
import archiveFlatListings from "@/data/mock/archive-flat-listings.json";
import archiveHouseListings from "@/data/mock/archive-house-listings.json";
import archiveLandListings from "@/data/mock/archive-land-listings.json";
import flatListings from "@/data/mock/real-estate-flat-listings.json";
import houseListings from "@/data/mock/real-estate-house-listings.json";
import landListings from "@/data/mock/real-estate-land-listings.json";
import { myObjectStatuses } from "@/data/my-object-statuses";

const LISTINGS_PER_PAGE = 20;
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
      href: "?view=apartment-listings",
    },
    {
      label: "Мои объекты",
      active: activeItem === "my",
      href: "?view=my-listings",
    },
    { label: "Подборки" },
    { label: "Избранное" },
    { label: "Архив", active: activeItem === "archive", href: "?view=archive" },
  ];
}

type SortColumn = "buyer" | "price" | "pricePerM2" | "publishedAt";
type SortState = { column: SortColumn; direction: "asc" | "desc" } | null;
type ColumnKey =
  | "address"
  | "rooms"
  | "area"
  | "landArea"
  | "floor"
  | "buyer"
  | "price"
  | "pricePerM2"
  | "pricePerSotka"
  | "liquidity"
  | "source"
  | "author"
  | "publishedAt"
  | "actualizedAt"
  | "status"
  | "duplicates"
  | "savedAt"
  | "crmStatus"
  | "id";

const listingsTableColumns: { key: ColumnKey; label: string }[] = [
  { key: "buyer", label: "Покупатели" },
  { key: "price", label: "Цена" },
  { key: "liquidity", label: "Ликвидность" },
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
type MyListingsMode = "saved" | "duplicates";
const myListingsTabs: { label: string; value: MyListingsMode; description: string }[] = [
  { label: "Объекты из Rhood", value: "saved", description: "Вы сохранили эти объекты из парсера" },
  { label: "Дубли", value: "duplicates", description: "Дубли ваших объектов из Космоса" },
];
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
const CALL_COLUMN_WIDTH = 56;
const BUYER_COLUMN_WIDTH = 55;
const PRICE_COLUMN_WIDTH = 128;
const PUBLISHED_AT_COLUMN_WIDTH = 144;

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

const archiveMosaicItems = [
  {
    type: "photo",
    alt: "Интерьер квартиры",
    src: "/Rhood/assets/archive-unsplash-living-1.jpg",
  },
  {
    type: "table",
  },
  {
    type: "photo",
    alt: "Современный жилой дом",
    src: "/Rhood/assets/archive-unsplash-exterior-1.jpg",
  },
  {
    type: "photo",
    alt: "Современная гостиная",
    src: "/Rhood/assets/archive-unsplash-interior-3.jpg",
  },
  {
    type: "photo",
    alt: "Спальня квартиры",
    src: "/Rhood/assets/archive-unsplash-bedroom.jpg",
  },
  {
    type: "photo",
    alt: "Современный частный дом",
    src: "/Rhood/assets/archive-unsplash-exterior-2.jpg",
  },
] as const;

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
      {!cardsView && <div className="relative ml-auto" ref={columnsMenuRef}>
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
  sort,
  sortable = true,
}: {
  hiddenColumns: ReadonlySet<ColumnKey>;
  onSort: (column: SortColumn) => void;
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
      <TableCell
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
      </TableCell>
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
            Цена за м², ₽
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
    </TableRow>
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
        compact
        type="checkbox"
        width={36}
      />

      <TableCell
        className="min-w-[300px]"
        column="address"
        custom
        role="body"
        compact
        type="text"
        width="fill"
      >
        <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
          <Link
            href="#object-info"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onOpen();
            }}
            size="b2"
          >
            {getSpecs(listing)}
          </Link>
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
          compact
          type="number"
          width={BUYER_COLUMN_WIDTH}
        >
          <p className="w-full rh-typography-b2-mono text-right">
            {listing.buyerDemandAvailableCount}
          </p>
        </TableCell>
      )}
      <TableCell
        column="call"
        custom
        role="body"
        compact
        type="button"
        width={CALL_COLUMN_WIDTH}
      >
        <div className="grid">
          <IconButton
            appearance="secondary"
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
          compact
          type="number"
          width={PRICE_COLUMN_WIDTH}
        >
          <div className="w-full rh-typography-b2-mono text-right">
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
          compact
          type="chip"
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
          compact
          type="text"
          width={190}
        >
          <div className="flex min-h-5 flex-col text-sm leading-5 tracking-[0.17px]">
            <Link
              href={sourceHref(listing.domain, listing.url)}
              onClick={(event) => event.stopPropagation()}
              rel="noreferrer"
              size="b2"
              target="_blank"
            >
              {formatSource(listing.domain)}
            </Link>
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
          compact
          type="text"
          width={PUBLISHED_AT_COLUMN_WIDTH}
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
          compact
          type="chip"
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

function ListingsTable({
  className,
  currentPage,
  hiddenColumns,
  listings: tableListings,
  onOpenObjectInfo,
  onSort,
  sort,
  sortable = true,
}: {
  className?: string;
  currentPage: number;
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
    })
    .slice((currentPage - 1) * LISTINGS_PER_PAGE, currentPage * LISTINGS_PER_PAGE);

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
      stickyHeader
      selection={{
        onSelectedIdsChange: setSelectedIds,
        rowIds: sortedListings.map((listing) => listing.id),
        selectedIds,
      }}
      verticalBorders
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

function MyListingsSelect({
  label,
  onValueChange,
  options,
  value,
}: {
  label: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  value: string;
}) {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useMenuOpen(menuRef);

  return (
    <div className={expanded ? "relative z-40" : "relative"} ref={menuRef}>
      <Select
        aria-label={label}
        expanded={expanded}
        label={false}
        menu={expanded && (
          <Menu aria-label={label} className="absolute left-0 top-full z-50 mt-1 min-w-full" role="listbox">
            {options.map((option) => (
              <MenuItemSingleSelect
                aria-selected={value === option}
                icon={false}
                key={option}
                onClick={(event) => {
                  event.stopPropagation();
                  onValueChange(option);
                  setExpanded(false);
                }}
                rightSlot={false}
                role="option"
                secondaryText={false}
                selected={value === option}
                startIcon={false}
              >
                {option}
              </MenuItemSingleSelect>
            ))}
          </Menu>
        )}
        onClick={() => setExpanded((current) => !current)}
        onExpandedChange={setExpanded}
        size="sm"
        value={value}
      />
    </div>
  );
}

function MyListingsFilters({
  onPropertyTypeChange,
  onStatusChange,
  propertyType,
  status,
}: {
  onPropertyTypeChange: (value: ArchivePropertyType) => void;
  onStatusChange: (value: string) => void;
  propertyType: ArchivePropertyType;
  status: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SegmentedControl
        aria-label="Тип недвижимости"
        onValueChange={(value) => onPropertyTypeChange(value as ArchivePropertyType)}
        size="sm"
        value={propertyType}
      >
        <Segment value="Квартиры">Квартиры</Segment>
        <Segment value="Дома">Дома</Segment>
        <Segment value="Участки">Участки</Segment>
      </SegmentedControl>
      <MyListingsSelect
        label="Статус в CRM"
        onValueChange={onStatusChange}
        options={["Все статусы", ...myObjectStatuses.map(({ label }) => label)]}
        value={status}
      />
    </div>
  );
}

function MyListingsTitleTabs({
  mode,
  onModeChange,
}: {
  mode: MyListingsMode;
  onModeChange: (mode: MyListingsMode) => void;
}) {
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex = event.key === "ArrowRight"
      ? (index + 1) % myListingsTabs.length
      : event.key === "ArrowLeft"
        ? (index - 1 + myListingsTabs.length) % myListingsTabs.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? myListingsTabs.length - 1
            : -1;

    if (nextIndex < 0) return;
    event.preventDefault();
    const nextTab = myListingsTabs[nextIndex];
    onModeChange(nextTab.value);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="relative w-fit">
      <TabBar aria-label="Режим списка объектов" className="w-fit gap-[var(--rh-sizing-base-module-4)]" indicator={false} role="tablist">
        {myListingsTabs.map(({ description, label, value }, index) => {
          const selected = mode === value;

          return (
            <button
              aria-label={label}
              aria-controls="my-listings-panel"
              aria-selected={selected}
              className={cn(
                "flex cursor-pointer items-center border-0 bg-transparent px-0 py-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
              )}
              id={`my-listings-tab-${value}`}
              key={value}
              onClick={() => onModeChange(value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              <Tab
                className="py-0"
                indicator={false}
                label={label}
                secondaryLabel={description}
                secondaryText
                selected={selected}
                size="h2"
              />
            </button>
          );
        })}
      </TabBar>
    </div>
  );
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
        {!hiddenColumns.has("address") && <TableCell column="address" helpIcon helpTooltip="Ссылка откроет объект в Космосе" role="head" sort={false} type="text" width="fill">Адрес</TableCell>}
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
  onOpenObjectInfo,
  sort,
}: {
  currentPage: number;
  listings: readonly (typeof listings)[number][];
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
          subway={false}
        />
      ))}
    </div>
  );
}

export function ApartmentListingsScreen({
  view = "base",
}: {
  view?: "base" | "my" | "archive";
}) {
  const isMyListings = view === "my";
  const isArchive = view === "archive";
  const [myListingsMode, setMyListingsMode] = React.useState<MyListingsMode>("saved");
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
  const filteredMyObjectRows = myObjectRows.filter(({ listing, duplicateCount, crmStatus }) => (
    listing.type === listingTypeByPropertyType[myPropertyType]
    && (myListingsMode !== "duplicates" || duplicateCount > 0)
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
  const [selectedMapMarkerIndex, setSelectedMapMarkerIndex] = React.useState<number | null>(null);
  const selectedMapMarkerCount = selectedMapMarkerIndex === null
    ? 0
    : mapObjectMarkerCounts[selectedMapMarkerIndex] ?? 1;
  const selectedMapListings = selectedMapMarkerIndex === null || screenListings.length === 0
    ? []
    : Array.from({ length: selectedMapMarkerCount }, (_, offset) => (
        screenListings[(selectedMapMarkerIndex + offset) % screenListings.length]
      ));

  function handleSort(column: SortColumn) {
    setSort((current) =>
      current?.column === column
        ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" },
    );
  }

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
            <section className="py-8">
              <div className="rhood-layout-container">
              {isMyListings ? (
                <>
                  <MyListingsTitleTabs
                    mode={myListingsMode}
                    onModeChange={(mode) => {
                      setMyListingsMode(mode);
                      setCurrentPage(1);
                    }}
                  />
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
                <div aria-label="Фильтры моих объектов" className="mt-6" role="group">
                  <MyListingsFilters
                    onPropertyTypeChange={(value) => {
                      setMyPropertyType(value);
                      setCurrentPage(1);
                    }}
                    onStatusChange={(value) => {
                      setMyCrmStatus(value);
                      setCurrentPage(1);
                    }}
                    propertyType={myPropertyType}
                    status={myCrmStatus}
                  />
                </div>
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
                    savedFiltersEnabled
                    onValuesChange={(nextValues) => {
                      setBaseFilterValues(nextValues);
                      setCurrentPage(1);
                    }}
                    onPropertyTypeChange={(value) => {
                      setBasePropertyType(value as ArchivePropertyType);
                      setCurrentPage(1);
                    }}
                    propertyType={basePropertyType}
                  />
                )
              )}
            </section>
            {!isMapView && <section
              aria-label="Управление выдачей"
              className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
            >
              <TableToolbar
                archive={isArchive}
                archivePropertyType={archivePropertyType}
                hiddenColumns={hiddenColumns}
                onHiddenColumnsChange={setHiddenColumns}
                onLeaderboardOpen={() => setLeaderboardOpen(true)}
                onCardsViewChange={setCardsView}
                onSortChange={setSort}
                myListings={isMyListings}
                cardsView={cardsView}
                showLeaderboard={!isMyListings && !isArchive}
                showMap={!isMyListings}
                sort={sort}
              />
            </section>}
        </>
        {isMapView ? (
          <div className="relative flex min-h-0 w-full flex-1 gap-0">
            <section
              aria-label="Карта объявлений"
              className={cn(
                "relative min-w-0 flex-1 bg-cover bg-center",
                selectedMapMarkerIndex !== null && selectedMapListings.length > 0 && "rounded-tr-[var(--rh-sizing-border-radius-lg)]",
              )}
              style={{ backgroundImage: 'url("/Rhood/assets/tyumen-lenina-54-2-map.png")' }}
            >
              {mapObjectMarkers.map(([left, top], index) => (
                <MapPriceTag
                  className="absolute z-[2] mt-1 -translate-x-1/2 -translate-y-full"
                  count={mapObjectMarkerCounts[index]}
                  key={`map-object-${index}`}
                  onClick={() => setSelectedMapMarkerIndex(index)}
                  price={Number(screenListings[index % screenListings.length]?.price ?? 0)}
                  selected={selectedMapMarkerIndex === index}
                  style={{ left: `${left}%`, top: `${top}%` }}
                />
              ))}
              <Button
                appearance="contrast"
                className="absolute left-4 top-4 z-10"
                endIcon={false}
                onClick={() => setCardsView(false)}
                size="sm"
                startIcon={<Table2 aria-hidden="true" strokeWidth={2} />}
              >
                {formatNumber(mapListObjectCount)}{" "}
                {getArchivePropertyTypeLabel(mapListObjectCount, mapListPropertyType)} списком
              </Button>
            </section>
            {selectedMapMarkerIndex !== null && selectedMapListings.length > 0 && (
              <div className="absolute right-[348px] top-2 z-10">
                <IconButton
                  aria-label="Закрыть панель объектов"
                  appearance="contrast"
                  icon={<ChevronRight aria-hidden="true" />}
                  onClick={() => setSelectedMapMarkerIndex(null)}
                  size="sm"
                />
              </div>
            )}
            <div
              aria-hidden={selectedMapMarkerIndex === null}
              className={cn(
                "shrink-0 overflow-hidden transition-[width] duration-300 ease-out",
                selectedMapMarkerIndex !== null && selectedMapListings.length > 0 ? "w-[340px]" : "w-0",
              )}
              inert={selectedMapMarkerIndex === null}
            >
              <aside
                aria-label="Карточки объектов"
                className={cn(
                  "relative h-full w-[340px] bg-[var(--rh-theme-surface-bg)] transition-transform duration-300 ease-out",
                  selectedMapMarkerIndex !== null && selectedMapListings.length > 0 ? "translate-x-0" : "translate-x-full",
                )}
              >
                <div className="flex h-full flex-col gap-6 overflow-y-auto px-3 pb-3 pt-0">
                  {selectedMapListings.map((listing, index) => (
                    <ObjectCard
                      address={listing.address}
                      author={listing.clientName ?? "Частное лицо"}
                      className="w-full"
                      details={getSpecs(listing)}
                      image={listingCardPhotos[(selectedMapMarkerIndex! + index) % listingCardPhotos.length]}
                      imageAlt={`Объект недвижимости: ${listing.address}`}
                      key={`map-panel-${listing.id}-${index}`}
                      onDetailsClick={() => setSelectedListing(listing)}
                      price={`${formatNumber(getPrice(listing))} ₽`}
                      pricePerM2={`${formatNumber(Math.round(getPrice(listing) / listing.area))} ₽/м²`}
                      publishedAt={`Опубликован: ${formatPublishedAt(listing.publishedAt)}`}
                      source={formatSource(listing.domain)}
                      sourceHref={sourceHref(listing.domain, listing.url ?? "")}
                      subway={false}
                    />
                  ))}
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <section
            aria-label={`Список: ${isArchive ? archivePropertyType.toLowerCase() : isMyListings ? "объекты" : basePropertyType.toLowerCase()}`}
            className="mt-3 min-w-0"
            id={isMyListings ? "my-listings-panel" : undefined}
            aria-labelledby={isMyListings ? `my-listings-tab-${myListingsMode}` : undefined}
            role={isMyListings ? "tabpanel" : undefined}
            tabIndex={isMyListings ? 0 : undefined}
          >
            {cardsView ? (
              <ListingsCardGrid
                currentPage={currentPage}
                listings={screenListings}
                onOpenObjectInfo={setSelectedListing}
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
                onOpenObjectInfo={setSelectedListing}
                sort={sort}
              />
            ) : (
              <ListingsTable
                className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)]"
                currentPage={currentPage}
                hiddenColumns={hiddenColumns}
                listings={screenListings}
                onOpenObjectInfo={setSelectedListing}
                onSort={handleSort}
                sort={sort}
                sortable={false}
              />
            )}
            <footer className="mx-[var(--rh-sizing-layout-edge-to-edge-wrapper)] flex justify-center pt-4 pb-4">
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={Math.ceil((isMyListings ? filteredMyObjectRows.length : screenListings.length) / LISTINGS_PER_PAGE)}
              />
            </footer>
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
            <ObjectInfo
              onClose={() => setSelectedListing(null)}
              presentation="drawer"
            />
          )
        )}
      </main>
      {!isMapView && <Footer className="mt-8" />}
      {isArchive && !isMapView && <ArchiveIntroOverlay />}
    </div>
  );
}

export function MyListingsScreen() {
  return <ApartmentListingsScreen view="my" />;
}

export function ArchiveScreen() {
  return <ApartmentListingsScreen view="archive" />;
}

export function ArchiveNoSubscriptionScreen() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--rh-theme-surface-bg)] text-[var(--parser-text-neutral-primary)]">
      <MainHeader
        contentWidth="container"
        logoHref="/Rhood/"
        navItems={getNavItems("archive")}
      />
      <main className="flex-1 bg-[var(--rh-theme-surface-bg)] text-[var(--rh-theme-text-neutral-primary)]">
        <section
          aria-label="Фотография объекта и цветовой блок"
          className="grid h-[calc(100vh-165px)] min-h-[calc(100vh-165px)] w-full shrink-0 grid-cols-2 grid-rows-1 overflow-hidden"
        >
          <img
            alt="Интерьер квартиры"
            className="size-full object-cover"
            src="/Rhood/assets/archive-unsplash-hero.jpg"
          />
          <div
            className="grid h-full place-items-center bg-[var(--rh-palette-blue-grey-50)] px-8 py-10 lg:px-16"
          >
            <div className="w-full max-w-[28rem] text-center">
              <div className="grid justify-items-center gap-4">
                <h1 className="rh-typography-h2 text-[var(--rh-theme-text-neutral-primary)]">
                  Архив объявлений за последние 6 месяцев
                </h1>
                <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
                  Доступен по подписке RHood Plus
                </p>
              </div>
              <div className="mt-8 grid justify-items-center">
                <Button
                  appearance="primary"
                  endIcon={false}
                  label="Оформить подписку"
                  size="lg"
                  startIcon={false}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          aria-label="Фотографии объектов из архива объявлений"
          className="relative flow-root min-h-[calc(100vh-65px)]"
        >
          <div
            aria-label="Фотографии объектов"
            className="relative mx-auto mt-[5vh] grid w-full max-w-[1200px] grid-cols-4"
          >
            {archiveMosaicItems.map((item, index) => {
              const positions = [
                "col-start-1 row-start-1",
                "col-start-2 col-span-2 row-start-2",
                "col-start-1 row-start-3",
                "col-start-4 row-start-3",
                "col-start-3 row-start-4",
                "col-start-1 col-span-2 row-start-6",
              ];

              if (item.type === "table") {
                return (
                  <div
                    aria-label="Пример таблицы архивной выдачи"
                    className={`relative grid aspect-[4/3] w-full place-items-center overflow-hidden ${positions[index]}`}
                    key="archive-table-preview"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 size-full object-cover"
                      loading="lazy"
                      src="/Rhood/assets/archive-unsplash-wave-wall.jpg"
                    />
                    <img
                      alt="Таблица архивной выдачи с объектами, ценами и периодами публикации"
                      className="relative mx-2 box-border h-auto max-w-[1148px] w-[calc(100%-1rem)]"
                      loading="lazy"
                      src="/Rhood/assets/archive-listings-table-preview.png"
                    />
                  </div>
                );
              }

              return (
                <img
                  alt={item.alt}
                  className={`aspect-[4/3] w-full object-cover ${positions[index]}`}
                  key={item.src}
                  loading="lazy"
                  src={item.src}
                />
              );
            })}
            <div className="col-start-4 row-start-1 flex flex-col justify-start p-4 text-left">
              <p className="rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
                Пока одни предложения исчезали, появлялись новые
              </p>
            </div>
            <div className="col-start-3 col-span-2 row-start-6 flex aspect-[4/3] flex-col items-center justify-center gap-4 bg-[var(--rh-palette-blue-grey-50)] p-4 text-center xl:gap-6 xl:p-6">
              <h2 className="rh-typography-h4 text-[var(--rh-theme-text-neutral-primary)]">
                Сравнивайте, как менялось предложение за последние 6 месяцев с RHood Plus
              </h2>
              <Button
                appearance="primary"
                endIcon={false}
                label="Оформить подписку"
                size="lg"
                startIcon={false}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
