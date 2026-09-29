import * as React from "react"

import { cn } from "@/lib/utils"

type FormSetProps = React.ComponentProps<"div"> & {
  /** Layout direction for FormBlock children. */
  direction?: "column" | "row"
  /** Space between FormBlock children. */
  gap?: React.CSSProperties["gap"]
}

/** Groups FormBlock instances in a shared layout. */
function FormSet({
  className,
  direction = "column",
  gap = "calc(var(--spacing) * 4)",
  style,
  ...props
}: FormSetProps) {
  return (
    <div
      className={cn("flex min-w-0", direction === "column" ? "flex-col" : "flex-row", className)}
      style={{ ...style, gap }}
      {...props}
    />
  )
}

export { FormSet }
export type { FormSetProps }
