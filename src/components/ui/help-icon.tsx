import * as React from "react"
import lgDefaultIcon from "@/assets/help-icon/lg-default.svg"
import lgHoveredIcon from "@/assets/help-icon/lg-hovered.svg"
import mdDefaultIcon from "@/assets/help-icon/md-default.svg"
import mdHoveredIcon from "@/assets/help-icon/md-hovered.svg"
import smDefaultIcon from "@/assets/help-icon/sm-default.svg"
import smHoveredIcon from "@/assets/help-icon/sm-hovered.svg"
import { CircleQuestionMark } from "lucide-react"

import { cn } from "@/lib/utils"

type HelpIconSize = "lg" | "md" | "sm"
type HelpIconState = "default" | "hovered"
type HelpIconVariant = "circle-question-mark" | "info"

type HelpIconProps = React.ComponentProps<"button"> & {
  size?: HelpIconSize
  state?: HelpIconState
  icon?: HelpIconVariant
  tooltip?: React.ReactNode
}

const sizeTokens: Record<HelpIconSize, { iconSize: string; wrapperSize: string }> = {
  lg: { iconSize: "size-6", wrapperSize: "size-7" },
  md: { iconSize: "size-5", wrapperSize: "size-6" },
  sm: { iconSize: "size-4", wrapperSize: "size-5" },
}

const iconSources: Record<HelpIconSize, Record<HelpIconState, string>> = {
  lg: { default: lgDefaultIcon, hovered: lgHoveredIcon },
  md: { default: mdDefaultIcon, hovered: mdHoveredIcon },
  sm: { default: smDefaultIcon, hovered: smHoveredIcon },
}

/**
 * Help icon matching the Figma `HelpIcon` component set.
 */
function HelpIcon({
  className,
  size = "lg",
  state = "default",
  icon = "circle-question-mark",
  tooltip = "Typography",
  type = "button",
  ...props
}: HelpIconProps) {
  const tokens = sizeTokens[size]
  const isHovered = state === "hovered"

  return (
    <button
      className={cn("group relative inline-flex items-center justify-center rounded-full p-[2px] text-current disabled:pointer-events-none", tokens.wrapperSize, className)}
      type={type}
      {...props}
    >
      {icon === "circle-question-mark" ? (
        <CircleQuestionMark
          aria-hidden="true"
          className={cn(
            "block shrink-0",
            tokens.iconSize,
            isHovered
              ? "text-[var(--parser-text-neutral-primary)]"
              : "text-[var(--parser-text-neutral-secondary)] group-hover:text-[var(--parser-text-neutral-primary)]",
          )}
          strokeWidth={2}
        />
      ) : isHovered ? (
        <img
          alt=""
          aria-hidden="true"
          className={cn("block shrink-0", tokens.iconSize)}
          src={iconSources[size].hovered}
        />
      ) : (
        <>
          <img
            alt=""
            aria-hidden="true"
            className={cn("block shrink-0 group-hover:hidden", tokens.iconSize)}
            src={iconSources[size].default}
          />
          <img
            alt=""
            aria-hidden="true"
            className={cn("hidden shrink-0 group-hover:block", tokens.iconSize)}
            src={iconSources[size].hovered}
          />
        </>
      )}

      <span
        className={cn(
          "absolute bottom-full left-1/2 z-10 mb-1 max-w-[350px] -translate-x-1/2 rounded-[4px] bg-[color:var(--parser-fill-neutral-dark-ultra)] px-1.5 py-0.5 text-sm leading-[1.43] tracking-[0.0238px] text-white",
          !isHovered && "hidden group-hover:block group-focus-visible:block",
        )}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {tooltip}
      </span>
    </button>
  )
}

export { HelpIcon }
export type { HelpIconProps, HelpIconSize, HelpIconState, HelpIconVariant }
