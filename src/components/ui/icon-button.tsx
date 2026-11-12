import * as React from "react"
import { Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type IconButtonAppearance = "primary" | "secondary" | "ghost" | "contrast" | "contrast-ghost" | "inherit"
type IconButtonSize = "md" | "sm" | "xsm"
type IconButtonState = "default" | "hovered"
type LegacyIconButtonAppearance = "filled" | "ghost"
type LegacyIconButtonSize = "lg"

type IconButtonProps = Omit<React.ComponentProps<"button">, "style"> & {
  appearance?: IconButtonAppearance | LegacyIconButtonAppearance
  counter?: boolean
  counterValue?: React.ReactNode
  icon?: React.ReactNode | boolean
  iconSize?: IconButtonSize | LegacyIconButtonSize
  isDisabled?: boolean
  size?: IconButtonSize | LegacyIconButtonSize
  state?: IconButtonState
  style?: IconButtonAppearance
}

const sizeClasses: Record<IconButtonSize, string> = {
  md: "size-[calc(var(--spacing)*10)] p-[var(--rh-sizing-common-input-py-sm)]",
  sm: "size-[calc(var(--spacing)*9)] p-[var(--rh-sizing-common-input-py-sm)]",
  xsm: "size-[calc(calc(var(--spacing)*8)-calc(var(--spacing)*1))] p-[var(--rh-sizing-common-input-py-xsm)]",
}

const iconSizeClasses: Record<IconButtonSize | LegacyIconButtonSize, string> = {
  lg: "[&_svg]:size-[var(--rh-sizing-common-input-icon-width-md)]",
  md: "[&_svg]:size-[calc(var(--spacing)*6)]",
  sm: "[&_svg]:size-[calc(var(--spacing)*5)]",
  xsm: "[&_svg]:size-[calc(var(--spacing)*4)]",
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
      "bg-[var(--rh-theme-fill-neutral-dark)] text-[var(--rh-theme-text-neutral-primary-contrast)]",
    disabled:
      "bg-[var(--rh-theme-fill-disabled)] text-[var(--rh-theme-text-neutral-disabled)]",
  },
  "contrast-ghost": {
    default: "bg-transparent text-[var(--rh-theme-text-neutral-primary-contrast)]",
    hovered: "bg-transparent text-[var(--rh-theme-text-neutral-primary-contrast)] opacity-70",
    disabled: "bg-transparent text-[var(--rh-theme-text-neutral-disabled)]",
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
  contrast:
    "hover:bg-[var(--rh-theme-fill-neutral-dark)] hover:text-[var(--rh-theme-text-neutral-primary-contrast)]",
  "contrast-ghost": "hover:opacity-70",
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
    appearance === "contrast-ghost" ||
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

function resolveIconSize(size: IconButtonProps["iconSize"] | undefined, buttonSize: IconButtonSize): IconButtonSize | LegacyIconButtonSize {
  if (size === "lg" || size === "md" || size === "sm" || size === "xsm") {
    return size
  }

  return buttonSize
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
  counter = false,
  counterValue = 1,
  disabled = false,
  icon = true,
  iconSize,
  isDisabled = false,
  size = "md",
  state = "default",
  style,
  type = "button",
  ...props
}: IconButtonProps) {
  const resolvedAppearance = resolveAppearance({ appearance, style })
  const resolvedSize = resolveSize(size)
  const resolvedIconSize = resolveIconSize(iconSize, resolvedSize)
  const resolvedDisabled = disabled || isDisabled
  const resolvedState = resolvedDisabled ? "disabled" : state

  return (
    <button
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--rh-sizing-common-input-shape-border-radius)] border-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] disabled:pointer-events-none disabled:cursor-not-allowed",
        counter ? "overflow-visible" : "overflow-hidden",
        sizeClasses[resolvedSize],
        iconSizeClasses[resolvedIconSize],
        toneClasses[resolvedAppearance][resolvedState],
        !resolvedDisabled && resolvedState === "default" && hoverClasses[resolvedAppearance],
        className,
      )}
      disabled={resolvedDisabled}
      type={type}
      {...props}
    >
      {renderIcon(icon)}
      {counter && (
        <Badge
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 translate-x-1/2"
          color="brand"
          shape="default"
        >
          {counterValue}
        </Badge>
      )}
    </button>
  )
}

export { IconButton }
export type { IconButtonAppearance, IconButtonProps, IconButtonSize, IconButtonState }
