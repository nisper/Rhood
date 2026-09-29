import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type FormLabelColor = "default" | "error" | "disabled"
type FormLabelFontWeight = "regular" | "medium"
type FormLabelSize = "md" | "sm"

type FormLabelProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  color?: FormLabelColor
  fontWeight?: FormLabelFontWeight
  required?: boolean
  size?: FormLabelSize
  startIcon?: boolean
}

const textClasses: Record<
  FormLabelSize,
  Record<FormLabelFontWeight, string>
> = {
  md: {
    regular: "rh-typography-b1",
    medium: "rh-typography-b1-med",
  },
  sm: {
    regular: "rh-typography-b2",
    medium: "rh-typography-b2-med",
  },
}

const colorClasses: Record<FormLabelColor, string> = {
  default: "text-[color:var(--parser-text-neutral-primary)]",
  error: "text-[color:var(--parser-text-error)]",
  disabled: "text-[color:var(--parser-text-disabled)]",
}

function FormLabel({
  children = "Label",
  className,
  color = "default",
  fontWeight = "regular",
  required = false,
  size = "md",
  startIcon = false,
  ...props
}: FormLabelProps) {
  return (
    <div
      className={cn("flex items-start", className)}
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

export { FormLabel }
export type {
  FormLabelColor,
  FormLabelFontWeight,
  FormLabelProps,
  FormLabelSize,
}
