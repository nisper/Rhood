import * as React from "react"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

type PaginationButtonState = "default" | "hover" | "checked"
type PaginationButtonType = "number" | "icon"

type PaginationButtonProps = React.ComponentProps<"div"> & {
  direction?: "left" | "right"
  state?: PaginationButtonState
  type?: PaginationButtonType
}

function getClasses({
  state,
  type,
}: Pick<PaginationButtonProps, "state" | "type">) {
  const isIcon = type === "icon"
  const isHover = state === "hover"
  const isChecked = state === "checked"

  return cn(
    "flex size-8 shrink-0 items-center justify-center rounded-full",
    isChecked && "bg-[var(--parser-fill-neutral-selected)]",
    isIcon && !isHover && "px-[10px]",
    isIcon && isHover && "bg-[var(--parser-fill-neutral-hover)] px-[10px]",
    !isIcon && isHover && "bg-[var(--parser-fill-neutral-hover)]",
  )
}

/**
 * Parser pagination button matching the Figma `PaginationButton` component.
 */
function PaginationButton({
  className,
  direction = "left",
  state = "default",
  type = "number",
  ...props
}: PaginationButtonProps) {
  const isHover = state === "hover"
  const isChecked = state === "checked"
  const isIcon = type === "icon"

  return (
    <div className={cn(getClasses({ state, type }), className)} {...props}>
      {type === "number" && (
        <span
          className={cn(
            "w-full text-center text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-primary)]",
            isHover && "text-[color:var(--parser-text-neutral-primary)]",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          1
        </span>
      )}

      {isIcon && (state === "default" || state === "hover") && (
        <span className={cn("flex size-5 shrink-0 items-center justify-center", direction === "right" && "rotate-180")}>
          <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
      )}
    </div>
  )
}

export { PaginationButton }
export type { PaginationButtonProps, PaginationButtonState, PaginationButtonType }
