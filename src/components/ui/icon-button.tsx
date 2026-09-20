import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type IconButtonAppearance = "primary" | "secondary" | "ghost" | "contrast" | "inherit"
type IconButtonSize = "md" | "sm" | "xsm"
type IconButtonState = "default" | "hovered"
type LegacyIconButtonAppearance = "filled" | "ghost"
type LegacyIconButtonSize = "lg"

type IconButtonProps = Omit<React.ComponentProps<"button">, "style"> & {
  appearance?: IconButtonAppearance | LegacyIconButtonAppearance
  icon?: React.ReactNode | boolean
  iconSize?: IconButtonSize | LegacyIconButtonSize
  size?: IconButtonSize | LegacyIconButtonSize
  state?: IconButtonState
  style?: IconButtonAppearance
}

const sizeClasses: Record<IconButtonSize, string> = {
  md: "size-[calc(var(--spacing)*10)] p-[var(--rh-sizing-common-input-padding-py-sm)] [&_svg]:size-[calc(var(--spacing)*6)]",
  sm: "size-[calc(var(--spacing)*9)] p-[var(--rh-sizing-common-input-padding-py-sm)] [&_svg]:size-[calc(var(--spacing)*5)]",
  xsm: "size-[calc(calc(var(--spacing)*8)-calc(var(--spacing)*1))] p-[var(--rh-sizing-common-input-padding-py-xsm)] [&_svg]:size-[calc(var(--spacing)*4)]",
}

const toneClasses: Record<
  IconButtonAppearance,
  { default: string; hovered: string; disabled: string }
> = {
  primary: {
    default:
      "bg-[var(--rh-theme-fill-brand)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
    hovered:
      "bg-[var(--rh-theme-fill-brand-hover)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  secondary: {
    default:
      "bg-[var(--rh-theme-fill-neutral)] text-[var(--rh-theme-text-neutral-primary)]",
    hovered:
      "bg-[var(--rh-theme-fill-neutral-hover)] text-[var(--rh-theme-text-neutral-primary)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  ghost: {
    default: "bg-transparent text-[var(--rh-theme-text-neutral-primary)]",
    hovered:
      "bg-[var(--rh-theme-fill-neutral-hover)] text-[var(--rh-theme-text-neutral-primary)]",
    disabled: "bg-transparent text-[var(--rh-theme-text-neutral-disabled)]",
  },
  contrast: {
    default:
      "bg-[var(--rh-theme-fill-contrast)] text-[var(--rh-theme-text-neutral-primary-static)]",
    hovered:
      "bg-[var(--rh-theme-fill-contrast-hover)] text-[var(--rh-theme-text-neutral-primary-static)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  inherit: {
    default: "bg-transparent text-inherit",
    hovered: "bg-[var(--rh-theme-fill-neutral-hover)] text-inherit",
    disabled: "bg-transparent text-[var(--rh-theme-text-neutral-disabled)]",
  },
}

const hoverClasses: Record<IconButtonAppearance, string> = {
  primary: "hover:bg-[var(--rh-theme-fill-brand-hover)]",
  secondary: "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
  ghost: "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
  contrast: "hover:bg-[var(--rh-theme-fill-contrast-hover)]",
  inherit: "hover:bg-[var(--rh-theme-fill-neutral-hover)]",
}

function resolveAppearance({
  appearance,
  style,
}: Pick<IconButtonProps, "appearance" | "style">): IconButtonAppearance {
  if (style) {
    return style
  }

  if (
    appearance === "primary" ||
    appearance === "secondary" ||
    appearance === "ghost" ||
    appearance === "contrast" ||
    appearance === "inherit"
  ) {
    return appearance
  }

  if (appearance === "filled") {
    return "primary"
  }

  return "primary"
}

function resolveSize(size: IconButtonProps["size"]): IconButtonSize {
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
    return <Star aria-hidden="true" strokeWidth={2} />
  }

  return icon
}

function IconButton({
  appearance,
  className,
  disabled = false,
  icon = true,
  size = "md",
  state = "default",
  style,
  type = "button",
  ...props
}: IconButtonProps) {
  const resolvedAppearance = resolveAppearance({ appearance, style })
  const resolvedSize = resolveSize(size)
  const resolvedState = disabled ? "disabled" : state

  return (
    <button
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed",
        sizeClasses[resolvedSize],
        toneClasses[resolvedAppearance][resolvedState],
        !disabled && resolvedState === "default" && hoverClasses[resolvedAppearance],
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {renderIcon(icon)}
    </button>
  )
}

export { IconButton }
export type { IconButtonAppearance, IconButtonProps, IconButtonSize, IconButtonState }
