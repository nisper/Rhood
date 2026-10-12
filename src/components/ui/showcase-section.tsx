import * as React from "react"

import { cn } from "@/lib/utils"

type ShowcaseSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  codeSnippet?: React.ReactNode
  direction?: ShowcaseSurfaceDirection
  description: React.ReactNode
  panelCount?: number
  showcase: React.ReactNode
  title: React.ReactNode
}

type ShowcaseSurfaceBackground = "muted" | "white"
type ShowcaseSurfaceDirection = "horizontal" | "vertical"
type ShowcaseSurfaceUsedComponent = { href: string; title: React.ReactNode }
type ShowcaseSurfaceProps = React.ComponentProps<"div"> & {
  background?: ShowcaseSurfaceBackground
  direction?: ShowcaseSurfaceDirection
  panelCount?: number
  usedComponents?: ShowcaseSurfaceUsedComponent[]
}
type ShowcasePanelTone = "white" | "transparent"
type ShowcasePanelProps = React.ComponentProps<"div"> & { tone?: ShowcasePanelTone }

function ShowcaseSection({
  className,
  codeSnippet,
  direction,
  description,
  panelCount,
  showcase,
  title,
  ...props
}: ShowcaseSectionProps) {
  return (
    <section className={cn("mb-10 grid gap-3", className)} {...props}>
      <div className="grid gap-1">
        <h2 className="rh-typography-h4">{title}</h2>
        <p className="rh-typography-b1">{description}</p>
      </div>
      {React.isValidElement(showcase) && (direction || panelCount)
        ? React.cloneElement(showcase as React.ReactElement<ShowcaseSurfaceProps>, {
            ...(direction ? { direction } : {}),
            ...(panelCount ? { panelCount } : {}),
          })
        : showcase}
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

function ShowcaseSurface({ background = "muted", children, className, direction = "horizontal", panelCount, usedComponents, ...props }: ShowcaseSurfaceProps) {
  const surface = (
    <div {...props} className={cn(
      "grid gap-1 rounded-2xl p-1",
      background === "muted" ? "bg-[var(--parser-surface-under-islands)]" : "bg-white",
      direction === "horizontal" ? "grid-flow-col auto-cols-fr" : "grid-flow-row auto-rows-fr",
      className,
    )} style={{ ...props.style, ...(panelCount ? { gridTemplateColumns: direction === "horizontal" ? `repeat(${panelCount}, minmax(0, 1fr))` : undefined, gridTemplateRows: direction === "vertical" ? `repeat(${panelCount}, minmax(0, 1fr))` : undefined } : {}) }}>
      {children}
    </div>
  )
  if (!usedComponents?.length) return surface
  return <div className="grid gap-3">{surface}<section className="grid gap-2 pb-4" aria-label="Использованные компоненты"><h3 className="rh-typography-b1-med">Использованные компоненты</h3><ul className="flex flex-wrap gap-2">{usedComponents.map(({ href, title }) => <li key={href}><a className="cursor-pointer rh-typography-b1 text-[var(--rh-theme-text-brand)] underline" href={href}>{title}</a></li>)}</ul></section></div>
}

function ShowcasePanel({ children, className, tone = "white", ...props }: ShowcasePanelProps) {
  return <div {...props} className={cn("flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4", tone === "white" && "bg-white", className)}>{children}</div>
}

export { ShowcasePanel, ShowcaseSurface }
export type { ShowcasePanelProps, ShowcasePanelTone, ShowcaseSurfaceBackground, ShowcaseSurfaceDirection, ShowcaseSurfaceProps, ShowcaseSurfaceUsedComponent }
