import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type ToggleChipSize = "lg" | "md" | "sm"

type ToggleChipProps = Omit<React.ComponentProps<"button">, "children" | "color" | "disabled" | "onChange"> & {
  checked?: boolean
  children?: React.ReactNode
  defaultChecked?: boolean
  icon?: boolean
  label?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: ToggleChipSize
}

const sizeClasses: Record<ToggleChipSize, { root: string; icon: string; label: string }> = {
  lg: {
    root: "rh-typography-b1 min-w-8 gap-1 px-2 py-2",
    icon: "size-6",
    label: "px-2",
  },
  md: {
    root: "rh-typography-b1 min-w-8 gap-1 px-1 py-1",
    icon: "size-6",
    label: "px-2",
  },
  sm: {
    root: "rh-typography-b2 min-w-8 gap-1 px-[3px] py-[3px]",
    icon: "size-5",
    label: "px-1",
  },
}

/** A standalone toggle chip with its own neutral styles. */
function ToggleChip({
  checked,
  children = "Chip",
  className,
  defaultChecked = false,
  icon = true,
  label = true,
  onCheckedChange,
  onClick,
  size = "lg",
  type = "button",
  ...props
}: ToggleChipProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const isChecked = checked ?? uncontrolledChecked

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (event.defaultPrevented) {
      return
    }

    const nextChecked = !isChecked
    if (checked === undefined) {
      setUncontrolledChecked(nextChecked)
    }
    onCheckedChange?.(nextChecked)
  }

  return (
    <button
      aria-pressed={isChecked}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[color:var(--rh-theme-border-light)] text-[color:var(--parser-text-neutral-primary)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
        sizeClasses[size].root,
        isChecked && "border-[color:var(--rh-theme-border-neutral-dark)]",
        className,
      )}
      onClick={handleClick}
      style={{ borderRadius: "var(--rh-sizing-common-input-shape-border-radius)", borderWidth: "1.5px" }}
      type={type}
      {...props}
    >
      {icon && <Star aria-hidden="true" className={cn("shrink-0", sizeClasses[size].icon)} strokeWidth={2.1} />}
      {label && (
        <span className={cn("whitespace-nowrap", sizeClasses[size].label)} style={{ fontVariationSettings: "'wdth' 100" }}>
          {children}
        </span>
      )}
    </button>
  )
}

export { ToggleChip }
export type { ToggleChipProps, ToggleChipSize }
