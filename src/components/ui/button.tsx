import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { CheckCircle2, LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Figma: https://www.figma.com/design/MbjYVdGZqH95blipWMHXtp/Parser-%E2%80%93%C2%A0Components?node-id=10647-1326
 */
type ButtonAppearance =
  | "primary"
  | "secondary"
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
  lg: "min-h-14 gap-2 px-4 py-4 text-base leading-6 tracking-normal",
  md: "min-h-10 gap-2 px-3 py-2 text-base leading-6 tracking-[0.15px]",
  sm: "min-h-9 gap-2 px-3 py-2 text-sm leading-5 tracking-[0.15px]",
  xsm: "min-h-7 gap-1 px-2 py-1.5 text-xs leading-4 tracking-[0.15px]",
}

const iconOnlyClasses: Record<ButtonSize, string> = {
  lg: "size-14 p-0",
  md: "size-10 p-0",
  sm: "size-9 p-0",
  xsm: "size-7 p-0",
}

const iconSlotClasses: Record<ButtonSize, string> = {
  lg: "w-6 [&_svg]:size-6",
  md: "w-5 [&_svg]:size-6",
  sm: "w-4 [&_svg]:size-5",
  xsm: "w-4 [&_svg]:size-4",
}

const counterClasses: Record<ButtonSize, string> = {
  lg: "min-w-6 px-1.5 text-base leading-6",
  md: "min-w-6 px-1.5 text-base leading-6",
  sm: "min-w-5 px-1 text-sm leading-5",
  xsm: "min-w-5 px-1 text-sm leading-5",
}

const appearanceClasses: Record<
  ButtonAppearance,
  { default: string; hover: string; disabled: string }
> = {
  primary: {
    default:
      "bg-[var(--parser-fill-brand)] text-[var(--parser-text-primary-contrast)]",
    hover:
      "bg-[var(--parser-fill-brand-hover)] text-[var(--parser-text-primary-contrast)]",
    disabled:
      "bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  },
  secondary: {
    default:
      "bg-[var(--parser-fill-neutral)] text-[var(--parser-text-neutral-primary)]",
    hover:
      "bg-[var(--parser-fill-neutral-hover)] text-[var(--parser-text-neutral-primary)]",
    disabled:
      "bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  },
  ghost: {
    default: "bg-transparent text-[var(--parser-text-neutral-primary)]",
    hover:
      "bg-[var(--parser-fill-neutral-hover)] text-[var(--parser-text-neutral-primary)]",
    disabled: "bg-transparent text-[var(--parser-text-disabled)]",
  },
  destructive: {
    default:
      "bg-[var(--parser-fill-error-light)] text-[var(--parser-text-error)]",
    hover:
      "bg-[var(--parser-fill-error-light-hover)] text-[var(--parser-text-error)]",
    disabled:
      "bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  },
  contrast: {
    default:
      "bg-[var(--parser-fill-contrast)] text-[var(--parser-text-primary-static)]",
    hover:
      "bg-[var(--parser-fill-contrast-hover)] text-[var(--parser-text-primary-static)]",
    disabled:
      "bg-[var(--parser-fill-contrast-disabled)] text-[var(--parser-text-neutral-contrast-disabled)]",
  },
  inherit: {
    default: "bg-transparent text-inherit",
    hover: "bg-current/8 text-inherit",
    disabled: "bg-transparent text-[var(--parser-text-disabled)]",
  },
}

const appearanceHoverClasses: Record<ButtonAppearance, string> = {
  primary:
    "hover:bg-[var(--parser-fill-brand-hover)] hover:text-[var(--parser-text-primary-contrast)]",
  secondary:
    "hover:bg-[var(--parser-fill-neutral-hover)] hover:text-[var(--parser-text-neutral-primary)]",
  ghost:
    "hover:bg-[var(--parser-fill-neutral-hover)] hover:text-[var(--parser-text-neutral-primary)]",
  destructive:
    "hover:bg-[var(--parser-fill-error-light-hover)] hover:text-[var(--parser-text-error)]",
  contrast:
    "hover:bg-[var(--parser-fill-contrast-hover)] hover:text-[var(--parser-text-primary-static)]",
  inherit: "hover:bg-current/8 hover:text-inherit",
}

const counterToneClasses: Record<ButtonAppearance, string> = {
  primary:
    "bg-[var(--parser-fill-contrast-static)] text-[var(--parser-text-brand)]",
  secondary:
    "bg-[var(--parser-fill-neutral-dark)] text-[var(--parser-text-primary-contrast)]",
  ghost:
    "bg-[var(--parser-fill-neutral-dark)] text-[var(--parser-text-primary-contrast)]",
  destructive:
    "bg-[var(--parser-fill-contrast-static)] text-[var(--parser-text-error)]",
  contrast:
    "bg-[var(--parser-fill-neutral-dark)] text-[var(--parser-text-primary-contrast)]",
  inherit:
    "bg-current text-[var(--parser-fill-contrast-static)]",
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
    variant === "secondary" ||
    variant === "ghost" ||
    variant === "destructive" ||
    variant === "contrast" ||
    variant === "inherit"
  ) {
    return variant
  }

  if (variant === "outline" || variant === "outlined") {
    return "secondary"
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
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-transparent font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed",
        sizeClasses[resolvedSize],
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
            "flex h-6 shrink-0 items-center justify-center rounded-full font-semibold tracking-[0.15px]",
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
