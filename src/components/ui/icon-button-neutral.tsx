import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type IconButtonNeutralSize = "lg" | "md" | "sm"
type IconButtonNeutralState = "default" | "hovered"
type IconButtonNeutralStyle = "ghost" | "filled"

type IconButtonNeutralProps = React.ComponentProps<"button"> & {
  disabled?: boolean
  iconSize?: IconButtonNeutralSize
  size?: IconButtonNeutralSize
  state?: IconButtonNeutralState
  appearance?: IconButtonNeutralStyle
}

const paddingClasses: Record<IconButtonNeutralSize, string> = {
  lg: "p-3",
  md: "p-2",
  sm: "p-[5px]",
}

function resolveBackground({
  appearance,
  disabled,
  state,
}: Pick<IconButtonNeutralProps, "appearance" | "disabled" | "state">) {
  if (disabled) {
    return "bg-[var(--parser-fill-disabled)]"
  }

  if (appearance === "filled") {
    return state === "hovered"
      ? "bg-[var(--parser-fill-neutral-hover)]"
      : "bg-[var(--parser-fill-neutral)]"
  }

  return state === "hovered"
    ? "bg-[var(--parser-fill-neutral-hover)]"
    : "bg-transparent"
}

/**
 * Parser neutral icon button matching the Figma `IconButtonNeutral` component set.
 */
function IconButtonNeutral({
  appearance = "ghost",
  className,
  disabled = false,
  iconSize = "md",
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: IconButtonNeutralProps) {
  const backgroundClass = resolveBackground({ appearance, disabled, state })
  const hoverBackgroundClass = disabled
    ? ""
    : "hover:bg-[var(--parser-fill-neutral-hover)]"
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
            : "text-[var(--parser-text-neutral-primary)]",
        )}
      >
        <Star aria-hidden="true" className="size-[80%]" strokeWidth={2} />
      </span>
    </button>
  )
}

export { IconButtonNeutral }
export type {
  IconButtonNeutralProps,
  IconButtonNeutralSize,
  IconButtonNeutralState,
  IconButtonNeutralStyle,
}
