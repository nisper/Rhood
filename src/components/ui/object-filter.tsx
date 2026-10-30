import * as React from "react"

import { AreaSelect } from "@/components/ui/area-select"
import { Button } from "@/components/ui/button"
import { FilterModal } from "@/components/ui/filter-modal"
import { createDefaultFilterModalValues, type FilterModalValues } from "@/components/ui/filter-modal-values"
import { Menu } from "@/components/ui/menu"
import { MenuItemMultiselect } from "@/components/ui/menu-item-multiselect"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { PriceSelect } from "@/components/ui/price-select"
import { RoominessSelect } from "@/components/ui/roominess-select"
import { Select } from "@/components/ui/select"
import { Bookmark, Bell, ChevronDown, Pencil, Search, Settings2, Trash2, X } from "lucide-react"
import { IconButton } from "@/components/ui/icon-button"
import { useMenuOpen } from "@/hooks/use-menu-open"
import { cn } from "@/lib/utils"
import { Modal, ModalContainer } from "@/components/ui/modal"
import { Textfield } from "@/components/ui/text-field"

type ObjectFilterKey =
  | "city"
  | "propertyType"
  | "roominess"
  | "area"
  | "price"
  | "source"
  | "author"

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
  contentWidth?: "full" | "container"
  filters?: ObjectFilterKey[]
  propertyType?: string
  onPropertyTypeChange?: (value: string) => void
  showFiltersButton?: boolean
  savedFiltersEnabled?: boolean
  onValuesChange?: (values: ObjectFilterValues) => void
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
const SAVED_FILTERS_STORAGE_KEY = "rhood.saved-filters.v1"

function createDefaultFilterValues(propertyType = "Квартиры"): ObjectFilterValues {
  return { city: [], propertyType, roominess: [], areaStart: "", areaEnd: "", priceStart: "", priceEnd: "", source: [], author: [] }
}

function readSavedFilters(): SavedFilter[] {
  try {
    const stored = window.localStorage.getItem(SAVED_FILTERS_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) as SavedFilter[] : []
    return Array.isArray(parsed) ? parsed : []
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
  savedFiltersEnabled = false,
  onValuesChange,
  onChange,
  ...props
}: ObjectFilterProps) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false)
  const [values, setValues] = React.useState(() => createDefaultFilterValues(propertyType))
  const [modalValues, setModalValues] = React.useState(createDefaultFilterModalValues)
  const [savedFilters, setSavedFilters] = React.useState<SavedFilter[]>(readSavedFilters)
  const savedFiltersRef = React.useRef<HTMLDivElement>(null)
  const [isSavedFiltersOpen, setIsSavedFiltersOpen] = useMenuOpen(savedFiltersRef)
  const [isNameModalOpen, setIsNameModalOpen] = React.useState(false)
  const [nameDraft, setNameDraft] = React.useState("")
  const [editingFilterId, setEditingFilterId] = React.useState<string | null>(null)
  const [subscriptionFilterId, setSubscriptionFilterId] = React.useState<string | null>(null)
  const [notice, setNotice] = React.useState("")
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
  React.useEffect(() => {
    if (!notice) return
    const timeoutId = window.setTimeout(() => setNotice(""), 3000)
    return () => window.clearTimeout(timeoutId)
  }, [notice])

  function describeFilter(filterValues: ObjectFilterValues) {
    const parts = [filterValues.propertyType]
    if (filterValues.roominess.length) parts.push(`${filterValues.roominess.join(", ")} комн.`)
    if (filterValues.areaStart || filterValues.areaEnd) parts.push(`Площадь ${filterValues.areaStart || "от 0"}–${filterValues.areaEnd || "∞"} м²`)
    if (filterValues.priceStart || filterValues.priceEnd) parts.push(`Цена ${filterValues.priceStart || "от 0"}–${filterValues.priceEnd || "∞"} ₽`)
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
  }

  function openSaveDialog(modalSnapshot?: FilterModalValues) {
    setEditingFilterId(null)
    setNameDraft(`${values.propertyType} — фильтр`)
    const savedModalValues = modalSnapshot ?? getModalSnapshotFromQuickFilters()
    pendingSaveRef.current = {
      values: getQuickValuesFromModal(savedModalValues),
      modalValues: structuredClone(savedModalValues),
    }
    setIsNameModalOpen(true)
  }

  function openRenameDialog(filter: SavedFilter) {
    setEditingFilterId(filter.id)
    setNameDraft(filter.name)
    setIsNameModalOpen(true)
  }

  function saveNamedFilter() {
    const name = nameDraft.trim()
    if (!name) return

    if (editingFilterId) {
      setSavedFilters((current) => current.map((filter) => filter.id === editingFilterId ? { ...filter, name } : filter))
      setNotice("Название фильтра изменено")
    } else {
      if (savedFilters.length >= 10) {
        setNotice("Достигнут лимит: можно сохранить до 10 фильтров")
        pendingSaveRef.current = null
        setIsNameModalOpen(false)
        return
      }
      const snapshot = pendingSaveRef.current ?? { values, modalValues: getModalSnapshotFromQuickFilters() }
      setSavedFilters((current) => [...current, {
        id: crypto.randomUUID(),
        name,
        values: structuredClone(snapshot.values),
        modalValues: structuredClone(snapshot.modalValues),
      }])
      setNotice("Фильтр сохранен")
    }
    pendingSaveRef.current = null
    setIsNameModalOpen(false)
    setIsSavedFiltersOpen(false)
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
    setIsSavedFiltersOpen(false)
    setNotice(`Применен фильтр «${filter.name}»`)
  }

  function confirmSubscription() {
    if (!subscriptionFilterId) return
    setSavedFilters((current) => current.map((filter) => filter.id === subscriptionFilterId ? { ...filter, subscribed: true } : filter))
    setNotice("Подписка на поиск оформлена")
    setSubscriptionFilterId(null)
    setIsSavedFiltersOpen(false)
  }

  function renderSavedFilterRows() {
    return savedFilters.map((filter) => (
      <div className="grid gap-1 rounded-[var(--rh-sizing-border-radius-md)] p-1" key={filter.id}>
        <div className="flex min-w-0 items-center gap-1">
          <MenuItemSingleSelect
            className="min-w-0 flex-1"
            icon={false}
            onClick={() => {
              applySavedFilter(filter)
              setIsFiltersModalOpen(false)
            }}
            rightSlot={false}
            secondaryText={false}
            selected={false}
          >
            {filter.name}
          </MenuItemSingleSelect>
          <IconButton aria-label={`Переименовать фильтр «${filter.name}»`} appearance="ghost" icon={<Pencil aria-hidden="true" />} onClick={() => openRenameDialog(filter)} size="xsm" title="Переименовать" />
          <IconButton aria-label={`Удалить фильтр «${filter.name}»`} appearance="ghost" icon={<Trash2 aria-hidden="true" />} onClick={() => {
            setSavedFilters((current) => current.filter((item) => item.id !== filter.id))
            setNotice(`Фильтр «${filter.name}» удален`)
          }} size="xsm" title="Удалить" />
        </div>
        <div className="flex min-w-0 items-center justify-between gap-2 px-3">
          <p className="min-w-0 flex-1 text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">{describeFilter(filter.values)}</p>
          <Button appearance="ghost" disabled={filter.subscribed} endIcon={false} onClick={() => setSubscriptionFilterId(filter.id)} size="sm" startIcon={<Bell aria-hidden="true" />}>{filter.subscribed ? "Подписка активна" : "Подписаться"}</Button>
        </div>
      </div>
    ))
  }

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
          {filters.includes("propertyType") && (
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
          {filters.includes("roominess") && (
            <RoominessSelect aria-label="Количество комнат" label={false} selectedValues={values.roominess} onSelectedValuesChange={(roominess) => updateValues({ roominess })} size="sm" />
          )}
          {filters.includes("area") && <AreaSelect startValue={values.areaStart} endValue={values.areaEnd} onRangeChange={(areaStart, areaEnd) => updateValues({ areaStart, areaEnd })} size="sm" />}
          {filters.includes("price") && <PriceSelect startValue={values.priceStart} endValue={values.priceEnd} onRangeChange={(priceStart, priceEnd) => updateValues({ priceStart, priceEnd })} size="sm" />}
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
          {savedFiltersEnabled && (
            <div className="relative" ref={savedFiltersRef}>
              <Button
                appearance="default"
                endIcon={<ChevronDown aria-hidden="true" className={cn("transition-transform", isSavedFiltersOpen && "rotate-180")} />}
                onClick={() => setIsSavedFiltersOpen((open) => !open)}
                size="sm"
                startIcon={<Bookmark aria-hidden="true" />}
              >
                Сохранённые фильтры
              </Button>
              {isSavedFiltersOpen && (
                <Menu className="absolute left-0 top-full z-30 mt-1 max-h-[420px] w-[min(420px,calc(100vw-32px))] overflow-y-auto p-2">
                  <p className="px-3 pb-1 pt-2 rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Сохранённые фильтры</p>
                  {savedFilters.length === 0 && <p className="px-3 py-2 text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]">Пока нет сохранённых фильтров. Измени параметры и нажми «Сохранить фильтр».</p>}
                  {renderSavedFilterRows()}
                </Menu>
              )}
            </div>
          )}
          {savedFiltersEnabled && isFilterModified && (
            <>
              <Button
                appearance="ghost"
                endIcon={false}
                disabled={savedFilters.length >= 10}
                onClick={() => openSaveDialog()}
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
          {notice && <span aria-live="polite" className="self-center text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]">{notice}</span>}
        </div>
      </div>
      {isFiltersModalOpen && (
        <FilterModal
          containerClassName={modalDisplay === "embedded" ? "fixed inset-0 z-50" : undefined}
          containerDisplay={modalDisplay}
          onApply={applyModalFilters}
          onClear={resetFilters}
          onSave={() => openSaveDialog(modalValues)}
          onValuesChange={setModalValues}
          savedFilterLimitReached={savedFilters.length >= 10}
          savedSearchesContent={savedFilters.length === 0
            ? <p className="rh-typography-b1 px-2 py-4 text-[var(--rh-theme-text-neutral-secondary)]">Пока нет сохранённых поисков. Настрой фильтр и сохрани его.</p>
            : <Menu className="max-h-[min(560px,55vh)] overflow-y-auto p-2">{renderSavedFilterRows()}</Menu>}
          onOpenChange={setIsFiltersModalOpen}
          open={isFiltersModalOpen}
          values={modalValues}
        />
      )}
      {isNameModalOpen && (
        <ModalContainer className="fixed inset-0 z-[60]">
          <Modal
            footer={
              <>
                <Button appearance="default" endIcon={false} onClick={() => setIsNameModalOpen(false)} size="md" startIcon={false}>Отмена</Button>
                <Button appearance="primary" disabled={!nameDraft.trim()} endIcon={false} onClick={saveNamedFilter} size="md" startIcon={false}>{editingFilterId ? "Сохранить" : "Сохранить фильтр"}</Button>
              </>
            }
            maxWidth={420}
            onOpenChange={setIsNameModalOpen}
            open={isNameModalOpen}
            title={editingFilterId ? "Переименовать фильтр" : "Сохранить фильтр"}
          >
            <div className="grid gap-2">
              <p className="text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]">Назови набор параметров, чтобы быстро найти его позже.</p>
              <Textfield aria-label="Название фильтра" autoFocus onChange={(event) => setNameDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && saveNamedFilter()} placeholder="Например, Двухкомнатные в центре" size="lg" value={nameDraft} />
              {!editingFilterId && <p className="text-xs leading-4 text-[var(--rh-theme-text-neutral-secondary)]">Сохранено {savedFilters.length} из 10 фильтров</p>}
            </div>
          </Modal>
        </ModalContainer>
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
    </section>
  )
}

export { ObjectFilter }
export type { ObjectFilterKey, ObjectFilterProps, ObjectFilterValues }
