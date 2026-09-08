import { TableCell, type TableCellProps, type TableCellType } from "@/components/ui/table-cell"

type TableCellHeadType = TableCellType
type TableCellHeadProps = Omit<TableCellProps, "role"> & { secondaryText?: boolean }

/** Compatibility wrapper. Use TableCell role="head" in new compositions. */
function TableCellHead({ secondaryText: _secondaryText, ...props }: TableCellHeadProps) {
  void _secondaryText
  return <TableCell role="head" {...props} />
}

export { TableCellHead }
export type { TableCellHeadProps, TableCellHeadType }
