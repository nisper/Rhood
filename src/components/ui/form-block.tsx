import * as React from "react"

import { FormLabel, type FormLabelProps } from "@/components/ui/form-label"
import { cn } from "@/lib/utils"

type FormBlockProps = React.ComponentProps<"div"> & {
  /** Control placed next to or below the label. */
  children: React.ReactNode
  /** Layout direction for the label and control. */
  direction?: "column" | "row"
  /** Space between the label and control. */
  gap?: React.CSSProperties["gap"]
  /** Visible label for the control. */
  label?: React.ReactNode
  /** Width of the label. Overrides FormSet.labelWidth. */
  labelWidth?: React.CSSProperties["width"]
  /** Props forwarded to FormLabel. */
  labelProps?: Omit<FormLabelProps, "children">
}

/** Groups one form label and its control in a shared layout. */
function FormBlock({
  children,
  className,
  direction = "column",
  gap,
  label = "Label",
  labelProps,
  labelWidth,
  style,
  ...props
}: FormBlockProps) {
  const resolvedGap = gap ?? (direction === "row" ? "calc(var(--spacing) * 4)" : "calc(var(--spacing) * 1)")
  const { className: labelClassName, style: labelStyle, ...restLabelProps } = labelProps ?? {}
  const resolvedLabelWidth = labelWidth ?? labelStyle?.width ?? "var(--rhood-form-set-label-width)"

  return (
    <div
      className={cn(
        "flex min-w-0",
        direction === "column" ? "flex-col" : "flex-row items-start",
        className,
      )}
      style={{ ...style, gap: resolvedGap }}
      {...props}
    >
      <FormLabel
        {...restLabelProps}
        className={cn(labelClassName, direction === "row" && "pt-2")}
        style={{ ...labelStyle, width: resolvedLabelWidth }}
      >
        {label}
      </FormLabel>
      <div className={cn("min-w-0", direction === "row" && "flex-1")}>
        {children}
      </div>
    </div>
  )
}

export { FormBlock }
export type { FormBlockProps }
