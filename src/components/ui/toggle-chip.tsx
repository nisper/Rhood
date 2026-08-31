import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type ToggleChipSize = "lg" | "md" | "sm"

type ToggleChipProps = React.ComponentProps<"button"> & {
  checked?: boolean
  label?: boolean
  size?: ToggleChipSize
  startIcon?: boolean
  thumbnail?: boolean
}

const sizeTokens: Record<
  ToggleChipSize,
  {
    container: string
    iconSize: string
    label: string
    paddingX: string
    paddingY: string
    thumbSize: "20px" | "24px"
    gap: string
  }
> = {
  lg: {
    container: "min-h-11",
    iconSize: "size-6",
    label: "text-base leading-[1.5] tracking-[0.024px]",
    paddingX: "px-2",
    paddingY: "py-2",
    thumbSize: "24px",
    gap: "gap-2",
  },
  md: {
    container: "min-h-10",
    iconSize: "size-6",
    label: "text-base leading-[1.5] tracking-[0.024px]",
    paddingX: "px-1",
    paddingY: "py-1",
    thumbSize: "24px",
    gap: "gap-2",
  },
  sm: {
    container: "min-h-8",
    iconSize: "size-5",
    label: "text-sm leading-[1.43] tracking-[0.0238px]",
    paddingX: "px-[3px]",
    paddingY: "py-[3px]",
    thumbSize: "20px",
    gap: "gap-1",
  },
}

function ToggleChip({
  checked = false,
  className,
  label = true,
  size = "lg",
  startIcon = true,
  thumbnail = true,
  type = "button",
  ...props
}: ToggleChipProps) {
  const s = sizeTokens[size]
  const isChecked = checked

  return (
    <button
      aria-pressed={checked}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors duration-150",
        s.container,
        s.paddingX,
        s.paddingY,
        s.gap,
        isChecked
          ? "border-transparent bg-[color:var(--parser-fill-neutral-dark)] text-[color:var(--parser-text-primary-contrast)]"
          : "border-[color:var(--parser-border-light)] bg-white text-[color:var(--parser-text-neutral-primary)]",
        className,
      )}
      type={type}
      {...props}
    >
      {!isChecked && thumbnail && <Thumbnail size={s.thumbSize} checked={false} />}

      {!isChecked && startIcon && (
        <Star
          aria-hidden="true"
          className={cn("shrink-0 text-current", s.iconSize)}
          strokeWidth={2.1}
        />
      )}

      {isChecked && thumbnail && <Thumbnail size={s.thumbSize} checked />}

      {isChecked && startIcon && (
        <Star
          aria-hidden="true"
          className={cn("shrink-0 text-current", s.iconSize)}
          strokeWidth={2.1}
        />
      )}

      {label && (
        <span
          className={cn("whitespace-nowrap font-normal", s.label)}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Chip
        </span>
      )}
    </button>
  )
}

function Thumbnail({
  checked,
  size,
}: {
  checked: boolean
  size: "20px" | "24px"
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        size === "20px" ? "size-5" : "size-6",
        checked
          ? "bg-[color:var(--parser-fill-contrast)] text-[color:var(--parser-text-primary-static)]"
          : "bg-[color:var(--parser-fill-neutral-dark)] text-[color:var(--parser-text-primary-contrast)]",
      )}
    >
      <span
        className={cn(
          "font-medium tracking-[0.4px]",
          size === "20px" ? "text-[10px] leading-[1.66]" : "text-xs leading-[1.66]",
        )}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        ЕВ
      </span>
    </div>
  )
}

export { ToggleChip }
export type { ToggleChipProps, ToggleChipSize }
