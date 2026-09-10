import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type SegmentSize = "lg" | "md" | "sm"
type SegmentColor = "neutral" | "contrast"
type SegmentState = "default" | "hover"

type SegmentProps = React.ComponentProps<"button"> & {
  color?: SegmentColor
  defaultSelected?: boolean
  selected?: boolean
  icon?: boolean
  size?: SegmentSize
  state?: SegmentState
}

const sizes: Record<SegmentSize, { icon: string; label: string; px: string; py: string; radius: string }> = {
  lg: { icon: "size-6", label: "text-base leading-6", px: "px-4", py: "py-2.5", radius: "rounded-lg" },
  md: { icon: "size-5", label: "text-sm leading-5", px: "px-3", py: "py-1.5", radius: "rounded-md" },
  sm: { icon: "size-4", label: "text-xs leading-4", px: "px-3", py: "py-1.5", radius: "rounded-md" },
}

function Segment({
  children = "Label",
  className,
  color = "neutral",
  defaultSelected = false,
  disabled = false,
  icon = false,
  selected,
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: SegmentProps) {
  const s = sizes[size]
  const isControlled = selected !== undefined
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected)
  const resolvedSelected = isControlled ? selected : uncontrolledSelected
  const selectedBackground = color === "contrast" ? "bg-[var(--parser-fill-neutral-dark)]" : "bg-[var(--parser-fill-neutral-selected)]"
  const hoverBackground = color === "contrast" ? "hover:bg-[var(--parser-fill-neutral-dark-hover)]" : "hover:bg-[var(--parser-fill-neutral-hover)]"
  const background = disabled ? "bg-transparent" : resolvedSelected ? selectedBackground : state === "hover" ? "bg-[var(--parser-fill-neutral-hover)]" : "bg-transparent"
  const text = disabled ? "text-[color:var(--parser-text-disabled)]" : resolvedSelected && color === "contrast" ? "text-[color:var(--parser-text-primary-contrast)]" : "text-[color:var(--parser-text-neutral-primary)]"

  return (
    <button
      aria-pressed={resolvedSelected}
      className={cn(
        "inline-flex h-full min-w-0 shrink-0 cursor-pointer items-center justify-center gap-2 transition-colors duration-150 disabled:cursor-not-allowed",
        s.radius, s.px, s.py, background, !disabled && hoverBackground,
        text, className,
      )}
      disabled={disabled}
      {...props}
      onClick={(event) => {
        if (!isControlled && !disabled) setUncontrolledSelected((value) => !value)
        props.onClick?.(event)
      }}
      type={type}
    >
      {icon && <Star className={cn("shrink-0", s.icon, text)} strokeWidth={2} />}
      <span className={cn("whitespace-nowrap font-medium", s.label)} style={{ fontVariationSettings: "'wdth' 100" }}>{children}</span>
    </button>
  )
}

export { Segment }
export type { SegmentColor, SegmentProps, SegmentSize, SegmentState }
