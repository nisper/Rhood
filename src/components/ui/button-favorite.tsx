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
      "min-h-[var(--rhood-sizing-base-module-5)] gap-[var(--rhood-sizing-common-input-padding-gap-md)] px-[var(--rhood-sizing-common-input-padding-px-md)] py-[var(--rhood-sizing-common-input-padding-py-md)]",
    icon: "size-[var(--rhood-sizing-base-module-3)]",
    label:
      "text-[length:var(--rhood-sizing-typography-font-size-md)] leading-[var(--rhood-sizing-typography-line-height-md)] tracking-[var(--rhood-sizing-typography-letter-spacing-md)]",
  },
  sm: {
    button:
      "min-h-[var(--rhood-sizing-base-module-4-5)] gap-[var(--rhood-sizing-common-input-padding-gap-sm)] px-[var(--rhood-sizing-common-input-padding-px-sm)] py-[var(--rhood-sizing-common-input-padding-py-sm)]",
    icon: "size-[var(--rhood-sizing-base-module-2-5)]",
    label:
      "text-[length:var(--rhood-sizing-typography-font-size-sm)] leading-[var(--rhood-sizing-typography-line-height-sm)] tracking-[var(--rhood-sizing-typography-letter-spacing-sm)]",
  },
  xsm: {
    button:
      "min-h-[calc(var(--rhood-sizing-base-module-4)-var(--rhood-sizing-base-module-0-5))] gap-[var(--rhood-sizing-common-input-padding-gap-xsm)] px-[var(--rhood-sizing-common-input-padding-px-xsm)] py-[var(--rhood-sizing-common-input-padding-py-xsm)]",
    icon: "size-[var(--rhood-sizing-base-module-2)]",
    label:
      "text-[length:var(--rhood-sizing-typography-font-size-xsm)] leading-[var(--rhood-sizing-typography-line-height-xsm)] tracking-[var(--rhood-sizing-typography-letter-spacing-sm)]",
  },
}

const surfaceClasses: Record<
  ButtonFavoriteAppearance,
  { default: string; hovered: string }
> = {
  neutral: {
    default: "bg-[var(--rhood-theme-fill-neutral)]",
    hovered: "bg-[var(--rhood-theme-fill-neutral-hover)]",
  },
  ghost: {
    default: "bg-transparent",
    hovered: "bg-[var(--rhood-theme-fill-neutral-hover)]",
  },
}

const surfaceHoverClasses: Record<ButtonFavoriteAppearance, string> = {
  neutral: "hover:bg-[var(--rhood-theme-fill-neutral-hover)]",
  ghost: "hover:bg-[var(--rhood-theme-fill-neutral-hover)]",
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
        "group inline-flex shrink-0 cursor-pointer items-center justify-center border-0 font-semibold text-[var(--rhood-theme-text-neutral-primary)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rhood-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--rhood-theme-fill-disabled)] disabled:text-[var(--rhood-theme-text-neutral-disabled)]",
        isIconOnly
          ? cn(
              "rounded-full",
              size === "md" && "size-[var(--rhood-sizing-base-module-5)]",
              size === "sm" && "size-[var(--rhood-sizing-base-module-4-5)]",
              size === "xsm" && "size-[calc(var(--rhood-sizing-base-module-4)-var(--rhood-sizing-base-module-0-5))]",
              !disabled && "hover:bg-[var(--rhood-theme-fill-error-light-hover)]",
              isHovered && !disabled && "bg-[var(--rhood-theme-fill-error-light-hover)]",
            )
          : cn(
              "rounded-[var(--rhood-sizing-common-input-shape-border-radius)]",
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
            ? "text-[var(--rhood-theme-icon-neutral-disabled)]"
            : isChecked
              ? "fill-current text-[var(--rhood-theme-icon-error)]"
              : isHovered
                ? "text-[var(--rhood-theme-icon-error)]"
                : "text-[var(--rhood-theme-icon-neutral-secondary)]",
          !disabled && !isChecked && "group-hover:text-[var(--rhood-theme-icon-error)]",
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
