import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type MenuItemAnchorState = "default" | "hovered"

type MenuItemAnchorProps = React.ComponentProps<"div"> & {
  caption?: boolean
  secondaryText?: boolean
  selected?: boolean
  startIcon?: boolean
  state?: MenuItemAnchorState
}

function getBackground({
  selected,
  state,
}: Pick<MenuItemAnchorProps, "selected" | "state">) {
  if (!selected && state === "hovered") {
    return "bg-[var(--parser-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

/**
 * Parser menu row matching the Figma `MenuItemAnchor` component.
 */
function MenuItemAnchor({
  caption = false,
  className,
  secondaryText = false,
  selected = false,
  startIcon = false,
  state = "default",
  ...props
}: MenuItemAnchorProps) {
  const isHovered = !selected && state === "hovered"
  const isSelected = selected && state === "default"

  return (
    <div
      className={cn(
        "flex w-[214px] items-center gap-2 rounded-lg px-3 py-2",
        getBackground({ selected, state }),
        className,
      )}
      {...props}
    >
      {startIcon && (
        <span className="flex size-6 shrink-0 items-center justify-center text-[var(--parser-text-neutral-primary)]">
          <Star aria-hidden="true" className="size-4" strokeWidth={2} />
        </span>
      )}

      <span
        className={cn(
          "flex min-w-px flex-1 flex-col items-start",
          isSelected
            ? "gap-0.5 justify-center"
            : "font-normal text-[color:var(--parser-text-neutral-secondary)]",
        )}
      >
        <span
          className={cn(
            "w-full whitespace-nowrap text-base leading-[1.5] tracking-[0.024px]",
            isSelected
              ? "font-semibold text-[color:var(--parser-text-neutral-primary)]"
              : isHovered
                ? "text-[color:var(--parser-text-neutral-primary)]"
                : "text-[color:var(--parser-text-neutral-secondary)]",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Menu Item
        </span>

        {!selected && secondaryText && (
          <span
            className="w-full whitespace-nowrap text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary text
          </span>
        )}

        {isSelected && secondaryText && (
          <span
            className="w-full whitespace-nowrap text-sm leading-[1.43] tracking-[0.0238px] text-[color:var(--parser-text-neutral-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Secondary text
          </span>
        )}
      </span>

      {caption && (
        <span
          className="whitespace-nowrap text-xs leading-[1.32] tracking-[0.3px] text-[color:var(--parser-text-neutral-secondary)]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Typography
        </span>
      )}
    </div>
  )
}

export { MenuItemAnchor }
export type { MenuItemAnchorProps, MenuItemAnchorState }
