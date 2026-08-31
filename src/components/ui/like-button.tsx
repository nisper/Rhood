import * as React from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

type LikeButtonState = "default" | "hover"

type LikeButtonProps = React.ComponentProps<"button"> & {
  checked?: boolean
  state?: LikeButtonState
}

function resolveBackground(checked: boolean, state: LikeButtonState) {
  if (checked && state === "hover") {
    return "bg-[var(--parser-fill-neutral-dark-hover)]"
  }

  if (checked) {
    return "bg-[var(--parser-fill-neutral-dark)]"
  }

  if (state === "hover") {
    return "bg-[var(--parser-fill-neutral-hover)]"
  }

  return "bg-transparent"
}

/**
 * Parser like button matching the Figma `LikeButton` component set.
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
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full p-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)] hover:bg-[var(--parser-fill-neutral-hover)]",
        backgroundClass,
        checked && "hover:bg-[var(--parser-fill-neutral-dark-hover)]",
        className,
      )}
      type={type}
      {...props}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center",
          checked
            ? "text-[var(--parser-text-primary-contrast)]"
            : "text-[var(--parser-text-neutral-primary)]",
        )}
      >
        <Heart aria-hidden="true" className={cn("size-5", checked && "fill-current")} strokeWidth={2} />
      </span>
    </button>
  )
}

export { LikeButton }
export type { LikeButtonProps, LikeButtonState }
