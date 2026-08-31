import * as React from "react"

import { cn } from "@/lib/utils"

type ProgressLinearPosition = "start" | "full" | "medium" | "end"

type ProgressLinearProps = React.ComponentProps<"div"> & {
  position?: ProgressLinearPosition
}

/**
 * Parser linear progress matching the Figma `ProgressLinear` component.
 */
function ProgressLinear({
  className,
  position = "start",
  ...props
}: ProgressLinearProps) {
  const isFull = position === "full"
  const isMedium = position === "medium"
  const isStart = position === "start"

  return (
    <div
      className={cn(
        "relative h-[2px] w-[91px] overflow-clip",
        isMedium && "grid grid-cols-[repeat(2,minmax(0,1fr))]",
        className,
      )}
      {...props}
    >
      {["start", "medium", "full"].includes(position) && (
        <div
          className={cn(
            "bg-[var(--parser-fill-brand)]",
            isFull && "absolute inset-0",
            isMedium &&
              "col-start-1 row-start-1 self-stretch justify-self-stretch shrink-0",
            isStart && "absolute bottom-0 left-[-1px] top-0 w-px",
          )}
        />
      )}
    </div>
  )
}

export { ProgressLinear }
export type { ProgressLinearPosition, ProgressLinearProps }
