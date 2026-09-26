import * as React from "react"

import { cn } from "@/lib/utils"

type TableRowProps = React.ComponentProps<"div"> & {
  /** Changes the row background when it is hovered. */
  hover?: boolean
}

/** A table row that groups TableCell instances. */
function TableRow({ children, className, hover = false, ...props }: TableRowProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex border-b border-[var(--parser-border-light)] last:border-b-0",
        hover && "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        className,
      )}
      role="row"
    >
      {children}
    </div>
  )
}

export { TableRow }
export type { TableRowProps }
