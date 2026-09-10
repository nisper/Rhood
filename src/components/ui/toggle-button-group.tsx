import * as React from "react"
import { SegmentedControl } from "@/components/ui/segmented-control"

type ToggleButtonGroupSize = "lg" | "md" | "sm"
type ToggleButtonGroupColor = "contrast" | "neutral"

type ToggleButtonGroupProps = {
  children?: React.ReactNode
  className?: string
  color?: ToggleButtonGroupColor
  size?: ToggleButtonGroupSize
}

function ToggleButtonGroup({ className, children, color = "neutral", size = "lg" }: ToggleButtonGroupProps) {
  return <SegmentedControl className={className} color={color} size={size}>{children}</SegmentedControl>
}

export { ToggleButtonGroup }
export type { ToggleButtonGroupColor, ToggleButtonGroupProps, ToggleButtonGroupSize }
