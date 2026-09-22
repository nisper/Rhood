import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";

const viewports = [
  ["Мобильный", "0–767 px", "Смартфоны"],
  ["Планшет", "768–1023 px", "Планшеты"],
  ["Desktop", "от 1024 px", "Ноутбуки и десктопы"],
] as const;

export function AdaptiveExamples() {
  return (
    <Table className="border border-[var(--parser-border-light)] bg-[var(--rh-theme-surface-bg)]">
      <div
        className="flex border-b border-[var(--parser-border-light)]"
        role="row"
      >
        <TableCell
          helpIcon={false}
          role="head"
          sort={false}
          type="text"
          width="fill"
        >
          Режим
        </TableCell>
        <TableCell
          helpIcon={false}
          role="head"
          sort={false}
          type="text"
          width={180}
        >
          Ширина viewport
        </TableCell>
        <TableCell
          helpIcon={false}
          role="head"
          sort={false}
          type="text"
          width="fill"
        >
          Устройства
        </TableCell>
      </div>

      {viewports.map(([mode, range, devices]) => (
        <div
          className="flex border-b border-[var(--parser-border-light)] last:border-b-0"
          key={mode}
          role="row"
        >
          <TableCell role="body" type="text" width="fill">
            {mode}
          </TableCell>
          <TableCell role="body" type="text" width={180}>
            {range}
          </TableCell>
          <TableCell role="body" type="text" width="fill">
            {devices}
          </TableCell>
        </div>
      ))}
    </Table>
  );
}
