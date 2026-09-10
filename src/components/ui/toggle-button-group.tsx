import * as React from "react"

import { cn } from "@/lib/utils"

type ToggleButtonGroupSize = "lg" | "md" | "sm"
type ToggleButtonGroupColor = "contrast" | "neutral"

type ToggleButtonGroupProps = {
  children?: React.ReactNode
  className?: string
  color?: ToggleButtonGroupColor
  size?: ToggleButtonGroupSize
}

function ToggleButtonGroup({ className, children, color = "neutral", size = "lg" }: ToggleButtonGroupProps) {
  const height = size === "lg" ? "h-12" : size === "md" ? "h-8" : "h-7"
  const surface = color === "contrast"
    ? "border border-[var(--parser-border-light)] bg-[var(--parser-fill-contrast-static)]"
    : "bg-[var(--parser-fill-neutral)]"

  return <div className={cn("inline-flex w-fit items-center overflow-clip rounded-lg p-1", height, surface, className)}>{children}</div>
}

export { ToggleButtonGroup }
export type { ToggleButtonGroupColor, ToggleButtonGroupProps, ToggleButtonGroupSize }
