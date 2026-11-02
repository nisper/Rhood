import * as React from "react";

import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PriceHistoryEntry = {
  createdAt: string;
  price: number | string;
  currency?: string;
};

type PriceHistoryProps = Omit<React.ComponentProps<"div">, "children"> & {
  history: readonly PriceHistoryEntry[];
};

function formatPrice(value: number | string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? new Intl.NumberFormat("ru-RU").format(parsed) : value;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function PriceHistory({ className, history, ...props }: PriceHistoryProps) {
  return (
    <Tooltip className={cn("w-[210px] max-w-none p-3", className)} {...props}>
      <div className="grid w-full gap-2">
        <p className="rh-typography-b2-med">История цены</p>
        <div className="grid gap-1.5">
          {history.map((entry, index) => (
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-2" key={`${entry.createdAt}-${index}`}>
              <span className="tabular-nums text-[color:var(--rh-theme-text-neutral-secondary-contrast)]">{formatDate(entry.createdAt)}</span>
              <span className="tabular-nums text-right">{formatPrice(entry.price)} {entry.currency === "RUB" ? "₽" : entry.currency ?? "₽"}</span>
            </div>
          ))}
        </div>
      </div>
    </Tooltip>
  );
}

export { PriceHistory };
export type { PriceHistoryEntry, PriceHistoryProps };
