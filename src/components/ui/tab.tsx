import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type TabState = "default" | "hovered"
type TabDirection = "horizontal" | "vertical"

type TabProps = React.ComponentProps<"div"> & {
  direction?: TabDirection
  disGutters?: boolean
  label?: React.ReactNode
  secondaryLabel?: React.ReactNode
  secondaryText?: boolean
  selected?: boolean
  startIcon?: boolean
  state?: TabState
}

function getRootClasses({
  direction,
  disGutters,
  selected,
}: Pick<TabProps, "direction" | "disGutters" | "selected">) {
  const isHorizontal = direction === "horizontal"

  if (isHorizontal) {
    return cn(
      "relative flex items-start gap-2 justify-center",
      selected && "border-b-2 border-[color:var(--parser-text-neutral-primary)]",
      disGutters ? "min-w-[38px] py-2" : "px-4 py-2",
    )
  }

  return cn(
    "relative flex items-start gap-2",
    selected && "border-l-2 border-[color:var(--parser-text-neutral-primary)]",
    disGutters ? "px-3" : "px-3 py-2",
  )
}

function getToneClass(selected: boolean) {
  return selected
    ? "text-[color:var(--parser-text-neutral-primary)]"
    : "text-[color:var(--parser-text-neutral-secondary)]"
}

/**
 * Parser tab matching the Figma `Tab` component.
 */
function Tab({
  className,
  direction = "horizontal",
  disGutters = false,
  label = "Tab",
  secondaryLabel = "Tab",
  secondaryText = false,
  selected = false,
  startIcon = false,
  state = "default",
  ...props
}: TabProps) {
  const isHorizontal = direction === "horizontal"
  const isActive = selected || state === "hovered"

  return (
    <div
      className={cn(getRootClasses({ direction, disGutters, selected }), className)}
      {...props}
    >
      {startIcon && (
        <Star
          className={cn(
            "size-4 shrink-0",
            isActive
              ? "text-[color:var(--parser-text-neutral-primary)]"
              : "text-[color:var(--parser-text-neutral-secondary)]",
          )}
          strokeWidth={2}
        />
      )}

      <div
        className={cn(
          "flex min-w-px shrink-0 flex-col items-start justify-center gap-1 whitespace-nowrap",
          getToneClass(isActive),
        )}
      >
        <p
          className={cn(
            "relative shrink-0 text-[14px] leading-5 tracking-[0.15px] font-medium",
            isHorizontal && "whitespace-nowrap",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </p>

        {secondaryText && (
          <p
            className="relative shrink-0 text-[14px] leading-[1.43] tracking-[0.0238px] font-normal"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {secondaryLabel}
          </p>
        )}
      </div>
    </div>
  )
}

export { Tab }
export type { TabDirection, TabProps, TabState }
