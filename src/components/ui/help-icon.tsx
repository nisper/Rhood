import * as React from "react"
import { CircleHelp } from "lucide-react"

import { cn } from "@/lib/utils"

type HelpIconSize = "lg" | "md" | "sm"
type HelpIconState = "default" | "hovered"

type HelpIconProps = React.ComponentProps<"button"> & {
  size?: HelpIconSize
  state?: HelpIconState
  tooltip?: React.ReactNode
}

const sizeTokens: Record<
  HelpIconSize,
  {
    iconSize: string
    wrapperSize: string
  }
> = {
  lg: {
    iconSize: "size-7",
    wrapperSize: "size-8",
  },
  md: {
    iconSize: "size-5",
    wrapperSize: "size-6",
  },
  sm: {
    iconSize: "size-4",
    wrapperSize: "size-5",
  },
}

/**
 * Parser help icon matching the Figma `HelpIcon` component set.
 */
function HelpIcon({
  className,
  size = "lg",
  state = "default",
  tooltip = "Typography",
  type = "button",
  ...props
}: HelpIconProps) {
  const tokens = sizeTokens[size]
  const isHovered = state === "hovered"

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full p-[2px] text-current",
        tokens.wrapperSize,
        className,
      )}
      type={type}
      {...props}
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center text-[var(--parser-text-neutral-secondary)]",
          tokens.iconSize,
          isHovered && "text-[var(--parser-text-neutral-primary)]",
        )}
      >
        <CircleHelp aria-hidden="true" className="size-full" strokeWidth={2} />
      </span>

      {isHovered && (
        <span
          className="absolute left-full top-1/2 ml-2 max-w-[350px] -translate-y-1/2 whitespace-nowrap rounded-[4px] bg-[color:var(--parser-fill-neutral-dark-ultra)] px-1.5 py-0.5 text-sm leading-[1.43] tracking-[0.0238px] text-white shadow-sm"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {tooltip}
        </span>
      )}
    </button>
  )
}

export { HelpIcon }
export type { HelpIconProps, HelpIconSize, HelpIconState }
