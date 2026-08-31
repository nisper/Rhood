import * as React from "react"
import { CheckCircle2, LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

type BrandButtonSize = "lg" | "md" | "sm" | "xsm"
type BrandButtonVariant = "contained" | "outlined" | "text"

type BrandButtonProps = React.ComponentProps<"button"> & {
  counter?: boolean
  counterValue?: React.ReactNode
  endIcon?: React.ReactNode | boolean
  iconOnly?: boolean
  loading?: boolean
  size?: BrandButtonSize
  startIcon?: React.ReactNode | boolean
  variant?: BrandButtonVariant
}

const sizeClasses: Record<BrandButtonSize, string> = {
  lg: "min-h-14 gap-2 px-4 py-4 text-base leading-6 tracking-normal [&_svg]:size-6",
  md: "min-h-10 gap-2 px-3 py-2 text-base leading-6 tracking-[0.15px] [&_svg]:size-6",
  sm: "min-h-[30px] gap-2 px-3 py-[5px] text-sm leading-5 tracking-[0.15px] [&_svg]:size-5",
  xsm: "min-h-6 gap-1 px-2 py-1 text-xs leading-4 tracking-[0.15px] [&_svg]:size-4",
}

const textSizeClasses: Record<BrandButtonSize, string> = {
  lg: "px-2 py-4",
  md: "px-2 py-2",
  sm: "px-2 py-[5px]",
  xsm: "px-2 py-1",
}

const iconOnlyClasses: Record<BrandButtonSize, string> = {
  lg: "size-14 p-0",
  md: "h-10 w-11 p-0",
  sm: "size-[30px] p-0",
  xsm: "size-6 p-0",
}

const iconSlotClasses: Record<BrandButtonSize, string> = {
  lg: "w-6",
  md: "w-6",
  sm: "w-4",
  xsm: "w-4",
}

const counterClasses: Record<BrandButtonSize, string> = {
  lg: "min-w-6 px-1.5 text-base leading-6 tracking-normal",
  md: "min-w-6 px-1.5 text-base leading-6 tracking-[0.15px]",
  sm: "min-w-5 px-1 text-sm leading-5 tracking-[0.15px]",
  xsm: "min-w-5 px-1 text-xs leading-4 tracking-[0.15px]",
}

const variantClasses: Record<BrandButtonVariant, string> = {
  contained:
    "border border-transparent bg-[var(--parser-fill-brand)] text-[var(--parser-text-primary-contrast)] hover:bg-[var(--parser-fill-brand-hover)]",
  outlined:
    "border border-[var(--parser-border-brand-light)] bg-transparent text-[var(--parser-text-brand)] hover:bg-[var(--parser-fill-brand-light-hover)]",
  text: "border border-transparent bg-transparent text-[var(--parser-text-brand)] hover:bg-[var(--parser-fill-brand-light-hover)]",
}

const disabledClasses: Record<BrandButtonVariant, string> = {
  contained:
    "border-transparent bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  outlined:
    "border-[var(--parser-border-disabled)] bg-transparent text-[var(--parser-text-disabled)]",
  text: "border-transparent bg-transparent text-[var(--parser-text-disabled)]",
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

/**
 * Parser brand button matching the Figma `button-brand` component set.
 */
function BrandButton({
  children = "Label",
  className,
  counter = false,
  counterValue = 1,
  disabled = false,
  endIcon = true,
  iconOnly = false,
  loading = false,
  size = "lg",
  startIcon = true,
  type = "button",
  variant = "contained",
  ...props
}: BrandButtonProps) {
  const iconColor =
    variant === "contained" && !disabled
      ? "text-[var(--parser-text-primary-contrast)]"
      : "text-current"
  const counterTone =
    variant === "contained" && !disabled
      ? "bg-[var(--parser-fill-contrast-static)] text-[var(--parser-text-brand)]"
      : "bg-[var(--parser-fill-brand)] text-[var(--parser-text-primary-contrast)]"
  const resolvedStartIcon = loading ? (
    <LoaderCircle aria-hidden="true" className="animate-spin" strokeWidth={2.25} />
  ) : (
    renderIcon(startIcon)
  )
  const resolvedEndIcon = loading ? null : renderIcon(endIcon)

  return (
    <button
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        variant === "text" && textSizeClasses[size],
        disabled && disabledClasses[variant],
        iconOnly && iconOnlyClasses[size],
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {resolvedStartIcon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            iconSlotClasses[size],
            iconColor,
          )}
        >
          {resolvedStartIcon}
        </span>
      )}
      {!iconOnly && counter && (
        <span
          className={cn(
            "flex h-6 shrink-0 items-center justify-center rounded-full font-semibold",
            counterClasses[size],
            counterTone,
            disabled && "bg-transparent text-current",
          )}
        >
          {counterValue}
        </span>
      )}
      {!iconOnly && <span className="whitespace-nowrap">{children}</span>}
      {!iconOnly && resolvedEndIcon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            iconSlotClasses[size],
            iconColor,
          )}
        >
          {resolvedEndIcon}
        </span>
      )}
    </button>
  )
}

export { BrandButton }
export type { BrandButtonProps, BrandButtonSize, BrandButtonVariant }
