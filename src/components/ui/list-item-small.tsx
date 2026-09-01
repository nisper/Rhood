import * as React from "react"
import { ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ListItemSmallFontWeight = "medium" | "regular"
type ListItemSmallState = "default" | "hovered"

type ListItemSmallProps = React.ComponentProps<"div"> & {
  button?: boolean
  dense?: boolean
  disabled?: boolean
  disGutters?: boolean
  endIcon?: boolean
  fontWeight?: ListItemSmallFontWeight
  iconButton?: boolean
  secondaryText?: boolean
  selected?: boolean
  startIcon?: boolean
  state?: ListItemSmallState
}

function getRowBackground({
  disabled,
  selected,
  state,
}: Pick<ListItemSmallProps, "disabled" | "selected" | "state">) {
  if (disabled) {
    return "bg-transparent"
  }

  if (selected) {
    return "bg-[var(--parser-fill-neutral-selected)]"
  }

  if (state === "hovered") {
    return "bg-[var(--parser-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

function getRowPadding({
  dense,
  disGutters,
}: Pick<ListItemSmallProps, "dense" | "disGutters">) {
  const py = dense ? "py-[4px]" : "py-2"

  if (disGutters) {
    return py
  }

  return cn("px-4", py)
}

function getLabelClasses({
  disabled,
  fontWeight,
}: Pick<ListItemSmallProps, "disabled" | "fontWeight">) {
  if (disabled) {
    return "text-[color:var(--parser-text-disabled)] font-normal"
  }

  return fontWeight === "medium"
    ? "text-[color:var(--parser-text-neutral-primary)] font-medium tracking-[0.024px]"
    : "text-[color:var(--parser-text-neutral-primary)] font-normal tracking-[0.15px]"
}

/**
 * Parser small list item matching the Figma `list-item small` component set.
 */
function ListItemSmall({
  button = true,
  className,
  dense = false,
  disabled = false,
  disGutters = false,
  endIcon = true,
  fontWeight = "regular",
  iconButton = true,
  secondaryText = false,
  selected = false,
  startIcon = true,
  state = "default",
  ...props
}: ListItemSmallProps) {
  const rowBackground = getRowBackground({ disabled, selected, state })
  const rowPadding = getRowPadding({ dense, disGutters })
  const labelClasses = getLabelClasses({ disabled, fontWeight })
  const showSecondary =
    secondaryText && !disabled && (state === "default" || (!selected && state === "hovered"))

  return (
    <div
      className={cn(
        "flex w-[290px] items-center rounded-lg",
        rowBackground,
        rowPadding,
        className,
      )}
      {...props}
    >
      {startIcon && (
        <span className="mr-3 flex shrink-0 items-center justify-start">
          <span className="flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
            <Star aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </span>
      )}

      <span className="flex min-w-px flex-1 flex-col py-1">
        <span
          className={cn("whitespace-nowrap text-sm leading-5", labelClasses)}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          List item
        </span>

        {showSecondary && (
          <span
            className={cn(
              "whitespace-nowrap text-sm leading-[1.43] tracking-[0.0238px]",
              disabled
                ? "text-[color:var(--parser-text-disabled)]"
                : "text-[color:var(--parser-text-neutral-secondary)]",
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary
          </span>
        )}
      </span>

      {iconButton && (
        <span className="shrink-0 pl-2">
          <Button appearance="ghost" disabled={disabled} iconOnly size="sm" />
        </span>
      )}

      {endIcon && (
        <span className="ml-2 flex shrink-0 items-center">
          <span className="flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
            <ChevronRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </span>
      )}

      {button && (
        <span className="ml-2 shrink-0">
          <Button appearance="ghost" disabled={disabled} endIcon={false} startIcon={false}>
            Label
          </Button>
        </span>
      )}
    </div>
  )
}

export { ListItemSmall }
export type { ListItemSmallFontWeight, ListItemSmallProps, ListItemSmallState }
