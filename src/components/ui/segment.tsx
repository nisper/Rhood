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
  lg: "h-[var(--rh-sizing-base-module-6)] min-w-[var(--rh-sizing-base-module-4-5)] gap-[var(--rh-sizing-base-module-1)] rounded-[var(--rh-sizing-border-radius-border-radius-md)] px-[var(--rh-sizing-base-module-2)] py-[var(--rh-sizing-base-module-1-5)] text-[length:var(--rh-sizing-typography-font-size-lg)] leading-[var(--rh-sizing-typography-line-height-lg)] tracking-[var(--rh-sizing-typography-letter-spacing-lg)]",
  md: "h-[var(--rh-sizing-base-module-4)] min-w-[var(--rh-sizing-base-module-4-5)] gap-[var(--rh-sizing-base-module-1)] rounded-[var(--rh-sizing-border-radius-border-radius-sm)] px-[var(--rh-sizing-base-module-1-5)] py-[var(--rh-sizing-base-module-0-5)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  sm: "h-[calc(var(--rh-sizing-base-module-3)+var(--rh-sizing-base-module-0-5))] min-w-[var(--rh-sizing-base-module-4-5)] gap-[var(--rh-sizing-base-module-1)] rounded-[var(--rh-sizing-border-radius-border-radius-sm)] px-[var(--rh-sizing-base-module-1-5)] py-[var(--rh-sizing-base-module-0-5)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
}

const iconClasses: Record<SegmentSize, string> = {
  lg: "size-[var(--rh-sizing-icon-icon-md)]",
  md: "size-[var(--rh-sizing-base-module-2-5)]",
  sm: "size-[var(--rh-sizing-base-module-2)]",
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
        "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-0 bg-transparent font-[480] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-[var(--rh-theme-text-neutral-disabled)]",
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
