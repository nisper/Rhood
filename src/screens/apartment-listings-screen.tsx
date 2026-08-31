import {
  BarChart3,
  ChevronDown,
  CircleHelp,
  Ellipsis,
  Info,
  Layers3,
  Map,
  MessageCircleMore,
  Phone,
  Square,
  TrendingDown,
  UserRound,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { BrandButton } from "@/components/ui/brand-button"
import { ButtonFavorite } from "@/components/ui/button-favorite"
import { MainHeader } from "@/components/ui/main-header"
import { NeutralButton } from "@/components/ui/neutral-button"
import { PaginationButton } from "@/components/ui/pagination-button"
import { ToolbarFilter } from "@/components/ui/toolbar-filter"
import {
  apartmentListings,
  type ApartmentListing,
} from "@/data/mock/apartment-listings"
import { cn } from "@/lib/utils"

type RowMeta = {
  buyer: "avatar" | "lead"
  comments: string
  favorite: boolean
  liquidity: string
  liquidityColor: "success" | "warning" | "error"
  publishedAt: string
  status: string
  statusColor: "brand" | "neutral" | "warning"
}

const rowMeta: RowMeta[] = [
  {
    buyer: "lead",
    comments: "9+",
    favorite: false,
    liquidity: "Высокая",
    liquidityColor: "success",
    publishedAt: "24.01.2024, 6:30",
    status: "Думает",
    statusColor: "brand",
  },
  {
    buyer: "avatar",
    comments: "4",
    favorite: true,
    liquidity: "Средняя",
    liquidityColor: "warning",
    publishedAt: "25.01.2024, 9:15",
    status: "Назначен показ",
    statusColor: "warning",
  },
  {
    buyer: "lead",
    comments: "2",
    favorite: false,
    liquidity: "Высокая",
    liquidityColor: "success",
    publishedAt: "26.01.2024, 12:00",
    status: "В работе",
    statusColor: "neutral",
  },
  {
    buyer: "avatar",
    comments: "1",
    favorite: false,
    liquidity: "Низкая",
    liquidityColor: "error",
    publishedAt: "26.01.2024, 14:40",
    status: "Новый",
    statusColor: "brand",
  },
  {
    buyer: "avatar",
    comments: "6",
    favorite: true,
    liquidity: "Средняя",
    liquidityColor: "warning",
    publishedAt: "27.01.2024, 8:05",
    status: "Думает",
    statusColor: "brand",
  },
  {
    buyer: "lead",
    comments: "12",
    favorite: false,
    liquidity: "Высокая",
    liquidityColor: "success",
    publishedAt: "27.01.2024, 10:20",
    status: "Перезвонить",
    statusColor: "warning",
  },
  {
    buyer: "lead",
    comments: "3",
    favorite: false,
    liquidity: "Высокая",
    liquidityColor: "success",
    publishedAt: "27.01.2024, 16:55",
    status: "В работе",
    statusColor: "neutral",
  },
  {
    buyer: "avatar",
    comments: "7",
    favorite: true,
    liquidity: "Средняя",
    liquidityColor: "warning",
    publishedAt: "28.01.2024, 11:10",
    status: "Думает",
    statusColor: "brand",
  },
]

const navItems = [
  { label: "Набор базы", active: true },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Подключение городов" },
  { label: "Статистика" },
]

const screenRows = apartmentListings.slice(0, 8).map((listing, index) => ({
  listing,
  meta: rowMeta[index],
}))

function formatInteger(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value)
}

function ToolbarSelect({ value, widthClass }: { value: string; widthClass: string }) {
  return (
    <button
      className={cn(
        "flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[var(--parser-border-light)] bg-white px-3 py-2 text-sm leading-5 tracking-[0.15px] text-[var(--parser-text-neutral-primary)]",
        widthClass,
      )}
      type="button"
    >
      <span className="min-w-0 flex-1 truncate text-left">{value}</span>
      <ChevronDown aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
    </button>
  )
}

function ResultsToolbar() {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--parser-border-light)] px-6 py-4">
      <ToolbarSelect value="По дате — новые" widthClass="w-[210px]" />

      <NeutralButton
        endIcon={false}
        size="sm"
        startIcon={<Map aria-hidden="true" strokeWidth={2} />}
        variant="outlined"
      >
        На карте
      </NeutralButton>

      <button className="flex items-center gap-2 px-2 py-2 text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-primary)]" type="button">
        <Layers3 aria-hidden="true" className="size-5" strokeWidth={2} />
        <span>Группировать по дублям</span>
        <span className="relative h-5 w-9 rounded-full bg-[var(--parser-border-light)]">
          <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm" />
        </span>
      </button>

      <div className="ml-auto">
        <NeutralButton
          endIcon={false}
          size="sm"
          startIcon={<BarChart3 aria-hidden="true" strokeWidth={2} />}
          variant="outlined"
        >
          Настроить столбцы
        </NeutralButton>
      </div>
    </div>
  )
}

function HeaderLabel({
  align = "left",
  help = false,
  secondary,
  widthClass,
  children,
}: {
  align?: "left" | "right"
  children: string
  help?: boolean
  secondary?: string
  widthClass: string
}) {
  return (
    <div className={cn("shrink-0 px-3 py-2", widthClass)}>
      <div className={cn("flex items-start gap-2", align === "right" && "justify-end")}>
        <p
          className={cn(
            "text-sm leading-[1.43] tracking-[0.0238px] font-semibold text-[var(--parser-text-neutral-primary)]",
            align === "right" && "text-right",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </p>
        {help && (
          <Info
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-[var(--parser-icon-neutral-secondary)]"
            strokeWidth={2}
          />
        )}
      </div>

      {secondary ? (
        <p
          className={cn(
            "pt-0 text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-secondary)]",
            align === "right" && "text-right",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {secondary}
        </p>
      ) : null}
    </div>
  )
}

function ResultsHeader() {
  return (
    <div className="flex min-w-[1896px] items-start border-b border-[var(--parser-border-light)] px-6">
      <div className="flex h-11 w-7 shrink-0 items-center pr-2">
        <Square
          aria-hidden="true"
          className="size-5 text-[var(--parser-icon-neutral-secondary)]"
          strokeWidth={2}
        />
      </div>
      <div className="min-w-[300px] flex-1 basis-[866px] py-2">
        <p className="text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-primary)]">Адрес</p>
      </div>
      <HeaderLabel help widthClass="w-[130px]">
        Покупатель
      </HeaderLabel>
      <HeaderLabel align="right" help secondary="Цена ₽/м²" widthClass="w-[175px]">
        Цена, ₽
      </HeaderLabel>
      <div className="h-11 w-[123px] shrink-0" />
      <HeaderLabel help widthClass="w-[152px]">
        Ликвид.
      </HeaderLabel>
      <HeaderLabel help widthClass="w-[150px]">
        Опубликован
      </HeaderLabel>
      <HeaderLabel widthClass="w-[120px]">Статус</HeaderLabel>
      <div className="h-11 w-[152px] shrink-0" />
    </div>
  )
}

function BuyerCell({ buyer }: { buyer: RowMeta["buyer"] }) {
  if (buyer === "avatar") {
    return (
      <div className="flex justify-start">
        <Avatar content="image" size="24px" />
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="inline-flex min-w-6 items-center justify-center rounded-sm bg-[var(--parser-fill-neutral)] px-[3px]">
        <UserRound
          aria-hidden="true"
          className="size-5 text-[var(--parser-icon-neutral-primary)]"
          strokeWidth={2}
        />
      </div>
    </div>
  )
}

function CallCell() {
  return (
    <div className="flex justify-start">
      <BrandButton
        className="rounded-lg"
        endIcon={false}
        size="xsm"
        startIcon={<Phone aria-hidden="true" strokeWidth={2.25} />}
      >
        Позвонить
      </BrandButton>
    </div>
  )
}

function ResultStatusTag({
  color,
  label,
}: {
  color: RowMeta["statusColor"] | RowMeta["liquidityColor"]
  label: string
}) {
  const tone =
    color === "success"
      ? "bg-[var(--parser-fill-success-light)] text-[var(--parser-text-success)]"
      : color === "warning"
        ? "bg-[var(--parser-fill-warning-light)] text-[var(--parser-text-warning)]"
        : color === "error"
          ? "bg-[var(--parser-fill-error-light)] text-[var(--parser-text-error)]"
          : color === "brand"
            ? "bg-[var(--parser-fill-brand-light)] text-[var(--parser-text-brand)]"
            : "bg-[var(--parser-fill-neutral)] text-[var(--parser-text-neutral-primary)]"

  return (
    <span
      className={cn(
        "inline-flex min-w-6 items-center justify-center rounded-sm px-[7px] text-sm leading-[1.43] tracking-[0.0238px]",
        tone,
      )}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {label}
    </span>
  )
}

function ResultRow({
  listing,
  meta,
}: {
  listing: ApartmentListing
  meta: RowMeta
}) {
  return (
    <div className="flex min-w-[1896px] items-start border-b border-[var(--parser-border-light)] pl-6">
      <div className="flex h-9 w-7 shrink-0 items-center pr-2 py-2">
        <Square
          aria-hidden="true"
          className="size-5 text-[var(--parser-icon-neutral-secondary)]"
          strokeWidth={2}
        />
      </div>

      <div className="min-w-[300px] flex-1 basis-[866px] py-2">
        <div className="flex flex-col">
          <a
            className="text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-fill-brand)]"
            href="#"
          >
            {listing.specs}
          </a>
          <p className="text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-primary)]">
            {listing.address}
          </p>
        </div>
      </div>

      <div className="w-[130px] shrink-0 px-3 py-2">
        <BuyerCell buyer={meta.buyer} />
      </div>

      <div className="w-[175px] shrink-0 px-3 py-2">
        <div className="flex justify-end gap-2">
          <div className="font-mono text-right text-sm leading-[1.43] tracking-[0.0238px]">
            <p className="text-[var(--parser-text-neutral-primary)]">
              {formatInteger(listing.price)}
            </p>
            <p className="text-[var(--parser-text-neutral-secondary)]">
              {formatInteger(listing.pricePerM2)}
            </p>
          </div>
          <div className="flex items-center">
            <TrendingDown
              aria-hidden="true"
              className="size-5 text-[var(--parser-icon-neutral-secondary)]"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      <div className="w-[123px] shrink-0 px-3 py-2">
        <CallCell />
      </div>

      <div className="w-[152px] shrink-0 px-3 py-2">
        <ResultStatusTag color={meta.liquidityColor} label={meta.liquidity} />
      </div>

      <div className="w-[150px] shrink-0 px-3 py-2">
        <p className="text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-primary)]">
          {meta.publishedAt}
        </p>
      </div>

      <div className="w-[120px] shrink-0 px-3 py-2">
        <ResultStatusTag color={meta.statusColor} label={meta.status} />
      </div>

      <div className="w-[152px] shrink-0 py-2">
        <div className="flex items-center justify-end pr-6">
          <div className="flex items-center gap-2">
            <ButtonFavorite checked={meta.favorite} size="sm" />
            <NeutralButton
              className="px-2"
              endIcon={false}
              size="sm"
              startIcon={<MessageCircleMore aria-hidden="true" strokeWidth={2} />}
              variant="text"
            >
              {meta.comments}
            </NeutralButton>
          </div>

          <NeutralButton
            className="px-2"
            endIcon={false}
            iconOnly
            size="sm"
            startIcon={<Ellipsis aria-hidden="true" strokeWidth={2} />}
            variant="text"
          />
        </div>
      </div>
    </div>
  )
}

function ResultsPagination() {
  return (
    <div className="flex justify-end px-6 py-0.5">
      <div className="flex items-center gap-6 py-0.5">
        <p className="text-sm leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-primary)]">
          1–8 из 8
        </p>
        <div className="flex items-start">
          <PaginationButton direction="left" type="icon" />
          <PaginationButton direction="right" type="icon" />
        </div>
      </div>
    </div>
  )
}

export function ApartmentListingsScreen() {
  return (
    <div className="min-h-screen bg-white text-[var(--parser-text-neutral-primary)]">
      <MainHeader navItems={navItems} />
      <ToolbarFilter empty resp="desk" />

      <main className="flex flex-col">
        <ResultsToolbar />

        <section className="overflow-x-auto">
          <ResultsHeader />
          {screenRows.map(({ listing, meta }) => (
            <ResultRow key={`${listing.address}-${listing.price}`} listing={listing} meta={meta} />
          ))}
        </section>

        <ResultsPagination />
      </main>

      <button
        className="fixed bottom-4 right-4 inline-flex rounded-full"
        type="button"
      >
        <div className="rounded-full bg-[var(--parser-fill-neutral-dark)]">
          <CircleHelp
            aria-hidden="true"
            className="size-10 p-2 text-[var(--parser-text-primary-contrast)]"
            strokeWidth={2}
          />
        </div>
      </button>
    </div>
  )
}
