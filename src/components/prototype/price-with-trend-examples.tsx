import { PriceWithTrend } from "@/components/ui/price-with-trend";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const usedComponents = [
  { href: "/Rhood/?view=components&component=object-card", title: "ObjectCard" },
];

const priceWithTrendSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{"<"}</span>
    <span className="text-[var(--rh-palette-purple-700)]">PriceWithTrend</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">price</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{'"140 000 000 ₽"'}</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">trend</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{'"up"'}</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{" />"}</span>
  </code>
);

export function PriceWithTrendExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={priceWithTrendSnippet}
        description="Показывает направление изменения цены: снижение или рост."
        panels={[
          <div className="grid min-h-[120px] content-center justify-items-center gap-4 rounded-xl bg-white px-6 py-4" key="price-with-trend">
            <div className="grid grid-cols-[128px_auto] items-center gap-4">
              <span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Цена снизилась</span>
              <PriceWithTrend price="140 000 000 ₽" trend="down" />
            </div>
            <div className="grid grid-cols-[128px_auto] items-center gap-4">
              <span className="rh-typography-b2 text-[var(--rh-theme-text-neutral-secondary)]">Цена выросла</span>
              <PriceWithTrend price="140 000 000 ₽" trend="up" />
            </div>
          </div>,
        ]}
        title="Состояния"
        usedComponents={usedComponents}
      />
    </div>
  );
}
