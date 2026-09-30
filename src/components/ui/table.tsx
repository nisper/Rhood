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

type TableColumn = {
  /** Unique key shared by the header and all cells in a column. */
  key: string
  /** Horizontal alignment applied to every cell in the column. */
  alignment?: "left" | "center" | "right"
}

type TableProps = React.ComponentProps<"div"> & {
  /** Adds the standard table border. */
  bordered?: boolean
  /** Shared settings for table columns. */
  columns?: readonly TableColumn[]
  /** Minimum table width before horizontal scrolling is used. */
  minWidth?: React.CSSProperties["minWidth"]
  /** Enables selection of rows and of all rows on the current page. */
  selection?: TableSelection
}

const TableSelectionContext = React.createContext<TableSelection | null>(null)
const TableColumnsContext = React.createContext<readonly TableColumn[]>([])

function useTableSelection() {
  return React.useContext(TableSelectionContext)
}

function useTableColumns() {
  return React.useContext(TableColumnsContext)
}

/** Container for header and body rows composed from TableCell instances. */
function Table({ bordered = false, children, className, columns = [], minWidth, selection, style, ...props }: TableProps) {
  return (
    <TableSelectionContext.Provider value={selection ?? null}>
      <TableColumnsContext.Provider value={columns}>
        <div className="w-full overflow-x-auto">
          <div
            {...props}
            className={cn("flex min-w-max flex-col items-stretch overflow-hidden rounded-[var(--rh-sizing-border-radius-md)]", bordered && "border border-[var(--parser-border-light)]", className)}
            role="table"
            style={{ ...style, minWidth }}
          >
            {children}
          </div>
        </div>
      </TableColumnsContext.Provider>
    </TableSelectionContext.Provider>
  )
}

export { Table }
export { useTableColumns, useTableSelection }
export type { TableColumn, TableProps, TableSelection }
