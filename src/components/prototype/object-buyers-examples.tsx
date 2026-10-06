import { ObjectBuyers } from "@/components/ui/object-buyers";
import { ShowcasePanel } from "@/components/ui/showcase-panel";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShowcaseSurface } from "@/components/ui/showcase-surface";

const usedComponents = [
  { href: "/Rhood/?view=components&component=avatar", title: "Avatar" },
  { href: "/Rhood/?view=components&component=button", title: "Button" },
];

function ObjectBuyersExamples() {
  return (
    <>
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
