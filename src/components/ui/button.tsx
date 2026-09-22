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

type ButtonSize = "md" | "sm" | "xsm"
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

type LegacyButtonSize = "default" | "icon"

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
  md: "min-h-[calc(var(--spacing)*10)] px-[var(--rh-sizing-common-input-padding-px-md)] py-[var(--rh-sizing-common-input-padding-py-md)] text-[length:var(--rh-sizing-typography-font-size-md)] leading-[var(--rh-sizing-typography-line-height-md)] tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
  sm: "min-h-[calc(var(--spacing)*9)] px-[var(--rh-sizing-common-input-padding-px-sm)] py-[var(--rh-sizing-common-input-padding-py-sm)] text-[length:var(--rh-sizing-typography-font-size-sm)] leading-[var(--rh-sizing-typography-line-height-sm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
  xsm: "min-h-[calc(calc(var(--spacing)*8)-calc(var(--spacing)*1))] px-[var(--rh-sizing-common-input-padding-px-xsm)] py-[var(--rh-sizing-common-input-padding-py-xsm)] text-[length:var(--rh-sizing-typography-font-size-xsm)] leading-[var(--rh-sizing-typography-line-height-xsm)] tracking-[var(--rh-sizing-typography-letter-spacing-sm)]",
}

const typographyClasses: Record<ButtonSize, string> = {
  md: "rh-typography-body-1-medium",
  sm: "rh-typography-body-2-medium",
  xsm: "font-[family-name:var(--rh-typography-font-family-sans)] font-[480]",
}

const gapClasses: Record<ButtonSize, string> = {
  md: "gap-[var(--rh-sizing-common-input-padding-gap-md)]",
  sm: "gap-[var(--rh-sizing-common-input-padding-gap-sm)]",
  xsm: "gap-[var(--rh-sizing-common-input-padding-gap-xsm)]",
}

const iconOnlyClasses: Record<ButtonSize, string> = {
  md: "size-[calc(var(--spacing)*10)] p-0",
  sm: "size-[calc(var(--spacing)*9)] p-0",
  xsm: "size-[calc(calc(var(--spacing)*8)-calc(var(--spacing)*1))] p-0",
}

const iconSlotClasses: Record<ButtonSize, string> = {
  md: "w-[calc(var(--spacing)*5)] [&_svg]:size-[calc(var(--spacing)*6)]",
  sm: "w-[calc(var(--spacing)*4)] [&_svg]:size-[calc(var(--spacing)*5)]",
  xsm: "w-[calc(var(--spacing)*4)] [&_svg]:size-[calc(var(--spacing)*4)]",
}

const counterClasses: Record<ButtonSize, string> = {
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
  if (size === "sm" || size === "md" || size === "xsm") {
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
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[var(--rh-sizing-common-input-shape-border-radius)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed",
        typographyClasses[resolvedSize],
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
            "flex h-[calc(var(--spacing)*6)] shrink-0 items-center justify-center rounded-full tracking-[var(--rh-sizing-typography-letter-spacing-md)]",
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
