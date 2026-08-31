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
  propDelete?: boolean
  size?: ChipSize
  thumbnail?: boolean
  thumbnailLabel?: React.ReactNode
}

const sizeTokens: Record<
  ChipSize,
  {
    chipPadding: string
    iconSize: string
    labelClass: string
    labelPadding: string
    thumbSize: string
    thumbText: string
    deleteSize: string
  }
> = {
  lg: {
    chipPadding: "px-2 py-2",
    iconSize: "size-6",
    labelClass: "text-base leading-[1.5] tracking-[0.024px]",
    labelPadding: "px-2",
    thumbSize: "size-6",
    thumbText: "text-xs leading-[1.66] tracking-[0.4px]",
    deleteSize: "size-6",
  },
  md: {
    chipPadding: "px-1 py-1",
    iconSize: "size-6",
    labelClass: "text-base leading-[1.5] tracking-[0.024px]",
    labelPadding: "px-2",
    thumbSize: "size-6",
    thumbText: "text-xs leading-[1.66] tracking-[0.4px]",
    deleteSize: "size-6",
  },
  sm: {
    chipPadding: "px-[3px] py-[3px]",
    iconSize: "size-5",
    labelClass: "text-sm leading-[1.43] tracking-[0.0238px]",
    labelPadding: "px-1",
    thumbSize: "size-5",
    thumbText: "text-[10px] leading-[1.66] tracking-[0.4px]",
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
    thumbBg: string
    thumbText: string
  }
> = {
  neutral: {
    mutedBg: "bg-[color:var(--parser-fill-neutral)]",
    outlinedBorder: "border-[color:var(--parser-border-light)]",
    text: "text-[color:var(--parser-text-neutral-primary)]",
    icon: "text-[color:var(--parser-text-neutral-primary)]",
    thumbBg: "bg-[color:var(--parser-fill-neutral-dark)]",
    thumbText: "text-[color:var(--parser-text-primary-contrast)]",
  },
  brand: {
    mutedBg: "bg-[color:var(--parser-fill-brand-light)]",
    outlinedBorder: "border-[color:var(--parser-border-brand-light)]",
    text: "text-[color:var(--parser-text-brand)]",
    icon: "text-[color:var(--parser-text-brand)]",
    thumbBg: "bg-[color:var(--parser-fill-brand)]",
    thumbText: "text-[color:var(--parser-text-primary-contrast)]",
  },
  error: {
    mutedBg: "bg-[color:var(--parser-fill-error-light)]",
    outlinedBorder: "border-[color:var(--parser-border-error-light)]",
    text: "text-[color:var(--parser-text-error)]",
    icon: "text-[color:var(--parser-text-error)]",
    thumbBg: "bg-[color:var(--parser-fill-error)]",
    thumbText: "text-[color:var(--parser-text-primary-contrast)]",
  },
  warning: {
    mutedBg: "bg-[color:var(--parser-fill-warning-light)]",
    outlinedBorder: "border-[color:var(--parser-border-warning-light)]",
    text: "text-[color:var(--parser-text-warning)]",
    icon: "text-[color:var(--parser-text-warning)]",
    thumbBg: "bg-[color:var(--parser-fill-warning)]",
    thumbText: "text-[color:var(--parser-text-primary-contrast)]",
  },
  success: {
    mutedBg: "bg-[color:var(--parser-fill-success-light)]",
    outlinedBorder: "border-[color:var(--parser-border-success-light)]",
    text: "text-[color:var(--parser-text-success)]",
    icon: "text-[color:var(--parser-text-success)]",
    thumbBg: "bg-[color:var(--parser-fill-success)]",
    thumbText: "text-[color:var(--parser-text-primary-contrast)]",
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

    return toneTokens[color].thumbBg
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

function resolveThumb(color: ChipColor, appearance: ChipAppearance) {
  if (appearance === "contrast") {
    if (color === "neutral") {
      return {
        bg: "bg-[color:var(--parser-fill-contrast)]",
        text: "text-[color:var(--parser-text-primary-static)]",
      }
    }

    if (color === "contrast") {
      return {
        bg: "bg-[color:var(--parser-fill-contrast-static)]",
        text: "text-[color:var(--parser-text-primary-static)]",
      }
    }

    return {
      bg: "bg-[color:var(--parser-fill-contrast)]",
      text: "text-[color:var(--parser-text-primary-static)]",
    }
  }

  if (color === "contrast") {
    return {
      bg: "bg-[color:var(--parser-fill-contrast-static)]",
      text: "text-[color:var(--parser-text-primary-static)]",
    }
  }

  return {
    bg: toneTokens[color].thumbBg,
    text: toneTokens[color].thumbText,
  }
}

function ChipThumbnail({
  color,
  appearance,
  size,
  children = "EB",
}: {
  color: ChipColor
  appearance: ChipAppearance
  size: ChipSize
  children?: React.ReactNode
}) {
  const tone = resolveThumb(color, appearance)
  const thumbTextClass = sizeTokens[size].thumbText

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        sizeTokens[size].thumbSize,
        tone.bg,
      )}
    >
      <span
        className={cn(
          "font-medium tracking-[0.4px]",
          thumbTextClass,
          tone.text,
        )}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {children}
      </span>
    </div>
  )
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
  propDelete = true,
  size = "lg",
  thumbnail = true,
  thumbnailLabel = "EB",
  ...props
}: ChipProps) {
  const background = resolveBackground(color, appearance)
  const border = resolveBorder(color, appearance)
  const textTone = resolveTextTone(color, appearance)
  const iconTone = resolveIconTone(color, appearance)

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
      {thumbnail && (
        <div className={cn("mr-2", size === "sm" ? "mr-1" : "mr-2")}>
          <ChipThumbnail
            appearance={appearance}
            color={color}
            size={size}
          >
            {thumbnailLabel}
          </ChipThumbnail>
        </div>
      )}

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
            "whitespace-nowrap font-normal",
            sizeTokens[size].labelClass,
            sizeTokens[size].labelPadding,
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {children}
        </span>
      )}

      {propDelete && (
        <button
          aria-label="Remove chip"
          className={cn(
            "ml-1 inline-flex shrink-0 items-center justify-center rounded-full opacity-50 transition-opacity hover:opacity-80",
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
