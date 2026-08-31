import * as React from "react"
import { Square, SquareCheckBig, SquareMinus, Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type MenuItemMultiselectState = "default" | "hovered"
type MenuItemMultiselectChecked = "none" | "true" | "indeterminate"

type MenuItemMultiselectProps = React.ComponentProps<"div"> & {
  caption?: boolean
  checked?: MenuItemMultiselectChecked
  disabled?: boolean
  rightSlot?: boolean
  rightSlotChip?: boolean
  rightSlotText?: boolean
  secondaryText?: boolean
  selected?: boolean
  startIcon?: boolean
  state?: MenuItemMultiselectState
}

function getBackground({
  disabled,
  state,
}: Pick<MenuItemMultiselectProps, "disabled" | "state">) {
  if (disabled) {
    return "bg-transparent"
  }

  if (state === "hovered") {
    return "bg-[var(--parser-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

function getTitleTone({
  disabled,
}: Pick<MenuItemMultiselectProps, "disabled">) {
  return disabled
    ? "text-[color:var(--parser-text-disabled)]"
    : "text-[color:var(--parser-text-neutral-primary)]"
}

function getCaptionTone({
  disabled,
}: Pick<MenuItemMultiselectProps, "disabled">) {
  return disabled
    ? "text-[color:var(--parser-text-disabled)]"
    : "text-[color:var(--parser-text-neutral-secondary)]"
}

function MenuCheckbox({
  checked = "none",
  disabled = false,
}: {
  checked?: MenuItemMultiselectChecked
  disabled?: boolean
}) {
  const iconClassName = cn(
    "size-4",
    checked === "true" || checked === "indeterminate"
      ? "text-[var(--parser-fill-brand)]"
      : "text-[var(--parser-text-neutral-secondary)]",
  )

  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center",
        disabled && "opacity-[var(--opacity-disabled,0.5)]",
      )}
    >
      {checked === "true" ? (
        <SquareCheckBig aria-hidden="true" className={iconClassName} strokeWidth={2} />
      ) : checked === "indeterminate" ? (
        <SquareMinus aria-hidden="true" className={iconClassName} strokeWidth={2} />
      ) : (
        <Square aria-hidden="true" className={iconClassName} strokeWidth={2} />
      )}
    </span>
  )
}

function MenuItemMultiselect({
  caption = false,
  checked,
  className,
  disabled = false,
  rightSlot = false,
  rightSlotChip = false,
  rightSlotText = false,
  secondaryText = false,
  selected = false,
  startIcon = false,
  state = "default",
  ...props
}: MenuItemMultiselectProps) {
  const resolvedChecked: MenuItemMultiselectChecked = checked ?? (selected ? "true" : "none")
  const resolvedRightSlotText = rightSlotText || caption
  const rightSlotVisible = rightSlot || resolvedRightSlotText || rightSlotChip
  const disabledOpacityClass = "opacity-[var(--opacity-disabled,0.5)]"

  return (
    <div
      className={cn(
        "flex w-[360px] items-start gap-2 rounded-lg px-3 py-2",
        getBackground({ disabled, state }),
        className,
      )}
      {...props}
    >
      <div className="flex h-5 shrink-0 items-center justify-center pt-0.5">
        <MenuCheckbox checked={resolvedChecked} disabled={disabled} />
      </div>

      {startIcon && (
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]",
            disabled && disabledOpacityClass,
          )}
        >
          <Star aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
      )}

      <div
        className={cn(
          "flex min-w-px flex-1 flex-col items-start",
          secondaryText && "gap-0.5 justify-center",
          disabled && disabledOpacityClass,
        )}
      >
        <span
          className={cn(
            "w-full text-sm leading-5 tracking-[0.15px]",
            getTitleTone({ disabled }),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Menu Item
        </span>

        {secondaryText && (
          <span
            className={cn(
              "w-full text-sm leading-[1.43] tracking-[0.0238px]",
              getCaptionTone({ disabled }),
            )}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary text
          </span>
        )}
      </div>

      {rightSlotVisible && (
        <div
          className={cn(
            "flex shrink-0 items-center gap-2",
            disabled && disabledOpacityClass,
          )}
        >
          {resolvedRightSlotText && (
            <span
              className={cn(
                "whitespace-nowrap text-xs leading-[1.32] tracking-[0.3px]",
                getCaptionTone({ disabled }),
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {caption ? "Typography" : "rightSlot text"}
            </span>
          )}

          {rightSlotChip && (
            <Chip
              appearance="outlined"
              color="brand"
              icon={false}
              propDelete
              size="sm"
              thumbnail={false}
            >
              Chip
            </Chip>
          )}
        </div>
      )}
    </div>
  )
}

export { MenuItemMultiselect }
export type {
  MenuItemMultiselectChecked,
  MenuItemMultiselectProps,
  MenuItemMultiselectState,
}
