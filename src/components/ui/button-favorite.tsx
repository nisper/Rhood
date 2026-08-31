import * as React from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

type ButtonFavoriteSize = "md" | "sm" | "xsm"
type ButtonFavoriteState = "default" | "hovered"

type ButtonFavoriteProps = React.ComponentProps<"button"> & {
  checked?: boolean
  size?: ButtonFavoriteSize
  state?: ButtonFavoriteState
}

const sizeTokens: Record<
  ButtonFavoriteSize,
  {
    iconSize: string
    padding: string
    hitSize: string
  }
> = {
  md: {
    iconSize: "size-6",
    padding: "p-[5px]",
    hitSize: "min-w-10 min-h-10",
  },
  sm: {
    iconSize: "size-5",
    padding: "p-[5px]",
    hitSize: "min-w-[30px] min-h-[30px]",
  },
  xsm: {
    iconSize: "size-4",
    padding: "p-1",
    hitSize: "min-w-6 min-h-6",
  },
}

/**
 * Parser favorite button matching the Figma `buttonFavorite` component set.
 */
function ButtonFavorite({
  checked = false,
  className,
  size = "md",
  state = "default",
  type = "button",
  ...props
}: ButtonFavoriteProps) {
  const tokens = sizeTokens[size]
  const isHovered = state === "hovered"

  return (
    <button
      aria-pressed={checked}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-colors duration-150 hover:bg-[color:var(--parser-fill-error-light-hover)]",
        tokens.hitSize,
        tokens.padding,
        isHovered && "bg-[color:var(--parser-fill-error-light-hover)]",
        className,
      )}
      type={type}
      {...props}
    >
      <span
        className={cn(
          "shrink-0",
          tokens.iconSize,
        )}
      >
        <Heart
          className={cn(
            "size-full",
            checked && "fill-current",
            checked
              ? "text-[color:var(--parser-fill-error)]"
              : isHovered
                ? "text-[color:var(--parser-fill-error)]"
                : "text-[color:var(--parser-icon-neutral-secondary)]",
            !checked && "hover:text-[color:var(--parser-fill-error)]",
          )}
          strokeWidth={2}
        />
      </span>
    </button>
  )
}

export { ButtonFavorite }
export type { ButtonFavoriteProps, ButtonFavoriteSize, ButtonFavoriteState }
