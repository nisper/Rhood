import * as React from "react"

import { ExpandableContent } from "@/components/ui/expandable-content"
import { ShowcaseSection } from "@/components/ui/showcase-section"

const description =
  "Квартира в тихом районе с готовым ремонтом, просторной кухней-гостиной и видом на парк. В пешей доступности школа, детский сад, магазины и остановка общественного транспорта. Во дворе — закрытая территория, детская площадка и гостевая парковка."

function Example({
  defaultExpanded = false,
  collapsedHeight = 72,
}: {
  defaultExpanded?: boolean
  collapsedHeight?: number
}) {
  return (
    <ExpandableContent collapsedHeight={collapsedHeight} defaultExpanded={defaultExpanded}>
      <p className="rh-typography-b1">{description}</p>
    </ExpandableContent>
  )
}

export function ExpandableContentExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        settings={["collapsedHeight: 48 · 96"]}
        description="У компонента нет визуальных вариантов: высота видимой части контента задаётся collapsedHeight. Значение выбирай по содержанию и контексту экрана."
        panels={[
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4" key="48">
            <div className="grid w-full max-w-[480px] gap-2">
              <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">collapsedHeight = 48</p>
              <Example collapsedHeight={48} />
            </div>
          </div>,
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4" key="96">
            <div className="grid w-full max-w-[480px] gap-2">
              <p className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">collapsedHeight = 96</p>
              <Example collapsedHeight={96} />
            </div>
          </div>,
        ]}
        title="Размер"
      />

      <ShowcaseSection
        settings={["defaultExpanded: true"]}
        description="По умолчанию контент свёрнут. Нажми на кнопку, чтобы переключить состояние; defaultExpanded задаёт начальное раскрытое состояние."
        panels={[
          <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-4" key="expanded">
            <div className="w-full max-w-[480px]">
              <Example defaultExpanded />
            </div>
          </div>,
        ]}
        title="Состояния"
      />
    </div>
  )
}
