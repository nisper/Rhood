import * as React from "react"

import { Segment, type SegmentColor, type SegmentSize } from "@/components/ui/segment"
import { cn } from "@/lib/utils"

type SegmentedControlProps = React.ComponentProps<"div"> & {
  color?: SegmentColor
  size?: SegmentSize
}

function SegmentedControl({ children, className, color = "neutral", size = "lg", ...props }: SegmentedControlProps) {
  const height = size === "lg" ? "h-12" : size === "md" ? "h-8" : "h-7"
  const surface = color === "contrast"
    ? "border border-[var(--parser-border-light)] bg-[var(--parser-fill-contrast-static)]"
    : "bg-[var(--parser-fill-neutral)]"

  return (
    <div
      aria-label="Segmented control"
      className={cn("inline-flex w-fit items-center overflow-clip rounded-lg p-1", height, surface, className)}
      role="group"
      {...props}
    >
      <div className="flex h-full items-center gap-0.5">
        {children ?? <><Segment color={color} defaultSelected size={size} /><Segment color={color} size={size} /></>}
      </div>
    </div>
  )
}

export { SegmentedControl }
export type { SegmentedControlProps }
