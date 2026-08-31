import * as React from "react"

import { cn } from "@/lib/utils"

type FormHelperTextColor = "default" | "error" | "disabled" | "warning"

type FormHelperTextProps = React.ComponentProps<"p"> & {
  children?: React.ReactNode
  color?: FormHelperTextColor
}

const colorClasses: Record<FormHelperTextColor, string> = {
  default: "text-[color:var(--parser-text-neutral-secondary)]",
  error: "text-[color:var(--parser-text-error)]",
  disabled: "text-[color:var(--parser-text-disabled)]",
  warning: "text-[color:var(--parser-text-warning)]",
}

function FormHelperText({
  children = "Helper text",
  className,
  color = "default",
  ...props
}: FormHelperTextProps) {
  return (
    <p
      className={cn(
        "text-sm leading-[1.66] font-normal tracking-[0px] whitespace-nowrap",
        colorClasses[color],
        className,
      )}
      style={{ fontVariationSettings: "'wdth' 100" }}
      {...props}
    >
      {children}
    </p>
  )
}

export { FormHelperText }
export type { FormHelperTextColor, FormHelperTextProps }
