import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { HelpIcon } from "@/components/ui/help-icon"
import { useTableColumns, useTableSelection } from "@/components/ui/table"
import { cn } from "@/lib/utils"

type TableCellRole = "body" | "head"
type TableCellType = "text" | "number" | "skeleton" | "checkbox" | "placeholder"
type TableCellWidth = "content" | "fill" | number
type TableCellAlignment = "left" | "center" | "right"
type TableCellVerticalAlignment = "top" | "center" | "bottom"
type TableCellTextSize = "b2" | "b1"

type TableCellProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  checked?: boolean
  /** Key of the column configured on the parent Table. */
  column?: string
  custom?: boolean
  /** Legacy alias; paddingX takes precedence when supplied. */
  disGutters?: boolean
  helpIcon?: boolean
  indeterminate?: boolean
  instance1?: boolean
  instance2?: boolean
  /** Called when a checkbox cell is changed. */
  onCheckedChange?: (checked: boolean) => void
  paddingX?: boolean
  role?: TableCellRole
  /** Row identifier used by Table selection. */
  rowId?: string
  compact?: boolean
  /** Enables sorting affordances for a header cell. Disabled by default. */
  sort?: boolean
  /** The active sorting direction. The arrow is visible only when this is set. */
  sortDirection?: "asc" | "desc"
  /** Text size for standard body cells. Header cells keep their own typography. */
  textSize?: TableCellTextSize
  type?: TableCellType
  /** Vertical alignment of content inside a cell. */
  verticalAlign?: TableCellVerticalAlignment
  /** Column width: content (default), equal share of the table, or pixels. */
  width?: TableCellWidth
}

const alignmentClasses: Record<TableCellAlignment, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
}

const contentAlignmentClasses: Record<TableCellAlignment, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
}

const verticalAlignmentClasses: Record<TableCellVerticalAlignment, string> = {
  top: "justify-start",
  center: "justify-center",
  bottom: "justify-end",
}

const checkboxVerticalAlignmentClasses: Record<TableCellVerticalAlignment, string> = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
}

/** A table cell for a header or a body row. */
function TableCell({
  children,
  checked,
  className,
  column,
  custom = false,
  disGutters = false,
  helpIcon = true,
  indeterminate = false,
  instance1 = true,
  instance2 = false,
  onCheckedChange,
  paddingX,
  role = "head",
  rowId,
  compact = false,
  sort = false,
  sortDirection,
  textSize = "b2",
  type = "checkbox",
  verticalAlign = "top",
  width = "content",
  style,
  ...props
}: TableCellProps) {
  const tableSelection = useTableSelection()
  const tableColumns = useTableColumns()
  const hasPaddingX = paddingX ?? !disGutters
  const isHead = role === "head"
  const isNumber = type === "number"
  const isCheckbox = type === "checkbox"
  const isSkeleton = type === "skeleton"
  const isPlaceholder = type === "placeholder"
  const isSortable = isHead && !isCheckbox && !isSkeleton && !isPlaceholder && sort
  const isSorted = isSortable && sortDirection !== undefined
  const hasSortPadding = !hasPaddingX && sortDirection !== undefined
  const isContentWidth = width === "content"
  const isFillWidth = width === "fill"
  const fixedWidth = typeof width === "number" ? `${width}px` : undefined
  const selectedIds = tableSelection?.selectedIds ?? []
  const selectedIdSet = new Set(selectedIds)
  const rowIds = tableSelection?.rowIds ?? []
  const selectedOnPage = rowIds.filter(id => selectedIdSet.has(id)).length
  const allOnPageSelected = rowIds.length > 0 && selectedOnPage === rowIds.length
  const someOnPageSelected = selectedOnPage > 0 && !allOnPageSelected
  const isSelectionCell = isCheckbox && tableSelection !== null && (isHead || rowId !== undefined)
  const resolvedChecked = isSelectionCell ? (isHead ? allOnPageSelected : selectedIdSet.has(rowId!)) : checked
  const resolvedIndeterminate = isSelectionCell && isHead ? someOnPageSelected : indeterminate
  const columnAlignment = tableColumns.find((tableColumn) => tableColumn.key === column)?.alignment
  const resolvedAlignment = columnAlignment ?? (isNumber ? "right" : "left")
  const bodyTextClass = isNumber
    ? textSize === "b1"
      ? "rh-typography-b1-mono"
      : "rh-typography-b2-mono"
    : textSize === "b1"
      ? "rh-typography-b1"
      : "rh-typography-b2"

  function handleCheckedChange(nextChecked: boolean) {
    if (!isSelectionCell || !tableSelection) {
      onCheckedChange?.(nextChecked)
      return
    }

    if (isHead) {
      const pageIdSet = new Set(rowIds)
      tableSelection.onSelectedIdsChange(nextChecked
        ? Array.from(new Set([...selectedIds, ...rowIds]))
        : selectedIds.filter(id => !pageIdSet.has(id)))
      return
    }

    tableSelection.onSelectedIdsChange(nextChecked
      ? Array.from(new Set([...selectedIds, rowId!]))
      : selectedIds.filter(id => id !== rowId))
  }

  return (
    <div
      {...props}
      className={cn(
        "relative flex min-w-0 shrink-0",
        isCheckbox
          ? checkboxVerticalAlignmentClasses[verticalAlign]
          : cn("flex-col", verticalAlignmentClasses[verticalAlign]),
        !isCheckbox && alignmentClasses[resolvedAlignment],
        compact ? "py-[var(--rh-sizing-table-padding-py-size-small)]" : "py-[var(--rh-sizing-table-padding-py)]",
        hasPaddingX && (isCheckbox ? "px-[calc(var(--spacing)*2)]" : "px-[var(--rh-sizing-table-padding-px)]"),
        isContentWidth && "w-max",
        isFillWidth && "flex-1 basis-0",
        fixedWidth && "shrink-0",
        isPlaceholder && (compact ? "h-[calc(var(--spacing)*9)]" : "h-[calc(calc(var(--spacing)*10)+calc(var(--spacing)*1))]"),
        isSortable && "cursor-pointer hover:bg-[var(--rh-theme-fill-neutral-hover)]",
        hasSortPadding && "pr-[var(--rh-sizing-table-padding-px)]",
        className,
      )}
      role={isHead ? "columnheader" : "cell"}
      style={{ ...style, flexBasis: fixedWidth, width: fixedWidth }}
    >
      {isCheckbox && <Checkbox aria-label={isHead ? "Выбрать все строки" : "Выбрать строку"} checked={resolvedChecked} className="min-h-0 p-0" indeterminate={resolvedIndeterminate} label={false} onChange={event => handleCheckedChange(event.target.checked)} size="sm" />}

      {isSkeleton && <span aria-hidden="true" className="block h-[calc(var(--spacing)*1.5)] w-full rounded-[var(--rh-sizing-border-radius-md)] bg-[var(--rh-theme-fill-skeleton)]" />}

      {!isCheckbox && !isSkeleton && !isPlaceholder && (custom ? (
        <div className={cn("flex min-h-5 w-full", contentAlignmentClasses[resolvedAlignment])}>
          {children}
        </div>
      ) : (
        <div className={cn("flex min-h-5 w-full items-center gap-1", contentAlignmentClasses[resolvedAlignment])}>
          <span className={cn(
          isHead
            ? "rh-typography-b2-med min-w-0 text-[var(--rh-theme-text-neutral-primary)]"
            : cn(bodyTextClass, "min-w-0"),
            isContentWidth ? "whitespace-nowrap" : "break-words",
          )}>
            {children ?? (instance1 && <>{isHead ? "Head" : "Cell"}{instance2 && " secondary instance"}</>)}
          </span>
          {isHead && helpIcon && !custom && <HelpIcon aria-label="Справка по колонке" size="sm" tooltip="Typography" />}
        </div>
      ))}

      {isSorted && (sortDirection === "asc" ? <ArrowDown aria-hidden="true" className="absolute right-[calc(var(--spacing)*1)] top-[calc(var(--spacing)*1)] size-[calc(var(--spacing)*3)] text-[var(--rh-theme-text-neutral-secondary)]" strokeWidth={2} /> : <ArrowUp aria-hidden="true" className="absolute right-[calc(var(--spacing)*1)] top-[calc(var(--spacing)*1)] size-[calc(var(--spacing)*3)] text-[var(--rh-theme-text-neutral-secondary)]" strokeWidth={2} />)}
    </div>
  )
}

export { TableCell }
export type { TableCellAlignment, TableCellProps, TableCellRole, TableCellTextSize, TableCellType, TableCellVerticalAlignment, TableCellWidth }
