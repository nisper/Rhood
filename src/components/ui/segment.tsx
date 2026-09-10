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

const sizes: Record<SegmentSize, { icon: string; label: string; padding: string; radius: string }> = {
  lg: { icon: "size-6", label: "text-base leading-6 tracking-normal", padding: "px-4 py-3", radius: "rounded-[9px]" },
  md: { icon: "size-5", label: "text-base leading-6 tracking-[0.15px]", padding: "px-3 py-1", radius: "rounded-[5px]" },
  sm: { icon: "size-4", label: "text-sm leading-5 tracking-[0.15px]", padding: "px-3 py-1", radius: "rounded-[5px]" },
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
  const s = sizes[size]
  const selectedBackground = color === "contrast"
    ? "bg-[var(--parser-fill-neutral-dark)]"
    : "bg-[var(--parser-fill-contrast-static)]"
  const hoverBackground = "hover:bg-[var(--parser-fill-neutral-hover)]"
  const textColor = disabled
    ? "text-[var(--parser-text-disabled)]"
    : color === "contrast" && isSelected
      ? "text-[var(--parser-text-primary-contrast)]"
      : "text-[var(--parser-text-neutral-primary)]"
  const forcedHover = !disabled && !isSelected && state === "hover"
    ? "bg-[var(--parser-fill-neutral-hover)]"
    : ""
  const hoverTextColor = color === "contrast" && !disabled
    ? "hover:text-[var(--parser-text-neutral-primary)]"
    : ""
  const selectionAccessibility = role === "radio" || role === "checkbox"
    ? { "aria-checked": isSelected }
    : { "aria-pressed": isSelected }

  return (
    <button
      {...selectionAccessibility}
      className={cn(
        "inline-flex min-w-[36px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-[480] transition-colors duration-150 disabled:cursor-not-allowed",
        s.padding,
        s.radius,
        isSelected && selectedBackground,
        forcedHover,
        !disabled && !isSelected && hoverBackground,
        !isSelected && hoverTextColor,
        textColor,
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
      {icon && <Star aria-hidden="true" className={cn("shrink-0", s.icon)} strokeWidth={2} />}
      {label && <span className={s.label} style={{ fontVariationSettings: "'wdth' 100" }}>{children}</span>}
    </button>
  )
}

export { Segment }
export type { SegmentColor, SegmentProps, SegmentSize, SegmentState }
