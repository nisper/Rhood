import { ObjectPriceCell } from "@/components/ui/object-price-cell";
import { Table } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table-cell";
import { TableRow } from "@/components/ui/table-row";

const priceExamples = [
  {
    label: "Без изменений",
    priceColor: "neutral" as const,
    priceHistory: [],
  },
  {
    label: "Цена выросла",
    priceColor: "success" as const,
    priceHistory: [
      { createdAt: "2026-11-02T10:00:00.000Z", price: 9_850_000, currency: "RUB" },
      { createdAt: "2026-10-28T10:00:00.000Z", price: 9_650_000, currency: "RUB" },
    ],
  },
  {
    label: "Цена снизилась",
    priceColor: "error" as const,
    priceHistory: [
      { createdAt: "2026-11-02T10:00:00.000Z", price: 9_850_000, currency: "RUB" },
      { createdAt: "2026-10-28T10:00:00.000Z", price: 10_050_000, currency: "RUB" },
    ],
  },
];

const columns = [
  { key: "trend", alignment: "left" as const },
  { key: "price", alignment: "right" as const },
];

export function ObjectPriceCellExamples() {
  return (
    <div className="grid min-w-0 gap-1">
      <h2 className="rh-typography-h4">Состав</h2>
      <p className="rh-typography-b1">Ячейка показывает цену, цену за площадь и историю изменений. Наведи курсор на любую часть цветной ячейки.</p>
      <Table bordered columns={columns} minWidth={420} verticalBorders>
        <TableRow>
          <TableCell column="trend" helpIcon={false} role="head" sort={false} type="text" width="fill">Динамика</TableCell>
          <TableCell column="price" helpIcon={false} role="head" sort={false} type="number" width={128}>Цена, ₽</TableCell>
        </TableRow>
        {priceExamples.map(({ label, priceColor, priceHistory }) => (
          <TableRow key={priceColor}>
            <TableCell column="trend" role="body" type="text" width="fill">{label}</TableCell>
            <ObjectPriceCell
              price={9_850_000}
              priceColor={priceColor}
              priceHistory={priceHistory}
              pricePerArea={168_664}
            />
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
