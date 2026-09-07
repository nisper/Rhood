import * as React from "react"
import { CircleCheckBig, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ListItemFontWeight = "medium" | "regular"
type ListItemState = "default" | "hovered"

type ListItemProps = React.ComponentProps<"div"> & {
  button?: boolean
  dense?: boolean
  disabled?: boolean
  /** Legacy alias; paddingX takes precedence when supplied. */
  disGutters?: boolean
  paddingX?: boolean
  endIcon?: boolean
  fontWeight?: ListItemFontWeight
  iconButton?: boolean
  secondaryText?: boolean
  secondaryLabel?: React.ReactNode
  selected?: boolean
  startIcon?: boolean
  state?: ListItemState
}

/** Navigation row. The owner supplies navigation; selected marks the current page. */
function ListItem({
  button = true,
  children = "List item",
  className,
  dense = false,
  disabled = false,
  disGutters = false,
  paddingX,
  endIcon = true,
  fontWeight = "medium",
  iconButton = true,
  secondaryText = true,
  secondaryLabel = "Secondary",
  selected = false,
  startIcon = true,
  state = "default",
  ...props
}: ListItemProps) {
  const isSelected = !disabled && selected
  const isHovered = !disabled && !isSelected && state === "hovered"
  const hasPaddingX = paddingX ?? !disGutters
  const disabledOpacity = disabled && "opacity-[var(--opacity-disabled,0.5)]"

  return (
    <div
      {...props}
      className={cn(
        "flex w-full items-center rounded-lg text-[var(--parser-text-neutral-primary)]",
        dense ? "py-1" : "py-2",
        hasPaddingX && "px-4",
        isSelected && "bg-[var(--parser-fill-neutral-selected)]",
        isHovered && "bg-[var(--parser-fill-neutral-hover)]",
        !disabled && !isSelected && "cursor-pointer hover:bg-[var(--parser-fill-neutral-hover)]",
        className,
      )}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
      tabIndex={disabled ? -1 : props.tabIndex}
    >
      {startIcon && <span className={cn("mr-4 flex size-6 shrink-0 items-center justify-center", disabledOpacity)}>
        <Star aria-hidden="true" className="size-6" strokeWidth={2} />
      </span>}
      <span className={cn("flex min-w-0 flex-1 flex-col py-1", disabledOpacity)}>
        <span className={cn("break-words text-base leading-6", fontWeight === "medium" ? "font-medium tracking-[0.024px]" : "font-normal tracking-[0.15px]")}>
          {children}
        </span>
        {secondaryText && <span className="break-words text-sm font-normal leading-[1.43] tracking-[0.0238px] text-[var(--parser-text-neutral-secondary)]">{secondaryLabel}</span>}
      </span>
      {iconButton && <Button aria-label="Действие со строкой" appearance="ghost" disabled={disabled} iconOnly size="sm" startIcon={<CircleCheckBig aria-hidden="true" className="size-5" strokeWidth={2} />} />}
      {endIcon && <span className={cn("flex size-6 shrink-0 items-center justify-center", disabledOpacity)}>
        <Star aria-hidden="true" className="size-6" strokeWidth={2} />
      </span>}
      {button && <Button appearance="ghost" disabled={disabled} endIcon={false} startIcon={false}>Label</Button>}
    </div>
  )
}

export { ListItem }
export type { ListItemFontWeight, ListItemProps, ListItemState }
