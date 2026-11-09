import * as React from "react"

import { Button } from "@/components/ui/button"
import { Confirm } from "@/components/ui/confirm"
import { EmptySavedSearches, FilterModal } from "@/components/ui/filter-modal"
import { createDefaultFilterModalValues, type FilterModalValues } from "@/components/ui/filter-modal-values"
import { InputNumberRange } from "@/components/ui/input-number-range"
import { Menu } from "@/components/ui/menu"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { SavedFilterCard } from "@/components/ui/saved-filter-card"
import { IconButton } from "@/components/ui/icon-button"
import { Select } from "@/components/ui/select"
import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { ToggleChip } from "@/components/ui/toggle-chip"
import { Search, Settings2, X } from "lucide-react"
import { useMenuOpen } from "@/hooks/use-menu-open"
import { useSnackbarQueue } from "@/hooks/use-snackbar-queue"
import { cn } from "@/lib/utils"
import { Modal, ModalContainer } from "@/components/ui/modal"
import { SnackbarViewport } from "@/components/ui/snackbar-viewport"

type ObjectFilterKey =
  | "city"
  | "propertyType"
  | "roominess"
  | "area"
  | "price"
  | "source"
  | "author"
  | "crmStatus"

type ObjectFilterValues = {
  city: string[]
  propertyType: string
  roominess: string[]
  areaStart: string
  areaEnd: string
  priceStart: string
  priceEnd: string
  source: string[]
  author: string[]
}

type SavedFilter = {
  id: string
  name: string
  values: ObjectFilterValues
  modalValues?: FilterModalValues
  subscribed?: boolean
}

type ObjectFilterProps = React.ComponentProps<"section"> & {
  contentWidth?: "full" | "container" | "none"
  filters?: ObjectFilterKey[]
  propertyType?: string
  onPropertyTypeChange?: (value: string) => void
  showFiltersButton?: boolean
  onValuesChange?: (values: ObjectFilterValues) => void
  modalDisplay?: React.ComponentProps<typeof FilterModal>["containerDisplay"]
  propertyTypeControl?: "select" | "segmented"
  crmStatus?: string
  crmStatusOptions?: string[]
  onCrmStatusChange?: (value: string) => void
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
const roominessOptions = ["Студия", "1", "2", "3", "4+"] as const
const SAVED_FILTERS_STORAGE_KEY = "rhood.saved-filters.v1"

type QuickRangeKey = "area" | "price"
type ExpandedQuickFilter = "roominess" | QuickRangeKey | null

function formatRoominessValue(selectedValues: readonly string[]) {
  const selected = roominessOptions.filter((option) => selectedValues.includes(option))
  if (selected.length === 0) return "Комнат"
  if (selected.length === 1 && selected[0] === "Студия") return "Студия"

  const labels: string[] = []
  if (selected.includes("Студия")) labels.push("Студия")

  const numbers = selected.filter((option) => option !== "Студия")
  for (let index = 0; index < numbers.length;) {
    let endIndex = index
    while (
      endIndex + 1 < numbers.length &&
      (numbers[endIndex] === "3" && numbers[endIndex + 1] === "4+" ||
        numbers[endIndex + 1] !== "4+" &&
        Number(numbers[endIndex + 1]) === Number(numbers[endIndex]) + 1)
    ) {
      endIndex += 1
    }

    if (endIndex > index) {
      labels.push(`${numbers[index]}–${numbers[endIndex]}`)
    } else {
      labels.push(...numbers.slice(index, endIndex + 1))
    }
    index = endIndex + 1
  }

  return `${labels.join(", ")} комн.`
}

function formatPriceAmount(value: string, compact: boolean) {
  const amount = Number(value)
  if (compact && amount >= 1_000) {
    return new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 2,
      notation: "compact",
    }).format(amount)
  }

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function formatPriceValue(start: string, end: string) {
  if (!start && !end) return "Цена"
  if (!start) return `до ${formatPriceAmount(end, Number(end) >= 1_000_000)} ₽`
  if (!end) return `от ${formatPriceAmount(start, Number(start) >= 1_000_000)} ₽`

  const sameValue = Number(start) === Number(end)
  if (sameValue) return `${formatPriceAmount(start, Number(start) >= 1_000_000)} ₽`

  const useCompactFormat = Number(start) >= 1_000_000 || Number(end) >= 1_000_000
  return `${formatPriceAmount(start, useCompactFormat)}–${formatPriceAmount(end, useCompactFormat)} ₽`
}

function renderQuickRangeFilter({
  expanded,
  endValue,
  groupThousands = false,
  label,
  onExpandedChange,
  onRangeChange,
  startValue,
  unit,
  value,
  width,
}: {
  expanded: boolean
  endValue: string
  groupThousands?: boolean
  label: string
  onExpandedChange: (expanded: boolean) => void
  onRangeChange: (startValue: string, endValue: string) => void
  startValue: string
  unit?: string
  value: string
  width: string
}) {
  return (
    <Select
      aria-label={label}
      className={cn((startValue || endValue) && "tabular-nums")}
      expanded={expanded}
      label={false}
      menu={expanded && (
        <Menu className="absolute left-0 top-full z-20 mt-1 min-w-full !p-0">
          <InputNumberRange
            aria-label={`Диапазон: ${label.toLowerCase()}`}
            appearance="default"
            className={width}
            endInputProps={{
              ...(groupThousands && { groupThousands: true }),
              onChange: (event) => onRangeChange(startValue, event.target.value),
              placeholder: "до",
              value: endValue,
            }}
            size="lg"
            startInputProps={{
              ...(groupThousands && { groupThousands: true }),
              onChange: (event) => onRangeChange(event.target.value, endValue),
              placeholder: "от",
              value: startValue,
            }}
            unit={unit}
          />
          {(startValue || endValue) && (
            <div className="mt-2 flex">
              <Button
                appearance="ghost"
                endIcon={false}
                onClick={() => onRangeChange("", "")}
                size="sm"
                startIcon={false}
              >
                Сбросить
              </Button>
            </div>
          )}
        </Menu>
      )}
      onClick={() => onExpandedChange(!expanded)}
      onExpandedChange={onExpandedChange}
      size="sm"
      value={value}
    />
  )
}

function createDefaultFilterValues(propertyType = "Квартиры"): ObjectFilterValues {
  return { city: [], propertyType, roominess: [], areaStart: "", areaEnd: "", priceStart: "", priceEnd: "", source: [], author: [] }
}

function readSavedFilters(): SavedFilter[] {
  try {
    const stored = window.localStorage.getItem(SAVED_FILTERS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) as SavedFilter[] : []
    return Array.isArray(parsed)
      ? parsed.map((filter) => ({
          ...filter,
          id: typeof filter.id === "string" && filter.id ? filter.id : crypto.randomUUID(),
        }))
      : []
  } catch {
    return []
  }
}

function ArchiveFilterSelect({
  label,
  multiSelect = false,
  value: controlledValue,
  selectedValues: controlledSelectedValues,
  onFilterChange,
  onValueChange,
  onSelectedValuesChange,
  options,
}: {
  label: string
  multiSelect?: boolean
  value?: string
  selectedValues?: readonly string[]
  onFilterChange?: () => void
  onValueChange?: (value: string) => void
  onSelectedValuesChange?: (values: string[]) => void
  options: readonly string[]
}) {
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useMenuOpen(menuRef)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(label)
  const [uncontrolledSelectedValues, setUncontrolledSelectedValues] = React.useState<string[]>([])
  const value = controlledValue ?? uncontrolledValue
  const selectedValues = controlledSelectedValues ?? uncontrolledSelectedValues
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
                    if (controlledSelectedValues === undefined) setUncontrolledSelectedValues(next)
                    onSelectedValuesChange?.(next)
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
                    if (controlledValue === undefined) setUncontrolledValue(option)
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
  onValuesChange,
  propertyTypeControl = "select",
  crmStatus = "Все статусы",
  crmStatusOptions = ["Все статусы"],
  onCrmStatusChange,
  onChange,
  ...props
}: ObjectFilterProps) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false)
  const [filterModalDefaultTab, setFilterModalDefaultTab] = React.useState<"filter" | "saved-searches">("filter")
  const [expandedQuickFilter, setExpandedQuickFilter] = React.useState<ExpandedQuickFilter>(null)
  const [values, setValues] = React.useState(() => createDefaultFilterValues(propertyType))
  const [modalValues, setModalValues] = React.useState(createDefaultFilterModalValues)
  const [savedFilters, setSavedFilters] = React.useState<SavedFilter[]>(readSavedFilters)
  const [isCreatingSavedFilter, setIsCreatingSavedFilter] = React.useState(false)
  const [nameDraft, setNameDraft] = React.useState("")
  const [editingFilterId, setEditingFilterId] = React.useState<string | null>(null)
  const [isEditingSavedFilter, setIsEditingSavedFilter] = React.useState(false)
  const [editingSearchName, setEditingSearchName] = React.useState("")
  const [pendingDeleteFilterId, setPendingDeleteFilterId] = React.useState<string | null>(null)
  const [subscriptionFilterId, setSubscriptionFilterId] = React.useState<string | null>(null)
  const { notices, show: setNotice } = useSnackbarQueue(3)
  const pendingSaveRef = React.useRef<{ values: ObjectFilterValues; modalValues: FilterModalValues } | null>(null)
  const initialPropertyType = React.useRef(propertyType ?? "Квартиры")
  function updateValues(patch: Partial<ObjectFilterValues>) {
    const next = { ...values, ...patch }
    setValues(next)
    onValuesChange?.(next)
  }
  const isFilterModified = Object.entries(values).some(([key, value]) => {
    if (key === "propertyType") return value !== initialPropertyType.current
    if (Array.isArray(value)) return value.length > 0
    return value !== ""
  })
  const resetFilters = React.useCallback(() => {
    const next = createDefaultFilterValues(initialPropertyType.current)
    setValues(next)
    onValuesChange?.(next)
    onPropertyTypeChange?.(initialPropertyType.current)
  }, [onPropertyTypeChange, onValuesChange])
  React.useEffect(() => {
    window.localStorage.setItem(SAVED_FILTERS_STORAGE_KEY, JSON.stringify(savedFilters))
  }, [savedFilters])
  function describeFilter(filterValues: ObjectFilterValues) {
    const parts = [filterValues.propertyType]
    if (filterValues.roominess.length) parts.push(`${filterValues.roominess.join(", ")} комн.`)
    if (filterValues.areaStart || filterValues.areaEnd) parts.push(`Площадь ${filterValues.areaStart || "от 0"}–${filterValues.areaEnd || "∞"} м²`)
    if (filterValues.priceStart || filterValues.priceEnd) parts.push(`Цена ${formatPriceValue(filterValues.priceStart, filterValues.priceEnd)}`)
    if (filterValues.city.length) parts.push(filterValues.city.join(", "))
    if (filterValues.source.length) parts.push(filterValues.source.join(", "))
    if (filterValues.author.length) parts.push(filterValues.author.join(", "))
    return parts.join(" · ")
  }

  function getModalSnapshotFromQuickFilters(): FilterModalValues {
    return {
      ...modalValues,
      location: values.city.join(", "),
      roominess: values.roominess,
      areaStart: values.areaStart,
      areaEnd: values.areaEnd,
      priceStart: values.priceStart,
      priceEnd: values.priceEnd,
      source: values.source,
      author: values.author[0] ?? "Не выбрано",
    }
  }

  function getQuickValuesFromModal(modalSnapshot: FilterModalValues): ObjectFilterValues {
    const location = modalSnapshot.location.trim()
    return {
      ...values,
      city: location ? [location] : [],
      roominess: modalSnapshot.roominess,
      areaStart: modalSnapshot.areaStart,
      areaEnd: modalSnapshot.areaEnd,
      priceStart: modalSnapshot.priceStart,
      priceEnd: modalSnapshot.priceEnd,
      source: modalSnapshot.source,
      author: modalSnapshot.author === "Не выбрано" ? [] : [modalSnapshot.author],
    }
  }

  function applyModalFilters() {
    const nextValues = getQuickValuesFromModal(modalValues)
    setValues(nextValues)
    onValuesChange?.(nextValues)
    onPropertyTypeChange?.(nextValues.propertyType)
    if (isEditingSavedFilter) {
      setSavedFilters((current) => current.map((filter) => filter.id === editingFilterId
        ? { ...filter, name: editingSearchName.trim() || filter.name, values: structuredClone(nextValues), modalValues: structuredClone(modalValues) }
        : filter))
      setNotice("Сохранённый поиск обновлен")
      setEditingFilterId(null)
      setIsEditingSavedFilter(false)
    }
  }

  function editSavedFilter(filter: SavedFilter) {
    const nextModalValues = filter.modalValues ?? {
      ...createDefaultFilterModalValues(),
      location: filter.values.city.join(", "),
      roominess: filter.values.roominess,
      areaStart: filter.values.areaStart,
      areaEnd: filter.values.areaEnd,
      priceStart: filter.values.priceStart,
      priceEnd: filter.values.priceEnd,
      source: filter.values.source,
      author: filter.values.author[0] ?? "Не выбрано",
    }
    setEditingFilterId(filter.id)
    setIsEditingSavedFilter(true)
    setEditingSearchName(filter.name)
    setModalValues(structuredClone(nextModalValues))
    setIsFiltersModalOpen(true)
  }

  function openSaveDialog(modalSnapshot?: FilterModalValues) {
    setEditingFilterId(null)
    setIsEditingSavedFilter(false)
    setNameDraft(`${values.propertyType} — фильтр`)
    const savedModalValues = modalSnapshot ?? getModalSnapshotFromQuickFilters()
    pendingSaveRef.current = {
      values: getQuickValuesFromModal(savedModalValues),
      modalValues: structuredClone(savedModalValues),
    }
    setIsCreatingSavedFilter(true)
    setFilterModalDefaultTab("saved-searches")
    setIsFiltersModalOpen(true)
  }

  function saveNamedFilter() {
    const name = nameDraft.trim()
    if (!name) return

    if (savedFilters.length >= 10) {
      setNotice("Достигнут лимит: можно сохранить до 10 фильтров")
      pendingSaveRef.current = null
      setIsCreatingSavedFilter(false)
      return
    }
    const snapshot = pendingSaveRef.current ?? { values, modalValues: getModalSnapshotFromQuickFilters() }
    const nextFilter: SavedFilter = {
      id: crypto.randomUUID(),
      name,
      values: structuredClone(snapshot.values),
      modalValues: structuredClone(snapshot.modalValues),
    }
    setSavedFilters((current) => [nextFilter, ...current])
    setNotice("Поиск сохранен")
    pendingSaveRef.current = null
    setIsCreatingSavedFilter(false)
  }

  function applySavedFilter(filter: SavedFilter) {
    setValues(structuredClone(filter.values))
    onValuesChange?.(filter.values)
    onPropertyTypeChange?.(filter.values.propertyType)
    const nextModalValues = filter.modalValues ?? {
      ...createDefaultFilterModalValues(),
      location: filter.values.city.join(", "),
      roominess: filter.values.roominess,
      areaStart: filter.values.areaStart,
      areaEnd: filter.values.areaEnd,
      priceStart: filter.values.priceStart,
      priceEnd: filter.values.priceEnd,
      source: filter.values.source,
      author: filter.values.author[0] ?? "Не выбрано",
    }
    setModalValues(structuredClone(nextModalValues))
    setNotice(`Применен фильтр «${filter.name}»`)
  }

  function confirmSubscription() {
    if (!subscriptionFilterId) return
    setSavedFilters((current) => current.map((filter) => filter.id === subscriptionFilterId ? { ...filter, subscribed: true } : filter))
    setNotice("Подписка на поиск оформлена")
    setSubscriptionFilterId(null)
  }

  function confirmDeleteSavedFilter() {
    if (!pendingDeleteFilterId) return
    const deletedFilter = savedFilters.find((filter) => filter.id === pendingDeleteFilterId)
    setSavedFilters((current) => current.filter((filter) => filter.id !== pendingDeleteFilterId))
    if (deletedFilter) setNotice(`Поиск «${deletedFilter.name}» удален`)
    setPendingDeleteFilterId(null)
    if (isEditingSavedFilter) {
      setEditingFilterId(null)
      setIsEditingSavedFilter(false)
      setIsFiltersModalOpen(false)
    }
  }

  function renderSavedFilterRows() {
    return savedFilters.map((filter) => (
      <SavedFilterCard
        details={describeFilter(filter.values)}
        key={filter.id}
        name={filter.name}
        onApply={() => {
          applySavedFilter(filter)
          setIsFiltersModalOpen(false)
        }}
        onDelete={() => setPendingDeleteFilterId(filter.id)}
        onEdit={() => editSavedFilter(filter)}
        onSubscriptionChange={(subscribed) => {
          if (subscribed) setSubscriptionFilterId(filter.id)
          else setSavedFilters((current) => current.map((item) => item.id === filter.id ? { ...item, subscribed: false } : item))
        }}
        subscription={filter.subscribed ? "subscribed" : "available"}
      />
    ))
  }

  const contentWidthClass =
    contentWidth === "container"
      ? "rhood-layout-container"
      : contentWidth === "full"
        ? "rhood-page-gutter"
        : ""

  return (
    <section
      className={cn(
        "relative w-full overflow-visible bg-[var(--rh-theme-surface-bg)] pt-4",
        className,
      )}
      onChange={(event) => {
        onChange?.(event)
      }}
      {...props}
    >
      <div className={cn(contentWidthClass, "overflow-visible")}>
        <div className="flex flex-wrap items-start gap-1 overflow-visible">
          {showFiltersButton && (
            <Button
              appearance="default"
              endIcon={false}
              onClick={() => {
                setEditingFilterId(null)
                setModalValues(getModalSnapshotFromQuickFilters())
                setIsFiltersModalOpen(true)
              }}
              size="sm"
              startIcon={<Settings2 aria-hidden="true" strokeWidth={2} />}
            >
              Фильтры
            </Button>
          )}
          {filters.includes("city") && (
            <ArchiveFilterSelect label="Город" multiSelect options={cityOptions} selectedValues={values.city} onSelectedValuesChange={(city) => updateValues({ city })} />
          )}
          {filters.includes("propertyType") && propertyTypeControl === "segmented" && (
            <SegmentedControl aria-label="Тип недвижимости" onValueChange={(value) => {
              updateValues({ propertyType: value as string })
              onPropertyTypeChange?.(value as string)
            }} size="sm" value={values.propertyType}>
              {propertyTypeOptions.map((option) => <Segment key={option} value={option}>{option}</Segment>)}
            </SegmentedControl>
          )}
          {filters.includes("propertyType") && propertyTypeControl === "select" && (
            <ArchiveFilterSelect
              label={values.propertyType}
              value={values.propertyType}
              onValueChange={(nextPropertyType) => {
                updateValues({ propertyType: nextPropertyType })
                onPropertyTypeChange?.(nextPropertyType)
              }}
              options={propertyTypeOptions}
            />
          )}
          {filters.includes("crmStatus") && (
            <ArchiveFilterSelect label="Статус в CRM" value={crmStatus} onValueChange={(value) => onCrmStatusChange?.(value)} options={crmStatusOptions} />
          )}
          {filters.includes("roominess") && (
            <Select
              aria-label="Количество комнат"
              expanded={expandedQuickFilter === "roominess"}
              label={false}
              menu={expandedQuickFilter === "roominess" && (
                <Menu className="absolute left-0 top-full z-20 mt-1 p-2">
                  <div className="flex flex-wrap gap-[var(--rh-sizing-base-module-0-75)]">
                    {roominessOptions.map((option) => (
                      <ToggleChip
                        checked={values.roominess.includes(option)}
                        icon={false}
                        key={option}
                        onCheckedChange={(checked) => {
                          const roominess = checked
                            ? [...values.roominess, option]
                            : values.roominess.filter((value) => value !== option)
                          updateValues({ roominess })
                        }}
                        size="md"
                      >
                        {option}
                      </ToggleChip>
                    ))}
                  </div>
                  {values.roominess.length > 0 && (
                    <div className="mt-2 flex w-full">
                      <Button
                        appearance="ghost"
                        endIcon={false}
                        onClick={() => updateValues({ roominess: [] })}
                        size="sm"
                        startIcon={false}
                      >
                        Сбросить
                      </Button>
                    </div>
                  )}
                </Menu>
              )}
              onClick={() => setExpandedQuickFilter((current) => current === "roominess" ? null : "roominess")}
              onExpandedChange={(expanded) => setExpandedQuickFilter(expanded ? "roominess" : null)}
              size="sm"
              value={formatRoominessValue(values.roominess)}
            />
          )}
          {filters.includes("area") && renderQuickRangeFilter({
            expanded: expandedQuickFilter === "area",
            endValue: values.areaEnd,
            label: "Площадь",
            onExpandedChange: (expanded) => setExpandedQuickFilter(expanded ? "area" : null),
            onRangeChange: (areaStart, areaEnd) => updateValues({ areaStart, areaEnd }),
            startValue: values.areaStart,
            unit: "м²",
            value: !values.areaStart && !values.areaEnd
              ? "Площадь"
              : !values.areaStart
                ? `до ${values.areaEnd} м²`
                : !values.areaEnd
                  ? `от ${values.areaStart} м²`
                  : Number(values.areaStart) === Number(values.areaEnd)
                    ? `${values.areaStart} м²`
                    : `${values.areaStart}–${values.areaEnd} м²`,
            width: "!w-[200px]",
          })}
          {filters.includes("price") && renderQuickRangeFilter({
            expanded: expandedQuickFilter === "price",
            endValue: values.priceEnd,
            groupThousands: true,
            label: "Цена",
            onExpandedChange: (expanded) => setExpandedQuickFilter(expanded ? "price" : null),
            onRangeChange: (priceStart, priceEnd) => updateValues({ priceStart, priceEnd }),
            startValue: values.priceStart,
            unit: "₽",
            value: formatPriceValue(values.priceStart, values.priceEnd),
            width: "!w-[310px]",
          })}
          {filters.includes("source") && (
            <ArchiveFilterSelect
              label="Источник"
              multiSelect
              selectedValues={values.source}
              onSelectedValuesChange={(source) => updateValues({ source })}
              options={["Авито", "Циан", "Домклик", "Яндекс Недвижимость"]}
            />
          )}
          {filters.includes("author") && (
            <ArchiveFilterSelect
              label="Автор"
              multiSelect
              selectedValues={values.author}
              onSelectedValuesChange={(author) => updateValues({ author })}
              options={["Частное лицо", "Агентство"]}
            />
          )}
          {isFilterModified && (
            <>
              <Button
                appearance="ghost"
                endIcon={false}
                disabled={savedFilters.length >= 10}
                onClick={() => openSaveDialog()}
                size="sm"
                startIcon={<Search aria-hidden="true" strokeWidth={2} />}
              >
                Сохранить поиск
              </Button>
              <IconButton aria-label="Очистить фильтры" appearance="ghost" icon={<X aria-hidden="true" strokeWidth={2} />} onClick={resetFilters} size="sm" title="Очистить" />
            </>
          )}
        </div>
      </div>
      <SnackbarViewport button={false} close={false} icon={false} notices={notices} />
      {isFiltersModalOpen && (
        <FilterModal
          key={isEditingSavedFilter ? editingFilterId ?? "editing-saved-filter" : "filter-modal"}
          containerClassName={modalDisplay === "embedded" ? "fixed inset-0 z-50" : undefined}
          containerDisplay={modalDisplay}
          defaultActiveTab={filterModalDefaultTab}
          onApply={applyModalFilters}
          onClear={isEditingSavedFilter ? undefined : resetFilters}
          onDelete={isEditingSavedFilter ? () => setPendingDeleteFilterId(editingFilterId) : undefined}
          onSave={isEditingSavedFilter ? undefined : () => openSaveDialog(modalValues)}
          onValuesChange={setModalValues}
          onSearchNameChange={setEditingSearchName}
          primaryActionLabel="Сохранить изменения"
          savedFilterLimitReached={savedFilters.length >= 10}
          savedSearchesContent={savedFilters.length > 0 || isCreatingSavedFilter ? (
            <div className="grid content-start max-h-[min(560px,55vh)] gap-2 overflow-y-auto p-2">
              {isCreatingSavedFilter && pendingSaveRef.current && (
                <SavedFilterCard
                  details={describeFilter(pendingSaveRef.current.values)}
                  name={nameDraft}
                  onNameChange={setNameDraft}
                  onSave={saveNamedFilter}
                  variant="new"
                />
              )}
              {renderSavedFilterRows()}
            </div>
          ) : (
            <EmptySavedSearches />
          )}
          open={isFiltersModalOpen}
          searchName={isEditingSavedFilter ? editingSearchName : undefined}
          values={modalValues}
          onOpenChange={(open) => {
            setIsFiltersModalOpen(open)
            if (!open) {
              setEditingFilterId(null)
              setIsEditingSavedFilter(false)
              setIsCreatingSavedFilter(false)
              setFilterModalDefaultTab("filter")
              pendingSaveRef.current = null
            }
          }}
        />
      )}
      {subscriptionFilterId && (
        <ModalContainer className="fixed inset-0 z-[60]">
          <Modal
            footer={
              <>
                <Button appearance="default" endIcon={false} onClick={() => setSubscriptionFilterId(null)} size="md" startIcon={false}>Отмена</Button>
                <Button appearance="primary" endIcon={false} onClick={confirmSubscription} size="md" startIcon={false}>Подписаться на поиск</Button>
              </>
            }
            maxWidth={480}
            onOpenChange={(open) => !open && setSubscriptionFilterId(null)}
            open={Boolean(subscriptionFilterId)}
            title="Подписаться на поиск"
          >
            <p className="text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]">Будем присылать новые объекты по сохранённому фильтру «{savedFilters.find((filter) => filter.id === subscriptionFilterId)?.name}». Подписка на поиск оформляется отдельно от сохранения фильтра.</p>
          </Modal>
        </ModalContainer>
      )}
      {pendingDeleteFilterId && (
        <Confirm
          cancelLabel="Отмена"
          confirmLabel="Удалить"
          description={`Фильтр «${savedFilters.find((filter) => filter.id === pendingDeleteFilterId)?.name}» будет удалён. Это действие нельзя отменить.`}
          onConfirm={confirmDeleteSavedFilter}
          onOpenChange={(open) => !open && setPendingDeleteFilterId(null)}
          open={Boolean(pendingDeleteFilterId)}
          title="Удалить сохранённый фильтр?"
        />
      )}
    </section>
  )
}

export { ObjectFilter }
export type { ObjectFilterKey, ObjectFilterProps, ObjectFilterValues }
