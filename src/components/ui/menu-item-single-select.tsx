import * as React from "react"
import { Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type MenuItemSingleSelectState = "default" | "hovered"
type MenuItemSingleSelectSize = "md" | "sm"

type MenuItemSingleSelectProps = React.ComponentProps<"div"> & {
  icon?: boolean
  chip?: boolean
  disabled?: boolean
  rightSlot?: boolean
  rightSlotChip?: boolean
  rightSlotText?: boolean
  secondaryText?: boolean
  selected?: boolean
  size?: MenuItemSingleSelectSize
  startIcon?: boolean
  state?: MenuItemSingleSelectState
}

function getBackground({
  disabled,
  selected,
  state,
}: Pick<MenuItemSingleSelectProps, "disabled" | "selected" | "state">) {
  if (disabled) {
    return "bg-transparent"
  }

  if (selected && state === "default") {
    return "bg-[var(--parser-fill-neutral-selected)]"
  }

  if (!selected && state === "hovered") {
    return "bg-[var(--parser-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

function MenuItemSingleSelect({
  chip,
  icon,
  children = "Menu Item",
  className,
  disabled = false,
  rightSlot = true,
  rightSlotChip = true,
  rightSlotText = true,
  secondaryText = true,
  selected = true,
  size = "md",
  startIcon = true,
  state = "default",
  ...props
}: MenuItemSingleSelectProps) {
  const resolvedRightSlotChip = chip ?? rightSlotChip
  const rightSlotVisible = rightSlot && (rightSlotText || resolvedRightSlotChip)
  const disabledOpacityClass = "opacity-[var(--opacity-disabled,0.5)]"

  return (
    <div
      className={cn(
        "flex w-[360px] items-center gap-2 rounded-lg px-3",
        size === "md" ? "py-2.5" : "py-2",
        getBackground({ disabled, selected, state }),
        !disabled && !selected && "cursor-pointer hover:bg-[var(--parser-fill-neutral-hover)]",
        className,
      )}
      {...props}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
    >
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

      <span
        className={cn(
          "flex min-w-px flex-1 flex-col items-start font-normal",
          selected && state === "default" && "justify-center",
          disabled && disabledOpacityClass,
        )}
      >
        <span
          className={cn("w-full tracking-[0.15px] text-[color:var(--parser-text-neutral-primary)]", size === "md" ? "text-base leading-6" : "text-sm leading-5")}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>

        {secondaryText && (
          <span
            className="w-full text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary text
          </span>
        )}
      </span>

      {rightSlotVisible && (
        <span
          className={cn(
            "flex shrink-0 items-center gap-2",
            disabled && disabledOpacityClass,
          )}
        >
          {rightSlotText && (
            <span
              className="whitespace-nowrap text-xs leading-[1.32] tracking-[0.3px] text-[color:var(--parser-text-neutral-secondary)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              rightSlot text
            </span>
          )}

          {resolvedRightSlotChip && (
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
        </span>
      )}
    </div>
  )
}

export { MenuItemSingleSelect }
export type { MenuItemSingleSelectProps, MenuItemSingleSelectSize, MenuItemSingleSelectState }
