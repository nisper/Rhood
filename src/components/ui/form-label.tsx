import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

type FormLabelColor = "default" | "error" | "disabled"
type FormLabelFontWeight = "regular" | "medium"

type FormLabelProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  color?: FormLabelColor
  fontWeight?: FormLabelFontWeight
  required?: boolean
  startIcon?: boolean
}

const textClasses: Record<FormLabelFontWeight, string> = {
  regular: "rh-typography-b1",
  medium: "rh-typography-b1-med",
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
          "min-w-0 break-words",
          colorClasses[color],
          textClasses[fontWeight],
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
            "text-base leading-6 tracking-[0.15px]",
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
}
