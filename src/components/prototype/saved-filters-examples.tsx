import * as React from "react"

import { SavedFilterCard, type SavedFilterSubscription } from "@/components/ui/saved-filter-card"
import { FilterModal } from "@/components/ui/filter-modal"
import { createDefaultFilterModalValues, type FilterModalValues } from "@/components/ui/filter-modal-values"
import { ShowcaseSection } from "@/components/ui/showcase-section"

const initialSavedSearchValues: FilterModalValues = {
  ...createDefaultFilterModalValues(),
  location: "г. Тюмень, Мурино, КПД, Войновка",
  roominess: ["2", "Студия"],
  areaStart: "66",
  areaEnd: "80",
  priceStart: "3000000",
  priceEnd: "6000000",
}

function describeSavedSearch(values: FilterModalValues) {
  const details = [values.location]
  if (values.roominess.length > 0) details.push(values.roominess.map((room) => room === "Студия" ? room : `${room} ком`).join(", "))
  if (values.areaStart || values.areaEnd) details.push(`${values.areaStart || "от 0"}–${values.areaEnd || "∞"} м²`)
  if (values.priceStart || values.priceEnd) {
    const format = (amount: string) => amount ? new Intl.NumberFormat("ru-RU").format(Number(amount)) : "∞"
    details.push(values.priceStart && values.priceEnd
      ? `${format(values.priceStart)}–${format(values.priceEnd)} ₽`
      : values.priceStart
        ? `от ${format(values.priceStart)} ₽`
        : `до ${format(values.priceEnd)} ₽`)
  }
  details.push(values.source.length > 0 ? values.source.join(", ") : "Все источники")
  return details.filter(Boolean).join(", ")
}

function SavedFiltersExamples() {
  const [availableSubscription, setAvailableSubscription] = React.useState<SavedFilterSubscription>("available")
  const [availableName, setAvailableName] = React.useState("Совершенно обычный нормальный фильтр")
  const [availableValues, setAvailableValues] = React.useState(initialSavedSearchValues)
  const [activeSubscription, setActiveSubscription] = React.useState<SavedFilterSubscription>("subscribed")
  const [draftName, setDraftName] = React.useState("")
  const [editingSearch, setEditingSearch] = React.useState<{ name: string; values: FilterModalValues } | null>(null)

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Карточки показывают создание фильтра и три состояния подписки. Нажми на карандаш, чтобы открыть все параметры сохранённого поиска, включая его название."
        panels={[
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Создание нового</p>
            <SavedFilterCard
              details={describeSavedSearch(availableValues)}
              name={draftName}
              onNameChange={setDraftName}
              onSave={(name) => setDraftName(name)}
              variant="new"
            />
          </div>,
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Созданный</p>
            <SavedFilterCard details={describeSavedSearch(availableValues)} name={availableName} onEdit={() => setEditingSearch({
              name: availableName,
              values: structuredClone(availableValues),
            })} onDelete={() => undefined} onSubscriptionChange={(checked) => setAvailableSubscription(checked ? "subscribed" : "available")} subscription={availableSubscription} />
          </div>,
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Созданный, с активной подпиской</p>
            <SavedFilterCard details={describeSavedSearch(availableValues)} name="Фильтр, на который уже подписались" onEdit={() => undefined} onDelete={() => undefined} onSubscriptionChange={(checked) => setActiveSubscription(checked ? "subscribed" : "available")} subscription={activeSubscription} />
          </div>,
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Созданный, подписка недоступна</p>
            <SavedFilterCard details={`${describeSavedSearch(availableValues)}, поиск по области, Содержит слова в объявлении: Переуступка, срочно, без залога`} name="Фильтр с неподдерживаемыми параметрами" onEdit={() => undefined} onDelete={() => undefined} subscription="unavailable" />
          </div>,
        ]}
        direction="vertical"
        props={["variant: new · saved", "subscription: available · subscribed · unavailable", "saved search editing: all parameters + name"]}
        title="Состояния"
        usedComponents={[
          { href: "/Rhood/?view=components&component=button", title: "Button" },
          { href: "/Rhood/?view=components&component=checkbox", title: "Checkbox" },
          { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
          { href: "/Rhood/?view=components&component=text-field", title: "Textfield" },
          { href: "/Rhood/?view=components&component=tooltip", title: "Tooltip" },
        ]}
      />
      {editingSearch && (
        <FilterModal
          onApply={() => {
            setAvailableName(editingSearch.name)
            setAvailableValues(editingSearch.values)
            setEditingSearch(null)
          }}
          onOpenChange={(open) => !open && setEditingSearch(null)}
          onSearchNameChange={(name) => setEditingSearch((current) => current ? { ...current, name } : current)}
          onValuesChange={(values) => setEditingSearch((current) => current ? { ...current, values } : current)}
          open
          primaryActionLabel="Сохранить изменения"
          searchName={editingSearch.name}
          values={editingSearch.values}
        />
      )}
    </div>
  )
}

export { SavedFiltersExamples }
