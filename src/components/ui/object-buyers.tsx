import * as React from "react";
import { ChevronDown, ChevronUp, RefreshCw, CircleUser } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ObjectBuyersProps = React.ComponentProps<"section"> & {
  defaultExpanded?: boolean;
  isLoading?: boolean;
};

type BuyerNeed = {
  avatar?: string;
  initials?: string;
  text: string;
  hasMap?: boolean;
};

const buyerNeeds: BuyerNeed[] = [
  { text: "3 ком., от 100 м², этаж до 5", initials: "ЕВ", hasMap: true },
  { text: "3 ком., 100–150 м², до 20 млн ₽, этаж не первый", avatar: "/Rhood/assets/object-buyer-1.jpeg" },
  { text: "3 ком., от 100 м², 13–15 млн ₽, этаж не первый, не последний, Восточный, область", initials: "ЕВ" },
  { text: "3 ком., от 100 м², этаж до 5–8", initials: "ЕВ" },
  { text: "3 ком., 100–150 м², до 20 млн ₽", avatar: "/Rhood/assets/object-buyer-2.jpeg", hasMap: true },
  { text: "3 ком., от 100 м², 13–15 млн ₽", initials: "ЕВ" },
  { text: "3 ком., от 100 м², этаж до 5", initials: "ЕВ" },
  { text: "3 ком., от 100 м², 13–15 млн ₽, этаж не первый, не последний, Восточный", avatar: "/Rhood/assets/object-buyer-3.jpeg" },
  { text: "3 ком., от 100 м²", avatar: "/Rhood/assets/object-buyer-4.jpeg" },
  { text: "3 ком., 100–150 м², до 20 млн ₽", avatar: "/Rhood/assets/object-buyer-5.jpeg" },
];

function ObjectBuyers({ className, defaultExpanded = false, isLoading = false, ...props }: ObjectBuyersProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(5);
  const contentId = React.useId();
  const visibleNeeds = buyerNeeds.slice(0, visibleCount);
  const loading = isLoading || isRefreshing;
  const status = loading ? "Проверяем покупателей" : "Есть 87 покупателей с точным совпадением";

  React.useEffect(() => {
    if (!isRefreshing) return;

    const timeoutId = window.setTimeout(() => setIsRefreshing(false), 5_000);
    return () => window.clearTimeout(timeoutId);
  }, [isRefreshing]);

  return (
    <section
      className={cn(
        "grid rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-surface-under-islands)] p-3",
        className,
      )}
      aria-label="Покупатели на этот объект"
      {...props}
    >
      <button
        aria-controls={contentId}
        aria-expanded={loading ? undefined : expanded}
        className={cn(
          "flex w-full items-center gap-3 pr-2 text-left",
          !loading && "cursor-pointer",
        )}
        disabled={loading}
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--rh-theme-fill-contrast-static)]">
          {loading ? <RefreshCw aria-hidden="true" className="size-6 animate-spin" strokeWidth={2} /> : <CircleUser aria-hidden="true" className="size-6" strokeWidth={2} />}
        </span>
        <p className="min-w-0 flex-1 rh-typography-b1-med text-[var(--rh-theme-text-neutral-primary)]">{status}</p>
        {!loading && (expanded ? <ChevronUp aria-hidden="true" className="size-5 shrink-0" /> : <ChevronDown aria-hidden="true" className="size-5 shrink-0" />)}
      </button>

      <div
        aria-hidden={!expanded || loading}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          expanded && !loading ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        id={contentId}
        inert={!expanded || loading}
      >
        <div className="min-h-0">
          <div className="grid gap-2 pt-6">
          <div className="flex items-center gap-2">
            <Button appearance="ghost" endIcon={false} onClick={() => setIsRefreshing(true)} size="sm" startIcon={<RefreshCw aria-hidden="true" />}>
              Проверить заново
            </Button>
            <p className="ml-auto rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Проверили в 15:20</p>
          </div>
          <ul className="grid gap-1" aria-label="Потребности покупателей">
            {visibleNeeds.map((need) => <BuyerNeedItem key={need.text} need={need} />)}
          </ul>
          {visibleCount < buyerNeeds.length && (
            <Button appearance="ghost" className="justify-self-start" endIcon={<ChevronDown aria-hidden="true" />} onClick={() => setVisibleCount(buyerNeeds.length)} size="sm" startIcon={false}>
              Показать еще
            </Button>
          )}
          {visibleCount === buyerNeeds.length && (
            <p className="mx-3 my-2 rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">
              Всех покупателей можно посмотреть, если сохранить объект в Космос
            </p>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuyerNeedItem({ need }: { need: BuyerNeed }) {
  return (
    <li className="flex items-center gap-6 rounded-[var(--rh-sizing-border-radius-lg)] bg-[var(--rh-theme-fill-contrast-static)] py-3 pl-3 pr-5">
      <p className="min-w-0 flex-1 rh-typography-b1 text-[var(--rh-theme-text-neutral-primary)]">
        {need.text}{need.hasMap && ", Выделенная область на карте"}
      </p>
      {need.avatar ? (
        <img alt="Аватар покупателя" className="size-8 shrink-0 rounded-full object-cover" src={need.avatar} />
      ) : (
        <Avatar size="32px">{need.initials}</Avatar>
      )}
    </li>
  );
}

export { ObjectBuyers };
export type { ObjectBuyersProps };
