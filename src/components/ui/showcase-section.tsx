import * as React from "react"

import { Segment } from "@/components/ui/segment"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { cn } from "@/lib/utils"

type ShowcaseSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  compositionExample?: React.ReactNode
  direction?: ShowcaseDirection
  description: React.ReactNode
  exampleVariants?: ShowcaseExampleVariant[]
  defaultExampleVariant?: string
  exampleVariant?: string
  onExampleVariantChange?: (value: string) => void
  panelFrame?: boolean
  panelCount?: number
  panels?: React.ReactNode[]
  props?: string[]
  settings?: React.ReactNode
  usedComponents?: { href: string; title: React.ReactNode }[]
  title: React.ReactNode
}

type ShowcaseDirection = "horizontal" | "vertical"
type ShowcaseExampleVariant = { label: React.ReactNode; value: string; content: React.ReactNode }

function ShowcaseSection({
  children,
  className,
  compositionExample,
  direction,
  description,
  exampleVariants,
  defaultExampleVariant,
  exampleVariant,
  onExampleVariantChange,
  panelFrame = true,
  panelCount,
  panels,
  props,
  settings,
  usedComponents,
  title,
  ...sectionProps
}: ShowcaseSectionProps) {
  const [uncontrolledExampleVariant, setUncontrolledExampleVariant] = React.useState(
    () => defaultExampleVariant ?? exampleVariants?.[0]?.value ?? "",
  )
  const selectedExampleVariant = exampleVariant ?? uncontrolledExampleVariant
  const activeExample = exampleVariants?.find(({ value }) => value === selectedExampleVariant) ?? exampleVariants?.[0]

  function handleExampleVariantChange(value: string) {
    if (exampleVariant === undefined) setUncontrolledExampleVariant(value)
    onExampleVariantChange?.(value)
  }

  return (
    <section className={cn("mb-10 grid gap-3", className)} {...sectionProps}>
      <div className="grid gap-1">
        <h2 className="rh-typography-h4">{title}</h2>
        <p className="rh-typography-b1">{description}</p>
      </div>
      {exampleVariants?.length ? (
        <>
          <SegmentedControl
            aria-label="Вариант примера"
            className="mt-3"
            onValueChange={(value) => typeof value === "string" && handleExampleVariantChange(value)}
            value={activeExample?.value}
          >
            {exampleVariants.map(({ label, value }) => <Segment key={value} value={value}>{label}</Segment>)}
          </SegmentedControl>
          {activeExample ? <div className={cn("grid gap-1", panelFrame && "rounded-2xl bg-[var(--parser-surface-under-islands)] p-1")}>{activeExample.content}</div> : null}
        </>
      ) : panels ? (
        <div
          className={cn(
            "grid gap-1",
            panelFrame && "rounded-2xl bg-[var(--parser-surface-under-islands)] p-1",
            direction === "vertical" ? "grid-flow-row auto-rows-fr" : "grid-flow-col auto-cols-fr",
          )}
          style={panelCount ? {
            gridTemplateColumns: direction === "vertical" ? undefined : `repeat(${panelCount}, minmax(0, 1fr))`,
            gridTemplateRows: direction === "vertical" ? `repeat(${panelCount}, minmax(0, 1fr))` : undefined,
          } : undefined}
        >
          {panels.map((panel, index) => <React.Fragment key={index}>{panel}</React.Fragment>)}
        </div>
      ) : null}
      {children}
      {props?.length ? (
        <div className="grid gap-0.5 bg-white px-4 py-2">
          {props.map((setting) => (
            <p className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-secondary)]" key={setting}>
              {setting}
            </p>
          ))}
        </div>
      ) : null}
      {settings ? <div className="bg-white">{settings}</div> : null}
      {usedComponents?.length ? (
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pb-4" aria-label="Использованные компоненты">
          <h3 className="rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)]">Компоненты:</h3>
          <ul className="flex flex-wrap gap-2">
            {usedComponents.map(({ href, title: componentTitle }, index) => (
              <li className="flex" key={href}>
                <a className="cursor-pointer rh-typography-b1 text-[var(--rh-theme-text-neutral-secondary)] hover:underline" href={href}>{componentTitle}</a>
                {index < usedComponents.length - 1 ? "," : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {compositionExample && (
        <pre className="overflow-x-auto rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-surface-bg)] p-4 font-mono text-sm leading-5 text-[var(--parser-text-neutral-secondary)]">
          {compositionExample}
        </pre>
      )}
    </section>
  )
}

export { ShowcaseSection }
export type { ShowcaseSectionProps }
