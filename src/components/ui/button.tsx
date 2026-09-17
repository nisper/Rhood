import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { CheckCircle2, LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Figma: https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10647-1326
 */
type ButtonAppearance =
  | "primary"
  | "default"
  | "ghost"
  | "destructive"
  | "contrast"
  | "inherit"

type ButtonSize = "lg" | "md" | "sm" | "xsm"
type ButtonState = "default" | "hover"

type LegacyButtonVariant =
  | "default"
  | "contained"
  | "secondary"
  | "outlined"
  | "outline"
  | "destructive"
  | "ghost"
  | "link"
  | "text"

type LegacyButtonSize = "default" | "lg" | "icon"

type ButtonProps = React.ComponentProps<"button"> & {
  appearance?: ButtonAppearance
  asChild?: boolean
  counter?: boolean
  counterValue?: React.ReactNode
  endIcon?: React.ReactNode | boolean
  iconOnly?: boolean
  label?: React.ReactNode
  loading?: boolean
  size?: ButtonSize | LegacyButtonSize
  startIcon?: React.ReactNode | boolean
  state?: ButtonState
  variant?: ButtonAppearance | LegacyButtonVariant
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: "min-h-[var(--rh-sizing-base-module-7)] px-[var(--rh-sizing-common-input-padding-px-lg)] py-[var(--rh-sizing-common-input-padding-py-lg)] text-[length:var(--rh-sizing-typography-font-size-lg)] leading-[var(--rh-sizing-typography-line-height-lg)] tracking-[var(--rh-sizing-typography-letter-spacing-lg)]",
  md: "min-h-[var(--rh-sizing-base-module-5)] px-[var(--rh-sizing-common-input-padding-px-md)] py-[var(--rh-sizing-common-input-padding-py-md)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  sm: "min-h-[var(--rh-sizing-base-module-4-5)] px-[var(--rh-sizing-common-input-padding-px-sm)] py-[var(--rh-sizing-common-input-padding-py-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
  xsm: "min-h-[calc(var(--rh-sizing-base-module-4)-var(--rh-sizing-base-module-0-5))] px-[var(--rh-sizing-common-input-padding-px-xsm)] py-[var(--rh-sizing-common-input-padding-py-xsm)] text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
}

const gapClasses: Record<ButtonSize, string> = {
  lg: "gap-[var(--rh-sizing-common-input-padding-gap-lg)]",
  md: "gap-[var(--rh-sizing-common-input-padding-gap-md)]",
  sm: "gap-[var(--rh-sizing-common-input-padding-gap-sm)]",
  xsm: "gap-[var(--rh-sizing-common-input-padding-gap-xsm)]",
}

const iconOnlyClasses: Record<ButtonSize, string> = {
  lg: "size-[var(--rh-sizing-base-module-7)] p-0",
  md: "size-[var(--rh-sizing-base-module-5)] p-0",
  sm: "size-[var(--rh-sizing-base-module-4-5)] p-0",
  xsm: "size-[calc(var(--rh-sizing-base-module-4)-var(--rh-sizing-base-module-0-5))] p-0",
}

const iconSlotClasses: Record<ButtonSize, string> = {
  lg: "w-[var(--rh-sizing-base-module-3)] [&_svg]:size-[var(--rh-sizing-base-module-3)]",
  md: "w-[var(--rh-sizing-base-module-2-5)] [&_svg]:size-[var(--rh-sizing-base-module-3)]",
  sm: "w-[var(--rh-sizing-base-module-2)] [&_svg]:size-[var(--rh-sizing-base-module-2-5)]",
  xsm: "w-[var(--rh-sizing-base-module-2)] [&_svg]:size-[var(--rh-sizing-base-module-2)]",
}

const counterClasses: Record<ButtonSize, string> = {
  lg: "min-w-[var(--rh-sizing-button-counter-min-width-lg)] px-[var(--rh-sizing-button-counter-padding-px-lg)] text-[length:var(--rh-sizing-typography-font-size-lg)] leading-[var(--rh-sizing-typography-line-height-lg)]",
  md: "min-w-[var(--rh-sizing-button-counter-min-width-md)] px-[var(--rh-sizing-button-counter-padding-px-md)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)]",
  sm: "min-w-[var(--rh-sizing-button-counter-min-width-sm)] px-[var(--rh-sizing-button-counter-padding-px-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)]",
  xsm: "min-w-[var(--rh-sizing-button-counter-min-width-sm)] px-[var(--rh-sizing-button-counter-padding-px-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)]",
}

const appearanceClasses: Record<
  ButtonAppearance,
  { default: string; hover: string; disabled: string }
> = {
  primary: {
    default:
      "bg-[var(--rh-theme-fill-brand)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
    hover:
      "bg-[var(--rh-theme-fill-brand-hover)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  default: {
    default:
      "bg-[var(--rh-theme-fill-neutral)] text-[var(--rh-theme-text-neutral-primary)]",
    hover:
      "bg-[var(--rh-theme-fill-neutral-hover)] text-[var(--rh-theme-text-neutral-primary)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  ghost: {
    default: "bg-transparent text-[var(--rh-theme-text-neutral-primary)]",
    hover:
      "bg-[var(--rh-theme-fill-neutral-hover)] text-[var(--rh-theme-text-neutral-primary)]",
    disabled: "bg-transparent text-[var(--rh-theme-text-neutral-disabled)]",
  },
  destructive: {
    default:
      "bg-[var(--rh-theme-fill-error-light)] text-[var(--rh-theme-text-error)]",
    hover:
      "bg-[var(--rh-theme-fill-error-light-hover)] text-[var(--rh-theme-text-error)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  contrast: {
    default:
      "bg-[var(--rh-theme-fill-contrast)] text-[var(--rh-theme-text-neutral-primary-static)]",
    hover:
      "bg-[var(--rh-theme-fill-contrast-hover)] text-[var(--rh-theme-text-neutral-primary-static)]",
    disabled:
      "bg-[var(--rh-theme-fill-contrast-disabled)] text-[var(--rh-theme-text-neutral-contrast-disabled)]",
  },
  inherit: {
    default: "bg-transparent text-inherit",
    hover: "bg-current/8 text-inherit",
    disabled: "bg-transparent text-[var(--rh-theme-text-neutral-disabled)]",
  },
}

const appearanceHoverClasses: Record<ButtonAppearance, string> = {
  primary:
    "hover:bg-[var(--rh-theme-fill-brand-hover)] hover:text-[var(--rh-theme-text-neutral-primary-contrast)]",
  default:
    "hover:bg-[var(--rh-theme-fill-neutral-hover)] hover:text-[var(--rh-theme-text-neutral-primary)]",
  ghost:
    "hover:bg-[var(--rh-theme-fill-neutral-hover)] hover:text-[var(--rh-theme-text-neutral-primary)]",
  destructive:
    "hover:bg-[var(--rh-theme-fill-error-light-hover)] hover:text-[var(--rh-theme-text-error)]",
  contrast:
    "hover:bg-[var(--rh-theme-fill-contrast-hover)] hover:text-[var(--rh-theme-text-neutral-primary-static)]",
  inherit: "hover:bg-current/8 hover:text-inherit",
}

const counterToneClasses: Record<ButtonAppearance, string> = {
  primary:
    "bg-[var(--rh-theme-fill-contrast-static)] text-[var(--rh-theme-text-brand)]",
  default:
    "bg-[var(--rh-theme-fill-neutral-dark)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
  ghost:
    "bg-[var(--rh-theme-fill-neutral-dark)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
  destructive:
    "bg-[var(--rh-theme-fill-contrast-static)] text-[var(--rh-theme-text-error)]",
  contrast:
    "bg-[var(--rh-theme-fill-neutral-dark)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
  inherit:
    "bg-current text-[var(--rh-theme-fill-contrast-static)]",
}

function resolveAppearance(
  appearance: ButtonAppearance | undefined,
  variant: ButtonProps["variant"],
): ButtonAppearance {
  if (appearance) {
    return appearance
  }

  if (
    variant === "primary" ||
    variant === "default" ||
    variant === "ghost" ||
    variant === "destructive" ||
    variant === "contrast" ||
    variant === "inherit"
  ) {
    return variant
  }

  if (variant === "outline" || variant === "outlined") {
    return "default"
  }

  if (variant === "secondary") {
    return "default"
  }

  if (variant === "link" || variant === "text") {
    return "ghost"
  }

  return "primary"
}

function resolveSize(size: ButtonProps["size"]): ButtonSize {
  if (size === "lg" || size === "sm" || size === "md" || size === "xsm") {
    return size
  }

  return "md"
}

function renderIcon(icon: React.ReactNode | boolean | undefined) {
  if (icon === false) {
    return null
  }

  if (icon === true || icon === undefined) {
    return <CheckCircle2 aria-hidden="true" strokeWidth={2.25} />
  }

  return icon
}

function Button({
  appearance,
  asChild = false,
  children,
  className,
  counter = false,
  counterValue = 1,
  disabled = false,
  endIcon = true,
  iconOnly = false,
  label,
  loading = false,
  size = "md",
  startIcon = true,
  state = "default",
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  const resolvedAppearance = resolveAppearance(appearance, variant)
  const resolvedSize = resolveSize(size)
  const stateKey = disabled ? "disabled" : state
  const Comp = asChild ? Slot : "button"
  const content = label ?? children ?? "Label"
  const resolvedStartIcon = loading ? (
    <LoaderCircle aria-hidden="true" className="animate-spin" strokeWidth={2.25} />
  ) : (
    renderIcon(startIcon)
  )
  const resolvedEndIcon = loading ? null : renderIcon(endIcon)

  return (
    <Comp
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[var(--rh-sizing-common-input-shape-border-radius)] border border-transparent font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed",
        sizeClasses[resolvedSize],
        gapClasses[resolvedSize],
        appearanceClasses[resolvedAppearance][stateKey],
        !disabled && appearanceHoverClasses[resolvedAppearance],
        (iconOnly || size === "icon") && iconOnlyClasses[resolvedSize],
        className,
      )}
      data-slot="button"
      disabled={disabled}
      type={type}
      {...props}
    >
      {resolvedStartIcon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-end",
            iconSlotClasses[resolvedSize],
          )}
        >
          {resolvedStartIcon}
        </span>
      )}

      {!iconOnly && counter && (
        <span
          className={cn(
            "flex h-[var(--rh-sizing-base-module-3)] shrink-0 items-center justify-center rounded-full font-semibold tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
            counterClasses[resolvedSize],
            counterToneClasses[resolvedAppearance],
            disabled && "bg-transparent text-current",
          )}
        >
          {counterValue}
        </span>
      )}

      {!iconOnly && (
        <span className="whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          {content}
        </span>
      )}

      {!iconOnly && resolvedEndIcon && (
        <span
          className={cn(
            "flex shrink-0 items-center",
            iconSlotClasses[resolvedSize],
          )}
        >
          {resolvedEndIcon}
        </span>
      )}
    </Comp>
  )
}

export { Button }
export type { ButtonAppearance, ButtonProps, ButtonSize, ButtonState }
