import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MapPriceTagProps = Omit<React.ComponentProps<"button">, "children" | "type"> & {
  count?: number;
  price: number;
  selected?: boolean;
};

function formatMapPrice(price: number) {
  return new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(price);
}

function MapPriceTag({ className, count, price, selected = false, style, ...props }: MapPriceTagProps) {
  const formattedPrice = formatMapPrice(price);
  const hasMultipleObjects = count !== undefined && count > 1;
  const accessibleLabel = hasMultipleObjects
    ? `Объектов: ${count}. Цена от ${formattedPrice}`
    : `Цена: ${formattedPrice}`;

  return (
    <button
      aria-label={accessibleLabel}
      className={cn(
        "group inline-flex cursor-pointer flex-col items-center gap-1 border-0 bg-transparent p-0 text-inherit focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--rh-theme-text-neutral-focus)]",
        className,
      )}
      aria-pressed={selected}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
      {...props}
      type="button"
    >
      <span className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[var(--rh-theme-fill-brand)] font-[family-name:var(--rh-typography-font-family-sans)] text-[12px] leading-4 font-normal tracking-[0.17px] text-[var(--rh-theme-text-neutral-primary-contrast)] shadow-sm group-hover:bg-[var(--rh-theme-fill-brand-hover)] group-hover:shadow-md",
        selected && "bg-[var(--rh-palette-purple-400)] group-hover:bg-[var(--rh-palette-purple-400)]",
        hasMultipleObjects ? "px-2 py-[2px] pl-[2px]" : "px-2 py-1",
      )}>
        {hasMultipleObjects && (
          <Badge
            className="bg-[var(--rh-theme-fill-contrast-static)] text-[var(--rh-theme-text-brand)]"
            shape="circle"
          >
            {count}
          </Badge>
        )}
        {hasMultipleObjects ? `от ${formattedPrice}` : formattedPrice}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full border border-white bg-[var(--rh-theme-fill-brand)] group-hover:bg-[var(--rh-theme-fill-brand-hover)]",
          selected && "bg-[var(--rh-palette-purple-400)] group-hover:bg-[var(--rh-palette-purple-400)]",
        )}
      />
    </button>
  );
}

export { MapPriceTag };
export type { MapPriceTagProps };
