import * as React from "react"

import { cn } from "@/lib/utils"

type FormHelperTextColor = "default" | "error" | "disabled" | "warning"

type FormHelperTextProps = React.ComponentProps<"p"> & {
  children?: React.ReactNode
  color?: FormHelperTextColor
}

const colorClasses: Record<FormHelperTextColor, string> = {
  default: "text-[color:var(--rh-theme-text-neutral-secondary)]",
  error: "text-[color:var(--rh-theme-text-error)]",
  disabled: "text-[color:var(--rh-theme-text-neutral-disabled)]",
  warning: "text-[color:var(--rh-theme-text-warning)]",
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
