import * as React from "react"
import { CircleHelp, Settings2, Menu as MenuIcon, X } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HelpCenter } from "@/components/ui/help-center"
import { IconButton } from "@/components/ui/icon-button"
import { InputNumberRange } from "@/components/ui/input-number-range"
import { Menu } from "@/components/ui/menu"
import { MenuDivider } from "@/components/ui/menu-divider"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { Modal, ModalContainer } from "@/components/ui/modal"
import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const logoSrc = "/Rhood/assets/rhood-logo.svg"

type MainHeaderNavItem = {
  active?: boolean
  label: string
  propNew?: boolean
  state?: "default" | "hovered"
}

type ListingFilters = {
  area: { from: string; to: string }
  price: { from: string; to: string }
  propertyType: string
  rooms: string[]
}

type MainHeaderProps = React.ComponentProps<"header"> & {
  button?: boolean
  logoHref?: string
  navItems?: MainHeaderNavItem[]
  listingFilters?: ListingFilters
  onListingFiltersChange?: (filters: ListingFilters) => void
  resp?: "mob" | "desk"
  showFilter?: boolean
}

const defaultNavItems: MainHeaderNavItem[] = [
  { active: true, label: "Набор базы" },
  { label: "Мои объекты" },
  { label: "Подборки" },
  { label: "Избранное" },
]

const propertyTypeOptions = ["Квартиры", "Дома", "Участки"]
const roominessOptions = ["1", "2", "3", "4+"]

function MainHeaderFilter({ filters, onFiltersChange }: {
  filters: ListingFilters
  onFiltersChange: (filters: ListingFilters) => void
}) {
  const { area, price, propertyType, rooms } = filters
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = React.useState(false)
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false)
  const hasActiveFilters =
    propertyType !== propertyTypeOptions[0] ||
    rooms.length > 0 ||
    Boolean(area.from || area.to || price.from || price.to)

  return (
    <section
      aria-label="Фильтры объектов"
      className="px-[var(--rh-sizing-layout-edge-to-edge-wrapper)] py-2"
    >
      <div className="relative z-10 flex min-h-14 flex-wrap items-center gap-2 bg-[var(--rh-theme-fill-neutral)] p-2 rounded-[var(--rh-sizing-island-border-radius)]">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            appearance="contrast"
            endIcon={false}
            onClick={() => setIsFiltersModalOpen(true)}
            size="sm"
            startIcon={<Settings2 aria-hidden="true" strokeWidth={2} />}
          >
            Фильтры
          </Button>
          <Select
            className="w-[140px]"
            expanded={isPropertyTypeOpen}
            fullWidth
            label={false}
            menu={
              isPropertyTypeOpen && (
                <Menu className="absolute left-0 top-full z-30 mt-1 min-w-full" role="listbox">
                  {propertyTypeOptions.map((option) => (
                    <MenuItemSingleSelect
                      icon={false}
                      key={option}
                      onClick={(event) => {
                        event.stopPropagation()
                        onFiltersChange({ ...filters, propertyType: option })
                        setIsPropertyTypeOpen(false)
                      }}
                      rightSlot={false}
                      role="option"
                      secondaryText={false}
                      selected={propertyType === option}
                    >
                      {option}
                    </MenuItemSingleSelect>
                  ))}
                </Menu>
              )
            }
            onClick={() => setIsPropertyTypeOpen((current) => !current)}
            onExpandedChange={setIsPropertyTypeOpen}
            size="sm"
            value={propertyType}
          />
          <SegmentedControl
            color="contrast"
            onValueChange={(value) => onFiltersChange({ ...filters, rooms: Array.isArray(value) ? value : [value] })}
            selectionMode="multiple"
            size="sm"
            value={rooms}
          >
            {roominessOptions.map((roominess) => (
              <Segment key={roominess} value={roominess}>{roominess}</Segment>
            ))}
          </SegmentedControl>
          <InputNumberRange
            aria-label="Площадь"
            className="w-[180px]"
            endInputProps={{
              "aria-label": "Площадь до",
              onChange: (event) => onFiltersChange({ ...filters, area: { ...area, to: event.target.value } }),
              placeholder: "до",
              value: area.to,
            }}
            size="sm"
            startInputProps={{
              "aria-label": "Площадь от",
              onChange: (event) => onFiltersChange({ ...filters, area: { ...area, from: event.target.value } }),
              placeholder: "от",
              value: area.from,
            }}
            unit="м²"
          />
          <InputNumberRange
            aria-label="Цена"
            className="w-[224px]"
            endInputProps={{
              "aria-label": "Цена до",
              groupThousands: true,
              onChange: (event) => onFiltersChange({ ...filters, price: { ...price, to: event.target.value } }),
              placeholder: "до",
              value: price.to,
            }}
            size="sm"
            startInputProps={{
              "aria-label": "Цена от",
              groupThousands: true,
              onChange: (event) => onFiltersChange({ ...filters, price: { ...price, from: event.target.value } }),
              placeholder: "от",
              value: price.from,
            }}
            unit="₽"
          />
          {hasActiveFilters && (
            <IconButton
              appearance="ghost"
              aria-label="Сбросить фильтры"
              icon={<X aria-hidden="true" strokeWidth={2} />}
              onClick={() => {
                setIsPropertyTypeOpen(false)
                onFiltersChange({ area: { from: "", to: "" }, price: { from: "", to: "" }, propertyType: propertyTypeOptions[0], rooms: [] })
              }}
              size="sm"
            />
          )}
        </div>
      </div>

      {isFiltersModalOpen && (
        <ModalContainer>
          <Modal
            onOpenChange={setIsFiltersModalOpen}
            open={isFiltersModalOpen}
            title="Фильтры"
          />
        </ModalContainer>
      )}
    </section>
  )
}

function MainHeader({
  button = true,
  className,
  logoHref,
  navItems = defaultNavItems,
  listingFilters,
  onListingFiltersChange,
  resp = "desk",
  showFilter = false,
  ...props
}: MainHeaderProps) {
  const isMobile = resp === "mob"
  const [isHelpMenuOpen, setIsHelpMenuOpen] = React.useState(false)
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = React.useState(false)
  const helpMenuRef = React.useRef<HTMLDivElement | null>(null)
  const avatarMenuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node

      if (!helpMenuRef.current?.contains(target)) {
        setIsHelpMenuOpen(false)
      }

      if (!avatarMenuRef.current?.contains(target)) {
        setIsAvatarMenuOpen(false)
      }
    }

    if (isHelpMenuOpen || isAvatarMenuOpen) {
      document.addEventListener("mousedown", handlePointerDown)
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
    }
  }, [isAvatarMenuOpen, isHelpMenuOpen])

  if (isMobile) {
    return (
      <header
        className={cn(
          "rhood-page-gutter flex h-14 w-full items-center justify-between overflow-hidden bg-[var(--rh-theme-surface-bg)] py-2",
          className,
        )}
        {...props}
      >
        {logoHref ? (
          <a aria-label="На главную" className="shrink-0" href={logoHref}>
            <img alt="Rhood" className="h-6 w-auto" src={logoSrc} />
          </a>
        ) : (
          <img alt="Rhood" className="h-6 w-auto shrink-0" src={logoSrc} />
        )}

        {button && (
          <IconButton
            appearance="inherit"
            aria-label="Open menu"
            className="text-[var(--rh-theme-icon-neutral-primary)]"
            icon={<MenuIcon aria-hidden="true" strokeWidth={2} />}
            size="md"
          />
        )}
      </header>
    )
  }

  return (
    <header className={cn("w-full bg-[var(--rh-theme-surface-bg)]", className)} {...props}>
      <div className="rhood-page-gutter relative flex w-full items-center gap-4 py-3">
        <div className="flex shrink-0 items-center justify-start">
        {logoHref ? (
          <a aria-label="На главную" href={logoHref}>
            <img alt="Rhood" className="h-9 w-auto" src={logoSrc} />
          </a>
        ) : (
          <img alt="Rhood" className="h-8 w-auto shrink-0" src={logoSrc} />
        )}
        </div>

        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
        {navItems.map((item) => (
          <button
            className={cn(
              "group inline-flex cursor-pointer items-center justify-center rounded-full px-3 py-2",
              item.active || item.state === "hovered"
                ? "gap-2 bg-[var(--rh-theme-fill-neutral)] hover:bg-[var(--rh-theme-fill-neutral-hover)]"
                : "gap-1 hover:gap-2 hover:bg-[var(--rh-theme-fill-neutral-hover)]",
            )}
            key={item.label}
            type="button"
          >
            <span
              className={cn(
                "rh-typography-b2-med whitespace-nowrap",
                item.active || item.state === "hovered"
                  ? "text-[var(--rh-theme-text-neutral-primary)]"
                  : "text-[var(--rh-theme-text-neutral-secondary)] group-hover:text-[var(--rh-theme-text-neutral-primary)]",
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {item.label}
            </span>
            {item.propNew && (
              <span className="inline-flex items-center justify-center rounded-sm bg-[var(--parser-fill-error)] px-[3px] pb-px pt-[2px]">
                <span
                  className="whitespace-nowrap text-[8px] leading-none tracking-[0.012px] font-medium text-[var(--parser-text-primary-contrast)]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  НОВОЕ
                </span>
              </span>
            )}
          </button>
        ))}
        </nav>

        <div className="ml-auto flex h-[34px] shrink-0 items-center">
        <div ref={helpMenuRef} className="relative">
          <IconButton
            appearance="inherit"
            aria-expanded={isHelpMenuOpen}
            aria-haspopup="menu"
            aria-label="Help"
            className="text-[var(--rh-theme-icon-neutral-primary)]"
            icon={<CircleHelp aria-hidden="true" strokeWidth={2} />}
            onClick={() => {
              setIsHelpMenuOpen((open) => !open)
              setIsAvatarMenuOpen(false)
            }}
            size="sm"
          />

          {isHelpMenuOpen && (
            <HelpCenter className="absolute right-0 top-full z-20 mt-2" />
          )}
        </div>
        </div>
        <div ref={avatarMenuRef} className="relative shrink-0">
        <button
          aria-expanded={isAvatarMenuOpen}
          aria-haspopup="menu"
          aria-label="Профиль"
          className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rh-theme-text-brand)]"
          onClick={() => {
            setIsAvatarMenuOpen((open) => !open)
            setIsHelpMenuOpen(false)
          }}
          type="button"
        >
          <Avatar content="image" size="32px" />
        </button>

        {isAvatarMenuOpen && (
          <Menu
            align="right"
            className="absolute right-0 top-full z-20 mt-1"
            role="menu"
          >
            {['Профиль', 'Статистика'].map((item) => (
              <MenuItemSingleSelect
                icon={false}
                key={item}
                onClick={() => setIsAvatarMenuOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setIsAvatarMenuOpen(false)
                  }
                }}
                rightSlot={false}
                role="menuitem"
                secondaryText={false}
                selected={false}
                tabIndex={0}
              >
                {item}
              </MenuItemSingleSelect>
            ))}
            <MenuDivider className="w-full" />
            <MenuItemSingleSelect
              icon={false}
              onClick={() => setIsAvatarMenuOpen(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setIsAvatarMenuOpen(false)
                }
              }}
              rightSlot={false}
              role="menuitem"
              secondaryText={false}
              selected={false}
              tabIndex={0}
            >
              Выход
            </MenuItemSingleSelect>
          </Menu>
        )}
        </div>
      </div>
      {showFilter && listingFilters && onListingFiltersChange && (
        <MainHeaderFilter filters={listingFilters} onFiltersChange={onListingFiltersChange} />
      )}
    </header>
  )
}

export { MainHeader }
export type { ListingFilters, MainHeaderNavItem, MainHeaderProps }
