import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type ToggleButtonSize = "lg" | "md" | "sm"
type ToggleButtonColor = "contrast" | "neutral-dark" | "neutral"
type ToggleButtonState = "default" | "hover"

type ToggleButtonProps = React.ComponentProps<"button"> & {
  children?: React.ReactNode
  color?: ToggleButtonColor
  defaultSelected?: boolean
  disabled?: boolean
  icon?: boolean
  label?: boolean
  selected?: boolean
  size?: ToggleButtonSize
  state?: ToggleButtonState
}

const sizeClasses: Record<
  ToggleButtonSize,
  {
    iconSize: string
    iconWrap: string
    label: string
    paddingX: string
    paddingY: string
    rounded: string
    gap: string
    minWidth: string
  }
> = {
  lg: {
    iconSize: "size-6",
    iconWrap: "w-6",
    label: "text-base leading-6 tracking-[0px]",
    paddingX: "px-4",
    paddingY: "py-3",
    rounded: "rounded-[9px]",
    gap: "gap-2",
    minWidth: "min-w-[56px]",
  },
  md: {
    iconSize: "size-5",
    iconWrap: "w-5",
    label: "text-base leading-6 tracking-[0.15px]",
    paddingX: "px-3",
    paddingY: "py-1",
    rounded: "rounded-[5px]",
    gap: "gap-2",
    minWidth: "min-w-[40px]",
  },
  sm: {
    iconSize: "size-4",
    iconWrap: "w-4",
    label: "text-sm leading-5 tracking-[0.15px]",
    paddingX: "px-3",
    paddingY: "py-1",
    rounded: "rounded-[5px]",
    gap: "gap-2",
    minWidth: "min-w-[36px]",
  },
}

function getBackgroundClasses({
  color,
  disabled,
  selected,
  state,
}: {
  color: ToggleButtonColor
  disabled: boolean
  selected: boolean
  state: ToggleButtonState
}) {
  if (disabled) {
    return selected
      ? color === "neutral-dark"
        ? "bg-[var(--parser-fill-neutral-dark)]"
        : color === "neutral"
          ? "bg-[var(--parser-fill-neutral-selected)]"
          : "bg-[var(--parser-fill-contrast-static)]"
      : "bg-transparent"
  }

  if (selected) {
    if (color === "neutral-dark") {
      return "bg-[var(--parser-fill-neutral-dark)]"
    }

    if (color === "neutral") {
      return "bg-[var(--parser-fill-neutral-selected)]"
    }

    return "bg-[var(--parser-fill-contrast-static)]"
  }

  if (state === "hover") {
    return "bg-[var(--parser-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

function getTextClasses({
  color,
  disabled,
  selected,
}: {
  color: ToggleButtonColor
  disabled: boolean
  selected: boolean
}) {
  if (disabled) {
    return "text-[color:var(--parser-text-disabled)]"
  }

  if (selected && color === "neutral-dark") {
    return "text-[color:var(--parser-text-primary-contrast)]"
  }

  return "text-[color:var(--parser-text-neutral-primary)]"
}

function getHoverBackgroundClass({
  color,
  disabled,
  selected,
}: {
  color: ToggleButtonColor
  disabled: boolean
  selected: boolean
}) {
  if (disabled) {
    return ""
  }

  if (selected) {
    if (color === "neutral-dark") {
      return "hover:bg-[var(--parser-fill-neutral-dark-hover)]"
    }

    if (color === "neutral") {
      return "hover:bg-[var(--parser-fill-neutral-hover)]"
    }

    return "hover:bg-[var(--parser-fill-contrast-hover)]"
  }

  return "hover:bg-[var(--parser-fill-neutral-hover)]"
}

function ToggleButton({
  children = "Label",
  className,
  color = "contrast",
  defaultSelected,
  disabled = false,
  icon = true,
  label = true,
  selected,
  size = "lg",
  state = "default",
  onClick,
  type = "button",
  ...props
}: ToggleButtonProps) {
  const s = sizeClasses[size]
  const resolvedState: ToggleButtonState = disabled ? "default" : state
  const isControlled = selected !== undefined
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected ?? false)
  const resolvedSelected = isControlled ? selected : uncontrolledSelected
  const hoverBackgroundClass = getHoverBackgroundClass({
    color,
    disabled,
    selected: resolvedSelected,
  })

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!isControlled && !disabled) {
      setUncontrolledSelected((current) => !current)
    }

    onClick?.(event)
  }

  return (
    <button
      aria-pressed={resolvedSelected}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center transition-colors duration-150 disabled:cursor-not-allowed",
        s.rounded,
        s.minWidth,
        s.paddingX,
        s.paddingY,
        s.gap,
        getBackgroundClasses({ color, disabled, selected: resolvedSelected, state: resolvedState }),
        hoverBackgroundClass,
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {icon && (
        <span className={cn("flex shrink-0 items-center justify-center", s.iconWrap)}>
          <Star
            className={cn(
              "shrink-0",
              s.iconSize,
              disabled
                ? "text-[color:var(--parser-text-disabled)]"
                : resolvedSelected && color === "neutral-dark"
                  ? "text-[color:var(--parser-text-primary-contrast)]"
                : "text-[color:var(--parser-text-neutral-primary)]",
            )}
            strokeWidth={2}
          />
        </span>
      )}

      {label && (
        <span
          className={cn(
            "whitespace-nowrap font-medium",
            s.label,
            getTextClasses({ color, disabled, selected: resolvedSelected }),
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>
      )}
    </button>
  )
}

export { ToggleButton }
export type { ToggleButtonColor, ToggleButtonProps, ToggleButtonSize, ToggleButtonState }
