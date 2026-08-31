import * as React from "react"
import { CircleHelp } from "lucide-react"

import { cn } from "@/lib/utils"

type IconButtonDarkSize = "lg" | "md" | "sm"
type IconButtonDarkState = "default" | "hovered"

type IconButtonDarkProps = React.ComponentProps<"button"> & {
  iconSize?: IconButtonDarkSize
  size?: IconButtonDarkSize
  state?: IconButtonDarkState
}

const paddingClasses: Record<IconButtonDarkSize, string> = {
  lg: "p-3",
  md: "p-2",
  sm: "p-[5px]",
}

function resolveBackground(state: IconButtonDarkState) {
  return state === "hovered"
    ? "bg-[var(--parser-fill-neutral-dark-hover)]"
    : "bg-[var(--parser-fill-neutral-dark)]"
}

/**
 * Parser dark icon button matching the Figma `IconButtonDark` component set.
 */
function IconButtonDark({
  className,
  iconSize = "md",
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: IconButtonDarkProps) {
  const backgroundClass = resolveBackground(state)
  const hoverBackgroundClass = "hover:bg-[var(--parser-fill-neutral-dark-hover)]"
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
      <span className={cn("flex shrink-0 items-center justify-center text-[var(--parser-text-primary-contrast)]", iconClassName)}>
        <CircleHelp aria-hidden="true" className="size-[80%]" strokeWidth={2} />
      </span>
    </button>
  )
}

export { IconButtonDark }
export type { IconButtonDarkProps, IconButtonDarkSize, IconButtonDarkState }
