import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type IconButtonContrastSize = "lg" | "md" | "sm"
type IconButtonContrastState = "default" | "hovered"
type IconButtonContrastStyle = "filled" | "ghost"

type IconButtonContrastProps = React.ComponentProps<"button"> & {
  iconSize?: IconButtonContrastSize
  size?: IconButtonContrastSize
  state?: IconButtonContrastState
  appearance?: IconButtonContrastStyle
}

const paddingClasses: Record<IconButtonContrastSize, string> = {
  lg: "p-3",
  md: "p-2",
  sm: "p-[5px]",
}

function resolveBackground({
  appearance,
  state,
}: Pick<IconButtonContrastProps, "appearance" | "state">) {
  if (appearance === "filled") {
    return state === "hovered"
      ? "bg-[var(--parser-fill-contrast-hover)]"
      : "bg-[var(--parser-fill-contrast)]"
  }

  return state === "hovered"
    ? "bg-[var(--parser-fill-contrast-light-hover)]"
    : "bg-transparent"
}

/**
 * Parser contrast icon button matching the Figma `IconButtonContrast` component set.
 */
function IconButtonContrast({
  appearance = "ghost",
  className,
  iconSize = "md",
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: IconButtonContrastProps) {
  const backgroundClass = resolveBackground({ appearance, state })
  const hoverBackgroundClass =
    appearance === "filled"
      ? "hover:bg-[var(--parser-fill-contrast-hover)]"
      : "hover:bg-[var(--parser-fill-contrast-light-hover)]"
  const wrapperSizeClass = paddingClasses[size]
  const iconClassName =
    iconSize === "md"
      ? "size-6"
      : size === "sm" && iconSize === "lg"
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
      type={type}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center",
          iconClassName,
          appearance === "filled"
            ? "text-[var(--parser-text-neutral-primary)]"
            : "text-[var(--parser-text-primary-contrast)]",
        )}
      >
        <Star aria-hidden="true" className="size-[80%]" strokeWidth={2} />
      </span>
    </button>
  )
}

export { IconButtonContrast }
export type {
  IconButtonContrastProps,
  IconButtonContrastSize,
  IconButtonContrastState,
  IconButtonContrastStyle,
}
