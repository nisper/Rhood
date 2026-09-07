import * as React from "react"
import { Square, SquareCheck, SquareMinus, Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type MenuItemMultiselectState = "default" | "hovered"
type MenuItemMultiselectChecked = boolean | "none" | "true" | "indeterminate"

type MenuItemMultiselectProps = React.ComponentProps<"div"> & {
  icon?: boolean
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

function getTitleTone() {
  return "text-[color:var(--parser-text-neutral-primary)]"
}

function getCaptionTone() {
  return "text-[color:var(--parser-text-neutral-secondary)]"
}

function MenuCheckbox({
  checked = "none",
  disabled = false,
}: {
  checked?: MenuItemMultiselectChecked
  disabled?: boolean
}) {
  const iconClassName = cn(
    "size-5",
    checked === "true" || checked === "indeterminate"
      ? "text-[var(--parser-fill-brand)]"
      : "text-[var(--parser-border-neutral)]",
  )

  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center",
        disabled && "opacity-[var(--opacity-disabled,0.5)]",
      )}
    >
      {checked === "true" ? (
        <SquareCheck aria-hidden="true" className={iconClassName} strokeWidth={2} />
      ) : checked === "indeterminate" ? (
        <SquareMinus aria-hidden="true" className={iconClassName} strokeWidth={2} />
      ) : (
        <Square aria-hidden="true" className={iconClassName} strokeWidth={2} />
      )}
    </span>
  )
}

function MenuItemMultiselect({
  children = "Menu Item",
  icon,
  caption = false,
  checked,
  className,
  disabled = false,
  rightSlot = true,
  rightSlotChip = true,
  rightSlotText = true,
  secondaryText = true,
  selected = false,
  startIcon = true,
  state = "default",
  ...props
}: MenuItemMultiselectProps) {
  const resolvedChecked: MenuItemMultiselectChecked = typeof checked === "boolean" ? (checked ? "true" : "none") : checked ?? (selected ? "true" : "none")
  const resolvedRightSlotText = rightSlotText || caption
  const rightSlotVisible = rightSlot && (resolvedRightSlotText || rightSlotChip)
  const disabledOpacityClass = "opacity-[var(--opacity-disabled,0.5)]"

  return (
    <div
      className={cn(
        "flex w-[360px] items-start gap-2 rounded-lg px-3 py-2",
        getBackground({ disabled, state }),
        !disabled && "cursor-pointer hover:bg-[var(--parser-fill-neutral-hover)]",
        className,
      )}
      {...props}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
    >
      <div className="flex h-5 shrink-0 items-center justify-center">
        <MenuCheckbox checked={resolvedChecked} disabled={disabled} />
      </div>

      {(icon ?? startIcon) && (
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]",
            disabled && disabledOpacityClass,
          )}
        >
          <Star aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
      )}

      <div
        className={cn(
          "flex min-w-px flex-1 flex-col items-start",
          secondaryText && "justify-center",
          disabled && disabledOpacityClass,
        )}
      >
        <span
          className={cn(
            "w-full text-sm leading-5 tracking-[0.15px]",
            getTitleTone(),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>

        {secondaryText && (
          <span
            className={cn(
              "w-full text-sm leading-[1.43] tracking-[0.0238px]",
              getCaptionTone(),
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
                getCaptionTone(),
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
              propDelete={false}
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
