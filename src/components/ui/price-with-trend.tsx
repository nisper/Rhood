import * as React from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

import { cn } from "@/lib/utils";

type PriceWithTrendProps = Omit<React.ComponentProps<"div">, "children"> & {
  price: string;
  trend?: "down" | "up";
};

function PriceWithTrend({ className, price, trend = "down", ...props }: PriceWithTrendProps) {
  const isPriceDown = trend === "down";

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <p className="text-[20px] font-medium leading-[1.28] tabular-nums">{price}</p>
      <span
        aria-label={isPriceDown ? "Цена снизилась" : "Цена выросла"}
        className={cn(
          "flex size-6 items-center justify-center rounded-[var(--rh-sizing-border-radius-md)]",
          isPriceDown
            ? "bg-[var(--rh-theme-fill-success-light)] text-[var(--rh-theme-icon-success)]"
            : "bg-[var(--rh-theme-fill-error-light)] text-[var(--rh-theme-icon-error)]",
        )}
        role="img"
      >
        {isPriceDown
          ? <ChevronsDown aria-hidden="true" className="size-[18px]" />
          : <ChevronsUp aria-hidden="true" className="size-[18px]" />}
      </span>
    </div>
  );
}

export { PriceWithTrend };
export type { PriceWithTrendProps };
