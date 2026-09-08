import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { HelpIcon } from "@/components/ui/help-icon"
import { cn } from "@/lib/utils"

type TableCellRole = "body" | "head"
type TableCellType = "text" | "number" | "skeleton" | "checkbox" | "placeholder"
type TableCellWidth = "content" | "fill" | number

type TableCellProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode
  checked?: boolean
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
  sizeSmall?: boolean
  sort?: boolean
  /** The active sorting direction. The arrow is visible only when this is set. */
  sortDirection?: "asc" | "desc"
  type?: TableCellType
  /** Column width: content (default), equal share of the table, or pixels. */
  width?: TableCellWidth
}

/** A table cell for a header or a body row. */
function TableCell({
  children,
  checked,
  className,
  custom = false,
  disGutters = false,
  helpIcon = true,
  indeterminate = false,
  instance1 = true,
  instance2 = false,
  onCheckedChange,
  paddingX,
  role = "head",
  sizeSmall = false,
  sort = true,
  sortDirection,
  type = "checkbox",
  width = "content",
  style,
  ...props
}: TableCellProps) {
  const hasPaddingX = paddingX ?? !disGutters
  const isHead = role === "head"
  const isNumber = type === "number"
  const isCheckbox = type === "checkbox"
  const isSkeleton = type === "skeleton"
  const isPlaceholder = type === "placeholder"
  const isSortable = isHead && !isCheckbox && !isSkeleton && !isPlaceholder && sort
  const isSorted = isSortable && sortDirection !== undefined
  const isContentWidth = width === "content"
  const isFillWidth = width === "fill"
  const fixedWidth = typeof width === "number" ? `${width}px` : undefined

  return (
    <div
      {...props}
      className={cn(
        "relative flex min-w-0 shrink-0",
        isCheckbox ? "items-center" : "flex-col",
        isNumber && "items-end text-right",
        sizeSmall ? "py-2" : "py-3",
        hasPaddingX && (isCheckbox ? "px-2" : "px-3"),
        isContentWidth && "w-max",
        isFillWidth && "flex-1 basis-0",
        fixedWidth && "shrink-0",
        isPlaceholder && (sizeSmall ? "h-9" : "h-11"),
        isSortable && "cursor-pointer hover:bg-[var(--parser-fill-neutral-hover)]",
        isSorted && "pr-6",
        className,
      )}
      role={isHead ? "columnheader" : "cell"}
      style={{ ...style, flexBasis: fixedWidth, width: fixedWidth }}
    >
      {isCheckbox && <Checkbox aria-label={isHead ? "Выбрать все строки" : "Выбрать строку"} checked={checked} className="min-h-0 p-0" indeterminate={indeterminate} label={false} onChange={event => onCheckedChange?.(event.target.checked)} size="md" />}

      {isSkeleton && <span aria-hidden="true" className="block h-1.5 w-full rounded-lg bg-[var(--parser-fill-skeleton)]" />}

      {!isCheckbox && !isSkeleton && !isPlaceholder && (
        <div className={cn("flex min-h-5 w-full items-center gap-1", isNumber && "justify-end")}>
          <span className={cn(
            "min-w-0 text-sm leading-5 tracking-[0.17px]",
            isContentWidth ? "whitespace-nowrap" : "break-words",
            isHead ? "font-normal text-[var(--parser-text-neutral-secondary)]" : isNumber ? "font-mono font-normal" : "font-normal",
          )}>
            {children ?? (instance1 && <>{isHead ? "Head" : "Cell"}{instance2 && " secondary instance"}</>)}
          </span>
          {isHead && helpIcon && !custom && <HelpIcon aria-label="Справка по колонке" size="sm" tooltip="Typography" />}
        </div>
      )}

      {isSorted && (sortDirection === "asc" ? <ArrowDown aria-hidden="true" className="absolute right-1 top-1 size-3 text-[var(--parser-text-neutral-secondary)]" strokeWidth={2} /> : <ArrowUp aria-hidden="true" className="absolute right-1 top-1 size-3 text-[var(--parser-text-neutral-secondary)]" strokeWidth={2} />)}
    </div>
  )
}

export { TableCell }
export type { TableCellProps, TableCellRole, TableCellType, TableCellWidth }
