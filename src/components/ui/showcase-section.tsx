import * as React from "react"

import { cn } from "@/lib/utils"

type ShowcaseSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  codeSnippet?: React.ReactNode
  direction?: ShowcaseDirection
  description: React.ReactNode
  panelCount?: number
  panels?: React.ReactNode[]
  usedComponents?: { href: string; title: React.ReactNode }[]
  title: React.ReactNode
}

type ShowcaseDirection = "horizontal" | "vertical"

function ShowcaseSection({
  className,
  codeSnippet,
  direction,
  description,
  panelCount,
  panels,
  usedComponents,
  title,
  ...props
}: ShowcaseSectionProps) {
  return (
    <section className={cn("mb-10 grid gap-3", className)} {...props}>
      <div className="grid gap-1">
        <h2 className="rh-typography-h4">{title}</h2>
        <p className="rh-typography-b1">{description}</p>
      </div>
      {panels ? (
        <div
          className={cn(
            "grid gap-1 rounded-2xl p-1 bg-[var(--parser-surface-under-islands)]",
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
      {usedComponents?.length ? (
        <div className="grid gap-2 pb-4" aria-label="Использованные компоненты">
          <h3 className="rh-typography-b1-med">Использованные компоненты</h3>
          <ul className="flex flex-wrap gap-2">
            {usedComponents.map(({ href, title: componentTitle }) => <li key={href}><a className="cursor-pointer rh-typography-b1 text-[var(--rh-theme-text-brand)] underline" href={href}>{componentTitle}</a></li>)}
          </ul>
        </div>
      ) : null}
      {codeSnippet && (
        <pre className="overflow-x-auto rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-neutral)] p-4">
          {codeSnippet}
        </pre>
      )}
    </section>
  )
}

export { ShowcaseSection }
export type { ShowcaseSectionProps }
