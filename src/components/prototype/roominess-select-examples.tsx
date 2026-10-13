import { RoominessSelect } from "@/components/ui/roominess-select"
import { ShowcaseSection } from "@/components/ui/showcase-section"

function RoominessPanel({
  expanded = false,
  selectedValues = [],
}: {
  expanded?: boolean
  selectedValues?: string[]
}) {
  return (
    <div className="flex min-h-[320px] items-start justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
      <RoominessSelect
        aria-label="Количество комнат"
        defaultExpanded={expanded}
        defaultSelectedValues={selectedValues}
        label={false}
      />
    </div>
  )
}

export function RoominessSelectExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Мультиселект комнатности с вариантами из фильтра на странице «Архив»."
        panelCount={2}
        panels={[
          <RoominessPanel key="closed" />,
          <RoominessPanel expanded key="open" selectedValues={["Студия", "1", "2"]} />,
        ]}
        title="Состав"
      />
    </div>
  )
}
