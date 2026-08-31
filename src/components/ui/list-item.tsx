import * as React from "react"
import { ChevronRight, Star } from "lucide-react"

import { BrandButton } from "@/components/ui/brand-button"
import { NeutralButton } from "@/components/ui/neutral-button"
import { cn } from "@/lib/utils"

type ListItemFontWeight = "medium" | "regular"
type ListItemState = "default" | "hovered"

type ListItemProps = React.ComponentProps<"div"> & {
  button?: boolean
  dense?: boolean
  disabled?: boolean
  disGutters?: boolean
  endIcon?: boolean
  fontWeight?: ListItemFontWeight
  iconButton?: boolean
  secondaryText?: boolean
  selected?: boolean
  startIcon?: boolean
  state?: ListItemState
}

function getRowBackground({
  disabled,
  selected,
  state,
}: Pick<ListItemProps, "disabled" | "selected" | "state">) {
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
}: Pick<ListItemProps, "dense" | "disGutters">) {
  const py = dense ? "py-1" : "py-2"

  if (disGutters) {
    return py
  }

  return cn("px-4", py)
}

function getLabelClasses({
  disabled,
  fontWeight,
  selected,
  state,
}: Pick<ListItemProps, "disabled" | "fontWeight" | "selected" | "state">) {
  if (disabled) {
    return "text-[color:var(--parser-text-disabled)] font-normal"
  }

  const isMedium = fontWeight === "medium"
  const isHoverable = state === "hovered" && !selected

  return cn(
    "text-[color:var(--parser-text-neutral-primary)]",
    isMedium ? "font-medium tracking-[0.024px]" : "font-normal tracking-[0.15px]",
    isHoverable && "text-[color:var(--parser-text-neutral-primary)]",
  )
}

/**
 * Parser list item matching the Figma `list-item` component set.
 */
function ListItem({
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
}: ListItemProps) {
  const rowBackground = getRowBackground({
    disabled,
    selected,
    state,
  })
  const rowPadding = getRowPadding({ dense, disGutters })
  const labelClasses = getLabelClasses({ disabled, fontWeight, selected, state })
  const showSecondary =
    secondaryText &&
    !disabled &&
    (fontWeight === "medium" || state === "hovered" || selected)

  return (
    <div
      className={cn(
        "flex w-full items-center rounded-lg",
        rowBackground,
        rowPadding,
        className,
      )}
      {...props}
    >
      {startIcon && (
        <span className="mr-4 flex shrink-0 items-center justify-start">
          <span className="flex size-6 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
            <Star aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </span>
      )}

      <span className="flex min-w-px flex-1 flex-col py-1">
        <span
          className={cn(
            "whitespace-nowrap text-base leading-6",
            labelClasses,
          )}
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
          <NeutralButton iconOnly size="sm" variant="text" />
        </span>
      )}

      {endIcon && (
        <span className="ml-2 flex shrink-0 items-center">
          <span className="flex size-6 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
            <ChevronRight aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
        </span>
      )}

      {button && (
        <span className="ml-2 shrink-0">
          <BrandButton endIcon={false} startIcon={false} variant="text">
            Label
          </BrandButton>
        </span>
      )}
    </div>
  )
}

export { ListItem }
export type { ListItemFontWeight, ListItemProps, ListItemState }
