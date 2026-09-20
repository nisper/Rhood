import * as React from "react"
import { CircleCheckBig, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ListItemFontWeight = "medium" | "regular"
type ListItemState = "default" | "hovered" | "focused"

type ListItemProps = React.ComponentProps<"div"> & {
  button?: boolean
  dense?: boolean
  disabled?: boolean
  /** Legacy alias; paddingX takes precedence when supplied. */
  disGutters?: boolean
  paddingX?: boolean
  endIcon?: boolean | React.ReactNode
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
  const isHighlighted = !disabled && !isSelected && (state === "hovered" || state === "focused")
  const hasPaddingX = paddingX ?? !disGutters
  const disabledOpacity = disabled && "opacity-[calc(var(--rh-theme-opacity-disabled)/100)]"

  return (
    <div
      {...props}
      className={cn(
        "flex w-full items-center rounded-[var(--rh-sizing-border-radius-border-radius-md)] text-[var(--rh-theme-text-neutral-primary)]",
        dense ? "py-[calc(var(--spacing)*1)]" : "py-[calc(var(--spacing)*2)]",
        hasPaddingX && "px-[calc(var(--spacing)*4)]",
        isSelected && "bg-[var(--rh-theme-fill-neutral-selected)]",
        isHighlighted && "bg-[var(--rh-theme-fill-neutral-hover)]",
        !disabled && !isSelected && "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : props.onClick}
      onKeyDown={disabled ? undefined : props.onKeyDown}
      tabIndex={disabled ? -1 : props.tabIndex}
    >
      {startIcon && <span className={cn("mr-[calc(var(--spacing)*4)] flex size-[calc(var(--spacing)*6)] shrink-0 items-center justify-center", disabledOpacity)}>
        <Star aria-hidden="true" className="size-[calc(var(--spacing)*6)]" strokeWidth={2} />
      </span>}
      <span className={cn("flex min-w-0 flex-1 flex-col py-[calc(var(--spacing)*1)]", disabledOpacity)}>
        <span className={cn("break-words text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)]", fontWeight === "medium" ? "font-medium tracking-[var(--rh-sizing-typography-letter-spacing-md)]" : "font-normal tracking-[var(--rh-sizing-typography-letter-spacing-md)]")}>
          {children}
        </span>
        {secondaryText && <span className="break-words text-[length:var(--rh-sizing-typography-font-size-sm)] font-normal leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)] text-[var(--rh-theme-text-neutral-secondary)]">{secondaryLabel}</span>}
      </span>
      {iconButton && <Button aria-label="Действие со строкой" appearance="ghost" disabled={disabled} iconOnly size="sm" startIcon={<CircleCheckBig aria-hidden="true" className="size-[calc(var(--spacing)*5)]" strokeWidth={2} />} />}
      {endIcon && <span className={cn("flex size-[calc(var(--spacing)*6)] shrink-0 items-center justify-center", disabledOpacity)}>
        {typeof endIcon === "boolean" ? <Star aria-hidden="true" className="size-[calc(var(--spacing)*6)]" strokeWidth={2} /> : endIcon}
      </span>}
      {button && <Button appearance="ghost" disabled={disabled} endIcon={false} startIcon={false}>Label</Button>}
    </div>
  )
}

export { ListItem }
export type { ListItemFontWeight, ListItemProps, ListItemState }
