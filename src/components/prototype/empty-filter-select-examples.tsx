import * as React from "react"

import { AreaSelect, type AreaSelectProps } from "@/components/ui/area-select"
import { FloorSelect } from "@/components/ui/floor-select"
import { PriceSelect } from "@/components/ui/price-select"
import { ShowcaseSection } from "@/components/ui/showcase-section"

type EmptyFilterSelectComponent = React.ComponentType<AreaSelectProps>

function EmptyFilterSelectExamples({
  component: Component,
  componentName,
  fieldName,
}: {
  component: EmptyFilterSelectComponent
  componentName: string
  fieldName: string
}) {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={
          <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
            <span className="text-[var(--rh-palette-purple-700)]">{componentName}</span>
            {" "}
            <span className="text-[var(--rh-theme-text-info)]">defaultExpanded</span>
            <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
          </code>
        }
        description={`${fieldName}: поле открывает пустое меню. Нажми на селект, чтобы открыть или закрыть его.`}
        panelCount={2}
        panels={[
          <div className="flex min-h-[180px] items-start justify-center overflow-visible rounded-xl bg-white px-6 py-4">
            <Component />
          </div>,
          <div className="flex min-h-[180px] items-start justify-center overflow-visible rounded-xl bg-white px-6 py-4">
            <Component defaultExpanded />
          </div>,
        ]}
        title="Состав"
      />
    </div>
  )
}

function AreaSelectExamples() {
  return (
    <EmptyFilterSelectExamples
      component={AreaSelect}
      componentName="AreaSelect"
      fieldName="Площадь"
    />
  )
}

function PriceSelectExamples() {
  return (
    <EmptyFilterSelectExamples
      component={PriceSelect}
      componentName="PriceSelect"
      fieldName="Цена"
    />
  )
}

function FloorSelectExamples() {
  return (
    <EmptyFilterSelectExamples
      component={FloorSelect}
      componentName="FloorSelect"
      fieldName="Этаж"
    />
  )
}

export { AreaSelectExamples, FloorSelectExamples, PriceSelectExamples }
