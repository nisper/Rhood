import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type SegmentSize = "lg" | "md" | "sm"
type SegmentColor = "neutral" | "contrast"
type SegmentState = "default" | "hover"

type SegmentProps = Omit<React.ComponentProps<"button">, "color"> & {
  color?: SegmentColor
  defaultSelected?: boolean
  icon?: boolean
  label?: boolean
  selected?: boolean
  size?: SegmentSize
  state?: SegmentState
}

const sizeClasses: Record<SegmentSize, string> = {
  lg: "rh-typography-body-1-medium h-[calc(var(--spacing)*12)] min-w-[calc(var(--spacing)*9)] gap-[calc(var(--spacing)*2)] rounded-[var(--rh-sizing-border-radius-md)] px-[calc(var(--spacing)*4)] py-[calc(var(--spacing)*3)]",
  md: "rh-typography-body-1-medium h-[calc(var(--spacing)*8)] min-w-[calc(var(--spacing)*9)] gap-[calc(var(--spacing)*2)] rounded-[var(--rh-sizing-border-radius-sm)] px-[calc(var(--spacing)*3)] py-[calc(var(--spacing)*1)]",
  sm: "rh-typography-body-2-medium h-[calc(calc(var(--spacing)*6)+calc(var(--spacing)*1))] min-w-[calc(var(--spacing)*9)] gap-[calc(var(--spacing)*2)] rounded-[var(--rh-sizing-border-radius-sm)] px-[calc(var(--spacing)*3)] py-[calc(var(--spacing)*1)]",
}

const iconClasses: Record<SegmentSize, string> = {
  lg: "size-[var(--rh-sizing-icon-icon-md)]",
  md: "size-[calc(var(--spacing)*5)]",
  sm: "size-[calc(var(--spacing)*4)]",
}

const colorClasses: Record<SegmentColor, { default: string; selected: string }> = {
  neutral: {
    default: "text-[var(--rh-theme-text-neutral-primary)]",
    selected: "bg-[var(--rh-theme-fill-contrast-static)] text-[var(--rh-theme-text-neutral-primary)]",
  },
  contrast: {
    default: "text-[var(--rh-theme-text-neutral-primary)]",
    selected: "bg-[var(--rh-theme-fill-neutral-dark)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
  },
}

/** An individual option inside a SegmentedControl. */
function Segment({
  children = "Option",
  className,
  color = "neutral",
  defaultSelected = false,
  disabled = false,
  icon = false,
  label = true,
  selected,
  size = "md",
  state = "default",
  type = "button",
  onClick,
  role,
  ...props
}: SegmentProps) {
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected)
  const isControlled = selected !== undefined
  const isSelected = selected ?? uncontrolledSelected
  const selectionAccessibility = role === "radio" || role === "checkbox"
    ? { "aria-checked": isSelected }
    : { "aria-pressed": isSelected }

  return (
    <button
      {...selectionAccessibility}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-0 bg-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-[var(--rh-theme-text-neutral-disabled)]",
        sizeClasses[size],
        colorClasses[color][isSelected ? "selected" : "default"],
        !disabled && !isSelected && state === "hover" && "bg-[var(--rh-theme-fill-neutral-hover)]",
        !disabled && !isSelected && "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      disabled={disabled}
      onClick={(event) => {
        if (!isControlled && !disabled) setUncontrolledSelected((value) => !value)
        onClick?.(event)
      }}
      role={role}
      type={type}
      {...props}
    >
      {icon && <Star aria-hidden="true" className={cn("shrink-0", iconClasses[size])} strokeWidth={2} />}
      {label && <span style={{ fontVariationSettings: "'wdth' 100" }}>{children}</span>}
    </button>
  )
}

export { Segment }
export type { SegmentColor, SegmentProps, SegmentSize, SegmentState }
