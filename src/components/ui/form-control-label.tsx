import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type FormControlLabelColor = "default" | "error" | "disabled"
type FormControlLabelFontWeight = "regular" | "medium"
type FormControlLabelPaddingTop = "none" | "sm"
type FormControlLabelSize = "md" | "sm"

type FormControlLabelProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  color?: FormControlLabelColor
  fontWeight?: FormControlLabelFontWeight
  gutterBottom?: boolean
  paddingTop?: FormControlLabelPaddingTop
  required?: boolean
  size?: FormControlLabelSize
  startIcon?: boolean
}

const textClasses: Record<
  FormControlLabelSize,
  Record<FormControlLabelFontWeight, string>
> = {
  md: {
    regular: "text-base leading-6 tracking-[0.024px] font-normal",
    medium: "text-base leading-6 tracking-[0.024px] [font-weight:500]",
  },
  sm: {
    regular: "text-sm leading-[1.43] tracking-[0.0238px] font-normal",
    medium: "text-sm leading-[1.43] tracking-[0.0238px] [font-weight:500]",
  },
}

const colorClasses: Record<FormControlLabelColor, string> = {
  default: "text-[color:var(--parser-text-neutral-primary)]",
  error: "text-[color:var(--parser-text-error)]",
  disabled: "text-[color:var(--parser-text-disabled)]",
}

function FormControlLabel({
  children = "Label",
  className,
  color = "default",
  fontWeight = "regular",
  gutterBottom = false,
  paddingTop = "none",
  required = false,
  size = "md",
  startIcon = false,
  ...props
}: FormControlLabelProps) {
  const isTight = paddingTop === "none"
  const isBottomGap = gutterBottom && paddingTop === "sm"
  const padClass =
    isBottomGap
      ? "pt-2"
      : isTight
        ? "pb-2"
        : ""

  return (
    <div
      className={cn("flex items-start", padClass, className)}
      {...props}
    >
      {(color === "default" || color === "disabled" || color === "error") &&
        startIcon && (
          <span className="flex shrink-0 items-center pr-2">
            <Star className="size-5 shrink-0" strokeWidth={2} />
          </span>
        )}

      <span
        className={cn(
          "whitespace-nowrap",
          colorClasses[color],
          textClasses[size][fontWeight],
        )}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {children}
      </span>

      {required && (
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 pl-1 text-[color:var(--parser-text-error)]",
            size === "md"
              ? "text-base leading-6 tracking-[0.15px]"
              : "text-sm leading-[1.43] tracking-[0.0238px]",
          )}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          *
        </span>
      )}
    </div>
  )
}

export { FormControlLabel }
export type {
  FormControlLabelColor,
  FormControlLabelFontWeight,
  FormControlLabelPaddingTop,
  FormControlLabelProps,
  FormControlLabelSize,
}
