import * as React from "react"

import { ExpandableContentTrigger } from "@/components/ui/expandable-content-trigger"
import { ShowcaseSection } from "@/components/ui/showcase-section"

function TriggerExample() {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <ExpandableContentTrigger
      controls="additional-filters-example"
      expanded={expanded}
      onClick={() => setExpanded((current) => !current)}
    >
      Дополнительные параметры
    </ExpandableContentTrigger>
  )
}

export function ExpandableContentTriggerExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="Нажми на кнопку, чтобы переключить состояние и направление шеврона. У компонента один стиль и размер."
        panels={[<div className="flex min-h-[136px] items-center justify-center rounded-xl bg-white px-6 py-4"><TriggerExample /></div>]}
        settings={["expanded: false · true"]}
        title="Состояния"
      />
    </div>
  )
}
