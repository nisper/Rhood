import { PriceHistory } from "@/components/ui/price-history";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const loweredPriceHistory = [
  { createdAt: "2026-11-02T10:00:00.000Z", price: 9_850_000, currency: "RUB" },
  { createdAt: "2026-10-28T10:00:00.000Z", price: 10_050_000, currency: "RUB" },
];

const increasedPriceHistory = [
  { createdAt: "2026-11-02T10:00:00.000Z", price: 9_850_000, currency: "RUB" },
  { createdAt: "2026-10-28T10:00:00.000Z", price: 9_650_000, currency: "RUB" },
];

export function PriceHistoryExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        description="В выпадашке перечислены дата каждого изменения и соответствующая цена. Новые изменения показаны первыми."
        panels={[
          <div className="grid min-h-[120px] content-center justify-items-center gap-2 rounded-xl bg-white px-6 py-4" key="lowered">
            <span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Цена снизилась</span>
            <PriceHistory history={loweredPriceHistory} />
          </div>,
          <div className="grid min-h-[120px] content-center justify-items-center gap-2 rounded-xl bg-white px-6 py-4" key="increased">
            <span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Цена выросла</span>
            <PriceHistory history={increasedPriceHistory} />
          </div>,
        ]}
        settings={["history: createdAt · price · currency"]}
        title="Состав"
      />
    </div>
  );
}
