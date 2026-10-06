import * as React from "react"

import { Chip } from "@/components/ui/chip"
import { cn } from "@/lib/utils"

type ToggleChipSize = "lg" | "md" | "sm"
type ToggleChipColor = "neutral" | "brand" | "error" | "warning" | "success" | "contrast"

type ToggleChipProps = Omit<React.ComponentProps<"button">, "children" | "onChange"> & {
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
  disabled = false,
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

    if (event.defaultPrevented || disabled) {
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
        "inline-flex cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed",
      )}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <Chip
        appearance={isChecked ? "default" : "muted"}
        className={className}
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
