import * as React from "react"

import { cn } from "@/lib/utils"

type ShowcaseSurfaceBackground = "muted" | "white"
type ShowcaseSurfaceDirection = "horizontal" | "vertical"
type ShowcaseSurfaceUsedComponent = {
  href: string
  title: React.ReactNode
}

type ShowcaseSurfaceProps = React.ComponentProps<"div"> & {
  /** Background shared by transparent ShowcasePanel instances. */
  background?: ShowcaseSurfaceBackground
  direction?: ShowcaseSurfaceDirection
  /** Optional links to components used in the example. */
  usedComponents?: ShowcaseSurfaceUsedComponent[]
}

/** Layout surface for presenting one or more component examples in the showcase. */
function ShowcaseSurface({
  background = "muted",
  children,
  className,
  direction = "horizontal",
  usedComponents,
  ...props
}: ShowcaseSurfaceProps) {
  const surface = (
    <div
      {...props}
      className={cn(
        "grid gap-1 rounded-2xl p-1",
        background === "muted" ? "bg-[var(--parser-surface-under-islands)]" : "bg-white",
        direction === "horizontal" ? "grid-flow-col auto-cols-fr" : "grid-flow-row auto-rows-fr",
        className,
      )}
    >
      {children}
    </div>
  )

  if (!usedComponents?.length) return surface

  return (
    <div className="grid gap-3">
      {surface}
      <section className="grid gap-2 pb-4" aria-label="Использованные компоненты">
        <h3 className="rh-typography-b1-med">Использованные компоненты</h3>
        <ul className="flex flex-wrap gap-2">
          {usedComponents.map(({ href, title }) => (
            <li key={href}>
              <a className="cursor-pointer rh-typography-b2 text-[var(--rh-theme-text-brand)] underline" href={href}>{title}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export { ShowcaseSurface }
export type { ShowcaseSurfaceBackground, ShowcaseSurfaceDirection, ShowcaseSurfaceProps, ShowcaseSurfaceUsedComponent }
