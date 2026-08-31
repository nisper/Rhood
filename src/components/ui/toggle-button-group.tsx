import * as React from "react"

import { ToggleButton } from "@/components/ui/toggle-button"
import { cn } from "@/lib/utils"

type ToggleButtonGroupSize = "lg" | "md" | "sm"
type ToggleButtonGroupColor = "contrast" | "neutral"

type ToggleButtonGroupProps = {
  children?: React.ReactNode
  className?: string
  color?: ToggleButtonGroupColor
  size?: ToggleButtonGroupSize
}

function getContainerClasses({
  color,
  size,
}: {
  color: ToggleButtonGroupColor
  size: ToggleButtonGroupSize
}) {
  const base = "flex items-center justify-center overflow-clip p-1 relative"
  const contrastClasses =
    "border border-[var(--parser-border-light)] bg-[var(--parser-fill-contrast-static)]"
  const neutralClasses = "bg-[var(--parser-fill-neutral)]"

  if (size === "lg") {
    return cn(
      base,
      "h-14 rounded-xl",
      color === "contrast" ? contrastClasses : neutralClasses,
    )
  }

  return cn(
    base,
    "rounded-lg",
    color === "contrast" ? contrastClasses : neutralClasses,
  )
}

function ToggleButtonGroup({
  className,
  children,
  color = "neutral",
  size = "lg",
}: ToggleButtonGroupProps) {
  const buttonColor = color === "contrast" ? "neutral-dark" : "contrast"

  const resolvedChildren =
    children ?? (
      <>
        <ToggleButton
          color={buttonColor}
          defaultSelected
          size={size}
        />
        <ToggleButton
          color={buttonColor}
          selected={false}
          size={size}
        />
      </>
    )

  return (
    <div className={cn(getContainerClasses({ color, size }), className)}>
      <div className="flex items-center gap-0.5">{resolvedChildren}</div>
    </div>
  )
}

export { ToggleButtonGroup }
export type { ToggleButtonGroupColor, ToggleButtonGroupProps, ToggleButtonGroupSize }
