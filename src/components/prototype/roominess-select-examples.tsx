import { RoominessSelect } from "@/components/ui/roominess-select"
import { ShowcaseSection } from "@/components/ui/showcase-section"

function RoominessPanel({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className="flex min-h-[320px] items-start justify-center overflow-hidden rounded-xl bg-white px-6 py-4">
      <RoominessSelect
        aria-label="Количество комнат"
        expanded={expanded}
        label={false}
        value="Комнат"
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
          <RoominessPanel expanded key="open" />,
        ]}
        title="Состав"
      />
    </div>
  )
}
