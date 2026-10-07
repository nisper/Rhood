import * as React from "react";

import { ObjectBuyers, ObjectBuyersV2 } from "@/components/ui/object-buyers";
import { Segment } from "@/components/ui/segment";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

const usedComponents = [
  { href: "/Rhood/?view=components&component=avatar", title: "Avatar" },
  { href: "/Rhood/?view=components&component=button", title: "Button" },
  { href: "/Rhood/?view=components&component=segmented-control", title: "Segmented control" },
  { href: "/Rhood/?view=components&component=table", title: "Table" },
];

const v2Snippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ObjectBuyersV2</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
  </code>
);

const v1Snippet = (
  <code className="font-mono text-sm leading-5 text-[var(--rh-theme-text-neutral-primary)]">
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{`<`}</span>
    <span className="text-[var(--rh-palette-purple-700)]">ObjectBuyers</span>
    <span className="text-[var(--rh-theme-text-neutral-secondary)]">{` />`}</span>
  </code>
);

function ObjectBuyersExamples() {
  const [version, setVersion] = React.useState<"v1" | "v2">("v1");

  return (
    <>
      <ShowcaseSection
        codeSnippet={version === "v1" ? v1Snippet : v2Snippet}
        description="Переключай версии, чтобы сравнить карточку V1 с секционным представлением V2."
        showcase={<ShowcaseSurface usedComponents={usedComponents}><ShowcasePanel className="items-start"><div className="grid w-full gap-4"><SegmentedControl aria-label="Версия ObjectBuyers" onValueChange={(value) => setVersion(value as "v1" | "v2")} size="sm" value={version}><Segment value="v1">V1</Segment><Segment value="v2">V2</Segment></SegmentedControl><div id="object-buyers-preview">{version === "v1" ? <ObjectBuyers className="w-full" defaultExpanded /> : <ObjectBuyersV2 />}</div></div></ShowcasePanel></ShowcaseSurface>}
        title="Стиль"
      />
      <ShowcaseSection
      description="Показывает покупателей с точным совпадением и их потребности. По умолчанию компактный, по нажатию раскрывает список."
      showcase={<ShowcaseSurface className="auto-rows-auto grid-cols-1" direction="vertical" usedComponents={usedComponents}><ShowcasePanel><ObjectBuyers className="w-full" /></ShowcasePanel><ShowcasePanel><ObjectBuyers className="w-full" defaultExpanded /></ShowcasePanel></ShowcaseSurface>}
      title="Поведение"
      />
      <ShowcaseSection
      description="Нажми «Проверить заново», чтобы увидеть состояние поиска покупателей."
      showcase={<ShowcaseSurface><ShowcasePanel><ObjectBuyers className="w-full" defaultExpanded /></ShowcasePanel></ShowcaseSurface>}
      title="Поиск покупателей"
      />
    </>
  );
}

export { ObjectBuyersExamples };
