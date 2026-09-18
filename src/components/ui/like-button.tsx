import * as React from "react"
import { ThumbsUp } from "lucide-react"

import { cn } from "@/lib/utils"

type LikeButtonState = "default" | "hover"

type LikeButtonProps = React.ComponentProps<"button"> & {
  checked?: boolean
  state?: LikeButtonState
}

function resolveBackground(checked: boolean, state: LikeButtonState) {
  if (checked && state === "hover") {
    return "bg-[var(--rh-theme-fill-neutral-dark-hover)]"
  }

  if (checked) {
    return "bg-[var(--rh-theme-fill-neutral-dark)]"
  }

  if (state === "hover") {
    return "bg-[var(--rh-theme-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

/**
 * Like button matching the Figma `LikeButton` component set.
 */
function LikeButton({
  checked = false,
  className,
  state = "default",
  type = "button",
  ...props
}: LikeButtonProps) {
  const backgroundClass = resolveBackground(checked, state)

  return (
    <button
      aria-pressed={checked}
      className={cn(
        "inline-flex size-[var(--rh-sizing-base-module-5)] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full p-[var(--rh-sizing-base-module-1)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)] hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        backgroundClass,
        checked && "hover:bg-[var(--rh-theme-fill-neutral-dark-hover)]",
        className,
      )}
      type={type}
      {...props}
    >
      <span
        className={cn(
          "flex size-[var(--rh-sizing-base-module-3)] shrink-0 items-center justify-center",
          checked
            ? "text-[var(--rh-theme-text-neutral-primary-contrast)]"
            : "text-[var(--rh-theme-text-neutral-primary)]",
        )}
      >
        <ThumbsUp aria-hidden="true" className="size-[var(--rh-sizing-base-module-2-5)]" strokeWidth={2} />
      </span>
    </button>
  )
}

export { LikeButton }
export type { LikeButtonProps, LikeButtonState }
