import * as React from "react"

import { useTableVerticalBorders } from "@/components/ui/table-context"
import { cn } from "@/lib/utils"

type TableRowProps = React.ComponentProps<"div"> & {
  /** Changes the row background when it is hovered. */
  hover?: boolean
}

/** A table row that groups TableCell instances. */
function TableRow({ children, className, hover = false, ...props }: TableRowProps) {
  const verticalBorders = useTableVerticalBorders()

  return (
    <div
      {...props}
      className={cn(
        "flex border-b border-[var(--parser-border-light)] last:border-b-0",
        verticalBorders && "[&>[data-table-cell]+[data-table-cell]]:border-l [&>[data-table-cell]+[data-table-cell]]:border-[color:var(--parser-border-light)]",
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
