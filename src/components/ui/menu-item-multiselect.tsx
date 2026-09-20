import * as React from "react"
import { Square, SquareCheck, SquareMinus, Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type MenuItemMultiselectState = "default" | "hovered"
type MenuItemMultiselectSize = "md" | "sm"
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
  size?: MenuItemMultiselectSize
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
    return "bg-[var(--rh-theme-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

function getTitleTone() {
  return "text-[color:var(--rh-theme-text-neutral-primary)]"
}

function getCaptionTone() {
  return "text-[color:var(--rh-theme-text-neutral-secondary)]"
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
      ? "text-[var(--rh-theme-icon-brand)]"
      : "text-[var(--rh-theme-border-neutral)]",
  )

  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center",
        disabled && "opacity-[calc(var(--rh-theme-opacity-disabled)/100)]",
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
  size = "md",
  startIcon = true,
  state = "default",
  ...props
}: MenuItemMultiselectProps) {
  const resolvedChecked: MenuItemMultiselectChecked = typeof checked === "boolean" ? (checked ? "true" : "none") : checked ?? (selected ? "true" : "none")
  const resolvedRightSlotText = rightSlotText || caption
  const rightSlotVisible = rightSlot && (resolvedRightSlotText || rightSlotChip)
  const disabledOpacityClass = "opacity-[calc(var(--rh-theme-opacity-disabled)/100)]"

  return (
    <div
      className={cn(
        "flex w-full items-start gap-[var(--rh-sizing-menu-padding-gap-sm)] rounded-[var(--rh-sizing-menu-border-radius)] px-[var(--rh-sizing-menu-padding-px-sm)]",
        size === "md" ? "py-2.5" : "py-2",
        getBackground({ disabled, state }),
        !disabled && "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      {...props}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
    >
      <div className="flex h-[calc(var(--spacing)*5)] shrink-0 items-center justify-center">
        <MenuCheckbox checked={resolvedChecked} disabled={disabled} />
      </div>

      {(icon ?? startIcon) && (
        <span
          className={cn(
            "flex size-[calc(var(--spacing)*5)] shrink-0 items-center justify-center text-[var(--rh-theme-text-neutral-primary)]",
            disabled && disabledOpacityClass,
          )}
        >
          <Star aria-hidden="true" className="size-[calc(var(--spacing)*5)]" strokeWidth={2} />
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
              size === "md" ? "w-full text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]" : "w-full text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
            getTitleTone(),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>

        {secondaryText && (
          <span
            className={cn(
              "w-full text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
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
                "whitespace-nowrap text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
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
  MenuItemMultiselectSize,
  MenuItemMultiselectState,
}
