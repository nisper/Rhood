import * as React from "react"

import { cn } from "@/lib/utils"

type IndicatorColor = "error" | "info" | "primary" | "success" | "warning"

type IndicatorProps = React.ComponentProps<"div"> & {
  border?: boolean
  color?: IndicatorColor
}

const colorClasses: Record<IndicatorColor, string> = {
  error: "bg-[var(--parser-fill-error)]",
  info: "bg-[var(--parser-fill-info)]",
  primary: "bg-[var(--parser-fill-brand)]",
  success: "bg-[var(--parser-fill-success)]",
  warning: "bg-[var(--parser-fill-warning)]",
}

/**
 * Parser status indicator matching the Figma `Indicator` component set.
 */
function Indicator({
  border = false,
  className,
  color = "primary",
  ...props
}: IndicatorProps) {
  return (
    <div
      className={cn(
        "size-2 shrink-0 rounded-full",
        colorClasses[color],
        border && "border-2 border-[var(--parser-border-contrast)]",
        className,
      )}
      {...props}
    />
  )
}

export { Indicator }
export type { IndicatorColor, IndicatorProps }
