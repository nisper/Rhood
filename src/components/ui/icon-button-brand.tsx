import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type IconButtonBrandSize = "lg" | "md" | "sm"
type IconButtonBrandState = "default" | "hovered"
type IconButtonBrandStyle = "filled" | "ghost"

type IconButtonBrandProps = React.ComponentProps<"button"> & {
  disabled?: boolean
  iconSize?: IconButtonBrandSize
  size?: IconButtonBrandSize
  state?: IconButtonBrandState
  appearance?: IconButtonBrandStyle
}

const paddingClasses: Record<IconButtonBrandSize, string> = {
  lg: "p-3",
  md: "p-2",
  sm: "p-[5px]",
}

function resolveBackground({
  disabled,
  state,
  appearance,
}: Pick<IconButtonBrandProps, "disabled" | "state" | "appearance">) {
  if (disabled) {
    return "bg-[var(--parser-fill-disabled)]"
  }

  if (appearance === "filled") {
    return state === "hovered"
      ? "bg-[var(--parser-fill-brand-hover)]"
      : "bg-[var(--parser-fill-brand)]"
  }

  return state === "hovered"
    ? "bg-[var(--parser-fill-brand-light-hover)]"
    : "bg-transparent"
}

/**
 * Parser brand icon button matching the Figma `IconButtonBrand` component set.
 */
function IconButtonBrand({
  className,
  disabled = false,
  appearance = "ghost",
  iconSize = "md",
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: IconButtonBrandProps) {
  const backgroundClass = resolveBackground({ disabled, state, appearance })
  const hoverBackgroundClass = disabled
    ? ""
    : appearance === "filled"
      ? "hover:bg-[var(--parser-fill-brand-hover)]"
      : "hover:bg-[var(--parser-fill-brand-light-hover)]"
  const wrapperSizeClass = paddingClasses[size]
  const iconClassName =
    iconSize === "md" && !disabled
      ? "size-6"
      : size === "sm" && iconSize === "lg" && !disabled
        ? "size-8"
        : "size-5"

  return (
    <button
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed",
        backgroundClass,
        hoverBackgroundClass,
        wrapperSizeClass,
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center",
          iconClassName,
          disabled
            ? "text-[var(--parser-text-disabled)]"
            : appearance === "filled"
              ? "text-[var(--parser-text-primary-contrast)]"
              : "text-[var(--parser-text-brand)]",
        )}
      >
        <Star aria-hidden="true" className="size-[80%]" strokeWidth={2} />
      </span>
    </button>
  )
}

export { IconButtonBrand }
export type {
  IconButtonBrandProps,
  IconButtonBrandSize,
  IconButtonBrandState,
  IconButtonBrandStyle,
}
