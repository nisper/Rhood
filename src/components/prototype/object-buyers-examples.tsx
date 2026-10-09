import { ObjectBuyers, ObjectBuyersV2 } from "@/components/ui/object-buyers";
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
  return (
    <>
      <ShowcaseSection
        codeSnippet={v1Snippet}
        description="Компактная карточка для показа покупателей с точным совпадением по объекту."
        showcase={<ShowcaseSurface usedComponents={usedComponents}><ShowcasePanel className="items-start"><ObjectBuyers className="w-full" defaultExpanded /></ShowcasePanel></ShowcaseSurface>}
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

function ObjectBuyersV2Examples() {
  return (
    <>
      <ShowcaseSection
        codeSnippet={v2Snippet}
        description="Секционное представление покупателей с таблицей потребностей и действиями для обновления списка."
        showcase={<ShowcaseSurface usedComponents={usedComponents}><ShowcasePanel className="items-start"><ObjectBuyersV2 className="w-full" /></ShowcasePanel></ShowcaseSurface>}
        title="Стиль"
      />
      <ShowcaseSection
        codeSnippet={v2Snippet}
        description="Нажми «Показать еще» или «Проверить заново», чтобы увидеть интерактивное поведение компонента."
        showcase={<ShowcaseSurface usedComponents={usedComponents}><ShowcasePanel className="items-start"><ObjectBuyersV2 className="w-full" /></ShowcasePanel></ShowcaseSurface>}
        title="Состав"
      />
    </>
  );
}

export { ObjectBuyersExamples, ObjectBuyersV2Examples };
