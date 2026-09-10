import * as React from "react"

import { cn } from "@/lib/utils"

type ShowcaseSurfaceBackground = "muted" | "white"
type ShowcaseSurfaceDirection = "horizontal" | "vertical"

type ShowcaseSurfaceProps = React.ComponentProps<"div"> & {
  /** Background shared by transparent ShowcasePanel instances. */
  background?: ShowcaseSurfaceBackground
  direction?: ShowcaseSurfaceDirection
}

/** Layout surface for presenting one or more component examples in the showcase. */
function ShowcaseSurface({
  background = "muted",
  children,
  className,
  direction = "horizontal",
  ...props
}: ShowcaseSurfaceProps) {
  return <div
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
}

export { ShowcaseSurface }
export type { ShowcaseSurfaceBackground, ShowcaseSurfaceDirection, ShowcaseSurfaceProps }
