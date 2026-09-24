import * as React from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

type ButtonFavoriteSize = "md" | "sm" | "xsm"
type ButtonFavoriteState = "default" | "hover"
type ButtonFavoriteAppearance = "neutral" | "ghost"
type LegacyButtonFavoriteState = "hovered"
type LegacyButtonFavoriteVariant = "icon" | "filled" | "ghost"

type ButtonFavoriteProps = Omit<React.ComponentProps<"button">, "onChange"> & {
  appearance?: ButtonFavoriteAppearance
  checked?: boolean
  defaultChecked?: boolean
  iconOnly?: boolean
  label?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  selectedLabel?: React.ReactNode
  size?: ButtonFavoriteSize
  state?: ButtonFavoriteState | LegacyButtonFavoriteState
  /** @deprecated Use `appearance` together with `iconOnly`. */
  variant?: LegacyButtonFavoriteVariant
}

const sizeClasses: Record<
  ButtonFavoriteSize,
  { button: string; icon: string; label: string }
> = {
  md: {
    button:
      "min-h-[calc(var(--spacing)*10)] gap-[var(--rh-sizing-common-input-padding-gap-md)] px-[var(--rh-sizing-common-input-padding-px-md)] py-[var(--rh-sizing-common-input-padding-py-md)]",
    icon: "size-[calc(var(--spacing)*6)]",
    label: "rh-typography-b1-med",
  },
  sm: {
    button:
      "min-h-[calc(var(--spacing)*9)] gap-[var(--rh-sizing-common-input-padding-gap-sm)] px-[var(--rh-sizing-common-input-padding-px-sm)] py-[var(--rh-sizing-common-input-padding-py-sm)]",
    icon: "size-[calc(var(--spacing)*5)]",
    label: "rh-typography-b1-med",
  },
  xsm: {
    button:
      "min-h-[calc(calc(var(--spacing)*8)-calc(var(--spacing)*1))] gap-[var(--rh-sizing-common-input-padding-gap-xsm)] px-[var(--rh-sizing-common-input-padding-px-xsm)] py-[var(--rh-sizing-common-input-padding-py-xsm)]",
    icon: "size-[calc(var(--spacing)*4)]",
    label: "rh-typography-b1-med",
  },
}

const surfaceClasses: Record<
  ButtonFavoriteAppearance,
  { default: string; hovered: string }
> = {
  neutral: {
    default: "bg-[var(--rh-theme-fill-neutral)]",
    hovered: "bg-[var(--rh-theme-fill-neutral-hover)]",
  },
  ghost: {
    default: "bg-transparent",
    hovered: "bg-[var(--rh-theme-fill-neutral-hover)]",
  },
}

const surfaceHoverClasses: Record<ButtonFavoriteAppearance, string> = {
  neutral: "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
  ghost: "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
}

/**
 * Favourite action from Figma `buttonFavorite`.
 *
 * It follows Button sizing and neutral/ghost appearances, while retaining
 * its own checked state as a toggle.
 */
function ButtonFavorite({
  "aria-label": ariaLabel,
  appearance,
  checked,
  className,
  defaultChecked = false,
  disabled = false,
  iconOnly,
  label = "В избранное",
  onClick,
  onCheckedChange,
  selectedLabel = "В избранном",
  size = "md",
  state = "default",
  type = "button",
  variant = "icon",
  ...props
}: ButtonFavoriteProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked)
  const isChecked = checked ?? uncontrolledChecked
  const isHovered = state === "hover" || state === "hovered"
  const resolvedAppearance = appearance ?? (variant === "ghost" ? "ghost" : "neutral")
  const isIconOnly = iconOnly ?? (variant ? variant === "icon" : true)
  const tokens = sizeClasses[size]
  const content = isChecked ? selectedLabel : label
  const visualState = disabled ? "default" : isHovered ? "hovered" : "default"

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
      aria-label={ariaLabel ?? (isIconOnly ? (isChecked ? "Удалить из избранного" : "Добавить в избранное") : undefined)}
      aria-pressed={isChecked}
      className={cn(
        "group inline-flex shrink-0 cursor-pointer items-center justify-center border-0 text-[var(--rh-theme-text-neutral-primary)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--rh-theme-fill-disabled)] disabled:text-[var(--rh-theme-text-neutral-disabled)]",
        isIconOnly
          ? cn(
              "rounded-full",
              size === "md" && "size-[calc(var(--spacing)*10)]",
              size === "sm" && "size-[calc(var(--spacing)*9)]",
              size === "xsm" && "size-[calc(calc(var(--spacing)*8)-calc(var(--spacing)*1))]",
              !disabled && "hover:bg-[var(--rh-theme-fill-error-light-hover)]",
              isHovered && !disabled && "bg-[var(--rh-theme-fill-error-light-hover)]",
            )
          : cn(
              "rounded-[var(--rh-sizing-common-input-shape-border-radius)]",
              tokens.button,
              surfaceClasses[resolvedAppearance][visualState],
              !disabled && surfaceHoverClasses[resolvedAppearance],
            ),
        className,
      )}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      <Heart
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-colors",
          tokens.icon,
          disabled
            ? "text-[var(--rh-theme-icon-neutral-disabled)]"
            : isChecked
              ? "fill-current text-[var(--rh-theme-icon-error)]"
              : isHovered
                ? "text-[var(--rh-theme-icon-error)]"
                : "text-[var(--rh-theme-icon-neutral-secondary)]",
          !disabled && !isChecked && "group-hover:text-[var(--rh-theme-icon-error)]",
        )}
        strokeWidth={2}
      />
      {!isIconOnly && <span className={tokens.label}>{content}</span>}
    </button>
  )
}

export { ButtonFavorite }
export type {
  ButtonFavoriteProps,
  ButtonFavoriteAppearance,
  ButtonFavoriteSize,
  ButtonFavoriteState,
}
