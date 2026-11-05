import * as React from "react"

import { ObjectFilter } from "@/components/ui/object-filter"
import { Menu } from "@/components/ui/menu"
import { MenuItemSingleSelect } from "@/components/ui/menu-item-single-select"
import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Select } from "@/components/ui/select"
import { myObjectStatuses } from "@/data/my-object-statuses"
import { useMenuOpen } from "@/hooks/use-menu-open"
import { ShowcaseSection } from "@/components/ui/showcase-section"

const myObjectStatusOptions = ["Все статусы", ...myObjectStatuses.map(({ label }) => label)]

const usedComponents = [
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=filter-modal", title: "FilterModal" },
  { href: "/Rhood/?view=components&component=icon-button", title: "IconButton" },
  { href: "/Rhood/?view=components&component=input-number-range", title: "InputNumberRange" },
  { href: "/Rhood/?view=components&component=menu", title: "Menu" },
  { href: "/Rhood/?view=components&component=segmented-control", title: "SegmentedControl" },
  { href: "/Rhood/?view=components&component=select", title: "Select" },
  { href: "/Rhood/?view=components&component=toggle-chip", title: "ToggleChip" },
]

function MyListingsFiltersExample() {
  const [propertyType, setPropertyType] = React.useState("Квартиры")
  const [status, setStatus] = React.useState(myObjectStatusOptions[0])
  const statusRef = React.useRef<HTMLDivElement>(null)
  const [isStatusOpen, setIsStatusOpen] = useMenuOpen(statusRef)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SegmentedControl
        aria-label="Тип недвижимости"
        onValueChange={(value) => setPropertyType(value as string)}
        size="sm"
        value={propertyType}
      >
        <Segment value="Квартиры">Квартиры</Segment>
        <Segment value="Дома">Дома</Segment>
        <Segment value="Участки">Участки</Segment>
      </SegmentedControl>
      <div className={isStatusOpen ? "relative z-40" : "relative"} ref={statusRef}>
        <Select
          aria-label="Статус в CRM"
          expanded={isStatusOpen}
          label={false}
          menu={isStatusOpen && (
            <Menu aria-label="Статус в CRM" className="absolute left-0 top-full z-50 mt-1 min-w-full" role="listbox">
              {myObjectStatusOptions.map((option) => (
                <MenuItemSingleSelect
                  aria-selected={status === option}
                  icon={false}
                  key={option}
                  onClick={(event) => {
                    event.stopPropagation()
                    setStatus(option)
                    setIsStatusOpen(false)
                  }}
                  rightSlot={false}
                  role="option"
                  secondaryText={false}
                  selected={status === option}
                  startIcon={false}
                >
                  {option}
                </MenuItemSingleSelect>
              ))}
            </Menu>
          )}
          onClick={() => setIsStatusOpen((current) => !current)}
          onExpandedChange={setIsStatusOpen}
          size="sm"
          value={status}
        />
      </div>
    </div>
  )
}

function ExamplePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[180px] overflow-y-auto rounded-xl bg-white px-6 py-4">
      {children}
    </div>
  )
}

function BaseFilterExample() {
  const [propertyType, setPropertyType] = React.useState("Квартиры")

  return (
    <ExamplePanel>
      <ObjectFilter
        filters={propertyType === "Квартиры"
          ? ["propertyType", "roominess", "area", "price"]
          : ["propertyType", "area", "price"]}
        modalDisplay="embedded"
        onPropertyTypeChange={setPropertyType}
        propertyType={propertyType}
      />
    </ExamplePanel>
  )
}

function ArchiveFilterExample() {
  const [propertyType, setPropertyType] = React.useState("Квартиры")

  return (
    <ExamplePanel>
      <ObjectFilter
        filters={["city", "propertyType", "roominess", "area", "price", "source", "author"]}
        onPropertyTypeChange={setPropertyType}
        propertyType={propertyType}
        showFiltersButton={false}
      />
    </ExamplePanel>
  )
}

function ObjectFilterExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Ниже приведены наборы фильтров для разных страниц."
        exampleVariants={[
          {
            label: "Набор базы",
            value: "base",
            content: <BaseFilterExample />,
          },
          {
            label: "Мои объекты",
            value: "my",
            content: <ExamplePanel><MyListingsFiltersExample /></ExamplePanel>,
          },
          {
            label: "Архив",
            value: "archive",
            content: <ArchiveFilterExample />,
          },
        ]}
        title="Состав"
        usedComponents={usedComponents}
      />
    </div>
  )
}

export { ObjectFilterExamples }
