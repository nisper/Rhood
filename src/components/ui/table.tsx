import * as React from "react"

import { cn } from "@/lib/utils"

type TableSelection = {
  /** IDs of rows rendered on the current page. */
  rowIds: readonly string[]
  /** IDs selected across all pages. */
  selectedIds: readonly string[]
  /** Called when selection changes in the current page. */
  onSelectedIdsChange: (selectedIds: string[]) => void
}

type TableProps = React.ComponentProps<"div"> & {
  /** Enables selection of rows and of all rows on the current page. */
  selection?: TableSelection
}

const TableSelectionContext = React.createContext<TableSelection | null>(null)

function useTableSelection() {
  return React.useContext(TableSelectionContext)
}

/** Container for header and body rows composed from TableCell instances. */
function Table({ className, children, selection, ...props }: TableProps) {
  return (
    <TableSelectionContext.Provider value={selection ?? null}>
      <div className="w-full overflow-x-auto">
        <div
          {...props}
          className={cn("flex min-w-max flex-col items-stretch overflow-hidden rounded-lg", className)}
          role="table"
        >
          {children}
        </div>
      </div>
    </TableSelectionContext.Provider>
  )
}

export { Table }
export { useTableSelection }
export type { TableProps, TableSelection }
