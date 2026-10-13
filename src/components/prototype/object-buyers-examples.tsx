import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ObjectBuyers, ObjectBuyersV2 } from "@/components/ui/object-buyers";

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
        usedComponents={usedComponents}
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white items-start"><ObjectBuyers className="w-full" defaultExpanded /></div>]}
        title="Стиль"
      />
      <ShowcaseSection
      description="Показывает покупателей с точным совпадением и их потребности. По умолчанию компактный, по нажатию раскрывает список."
      usedComponents={usedComponents}
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><ObjectBuyers className="w-full" /></div>, <div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><ObjectBuyers className="w-full" defaultExpanded /></div>]}
      title="Поведение"
      />
      <ShowcaseSection
      description="Нажми «Проверить заново», чтобы увидеть состояние поиска покупателей."
      usedComponents={usedComponents}
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white"><ObjectBuyers className="w-full" defaultExpanded /></div>]}
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
        usedComponents={usedComponents}
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white items-start"><ObjectBuyersV2 className="w-full" /></div>]}
        title="Стиль"
      />
      <ShowcaseSection
        codeSnippet={v2Snippet}
        description="Нажми «Показать еще» или «Проверить заново», чтобы увидеть интерактивное поведение компонента."
        usedComponents={usedComponents}
      panels={[<div className="flex min-h-[136px] items-center justify-center overflow-hidden rounded-xl px-6 py-4 bg-white items-start"><ObjectBuyersV2 className="w-full" /></div>]}
        title="Состав"
      />
    </>
  );
}

export { ObjectBuyersExamples, ObjectBuyersV2Examples };
