import * as React from "react"

import { SavedFilterCard, type SavedFilterSubscription } from "@/components/ui/saved-filter-card"
import { ShowcaseSection } from "@/components/ui/showcase-section"

const filterDetails = "г. Тюмень, 2 ком, Студия, 66–80 м² 3 000 000–6 000 000 ₽, Мурино, КПД, Войновка, Все источники"

function SavedFiltersExamples() {
  const [availableSubscription, setAvailableSubscription] = React.useState<SavedFilterSubscription>("available")
  const [activeSubscription, setActiveSubscription] = React.useState<SavedFilterSubscription>("subscribed")
  const [draftName, setDraftName] = React.useState("")

  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Карточки показывают создание фильтра и три состояния подписки. Попробуй изменить название, переключить подписку или нажать на пояснение у недоступной подписки."
        panels={[
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Создание нового</p>
            <SavedFilterCard
              details={filterDetails}
              name={draftName}
              onNameChange={setDraftName}
              onSave={(name) => setDraftName(name)}
              variant="new"
            />
          </div>,
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Созданный</p>
            <SavedFilterCard details={filterDetails} name="Совершенно обычный нормальный фильтр" onEdit={() => undefined} onDelete={() => undefined} onSubscriptionChange={(checked) => setAvailableSubscription(checked ? "subscribed" : "available")} subscription={availableSubscription} />
          </div>,
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Созданный, с активной подпиской</p>
            <SavedFilterCard details={filterDetails} name="Фильтр, на который уже подписались" onEdit={() => undefined} onDelete={() => undefined} onSubscriptionChange={(checked) => setActiveSubscription(checked ? "subscribed" : "available")} subscription={activeSubscription} />
          </div>,
          <div className="grid min-w-0 content-start gap-2 rounded-xl bg-white p-4">
            <p className="rh-typography-b2-med">Созданный, подписка недоступна</p>
            <SavedFilterCard details={`${filterDetails}, поиск по области, Содержит слова в объявлении: Переуступка, срочно, без залога`} name="Фильтр с неподдерживаемыми параметрами" onEdit={() => undefined} onDelete={() => undefined} subscription="unavailable" />
          </div>,
        ]}
        direction="vertical"
        settings={["variant: new · saved", "subscription: available · subscribed · unavailable"]}
        title="Состояния"
        usedComponents={[
          { href: "/Rhood/?view=components&component=button", title: "Button" },
          { href: "/Rhood/?view=components&component=checkbox", title: "Checkbox" },
          { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
          { href: "/Rhood/?view=components&component=text-field", title: "Textfield" },
          { href: "/Rhood/?view=components&component=tooltip", title: "Tooltip" },
        ]}
      />
    </div>
  )
}

export { SavedFiltersExamples }
