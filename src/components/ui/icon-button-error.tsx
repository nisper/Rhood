import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type IconButtonErrorSize = "lg" | "md" | "sm"
type IconButtonErrorState = "default" | "hovered"
type IconButtonErrorStyle = "filled" | "ghost"

type IconButtonErrorProps = React.ComponentProps<"button"> & {
  iconSize?: IconButtonErrorSize
  size?: IconButtonErrorSize
  state?: IconButtonErrorState
  appearance?: IconButtonErrorStyle
}

const paddingClasses: Record<IconButtonErrorSize, string> = {
  lg: "p-3",
  md: "p-2",
  sm: "p-[5px]",
}

function resolveBackground({
  appearance,
  state,
}: Pick<IconButtonErrorProps, "appearance" | "state">) {
  if (appearance === "filled") {
    return state === "hovered"
      ? "bg-[var(--parser-fill-error-hover)]"
      : "bg-[var(--parser-fill-error)]"
  }

  return state === "hovered"
    ? "bg-[var(--parser-fill-error-light-hover)]"
    : "bg-transparent"
}

/**
 * Parser error icon button matching the Figma `IconButtonError` component set.
 */
function IconButtonError({
  appearance = "ghost",
  className,
  iconSize = "md",
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: IconButtonErrorProps) {
  const backgroundClass = resolveBackground({ appearance, state })
  const hoverBackgroundClass =
    appearance === "filled"
      ? "hover:bg-[var(--parser-fill-error-hover)]"
      : "hover:bg-[var(--parser-fill-error-light-hover)]"
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
            ? "text-[var(--parser-text-primary-contrast)]"
            : "text-[var(--parser-text-error)]",
        )}
      >
        <Star aria-hidden="true" className="size-[80%]" strokeWidth={2} />
      </span>
    </button>
  )
}

export { IconButtonError }
export type {
  IconButtonErrorProps,
  IconButtonErrorSize,
  IconButtonErrorState,
  IconButtonErrorStyle,
}
