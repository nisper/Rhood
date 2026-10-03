import * as React from "react"
import { CircleX, Star } from "lucide-react"

import { cn } from "@/lib/utils"

type ChipSize = "lg" | "md" | "sm"
type ChipColor = "neutral" | "brand" | "error" | "warning" | "success" | "contrast"
type ChipAppearance = "outlined" | "muted" | "contrast"

type ChipProps = React.ComponentProps<"div"> & {
  appearance?: ChipAppearance
  children?: React.ReactNode
  color?: ChipColor
  icon?: boolean
  label?: boolean
  remove?: boolean
  propDelete?: boolean
  size?: ChipSize
}

const sizeTokens: Record<
  ChipSize,
  {
    chipPadding: string
    iconSize: string
    labelClass: string
    labelPadding: string
    deleteSize: string
  }
> = {
  lg: {
    chipPadding: "px-2 py-2",
    iconSize: "size-6",
    labelClass: "rh-typography-b1",
    labelPadding: "px-2",
    deleteSize: "size-6",
  },
  md: {
    chipPadding: "px-1 py-1",
    iconSize: "size-6",
    labelClass: "rh-typography-b1",
    labelPadding: "px-2",
    deleteSize: "size-6",
  },
  sm: {
    chipPadding: "px-[3px] py-[3px]",
    iconSize: "size-5",
    labelClass: "rh-typography-b2",
    labelPadding: "px-1",
    deleteSize: "size-5",
  },
}

const toneTokens: Record<
  Exclude<ChipColor, "contrast">,
  {
    mutedBg: string
    outlinedBorder: string
    text: string
    icon: string
    contrastBg: string
  }
> = {
  neutral: {
    mutedBg: "bg-[color:var(--parser-fill-neutral)]",
    outlinedBorder: "border-[color:var(--parser-border-light)]",
    text: "text-[color:var(--parser-text-neutral-primary)]",
    icon: "text-[color:var(--parser-text-neutral-primary)]",
    contrastBg: "bg-[color:var(--parser-fill-neutral-dark)]",
  },
  brand: {
    mutedBg: "bg-[color:var(--parser-fill-brand-light)]",
    outlinedBorder: "border-[color:var(--parser-border-brand-light)]",
    text: "text-[color:var(--parser-text-brand)]",
    icon: "text-[color:var(--parser-text-brand)]",
    contrastBg: "bg-[color:var(--parser-fill-brand)]",
  },
  error: {
    mutedBg: "bg-[color:var(--parser-fill-error-light)]",
    outlinedBorder: "border-[color:var(--parser-border-error-light)]",
    text: "text-[color:var(--parser-text-error)]",
    icon: "text-[color:var(--parser-text-error)]",
    contrastBg: "bg-[color:var(--parser-fill-error)]",
  },
  warning: {
    mutedBg: "bg-[color:var(--parser-fill-warning-light)]",
    outlinedBorder: "border-[color:var(--parser-border-warning-light)]",
    text: "text-[color:var(--parser-text-warning)]",
    icon: "text-[color:var(--parser-text-warning)]",
    contrastBg: "bg-[color:var(--parser-fill-warning)]",
  },
  success: {
    mutedBg: "bg-[color:var(--parser-fill-success-light)]",
    outlinedBorder: "border-[color:var(--parser-border-success-light)]",
    text: "text-[color:var(--parser-text-success)]",
    icon: "text-[color:var(--parser-text-success)]",
    contrastBg: "bg-[color:var(--parser-fill-success)]",
  },
}

function resolveTextTone(color: ChipColor, appearance: ChipAppearance) {
  if (appearance === "contrast") {
    return "text-[color:var(--parser-text-primary-contrast)]"
  }

  if (color === "contrast") {
    return "text-[color:var(--parser-text-primary-static)]"
  }

  return toneTokens[color].text
}

function resolveBackground(color: ChipColor, appearance: ChipAppearance) {
  if (appearance === "outlined") {
    return "bg-white"
  }

  if (appearance === "contrast") {
    if (color === "neutral") {
      return "bg-[color:var(--parser-fill-neutral-dark)]"
    }

    if (color === "contrast") {
      return "bg-[color:var(--parser-fill-contrast-static)]"
    }

    return toneTokens[color].contrastBg
  }

  if (color === "contrast") {
    return "bg-[color:var(--parser-fill-contrast-light)]"
  }

  return toneTokens[color].mutedBg
}

function resolveBorder(color: ChipColor, appearance: ChipAppearance) {
  if (appearance !== "outlined") {
    return "border-transparent"
  }

  if (color === "contrast") {
    return "border-[color:var(--parser-border-contrast)]"
  }

  return toneTokens[color].outlinedBorder
}

function resolveIconTone(color: ChipColor, appearance: ChipAppearance) {
  if (appearance === "contrast") {
    return "text-[color:var(--parser-text-primary-contrast)]"
  }

  if (color === "contrast") {
    return "text-[color:var(--parser-text-primary-static)]"
  }

  return toneTokens[color].icon
}

/**
 * Parser chip matching the Figma `Chip` component set.
 */
function Chip({
  appearance = "outlined",
  children = "Chip",
  className,
  color = "neutral",
  icon = true,
  label = true,
  propDelete,
  remove,
  size = "lg",
  ...props
}: ChipProps) {
  const background = resolveBackground(color, appearance)
  const border = resolveBorder(color, appearance)
  const textTone = resolveTextTone(color, appearance)
  const iconTone = resolveIconTone(color, appearance)
  const isRemovable = remove ?? propDelete ?? true

  return (
    <div
      className={cn(
        "inline-flex min-w-8 items-center justify-center overflow-hidden rounded-full border",
        sizeTokens[size].chipPadding,
        background,
        border,
        textTone,
        className,
      )}
      {...props}
    >
      {icon && (
        <Star
          aria-hidden="true"
          className={cn(
            "shrink-0",
            sizeTokens[size].iconSize,
            iconTone,
          )}
          strokeWidth={2.1}
        />
      )}

      {label && (
        <span
          className={cn(
            "whitespace-nowrap",
            sizeTokens[size].labelClass,
            sizeTokens[size].labelPadding,
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>
      )}

      {isRemovable && (
        <button
          aria-label="Remove chip"
          className={cn(
            "ml-1 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full opacity-50 transition-opacity hover:opacity-80",
            sizeTokens[size].deleteSize,
            iconTone,
          )}
          type="button"
        >
          <CircleX aria-hidden="true" className="size-full" strokeWidth={1.9} />
        </button>
      )}
    </div>
  )
}

export { Chip }
export type { ChipAppearance, ChipColor, ChipProps, ChipSize }
