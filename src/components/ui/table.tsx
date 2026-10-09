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
  /** Allows a sticky header to remain visible while the page scrolls. */
  stickyHeader?: boolean
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
function Table({ bordered = false, children, className, columns = [], minWidth, selection, stickyHeader = false, style, ...props }: TableProps) {
  const stickyHeaderContentRef = React.useRef<HTMLDivElement>(null)
  const tableChildren = React.Children.toArray(children)
  const stickyHeaderContent = stickyHeader ? tableChildren[0] : null
  const bodyChildren = stickyHeader ? tableChildren.slice(1) : tableChildren

  return (
    <TableSelectionContext.Provider value={selection ?? null}>
      <TableColumnsContext.Provider value={columns}>
        {stickyHeader ? (
          <div
            {...props}
            className={cn("min-w-0", className)}
            role="table"
            style={style}
          >
            {stickyHeaderContent && (
              <div
                className={cn(
                  "sticky top-0 z-20 overflow-x-clip bg-[var(--rh-theme-surface-bg)]",
                )}
              >
                <div
                  ref={stickyHeaderContentRef}
                  style={{
                    minWidth,
                  }}
                >
                  {stickyHeaderContent}
                </div>
              </div>
            )}
            <div
              className="w-full overflow-x-auto"
              onScroll={(event) => {
                if (stickyHeaderContentRef.current) {
                  stickyHeaderContentRef.current.style.transform = `translateX(-${event.currentTarget.scrollLeft}px)`
                }
              }}
            >
              <div
                className={cn(
                  "flex min-w-max flex-col items-stretch rounded-b-[var(--rh-sizing-border-radius-md)] overflow-visible [&>[role=row]:last-child]:overflow-hidden [&>[role=row]:last-child]:rounded-b-[var(--rh-sizing-border-radius-md)]",
                  bordered && "border border-t-0 border-[var(--parser-border-light)]",
                )}
                style={{ ...style, minWidth }}
              >
                {bodyChildren}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div
              {...props}
              className={cn(
                "flex min-w-max flex-col items-stretch rounded-[var(--rh-sizing-border-radius-md)] overflow-hidden",
                bordered && "border border-[var(--parser-border-light)]",
                className,
              )}
              role="table"
              style={{ ...style, minWidth }}
            >
              {children}
            </div>
          </div>
        )}
      </TableColumnsContext.Provider>
    </TableSelectionContext.Provider>
  )
}

export { Table }
export { useTableColumns, useTableSelection }
export type { TableColumn, TableProps, TableSelection }
