import * as React from "react"
import { Star } from "lucide-react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type MenuItemSingleSelectState = "default" | "hovered"

type MenuItemSingleSelectProps = React.ComponentProps<"div"> & {
  chip?: boolean
  disabled?: boolean
  rightSlot?: boolean
  rightSlotChip?: boolean
  rightSlotText?: boolean
  secondaryText?: boolean
  selected?: boolean
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
  className,
  disabled = false,
  rightSlot = false,
  rightSlotChip = false,
  rightSlotText = false,
  secondaryText = false,
  selected = false,
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
        "flex w-[360px] items-center gap-2 rounded-lg px-3 py-2",
        getBackground({ disabled, selected, state }),
        className,
      )}
      {...props}
    >
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

      <span
        className={cn(
          "flex min-w-px flex-1 flex-col items-start font-normal",
          selected && state === "default" && "justify-center gap-0.5",
          disabled && disabledOpacityClass,
        )}
      >
        <span
          className="w-full text-sm leading-5 tracking-[0.15px] text-[color:var(--parser-text-neutral-primary)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Menu Item
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
              propDelete
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
export type { MenuItemSingleSelectProps, MenuItemSingleSelectState }
