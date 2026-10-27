import * as React from "react";

import { MapPriceTag } from "@/components/ui/map-price-tag";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const usedComponents = [
  { href: "/Rhood/?view=components&component=badge", title: "Badge" },
];

const priceTagSnippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">MapPriceTag</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">price</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{"{850_000}"}</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    <br />
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">MapPriceTag</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">count</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{"{3}"}</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">price</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{"{850_000}"}</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
    <br />
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">MapPriceTag</span>
    {" "}
    <span className="text-[var(--rh-theme-text-info)]">price</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">=</span>
    <span className="text-[var(--rh-theme-text-success)]">{"{6_800_000}"}</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
  </code>
);

export function MapPriceTagExamples() {
  return (
    <div className="grid min-w-0">
      <ShowcaseSection
        codeSnippet={priceTagSnippet}
        description="Компактная цена: суммы от миллиона отображаются в миллионах, суммы меньше миллиона — в тысячах. Размер, цвет, типографика и числовое выравнивание заданы компонентом."
        usedComponents={usedComponents}
        panels={[
          <div
            className="flex min-h-[136px] flex-wrap items-center justify-center gap-4 overflow-hidden rounded-xl bg-white px-6 py-4"
            key="map-price-tag-examples"
          >
            <MapPriceTag price={850_000} />
            <MapPriceTag count={3} price={850_000} />
            <MapPriceTag price={6_800_000} />
          </div>,
        ]}
        title="Состав"
      />
    </div>
  );
}
