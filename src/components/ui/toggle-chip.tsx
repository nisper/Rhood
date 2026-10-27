import * as React from "react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type ToggleChipSize = "lg" | "md" | "sm"
type ToggleChipColor = "neutral" | "brand" | "error" | "warning" | "success" | "contrast"

const hoverBackgroundTokens: Record<ToggleChipColor, { muted: string; selected: string }> = {
  neutral: {
    muted: "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
    selected: "hover:bg-[var(--parser-fill-neutral-dark-hover)]",
  },
  brand: {
    muted: "hover:bg-[var(--parser-fill-brand-light-hover)]",
    selected: "hover:bg-[var(--parser-fill-brand-hover)]",
  },
  error: {
    muted: "hover:bg-[var(--parser-fill-error-light-hover)]",
    selected: "hover:bg-[var(--parser-fill-error-hover)]",
  },
  warning: {
    muted: "hover:bg-[var(--parser-fill-warning-light-hover)]",
    selected: "hover:bg-[var(--parser-fill-warning-hover)]",
  },
  success: {
    muted: "hover:bg-[var(--parser-fill-success-light-hover)]",
    selected: "hover:bg-[var(--parser-fill-success-hover)]",
  },
  contrast: {
    muted: "hover:bg-[var(--rh-theme-fill-contrast-hover)]",
    selected: "hover:bg-[var(--parser-fill-contrast-hover)]",
  },
}

type ToggleChipProps = Omit<React.ComponentProps<"button">, "children" | "disabled" | "onChange"> & {
  checked?: boolean
  children?: React.ReactNode
  color?: ToggleChipColor
  defaultChecked?: boolean
  icon?: boolean
  label?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: ToggleChipSize
}

/**
 * Интерактивный Chip. Нажатие переключает его между muted и default.
 */
function ToggleChip({
  checked,
  children,
  className,
  color = "neutral",
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
        "inline-flex cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
      )}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <Chip
        appearance={isChecked ? "default" : "muted"}
        className={cn(
          "transition-colors duration-150",
          hoverBackgroundTokens[color][isChecked ? "selected" : "muted"],
          className,
        )}
        color={color}
        icon={icon}
        label={label}
        remove={false}
        size={size}
      >
        {children}
      </Chip>
    </button>
  )
}

export { ToggleChip }
export type { ToggleChipColor, ToggleChipProps, ToggleChipSize }
