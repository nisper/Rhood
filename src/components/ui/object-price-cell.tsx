import * as React from "react";
import { createPortal } from "react-dom";

import { PriceHistory, type PriceHistoryEntry } from "@/components/ui/price-history";
import { TableCell } from "@/components/ui/table-cell";

type ObjectPriceColor = "neutral" | "success" | "error";

type ObjectPriceCellProps = {
  price: number;
  pricePerArea: number;
  priceColor?: ObjectPriceColor;
  priceHistory?: readonly PriceHistoryEntry[];
};

const priceCellHoverClasses: Partial<Record<ObjectPriceColor, string>> = {
  success: "hover:bg-[var(--rh-theme-fill-success-light-hover)]",
  error: "hover:bg-[var(--rh-theme-fill-error-light-hover)]",
};

const priceColorClasses: Record<ObjectPriceColor, string> = {
  neutral: "text-[var(--parser-text-neutral-primary)]",
  success: "text-[var(--rh-theme-text-success)]",
  error: "text-[var(--rh-theme-text-error)]",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function ObjectPriceCell({ price, pricePerArea, priceColor = "neutral", priceHistory = [] }: ObjectPriceCellProps) {
  const historyTooltipId = React.useId();
  const closeTimeoutRef = React.useRef<number | undefined>(undefined);
  const [historyTooltipPosition, setHistoryTooltipPosition] = React.useState<{ left: number; top: number } | null>(null);
  const hasPriceHistory = priceColor !== "neutral" && priceHistory.length > 0;

  function openPriceHistory(target: HTMLElement) {
    if (!hasPriceHistory) return;
    window.clearTimeout(closeTimeoutRef.current);
    const rect = target.getBoundingClientRect();
    setHistoryTooltipPosition({
      left: Math.min(Math.max(rect.left + rect.width / 2, 105), window.innerWidth - 105),
      top: rect.bottom + 4,
    });
  }

  function scheduleClosePriceHistory() {
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => setHistoryTooltipPosition(null), 120);
  }

  React.useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  return (
    <>
      <TableCell
        aria-describedby={hasPriceHistory && historyTooltipPosition ? historyTooltipId : undefined}
        className={priceCellHoverClasses[priceColor]}
        column="price"
        custom
        onBlur={hasPriceHistory ? scheduleClosePriceHistory : undefined}
        onFocus={hasPriceHistory ? (event) => openPriceHistory(event.currentTarget) : undefined}
        onPointerEnter={hasPriceHistory ? (event) => openPriceHistory(event.currentTarget) : undefined}
        onPointerLeave={hasPriceHistory ? scheduleClosePriceHistory : undefined}
        role="body"
        compact
        tabIndex={hasPriceHistory ? 0 : undefined}
        type="number"
        width={128}
      >
        <div className="w-full rh-typography-b2-mono text-right">
          <p className={priceColorClasses[priceColor]}>{formatNumber(price)}</p>
          <p className="text-[var(--parser-text-neutral-secondary)]">{formatNumber(pricePerArea)}</p>
        </div>
      </TableCell>
      {hasPriceHistory && historyTooltipPosition && typeof document !== "undefined" && createPortal(
        <PriceHistory
          className="fixed -translate-x-1/2"
          history={priceHistory}
          id={historyTooltipId}
          onPointerEnter={() => window.clearTimeout(closeTimeoutRef.current)}
          onPointerLeave={scheduleClosePriceHistory}
          role="tooltip"
          style={{ left: historyTooltipPosition.left, top: historyTooltipPosition.top }}
        />,
        document.body,
      )}
    </>
  );
}

export { ObjectPriceCell };
export type { ObjectPriceCellProps, ObjectPriceColor };
