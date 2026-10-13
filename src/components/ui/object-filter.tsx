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
import { Settings2 } from "lucide-react"
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
  options,
}: {
  label: string
  multiSelect?: boolean
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
                    setSelectedValues((current) => current.includes(option)
                      ? current.filter((item) => item !== option)
                      : [...current, option])
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
                    setValue(option)
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
  modalDisplay = "viewport",
  showFiltersButton = true,
  ...props
}: ObjectFilterProps) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false)
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
            <ArchiveFilterSelect label="Город" multiSelect options={cityOptions} />
          )}
          {filters.includes("propertyType") && (
            <ArchiveFilterSelect label="Квартиры" options={propertyTypeOptions} />
          )}
          {filters.includes("roominess") && (
            <RoominessSelect aria-label="Количество комнат" label={false} size="sm" />
          )}
          {filters.includes("area") && <AreaSelect size="sm" />}
          {filters.includes("price") && <PriceSelect size="sm" />}
          {filters.includes("source") && (
            <ArchiveFilterSelect
              label="Источник"
              multiSelect
              options={["Авито", "Циан", "Домклик", "Яндекс Недвижимость"]}
            />
          )}
          {filters.includes("author") && (
            <ArchiveFilterSelect
              label="Автор"
              multiSelect
              options={["Частное лицо", "Агентство"]}
            />
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
