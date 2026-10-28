import * as React from "react"

import { AreaSelect } from "@/components/ui/area-select"
import { Button } from "@/components/ui/button"
import { FilterModal } from "@/components/ui/filter-modal"
import { Menu } from "@/components/ui/menu"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { PriceSelect } from "@/components/ui/price-select"
import { RoominessSelect } from "@/components/ui/roominess-select"
import { Select } from "@/components/ui/select"
import { Search, Settings2, X } from "lucide-react"
import { IconButton } from "@/components/ui/icon-button"
import { useMenuOpen } from "@/hooks/use-menu-open"
import { cn } from "@/lib/utils"

type ObjectFilterKey =
  | "city"
  | "propertyType"
  | "roominess"
  | "area"
  | "price"
  | "source"
  | "author"

type ObjectFilterProps = React.ComponentProps<"section"> & {
  contentWidth?: "full" | "container"
  filters?: ObjectFilterKey[]
  propertyType?: string
  onPropertyTypeChange?: (value: string) => void
  showFiltersButton?: boolean
  modalDisplay?: React.ComponentProps<typeof FilterModal>["containerDisplay"]
}

const defaultFilters: ObjectFilterKey[] = [
  "city",
  "propertyType",
  "roominess",
  "area",
  "price",
  "source",
  "author",
]
const propertyTypeOptions = ["Квартиры", "Дома", "Участки"]
const cityOptions = ["Москва", "Химки", "Красногорск", "Мытищи", "Люберцы", "Одинцово"]

function ArchiveFilterSelect({
  label,
  multiSelect = false,
  onFilterChange,
  onValueChange,
  options,
}: {
  label: string
  multiSelect?: boolean
  onFilterChange?: () => void
  onValueChange?: (value: string) => void
  options: readonly string[]
}) {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useMenuOpen(menuRef)
  const [value, setValue] = React.useState(label)
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])
  const displayValue = multiSelect && selectedValues.length > 0
    ? selectedValues.length > 1
      ? `${selectedValues[0]} +${selectedValues.length - 1}`
      : selectedValues[0]
    : value

  return (
    <div className={expanded ? "relative z-40" : "relative"} ref={menuRef}>
      <Select
        expanded={expanded}
        label={false}
        menu={
          expanded && (
            <Menu
              aria-label={label}
              aria-multiselectable={multiSelect || undefined}
              className="absolute left-0 top-full z-20 mt-1 min-w-full"
              role="listbox"
            >
              {options.map((option) => multiSelect ? (
                <MenuItemMultiselect
                  aria-selected={selectedValues.includes(option)}
                  checked={selectedValues.includes(option)}
                  icon={false}
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation()
                    const next = selectedValues.includes(option)
                      ? selectedValues.filter((item) => item !== option)
                      : [...selectedValues, option]
                    setSelectedValues(next)
                    onFilterChange?.()
                  }}
                  rightSlot={false}
                  role="option"
                  secondaryText={false}
                  tabIndex={0}
                >
                  {option}
                </MenuItemMultiselect>
              ) : (
                <MenuItemSingleSelect
                  icon={false}
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation()
                    if (value !== option) onFilterChange?.()
                    setValue(option)
                    onValueChange?.(option)
                    setExpanded(false)
                  }}
                  rightSlot={false}
                  role="option"
                  secondaryText={false}
                  selected={option === value}
                >
                  {option}
                </MenuItemSingleSelect>
              ))}
            </Menu>
          )
        }
        onClick={() => setExpanded((current) => !current)}
        onExpandedChange={setExpanded}
        size="sm"
        value={displayValue}
      />
    </div>
  )
}

function ObjectFilter({
  className,
  contentWidth = "full",
  filters = defaultFilters,
  propertyType,
  onPropertyTypeChange,
  modalDisplay = "viewport",
  showFiltersButton = true,
  onChange,
  ...props
}: ObjectFilterProps) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false)
  const [hasChangedFilter, setHasChangedFilter] = React.useState(false)
  const [resetVersion, setResetVersion] = React.useState(0)
  const initialPropertyType = React.useRef(propertyType)
  const markFilterChanged = React.useCallback(() => setHasChangedFilter(true), [])
  const resetFilters = React.useCallback(() => {
    setResetVersion((version) => version + 1)
    setHasChangedFilter(false)
    if (onPropertyTypeChange) {
      onPropertyTypeChange(initialPropertyType.current ?? "Квартиры")
    }
  }, [onPropertyTypeChange])
  const contentWidthClass =
    contentWidth === "container"
      ? "rhood-layout-container"
      : "rhood-page-gutter"

  return (
    <section
      className={cn(
        "relative w-full overflow-visible bg-[var(--rh-theme-surface-bg)] pt-4",
        className,
      )}
      onChange={(event) => {
        onChange?.(event)
        markFilterChanged()
      }}
      {...props}
    >
      <div className={cn(contentWidthClass, "overflow-visible")}>
        <div className="flex flex-wrap items-start gap-1 overflow-visible">
          {showFiltersButton && (
            <Button
              appearance="default"
              endIcon={false}
              onClick={() => setIsFiltersModalOpen(true)}
              size="sm"
              startIcon={<Settings2 aria-hidden="true" strokeWidth={2} />}
            >
              Фильтры
            </Button>
          )}
          {filters.includes("city") && (
            <ArchiveFilterSelect key={`city-${resetVersion}`} label="Город" multiSelect onFilterChange={markFilterChanged} options={cityOptions} />
          )}
          {filters.includes("propertyType") && (
            <ArchiveFilterSelect
              key={`property-type-${resetVersion}`}
              label={propertyType ?? "Квартиры"}
              onFilterChange={markFilterChanged}
              onValueChange={onPropertyTypeChange}
              options={propertyTypeOptions}
            />
          )}
          {filters.includes("roominess") && (
            <RoominessSelect key={`roominess-${resetVersion}`} aria-label="Количество комнат" label={false} onSelectedValuesChange={markFilterChanged} size="sm" />
          )}
          {filters.includes("area") && <AreaSelect key={`area-${resetVersion}`} size="sm" />}
          {filters.includes("price") && <PriceSelect key={`price-${resetVersion}`} size="sm" />}
          {filters.includes("source") && (
            <ArchiveFilterSelect
              key={`source-${resetVersion}`}
              label="Источник"
              multiSelect
              onFilterChange={markFilterChanged}
              options={["Авито", "Циан", "Домклик", "Яндекс Недвижимость"]}
            />
          )}
          {filters.includes("author") && (
            <ArchiveFilterSelect
              key={`author-${resetVersion}`}
              label="Автор"
              multiSelect
              onFilterChange={markFilterChanged}
              options={["Частное лицо", "Агентство"]}
            />
          )}
          {hasChangedFilter && (
            <>
              <Button
                appearance="ghost"
                endIcon={false}
                size="sm"
                startIcon={<Search aria-hidden="true" strokeWidth={2} />}
              >
                Сохранить фильтр
              </Button>
              <IconButton
                aria-label="Закрыть действия фильтра"
                appearance="ghost"
                icon={<X aria-hidden="true" strokeWidth={2} />}
                onClick={resetFilters}
                size="sm"
              />
            </>
          )}
        </div>
      </div>
      {isFiltersModalOpen && (
        <FilterModal
          containerClassName={modalDisplay === "embedded" ? "fixed inset-0 z-50" : undefined}
          containerDisplay={modalDisplay}
          onOpenChange={setIsFiltersModalOpen}
          open={isFiltersModalOpen}
        />
      )}
    </section>
  )
}

export { ObjectFilter }
export type { ObjectFilterKey, ObjectFilterProps }
