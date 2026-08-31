import * as React from "react"

import { Pagination } from "@/components/ui/pagination"
import { TableCell } from "@/components/ui/table-cell"
import { TableCellHead } from "@/components/ui/table-cell-head"
import { cn } from "@/lib/utils"

type TableProps = React.ComponentProps<"div">

/**
 * Parser table matching the Figma `Table` component.
 */
function Table({ className, ...props }: TableProps) {
  return (
    <div
      className={cn(
        "flex w-[617px] flex-col items-start overflow-hidden rounded-2xl bg-[color:#c7dbff]",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-start border-b border-[color:var(--parser-border-light)]">
        <TableCellHead className="shrink-0" type="checkbox" />
        <TableCellHead className="!w-auto flex-1 min-w-px" />
        <TableCellHead className="!w-auto flex-1 min-w-px" />
        <TableCellHead className="!w-auto flex-1 min-w-px" />
      </div>

      <div className="flex w-full items-start border-b border-[color:var(--parser-border-light)]">
        <TableCell className="shrink-0" type="checkbox" />
        <TableCell className="!w-auto flex-1 min-w-px" type="text" />
        <TableCell className="!w-auto flex-1 min-w-px" type="text" />
        <TableCell className="!w-auto flex-1 min-w-px" type="text" />
      </div>

      <div className="flex w-full items-start border-b border-[color:var(--parser-border-light)]">
        <TableCell className="shrink-0" type="checkbox" />
        <TableCell className="!w-auto flex-1 min-w-px" type="text" />
        <TableCell className="!w-auto flex-1 min-w-px" type="text" />
        <TableCell className="!w-auto flex-1 min-w-px" type="text" />
      </div>

      <div className="flex w-full justify-end px-4 py-0.5">
        <Pagination className="w-fit" />
      </div>
    </div>
  )
}

export { Table }
export type { TableProps }
