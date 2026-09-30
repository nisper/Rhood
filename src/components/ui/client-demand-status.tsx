import * as React from "react";
import { RefreshCw, UserRound, UsersRound } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

type ClientDemandStatusValue = "empty" | "found";

type ClientDemandStatusProps = React.ComponentProps<"div"> & {
  checkedAt?: React.ReactNode;
  count?: number;
  onRefresh?: () => void;
  status?: ClientDemandStatusValue;
};

/**
 * Статус подбора покупателей для объекта.
 * Figma: https://www.figma.com/design/a0woN7V2kVcvxLLABs6sSs/%25D0%2592%25D1%258B%25D0%25B4%25D0%25B0%25D1%2587%25D0%25B0?node-id=24353-23766
 */
function ClientDemandStatus({
  checkedAt = "Проверили только что",
  className,
  count = 0,
  onRefresh,
  status = "empty",
  ...props
}: ClientDemandStatusProps) {
  const hasClients = status === "found";
  const label = hasClients
    ? `Есть ${count} ${getBuyerWord(count)}`
    : "Нет покупателя";
  const Icon = hasClients ? UsersRound : UserRound;

  return (
    <div className={cn("w-full pt-3", className)} {...props}>
      <div className="grid gap-2 rounded-3xl bg-[var(--rh-theme-surface-under-islands)] p-1">
        <div className="flex items-center gap-1">
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[20px] bg-[var(--rh-theme-fill-contrast-static)] px-4 py-2">
            <Icon
              aria-hidden="true"
              className="size-6 shrink-0 text-[var(--rh-theme-text-neutral-primary)]"
              strokeWidth={2}
            />
            <span className="rh-typography-b1 truncate text-[var(--rh-theme-text-neutral-primary)]">
              {label}
            </span>
          </div>
          <IconButton
            aria-label="Обновить статус покупателей"
            appearance="ghost"
            icon={<RefreshCw aria-hidden="true" strokeWidth={2} />}
            onClick={onRefresh}
          />
        </div>
        <p className="rh-typography-caption text-center text-[var(--rh-theme-text-neutral-secondary)]">
          {checkedAt}
        </p>
      </div>
    </div>
  );
}

function getBuyerWord(count: number) {
  const remainder = Math.abs(count) % 100;
  const lastDigit = remainder % 10;

  if (remainder > 10 && remainder < 20) return "покупателей";
  if (lastDigit === 1) return "покупатель";
  if (lastDigit > 1 && lastDigit < 5) return "покупателя";
  return "покупателей";
}

export { ClientDemandStatus };
export type { ClientDemandStatusProps, ClientDemandStatusValue };
