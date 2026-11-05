import { ObjectFilter } from "@/components/ui/object-filter"
import { ShowcaseSection } from "@/components/ui/showcase-section"

const usedComponents = [
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=filter-modal", title: "FilterModal" },
  { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
  { href: "/Rhood/?view=components&component=select", title: "Select" },
  { href: "/Rhood/?view=components&component=roominess", title: "RoominessSelect" },
  { href: "/Rhood/?view=components&component=area-select", title: "AreaSelect" },
  { href: "/Rhood/?view=components&component=price-select", title: "PriceSelect" },
]

function ObjectFilterExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="ObjectFilter не имеет отдельных вариантов стиля, размера и статичных состояний. Измени быстрые фильтры: появятся действия «Сохранить поиск» и «Очистить». Кнопка «Фильтры» открывает полную форму с применением и сбросом параметров."
        panels={[
          <div className="min-h-[136px] overflow-visible rounded-xl bg-white px-6 py-4">
            <ObjectFilter
              filters={["propertyType", "roominess", "area", "price"]}
              modalDisplay="embedded"
            />
          </div>,
        ]}
        settings={["filters: propertyType · roominess · area · price", "modalDisplay: embedded"]}
        title="Состав"
        usedComponents={usedComponents}
      />
    </div>
  )
}

export { ObjectFilterExamples }
