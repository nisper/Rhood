import * as React from "react"
import { Star, X } from "lucide-react"

import { cn } from "@/lib/utils"

type TagColor =
  | "neutral"
  | "brand"
  | "error"
  | "warning"
  | "success"
  | "contrast"
type TagStyle = "outlined" | "muted" | "contrast"

type TagProps = React.ComponentProps<"div"> & {
  color?: TagColor
  icon?: boolean
  label?: boolean
  propDelete?: boolean
  style?: TagStyle
}

const toneTokens: Record<
  Exclude<TagColor, "contrast">,
  {
    outlinedBorder: string
    mutedBg: string
    contrastBg: string
    text: string
  }
> = {
  neutral: {
    outlinedBorder: "border-[color:var(--parser-border-light)]",
    mutedBg: "bg-[color:var(--parser-fill-neutral)]",
    contrastBg: "bg-[color:var(--parser-fill-neutral-dark)]",
    text: "text-[color:var(--parser-text-neutral-primary)]",
  },
  brand: {
    outlinedBorder: "border-[color:var(--parser-border-brand-light)]",
    mutedBg: "bg-[color:var(--parser-fill-brand-light)]",
    contrastBg: "bg-[color:var(--parser-fill-brand)]",
    text: "text-[color:var(--parser-text-brand)]",
  },
  error: {
    outlinedBorder: "border-[color:var(--parser-border-error-light)]",
    mutedBg: "bg-[color:var(--parser-fill-error-light)]",
    contrastBg: "bg-[color:var(--parser-fill-error)]",
    text: "text-[color:var(--parser-text-error)]",
  },
  warning: {
    outlinedBorder: "border-[color:var(--parser-border-warning-light)]",
    mutedBg: "bg-[color:var(--parser-fill-warning-light)]",
    contrastBg: "bg-[color:var(--parser-fill-warning)]",
    text: "text-[color:var(--parser-text-warning)]",
  },
  success: {
    outlinedBorder: "border-[color:var(--parser-border-success-light)]",
    mutedBg: "bg-[color:var(--parser-fill-success-light)]",
    contrastBg: "bg-[color:var(--parser-fill-success)]",
    text: "text-[color:var(--parser-text-success)]",
  },
}

function resolveBackground(color: TagColor, style: TagStyle) {
  if (style === "contrast") {
    if (color === "contrast") {
      return "bg-[color:var(--parser-fill-contrast-static)]"
    }

    return toneTokens[color].contrastBg
  }

  if (color === "contrast") {
    return "bg-[color:var(--parser-fill-contrast-light)]"
  }

  return style === "muted" ? toneTokens[color].mutedBg : "bg-white"
}

function resolveBorder(color: TagColor, style: TagStyle) {
  if (style !== "outlined") {
    return "border-transparent"
  }

  if (color === "contrast") {
    return "border-[color:var(--parser-border-contrast)]"
  }

  return toneTokens[color].outlinedBorder
}

function resolveText(color: TagColor, style: TagStyle) {
  if (style === "contrast") {
    return "text-[color:var(--parser-text-primary-contrast)]"
  }

  if (color === "contrast") {
    return "text-[color:var(--parser-text-primary-static)]"
  }

  return toneTokens[color].text
}

function resolveIconClassName(color: TagColor, style: TagStyle) {
  if (style === "contrast") {
    return "text-[color:var(--parser-text-primary-contrast)]"
  }

  if (color === "contrast") {
    return "text-[color:var(--parser-text-primary-static)]"
  }

  return toneTokens[color].text
}

function resolveDeleteIconClassName(color: TagColor, style: TagStyle) {
  if (style === "contrast") {
    return "text-[color:var(--parser-text-primary-contrast)]"
  }

  if (color === "contrast") {
    return "text-[color:var(--parser-text-primary-static)]"
  }

  return toneTokens[color].text
}

/**
 * Parser tag matching the Figma `Tag` component set.
 */
function Tag({
  className,
  color = "neutral",
  icon = false,
  label = true,
  propDelete = true,
  style = "outlined",
  ...props
}: TagProps) {
  const textTone = resolveText(color, style)

  return (
    <div
      className={cn(
        "inline-flex min-w-[24px] items-center justify-center overflow-hidden rounded border px-[3px] relative",
        resolveBackground(color, style),
        resolveBorder(color, style),
        className,
      )}
      {...props}
    >
      {icon && (
        <Star className={cn("size-4 shrink-0", resolveIconClassName(color, style))} strokeWidth={2} />
      )}

      {label && (
        <span
          className={cn(
            "whitespace-nowrap px-1 text-[14px] leading-[1.43] tracking-[0.0238px] font-normal",
            textTone,
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Chip
        </span>
      )}

      {propDelete && (
        <X
          className={cn(
            "size-4 shrink-0",
            resolveDeleteIconClassName(color, style),
            style === "contrast" && "opacity-50",
          )}
          strokeWidth={2}
        />
      )}
    </div>
  )
}

export { Tag }
export type { TagColor, TagProps, TagStyle }
