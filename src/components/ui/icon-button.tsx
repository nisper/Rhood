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
  md: "size-10 p-2 [&_svg]:size-6",
  sm: "size-9 p-2 [&_svg]:size-5",
  xsm: "size-7 p-1.5 [&_svg]:size-4",
}

const toneClasses: Record<
  IconButtonAppearance,
  { default: string; hovered: string; disabled: string }
> = {
  primary: {
    default:
      "bg-[var(--parser-fill-brand)] text-[var(--parser-text-primary-contrast)]",
    hovered:
      "bg-[var(--parser-fill-brand-hover)] text-[var(--parser-text-primary-contrast)]",
    disabled:
      "bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  },
  secondary: {
    default:
      "bg-[var(--parser-fill-neutral)] text-[var(--parser-text-neutral-primary)]",
    hovered:
      "bg-[var(--parser-fill-neutral-hover)] text-[var(--parser-text-neutral-primary)]",
    disabled:
      "bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  },
  ghost: {
    default: "bg-transparent text-[var(--parser-text-neutral-primary)]",
    hovered:
      "bg-[var(--parser-fill-neutral-hover)] text-[var(--parser-text-neutral-primary)]",
    disabled: "bg-transparent text-[var(--parser-text-disabled)]",
  },
  contrast: {
    default:
      "bg-[var(--parser-fill-contrast)] text-[var(--parser-text-primary-static)]",
    hovered:
      "bg-[var(--parser-fill-contrast-hover)] text-[var(--parser-text-primary-static)]",
    disabled:
      "bg-[var(--parser-fill-disabled)] text-[var(--parser-text-disabled)]",
  },
  inherit: {
    default: "bg-transparent text-inherit",
    hovered: "bg-[var(--parser-fill-neutral-hover)] text-inherit",
    disabled: "bg-transparent text-[var(--parser-text-disabled)]",
  },
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
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed",
        sizeClasses[resolvedSize],
        toneClasses[resolvedAppearance][resolvedState],
        !disabled && resolvedState === "default" && resolvedAppearance === "primary" && "hover:bg-[var(--parser-fill-brand-hover)]",
        !disabled && resolvedState === "default" && resolvedAppearance !== "primary" && "hover:bg-[var(--parser-fill-neutral-hover)]",
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
