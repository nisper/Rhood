import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type ShowMoreSize = "lg" | "md" | "sm"
type ShowMoreState = "default" | "hover"
type ShowMoreAppearance = "brand" | "neutral"

type ShowMoreProps = React.ComponentProps<"button"> & {
  appearance?: ShowMoreAppearance
  label?: React.ReactNode
  size?: ShowMoreSize
  state?: ShowMoreState
}

const sizeTokens: Record<
  ShowMoreSize,
  {
    text: string
    gap: string
    paddingY: string
    iconSize: string
    iconInset: string
  }
> = {
  lg: {
    text: "text-base leading-6 tracking-normal",
    gap: "gap-2",
    paddingY: "py-4",
    iconSize: "size-6",
    iconInset: "absolute inset-[33.33%_20.83%]",
  },
  md: {
    text: "text-base leading-6 tracking-[0.15px]",
    gap: "gap-2",
    paddingY: "py-2",
    iconSize: "size-6",
    iconInset: "absolute inset-[33.33%_20.83%]",
  },
  sm: {
    text: "text-sm leading-5 tracking-[0.15px]",
    gap: "gap-2",
    paddingY: "py-2",
    iconSize: "size-5",
    iconInset: "absolute inset-[33.33%_20.83%]",
  },
}

const appearanceTokens: Record<
  ShowMoreAppearance,
  {
    text: string
    hoverBg: string
  }
> = {
  brand: {
    text: "text-[color:var(--parser-text-brand)]",
    hoverBg: "bg-[color:var(--parser-fill-brand-light-hover)]",
  },
  neutral: {
    text: "text-[color:var(--parser-text-neutral-primary)]",
    hoverBg: "bg-[color:var(--parser-fill-neutral-hover)]",
  },
}

/**
 * Parser show more control matching the Figma `ShowMore` component.
 */
function ShowMore({
  appearance = "brand",
  className,
  label = "Читать дальше",
  size = "lg",
  state = "default",
  type = "button",
  ...props
}: ShowMoreProps) {
  const isHover = state === "hover"

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--parser-focus-ring)]",
        sizeTokens[size].gap,
        sizeTokens[size].paddingY,
        appearanceTokens[appearance].text,
        isHover && appearanceTokens[appearance].hoverBg,
        className,
      )}
      type={type}
      {...props}
    >
      <span
        className={cn("relative shrink-0 whitespace-nowrap font-semibold", sizeTokens[size].text)}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </span>

      <span className={cn("flex shrink-0 items-center justify-center", sizeTokens[size].iconSize)}>
        <ChevronDown aria-hidden="true" className="size-[80%]" strokeWidth={2.25} />
      </span>
    </button>
  )
}

export { ShowMore }
export type { ShowMoreAppearance, ShowMoreProps, ShowMoreSize, ShowMoreState }
