import * as React from "react"

import { ObjectFilter } from "@/components/ui/object-filter"
import { myObjectStatuses } from "@/data/my-object-statuses"
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

  return (
    <ObjectFilter
      crmStatus={status}
      crmStatusOptions={myObjectStatusOptions}
      filters={["propertyType", "crmStatus"]}
      onCrmStatusChange={setStatus}
      onPropertyTypeChange={setPropertyType}
      propertyType={propertyType}
      propertyTypeControl="segmented"
      showFiltersButton={false}
    />
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
